import { ArrowDownIcon } from "@/svgs";
import { Text, Menu, RenderTreeNodePayload } from "@mantine/core";
import clsx from "clsx";

interface LeafProps extends RenderTreeNodePayload {}

export function Leaf({
  node,
  expanded,
  hasChildren,
  elementProps,
  selected,
}: LeafProps) {
  return (
    <Menu.Item
      closeMenuOnClick={!hasChildren}
      miw={150}
      {...elementProps}
      className={clsx("hover:bg-gray-1 rounded-none p-4", {
        "!bg-purple-4": expanded,
      })}
    >
      <Text
        size='md'
        fz={14}
        c='gray.11'
        // className='flex items-center gap-4 justify-between sm:justify-start'
        className='flex items-center justify-between'
      >
        <span>{node.label}</span>
        {hasChildren && (
          <ArrowDownIcon
            // className={clsx("rotate-0 sm:rotate-90  order-2 sm:order-1", {
            className={clsx("-rotate-90", {
              "-rotate-180": expanded,
            })}
            style={{
              transition: "transform 0.2s",
            }}
          />
        )}
        {/* <span className='order-1 sm:order-2'>{node.label}</span> */}
      </Text>
    </Menu.Item>
  );
}
