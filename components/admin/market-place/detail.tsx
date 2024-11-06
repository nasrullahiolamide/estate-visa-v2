import { Picture, StarRating } from "@/components/shared/interface";
import { Stack, Flex, Button, Text, Divider, Title } from "@mantine/core";
import { Fragment } from "react";

export function ProductDetail() {
  return (
    <Stack p={30}>
      <Stack
        h={{
          base: "auto",
          sm: 720,
        }}
        className='overflow-scroll'
      >
        <Picture
          src='https://via.placeholder.com/300'
          h={160}
          w='100%'
          alt='product'
          className='rounded-lg'
        />

        <Stack mt={16}>
          <Stack gap={20}>
            <Flex align='center' gap={24}>
              <Text fz={14} c='gray'>
                Name:
              </Text>
              <Text fz={14}>Original Nike Sneakers</Text>
            </Flex>

            <Flex align='center' gap={24}>
              <Text fz={14} c='gray'>
                Price:
              </Text>
              <Text fw={500} fz={18}>
                ₦20,000
              </Text>
            </Flex>

            <Flex align='center' gap={24}>
              <Text fz={14} c='gray'>
                Seller:
              </Text>
              <Text fz={14}>House A10</Text>
            </Flex>

            <Flex align='center' gap={24}>
              <Text fz={14} c='gray'>
                Phone No:
              </Text>
              <Text fz={14} fw={500} c='blue.4'>
                09038450563
              </Text>
            </Flex>

            <Flex align='center' gap={24}>
              <Text fz={14} c='gray'>
                Rating:
              </Text>
              <Text fz={14} fw={500} c='blue.4'>
                <StarRating className='!justify-start' />
              </Text>
            </Flex>

            <Flex align='center' gap={24}>
              <Text fz={14} c='gray'>
                Status:
              </Text>
              <Text fz={14} className='capitalize'>
                New Arrival
              </Text>
            </Flex>
          </Stack>

          <Button fz={14} size='sm' h={40} my={20}>
            Contact Seller
          </Button>
        </Stack>

        <Divider />
        <Stack>
          <Title order={2} c='plum.5' fz={14} fw={500}>
            Product Description
          </Title>
          <Text
            fz={14}
            c='gray'
            p={10}
            className='border border-gray-3 rounded-md'
          >
            Lorem ipsum dolor sit amet consectetur. Semper id lacus pretium
            tellus feugiat pretium tellus. Lorem ipsum dolor sit amet
            consectetur. Semper id lacus pretium tellus feugiat pretium tellus
          </Text>
          <Title order={2} c='plum.5' fz={14} fw={500}>
            Product Description
          </Title>
          <Text
            fz={14}
            c='gray'
            p={10}
            className='border border-gray-3 rounded-md'
          >
            Lorem ipsum dolor sit amet consectetur. Semper id lacus pretium
            tellus feugiat pretium tellus. Lorem ipsum dolor sit amet
            consectetur. Semper id lacus pretium tellus feugiat pretium tellus
          </Text>
          <Title order={2} c='plum.5' fz={14} fw={500}>
            Product Description
          </Title>
          <Text
            fz={14}
            c='gray'
            p={10}
            className='border border-gray-3 rounded-md'
          >
            Lorem ipsum dolor sit amet consectetur. Semper id lacus pretium
            tellus feugiat pretium tellus. Lorem ipsum dolor sit amet
            consectetur. Semper id lacus pretium tellus feugiat pretium tellus
          </Text>
          <Title order={2} c='plum.5' fz={14} fw={500}>
            Product Description
          </Title>
          <Text
            fz={14}
            c='gray'
            p={10}
            className='border border-gray-3 rounded-md'
          >
            Lorem ipsum dolor sit amet consectetur. Semper id lacus pretium
            tellus feugiat pretium tellus. Lorem ipsum dolor sit amet
            consectetur. Semper id lacus pretium tellus feugiat pretium tellus
          </Text>
        </Stack>
        <Divider />
      </Stack>
      <Flex wrap='wrap' justify='space-between' mt='auto' gap={35}>
        <Button
          variant='outline'
          color='gray'
          size='sm'
          fz={14}
          flex={1}
          h={40}
        >
          Reject
        </Button>
        <Button color='blue' size='sm' fz={14} flex={1} h={40}>
          Approve
        </Button>
      </Flex>
    </Stack>
  );
}
