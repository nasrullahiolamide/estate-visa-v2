"use client";

import clsx from "clsx";
import fileDownload from "js-file-download";
import { Fragment, useEffect } from "react";
import { modals } from "@mantine/modals";
import { Button, Flex } from "@mantine/core";
import { MODALS } from "@/packages/libraries";
import { builder } from "@/builders";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { FilterDropdown } from "@/components/shared/interface/dropdowns/filter";
import { EmptySlot } from "@/components/shared/interface";
import { subOccupantsColumns } from "@/columns/for_admins/sub-occupants";
import { DownloadIcon } from "@/icons";
import { useFakeSubOccupantsList } from "@/builders/types/sub-occupants";
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
  SubOccupantsForm,
  SubOccupantsFormProps,
} from "@/components/occupant/sub-occupants/form";
import { MIME_TYPE } from "@/builders/types/shared";
import { useFilename } from "@/packages/hooks/use-file-name";
import { handleError } from "@/packages/notification";
import { FILE } from "@/packages/libraries/enum";

const filterOptions = [
  { label: "Recently Added", value: "recent" },
  { label: "Name(A-Z)", value: "a-z" },
  { label: "Name(Z-A)", value: "z-a" },
];

const handleSubOccupantForm = ({ data }: SubOccupantsFormProps) => {
  modals.open({
    title: "Sub Occupant Details",
    modalId: MODALS.FORM_DETAILS,
    children: <SubOccupantsForm data={data} modalType='view' />,
  });
};

export default function SubOccupants() {
  const initialSubOccupantsList = useFakeSubOccupantsList();
  const pagination = useFlowPagination();
  const { page, pageSize, query: search, numberOfPages } = useFlowState();

  const { mutate: download, isPending: isDownloading } = useMutation({
    mutationFn: builder.use().sub_occupants.download,
    onSuccess: (data) => {
      const filename = useFilename([FILE.HOUSES], data.type as MIME_TYPE);
      fileDownload(data, filename);
    },
    onError: handleError(),
  });

  const { data: subOccupants, isPlaceholderData } = useQuery({
    queryKey: builder.sub_occupants.get.get(),
    queryFn: () =>
      builder.use().sub_occupants.get({
        page,
        pageSize,
        search,
      }),
    placeholderData: initialSubOccupantsList,
    select({ total, page, data, pageSize }) {
      return {
        total,
        page,
        pageSize,
        data,
      };
    },
  });
  console.log(subOccupants);
  useEffect(() => {
    if (isPlaceholderData) return;
    pagination.setPage(subOccupants?.page);
    pagination.setTotal(subOccupants?.total);
    pagination.setEntriesCount(subOccupants?.data?.length);
    pagination.setPageSize(subOccupants?.pageSize);
  }, [isPlaceholderData]);

  const noDataAvailable = subOccupants?.data.length === 0;
  const handleDownload = () => download();

  return (
    <Fragment>
      <AppShellHeader
        title='Sub-Occupants'
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
            {subOccupants?.data.length ? (
              <FlowTable
                data={subOccupants.data}
                columns={subOccupantsColumns}
                skeleton={isPlaceholderData}
              />
            ) : (
              <EmptySlot
                title='There are no sub-occupants yet. Check back later for updates!'
                src='person-minus'
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
            { icon: "filter", filterData: filterOptions },
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
      <FilterDropdown data={filterOptions} />
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