"use client";

import {
  Stack,
  Button,
  BoxProps,
  ButtonProps,
  MenuProps,
  Transition,
  StackProps,
  PolymorphicComponentProps,
} from "@mantine/core";

import { FilterDropdown, FilterData } from "../shared/interface/dropdowns";
import { Add } from "iconsax-react";
import { ClockIcon, DownloadIcon, NotesIcon, UploadIcon } from "@/icons";
import { ElementType, ReactNode } from "react";

enum IconType {
  FILTER = "filter",
  UPLOAD = "upload",
  DOWNLOAD = "download",
  ADD = "add",
  NOTES = "notes",
  CLOCK = "clock",
}
type Icon = "upload" | "download" | "add" | "notes" | "clock";

type Button = {
  icon: Icon;
  btnProps: BtnProps;
};

type BtnProps<T extends ElementType = "a"> = ButtonProps & {
  href?: string;
  onClick?: () => void;
} & PolymorphicComponentProps<T>;

type FlowFloatingButtonsProps = StackProps &
  (
    | {
        withPrimaryButon: true;
        primaryButton: Button;
      }
    | {
        withPrimaryButon?: false;
        primaryButton?: Button;
      }
  ) &
  (
    | {
        withSecondaryButtons: true;
        secondaryButtons: Button[];
      }
    | {
        withSecondaryButtons?: false;
        secondaryButtons?: Button[];
      }
  ) &
  (
    | {
        hasFilterButton: true;
        filterData: FilterData;
        filterProps?: MenuProps;
      }
    | {
        hasFilterButton?: false;
        filterData?: FilterData;
        filterProps?: MenuProps;
      }
  );

export function FlowFloatingButtons({
  primaryButton,
  secondaryButtons,
  filterData,
  filterProps,
  hasFilterButton,
  withPrimaryButon,
  withSecondaryButtons,
  ...containerProps
}: FlowFloatingButtonsProps) {
  const view: Record<PropertyKey, ReactNode> = {
    [IconType.ADD]: <Add size={30} />,
    [IconType.DOWNLOAD]: <DownloadIcon width={20} height={20} />,
    [IconType.UPLOAD]: <UploadIcon width={17} height={17} />,
    [IconType.NOTES]: <NotesIcon width={20} height={20} />,
    [IconType.CLOCK]: <ClockIcon width={20} height={20} />,
  };

  return (
    <Stack
      style={{
        position: "fixed",
        bottom: 30,
        right: 12,
        zIndex: 10,
      }}
      hiddenFrom='lg'
      {...containerProps}
    >
      <Stack justify='center' align='center'>
        {withSecondaryButtons &&
          secondaryButtons.map(({ icon, btnProps }) => {
            return (
              <Button
                key={icon}
                radius='md'
                w={50}
                h={50}
                p={0}
                variant='outline'
                bg='white'
                className='shadow-lg'
                {...btnProps}
              >
                {view[icon]}
              </Button>
            );
          })}

        {hasFilterButton && (
          <FilterDropdown
            showLabel={false}
            data={filterData}
            {...filterProps}
          />
        )}

        {withPrimaryButon && (
          <Button
            radius='xl'
            w={60}
            h={60}
            p={0}
            className='shadow-lg'
            {...primaryButton.btnProps}
          >
            {view[primaryButton.icon]}
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
