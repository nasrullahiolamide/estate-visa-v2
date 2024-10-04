import { Auth } from "@/components/shared/auth";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <Auth>{children}</Auth>;
}
