import { MIME_TYPE, RenameKeys } from "./shared";

export type UploadData = {
  asset_id: string;
  bytes: number;
  secure_url: string;
  original_filename: string;
  created_at: string;
};

// type KeyMappings = {
//   asset_id: "id";
//   bytes: "file_size";
//   secure_url: "file_url";
//   original_filename: "file_name";
//   created_at: string;
// };

// export type UploadData = RenameKeys<OriginalUploadData, KeyMappings>;

// {
//     "asset_id": "ae9d812e54fc1421d1a936f4a066c169",
//     "public_id": "profile-pictures/1731706601145",
//     "version": 1731706601,
//     "version_id": "095560f29b811f3459063caca0b28937",
//     "signature": "8eea3ebb4026955e6cfeedf8e89e9635f8c8e92e",
//     "width": 576,
//     "height": 576,
//     "format": "png",
//     "resource_type": "image",
//     "created_at": "2024-11-15T21:36:41Z",
//     "tags": [],
//     "bytes": 52209,
//     "type": "upload",
//     "etag": "bca6e1c661e7436683b9be75f34c81b4",
//     "placeholder": false,
//     "url": "http://res.cloudinary.com/dkomdg1lk/image/upload/v1731706601/profile-pictures/1731706601145.png",
//     "secure_url": "https://res.cloudinary.com/dkomdg1lk/image/upload/v1731706601/profile-pictures/1731706601145.png",
//     "asset_folder": "profile-pictures",
//     "display_name": "1731706601145",
//     "original_filename": "file",
//     "api_key": "915551385993189"
// }
