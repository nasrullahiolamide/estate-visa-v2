"use client";

import {
  Stack,
  Button,
  BoxProps,
  ButtonProps,
  MenuProps,
  Transition,
} from "@mantine/core";

import { FilterDropdown, FilterData } from "../admin/shared/dropdowns";
import { Add } from "iconsax-react";
import { DownloadIcon, UploadIcon } from "@/svgs";
import { ReactNode, useEffect, useState } from "react";

enum IconType {
  FILTER = "filter",
  UPLOAD = "upload",
  DOWNLOAD = "download",
  ADD = "add",
}
type Icon = "filter" | "upload" | "download" | "add";

type Button = {
  icon: Icon;
  btnProps: ButtonProps & {
    onClick: () => void;
  };
};

type FlowFloatingButtonsProps = BoxProps &
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
}: FlowFloatingButtonsProps) {
  const view: Record<PropertyKey, ReactNode> = {
    [IconType.ADD]: <Add size={30} />,
    [IconType.DOWNLOAD]: <DownloadIcon width={20} height={20} />,
    [IconType.UPLOAD]: <UploadIcon width={20} height={20} />,
  };

  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const toggleOpen = () => setOpen((prev) => !prev);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 30,
        right: 12,
        zIndex: 10,
      }}
      className='block lg:hidden'
    >
      <Stack justify='center' align='center'>
        {withSecondaryButtons &&
          secondaryButtons.map(({ icon, btnProps }, index) => {
            if (icon === IconType.FILTER) return null;
            return (
              <Button
                radius='md'
                w={45}
                h={45}
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
            withArrow
            arrowPosition='center'
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
    </div>
  );
}
