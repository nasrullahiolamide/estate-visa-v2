import { Emblem, Picture, StarRating } from "@/components/shared/interface";
import { Text, Button, Group, Stack, Pill, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { ProductDetail } from "./detail";
import { MODALS } from "@/packages/libraries";

interface ProductCardProps {}

const handleProductDetail = () => {
  modals.open({
    modalId: MODALS.PRODUCT_DETAIL,
    children: <ProductDetail />,
    classNames: {
      body: "p-0",
      header: "right-8 top-6 absolute bg-transparent",
    },
  });
};

export function ProductCard({}: ProductCardProps) {
  return (
    <Stack
      p={18}
      className="rounded-xl bg-white cursor-pointer"
      onClick={handleProductDetail}
    >
      <Picture
        src="https://via.placeholder.com/300"
        h={150}
        w="100%"
        alt="product"
        className="rounded-lg"
        objectFit="cover"
      />

      <Stack gap="xs">
        <Text fw={500} size="lg">
          Original Nike Sneakers
        </Text>
        <Text fw={700} size="xl">
          ₦20,000
        </Text>
        <StarRating className="!justify-start" />
        <Text size="sm" color="violet" mt={-5}>
          House A10
        </Text>
        <Text c="blue.7" className="underline cursor-pointer" mt={10}>
          View Details
        </Text>
      </Stack>
    </Stack>
  );
}
