"use client";

import { usePathname } from "next/navigation";
import { PropsWithChildren, Suspense } from "react";

import { FlowStateProvider } from "@/components/layout/flow-context";
import { SuspenseOverlay } from "@/components/shared/suspense-overlay";
import { GENERAL_ROUTES } from "@/packages/constants/routes";

type TemplateProps = PropsWithChildren<{}>;

export default function Template({ children }: TemplateProps) {
  const pathname = usePathname();
  const isHomeRoute = GENERAL_ROUTES.includes(pathname);

  return (
    <Suspense fallback={<SuspenseOverlay />}>
      <FlowStateProvider>{isHomeRoute ? null : children}</FlowStateProvider>
    </Suspense>
  );
}
