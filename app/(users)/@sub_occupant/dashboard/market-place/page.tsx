"use client";

import { builder } from "@/builders";
import { ProductData, useFakeProductList } from "@/builders/types/products";
import {
  FlowContentHorizontal,
  FlowEntriesPerPage,
  FlowFloatingButtons,
  FlowFooter,
  FlowPagination,
  FlowSearch,
  useFlowPagination,
  useFlowState,
} from "@/components/layout";
import { FlowContainer } from "@/components/layout/flow-container";
import { AddProduct } from "@/components/occupant/market-place/add-product";
import { OccupantProductDetail } from "@/components/occupant/market-place/detail";
import { EmptySlot } from "@/components/shared/interface";
import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { AddIcon, ListIcon } from "@/icons";
import { PRODUCT_CATEGORIES } from "@/packages/constants/data";
import { APP, makePath, MODALS, PAGES } from "@/packages/libraries";
import { Button, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { toString } from "lodash";
import { Fragment, useEffect } from "react";

import { ProductCard } from "@/components/shared/interface/cards/product";
import { FilterDropdown } from "@/components/shared/interface/dropdowns";

import clsx from "clsx";
import Link from "next/link";

const filterOptions = [
  { label: "Recent", value: "recent" },
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

const addProduct = () => {
  modals.open({
    modalId: MODALS.ADD_DETAILS,
    title: "Add a New Product for Sale",
    children: <AddProduct />,
  });
};

const handleProductDetail = (item: ProductData) => {
  modals.open({
    modalId: MODALS.PRODUCT_DETAIL,
    children: <OccupantProductDetail {...item} />,
    classNames: {
      body: "p-0",
      header: "right-8 top-6 absolute bg-transparent",
    },
  });
};

export default function MarketPlace() {
  const initialProductList = useFakeProductList();
  const pagination = useFlowPagination();
  const estateId = toString(getCookie(APP.ESTATE_ID));

  const { page, pageSize, query: search, sortBy, sortOrder } = useFlowState();

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
    select({ total, page, data, pageSize }) {
      return {
        total,
        page,
        pageSize,
        data: data.filter((item) => item.status === "approved"),
      };
    },
  });

  useEffect(() => {
    if (isPlaceholderData) return;

    pagination.setPage(products?.page);
    pagination.setTotal(products?.total);
    pagination.setEntriesCount(products?.data.length);
    pagination.setPageSize(products?.pageSize);
  }, [isPlaceholderData]);

  const noDataAvailable = products?.data.length === 0;

  return (
    <Fragment>
      <AppShellHeader
        title='Market Place'
        options={
          <HeaderOptions hidden={noDataAvailable || isPlaceholderData} />
        }
      />
      <FlowContainer
        type='plain'
        className={clsx("lg:~px-1/8 lg:py-4 justify-between", {
          "rounded-none lg:rounded-2xl bg-white lg:~m-1/8": noDataAvailable,
        })}
      >
        {products?.data.length ? (
          <FlowContentHorizontal
            breakpoint='320'
            className='p-3 lg:p-0 h-full'
            gap={24}
          >
            {products?.data.map((item) => (
              <ProductCard
                key={item.id}
                list={item}
                onClick={() => handleProductDetail(item)}
                viewId='viewer'
              />
            ))}
          </FlowContentHorizontal>
        ) : (
          <EmptySlot
            src='marketplace'
            title='There are no products yet. Check back later for updates or add a new product to get started.'
            withButton
            text='Add New Product'
            btnProps={{
              leftSection: <AddIcon />,
              onClick: addProduct,
            }}
          />
        )}
        <FlowFooter
          className={clsx(
            "flex bg-white justify-between lg:rounded-b-2xl mt-2",
            { hidden: noDataAvailable || isPlaceholderData }
          )}
        >
          <FlowPagination />
          <FlowEntriesPerPage />
        </FlowFooter>

        <FlowFloatingButtons
          buttons={[
            {
              icon: "list",
              label: "My Listings",
              btnProps: {
                component: "a",

                href: makePath(
                  PAGES.DASHBOARD,
                  PAGES.MARKET_PLACE,
                  PAGES.MY_LISTINGS
                ),
              },
            },
            {
              icon: "filter",
              filterData: filterOptions,
              btnProps: {
                hidden: noDataAvailable,
              },
            },
            {
              icon: "add",
              btnProps: {
                onClick: addProduct,
                hidden: noDataAvailable,
              },
            },
          ]}
        />
      </FlowContainer>
    </Fragment>
  );
}

function HeaderOptions({ hidden }: { hidden: boolean }) {
  return (
    <Flex gap={14} wrap='wrap'>
      <FlowSearch
        title='Market Place'
        placeholder='Search products...'
        hidden={hidden}
      />
      <Button
        fz='sm'
        size='md'
        leftSection={<AddIcon />}
        onClick={addProduct}
        hidden={hidden}
      >
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
      <FilterDropdown label='Filter' data={filterOptions} hidden={hidden} />
    </Flex>
  );
}
