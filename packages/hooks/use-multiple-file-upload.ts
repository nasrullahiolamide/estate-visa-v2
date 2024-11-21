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

export type FilePreview = {
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
   * @param {FilePreviews} previews
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
};

export type Files = (FileWithPath | undefined)[];
export type Categories = "minutes" | "profile-pictures" | "messages" | "others";
export type Status = "dropped" | "uploading" | "uploaded" | "pending" | "error";

export function useFileUpload<FormValues extends Record<string, unknown>>({
  key,
  onError,
  onSuccess,
  onDrop,
  onUpload,
  form,
}: UseFileUploadProps<FormValues>) {
  const [status, setStatus] = useState<Status>("pending");
  const { progress, onUploadProgress } = useOnUploadProgress();

  /**
   * Created as a state to hold the files to upload
   */
  const [file, setFile] = useState<FileWithPath>();

  /**
   * Created as a state to hold the file preview
   */
  const [previews, setPreviews] = useState<FilePreview[]>([]);

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

    return preview;
  };

  /**
   * Handles the file upload process. The file is passed to the callback
   * function, which is expectedly `onUpload`. The file is also previewed
   * before it is uploaded.
   *
   * @param files
   * @returns void
   */

  const handleUpload = async (files: Files) => {
    if (!key) return;

    for (const file of files) {
      if (!file) continue;

      setStatus("uploading");
      setPreviews([handlePreview(file)]);

      const formData = new FormData();
      const preview = handlePreview(file);
      const payload = {
        formData,
        onUploadProgress,
      };

      formData.append("file", file);
      formData.append("type", key);
      Object.entries({ ...form }).forEach(([formKey, value]) => {
        formData.append(formKey, pass.string(value));
      });

      await new Promise<void>((resolve, reject) => {
        mutate(payload, {
          onSettled() {
            onUpload?.(preview);
          },

          onSuccess() {
            setStatus("uploaded");
            resolve();
          },
          onError(error) {
            setStatus("error");
            reject(error);
          },
        });
      });
    }

    console.log("All files uploaded sequentially");
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
    previews,
    progress,
    status,
    isIdle,
    isPending,
    isPaused,
    handleUpload,
    handleDrop,
    handlePreview,
  };
}
