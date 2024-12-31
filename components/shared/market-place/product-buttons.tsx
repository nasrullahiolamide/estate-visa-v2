"use client";

import { builder } from "@/builders";
import { ProductStatus } from "@/builders/types/products";
import { handleError, handleSuccess } from "@/packages/notification";
import { Button, ButtonProps, Flex } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Config = {
  label: string;
  color: string;
  props?: ButtonProps & { onClick?: () => void };
}[];

interface ProductButtonsProps {
  id?: string;
  status?: ProductStatus;
  buttons?: Config;
}

export function ProductButtons({
  status,
  id = "",
  buttons = [],
}: ProductButtonsProps) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: builder.$use.products.change_status,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.products.get.$get(),
      });
      handleSuccess({
        message: "Product Updated Successfully",
      });
    },
    onError: handleError(),
  });

  const actions: Record<PropertyKey, Config> = {
    "pending-approval": [
      {
        label: "Reject",
        color: "gray",
        props: {
          disabled: isPending,
          onClick: () => mutate({ id, status: "reject" }),
        },
      },
      {
        label: "Approve",
        color: "blue",
        props: {
          disabled: isPending,
          onClick: () => mutate({ id, status: "approve" }),
        },
      },
    ],

    approved: [
      {
        label: "Suspend",
        color: "blue",
        props: {
          disabled: isPending,
          onClick: () => mutate({ id, status: "suspend" }),
        },
      },
    ],
    suspended: [
      {
        label: "Activate",
        color: "blue",
        props: {
          disabled: true,
          onClick: () => mutate({ id, status: "active" }),
        },
      },
    ],
    reported: [
      {
        label: "Suspend",
        color: "blue",
        props: {
          disabled: isPending,
          onClick: () => mutate({ id, status: "suspend" }),
        },
      },
    ],
  };

  const Btns = status ? actions[status] : buttons;

  return (
    <Flex wrap='wrap' justify='space-between' mt='auto' gap={35}>
      {Btns.map((action, index) => (
        <Button
          key={index}
          variant={action.color === "gray" ? "outline" : "filled"}
          color={action.color}
          size='sm'
          h={40}
          fz={13}
          flex={1}
          onClick={(e) => {
            e.stopPropagation();
            action.props?.onClick?.();
          }}
          {...action.props}
        >
          {action.label}
        </Button>
      ))}
    </Flex>
  );
}
