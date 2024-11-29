"use client";

import { builder } from "@/builders";
import { requiredString } from "@/builders/types/shared";
import { FlowContentHorizontal } from "@/components/layout";
import { TrashIcon } from "@/icons";
import { MODALS } from "@/packages/libraries";

import { handleError, handleSuccess } from "@/packages/notification";
import {
  Stack,
  TextInput,
  Text,
  Flex,
  Button,
  Divider,
  Title,
  Loader,
} from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { modals } from "@mantine/modals";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { Fragment, useRef } from "react";
import { object } from "yup";

interface CheckboxEditFormProps {
  type: "service_types" | "house_types";
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
      handleSuccess({
        message: "Deleted successfully",
        autoClose: 500,
      });
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
      {data && (
        <Fragment>
          <FlowContentHorizontal breakpoint='200' mah={200}>
            {data.map((item) => (
              <Flex
                key={item.id}
                gap={8}
                align='center'
                component='ul'
                onClick={() => mutate(item.id)}
                aria-disabled={isDeleting}
                className={clsx("cursor-pointer list-disc", {
                  group: !isDeleting,
                })}
              >
                <Text className='text-sm group-hover:text-red-7' component='li'>
                  {item.name}
                </Text>
                {(type !== "house_types" || !isDeleting) && (
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
              {type === "service_types" ? "Service Requests" : "House Types"}
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
