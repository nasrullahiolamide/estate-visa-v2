import { FileWithPath } from "@mantine/dropzone";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";

import { builder } from "@/builders";
import { UploadData } from "@/builders/types/upload";
import { pass } from "@/packages/libraries";

import { useOnUploadProgress } from "./use-on-upload-progress";
import { Thumbnail } from "@/builders/types/shared";

export type Upload = {
  data: UploadData;
};

type FilePreview = {
  name: string;
  size: number;
  type: string;
  url: string;
};

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
   * The key to use for the upload
   */
  key?: string;

  /**
   * The form to use for the upload
   */
  form?: FormValues;
};

export type Files = (FileWithPath | undefined)[];
export type Status = "dropped" | "uploading" | "uploaded" | "pending" | "error";

export function useFileUpload<FormValues extends Record<string, unknown>>({
  key,
  thumbnail,
  onError,
  onSuccess,
  onDrop,
  onUpload,
  form,
}: UseFileUploadProps<FormValues>) {
  const [status, setStatus] = useState<Status>(
    thumbnail ? "uploaded" : "pending"
  );
  const { progress, onUploadProgress } = useOnUploadProgress();

  /**
   * Destructure the thumbnail object
   * @type {Thumbnail}
   */
  const { file_name, file_url, file_size, file_type } = { ...thumbnail };

  /**
   * Created as a state to hold the files to upload
   */
  const [file, setFile] = useState<FileWithPath>();

  /**
   * Created as a state to hold the file preview
   */
  const [preview, setPreview] = useState<Partial<FilePreview>>({
    name: file_name,
    url: file_url || "/images/avatar.png",
    size: file_size,
    type: file_type,
  });

  const { mutate, isPending, isIdle, isPaused } = useMutation({
    onSuccess,
    mutationKey: builder.upload.get(key),
    mutationFn: builder.use().upload,
    onError,
  });

  /**
   * Handles the file preview process.
   *
   * @param file
   * @returns void
   */
  const handlePreview = function (file: FileWithPath) {
    setFile(file);

    const url = URL.createObjectURL(file);
    const preview = {
      name: file.name,
      size: file.size,
      type: file.type,
      url,
    };

    setPreview(preview);
    return preview;
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
      callback([file]);
    };
  };

  /**
   * Handles the file upload process. The file is passed to the callback
   * function, which is expectedly `onUpload`. The file is also previewed
   * before it is uploaded.
   *
   * @param files
   * @returns void
   */
  const handleUpload = ([file]: Files) => {
    if (!file) return;
    setStatus("uploading");

    const formData = new FormData();
    const preview = handlePreview(file);
    const payload = {
      formData,
      onUploadProgress,
    };

    formData.append("file", file);
    Object.entries({ ...form }).forEach(([key, value]) => {
      formData.append(key, pass.string(value));
    });

    mutate(payload, {
      onSettled() {
        onUpload?.(preview);
      },
      onSuccess() {
        setStatus("uploaded");
      },
      onError() {
        setStatus("error");
      },
    });
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
    const preview = handlePreview(file);
    onDrop?.(preview);
  };

  return {
    preview,
    progress,
    status,
    isIdle,
    isPending,
    isPaused,
    handleUpload,
    handleDrop,
    handleSubmit,
    handlePreview,
  };
}
