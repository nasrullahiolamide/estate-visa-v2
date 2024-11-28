"use client";

import { builder } from "@/builders";
import { FilterRequestsDropdown } from "@/components/admin/overview";
import { NoData } from "@/icons";
import { fromNow } from "@/packages/libraries/formatters";
import { Button, Flex, Stack, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { Fragment, useEffect } from "react";

import clsx from "clsx";

interface ServiceRequestProps {}

export function ServiceRequest({}: ServiceRequestProps) {
  const [status, setStatus] = useQueryState("sr-prd", {
    defaultValue: "",
  });

  const { data, isLoading } = useQuery({
    queryKey: builder.dashboard.occupant.service_requests.get(status),
    queryFn: () => builder.use().dashboard.occupant.service_requests(status),
    select: (data) => data,
  });

  return (
    <Stack
      flex={1}
      bg='white'
      className={clsx("rounded-lg backdrop-blur-sm w-full", {
        skeleton: isLoading,
      })}
      p={20}
      gap={16}
    >
      <Flex justify='space-between' wrap='wrap' gap={12}>
        <Stack gap={10}>
          <Title order={3} className='prose-xl/medium text-primary-text-body'>
            Service Request
          </Title>
          <Text fz={14} c='gray'>
            List of services you requested for this week
          </Text>
        </Stack>
        <FilterRequestsDropdown
          data={[
            { label: "All", value: "" },
            {
              label: "In Progress",
              value: "in-progress",
            },
            {
              label: "Pending",
              value: "pending",
            },
            {
              label: "Completed",
              value: "completed",
            },
          ]}
          size='sm'
          value={status}
          onFilter={setStatus}
        />
      </Flex>
      {data?.length ? (
        <Fragment>
          <Stack mah={400} className='overflow-auto' gap={0}>
            {data?.map((r) => {
              const color: Record<PropertyKey, string> = {
                completed: "#11A506",
                pending: "#969921",
                "in-progress": "var(--blue-4)",
              };

              return (
                <Flex
                  key={r.id}
                  gap={18}
                  wrap='nowrap'
                  align='center'
                  justify='space-between'
                  className='border-t border-gray-2'
                  py={16}
                >
                  <Stack gap={10}>
                    <Text fz={14}>
                      You requested for{" "}
                      <span className='capitalize'>{r.serviceType}</span>{" "}
                      service
                    </Text>
                    <Text fz={12} c='gray'>
                      {fromNow(r.updatedAt)}
                    </Text>
                  </Stack>

                  <Button
                    bg={color[r.status]}
                    className='capitalize'
                    miw={130}
                    size='sm'
                  >
                    {r.status}
                  </Button>
                </Flex>
              );
            })}
          </Stack>
        </Fragment>
      ) : (
        <Stack gap={0} h={400}>
          <NoData />
          <Text ta='center'>No Data Available</Text>
        </Stack>
      )}
    </Stack>
  );
}
