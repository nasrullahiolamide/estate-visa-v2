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
import { makePath, PAGES } from "@/packages/libraries";
import Link from "next/link";

const content: StepContent<FormValues> = {
  0: ["name", "location", "numberOfHouses", "interests", "serviceRequestTypes"],
  1: ["houseTypes"],
  2: ["owner", "phone", "email", "username", "password"],
};

interface MobileProps extends ViewProps {}

export function MobileView({ onSubmit, isSubmitting, btnText }: MobileProps) {
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
                component={Link}
                href={makePath(PAGES.DASHBOARD, PAGES.ESTATES)}
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
              <Button
                flex={1}
                w='fit-content'
                type='submit'
                onSubmit={onSubmit}
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {btnText}
              </Button>
            </Flex>
          </FlowStepContent>
        </Stepper.Step>
      </Stepper>
    </FlowContainer>
  );
}
