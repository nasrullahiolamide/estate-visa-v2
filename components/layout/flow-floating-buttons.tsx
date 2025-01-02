"use client";

import {
  Button,
  ButtonProps,
  PolymorphicComponentProps,
  Stack,
  StackProps,
  Tooltip,
  Transition,
} from "@mantine/core";
import { useState } from "react";

import {
  ClockIcon,
  DownloadIcon,
  ListIcon,
  NotesIcon,
  UploadIcon,
} from "@/icons";
import { FilterData, FilterDropdown } from "../shared/interface/dropdowns";

import { Add, ArrowDown2, ArrowUp2 } from "iconsax-react";
import { ElementType, ReactNode } from "react";

enum IconType {
  FILTER = "filter",
  UPLOAD = "upload",
  DOWNLOAD = "download",
  ADD = "add",
  NOTES = "notes",
  CLOCK = "clock",
  LIST = "list",
}
type Icon =
  | "upload"
  | "download"
  | "add"
  | "notes"
  | "clock"
  | "filter"
  | "list";

type Button = {
  icon: Icon;
  filterData?: FilterData;
  btnProps?: BtnProps;
  label?: string;
};

type BtnProps<T extends ElementType = "a"> = ButtonProps & {
  href?: string;
  onClick?: () => void;
} & PolymorphicComponentProps<T>;

type FlowFloatingButtonsProps = StackProps & { buttons: Button[] };

export function FlowFloatingButtons({
  buttons,
  hidden,
  ...containerProps
}: FlowFloatingButtonsProps) {
  const [visible, setVisible] = useState(false);

  const view: Record<PropertyKey, ReactNode> = {
    [IconType.ADD]: <Add size={24} />,
    [IconType.DOWNLOAD]: <DownloadIcon width={16} height={16} />,
    [IconType.UPLOAD]: <UploadIcon width={15} height={15} />,
    [IconType.NOTES]: <NotesIcon width={20} height={20} />,
    [IconType.CLOCK]: <ClockIcon width={20} height={20} />,
    [IconType.LIST]: <ListIcon width={20} height={20} />,
  };

  return (
    <Stack
      style={{
        position: "absolute",
        bottom: 80,
        right: 12,
        width: "fit-content",
        height: "fit-content",
      }}
      hiddenFrom='lg'
      hidden={hidden}
      onClick={(ev) => {
        setVisible((prev) => !prev);
      }}
      {...containerProps}
    >
      <Stack justify='center' align='center'>
        {buttons?.map(({ icon, btnProps, filterData, label }, index) => (
          <Transition
            key={icon}
            mounted={visible}
            transition='slide-up'
            duration={300}
            timingFunction='ease'
            enterDelay={index * 50}
          >
            {(styles) => (
              <Tooltip label={label ?? icon} tt='capitalize' fz={14}>
                {icon === IconType.FILTER ? (
                  <FilterDropdown
                    showLabel={false}
                    data={filterData as FilterData}
                    style={styles}
                    hidden={hidden}
                  />
                ) : (
                  <Button
                    radius='md'
                    w={40}
                    h={40}
                    p={0}
                    variant='outline'
                    bg='white'
                    className='shadow-lg'
                    style={styles}
                    {...btnProps}
                    hidden={icon !== IconType.UPLOAD ? hidden : false}
                  >
                    {view[icon]}
                  </Button>
                )}
              </Tooltip>
            )}
          </Transition>
        ))}
      </Stack>

      <div
        style={{
          height: 50,
          width: 50,
          backgroundColor: "red",
        }}
      >
        <Button
          id='fc_frame'
          radius='xl'
          w={50}
          h={50}
          p={0}
          className='shadow-lg z-10'

          // onClick={() => setVisible((prev) => !prev)}
        >
          {!visible ? <ArrowUp2 size={24} /> : <ArrowDown2 size={24} />}
        </Button>
      </div>
    </Stack>
  );
}
