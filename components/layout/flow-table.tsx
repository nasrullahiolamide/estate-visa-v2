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
  type Row,
  type PaginationState,
  type SortingState,
  type VisibilityState,
  type HeaderGroup,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

import clsx from "clsx";
import { useFlowState } from "./flow-context";
import { useFlowPagination } from "./use-flow-pagination";
import { cast, handleClickPropagation } from "@/packages/libraries";
interface FlowTableProps<T> {
  data?: T[];
  columns: ColumnDef<T, any>[];
  initialLeftPinnedColumns?: string[];
  initialRightPinnedColumns?: string[];
  columnOrdering?: string[];
  skeleton?: boolean;
  onRowClick?: (props: any) => void;
}

const debugTable = process.env.NODE_ENV !== "production";
const shadow = "0 4px 10px rgba(0, 0, 0, 0.1)";

export function FlowTable<T>({
  columns,
  initialLeftPinnedColumns = [],
  initialRightPinnedColumns = [],
  columnOrdering = [],
  data = [],
  skeleton,
  onRowClick,
}: FlowTableProps<T>) {
  const [columnOrder, setColumnOrder] = useState<string[]>(columnOrdering);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<Record<string, any>>({});
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ["select", ...initialLeftPinnedColumns],
    right: [...initialRightPinnedColumns, "Action"],
  });

  const { setPage } = useFlowPagination();

  const {
    page: pageIndex,
    numberOfPages: pageCount,
    pageSize,
  } = useFlowState();

  const [pagination, setPaginationState] = useState<PaginationState>({
    pageIndex,
    pageSize,
  });

  useEffect(() => {
    setPage(cast.number(pagination.pageIndex));
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
        miw='max-content'
        bg='white'
        className={clsx({
          "border-separate border-spacing-2": skeleton,
        })}
      >
        <Table.Thead className='bg-primary-text-normal whitespace-nowrap z-10'>
          {table.getHeaderGroups().map((headerGroup, i) => (
            <TableHeader
              key={headerGroup.id}
              headerGroup={headerGroup}
              skeleton={skeleton}
            />
          ))}
        </Table.Thead>
        <Table.Tbody>
          {table.getRowModel().rows.map((row, i) => {
            const color = i % 2 === 0 ? "bg-purple-4" : "bg-white";

            return (
              <TableRow
                key={row.id}
                row={row}
                skeleton={skeleton}
                bgColor={color}
                onRowClick={onRowClick}
              />
            );
          })}
        </Table.Tbody>
      </Table>
    </>
  );
}

// Table Header Component
interface TableHeaderProps<T> {
  headerGroup: HeaderGroup<T>;
  skeleton: any;
  bgColor?: string;
}

const TableHeader = <T,>({ headerGroup, skeleton }: TableHeaderProps<T>) => (
  <Table.Tr key={headerGroup.id} ta='center'>
    {headerGroup.headers.map((header) => (
      <Table.Th
        lh={2}
        fw={600}
        key={header.id}
        className={clsx(
          "text-primary-text-body px-6 py-4 sm:py-6 bg-white text-center",
          {
            skeleton,
            "sticky left-0 ": header.column.getIsPinned() === "left",
          }
        )}
        style={{
          boxShadow: header.column.getIsPinned() === "left" ? shadow : "none",
        }}
        colSpan={header.colSpan}
      >
        {header.isPlaceholder ? null : (
          <Flex
            align='center'
            justify='center'
            className={
              header.column.getCanSort()
                ? "cursor-pointer select-none"
                : "text-center"
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

// Table Row Component
interface TableRowProps<T> {
  row: Row<T>;
  skeleton: any;
  bgColor: string;
  onRowClick?: (props: any) => void;
}
const TableRow = <T,>({
  row,
  skeleton,
  bgColor,
  onRowClick,
}: TableRowProps<T>) => {
  return (
    <Table.Tr
      key={row.id}
      className={clsx(
        "hover:bg-blue-50 px-6 sm:py-4 cursor-pointer w-fit text-center capitalize"
      )}
      onClick={() => onRowClick && onRowClick(row.original)}
    >
      {row.getVisibleCells().map((cell) => {
        const isActionButtonCell = cell.column.id === "action";
        return (
          <Table.Td
            fz={14}
            key={cell.id}
            pos='sticky'
            onClick={(e) =>
              isActionButtonCell ? handleClickPropagation(e) : null
            }
            className={clsx("px-6 sm:py-4 w-fit", bgColor, {
              skeleton,
              "fixed z-[4] left-0 shadow-xl":
                cell.column.getIsPinned() === "left",
            })}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </Table.Td>
        );
      })}
    </Table.Tr>
  );
};

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
