import { Box, BoxProps, createPolymorphicComponent } from "@mantine/core";
import { Form, UseFormReturnType } from "@mantine/form";
import { FormProps } from "@mantine/form/lib/Form/Form";
import { _TransformValues } from "@mantine/form/lib/types";
import { forwardRef, PropsWithChildren } from "react";

type FlowFormProps<
  FormValues,
  TransformValues extends _TransformValues<FormValues>,
> = PropsWithChildren<
  FormProps<UseFormReturnType<FormValues, TransformValues>>
>;

export function FlowForm<
  FormValues,
  TransformValues extends _TransformValues<FormValues>,
>({ children, form, ...props }: FlowFormProps<FormValues, TransformValues>) {
  return (
    <Box component={Form} form={form} w="100%" {...props}>
      {children}
    </Box>
  );
}

interface FlowFormRootProps extends PropsWithChildren<BoxProps> {}

export const FlowFormRoot = createPolymorphicComponent<
  "form",
  FlowFormRootProps
>(
  forwardRef<HTMLFormElement, FlowFormRootProps>(
    ({ children, ...props }, ref) => (
      <Box ref={ref} component="form" w="100%" {...props}>
        {children}
      </Box>
    ),
  ),
);
