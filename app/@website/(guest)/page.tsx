"use client";

import { WebsiteHeader } from "@/components/website/website-header";
import { Box, Stack } from "@mantine/core";
import { useEffect } from "react";

import AOS from "aos";
import { HeroSection, Features, Services } from "@/components/website";

export default function Page() {
  useEffect(() => {
    document.documentElement.style.opacity = "1";

    AOS.init({
      easing: "ease-in-out-sine",
      once: true,
    });
  }, []);

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
      <Features />
      <Services />
    </Stack>
  );
}
