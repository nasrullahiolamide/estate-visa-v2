import { getAuthorizedUser } from "@/packages/actions";

import { redirect } from "next/navigation";

import { PropsWithChildren } from "react";

export type TemplateProps = PropsWithChildren<{}>;

export default async function Template({ children }: TemplateProps) {
  const { isAuthorized, callbackUrl } = await getAuthorizedUser();

  if (isAuthorized) redirect(callbackUrl);

  return children;
}
