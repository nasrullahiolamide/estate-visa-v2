"use client";

import { Fragment } from "react";
import { Box, Button, Flex, Text } from "@mantine/core";
import { useForm } from "@mantine/form";

import { SearchIcon } from "@/icons";

export function SearchEstate() {
  const form = useForm({
    initialValues: { query: "" },
  });

  return (
    // <Fragment>
    //   <TextInput
    //     w='40%'
    //     className='!hidden sm:!flex '
    //     classNames={{
    //       input: "border bg-gray-1",
    //     }}
    //     leftSection={<SearchIcon />}
    //     placeholder='Search'
    //     {...form.getInputProps("query")}
    //   />

    //   <Button variant='transparent' c='gray.10' hiddenFrom='sm'>
    //     <SearchIcon height={20} width={20} />
    //   </Button>
    // </Fragment>

    <Button
      h={40}
      pl={12}
      size='md'
      pr={5}
      bg='white'
      color='gray.3'
      variant='outline'
      leftSection={<SearchIcon width={18} />}
      className='!hidden sm:!flex'
      children={
        <Flex align='center'>
          <Text fz={14} c='dimmed' pr={60}>
            Search
          </Text>
          <Text
            c='gray.10'
            className='border rounded-md border-gray-3 bg-gray-1'
            p={5}
            fw={700}
            fz={12}
          >
            Ctrl + K
          </Text>
        </Flex>
      }
    />
  );
}
