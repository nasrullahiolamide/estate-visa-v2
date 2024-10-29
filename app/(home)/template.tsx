"use client";

import { PropsWithChildren, Suspense } from "react";
import { usePathname } from "next/navigation";

import { SuspenseOverlay } from "@/components/shared/suspense-overlay";
import { FlowStateProvider } from "@/components/layout/flow-context";
import { GENERAL_ROUTES } from "@/packages/constants/routes";

type TemplateProps = PropsWithChildren<{}>;

export default function Template({ children }: TemplateProps) {
  const pathname = usePathname();

  const isHomeRoute = GENERAL_ROUTES.includes(pathname);

  return isHomeRoute ? children : null;
}
