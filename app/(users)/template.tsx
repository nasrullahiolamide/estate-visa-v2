"use client";

import {
  FlowStateProvider,
  useFlowNavigation,
} from "@/components/layout/flow-context";
import { SuspenseOverlay } from "@/components/shared";
import { navigate } from "@/packages/actions";
import { GENERAL_ROUTES } from "@/packages/constants/routes";
import { PAGES } from "@/packages/libraries";
import { getFeatureFlag } from "@/packages/libraries/auth";
import { usePathname } from "next/navigation";
import { PropsWithChildren, Suspense, useEffect } from "react";

import Swal from "sweetalert2";

type TemplateProps = PropsWithChildren<{}>;

export default function Template({ children }: TemplateProps) {
  const pathname = usePathname();
  const flags = getFeatureFlag();
  const isHomeRoute = GENERAL_ROUTES.includes(pathname);

  const { isNavOpened, toggleNav } = useFlowNavigation();

  useEffect(() => {
    const isRestricted = flags.some((url) => pathname.includes(url));

    if (isNavOpened) toggleNav();
    if (isRestricted) {
      Swal.fire({
        icon: "error",
        title: "Permission Denied",
        text: "You do not have access to this feature.",
        confirmButtonColor: "var(--blue-8)",
        confirmButtonText: "Go to Dashboard",
        allowOutsideClick: false,
        allowEnterKey: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(PAGES.DASHBOARD);
        }
      });
    }
  }, [pathname]);

  return (
    <Suspense fallback={<SuspenseOverlay />}>
      <FlowStateProvider>{isHomeRoute ? null : children}</FlowStateProvider>
    </Suspense>
  );
}
