"use client";

import { AttachFile } from "@/icons";
import { useMultipleFileUpload } from "@/packages/hooks/use-multiple-file-upload";
import { FileButton } from "@mantine/core";
import { useState } from "react";
import { toast } from "react-toastify";

export function UploadAttachments() {
  const [files, setFiles] = useState<File[]>([]);

  const { previews, handleUpload, status, progress } = useMultipleFileUpload({
    key: "messages",
    onError: () => {
      toast.error("Failed to upload resource");
    },
    onSuccess: ({ data }) => {},
  });

  return (
    <span className='cursor-pointer'>
      <FileButton multiple onChange={setFiles}>
        {(props) => <AttachFile width={20} {...props} />}
      </FileButton>
    </span>
  );
}
