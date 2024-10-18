import { ReactNode } from "react";

import { Branch } from "./branch";
import { toast, ToastOptions } from "react-toastify";

interface HandleSuccessProps extends Omit<ToastOptions, "message"> {
  message?: ReactNode;
}

export function handleSuccess({
  message = null,
  ...props
}: HandleSuccessProps = {}) {
  toast.success(message, {
    autoClose: 5 * 1000,
    ...props,
  });
}
