"use client";

import { Button, Flex, Group, Stack, Textarea, TextInput } from "@mantine/core";
import { FlowContainer } from "@/components/layout/flow-container";
import { ServiceRequestsData } from "@/builders/types/service-requests";
import { Fragment } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { builder } from "@/builders";
import { formatDate, MODALS } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { modals } from "@mantine/modals";
import { AxiosError } from "axios";
import clsx from "clsx";
import { DATE_FORMAT } from "@/packages/constants/time";

export enum SERVICE_REQUEST_STATUS {
  PENDING = "pending",
  DECLINED = "declined",
  APPROVED = "approved",
}

interface ViewServiceRequestProps extends ServiceRequestsData {}

export function ViewServiceRequest({ id, status }: ViewServiceRequestProps) {
  const queryClient = useQueryClient();

  // Fetch data
  const { data, isLoading } = useQuery({
    queryKey: builder.service_requests.id.get.get(id),
    queryFn: () => builder.use().service_requests.id.get(id),
    select: (data) => data,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: builder.use().service_requests.id.change_status,
    onError: (error: AxiosError) => {
      handleError(error)();
      modals.close(MODALS.FORM_DETAILS);
    },
    onSuccess: () => {
      handleSuccess({
        message: "Service Request status changed successfully",
        autoClose: 1200,
      });
      queryClient.invalidateQueries({
        queryKey: builder.service_requests.get.get(),
      });
      modals.close(MODALS.FORM_DETAILS);
    },
  });

  const accountType = data?.occupant.isMain ? "Occupant" : "Sub Occupant";

  return (
    <Fragment>
      <FlowContainer
        className='bg-primary-background-white overflow-scroll'
        type='plain'
        bg='white'
        gap={15}
        h={520}
      >
        <TextInput
          label='House Number'
          value={data?.occupant.house.houseNumber}
          disabled
          classNames={{
            input: clsx("capitalize", {
              skeleton: isLoading,
            }),
          }}
        />
        <TextInput
          label='Account Type'
          value={accountType}
          disabled
          classNames={{
            input: clsx("capitalize", {
              skeleton: isLoading,
            }),
          }}
        />
        <TextInput
          label='Phone Number'
          disabled
          value={data?.occupant.user.phone}
          classNames={{
            input: clsx("capitalize", {
              skeleton: isLoading,
            }),
          }}
        />
        <TextInput
          label='Service Type'
          disabled
          value={data?.serviceType}
          classNames={{
            input: clsx("capitalize", {
              skeleton: isLoading,
            }),
          }}
        />
        <TextInput
          label='Date'
          disabled
          value={formatDate(data?.createdAt, DATE_FORMAT) ?? ""}
          classNames={{
            input: clsx("capitalize", {
              skeleton: isLoading,
            }),
          }}
        />
        <TextInput
          label='Preferred Time'
          disabled
          value={data?.preferredTime}
          classNames={{
            input: clsx("capitalize", {
              skeleton: isLoading,
            }),
          }}
        />
        <TextInput
          label='Urgency Level'
          disabled
          value={data?.urgencyLevel}
          classNames={{
            input: clsx("capitalize", {
              skeleton: isLoading,
            }),
          }}
        />
        <Textarea
          label='Brief Description'
          disabled
          value={data?.description}
          classNames={{
            input: clsx("capitalize", {
              skeleton: isLoading,
            }),
          }}
        />
        <TextInput
          className='capitalize'
          label='Status'
          disabled
          value={data?.status}
          classNames={{
            input: clsx("capitalize", {
              skeleton: isLoading,
            }),
          }}
        />
      </FlowContainer>
      {status === "pending" ? (
        <Flex mt={20} gap={10} className='flex-col sm:flex-row'>
          <Button
            color='red'
            variant='outline'
            className='sm:flex-1'
            disabled={isPending}
            children='Decline Request'
            onClick={() => mutate({ id, status: "declined" })}
          />
          <Button
            className='sm:flex-1'
            onClick={() => mutate({ id, status: "approved" })}
            disabled={isPending}
            children='Approve Request'
          />
        </Flex>
      ) : (
        <Button
          mt={20}
          w='100%'
          onClick={() => modals.close(MODALS.FORM_DETAILS)}
          children='Close'
        />
      )}
    </Fragment>
  );
}
