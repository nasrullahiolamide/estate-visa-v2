import clsx from "clsx";
import prettyBytes from "pretty-bytes";

import { Center, Flex, Input, Progress, Stack, Text } from "@mantine/core";
import { Dropzone, DropzoneProps, MIME_TYPES } from "@mantine/dropzone";
import { GetInputPropsReturnType } from "@mantine/form/lib/types";
import { MIME, MIME_TYPE } from "@/builders/types/shared";
import { Status } from "@/packages/hooks/use-file-upload";
import { pass } from "@/packages/libraries";
import { Check, FileIcon } from "@/svgs";

import { Upload } from "./upload";
import { useState } from "react";

interface ResourceProps
  extends Omit<GetInputPropsReturnType, keyof DropzoneProps>,
    DropzoneProps {
  status: Status;
  accepts: (mime: MIME) => MIME_TYPE[];
  name?: string;
  completed?: number;
  label?: string;
  size?: number;
  supports?: string[];
  withAsterisk?: boolean;
}

export function ResourceUpload({
  label,
  className,
  withAsterisk,
  accepts,
  error,
  name,
  size,
  completed,
  status,
  supports = [],
  ...props
}: ResourceProps) {
  const accept = accepts(MIME_TYPES);

  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const pending = (
    <Input.Wrapper
      label={label}
      withAsterisk={withAsterisk}
      component={Stack}
      classNames={{
        label: "prose-base/regular text-primary-text-body",
        root: "gap-1.5",
      }}
    >
      <Dropzone accept={accept} multiple {...props}>
        <Stack
          p={24}
          gap={12}
          align='center'
          className=' border-dashed border rounded-md cursor-pointer border-primary-border-light bg-primary-background-white'
          flex={1}
        >
          <Dropzone.Accept>
            <Upload color='accent' />
          </Dropzone.Accept>
          <Dropzone.Idle>
            <Upload color='gray' />
          </Dropzone.Idle>
          <Dropzone.Reject>
            <Upload color='gray' />
          </Dropzone.Reject>

          <Stack gap={10} align='center' ta='center'>
            <Text>
              <span className='text-primary-button-normal font-medium'>
                Click here to upload
              </span>{" "}
              <span className='text-primary-text-subtle'>or drag and drop</span>
            </Text>

            <Text hidden={!supports.length} fz={12}>
              {supports.join(", ").toLocaleUpperCase()}
            </Text>
          </Stack>
        </Stack>
      </Dropzone>

      <Input.Error>{error}</Input.Error>
    </Input.Wrapper>
  );

  const color =
    status === "error"
      ? "red.9"
      : status === "uploaded"
      ? "accent.9"
      : "gray.4";

  const background =
    status === "error"
      ? "red.4"
      : status === "uploaded"
      ? "accent.4"
      : "gray.2";

  const upload = (
    <Flex
      p={16}
      gap={14}
      className={clsx("border rounded-md bg-primary-background-subtle", {
        "border-red-9": status === "error",
        "border-primary-button-normal": status === "uploaded",
        "border-primary-border-light": [
          "pending",
          "dropped",
          "uploading",
        ].includes(status),
      })}
    >
      <Center
        p={6}
        bg={background}
        c={color}
        className='border-4 rounded-full border-accent-2 size-8'
      >
        <FileIcon />
      </Center>

      <Stack flex={1} gap={4}>
        <Stack gap={3}>
          <Flex gap={30} align='center' justify='space-between'>
            <Text fz={14} className='text-primary-text-body'>
              {name}
            </Text>
            <Center p={3} c='white' bg={color} className='rounded-full size-4'>
              <Check />
            </Center>
          </Flex>
          <Text fz={14} className='text-primary-text-subtle'>
            {prettyBytes(pass.number(size))}
          </Text>
        </Stack>

        <Progress
          hidden={status !== "uploading"}
          color={color}
          value={pass.number(completed)}
          animated={status === "uploading"}
        />
      </Stack>
    </Flex>
  );

  return status === "pending" ? pending : upload;
}

// import clsx from "clsx";
// import prettyBytes from "pretty-bytes";
// import { useState } from "react";

