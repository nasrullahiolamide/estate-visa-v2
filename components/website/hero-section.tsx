import { MAX_SCREEN_WIDTH } from "@/packages/constants/size";
import { Flex, Stack, Text, Title } from "@mantine/core";
import { Picture } from "../shared/interface";
import { Features } from "./features";
import { TalkToUsButton } from "./talk-to-us/button";

export function HeroSection() {
  return (
    <Stack
      py={40}
      className='h-full w-full overflow-hidden sm:px-5'
      justify='center'
      maw={MAX_SCREEN_WIDTH}
      mx='auto'
    >
      <Flex flex={1} direction='column' justify='center'>
        <Stack align='center' ta='center' gap={24}>
          <div className='lg:mx-16 md:mx-8 mx-4'>
            <Title
              order={2}
              fw={700}
              fz={{
                base: 36,
                sm: 50,
                xl: 60,
              }}
              data-aos='fade-down'
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
              data-aos='fade-in'
            >
              From property oversight to resident communication, our platform
              empowers estate owners and admins to manage operations seamlessly
              while providing occupants with a smooth living experience.
            </Text>
          </div>
          <TalkToUsButton px={60} data-aos='fade-in' />
          <Features />
        </Stack>
      </Flex>

      <Picture
        mx='auto'
        my={20}
        width='100%'
        mah={500}
        src='/images/device-mockups.png'
        className='hidden md:block'
        data-aos='zoom-in'
      />
      <Picture
        my={20}
        mx='auto'
        width='90%'
        src='/images/mockup-dashboard.png'
        className='block md:hidden'
        data-aos='fade-up'
      />
    </Stack>
  );
}
