import { Box, Checkbox, Pill, Text } from "@mantine/core";
import { createColumnHelper } from "@tanstack/react-table";
import { Actionable } from "@/builders/types/table";
import { ServiceRequestsData } from "@/builders/types/service-requests";
import { formatDate } from "@/packages/libraries";
import { DATE_FORMAT } from "@/packages/constants/time";

const columnHelper = createColumnHelper<Actionable<ServiceRequestsData>>();

export const serviceRequestsColumns = [
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

  columnHelper.accessor("occupant.house.houseNumber", {
    header: "House No",
    enableSorting: false,
  }),
  columnHelper.accessor("occupant.user.firstname", {
    header: "Name",
    enableSorting: false,
  }),
  columnHelper.accessor("occupant.isMain", {
    header: "Account Type",
    enableSorting: false,

    cell: ({ getValue }) => (getValue() ? "Occupant" : "Sub Occupant"),
  }),
  columnHelper.accessor("occupant.user.phone", {
    header: "Phone Number",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue();
      return <Text fz={14} c='blue.7' children={value} />;
    },
  }),
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
        declined: { color: "red", bg: "red.1" },
        approved: { color: "green", bg: "green.1" },
      };

      return (
        <Box ta='center'>
          <Pill
            ta='center'
            tt='capitalize'
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
