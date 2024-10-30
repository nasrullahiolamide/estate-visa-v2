import { MIME_TYPE, ContentType } from "@/builders/types/shared";

export function getContentType(mime: MIME_TYPE): ContentType {
  const mime_types: Record<MIME_TYPE, ContentType> = {
    "image/png": "Image",
    "image/gif": "Image",
    "image/jpeg": "Image",
    "image/svg+xml": "Image",
    "image/webp": "Image",
    "image/avif": "Image",
    "image/heic": "Image",
    "video/mp4": "Video",
    "application/zip": "File",
    "text/csv": "File",
    "application/pdf": "File",
    "application/msword": "File",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "File",
    "application/vnd.ms-excel": "File",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "File",
    "application/vnd.ms-powerpoint": "PPT",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      "PPT",
    "application/vnd.microsoft.portable-executable": "File",
    "application/x-rar": "Image",
    "application/x-7z-compressed": "Image",
    "image/heif": "Image",
  };

  return mime_types[mime];
}

export const contentTypes: ContentType[] = [
  "Text",
  "Audio",
  "File",
  "Image",
  "PPT",
  "Video",
];
