"use client";

import { PropsWithChildren, Suspense } from "react";

import { SuspenseOverlay } from "@/components/shared/suspense-overlay";
import { FlowStateProvider } from "@/components/layout/flow-context";

type TemplateProps = PropsWithChildren<{}>;

export default function Template({ children }: TemplateProps) {
  return (
    <Suspense fallback={<SuspenseOverlay />}>
      <FlowStateProvider>{children}</FlowStateProvider>
    </Suspense>
  );
}
