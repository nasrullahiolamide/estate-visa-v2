import { AttachFile } from "@/icons";
import { useFileUpload } from "@/packages/hooks/use-file-upload";
import { FileButton } from "@mantine/core";
import { useState } from "react";
import { toast } from "react-toastify";

export function UploadAttachments() {
  const [files, setFiles] = useState<File[]>([]);

  const { preview, handleUpload, status, progress } = useFileUpload({
    key: "messages",
    onError: () => {
      toast.error("Failed to upload resource");
    },
    onSuccess: ({ data }) => {},
  });

  return (
    <span className='cursor-pointer'>
      <FileButton onChange={() => {}} multiple>
        {(props) => <AttachFile width={24} {...props} />}
      </FileButton>
    </span>
  );
}
