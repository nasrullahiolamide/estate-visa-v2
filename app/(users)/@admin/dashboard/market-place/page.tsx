"use client";

import { builder } from "@/builders";
import { ProductStatus, useFakeProductList } from "@/builders/types/products";
import { Listings } from "@/components/admin/market-place/listings";
import {
  FlowEntriesPerPage,
  FlowFooter,
  FlowPagination,
  FlowSearch,
  FlowTabs,
  FlowTabsPanel,
  useFlowPagination,
  useFlowState,
} from "@/components/layout";
import { FlowContainer } from "@/components/layout/flow-container";
import { FlowContentContainer } from "@/components/layout/flow-content-container";
import { EmptySlot } from "@/components/shared/interface";
import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { APP } from "@/packages/libraries";
import { Flex, Tabs } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

import { useQueryState } from "nuqs";
import { Fragment, useEffect, useMemo } from "react";

import { FilterDropdown } from "@/components/shared/interface/dropdowns";
import { PRODUCT_CATEGORIES, PRODUCT_VIEW } from "@/packages/constants/data";
import clsx from "clsx";
import { getCookie } from "cookies-next";
import { toString } from "lodash";

const filterOptions = [
  { label: "Recent", value: "Recent" },
  {
    label: "Category",
    value: "category",
    children: PRODUCT_CATEGORIES.map((category) => ({
      label: category,
      value: category,
    })),
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

export default function MarketPlace() {
  const initialProductList = useMemo(() => useFakeProductList(), []);
  const pagination = useFlowPagination();
  const estateId = toString(getCookie(APP.ESTATE_ID));

  const { page, pageSize, query: search, sortBy, sortOrder } = useFlowState();
  const [view, setView] = useQueryState("view", {
    defaultValue: PRODUCT_VIEW.ALL,
  });

  const { data: products, isPlaceholderData } = useQuery({
    queryKey: builder.products.get.$get({
      page,
      pageSize,
      search,
      sortBy,
      sortOrder,
    }),
    queryFn: () =>
      builder.$use.products.get({
        page,
        pageSize,
        search,
        sortBy,
        sortOrder,
        estateId,
      }),
    placeholderData: initialProductList,
    select: (data) => data,
  });

  useEffect(() => {
    if (isPlaceholderData) return;

    pagination.setPage(products?.page);
    pagination.setTotal(getListing(view)?.length);
    pagination.setEntriesCount(getListing(view)?.length);
    pagination.setPageSize(products?.pageSize);
  }, [isPlaceholderData]);

  const getListing = (status: ProductStatus) => {
    const data = products?.data;
    return status === PRODUCT_VIEW.ALL
      ? data
      : data?.filter((product) => product.status === status);
  };

  const noDataAvailable = getListing(view)?.length === 0;

  return (
    <Fragment>
      <AppShellHeader title='Market Place' options={<HeaderOptions />} />
      <FlowContainer type='plain' className='lg:~p-1/8'>
        <FlowContentContainer
          classNames={{
            root: clsx("rounded-none lg:rounded-2xl", {
              "bg-white": noDataAvailable || isPlaceholderData,
            }),
          }}
        >
          <FlowTabs
            value={view}
            onChange={setView}
            tabsContainerProps={{ gap: 0 }}
          >
            <Flex
              align='center'
              className='overflow-auto w-full sticky top-0 z-40'
            >
              <Tabs.List className='w-full flex-nowrap'>
                {Object.values(PRODUCT_VIEW).map((type) => (
                  <Tabs.Tab value={type} flex={1} py={20} tt='capitalize'>
                    {type === PRODUCT_VIEW.PENDING_APPROVALS
                      ? type.replace("-", " ")
                      : `${type} Listings `}
                    ({getListing(type)?.length})
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            </Flex>

            <FlowTabsPanel value={view}>
              {noDataAvailable ? (
                <EmptySlot
                  src='marketplace'
                  title={`There are no ${view.replace(
                    "-",
                    " "
                  )} products yet. Check back later for updates!`}
                />
              ) : (
                <Listings
                  data={getListing(view)}
                  skeleton={isPlaceholderData}
                />
              )}
            </FlowTabsPanel>
          </FlowTabs>
        </FlowContentContainer>

        <FlowFooter
          className={clsx(
            "flex bg-white justify-between lg:rounded-b-2xl mt-2",
            { hidden: noDataAvailable || isPlaceholderData }
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
      <FlowSearch title='Market Place' />
      {/* <Button
        fz='sm'
        size='md'
        leftSection={<CarbonRule />}
        component={Link}
        href={makePath(PAGES.DASHBOARD, PAGES.MARKET_PLACE, PAGES.MARKET_RULES)}
      >
        Market Rules
      </Button> */}
      <FilterDropdown label='Filter' data={filterOptions} />
    </Flex>
  );
}
