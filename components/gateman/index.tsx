"use client";

import clsx from "clsx";
import { Fragment } from "react";
import { AxiosError } from "axios";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Button, Flex, TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";

import { builder } from "@/builders";

import { DATE_FORMAT } from "@/packages/constants/time";
import { formatDate, MODALS } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";

import { FlowContainer } from "@/components/layout/flow-container";
import { GateRequestData } from "@/builders/types/gate-requests";

interface ViewGateRequestProps extends GateRequestData {}

export function ViewGateRequest({ id, status, ...data }: ViewGateRequestProps) {
  const queryClient = useQueryClient();

  const { mutate: changeStatus, isPending } = useMutation({
    mutationFn: builder.use().gates.requests.change_status,
    onError: (error: AxiosError) => {
      handleError(error)();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.gates.requests.get.get(),
      });
      handleSuccess({
        message: "Gate Request Approved Successfully",
        autoClose: 1200,
      });
      modals.close(MODALS.FORM_DETAILS);
    },
  });

  return (
    <Fragment>
      <FlowContainer
        className='bg-primary-background-white overflow-scroll'
        type='plain'
        bg='white'
        gap={15}
      >
        <TextInput label='Guest Name' disabled value={data?.guestName} />
        <TextInput label='Guest Type' disabled value={data?.guestType} />
        <TextInput
          label='Date'
          disabled
          value={formatDate(data?.createdAt, DATE_FORMAT) ?? ""}
        />

        <TextInput label='Access Code' disabled value={data?.accessCode} />
        <TextInput
          className='capitalize'
          label='Status'
          disabled
          value={status}
        />
      </FlowContainer>
      {status === "pending" ? (
        <Flex mt={20} gap={20} className='flex-col sm:flex-row'>
          <Button
            color='red'
            variant='outline'
            className='sm:flex-1'
            disabled={isPending}
            children='Close'
            onClick={() => modals.close(MODALS.FORM_DETAILS)}
          />
          <Button
            className='sm:flex-1'
            onClick={() => changeStatus({ id, status: "approved" })}
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
