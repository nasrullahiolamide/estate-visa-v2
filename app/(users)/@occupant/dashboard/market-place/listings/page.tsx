"use client";

import { builder } from "@/builders";
import { useFakeProductList } from "@/builders/types/products";
import {
  FlowContentHorizontal,
  FlowEntriesPerPage,
  FlowFloatingButtons,
  FlowFooter,
  FlowPagination,
  useFlowPagination,
  useFlowState,
} from "@/components/layout";
import { FlowContainer } from "@/components/layout/flow-container";
import { AddProduct } from "@/components/occupant/market-place/add-product";
import { EmptySlot } from "@/components/shared/interface";
import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { ProductCard } from "@/components/shared/interface/cards/product";
import { FilterDropdown } from "@/components/shared/interface/dropdowns/filter";
import { AddIcon } from "@/icons";
import { PRODUCT_CATEGORIES } from "@/packages/constants/data";
import { APP, MODALS } from "@/packages/libraries";
import { Button, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { getCookie } from "cookies-next";
import { toString } from "lodash";
import { Fragment, useEffect } from "react";

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

export default function Listings() {
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
      builder.$use.products.listing({
        page,
        pageSize,
        search,
        sortBy,
        sortOrder,
      }),
    placeholderData: initialProductList,
    select: (data) => data,
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
        title={
          !noDataAvailable
            ? `Product Lists (${products?.total})`
            : "Product Lists"
        }
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
            mah={{
              base: "auto",
              lg: 700,
            }}
            breakpoint='320'
            gap={24}
            className='p-3 lg:p-0'
          >
            {products?.data.map((item) => (
              <ProductCard
                key={item.id}
                list={item}
                viewId='owner'
                skeleton={isPlaceholderData}
              />
            ))}
          </FlowContentHorizontal>
        ) : (
          <EmptySlot
            withButton
            src='marketplace'
            title='You do not have a product yet. Add a new product to get started.'
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
          hidden={noDataAvailable}
          buttons={[
            {
              icon: "filter",
              filterData: filterOptions,
            },
            {
              icon: "add",
              btnProps: {
                onClick: addProduct,
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
    <Flex gap={14} hidden={hidden} wrap='wrap'>
      <Button fz='sm' size='md' leftSection={<AddIcon />} onClick={addProduct}>
        Add Product
      </Button>
      <FilterDropdown label='Filter' data={filterOptions} />
    </Flex>
  );
}
