import { createColumnHelper } from "@tanstack/react-table";
import { Checkbox, Pill, Stack, Text } from "@mantine/core";
import { Actionable } from "@/builders/types/table";
import { SubAdminListData } from "@/builders/types/sub-admins";
import dayjs from "dayjs";

const columnHelper = createColumnHelper<SubAdminListData>();

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

  columnHelper.accessor("full_name", {
    header: "Full Name",
    enableSorting: false,
  }),
  columnHelper.accessor("phone_number", {
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
  columnHelper.accessor("last_login", {
    header: "Last Login",
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <Stack>
          <Text fz={14}>{dayjs(value).format("DD/MM/YYYY")}</Text>
          <Text fz={14}>{dayjs(value).format("h:mm A")}</Text>
        </Stack>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue();
      const isActive = value === "Active";

      return (
        <Pill
          c={isActive ? "green" : "red"}
          bg={isActive ? "green.1" : "red.1"}
          fw={500}
          children={value}
          size='sm'
        />
      );
    },
  }),
  //   columnHelper.accessor("action", {
  //     header: "Actions",
  //     cell: ({ renderValue }) => renderValue(),
  //   }),
];

export const columnOrdering = ["select"];
