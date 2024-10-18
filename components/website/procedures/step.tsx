import { Title, Card, Box, Text, Stack, Flex, Indicator } from "@mantine/core";

interface StepProps {
  number: number;
  sprite: "contract" | "chat" | "project";
  title: string;
  description: string;
}

export function Step({ number, sprite: icon, title, description }: StepProps) {
  return (
    <Stack
      p='lg'
      component='article'
      justify='center'
      align='center'
      maw={350}
      w='100%'
      ta='center'
    >
      <Indicator label={number} size={28} position='top-start' fz={24} fw={600}>
        <Box component='figure' bg='white' p={5} className='rounded-xl w-fit'>
          <img src={`/sprites/${icon}.gif`} alt={icon} className='w-24 h-24' />
        </Box>
      </Indicator>

      <Title order={2} className='prose-2xl'>
        {title}
      </Title>
      <Text fz='sm'>{description}</Text>
    </Stack>
  );
}
