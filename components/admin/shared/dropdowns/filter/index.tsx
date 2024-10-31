import { Button, Menu, MenuProps, Tree, TreeNodeData } from "@mantine/core";

import { Leaf } from "./leaf";
import { ArrowDownIcon, FilterIcon, IconType } from "@/icons";
import { ReactNode } from "react";

export type FilterData = TreeNodeData[];

type FilterDropdownProps = MenuProps & {
  data: FilterData;
  icon?: JSX.Element | ReactNode;
} & (
    | {
        showLabel?: true;
        label?: string;
      }
    | {
        showLabel?: false;
        label?: string;
      }
  );

export function FilterDropdown({
  data,
  showLabel = true,
  icon: Icon = <FilterIcon />,
  label = "Filter",
  ...props
}: FilterDropdownProps) {
  return (
    <Menu {...props} position='bottom-end'>
      <Menu.Target>
        {showLabel ? (
          <Button
            variant='outline'
            fz='sm'
            size='md'
            leftSection={Icon}
            rightSection={<ArrowDownIcon />}
          >
            {label}
          </Button>
        ) : (
          <Button radius='md' w={50} h={50} variant='outline' bg='white' p={0}>
            {Icon}
          </Button>
        )}
      </Menu.Target>
      <Menu.Dropdown className='z-20 p-0 overflow-hidden' variant='action'>
        <Tree
          data={data}
          selectOnClick
          clearSelectionOnOutsideClick
          renderNode={(payload) => <Leaf {...payload} />}
          classNames={{
            subtree:
              "hidden absolute top-1/2 right-full mr-2 bg-white border border-primary-border-light rounded-lg shadow-2xl transform transition-all duration-300 ease-in-out overflow-hidden",
            // root: "relative shadow-2xl",
          }}
        />
      </Menu.Dropdown>
    </Menu>
  );
}
