import { Box, Checkbox, Flex, Pill, Stack, Text } from "@mantine/core";
import { createColumnHelper } from "@tanstack/react-table";
import { Actionable } from "@/builders/types/table";
import { GatesData } from "@/builders/types/gates";

const columnHelper = createColumnHelper<Actionable<GatesData>>();

export const gatesColumns = [
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Flex justify='center' className='w-full'>
        <Checkbox
          checked={table.getIsAllPageRowsSelected()} // Select all rows on page
          indeterminate={table.getIsSomePageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()} // Toggles the selection for all rows
          classNames={{
            root: "justify-center",
          }}
        />
      </Flex>
    ),
    cell: ({ row }) => (
      <Checkbox
        classNames={{
          body: "justify-center",
        }}
        checked={row.getIsSelected()} // Check if the row is selected
        disabled={!row.getCanSelect()} // Disable if row selection is not allowed
        onChange={row.getToggleSelectedHandler()} // Toggles selection for individual row
      />
    ),
    enableSorting: false,
  }),

  columnHelper.accessor("name", {
    header: () => (
      <Text
        ta='center'
        fw={600}
        fz={14}
        className='w-full'
        children='Gate Name'
      />
    ),
    enableSorting: false,
    cell: ({ row }) => {
      const name = row.original.name;
      const location = row.original.location;

      return (
        <Stack gap={5} ta='center'>
          <Text fw={500} children={name} />
          <Text fz={14} children={location} />
        </Stack>
      );
    },
  }),

  columnHelper.accessor("status", {
    header: () => (
      <Text ta='center' fw={600} fz={14} className='w-full' children='Status' />
    ),
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue();
      const isActive = value.toLowerCase() === "open";

      return (
        <Box ta='center'>
          <Pill
            c={isActive ? "green" : "red"}
            bg={isActive ? "green.1" : "red.1"}
            fw={500}
            children={value}
            className='capitalize'
            size='sm'
            ta='center'
          />
        </Box>
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
