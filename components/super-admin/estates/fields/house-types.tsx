import { Checkbox, Stack, Title } from "@mantine/core";
import { Fragment } from "react";
import { useFormContext } from "../form-context";
import { useQuery } from "@tanstack/react-query";
import { builder } from "@/builders";
import clsx from "clsx";

export function HouseTypes() {
  const form = useFormContext();

  const { data, isLoading } = useQuery({
    queryKey: builder.estates.house_types.get.get(),
    queryFn: () => builder.use().estates.house_types.get(),
    select: (data) => data,
  });

  return (
    <Fragment>
      <Title order={3} fw={400}>
        Houses Types
      </Title>
      <Checkbox.Group withAsterisk {...form.getInputProps("houseTypes")}>
        <Stack
          p={14}
          className='border border-gray-4 rounded-lg lg:grid lg:gap-6'
          style={{
            gridTemplateColumns: `repeat(auto-fill,minmax(min(350px,100%),1fr))`,
            gridAutoRows: "1fr",
          }}
        >
          {data?.map((type) => (
            <Checkbox
              key={type.id}
              variant='outline'
              size='sm'
              label={type.name}
              value={type.id}
              className={clsx({ skeleton: isLoading })}
            />
          ))}
        </Stack>
      </Checkbox.Group>
    </Fragment>
  );
}
