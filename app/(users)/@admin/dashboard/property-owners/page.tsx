"use client";

import clsx from "clsx";
import { Add } from "iconsax-react";
import { Fragment, useEffect } from "react";
import { Button, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { MODALS } from "@/packages/libraries";
import { useQuery } from "@tanstack/react-query";
import { builder } from "@/builders";
import { AppShellHeader } from "@/components/admin/shared/app-shell";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter";
import { EmptySlot } from "@/components/shared/interface";
import { DownloadIcon, UploadIcon } from "@/icons";
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
import { propertyOwnersColumns } from "@/columns/property-owners";
import { useFakePropertyOwnersList } from "@/builders/types/property-owners";
import { PropertyOwnerActions } from "@/components/admin/property-owners/actions";
import { handleOccupantForm } from "../occupants/page";
import {
  PropertyOwnerForm,
  PropertyOwnerFormProps,
} from "@/components/admin/property-owners/modals/form";

const filterOptions = [
  { label: "Recently Added", value: "recent" },
  { label: "Name(A-Z)", value: "a-z" },
  { label: "Name(Z-A)", value: "z-a" },
];

export const handlePropertyOwnerForm = ({
  data,
  modalType = "view",
}: PropertyOwnerFormProps) => {
  modals.open({
    title: "Property Owner Details",
    modalId: MODALS.FORM_DETAILS,
    children: <PropertyOwnerForm data={data} modalType={modalType} />,
  });
};

export default function PropertyOwners() {
  const initialPropertyOwnersList = useFakePropertyOwnersList();
  const pagination = useFlowPagination();
  const { page, pageSize, search, numberOfPages } = useFlowState();

  const { data: propertyOwners, isPlaceholderData } = useQuery({
    queryKey: builder.property_owners.get.get(),
    queryFn: () =>
      builder.use().property_owners.get({
        page,
        pageSize,
        search,
      }),
    placeholderData: initialPropertyOwnersList,
    select({ total, page, data, pageSize }) {
      return {
        total,
        page,
        pageSize,
        data: data.map((list) => {
          return {
            ...list,
            action: (
              <PropertyOwnerActions
                id={list.id}
                isActive={list.status.toLowerCase() === "active"}
                handlers={{
                  onAdd: () =>
                    handleOccupantForm({
                      modalType: "add",
                      viewId: "property-owners",
                    }),
                  onView: () =>
                    handlePropertyOwnerForm({ data: list, modalType: "view" }),
                  onEdit: () =>
                    handlePropertyOwnerForm({
                      data: list,
                      modalType: "edit",
                    }),
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

    pagination.setPage(propertyOwners?.page);
    pagination.setTotal(propertyOwners?.total);
    pagination.setEntriesCount(propertyOwners?.data?.length);
    pagination.setPageSize(propertyOwners?.pageSize);
  }, [isPlaceholderData]);

  const noDataAvailable = propertyOwners?.data.length === 0;

  console.log(propertyOwners);

  return (
    <Fragment>
      <AppShellHeader
        title='Property Owners'
        options={
          <HeaderOptions hidden={noDataAvailable || isPlaceholderData} />
        }
      />

      <FlowContainer type='plain' className='lg:~p-1/8'>
        <FlowContentContainer
          classNames={{
            root: "rounded-none lg:rounded-2xl bg-white",
          }}
        >
          <FlowPaper>
            {propertyOwners?.data.length ? (
              <FlowTable
                data={propertyOwners.data}
                columns={propertyOwnersColumns}
                skeleton={isPlaceholderData}
                onRowClick={handleOccupantForm}
              />
            ) : (
              <EmptySlot
                title='There are no occupants yet. Add one to get started!'
                src='person-minus'
                withButton
                text='Add New Occupant'
                btnProps={{
                  leftSection: <Add />,
                  onClick: () =>
                    handleOccupantForm({
                      modalType: "add",
                      viewId: "property-owners",
                    }),
                }}
              />
            )}
          </FlowPaper>

          <FlowFooter
            className={clsx("flex", {
              hidden: noDataAvailable || numberOfPages <= 1,
            })}
          >
            <FlowPagination />
            <FlowEntriesPerPage />
          </FlowFooter>
        </FlowContentContainer>

        <FlowFloatingButtons
          hidden={noDataAvailable || isPlaceholderData}
          withPrimaryButon
          withSecondaryButtons
          hasFilterButton
          filterData={filterOptions}
          primaryButton={{
            icon: "add",
            btnProps: {
              onClick: () =>
                handleOccupantForm({
                  modalType: "add",
                  viewId: "property-owners",
                }),
            },
          }}
          secondaryButtons={[
            {
              icon: "download",
              btnProps: {
                onClick: () => {},
              },
            },
            {
              icon: "upload",
              btnProps: {
                onClick: () => {},
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
      <Button
        fz='sm'
        size='md'
        leftSection={<Add />}
        onClick={() =>
          handleOccupantForm({
            modalType: "add",
            viewId: "property-owners",
          })
        }
      >
        Add New Occupant
      </Button>
      <FilterDropdown data={filterOptions} />
      <Button variant='outline' fz='sm' size='md' leftSection={<UploadIcon />}>
        Bulk Upload
      </Button>
      <Button
        variant='outline'
        fz='sm'
        size='md'
        leftSection={<DownloadIcon />}
      >
        Download Table
      </Button>
    </Flex>
  );
}
