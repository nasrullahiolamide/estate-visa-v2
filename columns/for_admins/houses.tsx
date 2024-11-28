import { Center, Checkbox, Flex, Pill, Text } from "@mantine/core";
import { createColumnHelper } from "@tanstack/react-table";
import { Actionable } from "@/builders/types/table";
import { HouseData } from "@/builders/types/houses";

const columnHelper = createColumnHelper<Actionable<HouseData>>();

export const housesColumns = [
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

  columnHelper.accessor("houseNumber", {
    header: "House No",
    enableSorting: false,
  }),
  columnHelper.accessor("streetName", {
    header: "Street Name",
    enableSorting: false,
  }),
  columnHelper.accessor("occupantName", {
    header: "Occupant Name",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue();
      return <Text fz={14}>{value ?? "--"}</Text>;
    },
  }),
  columnHelper.accessor("noOfOccupants", {
    header: () => (
      <Text
        ta='center'
        fw={600}
        fz={14}
        className='w-full'
        children='Sub Occupant'
      />
    ),
    enableSorting: false,
    cell: ({ getValue }) => (
      <Text ta='center' fz={14} className='w-full' children={getValue()} />
    ),
  }),
  columnHelper.accessor("status", {
    header: () => (
      <Text ta='center' fw={600} fz={14} className='w-full' children='Status' />
    ),
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue();
      const isActive = value.toLowerCase() === "active";

      return (
        <Center>
          <Pill
            c={isActive ? "green" : "red"}
            bg={isActive ? "green.1" : "red.1"}
            fw={500}
            className='capitalize'
            children={value}
            size='sm'
          />
        </Center>
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
