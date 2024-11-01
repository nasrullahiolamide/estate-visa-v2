import { FileIcon, DownloadIcon } from "@/icons";
import { Box, Center, Flex, Text } from "@mantine/core";

export function Attachments() {
  return (
    <Box
      className='border rounded-xl border-primary-border-light bg-primary-background-white'
      p={15}
    >
      <Flex align='center' justify='space-between'>
        <Flex gap={18} align='center' justify='space-between'>
          <Center
            p={6}
            className='border-4 rounded-full border-accent-2 size-8'
          >
            <FileIcon />
          </Center>

          <Text fz={14} className='text-primary-text-body'>
            Sanitation_Review.pdf
          </Text>
        </Flex>

        <DownloadIcon
          className='cursor-pointer'
          onClick={() => console.log("Downloaded")}
        />
      </Flex>
    </Box>
  );
}
