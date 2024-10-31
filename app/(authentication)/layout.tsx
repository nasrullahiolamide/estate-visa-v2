import { Auth } from "@/components/shared/auth";
import { getAuthorizedUser } from "@/packages/actions";
import { PAGES } from "@/packages/libraries";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

type LayoutProps = PropsWithChildren<{}>;

export default async function Template({ children }: LayoutProps) {
  const { isAuthorized } = await getAuthorizedUser();

  if (isAuthorized) redirect(PAGES.DASHBOARD);

  return <Auth>{children}</Auth>;
}
