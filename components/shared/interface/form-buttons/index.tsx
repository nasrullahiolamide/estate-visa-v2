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
  leftButton: FormButtons;
  rightButton: FormButtons;
  containerProps?: FlexProps;
  dividerProps?: DividerProps;
}

export function FormButtons({
  rightButton,
  leftButton,
  containerProps,
}: FormButtonsProps) {
  const { children: leftLabel, ...leftProps } = { ...leftButton };
  const { children: rightLabel, ...rightProps } = { ...rightButton };

  return (
    <Box>
      <Flex gap={20} px={32} py={20} wrap="wrap" {...containerProps}>
        <Button
          flex={1}
          type="button"
          miw="fit-content"
          variant="default"
          {...leftProps}
        >
          {leftLabel}
        </Button>

        <Button type="submit" miw="fit-content" flex={1} {...rightProps}>
          {rightLabel}
        </Button>
      </Flex>
    </Box>
  );
}
