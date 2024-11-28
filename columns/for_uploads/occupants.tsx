import { Center, Pill, Text } from "@mantine/core";
import { createColumnHelper } from "@tanstack/react-table";
import { OccupantsData } from "@/builders/types/occupants";

const columnHelper = createColumnHelper<OccupantsData>();

export const occupantsColumns = [
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
            className='capitalize'
            children={value}
            size='sm'
          />
        </Center>
      );
    },
  }),
];

export const columnOrdering = ["select"];
