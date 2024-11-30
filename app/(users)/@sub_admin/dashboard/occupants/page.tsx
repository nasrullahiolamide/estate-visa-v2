"use client";

import clsx from "clsx";
import fileDownload from "js-file-download";
import { Add } from "iconsax-react";
import { Fragment, useEffect } from "react";
import { Button, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { MODALS } from "@/packages/libraries";
import { useMutation, useQuery } from "@tanstack/react-query";
import { builder } from "@/builders";
import { useFakeOccupantsList } from "@/builders/types/occupants";
import { OccupantActions } from "@/components/admin/occupants/actions";
import { occupantsColumns } from "@/columns/for_admins/occupants";
import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { FilterDropdown } from "@/components/shared/interface/dropdowns/filter";
import { EmptySlot } from "@/components/shared/interface";
import { DownloadIcon, UploadIcon } from "@/icons";
import {
  OccupantsForm,
  OccupantsFormProps,
} from "@/components/admin/occupants/modals/form";
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
  FlowSearch,
} from "@/components/layout";
import { MIME_TYPE } from "@/builders/types/shared";
import { useFilename } from "@/packages/hooks/use-file-name";
import { handleError } from "@/packages/notification";
import { FILE } from "@/packages/libraries/enum";
import { BulkUpload } from "@/components/shared/user-management/bulk-upload";

const filterOptions = [
  { label: "Recently Added", value: "recent" },
  { label: "Name(A-Z)", value: "A-Z" },
  { label: "Name(Z-A)", value: "Z-A" },
];

const handleOccupantForm = ({ data, modalType }: OccupantsFormProps) => {
  modals.open({
    title: modalType === "add" ? "Add New Occupant" : "Occupant Details",
    modalId: MODALS.FORM_DETAILS,
    children: <OccupantsForm data={data} modalType={modalType} />,
  });
};

const bulkUpload = () => {
  modals.open({
    title: "Bulk Upload of Occupants",
    modalId: MODALS.UPLOAD_RESOURCES,
    children: <BulkUpload type='occupants' />,
  });
};

export default function Occupants() {
  const initialOccupantsList = useFakeOccupantsList();
  const pagination = useFlowPagination();
  const { page, pageSize, query: search, sortBy, sortOrder } = useFlowState();

  const { mutate: download, isPending: isDownloading } = useMutation({
    mutationFn: builder.use().occupants.download,
    onSuccess: (data) => {
      const filename = useFilename([FILE.OCCUPANTS], data.type as MIME_TYPE);
      fileDownload(data, filename);
    },
    onError: handleError(),
  });

  const { data: occupants, isPlaceholderData } = useQuery({
    queryKey: builder.occupants.get.get({
      page,
      pageSize,
      search,
      sortBy,
      sortOrder,
    }),
    queryFn: () =>
      builder.use().occupants.get({
        page,
        pageSize,
        search,
        sortBy,
        sortOrder,
      }),
    placeholderData: initialOccupantsList,
    select({ total, page, data, pageSize }) {
      return {
        total,
        page,
        pageSize,
        data: data.map((list) => {
          return {
            ...list,
            action: (
              <OccupantActions
                id={list.id}
                isActive={list.status.toLowerCase() === "active"}
                handlers={{
                  onAdd: () => handleOccupantForm({ modalType: "add" }),
                  onView: () =>
                    handleOccupantForm({ data: list, modalType: "view" }),
                  onEdit: () =>
                    handleOccupantForm({ data: list, modalType: "edit" }),
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
    pagination.setPage(occupants?.page);
    pagination.setTotal(occupants?.total);
    pagination.setEntriesCount(occupants?.data?.length);
    pagination.setPageSize(occupants?.pageSize);
  }, [isPlaceholderData]);

  const noDataAvailable = occupants?.data.length === 0;
  const handleDownload = () => download();

  return (
    <Fragment>
      <AppShellHeader
        title='Occupants'
        withSearch
        searchProps={{
          placeholder: "Search occupants...",
          title: "Occupants",
        }}
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
            {occupants?.data.length ? (
              <FlowTable
                data={occupants.data}
                columns={occupantsColumns}
                skeleton={isPlaceholderData}
                onRowClick={(data) =>
                  handleOccupantForm({ data, modalType: "view" })
                }
              />
            ) : (
              <EmptySlot
                title='There are no occupants yet. Add one to get started!'
                src='person-minus'
                withDoubleButton
                primaryText='Add New Occupant'
                secondaryText='Bulk Upload'
                primaryBtnProps={{
                  leftSection: <Add />,
                  onClick: () => handleOccupantForm({ modalType: "add" }),
                }}
                secondaryBtnProps={{
                  leftSection: <UploadIcon />,
                  onClick: bulkUpload,
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
            { icon: "filter", filterData: filterOptions },
            {
              icon: "add",
              btnProps: {
                onClick: () => handleOccupantForm({ modalType: "add" }),
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
    <Flex gap={14} wrap='wrap' hidden={hidden}>
      <FlowSearch title='Occupants' placeholder='Search occupants...' />
      <Button
        fz='sm'
        size='md'
        leftSection={<Add />}
        onClick={() => handleOccupantForm({ modalType: "add" })}
      >
        Add New Occupant
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
      >
        Download Table
      </Button>
    </Flex>
  );
}
