"use client";

import { builder } from "@/builders";
import { useFakeMarketRulesList } from "@/builders/types/market-rules";
import { marketRuleColumns } from "@/columns/for_admins/market-rules";
import { MarketRuleActions } from "@/components/admin/market-place/rules/actions";
import {
  MarketRuleForm,
  MarketRuleFormProps,
} from "@/components/admin/market-place/rules/add";
import {
  FlowContainer,
  FlowContentContainer,
  FlowEntriesPerPage,
  FlowFloatingButtons,
  FlowFooter,
  FlowPagination,
  FlowPaper,
  FlowSearch,
  FlowTable,
  useFlowPagination,
  useFlowState,
} from "@/components/layout";
import { EmptySlot } from "@/components/shared/interface";
import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { FilterDropdown } from "@/components/shared/interface/dropdowns/filter";
import { AddIcon } from "@/icons";
import { APP, makePath, MODALS, PAGES } from "@/packages/libraries";
import { Button, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { toString } from "lodash";
import { Fragment, useEffect } from "react";

const filterOptions = [
  {
    label: "Applied To:",
    value: "appliesTo",
    children: [
      {
        label: "Occupants",
        value: "occupants",
      },
      {
        label: "Sub Occupants",
        value: "sub-occupants",
      },
      {
        label: "All Users",
        value: "all",
      },
    ],
  },
  {
    label: "Status",
    value: "status",
    children: [
      {
        label: "Active",
        value: "active",
      },
      {
        label: "In Active",
        value: "inactive",
      },
    ],
  },
];

const handleMarketRuleForm = (details: MarketRuleFormProps) => {
  modals.open({
    title: "Add New Rule",
    modalId: MODALS.ADD_DETAILS,
    children: <MarketRuleForm {...details} />,
  });
};

export default function MarketRules() {
  const initialMarketRulesList = useFakeMarketRulesList();
  const pagination = useFlowPagination();
  const estateId = toString(getCookie(APP.ESTATE_ID));
  const {
    page,
    pageSize,
    query: search,
    sortBy,
    sortOrder,
    status,
  } = useFlowState();

  const { data: marketRules, isPlaceholderData } = useQuery({
    queryKey: builder.market_rules.get.$get({
      page,
      pageSize,
      search,
      sortBy,
      sortOrder,
      status,
    }),
    queryFn: () =>
      builder.$use.market_rules.get({
        page,
        pageSize,
        search,
        sortBy,
        sortOrder,
        status,
        estateId,
      }),
    placeholderData: initialMarketRulesList,
    select({ total, page, data, pageSize }) {
      return {
        total,
        page,
        pageSize,
        data: data.map((list) => {
          return {
            ...list,
            action: (
              <MarketRuleActions
                id={list.id}
                handlers={{
                  onAdd: () => handleMarketRuleForm({ viewId: "add" }),
                  onView: () =>
                    handleMarketRuleForm({ viewId: "view", ...list }),
                  onEdit: () =>
                    handleMarketRuleForm({ viewId: "edit", ...list }),
                }}
              />
            ),
          };
        }),
      };
    },
  });

  useEffect(() => {
    if (isPlaceholderData) return;

    pagination.setPage(marketRules?.page);
    pagination.setTotal(marketRules?.total);
    pagination.setEntriesCount(marketRules?.data?.length);
    pagination.setPageSize(marketRules?.pageSize);
  }, [isPlaceholderData]);

  const noDataAvailable = marketRules?.data.length === 0;

  return (
    <Fragment>
      <AppShellHeader
        title='Market Rules'
        backHref={makePath(PAGES.DASHBOARD, PAGES.MARKET_PLACE)}
        options={<HeaderOptions />}
      />

      <FlowContainer type='plain' className='lg:~p-1/8'>
        <FlowContentContainer
          classNames={{
            root: "rounded-none lg:rounded-2xl bg-white",
          }}
        >
          <FlowPaper>
            {marketRules?.data.length ? (
              <FlowTable
                data={marketRules.data}
                columns={marketRuleColumns}
                skeleton={isPlaceholderData}
              />
            ) : (
              <EmptySlot
                title='You have no rules in the market place yet, add a new rule to get started.'
                src='marketplace'
                withButton
                text='Add New Rule'
                btnProps={{
                  leftSection: <AddIcon />,
                  onClick: () => handleMarketRuleForm({ viewId: "add" }),
                }}
              />
            )}
          </FlowPaper>

          <FlowFooter visible={noDataAvailable || isPlaceholderData}>
            <FlowPagination />
            <FlowEntriesPerPage />
          </FlowFooter>
        </FlowContentContainer>

        <FlowFloatingButtons
          hidden={noDataAvailable || isPlaceholderData}
          buttons={[
            { icon: "filter", filterData: filterOptions },
            {
              icon: "add",
              btnProps: {
                onClick: () => handleMarketRuleForm({ viewId: "add" }),
              },
            },
          ]}
        />
      </FlowContainer>
    </Fragment>
  );
}

function HeaderOptions({ hidden }: { hidden?: boolean }) {
  return (
    <Flex gap={14} hidden={hidden} wrap='wrap'>
      <FlowSearch title='Market Rules' />
      <Button
        fz='sm'
        size='md'
        leftSection={<AddIcon />}
        onClick={() => handleMarketRuleForm({ viewId: "add" })}
      >
        Add New Rule
      </Button>
      <FilterDropdown data={filterOptions} />
    </Flex>
  );
}
