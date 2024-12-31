"use client";

import { builder } from "@/builders";
import { useFakeProductList } from "@/builders/types/products";
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
import { EmptySlot, Picture, StarRating } from "@/components/shared/interface";
import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { AddIcon, ListIcon } from "@/icons";
import { PRODUCT_CATEGORIES } from "@/packages/constants/data";
import { APP, makePath, MODALS, PAGES } from "@/packages/libraries";
import { formatCurrency } from "@/packages/libraries/formatters/currency";
import { Button, Flex, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { toString } from "lodash";
import { Fragment, useEffect } from "react";

import { ContactSellerButton } from "@/components/shared/market-place/contact-seller";
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
      <AppShellHeader title='Market Place' options={<HeaderOptions />} />
      <FlowContainer
        type='plain'
        className='lg:~px-1/8 lg:py-4 justify-between'
      >
        {products?.data.length ? (
          <FlowContentHorizontal
            breakpoint='320'
            className='p-3 lg:p-0 h-full'
            gap={24}
          >
            {products?.data.map((item) => (
              <Stack
                p={18}
                className='rounded-xl bg-white cursor-pointer  h-fit'
              >
                <Picture
                  src={item.image ?? "/images/placeholder.png"}
                  h={150}
                  w='100%'
                  alt={item.name ?? "product image"}
                  className='rounded-lg'
                  objectFit='cover'
                />

                <Stack gap={10}>
                  <Text fw={500}>{item.name}</Text>
                  <Text fw={700} size='lg'>
                    {formatCurrency(+item.price || 200, "NGN")}
                  </Text>
                  <StarRating className='!justify-start' />
                  <Text size='sm' c='violet'>
                    House A10
                  </Text>

                  <ContactSellerButton data={item} variant='subtle' />
                </Stack>
              </Stack>
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
            { icon: "filter", filterData: filterOptions },
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

function HeaderOptions() {
  return (
    <Flex gap={14} wrap='wrap'>
      <FlowSearch title='Market Place' placeholder='Search products...' />
      <Button fz='sm' size='md' leftSection={<AddIcon />} onClick={addProduct}>
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
      {/* <FilterDropdown label='Filter' data={filterOptions} /> */}
    </Flex>
  );
}
