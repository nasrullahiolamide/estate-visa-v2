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
import { useState } from "react";

interface TableProps<T> {
  data?: T[];
  columns: ColumnDef<T, any>[];
  initialLeftPinnedColumns?: string[];
  columnOrdering?: string[];
  pageSize: number;
  pageIndex: number;
  pageCount: number;
}

export function CustomTable<T>({
  columns,
  pageCount,
  initialLeftPinnedColumns = [],
  columnOrdering = [],
  data = [],
  pageSize,
  pageIndex,
}: TableProps<T>) {
  const [columnOrder, setColumnOrder] = useState<string[]>(columnOrdering);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<Record<string, any>>({});
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ["S/N", ...initialLeftPinnedColumns],
    right: ["Action"],
  });
  const [pagination, setPaginationState] = useState<PaginationState>({
    pageIndex,
    pageSize,
  });

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
    debugTable: process.env.NODE_ENV !== "production",
    onColumnOrderChange: setColumnOrder,
  });

  return (
    <Flex w="100%">
      <Table stickyHeader striped miw="min-content">
        <Table.Thead className="bg-primary-text-normal whitespace-nowrap">
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Table.Th
                    fz={14}
                    fw={500}
                    lh={2}
                    ta="start"
                    key={header.id}
                    className="text-primary-text-body"
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder ? null : (
                      <Flex
                        align="center"
                        className={
                          header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : ""
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
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        {header.column.getCanSort() && (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.39043 2.48804C8.19027 2.23784 7.80973 2.23784 7.60957 2.48804L4.64988 6.18765C4.38797 6.51503 4.62106 7 5.04031 7H10.9597C11.3789 7 11.612 6.51503 11.3501 6.18765L8.39043 2.48804Z"
                              fill={
                                header.column.getIsSorted() === "asc"
                                  ? "var(--gray-12)"
                                  : "var(--gray-7)"
                              }
                            />
                            <path
                              d="M8.39043 13.512C8.19027 13.7622 7.80973 13.7622 7.60957 13.512L4.64988 9.81235C4.38797 9.48497 4.62106 9 5.04031 9H10.9597C11.3789 9 11.612 9.48497 11.3501 9.81235L8.39043 13.512Z"
                              fill={
                                header.column.getIsSorted() === "desc"
                                  ? "var(--gray-12)"
                                  : "var(--gray-7)"
                              }
                            />
                          </svg>
                        )}
                      </Flex>
                    )}
                  </Table.Th>
                );
              })}
            </Table.Tr>
          ))}
        </Table.Thead>

        <Table.Tbody>
          {table.getRowModel().rows.map((row) => (
            <Table.Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Table.Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Flex>
  );
}
