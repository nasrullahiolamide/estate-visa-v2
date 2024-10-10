import { MAX_SCREEN_WIDTH } from "@/constants/size";
import { Flex, FlexProps } from "@mantine/core";
import clsx from "clsx";

interface AppShellMainProps extends FlexProps {
  layout?: "default" | "full";
}

export function AppShellMain({
  children,
  layout = "full",
  className,
  ...props
}: AppShellMainProps) {
  return (
    <Flex
      component="main"
      className={clsx(
        "bg-primary-background-dark ~px-5/20",
        "overflow-auto scrollbar-none",
        {
          "py-5": layout === "full",
        }
      )}
      flex={1}
    >
      <Flex
        mx="auto"
        bg="transparent"
        direction="column"
        maw={MAX_SCREEN_WIDTH}
        w="100%"
        className={clsx(className, {
          "my-5 h-fit": layout === "default",
          "h-full": layout === "full",
        })}
        {...props}
      >
        {children}
      </Flex>
    </Flex>
  );
}
