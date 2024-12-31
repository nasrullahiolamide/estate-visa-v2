import { builder } from "@/builders";
import { ProductData } from "@/builders/types/products";
import { requiredString } from "@/builders/types/shared";
import { ConfirmationModal, StarRating } from "@/components/shared/interface";
import { ProductButtons } from "@/components/shared/market-place/product-buttons";
import { ProductDetail } from "@/components/shared/market-place/product-detail";
import { MODALS } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { Stack, Textarea, Title } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { object } from "yup";

const schema = object({
  review: requiredString,
});

export function OccupantProductDetail({ ...item }: ProductData) {
  const queryClient = useQueryClient();

  const { mutate: report, isPending: isReporting } = useMutation({
    mutationFn: builder.$use.products.change_status,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.products.get.$get(),
      });
      handleSuccess({
        message: "Product Reported Successfully",
      });
      modals.close(MODALS.CONFIRMATION);
    },
    onError: handleError(),
  });

  const form = useForm({
    initialValues: {
      review: "",
      rating: 0,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
  });

  const handleReportIssue = () => {
    modals.open({
      modalId: MODALS.CONFIRMATION,
      children: (
        <ConfirmationModal
          title='Report Issue?'
          src='warning'
          srcProps={{ ml: 0 }}
          description='The estate Admin will be notified about the report issued.'
          withTwoButtons
          primaryBtnText='Report'
          secondaryBtnText='Cancel'
          primaryBtnProps={{
            loading: isReporting,
            disabled: isReporting,
            onClick: () => {
              report({ id: item.id, status: "reported" });
            },
          }}
          secondaryBtnProps={{
            onClick: () => modals.close(MODALS.CONFIRMATION),
          }}
        />
      ),
    });
  };

  return (
    <ProductDetail {...item}>
      <Stack>
        <Title order={2} c='plum.5' fz={14} fw={500}>
          Rate and Review
        </Title>
        <StarRating
          hover
          className='!justify-start'
          defaultRating={0}
          onSetRating={(rating) => form.setFieldValue("rating", rating)}
          messages={["Poor", "Fair", "Good", "Very Good", "Excellent"]}
        />
        <Textarea
          mih={60}
          placeholder='Leave a review'
          {...form.getInputProps("review")}
        />

        <ProductButtons
          buttons={[
            {
              label: "Report issue",
              color: "gray",
              props: {
                onClick: handleReportIssue,
                disabled: isReporting || item.status === "reported",
                loading: isReporting,
              },
            },
            { label: "Submit Review", color: "blue" },
          ]}
        />
      </Stack>
    </ProductDetail>
  );
}
