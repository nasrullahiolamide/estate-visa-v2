import { api } from "@/builders/axios";
import { UploadData } from "@/builders/types/upload";
import { OnUploadProgress } from "@/packages/hooks/use-on-upload-progress";

export const upload = function (variables: {
  formData: FormData;
  onUploadProgress?: OnUploadProgress;
}) {
  const { formData, onUploadProgress } = variables;
  return api
    .post<{
      data: UploadData;
    }>("/uploads", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    })
    .then(({ data }) => data);
};
