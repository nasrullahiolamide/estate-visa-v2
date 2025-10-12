"use client";

import { builder } from "@/builders";
import { HouseData } from "@/builders/types/houses";
import { handleError } from "@/packages/notification";
import {
  Box,
  Button,
  Card,
  Center,
  Group,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { ValidationApprovalIcon } from "hugeicons-react";
import { showHouseDetailsAlert } from "./notification";

interface HouseCodeValidatorProps {
  onValidate?: (houseCode: string, isValid: boolean) => void;
}

export function HouseCodeValidator({ onValidate }: HouseCodeValidatorProps) {
  const form = useForm({
    initialValues: {
      houseCode: "",
    },
    validate: {
      houseCode: (value) => {
        if (!value) return "This field is required";
        if (value.length < 6) return "House code must be at least 6 characters";
        return null;
      },
    },
  });

  const onCloseAlert = () => form.reset();

  const { mutate: validateHouseCode, isPending: isValidating } = useMutation({
    mutationFn: builder.$use.houses.validate,
    onSuccess: (data: HouseData) => {
      showHouseDetailsAlert(data, onCloseAlert);
      onValidate?.(form.values.houseCode, true);
    },
    onError: handleError(),
  });

  const handleSubmit = (values: typeof form.values) => {
    // validateHouseCode({ houseCode: values.houseCode.toUpperCase() });

    showHouseDetailsAlert(
      {
        id: "1",
        houseCode: "234234",
        houseNumber: "B29",
        streetName: "Maiyegun Street",
        occupantName: "Adeola Olaiya",
        status: "Active",
        houseType: {
          id: "1",
          name: "Duplex",
        },
        noOfOccupants: 1,
        validityPeriod: "1 month",
      },
      onCloseAlert
    );
  };

  return (
    <Center className='w-full min-h-[400px] p-4'>
      <Card
        radius='xl'
        shadow='xl'
        className={clsx(
          "w-full max-w-md transition-all duration-300",
          "bg-white border border-gray-3 backdrop-blur-sm"
        )}
      >
        <Form form={form} onSubmit={handleSubmit}>
          <Stack gap={32} p={12}>
            {/* Header Section */}
            <Box className='text-center'>
              <Center mb={24}>
                <ThemeIcon
                  size={72}
                  radius='xl'
                  variant='gradient'
                  gradient={{ from: "accent.4", to: "purple", deg: 25 }}
                  className='shadow-lg border-0'
                >
                  <ValidationApprovalIcon size={32} />
                </ThemeIcon>
              </Center>

              <Title
                order={1}
                size='h2'
                fw={800}
                c='dark.9'
                mb={8}
                className='tracking-tight'
              >
                Validate House
              </Title>

              <Text
                size='sm'
                c='dimmed'
                className='max-w-sm mx-auto leading-relaxed'
              >
                Enter the house code provided by the occupant to verify their
                residence
              </Text>
            </Box>

            {/* Form Section */}
            <Stack gap={20}>
              <TextInput
                label={
                  <Group gap={2}>
                    <Text size='sm' fw={600} c='dark.7'>
                      House Code
                    </Text>
                    <Text size='xs' c='red' fw={600}>
                      *
                    </Text>
                  </Group>
                }
                description={
                  <Text size='xs' c='dimmed'>
                    Minimum 6 characters required
                  </Text>
                }
                size='lg'
                radius='md'
                placeholder='* * * * * *'
                classNames={{
                  input: "font-mono tracking-wider",
                  error: "text-xs",
                }}
                {...form.getInputProps("houseCode")}
              />

              <Button
                type='submit'
                loading={isValidating}
                disabled={isValidating}
              >
                Validate
              </Button>

              {/* Footer Info */}
              <Box className='text-center'>
                <Text size='xs' c='dimmed' className='opacity-70'>
                  🔒 Secured by{" "}
                  <span className='font-semibold text-primary-button-normal'>
                    Estate Visa
                  </span>
                </Text>
              </Box>
            </Stack>
          </Stack>
        </Form>
      </Card>
    </Center>
  );
}
