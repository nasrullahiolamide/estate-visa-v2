import {
  Box,
  Button,
  ButtonProps,
  Divider,
  DividerProps,
  Flex,
  FlexProps,
} from "@mantine/core";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface FormButtonsAttributes
  extends ButtonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonProps> {
  children: ReactNode;
}

type FormButtons = FormButtonsAttributes;

// type FormSubmission =
//   | {
//       type: "submit";
//       loading: boolean;
//       disabled: boolean;
//     }
//   | {
//       type?: "button" | "reset";
//       loading?: boolean;
//       disabled?: boolean;
//     };

interface FormButtonsProps {
  nextButton?: FormButtons;
  backButton?: FormButtons;
  containerProps?: FlexProps;
  dividerProps?: DividerProps;
}

export function FormButtons({
  backButton,
  nextButton,
  containerProps,
}: FormButtonsProps) {
  const { children: nextLabel, ...nextProps } = { ...nextButton };
  const { children: backLabel, ...backProps } = { ...backButton };

  return (
    <Box>
      <Divider />
      <Flex gap={20} px={32} py={20} wrap="wrap" {...containerProps}>
        <Button
          type="button"
          miw="fit-content"
          flex={1}
          variant="default"
          {...backProps}
        >
          {backLabel}
        </Button>

        <Button type="submit" miw="fit-content" flex={1} {...nextProps}>
          {nextLabel}
        </Button>
      </Flex>
    </Box>
  );
}
