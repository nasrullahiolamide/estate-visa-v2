import { ListArrow } from "@/icons/list-arrow";
import { Title, Card, Box, Text, Flex, Stack } from "@mantine/core";
import {} from "iconsax-react";

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  isPrimary?: boolean;
}

export function PricingCard({
  title,
  description,
  price,
  features,
  isPrimary,
}: PricingCardProps) {
  return (
    <Card
      p='lg'
      py={40}
      radius='lg'
      bg={isPrimary ? "blue.8" : "purple.4"}
      c={isPrimary ? "white" : "gray.12"}
      mih={480}
      component='article'
    >
      <Title order={2} className='prose-xl/semi-bold'>
        {title}
      </Title>
      <Text mt='sm' fz='sm' c={isPrimary ? "white" : "gray.12"}>
        {description}
      </Text>
      <Title order={2} mt='lg' className='prose-3xl/bold'>
        {price}
        <Text span>/month</Text>
      </Title>

      <Stack
        mt={20}
        pl={0}
        component='ul'
        c={isPrimary ? "white" : "black"}
        className='list-none'
      >
        {features.map((feature, index) => (
          <Flex component='li' key={index} gap={10} align='center'>
            <ListArrow />
            {feature}
          </Flex>
        ))}
      </Stack>
    </Card>
  );
}
