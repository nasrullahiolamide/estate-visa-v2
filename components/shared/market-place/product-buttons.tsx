"use client";

import { builder } from "@/builders";
import { ProductStatus } from "@/builders/types/products";
import { handleError, handleSuccess } from "@/packages/notification";
import { Button, ButtonProps, Flex } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Config = {
  label: string;
  color: string;
  props?: ButtonProps & { onClick?: () => void; type?: "button" | "submit" };
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
      handleSuccess("Product Status Updated Successfully");
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
          onClick: () => mutate({ id, status: "rejected" }),
        },
      },
      {
        label: "Approve",
        color: "blue",
        props: {
          disabled: isPending,
          onClick: () => mutate({ id, status: "active" }),
        },
      },
    ],

    active: [
      {
        label: "Suspend",
        color: "blue",
        props: {
          disabled: isPending,
          loading: isPending,
          onClick: () => mutate({ id, status: "suspended" }),
        },
      },
    ],
    suspended: [
      {
        label: "Activate",
        color: "blue",
        props: {
          disabled: isPending,
          loading: isPending,
          onClick: () => mutate({ id, status: "active" }),
        },
      },
    ],
    reported: [
      {
        label: "Suspend",
        color: "blue",
        props: {
          variant: "outline",
          disabled: isPending,
          onClick: () => mutate({ id, status: "suspended" }),
        },
      },
      {
        label: "Activate",
        color: "blue",

        props: {
          disabled: isPending,
          loading: isPending,
          onClick: () => mutate({ id, status: "active" }),
        },
      },
    ],
    rejected: [
      {
        label: "Approve",
        color: "blue",
        props: {
          disabled: isPending,
          loading: isPending,
          onClick: () => mutate({ id, status: "active" }),
        },
      },
    ],
  };

  const Btns = status ? actions[status] : buttons;

  return (
    <Flex wrap='wrap' justify='space-between' mt='auto' gap={10}>
      {Btns.map((action) => (
        <Button
          key={action.label}
          variant={action.color === "gray" ? "outline" : "filled"}
          color={action.color}
          h={40}
          fz={12}
          size='compact-sm'
          flex={1}
          {...action.props}
          onClick={(e) => {
            e.stopPropagation();
            action.props?.onClick?.();
          }}
        >
          {action.label}
        </Button>
      ))}
    </Flex>
  );
}
