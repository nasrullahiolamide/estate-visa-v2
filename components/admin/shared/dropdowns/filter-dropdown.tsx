import { ArrowDownIcon, FilterIcon } from "@/svgs";
import { Button, Menu, MenuProps } from "@mantine/core";
import { Fragment } from "react";
import clsx from "clsx";

export type FilterData = {
  label: string;
  value: string;
  children?: FilterData;
}[];

interface FilterDropdownProps extends MenuProps {
  data: FilterData | undefined;
  showLabel?: boolean;
}

export function FilterDropdown({
  data,
  showLabel = true,
  ...props
}: FilterDropdownProps) {
  return (
    <Menu {...props}>
      <Menu.Target>
        {showLabel ? (
          <Button
            variant='outline'
            fz='sm'
            size='md'
            leftSection={<FilterIcon />}
            rightSection={<ArrowDownIcon />}
          >
            Filter
          </Button>
        ) : (
          <Button radius='md' w={50} h={50} variant='outline' bg='white' p={0}>
            <FilterIcon width={20} height={20} />
          </Button>
        )}
      </Menu.Target>
      <Menu.Dropdown className='z-20'>
        {data?.map((item, i) => (
          <Fragment key={item.label}>
            <Menu.Item key={item.label}>{item.label}</Menu.Item>
            <Menu.Divider className={clsx({ hidden: i === data.length - 1 })} />
          </Fragment>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
