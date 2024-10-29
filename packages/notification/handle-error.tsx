import { AxiosError } from "axios";
import { ReactNode } from "react";

import { Branch } from "./branch";
import { toast, ToastOptions } from "react-toastify";
import vibrateDevice from "../libraries/vibrate-device";

interface HandleErrorProps extends Omit<ToastOptions, "message"> {
  message?: ReactNode;
}

export function handleError(
  { message, ...props }: HandleErrorProps = {
    message:
      "An error occurred while processing your request. Please try again later.",
  }
) {
  return (error?: AxiosError<{ message?: any }>) => {
    const data = error?.response?.data?.message;

    toast.error(data || message, {
      ...props,
    });
    vibrateDevice();
  };
}
