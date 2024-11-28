import { ReactNode } from "react";
import { toast, ToastOptions } from "react-toastify";

interface HandleSuccessProps extends Omit<ToastOptions, "message"> {
  message?: string | ReactNode;
}

export function handleSuccess({
  message = null,
  ...props
}: HandleSuccessProps = {}) {
  toast.success(message, {
    autoClose: 1200,
    ...props,
  });
}
