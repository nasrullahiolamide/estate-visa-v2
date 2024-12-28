import { MAX_SCREEN_WIDTH } from "@/packages/constants/size";
import { AppShell, Flex, FlexProps } from "@mantine/core";
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
    <AppShell.Section
      component="main"
      flex={1}
      className={clsx(
        "bg-primary-background-dark ~px-5/20 sm:~px-1/8",
        "overflow-auto scrollbar-none",
        {
          "py-5": layout === "full",
        },
      )}
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
    </AppShell.Section>
  );
}
