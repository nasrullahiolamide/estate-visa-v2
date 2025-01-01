import { builder } from "@/builders";
import { ProductData, ReviewProduct } from "@/builders/types/products";
import { requiredString } from "@/builders/types/shared";
import { ConfirmationModal, StarRating } from "@/components/shared/interface";
import { ProductButtons } from "@/components/shared/market-place/product-buttons";
import { ProductDetail } from "@/components/shared/market-place/product-detail";
import { MODALS } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { Textarea, Title } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { object } from "yup";

const schema = object({
  comments: requiredString,
});

export function OccupantProductDetail({ ...item }: ProductData) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: builder.$use.products.review,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.products.get.$get(),
      });
      handleSuccess({
        message: "Review Submitted Successfully",
      });
    },
    onError: handleError(),
  });

  const { mutate: report, isPending: isReporting } = useMutation({
    mutationFn: builder.$use.products.change_status,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.products.get.$get(),
      });
      handleSuccess({
        message: "Product Reported Successfully",
      });
      modals.closeAll();
    },
    onError: handleError(),
  });

  const form = useForm<ReviewProduct>({
    initialValues: {
      comments: "",
      rating: 0,
      productId: item.id,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
  });

  function handleSubmit(values: typeof form.values) {
    mutate(values);
  }

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
            disabled: isReporting,
          }}
        />
      ),
    });
  };

  return (
    <ProductDetail {...item}>
      <Form form={form} onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
          {...form.getInputProps("comments")}
        />

        <ProductButtons
          buttons={[
            {
              label: "Report issue",
              color: "gray",
              props: {
                onClick: handleReportIssue,
                disabled:
                  isReporting || item.status === "reported" || isPending,
                loading: isReporting,
              },
            },
            {
              label: "Submit Review",
              color: "blue",
              props: {
                type: "submit",
                disabled: isPending || isReporting,
                loading: isPending,
              },
            },
          ]}
        />
      </Form>
    </ProductDetail>
  );
}
