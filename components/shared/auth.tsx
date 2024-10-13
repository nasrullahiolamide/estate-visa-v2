import { EstateVisaLogo } from "@/svgs/estate-visa-logo";
import { Box, Flex, Stack } from "@mantine/core";
import { PropsWithChildren } from "react";

type AuthProps = PropsWithChildren<{}>;

export function Auth({ children }: AuthProps) {
  return (
    <Flex
      h='100vh'
      pos='relative'
      align='center'
      justify='center'
      style={{
        backgroundImage: "url('/images/skyscrapers.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(57, 68, 188, 0.7)",
          zIndex: 2,
        }}
      />
      <Stack className='z-10 w-full mx-4' justify='center' align='center'>
        <Box
          bg='white'
          maw={600}
          mih={550}
          className='w-full rounded-3xl px-5 py-10 sm:px-10'
        >
          <Flex justify='center'>
            <EstateVisaLogo />
          </Flex>

          <Stack flex={1} mt={15}>
            {children}
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
