import { MIME_TYPE } from "./shared";

export type UploadData = {
  id: number;
  file_url: string;
  file_name: string;
  file_size: number;
  file_type: MIME_TYPE;
  created_at: string;
  updated_at: string;
};
