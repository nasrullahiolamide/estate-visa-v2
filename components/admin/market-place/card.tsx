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
        <Flex justify="space-between" gap={10}>
          <Text fw={500} size="lg">
            Original Nike Sneakers
          </Text>
          <Pill
            c="white"
            radius="sm"
            bg="green.10"
            ml={8}
            className="capitalize"
          >
            New Arrival
          </Pill>
        </Flex>
        <Text fw={700} size="xl">
          ₦20,000
        </Text>
        <Text size="sm" color="violet" mt={-5}>
          House A10
        </Text>
        <StarRating className="!justify-start" />
      </Stack>

      <Flex wrap="wrap" justify="space-between" mt="auto" gap={35}>
        <Button variant="outline" color="gray" size="sm" fz={13} flex={1}>
          Reject
        </Button>
        <Button color="blue" size="sm" fz={13} flex={1}>
          Approve
        </Button>
      </Flex>
    </Stack>
  );
}
