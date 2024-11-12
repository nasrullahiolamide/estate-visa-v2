"use client";

import clsx from "clsx";
import {
  Menu,
  Divider,
  Button,
  ButtonProps,
  MenuDropdownProps,
  Text,
  FloatingPosition,
} from "@mantine/core";
import { Fragment } from "react";
import { ArrowDown2 } from "iconsax-react";
import { Mark } from "@/icons";

interface FilterRequestsProps extends ButtonProps {
  data: string[];
  position?: FloatingPosition;
  dropDownProps?: MenuDropdownProps;
  onFilter: (value: string) => void;
  value: string;
}

export function FilterRequestsDropdown({
  data,
  dropDownProps,
  position = "bottom-end",
  onFilter,
  value,
  ...props
}: FilterRequestsProps) {
  return (
    <Menu position={position}>
      <Menu.Target>
        <Button
          variant='outline'
          size='md'
          color='gray.10'
          rightSection={<ArrowDown2 size={14} />}
          className='capitalize'
          {...props}
        >
          {value}
        </Button>
      </Menu.Target>

      <Menu.Dropdown miw={180} className='p-0' {...dropDownProps}>
        {data.length > 0 ? (
          data.map((item, i) => (
            <Fragment key={item}>
              <Menu.Item
                key={item}
                onClick={() => onFilter(item)}
                className={clsx(
                  "hover:bg-purple-4 rounded-none p-4 capitalize",
                  value === item && "bg-purple-4"
                )}
                classNames={{
                  itemLabel: clsx(
                    "flex items-center gap-3",
                    value === item && "font-medium"
                  ),
                }}
              >
                {value === item && <Mark width={10} height={10} />}
                {item}
              </Menu.Item>
              {i !== data.length - 1 && <Divider />}
            </Fragment>
          ))
        ) : (
          <Text className='p-4'>
            No recent requests found. Please check back later.
          </Text>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}
