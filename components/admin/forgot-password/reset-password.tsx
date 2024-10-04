// "use client";

// import { makePath, PAGES } from "@idss/libraries";
// import { handleError, handleSuccess } from "@idss/notification";
// import {
//   Box,
//   Button,
//   Divider,
//   Flex,
//   Input,
//   PasswordInput,
//   PinInput,
//   Stack,
//   Text,
// } from "@mantine/core";
// import { Form } from "@mantine/form";
// import { useMutation } from "@tanstack/react-query";

// import { navigate } from "@/packages/actions/navigate";
// // import { builder } from "@/builders";

// import { useFormContext } from "./password-reset-form-context";

// import Link from "next/link";

// interface ResetPasswordProps {
//   unique_link: string;
// }

// export function ResetPassword({ unique_link }: ResetPasswordProps) {
//   const form = useFormContext();

//   const { mutate, isPending } = useMutation({
//     mutationFn: builder.use().auth.password.change,
//     onError: handleError(),
//     onSuccess: ({ data }) => {
//       handleSuccess({
//         message: data.message,
//       });

//       navigate(makePath(PAGES.IDENTITY, unique_link, PAGES.SIGNIN));
//     },
//   });

//   function handleSubmit({ email, password, otp }: typeof form.values) {
//     mutate({ email, password, otp });
//   }

//   return (
//     <Stack gap={32}>
//       <Stack gap={8} className='text-primary-text-body'>
//         <h2 className='prose-2xl/medium'>Reset Password</h2>
//         <p className='prose-base/regular'>
//           Enter your new password to reset your account.
//         </p>
//       </Stack>

//       <Box component={Form} form={form} onSubmit={handleSubmit} w='100%'>
//         <Stack gap={16}>
//           <Input.Wrapper
//             component={Stack}
//             withAsterisk
//             label='One time password (OTP)'
//             classNames={{
//               label: "prose-lg/medium text-primary-text-body",
//               root: "gap-1.5",
//             }}
//           >
//             <PinInput
//               w='100%'
//               style={{
//                 flexWrap: "nowrap",
//                 justifyContent: "space-between",
//               }}
//               inputMode='numeric'
//               aria-label='One time code'
//               type='number'
//               size='lg'
//               {...form.getInputProps("otp")}
//             />

//             <Input.Error>{form.errors.otp}</Input.Error>
//           </Input.Wrapper>

//           <PasswordInput
//             label='New password'
//             placeholder='*************'
//             withAsterisk
//             type='password'
//             {...form.getInputProps("password")}
//           />

//           <PasswordInput
//             label='Confirm password'
//             placeholder='*************'
//             withAsterisk
//             type='password'
//             {...form.getInputProps("confirm_password")}
//           />

//           <Button
//             type='submit'
//             loading={isPending}
//             disabled={isPending}
//             className='text-primary-button-surface'
//           >
//             Save new password
//           </Button>
//         </Stack>
//       </Box>

//       <Divider />

//       <Stack gap={4}>
//         <Text ta='center' className='text-base text-primary-text-body'>
//           Need help? Visit our{" "}
//           <Link href='/' className='font-medium text-primary-button-normal'>
//             Help section{" "}
//           </Link>{" "}
//           or{" "}
//           <Link href='/' className='font-medium text-primary-button-normal'>
//             contact us
//           </Link>
//         </Text>

//         <Flex
//           justify='center'
//           className='text-sm divide-x text-primary-text-caption divide-primary-border-light'
//         >
//           <Link href='/'>
//             <Text px={10}>Terms of use</Text>
//           </Link>
//           <Link href='/'>
//             <Text px={10}>Privacy policy</Text>
//           </Link>
//           <Link href='/'>
//             <Text px={10}>Cookies policy</Text>
//           </Link>
//         </Flex>
//       </Stack>
//     </Stack>
//   );
// }
