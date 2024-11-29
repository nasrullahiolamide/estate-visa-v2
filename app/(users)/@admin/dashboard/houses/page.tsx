"use client";

import clsx from "clsx";
import fileDownload from "js-file-download";
import { Fragment, useEffect } from "react";
import { Add } from "iconsax-react";

import { Button, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useMutation, useQuery } from "@tanstack/react-query";
import { builder } from "@/builders";
import { MIME_TYPE } from "@/builders/types/shared";
import { useFakeHousesList } from "@/builders/types/houses";
import { APP, MODALS } from "@/packages/libraries";
import { handleError } from "@/packages/notification";
import { useFilename } from "@/packages/hooks/use-file-name";
import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { FilterDropdown } from "@/components/shared/interface/dropdowns/filter";
import { EmptySlot } from "@/components/shared/interface";
import { HousesActions } from "@/components/admin/houses/actions";
import { housesColumns } from "@/columns/for_admins/houses";
import { DownloadIcon, UploadIcon } from "@/icons";
import {
  HouseForm,
  HouseFormProps,
} from "@/components/admin/houses/modals/form";
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
import { BulkUpload } from "@/components/shared/user-management/bulk-upload";
import { toString } from "lodash";
import { FILE } from "@/packages/libraries/enum";

const filterOptions = [
  { label: "Recently Added", value: "recent" },
  { label: "Street Name(A-Z)", value: "a-z" },
  { label: "Street Name(Z-A)", value: "z-a" },
  {
    label: "Status",
    value: "status",
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

const bulkUpload = () => {
  modals.open({
    title: "Bulk Upload of Houses",
    modalId: MODALS.UPLOAD_RESOURCES,
    children: <BulkUpload type='houses' />,
  });
};

const handleHouseForm = ({ id, modalType = "add" }: HouseFormProps) => {
  modals.open({
    title: modalType === "add" ? "Add New House" : "House Details",
    modalId: MODALS.FORM_DETAILS,
    children: <HouseForm id={id} modalType={modalType} />,
  });
};

export default function Houses() {
  const initialHousesList = useFakeHousesList();
  const pagination = useFlowPagination();

  const estateId = toString(APP.ESTATE_ID);

  const { page, pageSize, query: search, sortBy, sortOrder } = useFlowState();

  const { mutate: download, isPending: isDownloading } = useMutation({
    mutationFn: builder.use().houses.download,
    onSuccess: (data) => {
      const filename = useFilename([FILE.HOUSES], data.type as MIME_TYPE);
      fileDownload(data, filename);
    },
    onError: handleError(),
  });

  const { data: houses, isPlaceholderData } = useQuery({
    queryKey: builder.houses.list.table.get({
      page,
      pageSize,
      search,
      sortBy,
      sortOrder,
    }),
    queryFn: () =>
      builder.use().houses.list.table({
        page,
        pageSize,
        search,
        sortBy,
        sortOrder,
      }),
    placeholderData: initialHousesList,
    select({ total, page, data, pageSize }) {
      return {
        total,
        page,
        pageSize,
        data: data.map((list) => {
          return {
            ...list,
            action: (
              <HousesActions
                id={list.id}
                isActive={list.status.toLowerCase() === "active"}
                handlers={{
                  onAdd: () => handleHouseForm({ modalType: "add" }),
                  onView: () =>
                    handleHouseForm({ id: list.id, modalType: "view" }),
                  onEdit: () =>
                    handleHouseForm({ id: list.id, modalType: "edit" }),
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

    pagination.setPage(houses?.page);
    pagination.setTotal(houses?.total);
    pagination.setEntriesCount(houses?.data?.length);
    pagination.setPageSize(houses?.pageSize);
  }, [isPlaceholderData]);

  const noDataAvailable = houses?.data.length === 0;
  const handleDownload = () => download();

  return (
    <Fragment>
      <AppShellHeader
        title='Houses'
        options={
          <HeaderOptions
            hidden={noDataAvailable || isPlaceholderData}
            onDownload={handleDownload}
            isDownloading={isDownloading}
          />
        }
      />

      <FlowContainer type='plain' className='lg:~p-1/8'>
        <FlowContentContainer
          classNames={{
            root: "rounded-none lg:rounded-2xl bg-white",
          }}
        >
          <FlowPaper>
            {houses?.data.length ? (
              <FlowTable
                data={houses.data}
                columns={housesColumns}
                skeleton={isPlaceholderData}
                onRowClick={(data) =>
                  handleHouseForm({ id: data.id, modalType: "view" })
                }
              />
            ) : (
              <EmptySlot
                title='No houses added yet. Start by adding a house to manage!'
                src='house'
                withButton
                text='Add New House'
                btnProps={{
                  leftSection: <Add />,
                  onClick: () => handleHouseForm({ modalType: "add" }),
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
            {
              icon: "download",
              btnProps: {
                onClick: () => download(),
                loading: isDownloading,
                disabled: isDownloading,
              },
            },
            {
              icon: "upload",
              btnProps: {
                onClick: bulkUpload,
              },
            },
            {
              icon: "filter",
              filterData: filterOptions,
            },
            {
              icon: "add",
              btnProps: {
                onClick: () => handleHouseForm({ modalType: "add" }),
              },
            },
          ]}
        />
      </FlowContainer>
    </Fragment>
  );
}

interface HeaderOptionsProps {
  hidden: boolean;
  onDownload: () => void;
  isDownloading?: boolean;
}

function HeaderOptions({
  hidden,
  onDownload,
  isDownloading,
}: HeaderOptionsProps) {
  return (
    <Flex gap={14} wrap='wrap'>
      <Button
        fz='sm'
        size='md'
        leftSection={<Add />}
        onClick={() => handleHouseForm({ modalType: "add" })}
        hidden={hidden}
      >
        Add New House
      </Button>
      <FilterDropdown data={filterOptions} hidden={hidden} />
      <Button
        variant='outline'
        fz='sm'
        size='md'
        leftSection={<UploadIcon />}
        onClick={bulkUpload}
      >
        Bulk Upload
      </Button>
      <Button
        variant='outline'
        fz='sm'
        size='md'
        leftSection={<DownloadIcon />}
        onClick={onDownload}
        loading={isDownloading}
        disabled={isDownloading}
        hidden={hidden}
      >
        Download Table
      </Button>
    </Flex>
  );
}
