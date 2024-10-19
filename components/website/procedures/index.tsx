import { Title, Text, Box, Stack, Divider, Flex } from "@mantine/core";
import { Tag } from "../tag";
import { Step } from "./step";
import { VerticalLine } from "./vertical-line";

export function Procedures() {
  return (
    <Stack
      mih={700}
      py='xl'
      bg='#F5F5F5'
      className='lg:p-16 md:p-8 p-4 gap-8'
      align='center'
      component='section'
      id='how-it-works'
    >
      <Stack component='header' gap={18} ta='center'>
        <Tag>HOW IT WORKS</Tag>
        <Title order={2} className='sm:prose-4xl/bold prose-2xl/bold'>
          Effortless Estate Management for Owners
          <br className='hidden lg:block' />
          and Residents
        </Title>
        <Text className='prose-sm/regular sm:prose-lg/regular'>
          Your all-in-one solution for managing your estate effortlessly,
          connecting owners and residents with everything they need.
        </Text>
      </Stack>

      <Flex
        component='section'
        wrap='wrap'
        align='center'
        justify='center'
        gap={10}
        className='flex-col sm:flex-row'
      >
        <Step
          number={1}
          sprite='chat'
          title='Talk to Us at Estate Visa'
          description="Start by contacting us to discuss your estate requirements. We'll help you design a solution that fits your needs."
        />
        <VerticalLine />
        <Step
          number={2}
          sprite='contract'
          title='Onboard Your Estate'
          description='We help you onboard your estate, ensuring every house and resident is added seamlessly.'
        />
        <VerticalLine />
        <Step
          number={3}
          sprite='project'
          title='Access Estate Features'
          description='Utilize our full suite of tools to manage service requests, schedule meetings, and facilitate marketplace interactions.'
        />
      </Flex>
    </Stack>
  );
}
