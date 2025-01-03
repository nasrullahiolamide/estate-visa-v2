import { ReactNode } from "react";
import { toast, ToastOptions } from "react-toastify";

interface HandleSuccessProps extends Omit<ToastOptions, "message"> {
  message?: string | ReactNode;
}

export function handleSuccess(
  message: string | ReactNode,
  { ...props }: HandleSuccessProps = {}
) {
  toast.success(message, {
    ...props,
  });
}
