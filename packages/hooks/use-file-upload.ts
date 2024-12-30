import { builder } from "@/builders";
import { Thumbnail } from "@/builders/types/shared";
import { UploadData } from "@/builders/types/upload";
import { FileWithPath } from "@mantine/dropzone";
import { MutationFunction, useMutation } from "@tanstack/react-query";

import { AxiosError } from "axios";
import { FormEvent, useState } from "react";

import { pass } from "../libraries";
import { handleMantineError } from "../notification/handle-error";
import {
  OnUploadProgress,
  useOnUploadProgress,
} from "./use-on-upload-progress";

export type Upload = {
  data: UploadData;
};

export type FilePreview = {
  name: string;
  size: number;
  type: string;
  url: string;
  status: Status;
  completed?: number;
};

interface HandlePreviewProps {
  file: FileWithPath;
  status: Status;
  completed?: number;
}

type UseFileUploadProps<FormValues extends Record<string, unknown>> = {
  /**
   * Triggered when the upload fails
   * @returns void
   */
  onError?: () => void;

  /**
   * Triggered when the upload is successful
   * @param data
   * @returns void
   */
  onSuccess?: (data: Upload) => void;

  /**
   * Triggered when a file is dropped
   * @param {FilePreview} preview
   * @returns void
   */
  onDrop?: (preview: FilePreview) => void;

  /**
   * Triggered just before the file is uploaded
   * @param {FilePreview} preview
   * @returns void
   */
  onUpload?: (preview: FilePreview) => void;

  /**
   * The thumbnail to display
   * @type {Thumbnail}
   */
  thumbnail?: Partial<Thumbnail> | null;

  /**
   * The key type to use for the upload
   * @type {Categories}
   * @default "others"
   */
  key?: Categories;

  /**
   * The form to use for the upload
   */
  form?: FormValues;

  mutationFn?: MutationFunction;

  /**
   * Whether to allow multiple uploads
   * @default false
   * @type {boolean}
   */
  multiple?: boolean;
};

type MutateProps = {
  formData: FormData;
  onUploadProgress: OnUploadProgress;
};

export type Files = FileWithPath[];
export type Status = "dropped" | "uploading" | "uploaded" | "pending" | "error";
export type Categories =
  | "minutes"
  | "profile-pictures"
  | "messages"
  | "others"
  | "houses"
  | "occupants"
  | "bulk-upload";

