import { Center, Pill, Text } from "@mantine/core";
import { createColumnHelper } from "@tanstack/react-table";
import { HouseData } from "@/builders/types/houses";

const columnHelper = createColumnHelper<HouseData>();

export const housesColumns = [
  columnHelper.accessor("houseNumber", {
    header: "House No",
    enableSorting: false,
  }),
  columnHelper.accessor("streetName", {
    header: "Street Name",
    enableSorting: false,
  }),
  columnHelper.accessor("occupantName", {
    header: "Occupant Name",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue();
      return <Text fz={14}>{value ?? "--"}</Text>;
    },
  }),
  columnHelper.accessor("noOfOccupants", {
    header: "Sub Occupant",
    enableSorting: false,
    cell: ({ getValue }) => (
      <Text ta='center' fz={14} className='w-full' children={getValue()} />
    ),
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
];

export const columnOrdering = ["select"];
