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
import { ArrowDownIcon, Mark } from "@/icons";

interface FilterRequestsProps extends ButtonProps {
  data: string[] | { label: string; value: string }[];
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
          size='sm'
          fz='sm'
          color='gray.10'
          rightSection={<ArrowDownIcon width={14} />}
          className='capitalize'
          {...props}
        >
          {value || "All"}
        </Button>
      </Menu.Target>

      <Menu.Dropdown miw={180} className='p-0' {...dropDownProps}>
        {data.length > 0 ? (
          data.map((item, i) => {
            const filterItem = typeof item === "string" ? item : item.value;

            return (
              <Fragment key={filterItem}>
                <Menu.Item
                  key={filterItem}
                  onClick={() => onFilter(filterItem)}
                  className={clsx(
                    "hover:bg-purple-2 rounded-none p-3 capitalize",
                    value === filterItem && "bg-purple-4"
                  )}
                  classNames={{
                    itemLabel: clsx(
                      "flex items-center gap-3",
                      value === filterItem && "font-medium"
                    ),
                  }}
                >
                  {value === filterItem && <Mark width={10} height={10} />}
                  {typeof item === "string" ? (
                    <Text fz='sm'>{item}</Text>
                  ) : (
                    <Text fz='sm'>{item.label}</Text>
                  )}
                </Menu.Item>
                {i !== data.length - 1 && <Divider />}
              </Fragment>
            );
          })
        ) : (
          <Text className='p-4'>
            No recent requests found. Please check back later.
          </Text>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}
