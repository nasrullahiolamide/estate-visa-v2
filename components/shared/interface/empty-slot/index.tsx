import { PolymorphicComponentProps } from "@mantine/core";
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Stack,
  Title,
} from "@mantine/core";
import Image from "next/image";
import { ElementType } from "react";

export type BtnProps<T extends ElementType = "a"> = ButtonProps & {
  href?: string;
  onClick?: () => void;
} & PolymorphicComponentProps<T>;

type EmptySlotProps = BoxProps & {
  src?:
    | "person-minus"
    | "house"
    | "gate"
    | "no-talk"
    | "question"
    | "marketplace"
    | "meeting"
    | "no-sound";
  title: string;
  withButton?: boolean;
} & (
    | {
        withButton: true;
        text: string;
        btnProps: BtnProps;
      }
    | {
        withButton?: false;
        text?: string;
        btnProps?: BtnProps;
      }
  ) &
  (
    | {
        withDoubleButton: true;
        primaryText: string;
        secondaryText: string;
        primaryBtnProps: BtnProps;
        secondaryBtnProps: BtnProps;
      }
    | {
        withDoubleButton?: false;
        primaryText?: string;
        secondaryText?: string;
        primaryBtnProps?: BtnProps;
        secondaryBtnProps?: BtnProps;
      }
  );

export function EmptySlot({
  src,
  title,
  withButton,
  text,
  btnProps,
  withDoubleButton,
  primaryText,
  secondaryText,
  primaryBtnProps,
  secondaryBtnProps,
  ...props
}: EmptySlotProps) {
  return (
    <Stack
      gap={20}
      maw={540}
      h='100%'
      className='self-center'
      justify='center'
      align='center'
      mx='auto'
      p={10}
    >
      {src && (
        <Box component='figure' className='grid-set'>
          <Box
            bg='accent.9'
            className='mix-blend-lighten size-full'
            {...props}
          />
          <Image
            alt={`Doodle illustration with ${src}`}
            src={`/doodles/${src}.png`}
            width={120}
            height={120}
          />
        </Box>
      )}

      <Stack gap={30} justify='center' align='center'>
        <Stack gap={8} ta='center'>
          <Title
            fz={{
              base: "20",
              sm: "25",
            }}
            fw={400}
            className='text-primary-text-body'
            c='#938BB7'
          >
            {title}
          </Title>
        </Stack>

        {withButton && <Button {...btnProps}>{text}</Button>}
        {withDoubleButton && (
          <Stack gap={10}>
            <Button {...primaryBtnProps}>{primaryText}</Button>
            <Button variant='outline' {...secondaryBtnProps}>
              {secondaryText}
            </Button>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
