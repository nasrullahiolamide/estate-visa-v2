import { Button, Menu, MenuProps, Tree, TreeNodeData } from "@mantine/core";

import { Leaf } from "./leaf";
import { ArrowDownIcon, FilterIcon } from "@/svgs";

export type FilterData = TreeNodeData[];

interface FilterDropdownProps extends MenuProps {
  data: FilterData;
  showLabel?: boolean;
}

export function FilterDropdown({
  data,
  showLabel = true,
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
      <Menu.Dropdown className='z-20 p-0' variant='action'>
        <Tree
          data={data}
          selectOnClick
          clearSelectionOnOutsideClick
          renderNode={(payload) => <Leaf {...payload} />}
          classNames={{
            subtree:
              "absolute top-1/2 right-full mr-2 bg-white border border-primary-border-light rounded-lg shadow-2xl transform transition-all duration-300 ease-in-out overflow-hidden",
            root: "relative shadow-2xl",
          }}
        />
      </Menu.Dropdown>
    </Menu>
  );
}
