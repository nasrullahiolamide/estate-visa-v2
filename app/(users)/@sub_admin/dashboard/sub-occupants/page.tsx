"use client";

import { builder } from "@/builders";
import { MIME_TYPE } from "@/builders/types/shared";
import {
  SubOccupantsData,
  useFakeSubOccupantsList,
} from "@/builders/types/sub-occupants";
import { subOccupantsColumns } from "@/columns/for_admins/sub-occupants";
import {
  FlowContainer,
  FlowContentContainer,
  FlowEntriesPerPage,
  FlowFloatingButtons,
  FlowFooter,
  FlowPagination,
  FlowPaper,
  FlowTable,
  useFlowPagination,
  useFlowState,
} from "@/components/layout";
import { SubOccupantsForm } from "@/components/occupant/sub-occupants/form";
import { EmptySlot } from "@/components/shared/interface";
import { AppShellHeader } from "@/components/shared/interface/app-shell";
import { FilterDropdown } from "@/components/shared/interface/dropdowns/filter";
import { DownloadIcon } from "@/icons";
import { useFilename } from "@/packages/hooks/use-file-name";
import { MODALS } from "@/packages/libraries";
import { FILE } from "@/packages/libraries/enum";
import { handleError } from "@/packages/notification";
import { Button, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useMutation, useQuery } from "@tanstack/react-query";
import fileDownload from "js-file-download";
import { Fragment, useEffect } from "react";

const filterOptions = [
  { label: "Recently Added", value: "recent" },
  { label: "Name(A-Z)", value: "a-z" },
  { label: "Name(Z-A)", value: "z-a" },
];

const handleSubOccupantForm = (data: SubOccupantsData) => {
  modals.open({
    title: "Sub Occupant Details",
    modalId: MODALS.FORM_DETAILS,
    children: <SubOccupantsForm data={data} modalType="view" />,
  });
};

export default function SubOccupants() {
  const initialSubOccupantsList = useFakeSubOccupantsList();
  const pagination = useFlowPagination();
  const { page, pageSize, query: search, sortOrder } = useFlowState();

  const { mutate: download, isPending: isDownloading } = useMutation({
    mutationFn: builder.$use.sub_occupants.download,
    onSuccess: (data) => {
      const filename = useFilename([FILE.HOUSES], data.type as MIME_TYPE);
      fileDownload(data, filename);
    },
    onError: handleError(),
  });

  const { data: subOccupants, isPlaceholderData } = useQuery({
    queryKey: builder.sub_occupants.get.$get({
      page,
      pageSize,
      search,
      sortOrder,
    }),
    queryFn: () =>
      builder.$use.sub_occupants.get({
        page,
        pageSize,
        search,
        sortOrder,
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
        title="Sub-Occupants"
        options={
          <HeaderOptions
            hidden={noDataAvailable || isPlaceholderData}
            onDownload={handleDownload}
            isDownloading={isDownloading}
          />
        }
      />

      <FlowContainer type="plain" className="lg:~p-1/8">
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
                onRowClick={(data) => handleSubOccupantForm(data)}
              />
            ) : (
              <EmptySlot
                title="There are no sub-occupants yet. Check back later for updates!"
                src="person-minus"
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
    <Flex gap={14} hidden={hidden} wrap="wrap">
      <FilterDropdown data={filterOptions} />
      <Button
        variant="outline"
        fz="sm"
        size="md"
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
