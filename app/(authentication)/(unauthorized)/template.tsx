import { getAuthorizedUser } from "@/packages/actions";
import { PAGES } from "@/packages/libraries";

import { redirect } from "next/navigation";

import { PropsWithChildren } from "react";

export type TemplateProps = PropsWithChildren<{}>;

export default async function Template({ children }: TemplateProps) {
  const { isAuthorized } = await getAuthorizedUser();

  if (isAuthorized) redirect(PAGES.DASHBOARD);

  return children;
}
