import { useFlowDispatch } from "@/components/layout/flow-context";
import { FlowActionType } from "@/components/layout/use-flow-reducer";
import { ArrowDownIcon } from "@/icons";
import { Menu, RenderTreeNodePayload, Flex } from "@mantine/core";
import clsx from "clsx";

interface LeafProps extends RenderTreeNodePayload {
  child_value?: string;
}

const SORT_ORDER_OPTIONS = ["a-z", "z-a", "recent"];

export function Leaf({
  node,
  expanded,
  hasChildren,
  child_value,
  ...props
}: LeafProps) {
  const dispatch = useFlowDispatch();

  const handleFilter = () => {
    if (node.children?.length) return;

    const key =
      node.value === "status"
        ? "status"
        : SORT_ORDER_OPTIONS.includes(node.value)
          ? "sortOrder"
          : "sortBy";

    const value = node.value;

    dispatch({
      type: FlowActionType.SET_FILTER,
      payload: {
        [key]: value,
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
        position="right-start"
        openDelay={100}
        closeDelay={400}
        offset={20}
        closeOnItemClick={false}
      >
        <Menu.Target>
          <Flex
            align="center"
            justify="space-between"
            className="w-full h-full"
          >
            <span>{node.label}</span>
            {node.children && (
              <ArrowDownIcon
                style={{
                  transform: "rotate(270deg)",
                  transition: "transform 0.2s",
                }}
              />
            )}
          </Flex>
        </Menu.Target>

        {hasChildren && (
          <Menu.Dropdown variant="action" className="p-0 overflow-hidden">
            {node.children?.map((childNode) => (
              <Leaf
                key={childNode.value}
                node={childNode}
                expanded={expanded}
                hasChildren={hasChildren}
                child_value={childNode.value}
                {...props}
              />
            ))}
          </Menu.Dropdown>
        )}
      </Menu>
    </Menu.Item>
  );
}
