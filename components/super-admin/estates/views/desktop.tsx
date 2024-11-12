"use client";

import { Button, Divider } from "@mantine/core";
import { FlowContainer } from "@/components/layout/flow-container";

import { ManagementProfile } from "../fields/management-profile";
import { BasicInfo } from "../fields/basic-info";
import { Services } from "../fields/services";
import { HouseTypes } from "../fields/house-types";
import { ViewProps } from ".";

interface DesktopProps extends ViewProps {}

export function DesktopView({ onSubmit, isSubmitting, btnText }: DesktopProps) {
  return (
    <FlowContainer
      className='hidden lg:flex rounded-2xl'
      justify='center'
      gap={18}
      type='plain'
      bg='white'
    >
      <BasicInfo />
      <HouseTypes />
      <Services />
      <Divider my={20} />
      <ManagementProfile />
      <Button
        type='submit'
        mt={25}
        onClick={onSubmit}
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        {btnText}
      </Button>
    </FlowContainer>
  );
}
