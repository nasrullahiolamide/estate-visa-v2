"use client";

import Link from "next/link";

import { useQueryState } from "nuqs";
import { Fragment } from "react";

import { Button, Flex, Stack, Text } from "@mantine/core";
import { makePath, PAGES } from "@/packages/libraries";
import { AppShellHeader } from "@/components/admin/shared/app-shell";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter";
import { FlowContainer } from "@/components/layout/flow-container";
import { FlowContentContainer } from "@/components/layout/flow-content-container";
import { Inbox, CarbonRule, AddIcon, ListIcon } from "@/icons";

import {
  FlowContentHorizontal,
  FlowEntriesPerPage,
  FlowFooter,
  FlowPagination,
  FlowTabs,
  FlowTabsPanel,
} from "@/components/layout";
import { TotalListings } from "@/components/admin/market-place/listings/total";
import clsx from "clsx";
import { Picture, StarRating } from "@/components/shared/interface";

export enum VIEW_TYPES {
  TOTAL_LISTINGS = "total-listings",
  PENDING_APPROVALS = "pending-approvals",
  ACTIVE_LISTINGS = "active-listings",
  REPORTED_LISTINGS = "reported-listings",
  SUSPENDED_LISTINGS = "suspended-listings",
}

const filterOptions = [
  { label: "Recent", value: "recent" },
  {
    label: "Category",
    value: "category",
    children: [
      {
        label: "Active",
        value: "active",
      },
      {
        label: "Suspended",
        value: "suspended",
      },
    ],
  },
  {
    label: "Seller",
    value: "seller",
    children: [
      {
        label: "Active",
        value: "active",
      },
      {
        label: "Suspended",
        value: "suspended",
      },
    ],
  },
];

export default function Messages() {
  const [view, setView] = useQueryState("type", {
    defaultValue: VIEW_TYPES.TOTAL_LISTINGS,
  });

  return (
    <Fragment>
      <AppShellHeader title='Market Place' options={<HeaderOptions />} />
      <FlowContainer
        type='plain'
        className='lg:~px-1/8 lg:py-4 justify-between'
      >
        <FlowContentHorizontal
          mah={{
            base: "auto",
            lg: 700,
          }}
          breakpoint='320'
          gap={24}
          className='p-3 lg:p-0'
        >
          {Array.from({ length: 18 }).map((_, i) => (
            <Stack p={18} className='rounded-xl bg-white cursor-pointer'>
              <Picture
                src='https://via.placeholder.com/300'
                h={150}
                w='100%'
                alt='product'
                className='rounded-lg'
                objectFit='cover'
              />

              <Stack gap={10}>
                <Text fw={500}>Original Nike Sneakers</Text>
                <Text fw={700} size='lg'>
                  ₦20,000
                </Text>
                <StarRating className='!justify-start' />
                <Text size='sm' color='violet'>
                  House A10
                </Text>
                <Text
                  c='blue.7'
                  className='underline cursor-pointer'
                  mt={15}
                  fz={13}
                >
                  Contact seller
                </Text>
              </Stack>
            </Stack>
          ))}
        </FlowContentHorizontal>
        <FlowFooter
          className={clsx(
            "flex bg-white justify-between sm:rounded-b-2xl mt-2",
            {
              hidden: false,
            }
          )}
        >
          <FlowPagination />
          <FlowEntriesPerPage />
        </FlowFooter>
      </FlowContainer>
    </Fragment>
  );
}

function HeaderOptions() {
  return (
    <Flex gap={14} wrap='wrap'>
      <Button fz='sm' size='md' leftSection={<AddIcon />}>
        Add Product
      </Button>
      <Button
        fz='sm'
        size='md'
        variant='outline'
        leftSection={<ListIcon />}
        component={Link}
        href={makePath(PAGES.DASHBOARD, PAGES.MARKET_PLACE, PAGES.MY_LISTINGS)}
      >
        My Listings
      </Button>
      <FilterDropdown label='Filter' data={filterOptions} />
    </Flex>
  );
}
