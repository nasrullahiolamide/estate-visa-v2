"use client";

import {
  Menu,
  Divider,
  Button,
  ButtonProps,
  MenuDropdownProps,
  Text,
  FloatingPosition,
} from "@mantine/core";
import { useState, Fragment } from "react";
import { ArrowDown2 } from "iconsax-react";
import { Mark } from "@/svgs";
import clsx from "clsx";

interface SelectProps extends ButtonProps {
  data: string[];
  position?: FloatingPosition;
  dropDownProps?: MenuDropdownProps;
}

export function Select({ data, dropDownProps, ...props }: SelectProps) {
  const [selected, setSelected] = useState(data[0]);

  return (
    <Menu>
      <Menu.Target>
        <Button
          variant='outline'
          size='md'
          color='gray.10'
          rightSection={<ArrowDown2 size={14} />}
          {...props}
        >
          {selected}
        </Button>
      </Menu.Target>

      <Menu.Dropdown miw={180} className='p-0' {...dropDownProps}>
        {data.map((item, i) => (
          <Fragment key={item}>
            <Menu.Item
              key={item}
              onClick={() => setSelected(item)}
              className={clsx(
                "hover:bg-purple-4 rounded-none p-4",
                selected === item && "bg-purple-4"
              )}
              classNames={{
                itemLabel: clsx(
                  "flex items-center gap-3",
                  selected === item && "font-medium"
                ),
              }}
            >
              {selected === item && <Mark width={10} height={10} />}
              {item}
            </Menu.Item>
            {i !== data.length - 1 && <Divider />}
          </Fragment>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
