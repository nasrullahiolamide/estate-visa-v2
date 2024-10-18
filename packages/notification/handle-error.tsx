import { NotificationData, notifications } from "@mantine/notifications";
import { AxiosError } from "axios";
import { ReactNode } from "react";

import { Branch } from "./branch";
import { toast, ToastOptions } from "react-toastify";

interface HandleErrorProps extends Omit<ToastOptions, "message"> {
  message?: ReactNode;
}

export function handleError({
  message = null,
  ...props
}: HandleErrorProps = {}) {
  return (error?: AxiosError) => {
    const data = error?.response?.data;

    toast.error(message, {
      ...props,
    });
  };
}
