import { PAGES } from "@/packages/libraries";
import { Button, ButtonProps } from "@mantine/core";
import Link, { LinkProps } from "next/link";

type TalkToUsButtonProps = Omit<LinkProps, "href"> & ButtonProps & {};

export function TalkToUsButton({ ...props }: TalkToUsButtonProps) {
  return (
    <Button
      component={Link}
      href={PAGES.TALK_TO_US}
      variant="primary"
      {...props}
    >
      Talk to us
    </Button>
  );
}
