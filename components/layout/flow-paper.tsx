import { Flex, FlexProps } from "@mantine/core";
import { PropsWithChildren } from "react";

import clsx from "clsx";

interface FlowPaperProps extends PropsWithChildren<{}> {
  wrapperProps?: FlexProps;
  containerProps?: FlexProps;
  border?: boolean;
}

export function FlowPaper({
  border,
  children,
  containerProps,
  wrapperProps,
}: FlowPaperProps) {
  const { styles, ...wrapper } = { ...wrapperProps };
  const { className, ...container } = { ...containerProps };

  return (
    <Flex
      flex={1}
      component='article'
      pos='relative'
      className={clsx(className, {
        "rounded-2xl bg-white": border,
      })}
      {...container}
    >
      <Flex
        className='scrollbar-none size-full'
        component='section'
        pos='absolute'
        style={{
          alignItems: border ? "center" : "flex-start",
          overflow: "auto",
        }}
        {...wrapper}
      >
        {children}
      </Flex>
    </Flex>
  );
}
