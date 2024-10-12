import { FilterIcon } from "@/svgs";
import { Button, Menu, MenuProps } from "@mantine/core";
import clsx from "clsx";
import { ArrowDown01Icon } from "hugeicons-react";
import { Fragment } from "react";

interface FilterDropdownProps extends MenuProps {
  data: { label: string; value: string }[];
}

export function FilterDropdown({ data, ...props }: FilterDropdownProps) {
  return (
    <Menu {...props}>
      <Menu.Target>
        <Button
          variant='outline'
          leftSection={<FilterIcon />}
          rightSection={<ArrowDown01Icon />}
        >
          Filter
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {data.map((item, i) => (
          <Fragment key={item.label}>
            <Menu.Item key={item.label}>{item.label}</Menu.Item>
            <Menu.Divider className={clsx({ hidden: i === data.length - 1 })} />
          </Fragment>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
