import { Picture } from "../picture";
import { Flex, FlexProps, Text } from "@mantine/core";

import clsx from "clsx";

interface LogoProps extends FlexProps {
  image?: string;
  name?: string;
  skeleton?: boolean;
}

export function Logo({ image, name, skeleton, ...props }: LogoProps) {
  const noOrganizationInfo = !image && !name;

  return (
    <Flex
      c='gray.12'
      hidden={noOrganizationInfo}
      align='center'
      justify='center'
      gap={3}
      {...props}
    >
      <Picture alt={name} hidden={!image} height={40} src={image} />
      <Text
        fw={600}
        hidden={!name}
        className={clsx("text-2xl", {
          skeleton,
        })}
      >
        {name}
      </Text>
    </Flex>
  );
}
