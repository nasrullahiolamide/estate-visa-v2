import { ProductData } from "@/builders/types/products";
import { formatCurrency } from "@/packages/libraries/formatters/currency";
import { Flex, Pill, Stack, Text } from "@mantine/core";
import { ReactNode } from "react";

import { generateProductButtons } from "../../market-place/product-buttons";
import { Picture } from "../picture";
import { StarRating } from "../star-rating";

import clsx from "clsx";

interface ProductCardProps {
  list: ProductData;
  onClick?: () => void;
  viewId: "admin" | "occupant";
  skeleton?: boolean;
}

export const configs: Record<
  PropertyKey,
  { color: string; bg: string; buttons: ReactNode }
> = {
  "pending-approval": {
    color: "#969921",
    bg: "#feffd7",
    buttons: generateProductButtons([
      { label: "Reject", color: "gray" },
      { label: "Approve", color: "blue" },
    ]),
  },

  approved: {
    color: "white",
    bg: "green",
    buttons: generateProductButtons([
      { label: "Reactivate", color: "gray", props: { disabled: true } },
      { label: "Suspend", color: "blue" },
    ]),
  },

  suspended: {
    color: "gray.12",
    bg: "gray.1",
    buttons: generateProductButtons([
      { label: "Suspend", color: "gray", props: { disabled: true } },
      { label: "Activate", color: "blue" },
    ]),
  },

  reported: {
    color: "red",
    bg: "red.1",
    buttons: generateProductButtons([
      { label: "Reactivate", color: "gray", props: { disabled: true } },
      { label: "Suspend", color: "blue" },
    ]),
  },
};

export function ProductCard({
  list,
  onClick,
  viewId,
  skeleton,
}: ProductCardProps) {
  return (
    <Stack
      p={12}
      key={list.id}
      onClick={onClick}
      className={clsx(
        "rounded-xl bg-white cursor-pointer h-fit",
        "border border-gray-3",
        {
          skeleton,
        }
      )}
    >
      <Picture
        src={list.image ?? "/images/placeholder.png"}
        h={150}
        w='100%'
        alt={list.name ?? "product image"}
        className='rounded-lg'
        objectFit='cover'
      />

      <Stack gap='xs'>
        <Flex justify='space-between' gap={10}>
          <Text fw={500} size='lg'>
            {list.name}
          </Text>
          <Pill
            c={configs[list.status].color}
            bg={configs[list.status].bg}
            ml={8}
            radius='sm'
            tt='capitalize'
          >
            {list.status.includes("pending") ? "pending" : list.status}
          </Pill>
        </Flex>
        <Text fw={700} size='xl'>
          {formatCurrency(+list.price || 1000, "NGN")}
        </Text>
        <Text size='sm' c='violet' mt={-5}>
          House A10
        </Text>
        <StarRating className='!justify-start' defaultRating={4} />
      </Stack>
      {viewId === "admin"
        ? configs[list.status].buttons
        : generateProductButtons([
            { label: "Remove", color: "gray" },
            { label: "Edit", color: "blue" },
          ])}
    </Stack>
  );
}
