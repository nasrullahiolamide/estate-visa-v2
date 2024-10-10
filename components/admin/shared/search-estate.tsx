"use client";

import { SearchIcon } from "@/svgs";
import { Button, Center, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Search01Icon } from "hugeicons-react";
import { Fragment } from "react";

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
        <SearchIcon height={24} width={24} />
      </Button>
    </Fragment>
  );
}
