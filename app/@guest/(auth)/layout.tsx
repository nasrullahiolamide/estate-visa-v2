import { Auth } from "@/components/shared/auth";
import { getUserType } from "@/packages/actions";
import { isGuest, PAGES } from "@/packages/libraries";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

type LayoutProps = PropsWithChildren<{}>;

export default async function Template({ children }: LayoutProps) {
  const userType = await getUserType();

  if (!isGuest(userType)) {
    redirect(PAGES.DASHBOARD);
  }

  return <Auth>{children}</Auth>;
}
