import { IconType } from "@/icons";
import { Flex, FlexProps } from "@mantine/core";
import { ReactNode } from "react";

type TagProps = FlexProps & {
  children: ReactNode;
} & (
    | {
        withIcon: true;
        icon: IconType | ReactNode;
      }
    | {
        withIcon?: true;
        icon?: IconType | ReactNode;
      }
  );

export function Tag({ children, withIcon, icon, ...props }: TagProps) {
  return (
    <Flex
      className='rounded-full w-fit'
      py={8}
      px={48}
      align='center'
      gap={4}
      c='accent.10'
      bg='purple.4'
      mx='auto'
      mt={20}
      {...props}
    >
      {/* {withIcon && <icon />} */}
      <span className='text-sm font-bold'>{children}</span>
    </Flex>
  );
}
