import { FilterRequestsDropdown } from "@/components/admin/overview";
import { Button, Flex, Stack, Text, Title } from "@mantine/core";
import { useQueryState } from "nuqs";

interface ServiceRequestProps {}

const requests = [
  {
    id: 1,
    service: "Plumbing",
    status: "approved",
    time: "12 minutes ago",
  },
  {
    id: 2,
    service: "Electrical",
    status: "pending",
    time: "1 hour ago",
  },
  {
    id: 3,
    service: "Cleaning",
    status: "declined",
    time: "2 hours ago",
  },
];

export function ServiceRequest({}: ServiceRequestProps) {
  const [period, setPeriod] = useQueryState("sr-prd", {
    defaultValue: "week",
  });
  return (
    <Stack
      flex={1}
      bg='white'
      className='rounded-lg backdrop-blur-sm w-full'
      p={20}
      gap={16}
    >
      <Flex justify='space-between' wrap='wrap' gap={12}>
        <Stack gap={10}>
          <Title order={3} className='prose-xl/medium text-primary-text-body'>
            Service Request
          </Title>
          <Text fz={14} c='gray'>
            List of services you requested for this week
          </Text>
        </Stack>
        <FilterRequestsDropdown
          data={["Week", "6months", "Year"]}
          size='sm'
          value={period}
          onFilter={setPeriod}
        />
      </Flex>

      <Stack mah={400} className='overflow-auto' gap={0}>
        {requests.map((r, index) => {
          const color: Record<PropertyKey, string> = {
            approved: "#11A506",
            pending: "#969921",
            declined: "#CC0404",
          };

          return (
            <Flex
              key={index}
              flex={1}
              gap={18}
              wrap='nowrap'
              align='center'
              justify='space-between'
              className='border-t border-gray-2 h-full '
              py={16}
            >
              <Stack gap={10}>
                <Text fz={14}>You requested for a plumbing service</Text>
                <Text fz={12} c='gray'>
                  12 minutes ago
                </Text>
              </Stack>

              <Button
                bg={color[r.status]}
                className='capitalize'
                miw={130}
                size='sm'
              >
                {r.status}
              </Button>
            </Flex>
          );
        })}
      </Stack>
    </Stack>
  );
}
