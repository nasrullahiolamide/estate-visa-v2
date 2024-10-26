import { createColumnHelper } from "@tanstack/react-table";
import { Button, Checkbox, Menu, Pill, Text } from "@mantine/core";
import { Actionable } from "@/builders/types/table";
import { EstatesData } from "@/builders/types/estates";
import { FlowMenu } from "@/components/layout";
import { ArrowDownIcon } from "@/svgs";
import { Fragment } from "react";

const columnHelper = createColumnHelper<Actionable<EstatesData>>();

export const estatesColumns = [
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()} // Select all rows on page
        indeterminate={table.getIsSomePageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()} // Toggles the selection for all rows
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()} // Check if the row is selected
        disabled={!row.getCanSelect()} // Disable if row selection is not allowed
        onChange={row.getToggleSelectedHandler()} // Toggles selection for individual row
      />
    ),
    enableSorting: false,
  }),

  columnHelper.accessor("estate_name", {
    header: "Estate Name",
    enableSorting: false,
  }),
  columnHelper.accessor("owner", {
    header: "Owner",
    enableSorting: false,
  }),
  columnHelper.accessor("no_of_houses", {
    header: () => (
      <Text
        ta='center'
        fw={600}
        fz={14}
        className='w-full'
        children='No of Houses'
      />
    ),
    enableSorting: false,
    cell: ({ getValue }) => (
      <Text ta='center' fz={14} className='w-full' children={getValue()} />
    ),
  }),
  columnHelper.accessor("location", {
    header: () => (
      <Text
        ta='center'
        fw={600}
        fz={14}
        className='w-full'
        children='Location'
      />
    ),
    enableSorting: false,
    cell: ({ getValue }) => (
      <Text ta='center' fz={14} className='w-full' children={getValue()} />
    ),
  }),
  columnHelper.accessor("interests", {
    header: "Interests",
    enableSorting: false,
    cell: ({ getValue }) => {
      const interests = getValue();
      const greaterThanOne = interests.length > 1;
      return (
        <Menu offset={2} position='bottom-end' closeOnItemClick={false}>
          <Menu.Target>
            <Button
              size='sm'
              fz={14}
              p={0}
              c='gray.12'
              variant='transparent'
              rightSection={
                greaterThanOne && <ArrowDownIcon className='ml-4' />
              }
            >
              {interests.length > 1 ? `${interests.at(0)}...` : interests.at(0)}
            </Button>
          </Menu.Target>
          {greaterThanOne && (
            <Menu.Dropdown variant='action' className=''>
              {/* <Menu.Label children='Interests' /> */}
              {interests.map((interest, i) => (
                <Fragment key={interest}>
                  <Menu.Item className='py-2 bg-transparent cursor-auto'>
                    <Text fz={13}>
                      <span className='mr-2'>{i + 1}.</span>
                      <span>{interest}</span>
                    </Text>
                  </Menu.Item>

                  {i !== interests.length - 1 && <Menu.Divider />}
                </Fragment>
              ))}
            </Menu.Dropdown>
          )}
        </Menu>
      );
    },
  }),

  columnHelper.accessor("action", {
    header: () => (
      <Text
        ta='center'
        fw={600}
        fz={14}
        className='w-full'
        children='Actions'
      />
    ),
    cell: ({ renderValue }) => renderValue(),
    enableSorting: false,
  }),
];

export const columnOrdering = ["select"];
