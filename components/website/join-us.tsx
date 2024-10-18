import { Button, Stack, Title, Text } from "@mantine/core";

export function JoinUs() {
  return (
    <Stack
      gap={32}
      maw={1300}
      mih={400}
      my={64}
      mx='auto'
      bg='gray.12'
      c='white'
      className='rounded-3xl lg:px-36 md:px-8 px-8 m-4'
      justify='center'
      align='center'
      ta='center'
      style={{
        backgroundImage: "url('/images/black-stripe.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Title order={2} className='prose-3xl/medium'>
        We Can't Wait to See You Join Our Platform!
      </Title>

      <Text
        fz={{
          base: 16,
          sm: 18,
        }}
        lh={1.5}
      >
        Talk to us today and discover how easy it is to streamline your estate’s
        operations. Whether you are an owner or an estate manager, your
        experience just got better.
      </Text>

      <Button px={60}>Talk to us now!</Button>
    </Stack>
  );
}
