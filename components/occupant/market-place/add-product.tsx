"use client";

import { builder } from "@/builders";
import { UpdateProductData } from "@/builders/types/products";
import { requiredString } from "@/builders/types/shared";
import { FlowPhoneInput } from "@/components/layout";
import { FlowContainer } from "@/components/layout/flow-container";
import { ResourceUpload } from "@/components/shared/uploads/resource";
import { PRODUCT_CATEGORIES } from "@/packages/constants/data";
import { useFileUpload } from "@/packages/hooks/use-file-upload";
import { APP, cast, MODALS } from "@/packages/libraries";
import { formatCurrency } from "@/packages/libraries/formatters/currency";
import { handleError, handleSuccess } from "@/packages/notification";
import { Button, Select, Textarea, TextInput } from "@mantine/core";
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

export function AddProduct() {
  const estateId = toString(getCookie(APP.ESTATE_ID));
  const queryClient = useQueryClient();

  const [formattedPrice, setFormattedPrice] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: builder.$use.products.post,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: builder.products.get.$get(),
      });
      handleSuccess({
        message: "Product Added Successfully",
      });
      modals.close(MODALS.ADD_DETAILS);
    },
    onError: handleError(),
  });

  const form = useForm<UpdateProductData>({
    initialValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
      phone: "",
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
        className="bg-primary-background-white h-[600px] sm:h-full overflow-auto"
        gap={18}
        type="plain"
      >
        <TextInput
          label="Product Name"
          placeholder="Enter product name"
          withAsterisk
          {...form.getInputProps("name")}
        />

        <TextInput
          label="Product  Price"
          type="text"
          placeholder="Enter product price"
          withAsterisk
          {...form.getInputProps("price")}
          value={formattedPrice}
          onChange={handlePriceChange}
        />

        <Select
          searchable
          withAsterisk
          label="Category"
          placeholder="Select Category"
          nothingFoundMessage="No category found"
          data={PRODUCT_CATEGORIES}
          {...form.getInputProps("category")}
        />

        <ResourceUpload
          multiple={false}
          withAsterisk
          label="Upload Product Image"
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
          label="Product Description"
          placeholder="Type Something..."
          withAsterisk
          {...form.getInputProps("description")}
        />
        <FlowPhoneInput
          label="Phone Number"
          placeholder="Enter phone number"
          withAsterisk
          {...form.getInputProps("phone")}
        />
      </FlowContainer>
      <Button
        mt={25}
        type="submit"
        loading={isPending}
        disabled={isPending}
        w="100%"
      >
        Add Product
      </Button>
    </Form>
  );
}
