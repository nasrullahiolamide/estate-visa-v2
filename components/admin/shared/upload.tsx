import { UploadCloudIcon } from "@/svgs/upload-cloud-icon";
import { Center } from "@mantine/core";

interface UploadProps {
  color: string;
}

export function Upload({ color }: UploadProps) {
  return (
    <Center p={10} bg={`${color}.2`} c={`${color}.11`} className="rounded-full">
      <UploadCloudIcon />
    </Center>
  );
}
