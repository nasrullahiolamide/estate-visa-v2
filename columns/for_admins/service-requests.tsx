import { ServiceRequestsData } from "@/builders/types/service-requests";
import { Actionable } from "@/builders/types/table";
import { DATE_FORMAT } from "@/packages/constants/time";
import { formatDate } from "@/packages/libraries";
import { Box, Checkbox, Flex, Pill, Text } from "@mantine/core";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Actionable<ServiceRequestsData>>();

export const serviceRequestsColumns = [
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

  columnHelper.accessor("occupant.house.houseNumber", {
    header: "House No",
    enableSorting: false,
  }),
  // columnHelper.accessor("occupant.user.firstname", {
  //   header: "Name",
  //   enableSorting: false,
  // }),
  columnHelper.accessor("occupant.isMain", {
    header: "Account Type",
    enableSorting: false,

    cell: ({ getValue }) => (getValue() ? "Occupant" : "Sub Occupant"),
  }),
  // columnHelper.accessor("occupant.user.phone", {
  //   header: "Phone Number",
  //   enableSorting: false,
  //   cell: ({ getValue }) => {
  //     const value = getValue();
  //     return <Text fz={14} c='blue.7' children={value} />;
  //   },
  // }),
  columnHelper.accessor("serviceType", {
    header: "Service Type",
    enableSorting: false,
    cell: ({ getValue }) => (
      <Text ta='center' fz={14} className='w-full' children={getValue()} />
    ),
  }),

  columnHelper.accessor("createdAt", {
    header: "Date Submitted",
    enableSorting: false,
    cell: ({ getValue }) => formatDate(getValue(), DATE_FORMAT),
  }),

  columnHelper.accessor("status", {
    header: "Status",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue();

      const colors: Record<PropertyKey, { color: string; bg: string }> = {
        pending: { color: "#969921", bg: "#feffd7" },
        "in-progress": { color: "blue", bg: "blue.1" },
        completed: { color: "green", bg: "green.1" },
      };

      return (
        <Box ta='center'>
          <Pill
            ta='center'
            tt='capitalize'
            c={colors[value?.toLowerCase()]?.color || "gray"}
            bg={colors[value?.toLowerCase()]?.bg || "gray.1"}
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
