import { Center, Checkbox, Flex, Pill, Text } from "@mantine/core";
import { createColumnHelper } from "@tanstack/react-table";
import { Actionable } from "@/builders/types/table";
import { OccupantsData } from "@/builders/types/occupants";

const columnHelper = createColumnHelper<Actionable<OccupantsData>>();

export const occupantsColumns = [
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

  columnHelper.accessor("house.houseNumber", {
    header: "House No",
    enableSorting: false,
  }),

  columnHelper.accessor("user.fullname", {
    header: "Full Name",
    enableSorting: false,
    cell: (info) => {
      const firstname = info.row.original.user.firstname;
      const lastname = info.row.original.user.lastname ?? "";

      return `${firstname} ${lastname}`;
    },
  }),

  columnHelper.accessor("user.phone", {
    header: "Phone Number",
    enableSorting: false,
  }),
  columnHelper.accessor("noOfSubOccupants", {
    header: "Sub Occupant",
    enableSorting: false,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue();
      const isActive = value?.toLowerCase() === "active";

      return (
        <Center>
          <Pill
            c={isActive ? "green" : "red"}
            bg={isActive ? "green.1" : "red.1"}
            fw={500}
            className="capitalize"
            children={value}
            size="sm"
          />
        </Center>
      );
    },
  }),
  columnHelper.accessor("action", {
    header: "Actions",
    cell: ({ renderValue }) => renderValue(),
    enableSorting: false,
  }),
];

export const columnOrdering = ["select"];
