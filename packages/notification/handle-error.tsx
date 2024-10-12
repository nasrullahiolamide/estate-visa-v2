import { NotificationData, notifications } from "@mantine/notifications";
import { AxiosError } from "axios";
import { ReactNode } from "react";

import { Branch } from "./branch";

interface HandleErrorProps extends Omit<NotificationData, "message"> {
  title?: ReactNode;
  message?: ReactNode;
}

export function handleError({
  title = "Operation failed",
  message = null,
  ...props
}: HandleErrorProps = {}) {
  return (error?: AxiosError) => {
    const data = error?.response?.data;

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
