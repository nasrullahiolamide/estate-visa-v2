import { MarketRulesData } from "@/builders/types/market-rules";
import { Actionable } from "@/builders/types/table";
import { formatDate } from "@/packages/libraries";
import { Center, Checkbox, Flex, Pill, Text } from "@mantine/core";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Actionable<MarketRulesData>>();

export const marketRuleColumns = [
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

  columnHelper.accessor("title", {
    header: "Rule Title",
    enableSorting: false,
  }),

  columnHelper.accessor("appliesTo", {
    header: "Applies To",
    enableSorting: false,
  }),

  columnHelper.accessor("date", {
    header: "Date",
    enableSorting: false,
    cell: ({ getValue }) => (
      <Text
        ta='center'
        fz={14}
        className='w-full'
        children={formatDate(getValue(), "DD/MM/YYYY")}
      />
    ),
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
  columnHelper.accessor("action", {
    header: "Actions",
    cell: ({ renderValue }) => renderValue(),
    enableSorting: false,
  }),
];

export const columnOrdering = ["select"];
