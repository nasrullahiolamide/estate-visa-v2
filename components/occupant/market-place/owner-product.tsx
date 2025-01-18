"use client";

import { builder } from "@/builders";
import { ProductData, UpdateProductData } from "@/builders/types/products";
import { requiredString } from "@/builders/types/shared";
import { FlowGroupButtons, FlowPhoneInput } from "@/components/layout";
import { FlowContainer } from "@/components/layout/flow-container";
import { ConfirmationModal } from "@/components/shared/interface";
import { ResourceUpload } from "@/components/shared/uploads/resource";
import { EditIcon, TrashIcon } from "@/icons";
import { PRODUCT_CATEGORIES } from "@/packages/constants/data";
import { useFileUpload } from "@/packages/hooks/use-file-upload";
import { APP, cast, MODALS } from "@/packages/libraries";
import { formatCurrency } from "@/packages/libraries/formatters/currency";
import { handleError, handleSuccess } from "@/packages/notification";
import { Box, Button, Select, Textarea, TextInput } from "@mantine/core";
import { MIME_TYPES } from "@mantine/dropzone";
import { Form, useForm, yupResolver } from "@mantine/form";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { concat, toString } from "lodash";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { object } from "yup";

const schema = object({
  name: requiredString,
  description: requiredString,
  price: requiredString,
  category: requiredString,
  image: requiredString,
  phone: requiredString,
});

export interface ViewProductProps {
  data?: ProductData;
  modalType: "add" | "edit" | "view";
}

export function ViewProduct({ data, modalType = "view" }: ViewProductProps) {
  const estateId = toString(getCookie(APP.ESTATE_ID));
  const queryClient = useQueryClient();

  const {
    id = "",
    name = "",
    description = "",
    price = "",
    category = "",
    image = "",
    phone = "",
  } = { ...data };

  const [formattedPrice, setFormattedPrice] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: builder.$use.products.post,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.products.get.$get(),
      });
      modals.open({
        modalId: MODALS.CONFIRMATION,
        onClose: () => modals.closeAll(),
        children: (
          <ConfirmationModal
            title='Product Added Successfully'
            description="Your product is under review, our team will verify your listing within the next 48 hours, and you'll be notified once it's approved."
            btnText='Got it'
            src='success'
            btnProps={{
              onClick: () => modals.closeAll(),
            }}
            srcProps={{ ml: 0 }}
          />
        ),
      });
    },
    onError: handleError(),
  });

  const { mutate: updateProduct, isPending: isUpdating } = useMutation({
    mutationFn: builder.$use.products.edit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.products.get.$get(),
      });
      modals.close(MODALS.FORM_DETAILS);
      handleSuccess("Product updated successfully");
    },
    onError: handleError(),
  });

  const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
    mutationFn: builder.$use.products.remove,
    onError: () => {
      handleError()();
      modals.close(MODALS.FORM_DETAILS);
    },
    onSuccess: () => {
      handleSuccess("Product deleted successfully");
      queryClient.invalidateQueries({
        queryKey: builder.products.get.$get(),
      });
      modals.close(MODALS.FORM_DETAILS);
    },
  });

  const form = useForm<UpdateProductData>({
    initialValues: {
      name,
      description,
      price,
      category,
      image,
      phone,
      estateId,
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const { name, description, price, category, image, phone, estateId } =
        values;

      return {
        name: cast.string(name),
        description: cast.string(description),
        price: cast.number(price),
        category: cast.string(category),
        image: cast.string(image),
        phone: cast.string(phone),
        estateId: cast.string(estateId),
      };
    },
  });

  function handlePriceChange(e: ChangeEvent<HTMLInputElement>) {
    const rawValue = e.target.value.replace(/\D/g, "");
    setFormattedPrice(formatCurrency(+rawValue, "NGN"));
    form.setFieldValue("price", rawValue);
  }
  function handleSubmit(values: typeof form.values) {
    mutate(values);
  }

  const { previews, handleUpload, onDelete } = useFileUpload({
    key: "others",
    onError: () => {
      toast.error("Failed to upload resource");
    },
    onSuccess: ({ data }) => {
      form.clearFieldError("image");
      form.setFieldValue("image", data?.secure_url);
    },
  });

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <FlowContainer
        p={0}
        className='bg-primary-background-white h-[600px] sm:h-full overflow-auto'
        gap={18}
        type='plain'
      >
        <TextInput
          label='Product Name'
          placeholder='Enter product name'
          withAsterisk
          {...form.getInputProps("name")}
        />

        <TextInput
          label='Product  Price'
          type='text'
          placeholder='Enter product price'
          withAsterisk
          {...form.getInputProps("price")}
          value={formattedPrice}
          onChange={handlePriceChange}
        />

        <Select
          searchable
          withAsterisk
          label='Category'
          placeholder='Select Category'
          nothingFoundMessage='No category found'
          data={PRODUCT_CATEGORIES}
          {...form.getInputProps("category")}
        />

        <ResourceUpload
          multiple={false}
          withAsterisk
          label='Upload Product Image'
          supports={["img(png, jpeg)"]}
          previews={previews}
          onDrop={handleUpload}
          onDelete={onDelete}
          maxSize={3 * 1024 * 1024}
          accepts={() => {
            return concat(MIME_TYPES.jpeg, MIME_TYPES.png);
          }}
          {...form.getInputProps("image")}
        />
        <Textarea
          label='Product Description'
          placeholder='Type Something...'
          withAsterisk
          {...form.getInputProps("description")}
        />
        <FlowPhoneInput
          label='Phone Number'
          placeholder='Enter phone number'
          withAsterisk
          {...form.getInputProps("phone")}
        />
      </FlowContainer>

      {modalType === "add" ? (
        <Button
          mt={10}
          type='submit'
          fullWidth
          disabled={isPending}
          loading={isPending}
        >
          Add Product
        </Button>
      ) : (
        <Box mt={10}>
          <FlowGroupButtons
            isLoading={isPending || isUpdating || isDeleting}
            buttons={[
              {
                label: "Edit Product",
                icon: EditIcon,
                default: true,
                onClick: () => updateProduct({ id, data: form.values }),
              },
              {
                label: "Delete",
                icon: TrashIcon,
                onClick: () => deleteProduct(id),
              },
            ]}
          />
        </Box>
      )}
    </Form>
  );
}
