import { ProductData } from "@/builders/types/products";
import { requiredString } from "@/builders/types/shared";
import { StarRating } from "@/components/shared/interface";
import { generateProductButtons } from "@/components/shared/market-place/product-buttons";
import { ProductDetail } from "@/components/shared/market-place/product-detail";
import { Stack, Textarea, Title } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { object } from "yup";

const schema = object({
  review: requiredString,
});

export function OccupantProductDetail({ ...item }: ProductData) {
  const form = useForm({
    initialValues: {
      review: "",
      rating: 0,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
  });
  return (
    <ProductDetail {...item}>
      <Stack component={Form}>
        <Title order={2} c="plum.5" fz={14} fw={500}>
          Rate and Review
        </Title>
        <StarRating className="!justify-start" />
        <Textarea
          mih={60}
          placeholder="Leave a review"
          {...form.getInputProps("review")}
        />

        {generateProductButtons([
          { label: "Report issue", color: "gray" },
          { label: "Submit Review", color: "blue" },
        ])}
      </Stack>
    </ProductDetail>
  );
}
