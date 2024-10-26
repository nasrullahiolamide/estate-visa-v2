"use client";

import {
  FlowContainer,
  FlowProgress,
  FlowStepContent,
} from "@/components/layout";
import { ArrowLeft, ArrowRight } from "iconsax-react";
import { StepContent, useStepper } from "@/packages/hooks/use-stepper";
import { Button, Flex, Stepper } from "@mantine/core";
import { FormValues, useFormContext } from "../form-context";
import { ManagementProfile } from "../fields/management-profile";
import { BasicInfo } from "../fields/basic-info";
import { HouseTypes } from "../fields/house-types";
import { Services } from "../fields/services";
import { ViewProps } from ".";
import { navigate } from "@/packages/actions";
import { PAGES } from "@/packages/libraries";

const content: StepContent<FormValues> = {
  0: ["estate_name", "estate_location", "no_of_houses", "service_types"],
  1: ["house_types"],
  2: [
    "estate_owner",
    "estate_phone_number",
    "estate_email_address",
    "estate_username",
    "estate_password",
  ],
};

interface MobileProps extends ViewProps {}

export function MobileView({ onSubmit }: MobileProps) {
  const form = useFormContext();
  const { active, next, previous, max } = useStepper<FormValues>({
    content,
    form,
  });

  return (
    <FlowContainer hiddenFrom='lg' type='plain' className='scrollbar-none'>
      <FlowProgress active={active} total={max} />
      <Stepper
        variant='default'
        active={active}
        allowNextStepsSelect={false}
        classNames={{
          content: "h-full pt-5",
          steps: "hidden",
          root: "h-full",
        }}
      >
        <Stepper.Step withIcon={false}>
          <FlowStepContent gap={18}>
            <BasicInfo />
            <Services />
            <Flex gap={30} wrap='wrap' mt='auto'>
              <Button
                variant='outline'
                flex={1}
                type='button'
                w='fit-content'
                onClick={() => navigate(PAGES.ESTATES)}
              >
                Cancel
              </Button>
              <Button
                w='fit-content'
                flex={1}
                type='button'
                onClick={next}
                rightSection={<ArrowRight size={20} />}
              >
                Proceed
              </Button>
            </Flex>
          </FlowStepContent>
        </Stepper.Step>

        <Stepper.Step withIcon={false}>
          <FlowStepContent gap={18}>
            <HouseTypes />
            <Flex gap={30} wrap='wrap' mt='auto'>
              <Button
                variant='outline'
                flex={1}
                type='button'
                w='fit-content'
                onClick={previous}
                leftSection={<ArrowLeft size={20} />}
              >
                Previous
              </Button>
              <Button
                flex={1}
                w='fit-content'
                type='button'
                onClick={next}
                rightSection={<ArrowRight size={20} />}
              >
                Proceed
              </Button>
            </Flex>
          </FlowStepContent>
        </Stepper.Step>

        <Stepper.Step withIcon={false}>
          <FlowStepContent gap={18}>
            <ManagementProfile />
            <Flex gap={30} wrap='wrap' mt='auto'>
              <Button
                variant='outline'
                flex={1}
                w='fit-content'
                type='button'
                onClick={previous}
                leftSection={<ArrowLeft size={20} />}
              >
                Previous
              </Button>
              <Button flex={1} w='fit-content' type='submit' onClick={onSubmit}>
                Add Estate
              </Button>
            </Flex>
          </FlowStepContent>
        </Stepper.Step>
      </Stepper>
    </FlowContainer>
  );
}
