import { createColumnHelper } from "@tanstack/react-table";
import { Center, Checkbox, Flex, Pill, Stack, Text } from "@mantine/core";
import { Actionable } from "@/builders/types/table";
import { SubAdminListData } from "@/builders/types/sub-admins";
import dayjs from "dayjs";

const columnHelper = createColumnHelper<Actionable<SubAdminListData>>();

export const subAdminListColumns = [
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
  columnHelper.accessor("fullName", {
    header: "Full Name",
    enableSorting: false,
    cell: (info) => {
      const firstname = info.row.original.firstname;
      const lastname = info.row.original.lastname ?? "";

      return `${firstname} ${lastname}`;
    },
  }),

  columnHelper.accessor("phone", {
    header: "Phone Number",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <Text fz={14} c='blue.7'>
          {value}
        </Text>
      );
    },
  }),
  columnHelper.accessor("lastLogin", {
    header: () => (
      <Text
        ta='center'
        fw={600}
        fz={14}
        className='w-full'
        children='Last Login'
      />
    ),
    cell: ({ getValue }) => {
      const value = getValue();
      return value ? (
        <Flex ta='center' className='flex-row sm:flex-col' gap={25}>
          <Text fz={14}>{dayjs(value).format("DD/MM/YYYY")}</Text>
          <Text fz={14}>{dayjs(value).format("h:mm A")}</Text>
        </Flex>
      ) : (
        <Text fz={14} ta='center'>
          --
        </Text>
      );
    },
    enableSorting: false,
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
