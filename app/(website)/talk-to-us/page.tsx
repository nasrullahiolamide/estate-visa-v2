"use client";

import { Box, Stack, Title } from "@mantine/core";
import { WebsiteHeader, WebsiteFooter } from "@/components/website";
import { TalkToUsForm } from "@/components/website/talk-to-us/form";

export default function TalkToUs() {
  return (
    <Stack gap={0}>
      <Box
        display="grid"
        className="lg:gap-20 md:gap-8 gap-6"
        w="100%"
        mx="auto"
      >
        <WebsiteHeader />
      </Box>

      <Stack px={16} gap={0}>
        <Title
          order={2}
          ta="center"
          className="w-full prose-2xl/semi-bold sm:prose-4xl/semi-bold sm:px-5 py-8 sm:py-10"
          maw={950}
          mx="auto"
        >
          Own a property you want to manage? Reach out to us and we will get
          back to you promptly.
        </Title>
        <Stack
          className="h-full w-full shadow-xl sm:shadow-2xl rounded-xl sm:rounded-3xl border border-gray-2 sm:mx-auto"
          justify="center"
          py={{
            base: 50,
            sm: 80,
          }}
          px={{
            base: 20,
            sm: 60,
            lg: 120,
          }}
          w={{
            md: "80%",
            lg: "70%",
            xl: "55%",
          }}
          maw={950}
        >
          <TalkToUsForm />
        </Stack>
      </Stack>

      <WebsiteFooter />
    </Stack>
  );
}
