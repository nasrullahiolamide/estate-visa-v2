import { Fragment } from "react";
import { MODALS } from "@/packages/libraries";

import {
  Button,
  Text,
  Stack,
  Flex,
  BoxProps,
  ButtonProps,
  FlexProps,
} from "@mantine/core";
import { Emblem } from "@/components/shared/interface";
import { modals } from "@mantine/modals";

type ConfirmationModalProps = BoxProps & {
  src?: "delete" | "success" | "disable" | "logout";
  srcProps?: FlexProps;
  title: string;
  description?: string;
  btnText?: string;
  btnProps?: ButtonProps & { onClick?: () => void };
} & (
    | {
        withTwoButtons: true;
        primaryBtnText: string;
        secondaryBtnText: string;
        primaryBtnProps?: ButtonProps & { onClick?: () => void };
        secondaryBtnProps?: ButtonProps & { onClick?: () => void };
      }
    | {
        withTwoButtons?: false;
        primaryBtnText?: string;
        secondaryBtnText?: string;
        primaryBtnProps?: ButtonProps & { onClick?: () => void };
        secondaryBtnProps?: ButtonProps & { onClick?: () => void };
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
      <Stack py={10} className='sm:p-5'>
        <Emblem image={`/sprites/${src}.gif`} h={110} ml={50} {...srcProps} />
        {description ? (
          <>
            <Text ta='center' className='prose-2xl/medium'>
              {title}
            </Text>
            <Text ta='center' className='prose-lg/regular' component='p'>
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
          <Flex justify='center' gap={15} mt={20} wrap='wrap'>
            <Button
              w='fit-content'
              variant='outline'
              className='sm:flex-1'
              color='gray.12'
              onClick={secondaryBtnProps?.onClick || handleCancel}
              {...secondaryBtnProps}
            >
              {secondaryBtnText}
            </Button>
            <Button
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