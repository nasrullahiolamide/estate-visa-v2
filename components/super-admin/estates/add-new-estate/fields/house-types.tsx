import { Checkbox, Stack, Title } from "@mantine/core";
import { Fragment } from "react";
import { houseTypes } from "../data";
import { useFormContext } from "../form-context";

export function HouseTypes() {
  const form = useFormContext();

  return (
    <Fragment>
      <Title order={3} fw={400}>
        Houses Types
      </Title>
      <Checkbox.Group withAsterisk {...form.getInputProps("house_types")}>
        <Stack
          p={14}
          className='border border-gray-4 rounded-lg lg:grid lg:gap-6'
          style={{
            gridTemplateColumns: `repeat(auto-fill,minmax(min(350px,100%),1fr))`,
            gridAutoRows: "1fr",
          }}
        >
          {houseTypes.map((request) => (
            <Checkbox
              variant='outline'
              size='sm'
              label={request}
              value={request}
            />
          ))}
        </Stack>
      </Checkbox.Group>
    </Fragment>
  );
}
