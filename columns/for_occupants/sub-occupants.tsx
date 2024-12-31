import { Checkbox, Flex, Pill, Text } from "@mantine/core";
import { createColumnHelper } from "@tanstack/react-table";
import { SubOccupantsData } from "@/builders/types/sub-occupants";
import { Actionable } from "@/builders/types/table";

const columnHelper = createColumnHelper<Actionable<SubOccupantsData>>();

export const ActionSubOccupantsColumns = [
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Flex justify="center" className="w-full">
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

  columnHelper.accessor("user.firstname", {
    header: "Full Name",
    enableSorting: false,
  }),
  columnHelper.accessor("user.phone", {
    header: () => (
      <Text
        ta="center"
        fw={600}
        fz={14}
        className="w-full"
        children="Phone Number"
      />
    ),
    enableSorting: false,
    cell: ({ getValue }) => {
      return <Text fz={14} c="blue.7" ta="center" children={getValue()} />;
    },
  }),
  columnHelper.accessor("relationshipToMain", {
    header: () => (
      <Text
        ta="center"
        fw={600}
        fz={14}
        className="w-full"
        children="Relationship"
      />
    ),
    enableSorting: false,
    cell: ({ getValue }) => {
      return <Text fz={14} ta="center" children={getValue()} />;
    },
  }),
  columnHelper.accessor("action", {
    header: () => (
      <Text
        ta="center"
        fw={600}
        fz={14}
        className="w-full"
        children="Actions"
      />
    ),
    cell: ({ renderValue }) => renderValue(),
    enableSorting: false,
  }),
];

export const columnOrdering = ["select"];
