"use client";

import { Flex, Table } from "@mantine/core";
import {
  ColumnDef,
  ColumnPinningState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type PaginationState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

import clsx from "clsx";
import { useFlowState } from "./flow-context";
import { useFlowPagination } from "./use-flow-pagination";
interface FlowTableProps<T> {
  data?: T[];
  columns: ColumnDef<T, any>[];
  initialLeftPinnedColumns?: string[];
  initialRightPinnedColumns?: string[];
  columnOrdering?: string[];
  skeleton?: boolean;
}

const debugTable = process.env.NODE_ENV !== "production";

export function FlowTable<T>({
  columns,
  initialLeftPinnedColumns = [],
  initialRightPinnedColumns = [],
  columnOrdering = [],
  data = [],
  skeleton,
}: FlowTableProps<T>) {
  const [columnOrder, setColumnOrder] = useState<string[]>(columnOrdering);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<Record<string, any>>({});
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ["select", ...initialLeftPinnedColumns],
    right: [...initialRightPinnedColumns, "Action"],
  });

  const {
    page: pageIndex,
    numberOfPages: pageCount,
    pageSize,
  } = useFlowState();

  const { setPage } = useFlowPagination();

  const [pagination, setPaginationState] = useState<PaginationState>({
    pageIndex,
    pageSize,
  });

  useEffect(() => {
    setPage(pagination.pageIndex);
  }, [pagination.pageIndex]);

  const table = useReactTable({
    columns,
    data,
    getPaginationRowModel: getPaginationRowModel(),
    enableSorting: true,
    enablePinning: true,
    enableColumnPinning: true,
    manualPagination: true,
    pageCount,
    state: {
      rowSelection,
      columnVisibility,
      sorting,
      pagination,
      columnPinning,
      columnOrder,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPaginationState,
    onColumnVisibilityChange: setColumnVisibility,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnPinningChange: setColumnPinning,
    onColumnOrderChange: setColumnOrder,
    debugTable,
  });

  return (
    <>
      <Table
        stickyHeader
        striped
        // highlightOnHover
        // highlightOnHoverColor='var(--purple-2)'
        stripedColor='#E3DBFF'
        miw='max-content'
        bg='white'
        className={clsx({
          "border-separate border-spacing-2": skeleton,
        })}
      >
        <Table.Thead className='bg-primary-text-normal whitespace-nowrap'>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableHeader
              key={headerGroup.id}
              headerGroup={headerGroup}
              skeleton={skeleton}
            />
          ))}
        </Table.Thead>

        <Table.Tbody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} row={row} skeleton={skeleton} />
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
}

// Table Header Component
const TableHeader = ({ headerGroup, skeleton }: any) => (
  <Table.Tr key={headerGroup.id}>
    {headerGroup.headers.map((header: any) => (
      <Table.Th
        pos='sticky'
        lh={2}
        fw={600}
        ta='start'
        key={header.id}
        className={clsx("text-primary-text-body p-6 bg-white", {
          skeleton,
          "left-0 z-10": header.column.getIsPinned() === "left",
          "right-0 z-10": header.column.getIsPinned() === "right",
        })}
        colSpan={header.colSpan}
      >
        {header.isPlaceholder ? null : (
          <Flex
            align='center'
            className={
              header.column.getCanSort() ? "cursor-pointer select-none" : ""
            }
            onClick={header.column.getToggleSortingHandler()}
            title={
              header.column.getCanSort()
                ? header.column.getNextSortingOrder() === "asc"
                  ? "Sort ascending"
                  : header.column.getNextSortingOrder() === "desc"
                  ? "Sort descending"
                  : "Clear sort"
                : undefined
            }
          >
            {flexRender(header.column.columnDef.header, header.getContext())}

            {header.column.getCanSort() && (
              <SortIcon isSorted={header.column.getIsSorted()} />
            )}
          </Flex>
        )}
      </Table.Th>
    ))}
  </Table.Tr>
);

// Sort Icon Component
const SortIcon = ({ isSorted }: { isSorted: "asc" | "desc" | false }) => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M8.39043 2.48804C8.19027 2.23784 7.80973 2.23784 7.60957 2.48804L4.64988 6.18765C4.38797 6.51503 4.62106 7 5.04031 7H10.9597C11.3789 7 11.612 6.51503 11.3501 6.18765L8.39043 2.48804Z'
      fill={isSorted === "asc" ? "var(--gray-12)" : "var(--gray-7)"}
    />
    <path
      d='M8.39043 13.512C8.19027 13.7622 7.80973 13.7622 7.60957 13.512L4.64988 9.81235C4.38797 9.48497 4.62106 9 5.04031 9H10.9597C11.3789 9 11.612 9.48497 11.3501 9.81235L8.39043 13.512Z'
      fill={isSorted === "desc" ? "var(--gray-12)" : "var(--gray-7)"}
    />
  </svg>
);

// Table Row Component
const TableRow = ({ row, skeleton }: any) => (
  <Table.Tr key={row.id} className='hover:bg-blue-50 p-8 cursor-pointer'>
    {row.getVisibleCells().map((cell: any) => (
      <Table.Td
        fz={14}
        key={cell.id}
        pos='sticky'
        className={clsx("p-6", {
          skeleton,
        })}
      >
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </Table.Td>
    ))}
  </Table.Tr>
);
