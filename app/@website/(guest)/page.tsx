"use client";

import { Box, Stack } from "@mantine/core";
import {
  HeroSection,
  Services,
  WebsiteHeader,
  WebsiteFooter,
  JoinUs,
  PricingPlans,
} from "@/components/website";

export default function Page() {
  return (
    <Stack gap={0}>
      <Box
        display='grid'
        className='lg:gap-20 md:gap-8 gap-6'
        w='100%'
        mx='auto'
      >
        <WebsiteHeader />
      </Box>
      <HeroSection />
      <Services />
      <PricingPlans />
      <JoinUs />
      <WebsiteFooter />
    </Stack>
  );
}
