import { Button, ButtonProps, Flex } from "@mantine/core";

export const generateProductButtons = (
  actions: {
    label: string;
    color: string;
    props?: ButtonProps & { onClick?: () => void };
  }[],
) => (
  <Flex wrap="wrap" justify="space-between" mt="auto" gap={35}>
    {actions.map((action, index) => (
      <Button
        key={index}
        variant={action.color === "gray" ? "outline" : "filled"}
        color={action.color}
        size="sm"
        h={40}
        fz={13}
        flex={1}
        onClick={(e) => {
          e.stopPropagation();
          action.props?.onClick?.();
        }}
        {...action.props}
      >
        {action.label}
      </Button>
    ))}
  </Flex>
);
