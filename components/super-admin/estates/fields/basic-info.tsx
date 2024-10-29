import { TextInput } from "@mantine/core";
import { Fragment } from "react";
import { useFormContext } from "../form-context";
import clsx from "clsx";

export function BasicInfo() {
  const form = useFormContext();

  return (
    <Fragment>
      <TextInput
        label='Estate Name'
        placeholder='Enter the name of your estate'
        withAsterisk
        {...form.getInputProps("name")}
      />
      <TextInput
        label='Estate Location'
        placeholder='Enter the location of your estate'
        withAsterisk
        {...form.getInputProps("location")}
      />
      <TextInput
        type='number'
        label='Number of houses'
        placeholder='Enter the number of houses in your estate'
        min={0}
        withAsterisk
        {...form.getInputProps("numberOfHouses")}
      />
    </Fragment>
  );
}
