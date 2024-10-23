import { Checkbox, Pill, Text } from "@mantine/core";
import { createColumnHelper } from "@tanstack/react-table";
import { Actionable } from "@/builders/types/table";
import { OccupantsData } from "@/builders/types/occupants";
import { table } from "console";

const columnHelper = createColumnHelper<Actionable<OccupantsData>>();

export const occupantsColumns = [
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

  columnHelper.accessor("house_no", {
    header: "House No",
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
  columnHelper.accessor("sub_occupants", {
    header: "Sub Occupants",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <Text fz={14} ta='center'>
          {value}
        </Text>
      );
    },
  }),
  columnHelper.accessor("status", {
    header: "Status",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue();
      const isActive = value.toLowerCase() === "active";

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
