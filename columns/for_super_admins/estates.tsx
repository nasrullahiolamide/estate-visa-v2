import { createColumnHelper } from "@tanstack/react-table";
import { Button, Checkbox, Menu, Pill, Text } from "@mantine/core";
import { Actionable } from "@/builders/types/table";
import { EstatesData } from "@/builders/types/estates";
import { FlowMenu } from "@/components/layout";
import { ArrowDownIcon } from "@/icons";
import { Fragment } from "react";

const columnHelper = createColumnHelper<Actionable<EstatesData>>();

export const estatesColumns = [
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

  columnHelper.accessor("name", {
    header: "Estate Name",
    enableSorting: false,
  }),
  columnHelper.accessor("owner", {
    header: "Owner",
    enableSorting: false,
  }),
  columnHelper.accessor("numberOfHouses", {
    header: "No of Houses",
    enableSorting: false,
  }),
  columnHelper.accessor("location", {
    header: "Location",
    enableSorting: false,
  }),
  columnHelper.accessor("interests", {
    header: "Interests",
    enableSorting: false,
    cell: ({ getValue }) => {
      const interests = getValue();
      if (!interests) return null;
      const greaterThanOne = interests.length > 1;
      return (
        <Menu offset={2} position="bottom-end" closeOnItemClick={false}>
          <Menu.Target>
            <Button
              size="sm"
              fz={14}
              p={0}
              c="gray.12"
              variant="transparent"
              rightSection={
                greaterThanOne && <ArrowDownIcon className="ml-3" />
              }
            >
              {interests.length > 1 ? `${interests.at(0)}...` : interests.at(0)}
            </Button>
          </Menu.Target>
          {greaterThanOne && (
            <Menu.Dropdown variant="action" className="">
              {interests.map((interest, i) => (
                <Fragment key={interest}>
                  <Menu.Item className="py-2 bg-transparent cursor-auto">
                    <Text fz={13}>
                      <span className="mr-2">{i + 1}.</span>
                      <span>{interest}</span>
                    </Text>
                  </Menu.Item>

                  {i !== interests.length - 1 && <Menu.Divider />}
                </Fragment>
              ))}
            </Menu.Dropdown>
          )}
        </Menu>
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
