"use client";

import { Fragment, useEffect } from "react";
import { Add, Menu } from "iconsax-react";
import { Button, Flex } from "@mantine/core";

import { AppShellHeader } from "@/components/admin/shared/app-shell/header";
import { FilterDropdown } from "@/components/admin/shared/dropdowns/filter-dropdown";

import { FlowContainer } from "@/components/layout/flow-container";
import { FlowContentContainer } from "@/components/layout/flow-content-container";
import { FlowPaper } from "@/components/layout/flow-paper";

import { EmptySlot } from "@/components/shared/interface";
import { DownloadIcon } from "@/svgs";
import { FlowFooter } from "@/components/layout/flow-footer";
import { FlowCurrentPage } from "@/components/layout/flow-current-page";
import { FlowPagination } from "@/components/layout/flow-pagination";
import { modals } from "@mantine/modals";
import { AddSubAdmins } from "@/components/admin/sub-admins/add";
import { MODALS } from "@/packages/libraries";

import { useFlowState } from "@/components/layout/flow-context";
import { useFlowPagination } from "@/components/layout/use-flow-pagination";

import { subAdminListColumns } from "@/columns/sub-admin-list";
import {
  useFakeSubAdminList,
  useFakeSubAdminListData,
} from "@/builders/types/sub-admins";
import { FlowTable } from "@/components/layout/flow-table";

export default function SubAdmins() {
  const subAdminsData = useFakeSubAdminList();

  const handleAddSubAdmin = () => {
    modals.open({
      title: "Add New Sub Admin",
      children: <AddSubAdmins />,
      modalId: MODALS.ADD_SUB_ADMIN,
    });
  };

  const { page, search } = useFlowState();
  const pagination = useFlowPagination();

  // const { data: subAdmins, isPlaceholderData } = useQuery({
  //   queryKey: builder.users.get.get({ user_type: USER_TYPE.ADMIN }),
  //   queryFn: () =>
  //     builder.use().users.get({
  //       user_type: USER_TYPE.ADMIN,
  //       page,
  //       search,
  //     }),
  //   select({ total, current_page, last_page, data, page_size }) {
  //     return {
  //       total,
  //       current_page,
  //       last_page,
  //       page_size,
  //       data: data.map((list) => ({
  //         ...list,
  //         action: (
  //           <FlowMenu>
  //             <FlowMenuTarget />
  //             <FlowMenuDropdown>
  //               <Menu.Item>View Profile</Menu.Item>
  //               <Menu.Item>Activate</Menu.Item>
  //             </FlowMenuDropdown>
  //           </FlowMenu>
  //         ),
  //       })),
  //     };
  //   },
  // });

  useEffect(() => {
    if (false) return;

    pagination.setPage(subAdminsData?.current_page);
    pagination.setTotal(subAdminsData?.total);
    pagination.setEntriesCount(subAdminsData?.data?.length);
    pagination.setPageSize(subAdminsData?.page_size);
  }, []);

  return (
    <Fragment>
      <AppShellHeader
        title='Sub Admins'
        options={<Options addSubAdmin={handleAddSubAdmin} />}
      />

      <FlowContainer type='plain' m={20} mx={15}>
        <FlowContentContainer>
          <FlowPaper>
            {subAdminsData?.data.length ? (
              <FlowTable
                data={subAdminsData?.data}
                columns={subAdminListColumns}
                initialLeftPinnedColumns={["full_name"]}
                skeleton={false}
              />
            ) : (
              <EmptySlot
                title='There are no sub-admins here yet. Add one to get started!'
                src='person-minus'
                withButton
                text='Add Sub-Admin'
                btnProps={{
                  leftSection: <Add />,
                  onClick: handleAddSubAdmin,
                }}
              />
            )}
          </FlowPaper>

          <FlowFooter hidden={false}>
            <FlowPagination />
            <FlowCurrentPage />
          </FlowFooter>
        </FlowContentContainer>
      </FlowContainer>
    </Fragment>
  );
}

interface OptionsProps {
  addSubAdmin: () => void;
}

function Options({ addSubAdmin }: OptionsProps) {
  return (
    <Flex gap={14}>
      <Button fz='sm' size='md' leftSection={<Add />} onClick={addSubAdmin}>
        Add New Sub Admin
      </Button>
      <FilterDropdown
        data={[
          { label: "Recently Added", value: "recent" },
          { label: "Name(A-Z)", value: "a-z" },
          { label: "Name(Z-A)", value: "z-a" },
        ]}
      />
      <Button
        fz='sm'
        size='md'
        variant='outline'
        leftSection={<DownloadIcon />}
      >
        Download Table
      </Button>
    </Flex>
  );
}
