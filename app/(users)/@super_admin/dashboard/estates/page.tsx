"use client";

import Link from "next/link";
import { Fragment, useEffect } from "react";
import { Button, Flex } from "@mantine/core";
import { makePath, PAGES } from "@/packages/libraries";
import { AppShellHeader } from "@/components/admin/shared/app-shell";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter";
import { EmptySlot } from "@/components/shared/interface";
import { AddIcon, DownloadIcon } from "@/icons";
import { estatesColumns } from "@/columns/estates";
import { navigate } from "@/packages/actions";
import {
  FlowContainer,
  FlowContentContainer,
  FlowEntriesPerPage,
  FlowFooter,
  FlowPagination,
  FlowPaper,
  FlowTable,
  FlowFloatingButtons,
  useFlowPagination,
} from "@/components/layout";
import { useEstateValue } from "@/packages/hooks/use-estate-query";
import { builder } from "@/builders";
import { useFakeEstateList } from "@/builders/types/estates";
import { useFlowState } from "@/components/layout";
import { useQuery } from "@tanstack/react-query";
import { EstateActions } from "@/components/super-admin/estates/actions";
import clsx from "clsx";

const filterOptions = [
  { label: "A - Z", value: "a-z" },
  { label: "Z - A", value: "z-a" },
  { label: "Most Recent", value: "most-recent" },
  {
    label: "Number of houses (low to high)",
    value: "low-to-high",
  },
  {
    label: "Number of houses (high to low)",
    value: "high-to-low",
  },
];

const AddNewEstates = () =>
  navigate(makePath(PAGES.DASHBOARD, PAGES.ESTATES, PAGES.ADD_NEW_ESTATE));

export default function Estates() {
  const initialEstateList = useFakeEstateList();
  const pagination = useFlowPagination();

  const { setEstate } = useEstateValue();
  const { page, pageSize, search, numberOfPages } = useFlowState();

  const { data: estates, isPlaceholderData } = useQuery({
    queryKey: builder.estates.get.get(),
    queryFn: () =>
      builder.use().estates.get({
        page,
        pageSize,
        search,
      }),
    placeholderData: initialEstateList,
    select({ total, page, data, pageSize }) {
      return {
        total,
        page,
        pageSize,
        data: data.map((list) => {
          const editLink = setEstate({
            action: "edit",
            ...list,
          });
          const viewLink = setEstate({
            action: "view",
            ...list,
          });
          return {
            ...list,
            action: (
              <EstateActions
                editLink={editLink}
                viewLink={viewLink}
                id={list.id}
              />
            ),
          };
        }),
      };
    },
  });

  useEffect(() => {
    if (isPlaceholderData) return;

    pagination.setPage(estates?.page);
    pagination.setTotal(estates?.total);
    pagination.setEntriesCount(estates?.data?.length);
    pagination.setPageSize(estates?.pageSize);
  }, [isPlaceholderData]);

  return (
    <Fragment>
      <AppShellHeader title='Estates' options={<HeaderOptions />} />
      <FlowContainer type='plain' className='lg:~p-1/8'>
        <FlowContentContainer
          classNames={{
            root: "rounded-none lg:rounded-2xl bg-white",
          }}
        >
          <FlowPaper>
            {estates?.data.length ? (
              <FlowTable
                data={estates?.data}
                columns={estatesColumns}
                skeleton={isPlaceholderData}
              />
            ) : (
              <EmptySlot
                title='No estate added yet. Start by adding an estate to manage!'
                src='house'
                withButton
                text='Add Estate'
                btnProps={{
                  leftSection: <AddIcon />,
                  href: makePath(
                    PAGES.DASHBOARD,
                    PAGES.ESTATES,
                    PAGES.ADD_NEW_ESTATE
                  ),
                }}
              />
            )}
          </FlowPaper>

          <FlowFooter
            className={clsx("flex", {
              hidden: estates?.data.length === 0 || numberOfPages <= 1,
            })}
          >
            <FlowPagination />
            <FlowEntriesPerPage />
          </FlowFooter>
        </FlowContentContainer>

        {estates?.data.length !== 0 && (
          <FlowFloatingButtons
            withPrimaryButon
            withSecondaryButtons
            hasFilterButton
            filterData={filterOptions}
            primaryButton={{
              icon: "add",
              btnProps: {
                onClick: AddNewEstates,
              },
            }}
            secondaryButtons={[
              {
                icon: "download",
                btnProps: {
                  onClick: AddNewEstates,
                },
              },
            ]}
          />
        )}
      </FlowContainer>
    </Fragment>
  );
}

function HeaderOptions() {
  return (
    <Flex gap={14}>
      <Button
        fz='sm'
        size='md'
        leftSection={<AddIcon />}
        component={Link}
        href={makePath(PAGES.DASHBOARD, PAGES.ESTATES, PAGES.ADD_NEW_ESTATE)}
      >
        Add New Estate
      </Button>
      <FilterDropdown data={filterOptions} />
      <Button
        fz='sm'
        size='md'
        variant='outline'
        leftSection={<DownloadIcon />}
      >
        Download Table
      </Button>
    </Flex>
  );
}