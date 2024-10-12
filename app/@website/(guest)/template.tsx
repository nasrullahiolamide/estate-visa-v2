import { getUserType } from "@/packages/actions";
import { isGuest } from "@/packages/libraries";

import { PropsWithChildren } from "react";

type LayoutProps = PropsWithChildren<{}>;

export default async function Layout({ children }: LayoutProps) {
  const userType = await getUserType();
  return isGuest(userType) ? children : null;
}
