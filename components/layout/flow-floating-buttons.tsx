"use client";

import {
  Stack,
  Button,
  BoxProps,
  ButtonProps,
  MenuProps,
  Transition,
  StackProps,
} from "@mantine/core";

import { FilterDropdown, FilterData } from "../admin/shared/dropdowns";
import { Add } from "iconsax-react";
import { DownloadIcon, UploadIcon } from "@/icons";
import { ReactNode } from "react";

enum IconType {
  FILTER = "filter",
  UPLOAD = "upload",
  DOWNLOAD = "download",
  ADD = "add",
}
type Icon = "upload" | "download" | "add";

type Button = {
  icon: Icon;
  btnProps: ButtonProps & {
    onClick: () => void;
  };
};

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
    [IconType.UPLOAD]: <UploadIcon width={20} height={20} />,
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
