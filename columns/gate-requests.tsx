import { Box, Checkbox, Flex, Pill, Stack, Text } from "@mantine/core";
import { createColumnHelper } from "@tanstack/react-table";
import { Actionable } from "@/builders/types/table";
import { GateRequestData } from "@/builders/types/gate-requests";
import { formatDate } from "@/packages/libraries";
import { DATE_FORMAT } from "@/packages/constants/time";

const columnHelper = createColumnHelper<Actionable<GateRequestData>>();

export const gateRequestsColumns = [
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

  columnHelper.accessor("guestName", {
    header: () => (
      <Text
        ta='center'
        fw={600}
        fz={14}
        className='w-full'
        children='Guest Name'
      />
    ),
    enableSorting: false,
    cell: ({ getValue }) => (
      <Text ta='center' fz={14} className='w-full' children={getValue()} />
    ),
  }),

  columnHelper.accessor("guestType", {
    header: () => (
      <Text
        ta='center'
        fw={600}
        fz={14}
        className='w-full'
        children='Guest Type'
      />
    ),
    enableSorting: false,
    cell: ({ getValue }) => (
      <Text ta='center' fz={14} className='w-full' children={getValue()} />
    ),
  }),

  columnHelper.accessor("visitDate", {
    header: () => (
      <Text ta='center' fw={600} fz={14} className='w-full' children='Date' />
    ),
    enableSorting: false,
    cell: ({ getValue }) => (
      <Text
        ta='center'
        fz={14}
        className='w-full'
        children={formatDate(getValue(), DATE_FORMAT)}
      />
    ),
  }),

  columnHelper.accessor("phoneNo", {
    header: () => (
      <Text
        ta='center'
        fw={600}
        fz={14}
        className='w-full'
        children='Phone No'
      />
    ),
    enableSorting: false,
    cell: ({ getValue }) => (
      <Text ta='center' fz={14} className='w-full' children={getValue()} />
    ),
  }),

  columnHelper.accessor("accessCode", {
    header: () => (
      <Text
        ta='center'
        fw={600}
        fz={14}
        className='w-full'
        children='Access Code'
      />
    ),
    enableSorting: false,
    cell: ({ getValue }) => (
      <Text
        ta='center'
        fz={14}
        className='w-full'
        c='blue.8'
        children={getValue()}
      />
    ),
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
