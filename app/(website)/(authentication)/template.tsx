import { Auth } from "@/components/shared/auth";
import { getUserType, navigate } from "@/packages/actions";
import { isGuest, PAGES } from "@/packages/libraries";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default async function Template({ children }: LayoutProps) {
  const userType = await getUserType();

  if (!isGuest(userType)) redirect(PAGES.DASHBOARD);

  return <Auth>{children}</Auth>;
}
