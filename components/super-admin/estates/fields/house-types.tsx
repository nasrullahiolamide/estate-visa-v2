import clsx from "clsx";

import { Checkbox, Stack } from "@mantine/core";
import { useFormContext } from "../form-context";
import { useQuery } from "@tanstack/react-query";
import { builder } from "@/builders";

export function HouseTypes() {
  const form = useFormContext();

  const { data, isLoading } = useQuery({
    queryKey: builder.estates.house_types.get.get(),
    queryFn: () => builder.use().estates.house_types.get(),
    select: (data) => data,
  });

  return (
    <Checkbox.Group
      label='House Types'
      withAsterisk
      classNames={{
        label: "mb-2",
        error: "mt-3",
      }}
      {...form.getInputProps("houseTypes")}
    >
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
            disabled={form.getValues().action === "view"}
          />
        ))}
      </Stack>
    </Checkbox.Group>
  );
}
