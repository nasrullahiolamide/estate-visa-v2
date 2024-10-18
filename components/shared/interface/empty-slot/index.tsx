import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Image from "next/image";

type EmptySlotProps = BoxProps & {
  src?:
    | "person-minus"
    | "house"
    | "gate"
    | "no-talk"
    | "question"
    | "marketplace"
    | "meeting";
  title: string;
} & (
    | {
        withButton: true;
        text: string;
        btnProps: ButtonProps & { onClick?: () => void };
      }
    | {
        withButton?: false;
        text?: string;
        btnProps?: ButtonProps & { onClick?: () => void };
      }
  );

export function EmptySlot({
  src,
  title,
  withButton,
  text,
  btnProps,
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
            width={140}
            height={140}
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
      </Stack>
    </Stack>
  );
}
