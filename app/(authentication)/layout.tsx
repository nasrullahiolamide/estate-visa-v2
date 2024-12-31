import { Auth } from "@/components/shared/auth";
import { PropsWithChildren } from "react";

type LayoutProps = PropsWithChildren<{}>;

export default async function Layout({ children }: LayoutProps) {
  return <Auth>{children}</Auth>;
}
