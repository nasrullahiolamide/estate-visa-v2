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

      const colors: Record<PropertyKey, { color: string; bg: string }> = {
        approved: { color: "green", bg: "green.1" },
        pending: { color: "#969921", bg: "#feffd7" },
        cancelled: { color: "red", bg: "red.1" },
      };

      return (
        <Box ta='center'>
          <Pill
            ta='center'
            c={colors[value]?.color}
            bg={colors[value]?.bg}
            fw={500}
            children={value}
            className='capitalize'
            size='sm'
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
    cell: ({ renderValue }) => (
      <Stack gap={5} ta='center' justify='center'>
        {renderValue()}
      </Stack>
    ),
    enableSorting: false,
  }),
];

export const columnOrdering = ["select"];
