import {
  Box,
  Checkbox,
  CopyButton,
  Flex,
  Pill,
  Stack,
  Text,
} from "@mantine/core";
import { createColumnHelper } from "@tanstack/react-table";
import { Actionable } from "@/builders/types/table";
import { GateRequestData } from "@/builders/types/gate-requests";
import { cast, formatDate } from "@/packages/libraries";
import { DATE_FORMAT } from "@/packages/constants/time";
import { CopyIcon } from "@/icons";
import { handleSuccess } from "@/packages/notification";

const columnHelper = createColumnHelper<Actionable<GateRequestData>>();

export const gateRequestsColumns = [
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

  columnHelper.accessor("guestName", {
    header: "Guest Name",
    enableSorting: false,
    cell: ({ getValue }) => (
      <Text ta="center" fz={14} className="w-full" children={getValue()} />
    ),
  }),

  columnHelper.accessor("guestType", {
    header: "Guest Type",
    enableSorting: false,
    cell: ({ getValue }) => (
      <Text ta="center" fz={14} className="w-full" children={getValue()} />
    ),
  }),

  columnHelper.accessor("visitDate", {
    header: "Date",
    enableSorting: false,
    cell: ({ getValue }) => (
      <Text
        ta="center"
        fz={14}
        className="w-full"
        children={formatDate(getValue(), DATE_FORMAT)}
      />
    ),
  }),

  columnHelper.accessor("accessCode", {
    header: "Access Code",
    enableSorting: false,
    cell: ({ getValue }) => (
      <Flex justify="center" align="center" className="w-full" gap={8}>
        <Text ta="center" fz={14} c="blue.8" children={getValue()} />
        <CopyButton value={cast.string(getValue())}>
          {({ copy }) => (
            <CopyIcon
              onClick={() => {
                copy();
                handleSuccess({
                  message: "Access code copied successfully",
                  autoClose: 1200,
                });
              }}
              width={20}
            />
          )}
        </CopyButton>
      </Flex>
    ),
  }),

  columnHelper.accessor("status", {
    header: "Status",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue();

      const colors: Record<PropertyKey, { color: string; bg: string }> = {
        approved: { color: "green", bg: "green.1" },
        pending: { color: "#969921", bg: "#feffd7" },
        cancelled: { color: "red", bg: "red.1" },
      };

      return (
        <Box ta="center">
          <Pill
            ta="center"
            c={colors[value]?.color}
            bg={colors[value]?.bg}
            fw={500}
            children={value}
            className="capitalize"
            size="sm"
          />
        </Box>
      );
    },
  }),
  columnHelper.accessor("action", {
    header: "Actions",
    cell: ({ renderValue }) => (
      <Stack gap={5} ta="center" justify="center">
        {renderValue()}
      </Stack>
    ),
    enableSorting: false,
  }),
];

export const columnOrdering = ["select"];
