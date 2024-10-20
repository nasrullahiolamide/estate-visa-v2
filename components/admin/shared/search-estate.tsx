"use client";

import { Fragment } from "react";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { SearchIcon } from "@/svgs";

export function SearchEstate() {
  const form = useForm({
    initialValues: { query: "" },
  });

  return (
    <Fragment>
      <TextInput
        w='40%'
        className='!hidden sm:!flex '
        classNames={{
          input: "border bg-gray-1",
        }}
        leftSection={<SearchIcon />}
        placeholder='Search'
        {...form.getInputProps("query")}
      />

      <Button variant='transparent' c='gray.10' hiddenFrom='sm'>
        <SearchIcon height={20} width={20} />
      </Button>
    </Fragment>
  );
}
