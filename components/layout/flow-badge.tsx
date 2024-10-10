import { Box, Flex, FlexProps, Text } from "@mantine/core";
import clsx from "clsx";

interface FlowBadgeProps extends FlexProps {
  label: string;
  skeleton?: boolean;
}

export function FlowBadge({
  label,
  color,
  skeleton,
  ...props
}: FlowBadgeProps) {
  return (
    <Flex
      px={8}
      gap={6}
      className="rounded"
      bg={`${color}.3`}
      py={2}
      align="center"
      maw="fit-content"
      {...props}
    >
      <Box
        w={6}
        h={6}
        bg={`${color}.10`}
        style={{
          borderRadius: 2,
          flexShrink: 0,
        }}
      />
      <Text
        c={`${color}.10`}
        fz={12}
        fw={500}
        truncate
        className={clsx({
          skeleton,
        })}
      >
        {label}
      </Text>
    </Flex>
  );
}
