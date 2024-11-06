import { StarRating } from "@/components/shared/interface";
import {
  Card,
  Image,
  Text,
  Button,
  Group,
  Stack,
  Pill,
  Flex,
} from "@mantine/core";

interface ProductCardProps {}

export function ProductCard({}: ProductCardProps) {
  return (
    <Card shadow='sm' padding='lg' radius='md' withBorder>
      <Card.Section>
        <Image
          src='https://via.placeholder.com/300'
          alt='Original Nike Sneakers'
          height={200}
          fit='cover'
        />
      </Card.Section>

      <Stack gap='xs' mt='md'>
        <Text fw={500} size='lg'>
          Original Nike Sneakers
        </Text>

        <Text fw={700} size='xl'>
          ₦20,000
        </Text>

        <Text size='sm' color='violet' mt={-5}>
          House A10
        </Text>

        <StarRating />
      </Stack>

      <Pill color='yellow' variant='light'>
        Pending
      </Pill>

      <Flex wrap='wrap' justify='space-between' mt='auto'>
        <Button variant='outline' color='gray' size='xs'>
          Reject
        </Button>
        <Button color='blue' size='xs'>
          Approve
        </Button>
      </Flex>
    </Card>
  );
}
