import clsx from "clsx";

import { Button, Checkbox, Flex, Stack } from "@mantine/core";
import { useFormContext } from "../form-context";
import { useQuery } from "@tanstack/react-query";
import { builder } from "@/builders";
import { EditIcon } from "@/icons";
import { modals } from "@mantine/modals";
import { CheckboxEditForm } from "../actions/types";
import { MODALS } from "@/packages/libraries";
import { Fragment } from "react";

export function HouseTypes() {
  const form = useFormContext();

  const { data, isLoading } = useQuery({
    queryKey: builder.estates.options.house_types.get.$get(),
    queryFn: () => builder.$use.estates.options.house_types.get(),
    select: (data) => data,
  });

  const handleEditModal = () => {
    modals.open({
      modalId: MODALS.FORM_DETAILS,
      title: "House Types",
      children: <CheckboxEditForm type={"house_types"} />,
    });
  };

  return (
    <Fragment>
      {data?.length ? (
        <Checkbox.Group
          label={
            <Flex
              gap={8}
              align="center"
              className="justify-between sm:justify-start"
            >
              <span>
                House Types <span className="text-red-5">*</span>
              </span>
              <EditIcon
                width={15}
                height={15}
                color="var(--blue-8)"
                className="group-hover:inline hidden cursor-pointer"
                onClick={handleEditModal}
              />
            </Flex>
          }
          classNames={{
            label: "mb-2 w-full",
            error: "mt-3",
            root: "group",
          }}
          {...form.getInputProps("houseTypes")}
        >
          <Stack
            p={14}
            className="border border-gray-4 rounded-lg lg:grid lg:gap-6"
            style={{
              gridTemplateColumns: `repeat(auto-fill,minmax(min(350px,100%),1fr))`,
              gridAutoRows: "1fr",
            }}
          >
            {data?.map((type) => (
              <Checkbox
                key={type.id}
                variant="outline"
                size="sm"
                label={type.name}
                value={type.id}
                className={clsx({ skeleton: isLoading })}
                disabled={form.getValues().action === "view"}
              />
            ))}
          </Stack>
        </Checkbox.Group>
      ) : (
        <Stack p={14} className="border border-gray-4 rounded-lg">
          <Button variant="subtle" onClick={handleEditModal}>
            Add House Types
          </Button>
        </Stack>
      )}
    </Fragment>
  );
}
