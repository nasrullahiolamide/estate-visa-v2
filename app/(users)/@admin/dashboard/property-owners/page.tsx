"use client";

import fileDownload from "js-file-download";

import { Add } from "iconsax-react";
import { Fragment, useEffect } from "react";
import { Button, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { MODALS } from "@/packages/libraries";
import { useMutation, useQuery } from "@tanstack/react-query";
import { builder } from "@/builders";
import { useFakePropertyOwnersList } from "@/builders/types/property-owners";
import { propertyOwnersColumns } from "@/columns/for_admins/property-owners";
import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { FilterDropdown } from "@/components/shared/interface/dropdowns/filter";
import { EmptySlot } from "@/components/shared/interface";
import { DownloadIcon, UploadIcon } from "@/icons";
import { PropertyOwnerActions } from "@/components/admin/property-owners/actions";
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
import {
  PropertyOwnerForm,
  PropertyOwnerFormProps,
} from "@/components/admin/property-owners/modals/form";
import {
  OccupantsFormProps,
  OccupantsForm,
} from "@/components/admin/occupants/modals/form";
import { MIME_TYPE } from "@/builders/types/shared";
import { useFilename } from "@/packages/hooks/use-file-name";
import { handleError } from "@/packages/notification";
import { BulkUpload } from "@/components/shared/user-management/bulk-upload";

const filterOptions = [
  { label: "Recently Added", value: "Recent" },
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
    title: "Bulk Upload of Property Owners",
    modalId: MODALS.UPLOAD_RESOURCES,
    children: <BulkUpload organization_id={0} upload_type={"Staff Records"} />,
  });
};

const handlePropertyOwnerForm = ({
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
  const { page, pageSize, query: search, sortBy, sortOrder } = useFlowState();

  const { mutate: download, isPending: isDownloading } = useMutation({
    mutationFn: builder.use().property_owners.download,
    onSuccess: (data) => {
      const filename = useFilename("property-owners", data.type as MIME_TYPE);
      fileDownload(data, filename);
    },
    onError: handleError(),
  });

  const { data: propertyOwners, isPlaceholderData } = useQuery({
    queryKey: builder.property_owners.get.get({
      page,
      pageSize,
      search,
      sortBy,
      sortOrder,
    }),
    queryFn: () =>
      builder.use().property_owners.get({
        page,
        pageSize,
        search,
        sortBy,
        sortOrder,
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
                  onAdd: () => handlePropertyOwnerForm({ modalType: "add" }),
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
  const handleDownload = () => download();

  return (
    <Fragment>
      <AppShellHeader
        title='Property Owners'
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
            {propertyOwners?.data.length ? (
              <FlowTable
                data={propertyOwners.data}
                columns={propertyOwnersColumns}
                skeleton={isPlaceholderData}
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
                onClick: () => handlePropertyOwnerForm({ modalType: "add" }),
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
    <Flex gap={14} hidden={hidden} wrap='wrap'>
      <Button
        fz='sm'
        size='md'
        leftSection={<Add />}
        onClick={() => handlePropertyOwnerForm({ modalType: "add" })}
      >
        Add
      </Button>
      <FilterDropdown data={filterOptions} />
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
