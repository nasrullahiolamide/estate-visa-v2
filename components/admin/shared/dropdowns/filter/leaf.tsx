import { useFlowDispatch } from "@/components/layout/flow-context";
import { FlowActionType } from "@/components/layout/use-flow-reducer";
import { ArrowDownIcon } from "@/icons";
import { Menu, RenderTreeNodePayload, Flex } from "@mantine/core";
import clsx from "clsx";

interface LeafProps extends RenderTreeNodePayload {}

export function Leaf({ node, expanded, hasChildren, ...props }: LeafProps) {
  const dispatch = useFlowDispatch();

  const handleFilter = () => {
    dispatch({
      type: FlowActionType.SET_FILTER,
      payload: {
        sortBy: node.value,
      },
    });
  };

  return (
    <Menu.Item
      closeMenuOnClick={!hasChildren}
      miw={150}
      className={clsx("hover:bg-purple-4 rounded-none px-4", {
        "!bg-purple-4": props.selected,
      })}
      onClick={handleFilter}
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
