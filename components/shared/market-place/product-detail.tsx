import { ProductData } from "@/builders/types/products";
import { ContactSellerButton } from "@/components/shared/market-place/contact-seller";
import { formatCurrency } from "@/packages/libraries/formatters/currency";
import { Divider, Flex, Pill, Stack, Text, Title } from "@mantine/core";
import { Fragment, ReactNode } from "react";

import { MODALS } from "@/packages/libraries";
import { Carousel } from "@mantine/carousel";
import { modals } from "@mantine/modals";
import { CloseCircle } from "iconsax-react";
import { Picture, StarRating } from "../interface";
import { productStatusColorConfig } from "../interface/cards/product";

interface ProductDetailProps extends ProductData {
  children: ReactNode;
}
export function ProductDetail({ children, ...item }: ProductDetailProps) {
  return (
    <Fragment>
      <Flex
        bg='white'
        pos='sticky'
        component='button'
        top={25}
        right={30}
        className='z-10 w-fit ml-auto shadow-xl rounded-full'
        p={8}
      >
        <CloseCircle
          className='ml-auto cursor-pointer'
          onClick={() => modals.close(MODALS.PRODUCT_DETAIL)}
        />
      </Flex>

      <Stack
        p={{
          base: 20,
          sm: 30,
        }}
      >
        <Stack>
          <Picture
            src={item.image ?? "/images/placeholder.png"}
            h={160}
            w='100%'
            alt={item.name ?? "product image"}
            className='rounded-lg'
            objectFit='cover'
          />

          <Stack mt={16} gap={5}>
            <Stack gap={15}>
              <Flex align='center' gap={24}>
                <Text fz={14} c='gray'>
                  Name:
                </Text>
                <Text fz={14}>{item.name}</Text>
              </Flex>

              <Flex align='center' gap={24}>
                <Text fz={14} c='gray'>
                  Price:
                </Text>
                <Text fw={500} fz={18}>
                  {formatCurrency(+item.price, "NGN")}
                </Text>
              </Flex>

              <Flex align='center' gap={24}>
                <Text fz={14} c='gray'>
                  Seller:
                </Text>
                <Text fz={14}>House {item.houseNumber}</Text>
              </Flex>

              <Flex align='center' gap={24}>
                <Text fz={14} c='gray'>
                  Phone No:
                </Text>
                <Text fz={14} fw={500} c='blue.4'>
                  {item.phone}
                </Text>
              </Flex>

              <Flex align='center' gap={24}>
                <Text fz={14} c='gray'>
                  Rating:
                </Text>
                <Text fz={14} fw={500} c='blue.4'>
                  <StarRating
                    className='!justify-start'
                    defaultRating={item.averageRating}
                  />
                </Text>
              </Flex>

              <Flex align='center' gap={24}>
                <Text fz={14} c='gray'>
                  Status:
                </Text>
                <Pill
                  c={productStatusColorConfig[item.status].color}
                  bg={productStatusColorConfig[item.status].bg}
                  ml={8}
                  radius='sm'
                  tt='capitalize'
                >
                  {item.status.includes("pending") ? "pending" : item.status}
                </Pill>
              </Flex>
            </Stack>

            <ContactSellerButton data={item} fz={14} mb={10} />
          </Stack>

          <Divider />
          <Stack>
            <Title order={2} c='plum.5' fz={14} fw={500}>
              Product Description
            </Title>
            <Text
              fz={14}
              c='gray'
              p={10}
              mih={60}
              className='border border-gray-3 rounded-md'
            >
              {item.description}
            </Text>
          </Stack>

          <Divider my={15} />
          {item.reviews.length > 0 && (
            <Fragment>
              <Stack>
                <Title order={2} c='plum.5' fz={14} fw={500}>
                  Reviews and Ratings ({item.reviews.length})
                </Title>
                <Carousel
                  withIndicators
                  height={120}
                  slideSize='100%'
                  slideGap='md'
                  align='start'
                  styles={{
                    indicators: {
                      bottom: -20,
                      gap: 8,
                    },
                    controls: {
                      top: -5,
                      justifyContent: "flex-end",
                      gap: 20,
                    },
                  }}
                >
                  {item.reviews?.map((review, index) => (
                    <Carousel.Slide key={review.id}>
                      <Stack>
                        <Flex align='center' gap={24}>
                          <Text fz={14} c='gray'>
                            Buyer ({index + 1}):
                          </Text>
                          <Text fz={14} fw={400} c='blue.4'>
                            <StarRating
                              className='!justify-start'
                              defaultRating={review.rating}
                            />
                          </Text>
                        </Flex>
                        <Text
                          fz={14}
                          c='gray'
                          p={10}
                          mih={80}
                          className='border border-gray-3 rounded-md'
                        >
                          {review.comments}
                        </Text>
                      </Stack>
                    </Carousel.Slide>
                  ))}
                </Carousel>
              </Stack>
              <Divider my={15} />
            </Fragment>
          )}
        </Stack>
        {children}
      </Stack>
    </Fragment>
  );
}
