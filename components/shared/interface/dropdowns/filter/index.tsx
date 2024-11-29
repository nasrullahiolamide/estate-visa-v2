import { Button, Menu, MenuProps, Tree, TreeNodeData } from "@mantine/core";

import { Leaf } from "./leaf";
import { ArrowDownIcon, FilterIcon, IconType } from "@/icons";
import { ReactNode } from "react";
import { Tooltip } from "@mantine/core";

export type FilterData = TreeNodeData[];

type FilterDropdownProps = MenuProps & {
  data: FilterData;
  icon?: JSX.Element | ReactNode;
  style?: React.CSSProperties;
  hidden?: boolean;
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
  style,
  ...props
}: FilterDropdownProps) {
  return (
    <div style={style}>
      <Menu {...props} position='bottom-end'>
        <Menu.Target>
          {showLabel ? (
            <Button
              variant='outline'
              fz='sm'
              size='md'
              leftSection={Icon}
              rightSection={<ArrowDownIcon />}
              hidden={props.hidden}
            >
              {label}
            </Button>
          ) : (
            <Tooltip label={label} tt='capitalize'>
              <Button
                radius='md'
                w={40}
                h={40}
                variant='outline'
                bg='white'
                p={0}
                hidden={props.hidden}
              >
                {Icon}
              </Button>
            </Tooltip>
          )}
        </Menu.Target>
        <Menu.Dropdown
          className='z-20 p-0 overflow-hidden'
          variant='action'
          hidden={props.hidden}
        >
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
    </div>
  );
}
