"use client";
import clsx from "clsx";

import { Fragment } from "react";
import { Button, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useQuery } from "@tanstack/react-query";

import { builder } from "@/builders";
import { useFakeMarketRulesList } from "@/builders/types/market-rules";
import { marketRuleColumns } from "@/columns/for_admins/market-rules";
import { makePath, MODALS, PAGES } from "@/packages/libraries";
import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { FilterDropdown } from "@/components/shared/interface/dropdowns/filter";
import { EmptySlot } from "@/components/shared/interface";
import { AddIcon } from "@/icons";
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
  useFlowState,
} from "@/components/layout";
import { MarketRuleActions } from "@/components/admin/market-place/rules/actions";
import { MarketRuleForm } from "@/components/admin/market-place/rules/add";

const filterOptions = [
  { label: "Date", value: "date" },
  {
    label: "Applied To:",
    value: "applied-to",
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
        value: "all-users",
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
        value: "in-active",
      },
    ],
  },
];

const handleMarketRuleForm = () => {
  modals.open({
    title: "Add New Rule",
    modalId: MODALS.FORM_DETAILS,
    children: <MarketRuleForm />,
  });
};

export default function MarketRules() {
  const initialMarketRulesList = useFakeMarketRulesList();
  const pagination = useFlowPagination();
  const { page, pageSize, search, numberOfPages } = useFlowState();

  const dataToDisplay = initialMarketRulesList.data.map((data) => ({
    ...data,
    action: (
      <MarketRuleActions
        id={data.id}
        handlers={{
          onAdd: () => handleMarketRuleForm(),
          onView: () => {},
          onEdit: () => {},
        }}
      />
    ),
  }));

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
            {dataToDisplay ? (
              <FlowTable
                data={dataToDisplay}
                columns={marketRuleColumns}
                skeleton={false}
              />
            ) : (
              <EmptySlot
                title='You have no rules in the market place yet, add a new rule to get started.'
                src='marketplace'
                withButton
                text='Add New Rule'
                btnProps={{
                  leftSection: <AddIcon />,
                }}
              />
            )}
          </FlowPaper>

          <FlowFooter
            className={clsx("flex", {
              // hidden: noDataAvailable
              hidden: false,
            })}
          >
            <FlowPagination />
            <FlowEntriesPerPage />
          </FlowFooter>
        </FlowContentContainer>

        <FlowFloatingButtons
          // hidden={noDataAvailable || isPlaceholderData}
          hidden={false}
          withPrimaryButon
          hasFilterButton
          filterData={filterOptions}
          primaryButton={{
            icon: "add",
            btnProps: {
              onClick: () => handleMarketRuleForm(),
            },
          }}
        />
      </FlowContainer>
    </Fragment>
  );
}

function HeaderOptions({ hidden }: { hidden?: boolean }) {
  return (
    <Flex gap={14} hidden={hidden} wrap='wrap'>
      <Button
        fz='sm'
        size='md'
        leftSection={<AddIcon />}
        onClick={handleMarketRuleForm}
      >
        Add New Rule
      </Button>
      <FilterDropdown data={filterOptions} />
    </Flex>
  );
}
