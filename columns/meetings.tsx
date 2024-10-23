import { createColumnHelper } from "@tanstack/react-table";
import { Box, Checkbox, Flex, Pill, Stack, Text } from "@mantine/core";
import { Actionable } from "@/builders/types/table";
import { MeetingsData } from "@/builders/types/meetings";

import dayjs from "dayjs";
import { formatDate } from "@/packages/libraries";

const columnHelper = createColumnHelper<Actionable<MeetingsData>>();

export const meetingColumns = [
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

  columnHelper.accessor("title", {
    header: "Meeting Title",
    enableSorting: false,
  }),
  columnHelper.accessor("date", {
    header: "Date",
    enableSorting: false,
    cell: ({ getValue }) => formatDate(getValue(), "LL"),
  }),
  columnHelper.accessor("time", {
    header: "Time",
    enableSorting: false,
    cell: ({ getValue }) => formatDate(getValue(), "LT"),
  }),
  columnHelper.accessor("attendees", {
    header: () => (
      <Text
        ta='center'
        fw={600}
        fz={14}
        className='w-full'
        children='Attendees'
      />
    ),
    enableSorting: false,
    cell: ({ getValue }) => (
      <Text
        ta='center'
        fz={14}
        children={getValue() === 0 ? "-" : getValue()}
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
        completed: { color: "green", bg: "green.1" },
        scheduled: { color: "blue", bg: "blue.1" },
        cancelled: { color: "red", bg: "red.1" },
      };

      return (
        <Box ta='center'>
          <Pill
            ta='center'
            c={colors[value.toLowerCase()].color}
            bg={colors[value.toLowerCase()].bg}
            fw={500}
            children={value}
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
    cell: ({ renderValue }) => renderValue(),
    enableSorting: false,
  }),
];

export const columnOrdering = ["select"];
