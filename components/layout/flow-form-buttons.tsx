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

interface FlowFormButtonsAttributes
  extends ButtonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonProps> {
  children: ReactNode;
}

type FlowFormButtons = FlowFormButtonsAttributes;

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

interface FlowFormButtonsProps {
  rightButton?: FlowFormButtons;
  leftButton?: FlowFormButtons;
  containerProps?: FlexProps;
  dividerProps?: DividerProps;
}

export function FlowFormButtons({
  leftButton,
  rightButton,
  containerProps,
}: FlowFormButtonsProps) {
  const { children: leftLabel, ...leftProps } = { ...leftButton };
  const { children: rightLabel, ...rightProps } = { ...rightButton };

  return (
    <Box>
      <Divider />
      <Flex gap={20} px={32} py={20} wrap="wrap" {...containerProps}>
        <Button
          miw="fit-content"
          flex={1}
          variant="default"
          type="button"
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
