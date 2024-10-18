import { FilterIcon } from "@/svgs";
import { Button, Menu, MenuProps } from "@mantine/core";
import clsx from "clsx";
import { ArrowDown01Icon } from "hugeicons-react";
import { Fragment } from "react";

export type FilterData = { label: string; value: string }[];

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
            rightSection={<ArrowDown01Icon />}
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
