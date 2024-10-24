import { MAX_SCREEN_WIDTH } from "@/packages/constants/size";
import { Button, Stack, Title, Text, Flex } from "@mantine/core";
import { TalkToUsButton } from "./talk-to-us/button";

export function JoinUs() {
  return (
    <Stack className='lg:p-16 md:p-8 p-4' component='section'>
      <Flex
        component='section'
        direction='column'
        ta='center'
        align='center'
        justify='center'
        c='white'
        mt={10}
        gap={36}
        mih={500}
        className=' sm:px-24 px-6 rounded-3xl sm:rounded-[40px]'
        style={{
          backgroundImage: `url("/images/black-stripe.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Title order={2} className='prose-3xl/medium sm:prose-4xl/medium'>
          We Can't Wait to See You Join Our Platform!
        </Title>

        <Text
          fz={{
            base: 16,
            sm: 20,
          }}
          lh={1.5}
          maw={950}
        >
          Talk to us today and discover how easy it is to streamline your
          estate’s operations. Whether you are an owner or an estate manager,
          your experience just got better.
        </Text>

        <TalkToUsButton px={60} />
      </Flex>
    </Stack>
  );
}
