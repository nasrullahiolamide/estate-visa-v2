"use client";

import { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import { GENERAL_ROUTES } from "@/packages/constants/routes";

type TemplateProps = PropsWithChildren<{}>;

export default function Template({ children }: TemplateProps) {
  const pathname = usePathname();

  const isHomeRoute = GENERAL_ROUTES.includes(pathname);

  return isHomeRoute ? children : null;
}
