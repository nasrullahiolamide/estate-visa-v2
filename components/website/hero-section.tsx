import { Flex, Box, Text, Button, Title, Stack } from "@mantine/core";
import { Picture } from "../shared/interface";
import { Features } from "./features";
import { MAX_SCREEN_WIDTH } from "@/packages/constants/size";

export function HeroSection() {
  return (
    <Stack
      py={40}
      className='h-full w-full overflow-hidden'
      justify='center'
      maw={MAX_SCREEN_WIDTH}
      mx='auto'
    >
      <Flex
        flex={1}
        direction='column'
        justify='center'
        className='lg:mx-16 md:mx-8 mx-4'
      >
        <Stack align='center' ta='center' gap={24}>
          <Title
            order={2}
            fw={700}
            fz={{
              base: 36,
              sm: 50,
              xl: 60,
            }}
          >
            Simplifying Estate Management <br className='hidden lg:block' />
            for Owners and Residents.
          </Title>

          <Text
            fz={{
              base: 16,
              sm: 18,
            }}
            lh={1.5}
            maw={800}
            w='100%'
          >
            From property oversight to resident communication, our platform
            empowers estate owners and admins to manage operations seamlessly
            while providing occupants with a smooth living experience.
          </Text>

          <Button px={60}>Talk to us</Button>
          <Features />
        </Stack>
      </Flex>

      <Picture
        mx='auto'
        my={20}
        width='100%'
        mah={500}
        src='/images/device-mockups.png'
        className='hidden sm:block'
      />
      <Picture
        my={20}
        mx='auto'
        width='90%'
        src='/images/mockup-dashboard.png'
        className='block sm:hidden'
      />
    </Stack>
  );
}
