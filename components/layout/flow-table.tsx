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

import { useFlowState } from "./flow-context";
import { useFlowPagination } from "./use-flow-pagination";

import clsx from "clsx";

interface TableProps<T> {
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
}: TableProps<T>) {
  const [columnOrder, setColumnOrder] = useState<string[]>(columnOrdering);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<Record<string, any>>({});
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ["S/N", ...initialLeftPinnedColumns],
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
    <Flex w="100%">
      <Table
        stickyHeader
        striped
        miw="min-content"
        className={clsx({
          "border-separate border-spacing-2": skeleton,
        })}
      >
        <Table.Thead className="bg-primary-text-normal whitespace-nowrap">
          {table.getHeaderGroups().map((headerGroup, idx) => (
            <Table.Tr key={`${idx}-${headerGroup.id}`}>
              {headerGroup.headers.map((header, idx) => {
                return (
                  <Table.Th
                    lh={2}
                    fz={14}
                    fw={500}
                    ta="start"
                    key={`${idx}-${header.id}`}
                    className={clsx("text-primary-text-body", {
                      skeleton,
                    })}
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
          {table.getRowModel().rows.map((row, idx) => (
            <Table.Tr key={`${idx}-${row.id}`}>
              {row.getVisibleCells().map((cell, idx) => (
                <Table.Td
                  fz={14}
                  key={`${idx}-${row.id}-${cell.id}`}
                  className={clsx({
                    skeleton,
                  })}
                >
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
