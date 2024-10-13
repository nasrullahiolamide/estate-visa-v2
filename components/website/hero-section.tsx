import { Flex, Box, Text, Button, Title, Stack } from "@mantine/core";
import { Picture } from "../shared/interface";
import { TickCircle } from "iconsax-react";

export function HeroSection() {
  return (
    <Flex className='h-full md:min-h-[90vh] overflow-hidden' gap={60}>
      <Flex
        py={40}
        flex={1}
        direction='column'
        justify='center'
        className='lg:px-16 md:px-8 px-4'
      >
        <Stack gap={20} maw={700}>
          <Flex
            className='rounded-full w-fit'
            py={8}
            px={18}
            align='center'
            gap={4}
            c='accent.10'
            bg='purple.4'
          >
            <TickCircle size={16} />
            <span className='text-xs'>Estate management made simple.</span>
          </Flex>

          <Title
            order={2}
            fw={700}
            fz={{
              base: 36,
              sm: 50,
              xl: 60,
            }}
          >
            Simplifying Estate Management for Owners and Residents.
          </Title>

          <Text
            fz={{
              base: 16,
              sm: 18,
            }}
          >
            From property oversight to resident communication, our platform
            empowers estate owners and admins to manage operations seamlessly
            while providing occupants with a smooth living experience.
          </Text>

          <Button w='fit-content'>Talk to us</Button>
        </Stack>
      </Flex>

      <Flex
        flex={{
          md: 0.4,
          lg: 0.7,
        }}
        className='hidden md:flex'
        pos='relative'
        align='center'
        justify='center'
        style={{
          backgroundImage: "url('/images/skyscrapers.png')",
          backgroundRepeat: "no-repeat",
        }}
      >
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
        <Picture
          maw={800}
          width='120%'
          pos='absolute'
          right={0}
          src='/images/mockup-dashboard.png'
          className='z-10 hidden lg:block'
        />
      </Flex>
    </Flex>
  );
}
