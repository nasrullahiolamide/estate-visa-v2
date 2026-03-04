import { HouseData } from "@/builders/types/houses";
import { Actionable } from "@/builders/types/table";
import { DATE_FORMAT } from "@/packages/constants/time";
import { formatDate } from "@/packages/libraries";
import { Center, Checkbox, Flex, Pill, Text } from "@mantine/core";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Actionable<HouseData>>();

export const housesColumns = [
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Flex justify='center' className='w-full'>
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={table.getIsSomePageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
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
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
    enableSorting: false,
  }),

  columnHelper.accessor("houseNumber", {
    header: "House No",
    enableSorting: false,
  }),

  columnHelper.accessor("validTill", {
    header: "Expiry Date",
    enableSorting: false,
    cell: ({ getValue, row }) => (
      <Text
        ta='center'
        fz={14}
        className='w-full'
        children={getValue() ? formatDate(getValue(), DATE_FORMAT) : "--"}
      />
    ),
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
