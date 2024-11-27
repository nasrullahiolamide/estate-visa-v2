"use client";

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
    onSuccess: ({ data }) => {
      console.log(data);
    },
  });

  return (
    <span className='cursor-pointer'>
      <FileButton multiple onChange={setFiles}>
        {(props) => <AttachFile width={20} {...props} />}
      </FileButton>
    </span>
  );
}
