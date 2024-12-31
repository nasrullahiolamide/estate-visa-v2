import { ProductData } from "@/builders/types/products";
import { ContactSellerButton } from "@/components/shared/market-place/contact-seller";
import { formatCurrency } from "@/packages/libraries/formatters/currency";
import { Divider, Flex, Pill, Stack, Text, Title } from "@mantine/core";
import { Fragment, ReactNode } from "react";

import { Picture, StarRating } from "../interface";
import { configs } from "../interface/cards/product";

interface ProductDetailProps extends ProductData {
  children: ReactNode;
}
export function ProductDetail({ children, ...item }: ProductDetailProps) {
  return (
    <Fragment>
      <Stack
        p={{
          base: 20,
          sm: 30,
        }}
      >
        <Stack
          className="overflow-auto"
        >
          <Picture
            src={item.image ?? "/images/placeholder.png"}
            h={160}
            w="100%"
            alt={item.name ?? "product image"}
            className="rounded-lg"
            objectFit="cover"
          />

          <Stack mt={16}>
            <Stack gap={20}>
              <Flex align="center" gap={24}>
                <Text fz={14} c="gray">
                  Name:
                </Text>
                <Text fz={14}>{item.name}</Text>
              </Flex>

              <Flex align="center" gap={24}>
                <Text fz={14} c="gray">
                  Price:
                </Text>
                <Text fw={500} fz={18}>
                  {formatCurrency(+item.price, "NGN")}
                </Text>
              </Flex>

              <Flex align="center" gap={24}>
                <Text fz={14} c="gray">
                  Seller:
                </Text>
                <Text fz={14}>House A10</Text>
              </Flex>

              <Flex align="center" gap={24}>
                <Text fz={14} c="gray">
                  Phone No:
                </Text>
                <Text fz={14} fw={500} c="blue.4">
                  {item.phone}
                </Text>
              </Flex>

              <Flex align="center" gap={24}>
                <Text fz={14} c="gray">
                  Rating:
                </Text>
                <Text fz={14} fw={500} c="blue.4">
                  <StarRating className="!justify-start" />
                </Text>
              </Flex>

              <Flex align="center" gap={24}>
                <Text fz={14} c="gray">
                  Status:
                </Text>
                <Pill
                  c={configs[item.status].color}
                  bg={configs[item.status].bg}
                  ml={8}
                  radius="sm"
                  tt="capitalize"
                >
                  {item.status.includes("pending") ? "pending" : item.status}
                </Pill>
              </Flex>
            </Stack>

            <ContactSellerButton data={item} />
          </Stack>

          <Divider />
          <Stack>
            <Title order={2} c="plum.5" fz={14} fw={500}>
              Product Description
            </Title>
            <Text
              fz={14}
              c="gray"
              p={10}
              mih={60}
              className="border border-gray-3 rounded-md"
            >
              {item.description}
            </Text>
          </Stack>

          <Divider my={15} />

          <Stack>
            <Title order={2} c="plum.5" fz={14} fw={500}>
              Reviews and Ratings
            </Title>
            <Flex align="center" gap={24}>
              <Text fz={14} c="gray">
                Buyer 1:
              </Text>
              <Text fz={14} fw={500} c="blue.4">
                <StarRating className="!justify-start" />
              </Text>
            </Flex>
            <Text
              fz={14}
              c="gray"
              p={10}
              mih={60}
              className="border border-gray-3 rounded-md"
            >
              {item.description}
            </Text>
          </Stack>

          <Divider my={15} />
          {children}
        </Stack>
      </Stack>
    </Fragment>
  );
}
