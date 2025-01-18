"use client";

import { builder } from "@/builders";
import {
  ProductData,
  ProductStatus,
  useFakeProductList,
} from "@/builders/types/products";
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
import { OccupantProductDetail } from "@/components/occupant/market-place/detail";
import { ViewProduct } from "@/components/occupant/market-place/owner-product";
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
import { Fragment, useEffect, useMemo } from "react";

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
    modalId: MODALS.FORM_DETAILS,
    title: "Add a New Product for Sale",
    children: <ViewProduct modalType='add' />,
  });
};

const handleProductDetail = (item: ProductData) => {
  modals.open({
    modalId: MODALS.PRODUCT_DETAIL,
    children: <OccupantProductDetail {...item} />,
    classNames: {
      body: "p-0",
    },
    withCloseButton: false,
  });
};

export default function MarketPlace() {
  const initialProductList = useMemo(() => useFakeProductList(), []);
  const pagination = useFlowPagination();
  const estateId = toString(getCookie(APP.ESTATE_ID));
  const userId = toString(getCookie(APP.USER_ID));

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
      const show = (status: ProductStatus) =>
        status === "active" || status === "reported";

      return {
        total,
        page,
        pageSize,
        data: data.filter(
          (item) => show(item.status) || item.owner.id === userId
        ),
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
            breakpoint='240'
            className='p-3 lg:p-0 h-full'
            gap={15}
          >
            {products?.data.map((item) => (
              <ProductCard
                key={item.id}
                list={item}
                onClick={
                  item.owner.id === userId
                    ? undefined
                    : () => handleProductDetail(item)
                }
                viewId={item.owner.id === userId ? "owner" : "viewer"}
                skeleton={isPlaceholderData}
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
