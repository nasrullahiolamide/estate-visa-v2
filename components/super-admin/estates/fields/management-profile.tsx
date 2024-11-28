import { PasswordInput, SimpleGrid, TextInput, Title } from "@mantine/core";
import { Fragment } from "react";
import { useFormContext } from "../form-context";
import { usePathname } from "next/navigation";
import { PAGES } from "@/packages/libraries";
import { useEstateValue } from "@/packages/hooks/use-estate-query";

export function ManagementProfile() {
  const form = useFormContext();
  const pathname = usePathname();
  const identifier = pathname.split(`${PAGES.ESTATES}/`)[1];
  const {
    estate: { action },
  } = useEstateValue(identifier);

  return (
    <Fragment>
      <Title order={2} c='plum.5' fz={20} fw={500}>
        Estate Management Profile
      </Title>

      <SimpleGrid
        w='100%'
        cols={{
          base: 1,
          xl: 2,
        }}
        spacing={20}
      >
        <TextInput
          label='Estate Owner'
          placeholder="Enter the estate owner's name"
          withAsterisk
          disabled={form.getValues().action === "view"}
          {...form.getInputProps("owner")}
        />
        <TextInput
          label='Estate Email Address'
          placeholder="Enter the estate owner's email address"
          withAsterisk
          disabled={form.getValues().action === "view"}
          {...form.getInputProps("email")}
        />
        <TextInput
          label='Estate Phone Number'
          placeholder="Enter the estate owner's phone number"
          withAsterisk
          disabled={form.getValues().action === "view"}
          {...form.getInputProps("phone")}
        />
      </SimpleGrid>
    </Fragment>
  );
}
