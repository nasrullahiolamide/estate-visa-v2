import { NotificationData, notifications } from "@mantine/notifications";
import { ReactNode } from "react";

import { Branch } from "./branch";

interface HandleSuccessProps extends Omit<NotificationData, "message"> {
  title?: ReactNode;
  message?: ReactNode;
}

export function handleSuccess({
  title = "Operation successful",
  message = null,
  children = null,
  ...props
}: HandleSuccessProps = {}) {
  notifications.show({
    autoClose: 5 * 1000,
    ...props,
    title,
    color: "green.9",
    message: children ?? <Branch data={message} />,
    styles: {
      description: {
        color: "var(--black)",
      },
    },
  });
}
