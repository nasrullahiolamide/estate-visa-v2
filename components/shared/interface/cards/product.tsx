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
  onEdit?: () => void;
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

  active: {
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
  rejected: {
    color: "red",
    bg: "red.1",
  },
};

export function ProductCard({
  list,
  onClick,
  onEdit,
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
      handleSuccess("Product Deleted Successfully", { autoClose: 1200 });
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
        src={list.image}
        h={150}
        w='100%'
        alt={list.name}
        className='rounded-lg'
        objectFit='cover'
      />

      <Stack gap={6}>
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
          House {list.houseNumber}
        </Text>
        <StarRating
          className='!justify-start'
          defaultRating={list.averageRating}
        />
      </Stack>

      {viewId === "admin" ? (
        <ProductButtons status={list.status} id={list.id} />
      ) : viewId === "viewer" ? (
        <Flex gap={10}>
          <ContactSellerButton data={list} my={0} variant='outline' flex={1} />
          <Button fz={12} size='compact-sm' flex={1} h={40}>
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
            {
              label: "Edit",
              color: "blue",
              props: {
                disabled: isRemoving,
                onClick: onEdit,
              },
            },
          ]}
        />
      )}
    </Stack>
  );
}
