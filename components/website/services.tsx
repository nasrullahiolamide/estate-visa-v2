import { Title, Text, Stack, Box, Flex } from "@mantine/core";

const details = [
  {
    title: "Property Management Excellence",
    description:
      "Monitor occupancy rates and manage maintenance tasks, all from a user-friendly dashboard that centralizes essential information.",
    src: "maintenance",
  },
  {
    title: "Communication Channels",
    description:
      "Our platform facilitates direct communication, ensuring that inquiries, updates, and notifications are communicated promptly and effectively.",
    src: "marketing",
  },
  {
    title: "Streamlined Service Requests",
    description:
      "Our system tracks requests from submission to resolution, ensuring that maintenance issues are addressed swiftly and efficiently.",
    src: "list",
  },
  {
    title: "User-Centric Dashboard Design",
    description:
      "Experience a visually appealing and intuitive dashboard. Whether you're tech-savvy or a beginner, navigating the platform is a breeze.",
    src: "web-experience",
  },
  {
    title: "Community Marketplace",
    description:
      "Foster local commerce with our marketplace feature, where occupants and sub-occupants can buy and sell items within the community.",
    src: "money",
  },
  {
    title: "Financial Oversight",
    description:
      "Easily manage rental payments, service fees, and other financial obligations, providing a clear overview of your estate's financial health.",
    src: "light-bulb",
  },
];

export function Services() {
  return (
    <Stack bg='blue.8' className='lg:p-16 md:p-8 p-4' component='section'>
      <Flex
        component='section'
        direction='column'
        ta='center'
        align='center'
        justify='center'
        c='white'
        mx='auto'
        mt={35}
        gap={20}
        maw={600}
      >
        <Title
          component='h2'
          fz={{
            base: 30,
            sm: 40,
          }}
          fw={500}
        >
          Comprehensive Services for Effective Estate Management
        </Title>
        <Text className='text-base'>
          Our platform empowers users to manage their properties while fostering
          a collaborative community environment.
        </Text>
      </Flex>
      <Box
        component='section'
        className='grid gap-8 mt-10'
        style={{
          gridTemplateColumns: "repeat(auto-fill,minmax(min(370px,100%),1fr))",
          gridAutoRows: "1fr",
        }}
      >
        {details.map((detail) => (
          <Stack
            component='article'
            key={detail.title}
            bg='blue.5'
            className='p-8 sm:p-12 rounded-xl'
            c='white'
            data-aos='fade-up'
          >
            <Box
              component='figure'
              bg='white'
              p={5}
              className='rounded-xl w-fit s'
            >
              <img
                src={`/sprites/${detail.src}.gif`}
                alt={detail.title}
                className='w-12 h-12'
              />
            </Box>

            <Stack mt='auto'>
              <Title component='h3' fw={700} className='prose-xl/medium'>
                {detail.title}
              </Title>
              <Text className='prose-base sm:prose-lg'>
                {detail.description}
              </Text>
            </Stack>
          </Stack>
        ))}
      </Box>
    </Stack>
  );
}
