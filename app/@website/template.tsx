"use client";

import { PropsWithChildren, Suspense } from "react";

import { SuspenseOverlay } from "@/components/shared/suspense-overlay";

type TemplateProps = PropsWithChildren<{}>;

export default function Template({ children }: TemplateProps) {
  return <Suspense fallback={<SuspenseOverlay />}>{children}</Suspense>;
}
