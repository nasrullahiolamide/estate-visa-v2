"use client";

import { builder } from "@/builders";
import { requiredString } from "@/builders/types/shared";
import { FlowContentHorizontal } from "@/components/layout";
import { TrashIcon } from "@/icons";
import { MODALS } from "@/packages/libraries";

import { handleError, handleSuccess } from "@/packages/notification";
import { Stack, TextInput, Flex, Button, Divider, Title } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { modals } from "@mantine/modals";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Fragment, useRef } from "react";
import { object } from "yup";

interface CheckboxEditFormProps {
  type: "interests" | "service_requests" | "house_types";
}

const schema = object({
  name: requiredString,
});

export function CheckboxEditForm({ type }: CheckboxEditFormProps) {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: builder.estates.options[type].get.get(),
    queryFn: () => builder.use().estates.options[type].get(),
    select: (data) => data,
  });

  const { mutate: update, isPending } = useMutation({
    mutationFn: builder.use().estates.options[type].post,
    onError: handleError(),
    onSuccess: () => {
      form.reset();
      handleSuccess({
        message: "Added successfully",
        autoClose: 500,
      });
      queryClient.invalidateQueries({
        queryKey: builder.estates.options[type].get.get(),
      });
    },
  });

  const { mutate, isPending: isDeleting } = useMutation({
    mutationFn: builder.use().estates.options[type].remove,
    onError: handleError(),
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries({
        queryKey: builder.estates.options[type].get.get(),
      });
    },
  });

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => ({
      name: values.name,
      description: values.name,
    }),
  });

  function handleSubmit(values: typeof form.values) {
    update(values);
  }

  return (
    <Stack gap={10}>
      {data?.length && (
        <Fragment>
          <FlowContentHorizontal breakpoint='200' mah={200}>
            {data
              ?.sort((a, b) => a.name.localeCompare(b.name))
              .map((item) => (
                <Flex
                  key={item.id}
                  gap={8}
                  align='center'
                  component='ul'
                  className='group cursor-pointer list-disc'
                  onClick={() => mutate(item.id)}
                >
                  {/* <Tooltip label='Click to delete' position='top-start' fz={12}> */}
                  <li className='text-sm group-hover:text-red-7'>
                    {item.name}
                  </li>
                  {/* </Tooltip> */}
                  {type !== "house_types" && (
                    <TrashIcon
                      width={12}
                      height={12}
                      className='group-hover:inline hidden cursor-pointer'
                    />
                  )}
                </Flex>
              ))}
          </FlowContentHorizontal>
          <Divider my={10} />
        </Fragment>
      )}

      <Form form={form} onSubmit={handleSubmit}>
        <TextInput
          label={
            <Title order={2}>
              Add New{" "}
              {type === "interests"
                ? "Interest"
                : type === "service_requests"
                ? "Service Request"
                : "House Type"}
            </Title>
          }
          placeholder='Enter title'
          {...form.getInputProps("name")}
        />
        <Flex justify='space-between' mt={30} gap={20}>
          <Button
            flex={1}
            type='button'
            color='red'
            variant='outline'
            onClick={() => modals.close(MODALS.FORM_DETAILS)}
            disabled={isPending || isDeleting}
          >
            Discard
          </Button>
          <Button
            flex={1}
            type='submit'
            disabled={isPending || isDeleting}
            loading={isPending}
          >
            Save
          </Button>
        </Flex>
      </Form>
    </Stack>
  );
}