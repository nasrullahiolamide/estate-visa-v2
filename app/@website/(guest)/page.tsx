"use client";

import { WebsiteHeader } from "@/components/website/website-header";
import { Box, Flex } from "@mantine/core";
import { useEffect } from "react";

import AOS from "aos";

export default function Page() {
  useEffect(() => {
    document.documentElement.style.opacity = "1";

    AOS.init({
      easing: "ease-in-out-sine",
      once: true,
    });
  }, []);

  return (
    <Flex>
      <Box
        display='grid'
        className='lg:gap-20 md:gap-8 gap-6'
        // maw={1440}
        w={"100%"}
        mx='auto'
      >
        <WebsiteHeader />
      </Box>
    </Flex>
  );
}
