import { builder } from "@/builders";
import { ProductData } from "@/builders/types/products";
import { formatCurrency } from "@/packages/libraries/formatters/currency";
import { handleError, handleSuccess } from "@/packages/notification";
import { Button, Flex, Pill, Stack, Text } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ContactSellerButton } from "../../market-place/contact-seller";
import { ProductButtons } from "../../market-place/product-buttons";
import { Picture } from "../picture";
import { StarRating } from "../star-rating";

import clsx from "clsx";

interface ProductCardProps {
  list: ProductData;
  onClick?: () => void;
  viewId: "admin" | "owner" | "viewer";
  skeleton?: boolean;
}

export const productStatusColorConfig: Record<
  PropertyKey,
  { color: string; bg: string }
> = {
  "pending-approval": {
    color: "#969921",
    bg: "#feffd7",
  },

  approved: {
    color: "white",
    bg: "green",
  },

  suspended: {
    color: "gray.12",
    bg: "gray.1",
  },

  reported: {
    color: "red",
    bg: "red.1",
  },
};

export function ProductCard({
  list,
  onClick,
  viewId,
  skeleton,
}: ProductCardProps) {
  const queryClient = useQueryClient();

  const { mutate: remove, isPending: isRemoving } = useMutation({
    mutationFn: builder.$use.products.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.products.get.$get(),
      });
      handleSuccess({
        message: "Product Deleted Successfully",
      });
    },
    onError: handleError(),
  });

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
            c={productStatusColorConfig[list.status].color}
            bg={productStatusColorConfig[list.status].bg}
            ml={8}
            radius='sm'
            tt='capitalize'
          >
            {list.status.includes("pending") ? "pending" : list.status}
          </Pill>
        </Flex>
        <Text fw={700} size='xl'>
          {formatCurrency(+list.price, "NGN")}
        </Text>
        <Text size='sm' c='violet' mt={-5}>
          House A10
        </Text>
        <StarRating className='!justify-start' defaultRating={4} />
      </Stack>

      {viewId === "admin" ? (
        <ProductButtons status={list.status} id={list.id} />
      ) : viewId === "viewer" ? (
        <Flex justify='space-between' gap={10}>
          <ContactSellerButton data={list} my={0} mt={10} variant='outline' />
          <Button fz={14} size='sm' mt={10} h={40}>
            View Details
          </Button>
        </Flex>
      ) : (
        <ProductButtons
          buttons={[
            {
              label: "Remove",
              color: "gray",
              props: {
                onClick: () => remove(list.id),
                loading: isRemoving,
                disabled: isRemoving,
              },
            },
            { label: "Edit", color: "blue", props: { disabled: isRemoving } },
          ]}
        />
      )}
    </Stack>
  );
}