export function useFileUpload<FormValues extends Record<string, unknown>>({
  key,
  thumbnail,
  onSuccess,
  onError,
  onUpload,
  onDrop,
  form,
}: UseFileUploadProps<FormValues>) {
  const isBulkUpload = key === "houses" || key === "occupants";

  const { progress, onUploadProgress } = useOnUploadProgress();
  const [status, setStatus] = useState<Status>(
    thumbnail ? "uploaded" : "pending"
  );

  /**
   * Destructure the thumbnail object
   * @type {Thumbnail}
   */
  const {
    original_filename: file_name,
    secure_url: file_url,
    bytes: file_size,
    resource_type: file_type,
  } = { ...thumbnail };

  /**
   * Created as a state to hold the files to upload
   */
  const [file, setFile] = useState<FileWithPath>();

  /**
   * Created as a state to hold the file previews
   */
  const [previews, setPreviews] = useState<Partial<FilePreview>[]>([
    {
      name: file_name,
      url: file_url,
      size: file_size,
      type: file_type,
    },
  ]);

  const { mutateAsync, isPending, isIdle, isPaused } = useMutation<
    Upload,
    unknown,
    MutateProps
  >({
    onSuccess,
    mutationKey: builder.upload.$get(key),
    mutationFn: ({ formData, onUploadProgress }) =>
      isBulkUpload
        ? builder.$use[key]?.upload({ formData, onUploadProgress })
        : builder.$use?.upload({ formData, onUploadProgress }),
    onError(error: unknown) {
      const axiosError = error as AxiosError;
      handleMantineError()(axiosError);
      onError?.();
    },
  });

  /**
   * Handles the file preview process.
   *
   * @param file
   * @returns void
   */

  const handlePreview = ({
    file,
    status,
    completed,
  }: HandlePreviewProps): FilePreview => {
    const url = URL.createObjectURL(file);
    setFile(file);
    return {
      name: file.name,
      size: file.size,
      type: file.type,
      url,
      status,
      completed,
    };
  };

  /**
   * Handles the form submission in a scenario where the file is dropped
   * but not uploaded. The state of the file is saved in `upload` and
   * passed to the callback function, which is expectedly `handleUpload`.
   *
   * @param callback
   * @returns void
   *
   * @example
   * const { handleDrop, handleUpload, handleSubmit } = useFileUpload({
   *   key: MODALS.UPLOAD_FILE,
   *   thumbnail,
   * });
   *
   * <form onSubmit={handleSubmit(handleUpload)}>
   *   <Dropzone onDrop={handleDrop} />
   * </form>
   */
  const handleSubmit = function (callback: (files: Files) => void) {
    return (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      console.log(file);
      if (file) {
        callback([file]);
      }
    };
  };

  /**
   * Handles the file preview status update process.
   *
   * @param url
   * @param status
   */

  const updatePreviewStatus = (url: string, status: Status) => {
    setPreviews((prev) =>
      prev.map((p) => (p.url === url ? { ...p, status } : p))
    );
    setStatus(status);
  };

  /**
   * Handles the file deletion process.
   *
   * @param url
   */
  const onDelete = (url: string) => {
    setPreviews((prev) => prev.filter((preview) => preview.url !== url));
  };

  /**
   * FormData creation process. The form data is created with the file
   * and the form data to be sent to the server for processing.
   *
   * @param file
   * @returns FormData
   */
  const createFormData = (file: File) => {
    if (!key) return;

    const formData = new FormData();
    formData.append("file", file);
    form?.estateId
      ? formData.append("estateId", pass.string(form?.estateId))
      : formData.append("type", key);

    Object.entries({ ...form }).forEach(([key, value]) => {
      formData.append(key, pass.string(value));
    });
    return formData;
  };

  /**
   * Handles the multiple file upload process. The files are passed to the
   * callback function, which is expectedly `onUpload`. The files are
   * also previewed before they are uploaded.
   *
   *
   * @param files
   * @returns void
   */

  const handleUpload = async (files: Files) => {
    setStatus("uploading");

    for (const file of files) {
      setFile(file);
      const formData = createFormData(file) as FormData;

      const preview = handlePreview({
        file,
        status: "uploading",
        completed: progress?.completed,
      });

      isBulkUpload
        ? setPreviews([preview])
        : setPreviews((prev) => [...prev, preview]);

      const payload = {
        formData,
        onUploadProgress,
      };

      try {
        onUpload?.(preview);
        await mutateAsync(payload, {
          onSettled: () => onUpload?.(preview),
          onSuccess: () => updatePreviewStatus(preview.url, "uploaded"),
          onError: () => updatePreviewStatus(preview.url, "error"),
        });
      } catch {
        updatePreviewStatus(preview.url, "error");
      }
    }
  };

  /**
   * Handles the file drop process. The file is passed to the callback
   * function, which is expectedly `onDrop`. The file is also previewed
   * before it is uploaded.
   *
   * @param files
   * @returns void
   */
  const handleDrop = ([file]: Files) => {
    if (!file) return;
    setStatus("dropped");

    const preview = handlePreview({
      file,
      status,
    });

    setPreviews([preview]);
    onDrop?.(preview);
  };

  return {
    file,
    previews,
    progress,
    isIdle,
    isPending,
    handleUpload,
    onDelete,
    status,
    isPaused,
    handleDrop,
    handleSubmit,
    handlePreview,
    setStatus,
  };
}
