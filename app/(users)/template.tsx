"use client";

import {
  FlowStateProvider,
  useFlowNavigation,
} from "@/components/layout/flow-context";
import { SuspenseOverlay } from "@/components/shared";
import { GENERAL_ROUTES } from "@/packages/constants/routes";
import { APP, encode, PAGES } from "@/packages/libraries";
import { getFeatureFlag } from "@/packages/libraries/auth";
import { VALIDITY } from "@/packages/libraries/enum";
import { getCookie } from "cookies-next";
import { toString } from "lodash";
import { usePathname } from "next/navigation";
import { PropsWithChildren, Suspense, useEffect } from "react";

import Swal, { SweetAlertOptions } from "sweetalert2";

type TemplateProps = PropsWithChildren<{}>;

const swalConfig: SweetAlertOptions = {
  icon: "error",
  confirmButtonColor: "var(--blue-8)",
  confirmButtonText: `<a href="${PAGES.DASHBOARD}" style="text-decoration: none; color: inherit;">Go to Dashboard</a>`,
  allowOutsideClick: false,
  allowEnterKey: false,
  allowEscapeKey: false,
  showLoaderOnConfirm: true,
};

export default function Template({ children }: TemplateProps) {
  const pathname = usePathname();
  const flags = getFeatureFlag();
  const isHomeRoute = GENERAL_ROUTES.includes(pathname);
  const isValidUser =
    encode(toString(getCookie(APP.EVISA_ACCOUNT))) === VALIDITY.VALID;

  const { isNavOpened, toggleNav } = useFlowNavigation();

  useEffect(() => {
    const isRestricted = flags.some((url) => pathname.includes(url));

    if (isNavOpened) toggleNav();
    if (isRestricted) {
      Swal.fire({
        title: "Permission Denied",
        text: "You do not have access to this feature.",
        ...swalConfig,
        preConfirm: () => {
          if (pathname === PAGES.DASHBOARD) Swal.close();
          else return false;
        },
      });
    } else if (pathname !== PAGES.DASHBOARD && !isValidUser) {
      Swal.fire({
        title: "Suscription Expired",
        text: "Please renew your subscription to continue using the app.",
        ...swalConfig,
        preConfirm: () => {
          if (pathname === PAGES.DASHBOARD) Swal.close();
          else return false;
        },
      });
    }
  }, [pathname]);

  return (
    <Suspense fallback={<SuspenseOverlay />}>
      <FlowStateProvider>{isHomeRoute ? null : children}</FlowStateProvider>
    </Suspense>
  );
}
