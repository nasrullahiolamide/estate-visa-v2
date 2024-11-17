import { Checkbox, Pill, Text } from "@mantine/core";
import { createColumnHelper } from "@tanstack/react-table";
import { SubOccupantsData } from "@/builders/types/sub-occupants";

const columnHelper = createColumnHelper<SubOccupantsData>();

export const subOccupantsColumns = [
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

  columnHelper.accessor("house.houseNumber", {
    header: "House No",
    enableSorting: false,
  }),
  columnHelper.accessor("user.firstname", {
    header: "Full Name",
    enableSorting: false,
  }),
  columnHelper.accessor("user.phone", {
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
  columnHelper.accessor("mainOccupant.firstname", {
    header: "Occupant's Name",
    enableSorting: false,
  }),
  columnHelper.accessor("relationshipToMain", {
    header: "Relationship",
    enableSorting: false,
  }),
];

export const columnOrdering = ["select"];
