import { createTree } from "@/packages/libraries";
import { Group, Menu, Box, RenderTreeNodePayload } from "@mantine/core";
import clsx from "clsx";
import { ArrowDown3, ArrowRight3 } from "iconsax-react";
import { create } from "lodash";

interface FileIconProps {
  name?: string;
  expanded: boolean;
}

function FileIcon({ name, expanded }: FileIconProps) {
  if (name) {
    return expanded ? (
      <ArrowDown3 color='currentColor' size='14' />
    ) : (
      <ArrowRight3 color='currentColor' size='14' />
    );
  }
  return null;
}

export function LeafDropdown({
  node,
  expanded,
  elementProps,
  hasChildren,
}: RenderTreeNodePayload) {
  return (
    <>
      <Menu.Item key={node.value}>{node.value}</Menu.Item>
    </>
  );
}

//   {
//     /* If this node has children, we show another dropdown */
//   }

{
  /* <Menu {...props}>
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
    {data?.map((item) => (
      <Fragment key={item.label}>
        <LeafDropdown node={item} />
        <Menu.Divider className='hidden' />
      </Fragment>
    ))}
  </Menu.Dropdown>
</Menu>; */
}
