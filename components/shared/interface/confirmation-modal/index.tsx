import { MODALS } from "@/packages/libraries";
import { ElementType, Fragment } from "react";

import { Emblem } from "@/components/shared/interface";
import {
  BoxProps,
  Button,
  ButtonProps,
  Flex,
  FlexProps,
  PolymorphicComponentProps,
  Stack,
  Text,
} from "@mantine/core";
import { modals } from "@mantine/modals";

type BtnProps<T extends ElementType = "a"> = ButtonProps & {
  href?: string;
  onClick?: () => void;
} & PolymorphicComponentProps<T>;

type ConfirmationModalProps = BoxProps & {
  src?:
    | "delete"
    | "success"
    | "disable"
    | "logout"
    | "share"
    | "exit"
    | "sad"
    | "warning"
    | "hour-glass";
  srcProps?: FlexProps;
  title: string;
  description?: string;
  btnText?: string;
  btnProps?: BtnProps;
} & (
    | {
        withTwoButtons: true;
        primaryBtnText: string;
        secondaryBtnText: string;
        primaryBtnProps?: BtnProps;
        secondaryBtnProps?: BtnProps;
      }
    | {
        withTwoButtons?: false;
        primaryBtnText?: string;
        secondaryBtnText?: string;
        primaryBtnProps?: BtnProps;
        secondaryBtnProps?: BtnProps;
      }
  );

export function ConfirmationModal({
  title,
  description,
  src,
  withTwoButtons,
  btnText,
  primaryBtnText,
  secondaryBtnText,
  srcProps,
  btnProps,
  primaryBtnProps,
  secondaryBtnProps,
}: ConfirmationModalProps) {
  function handleCancel() {
    modals.close(MODALS.CONFIRMATION);
  }

  return (
    <Fragment>
      <Stack p={10} gap={24}>
        {src && (
          <Emblem image={`/sprites/${src}.gif`} h={110} ml={40} {...srcProps} />
        )}
        {description ? (
          <>
            <Text ta='center' className='prose-xl/medium'>
              {title}
            </Text>
            <Text ta='center' className='prose-base/regular' component='p'>
              {description}
            </Text>
          </>
        ) : (
          <Text ta='center' className='prose-xl/regular sm:prose-2xl/regular'>
            {title}
          </Text>
        )}

        {!withTwoButtons ? (
          <Button
            mt={20}
            {...btnProps}
            onClick={btnProps?.onClick || handleCancel}
          >
            {btnText}
          </Button>
        ) : (
          <Flex justify='center' gap={20} mt={20} wrap='wrap'>
            <Button
              variant='outline'
              h={45}
              fz={14}
              size='compact-sm'
              flex={1}
              color='gray.12'
              onClick={secondaryBtnProps?.onClick || handleCancel}
              {...secondaryBtnProps}
            >
              {secondaryBtnText}
            </Button>
            <Button
              h={45}
              fz={14}
              size='compact-sm'
              flex={1}
              onClick={primaryBtnProps?.onClick || handleCancel}
              {...primaryBtnProps}
            >
              {primaryBtnText}
            </Button>
          </Flex>
        )}
      </Stack>
    </Fragment>
  );
}
