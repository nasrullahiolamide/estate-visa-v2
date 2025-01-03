import { NotificationData, notifications } from "@mantine/notifications";
import { AxiosError } from "axios";
import { ReactNode } from "react";
import { toast, ToastOptions } from "react-toastify";

import { Branch } from "./branch";

import vibrateDevice from "../libraries/vibrate-device";

interface HandleErrorProps extends Omit<ToastOptions, "message"> {
  message?: ReactNode;
}

export function handleError(
  message?: string,
  { ...props }: HandleErrorProps = {
    message:
      "An error occurred while processing your request. Please try again later.",
  }
) {
  return (error?: AxiosError<{ message?: string }>) => {
    const data = error?.response?.data?.message || message;
    const displayMessage = Array.isArray(data) ? data.join(" ") : data;

    toast.error(data || displayMessage, {
      ...props,
    });
    vibrateDevice();
  };
}

interface handleMantineErrorProps extends Omit<NotificationData, "message"> {
  title?: ReactNode;
  message?: ReactNode;
}

export function handleMantineError({
  title = "Operation failed",
  message = null,
  ...props
}: handleMantineErrorProps = {}) {
  return (error?: AxiosError) => {
    const data = error?.response?.data;

    console.log(data);

    notifications.show({
      color: "red.9",
      autoClose: 10 * 1000,
      styles: {
        description: {
          color: "var(--black)",
        },
      },
      ...props,
      message: message ?? <Branch data={data} />,
      title,
    });
  };
}
