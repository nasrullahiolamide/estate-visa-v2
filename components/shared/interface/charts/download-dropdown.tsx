"use client";

import { DownloadIcon } from "@/icons";
import {
  Button,
  ButtonProps,
  Divider,
  FloatingPosition,
  Menu,
  MenuDropdownProps,
} from "@mantine/core";
import clsx from "clsx";
import { Fragment } from "react";

interface DownloadDropdownProps extends ButtonProps {
  position?: FloatingPosition;
  dropDownProps?: MenuDropdownProps;
}

const data = ["CSV", "Excel", "PDF"];

export function DownloadDropdown({
  dropDownProps,
  position = "bottom-end",
  ...props
}: DownloadDropdownProps) {
  return (
    <Menu position={position}>
      <Menu.Target>
        <Button variant='transparent' size='md' {...props}>
          <DownloadIcon
            color='#3944BC'
            className='cursor-pointer'
            width={20}
            height={20}
          />
        </Button>
      </Menu.Target>

      <Menu.Dropdown miw={180} className='p-0' {...dropDownProps}>
        <Menu.Label
          fz='sm'
          fw={500}
          className='p-3 bg-purple-4 text-primary-text-body'
        >
          Download as
        </Menu.Label>
        {data.map((item, i) => (
          <Fragment key={item}>
            <Menu.Item
              key={item}
              onClick={() => console.log(item)}
              className={clsx("hover:bg-purple-2 rounded-none p-3 border-t")}
              classNames={{
                itemLabel: clsx("flex items-center gap-3"),
              }}
            >
              {item}
            </Menu.Item>
            {i !== data.length - 1 && <Divider />}
          </Fragment>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
