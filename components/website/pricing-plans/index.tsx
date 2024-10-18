import {
  Container,
  Grid,
  Card,
  Title,
  Text,
  Button,
  Box,
  Stack,
} from "@mantine/core";
import { Tag } from "../tag";
import { PricingCard } from "./card";
import { MAX_SCREEN_WIDTH } from "@/packages/constants/size";

export function PricingPlans() {
  const plans = [
    {
      title: "Basic Plan",
      description:
        "Ideal for small estates looking for essential management tools.",
      price: "FREE",
      features: [
        "Basic estate management",
        "Schedule meetings and service requests",
        "Limited admin tools",
        "Detailed reporting and analytics",
        "Advanced management features",
      ],
    },
    {
      title: "Premium Plan",
      description: "Suited for medium-sized estates needing advanced features.",
      price: "₦15,000",
      features: [
        "Advanced management features",
        "Automated notifications",
        "Detailed reporting and analytics",
        "Advanced management features",
        "Detailed reporting and analytics",
        "Advanced management features",
      ],
      isPrimary: true,
    },
    {
      title: "Enterprise Plan",
      description: "Designed for large estates with complex management needs.",
      price: "₦25,000",
      features: [
        "All-inclusive management tools",
        "Custom integration and advanced security",
        "Dedicated support and scalability",
        "Detailed reporting and analytics",
        "Advanced management features",
      ],
    },
  ];

  return (
    <Stack
      py='xl'
      gap={8}
      className='lg:p-16 md:p-8 p-4 gap-8'
      component='section'
      id='pricing'
    >
      <Stack component='header' gap={18} ta='center'>
        <Tag>PRICING</Tag>
        <Title order={2} className='sm:prose-4xl/bold prose-2xl/bold'>
          Find the Plan that Fits Your Estate
        </Title>
        <Text className='prose-sm/regular sm:prose-lg/regular'>
          Choose a plan that best aligns with your estate's needs and unlock
          premium features designed to streamline your management processes.
        </Text>
      </Stack>

      <Box
        component='section'
        className='grid gap-8 mt-6'
        style={{
          gridTemplateColumns: "repeat(auto-fill,minmax(min(370px,100%),1fr))",
          gridAutoRows: "1fr",
        }}
      >
        {plans.map((plan, index) => (
          <PricingCard {...plan} key={index} />
        ))}
      </Box>

      <Button px={60} mx='auto' className='w-full max-w-[500px]'>
        Talk to us now!
      </Button>
    </Stack>
  );
}

export default PricingPlans;
