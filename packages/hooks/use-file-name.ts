import { MIME_TYPE } from "@/builders/types/shared";

export function useFilename(defaultName: string, mimeType: MIME_TYPE) {
  const MIME_TYPE_EXTENSIONS: Record<MIME_TYPE, string> = {
    "image/png": "png",
    "image/gif": "gif",
    "image/jpeg": "jpg",
    "image/svg+xml": "svg",
    "image/webp": "webp",
    "image/avif": "avif",
    "image/heic": "heic",
    "image/heif": "heif",
    "video/mp4": "mp4",
    "application/zip": "zip",
    "text/csv": "csv",
    "application/pdf": "pdf",
    "application/msword": "doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "docx",
    "application/vnd.ms-excel": "xls",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
    "application/vnd.ms-powerpoint": "ppt",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      "pptx",
    "application/vnd.microsoft.portable-executable": "exe",
    "application/x-rar": "rar",
    "application/x-7z-compressed": "7z",
  };

  const extension = MIME_TYPE_EXTENSIONS[mimeType] || "bin";
  const date = new Date().toISOString().slice(0, 10);

  return `${defaultName}-${date}.${extension}`;
}