// import { Center, Flex, Input, Progress, Stack, Text } from "@mantine/core";
// import { Dropzone, DropzoneProps, MIME_TYPES } from "@mantine/dropzone";
// import { GetInputPropsReturnType } from "@mantine/form/lib/types";
// import { MIME, MIME_TYPE } from "@/builders/types/shared";
// import { Status } from "@/packages/hooks/use-file-upload";
// import { pass } from "@/packages/libraries";
// import { Check, FileIcon } from "@/svgs";
// import { Upload } from "./upload";

// interface ResourceProps
//   extends Omit<GetInputPropsReturnType, keyof DropzoneProps>,
//     DropzoneProps {
//   status: Status;
//   accepts: (mime: MIME) => MIME_TYPE[];
//   name?: string;
//   completed?: number;
//   label?: string;
//   size?: number;
//   supports?: string[];
//   withAsterisk?: boolean;
// }

// export function ResourceUpload({
//   label,
//   className,
//   withAsterisk,
//   accepts,
//   error,
//   name,
//   size,
//   completed,
//   status,
//   supports = [],
//   ...props
// }: ResourceProps) {
//   const accept = accepts(MIME_TYPES);

//   // Use state to manage multiple file uploads
//   const [files, setFiles] = useState<File[]>([]);

//   const handleDrop = (acceptedFiles: File[]) => {
//     setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
//   };

//   const pending = (
//     <Input.Wrapper
//       label={label}
//       withAsterisk={withAsterisk}
//       component={Stack}
//       classNames={{
//         label: "prose-base/regular text-primary-text-body",
//         root: "gap-1.5",
//       }}
//     >
//       <Dropzone accept={accept} onDrop={handleDrop} multiple {...props}>
//         <Stack
//           px={24}
//           py={36}
//           gap={12}
//           align='center'
//           className=' border-dashed border rounded-md cursor-pointer border-primary-border-light bg-primary-background-white'
//           flex={1}
//         >
//           <Dropzone.Accept>
//             <Upload color='accent' />
//           </Dropzone.Accept>
//           <Dropzone.Idle>
//             <Upload color='gray' />
//           </Dropzone.Idle>
//           <Dropzone.Reject>
//             <Upload color='gray' />
//           </Dropzone.Reject>

//           <Stack gap={10} align='center' ta='center'>
//             <Text>
//               <span className='text-primary-button-normal font-medium'>
//                 Click here to upload
//               </span>{" "}
//               <span className='text-primary-text-subtle'>or drag and drop</span>
//             </Text>

//             <Text hidden={!supports.length} fz={12}>
//               {supports.join(", ").toLocaleUpperCase()}
//             </Text>
//           </Stack>
//         </Stack>
//       </Dropzone>

//       <Input.Error>{error}</Input.Error>
//     </Input.Wrapper>
//   );

//   const color =
//     status === "error"
//       ? "red.9"
//       : status === "uploaded"
//       ? "accent.9"
//       : "gray.4";

//   const background =
//     status === "error"
//       ? "red.4"
//       : status === "uploaded"
//       ? "accent.4"
//       : "gray.2";

//   // Function to render each uploaded file
//   const renderFile = (file: File, index: number) => (
//     <Flex
//       key={index}
//       p={16}
//       gap={14}
//       className={clsx("border rounded-md bg-primary-background-subtle", {
//         "border-red-9": status === "error",
//         "border-primary-button-normal": status === "uploaded",
//         "border-primary-border-light": [
//           "pending",
//           "dropped",
//           "uploading",
//         ].includes(status),
//       })}
//     >
//       <Center
//         p={6}
//         bg={background}
//         c={color}
//         className='border-4 rounded-full border-accent-2 size-8'
//       >
//         <FileIcon />
//       </Center>

//       <Stack flex={1} gap={4}>
//         <Stack gap={3}>
//           <Flex gap={30} align='center' justify='space-between'>
//             <Text fz={14} className='text-primary-text-body'>
//               {file.name}
//             </Text>
//             <Center p={3} c='white' bg={color} className='rounded-full size-4'>
//               <Check />
//             </Center>
//           </Flex>
//           <Text fz={14} className='text-primary-text-subtle'>
//             {prettyBytes(file.size)}
//           </Text>
//         </Stack>

//         <Progress
//           hidden={status !== "uploading"}
//           color={color}
//           value={pass.number(completed)}
//           animated={status === "uploading"}
//         />
//       </Stack>
//     </Flex>
//   );

//   return (
//     <div>
//       {status === "pending" ? pending : files.map((file, index) => renderFile(file, index))}
//     </div>
//   );
// }
