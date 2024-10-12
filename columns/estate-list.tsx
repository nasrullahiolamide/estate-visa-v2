import { createColumnHelper } from "@tanstack/react-table";

import { Actionable } from "@/builders/types/table";
import { EstateListData } from "@/builders/types/estate-list";

const columnHelper = createColumnHelper<Actionable<EstateListData>>();

export const estateListColumns = [
  columnHelper.display({
    id: "sequence",
    header: "S/N",
    cell: ({ row }) => row.index + 1,
  }),
  columnHelper.accessor("estate_name", {
    header: "Estate Name",
    enableSorting: false,
  }),
  columnHelper.accessor("owner", {
    header: "Owner",
    enableSorting: false,
  }),
  columnHelper.accessor("no_of_houses", {
    header: "No of Houses",
    enableSorting: false,
  }),
  columnHelper.accessor("location", {
    header: "Location",
    enableSorting: false,
  }),
  columnHelper.accessor("interest", {
    header: "Interest",
    enableSorting: false,
  }),

  columnHelper.accessor("action", {
    header: "Actions",
    cell: ({ renderValue }) => renderValue(),
  }),
];

export const columnOrdering = [
  "sequence",
  "name",
  "thumbnail_id",
  "description",
];
