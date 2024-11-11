"use client";

import Link from "next/link";

import { useQueryState } from "nuqs";
import { Fragment } from "react";

import { Button, Flex, Tabs } from "@mantine/core";
import { makePath, PAGES } from "@/packages/libraries";
import { AppShellHeader } from "@/components/admin/shared/app-shell";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter";
import { FlowContainer } from "@/components/layout/flow-container";
import { FlowContentContainer } from "@/components/layout/flow-content-container";
import { CarbonRule } from "@/icons";

import {
  FlowEntriesPerPage,
  FlowFooter,
  FlowPagination,
  FlowTabs,
  FlowTabsPanel,
} from "@/components/layout";
import { TotalListings } from "@/components/admin/market-place/listings/total";

enum VIEW_TYPES {
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
      <FlowContainer type='plain' className='lg:~p-1/8'>
        <FlowContentContainer
          classNames={{
            root: "rounded-none lg:rounded-2xl",
          }}
        >
          <FlowTabs
            value={view}
            onChange={setView}
            tabsContainerProps={{ gap: 0 }}
          >
            <Flex
              align='center'
              className='overflow-scroll w-full bg-white  sticky top-0 z-40'
            >
              <Tabs.List className='w-full flex-nowrap'>
                <Tabs.Tab value={VIEW_TYPES.TOTAL_LISTINGS} flex={1} py={20}>
                  Total Listings (100)
                </Tabs.Tab>
                <Tabs.Tab value={VIEW_TYPES.PENDING_APPROVALS} flex={1} py={20}>
                  Pending Approvals (20)
                </Tabs.Tab>
                <Tabs.Tab value={VIEW_TYPES.ACTIVE_LISTINGS} flex={1} py={20}>
                  Active Listings (20)
                </Tabs.Tab>
                <Tabs.Tab value={VIEW_TYPES.REPORTED_LISTINGS} flex={1} py={20}>
                  Reported Listings (20)
                </Tabs.Tab>
                <Tabs.Tab
                  value={VIEW_TYPES.SUSPENDED_LISTINGS}
                  flex={1}
                  py={18}
                >
                  Suspended Listings
                </Tabs.Tab>
              </Tabs.List>
            </Flex>

            <FlowTabsPanel value={VIEW_TYPES.TOTAL_LISTINGS}>
              <TotalListings />
            </FlowTabsPanel>
            <FlowTabsPanel value={VIEW_TYPES.PENDING_APPROVALS}>
              <></>
            </FlowTabsPanel>
            <FlowTabsPanel value={VIEW_TYPES.ACTIVE_LISTINGS}>
              <></>
            </FlowTabsPanel>
            <FlowTabsPanel value={VIEW_TYPES.REPORTED_LISTINGS}>
              <></>
            </FlowTabsPanel>
            <FlowTabsPanel value={VIEW_TYPES.SUSPENDED_LISTINGS}>
              <></>
            </FlowTabsPanel>
          </FlowTabs>

          <FlowFooter
          // className={clsx("flex bg-white space-between", {
          //   hidden: false,
          // })}
          >
            <FlowPagination />
            <FlowEntriesPerPage />
          </FlowFooter>
        </FlowContentContainer>
      </FlowContainer>
    </Fragment>
  );
}

function HeaderOptions() {
  return (
    <Flex gap={14} wrap='wrap'>
      <Button
        fz='sm'
        size='md'
        leftSection={<CarbonRule />}
        component={Link}
        href={makePath(PAGES.DASHBOARD, PAGES.MARKET_PLACE, PAGES.MARKET_RULES)}
      >
        Market Rules
      </Button>
      <FilterDropdown label='Filter' data={filterOptions} />
    </Flex>
  );
}
