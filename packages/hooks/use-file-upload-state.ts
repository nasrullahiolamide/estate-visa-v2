import { useMutationState } from "@tanstack/react-query";

import { builder } from "@/builders";
import { UploadData } from "@/builders/types/upload";

export type Upload = {
  data: UploadData;
};

export function useFileUploadState(key?: string[]) {
  const [state] = useMutationState<Upload>({
    filters: {
      status: "success",
      mutationKey: builder.upload.$get(key),
      exact: true,
    },

    select: ({ state }) => state?.data as Upload,
  });

  return state?.data;
}
