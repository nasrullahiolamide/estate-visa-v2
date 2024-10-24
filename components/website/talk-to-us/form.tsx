"use client";

import { Button, MultiSelect, PasswordInput, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { cast, MODALS } from "@/packages/libraries";
import { FlowContainer } from "@/components/layout/flow-container";
import { requiredString } from "@/builders/types/shared";
import { array, object } from "yup";
import { modals } from "@mantine/modals";
import { ConfirmationModal } from "@/components/shared/interface";

export const schema = object({
  full_name: requiredString,
  email_address: requiredString.email(
    "Invalid email. Please enter a valid email address."
  ),
  password: requiredString,
  phone_number: requiredString,
  estate_name: requiredString,
  estate_location: requiredString,
  no_of_houses: requiredString,
  no_of_occupants: requiredString,
  interests: array().required("Please select at least one interest"),
});

export function TalkToUsForm() {
  const form = useForm({
    initialValues: {
      full_name: "",
      email_address: "",
      password: "",
      phone_number: "",
      estate_name: "",
      estate_location: "",
      no_of_houses: "",
      no_of_occupants: "",
      interests: [],
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    transformValues: (values) => {
      const {
        full_name,
        email_address,
        password,
        phone_number,
        estate_name,
        estate_location,
        no_of_houses,
        no_of_occupants,
        interests,
      } = values;
      return {
        full_name: cast.string(full_name),
        email_address: cast.string(email_address),
        password: cast.string(password),
        phone_number: cast.string(phone_number),
        estate_name: cast.string(estate_name),
        estate_location: cast.string(estate_location),
        no_of_houses: cast.string(no_of_houses),
        no_of_occupants: cast.string(no_of_occupants),
        interests: cast.array(interests),
      };
    },
  });

  const handleSubmit = () => {
    modals.open({
      children: (
        <ConfirmationModal
          src='success'
          title='Thank you!'
          description="Thank you for submitting your information! we'll be in touch soon."
          btnText='Okay'
          srcProps={{ ml: 0 }}
        />
      ),
      withCloseButton: false,
      modalId: MODALS.CONFIRMATION,
    });
  };

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <FlowContainer
        className='rounded-2xl '
        justify='center'
        gap={18}
        type='plain'
        bg='white'
      >
        <TextInput
          label='Full Name'
          placeholder='Enter your full name'
          withAsterisk
          {...form.getInputProps("full_name")}
        />
        <TextInput
          type='email'
          label='Email Address'
          placeholder='user@example.com'
          withAsterisk
          {...form.getInputProps("email_address")}
        />
        <PasswordInput
          label='Password'
          placeholder='**********'
          withAsterisk
          {...form.getInputProps("password")}
        />
        <TextInput
          label='Phone Number'
          placeholder='Enter your phone number'
          withAsterisk
          {...form.getInputProps("phone_number")}
        />
        <TextInput
          label='Estate name'
          placeholder='Enter the name of your estate'
          withAsterisk
          {...form.getInputProps("estate_name")}
        />
        <TextInput
          label='Estate Location'
          placeholder='Enter the location of your estate'
          withAsterisk
          {...form.getInputProps("estate_location")}
        />
        <TextInput
          type='number'
          label='Number of houses'
          placeholder='Enter the number of houses in your estate'
          min={0}
          withAsterisk
          {...form.getInputProps("no_of_houses")}
        />
        <TextInput
          type='number'
          label='Number of Occupants'
          placeholder='Enter the number of occupants in your estate'
          min={0}
          withAsterisk
          {...form.getInputProps("no_of_occupants")}
        />
        <MultiSelect
          data={[
            "Access Request",
            "Service Request",
            "Market Place",
            "Residence Management",
          ]}
          label='Interests'
          withAsterisk
          placeholder='What are you interested in?'
          classNames={{
            pill: "text-sm bg-purple-3",
            pillsList: "text-sm",
            option: "hover:bg-purple-4 text-sm",
          }}
          {...form.getInputProps("interests")}
        />

        <Button type='submit' mt={20}>
          Submit
        </Button>
      </FlowContainer>
    </Form>
  );
}

// class="m_44da308b [&:nth-child(4n-7)]:bg-venatian-red [&:nth-child(4n-6)]:bg-aero-blue [&:nth-child(4n-5)]:bg-cornsilk [&:nth-child(4n-4)]:bg-lavendar mantine-MultiSelect-pill m_7cda1cd6 mantine-Pill-root"
