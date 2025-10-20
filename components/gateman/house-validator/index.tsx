"use client";

import clsx from "clsx";

import { builder } from "@/builders";
import { APP } from "@/packages/libraries";
import { handleError } from "@/packages/notification";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Center,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { ValidationApprovalIcon } from "hugeicons-react";
import { toString } from "lodash";
import { toast } from "react-toastify";

interface HouseCodeValidatorProps {
  onValidate?: (houseCode: string, isValid: boolean) => void;
}

export function HouseCodeValidator({ onValidate }: HouseCodeValidatorProps) {
  const estateId = toString(getCookie(APP.ESTATE_ID));

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

  const { data: houseCodes } = useQuery({
    queryKey: builder.houses.list.all.$get(),
    queryFn: () => builder.$use.houses.list.all(estateId),
    select: (houses) => {
      return houses.map(({ id, code }) => {
        const fullCode = code.startsWith("HS-") ? code : `HS-${code}`;
        return fullCode;
      });
    },
  });

  const { mutate: validateHouseCode, isPending: isValidating } = useMutation({
    mutationFn: builder.$use.houses.validate,
    onSuccess: (data) => {
      if (!data.valid) {
        toast.error("Access denied. Subscription expired.");
        return;
      }
      toast.success(data.message);
      onCloseAlert();
      // showHouseDetailsAlert(data, onCloseAlert);
      // onValidate?.(form.values.houseCode, true);
    },
    onError: handleError(),
  });

  const handleSubmit = (values: typeof form.values) => {
    const prefixedHouseCode = `HS-${values.houseCode}`;
    validateHouseCode({ code: prefixedHouseCode });
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
              <Autocomplete
                data={houseCodes || []}
                leftSection={
                  <Text size='sm' className='font-mono tracking-wider ml-2'>
                    HS-
                  </Text>
                }
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
                  <Text size='xs' c='dimmed' mb={8} lh={1.3}>
                    Search and select from available house codes or enter a
                    minimum 6-character code
                  </Text>
                }
                size='lg'
                radius='md'
                placeholder='******'
                classNames={{
                  dropdown: "font-mono tracking-wider text-sm",
                  input: "font-mono tracking-wider text-sm",
                  option: "font-mono tracking-wider text-sm",
                  error: "text-xs",
                }}
                value={form.values.houseCode}
                onChange={(value) => {
                  const cleanValue = value ? value.replace(/^HS-/, "") : "";
                  form.setFieldValue("houseCode", cleanValue);
                }}
                error={form.errors.houseCode}
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
