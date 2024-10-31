import { ArrowDownIcon } from "@/icons";
import { Text, Menu, RenderTreeNodePayload, Group, Flex } from "@mantine/core";
import clsx from "clsx";

interface LeafProps extends RenderTreeNodePayload {}

export function Leaf({ node, expanded, hasChildren, ...props }: LeafProps) {
  return (
    // <Menu.Item
    //   closeMenuOnClick={!hasChildren}
    //   miw={150}
    //   {...elementProps}
    //   className={clsx("hover:bg-gray-1 rounded-none p-4", {
    //     "!bg-purple-4": expanded,
    //   })}
    // >
    //   <Text
    //     size='md'
    //     fz={14}
    //     c='gray.11'
    //     // className='flex items-center gap-4 justify-between sm:justify-start'
    //     className='flex items-center justify-between'
    //   >
    //     <span>{node.label}</span>
    //     {hasChildren && (
    //       <ArrowDownIcon
    //         // className={clsx("rotate-0 sm:rotate-90  order-2 sm:order-1", {
    //         className={clsx("-rotate-90", {
    //           "-rotate-180": expanded,
    //         })}
    //         style={{
    //           transition: "transform 0.2s",
    //         }}
    //       />
    //     )}
    //     {/* <span className='order-1 sm:order-2'>{node.label}</span> */}
    //   </Text>
    // </Menu.Item>

    <Menu.Item
      closeMenuOnClick={!hasChildren}
      miw={150}
      className={clsx("hover:bg-gray-1 rounded-none p-4", {
        "!bg-purple-4": props.selected,
      })}
    >
      <Menu
        position='right-start'
        trigger='hover'
        openDelay={100}
        closeDelay={400}
        offset={20}
        closeOnItemClick={false}
      >
        <Menu.Target>
          <Flex
            align='center'
            justify='space-between'
            className='w-full h-full'
          >
            <span>{node.label}</span>
            {node.children && (
              <ArrowDownIcon
                style={{
                  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              />
            )}
          </Flex>
        </Menu.Target>

        {hasChildren && (
          <Menu.Dropdown variant='action' className='p-0 overflow-hidden'>
            {node.children?.map((childNode) => (
              <Leaf
                key={childNode.value}
                node={childNode}
                expanded={expanded}
                hasChildren={hasChildren}
                {...props}
              />
            ))}
          </Menu.Dropdown>
        )}
      </Menu>
    </Menu.Item>
  );
}
