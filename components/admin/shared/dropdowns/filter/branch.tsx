import { Button, Menu, MenuProps, Tree } from "@mantine/core";
import { createTree } from "@/packages/libraries";

import { LeafDropdown } from "./leaf";
import { ArrowDownIcon, FilterIcon } from "@/svgs";
import { FilterData } from ".";

interface BranchProps extends MenuProps {
  data: FilterData | undefined;
  showLabel?: boolean;
}

export function Branch({ data, showLabel = true, ...props }: BranchProps) {
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
          <Tree
            key={i}
            levelOffset={20}
            data={createTree(item)}
            renderNode={(payload) => <LeafDropdown {...payload} />}
          />
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
