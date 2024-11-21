import { AxiosError } from "axios";
import { ReactNode } from "react";
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
  return (error?: AxiosError<{ message?: string }>) => {
    const data = error?.response?.data?.message;
    const displayMessage = Array.isArray(message) ? message.join(" ") : message;
    console.log(data);

    toast.error(data || displayMessage, {
      ...props,
    });
    vibrateDevice();
  };
}
