"use client";

import { PropsWithChildren, Suspense } from "react";
import { usePathname } from "next/navigation";

import { SuspenseOverlay } from "@/components/shared/suspense-overlay";
import { FlowStateProvider } from "@/components/layout/flow-context";
import { GENERAL_ROUTES } from "@/packages/constants/routes";
// import { TOKEN, APP, PAGES } from "@/packages/libraries";
// import { handleError } from "@/packages/notification";
// import { getCookies } from "cookies-next";

type TemplateProps = PropsWithChildren<{}>;

export default function Template({ children }: TemplateProps) {
  const pathname = usePathname();
  const isHomeRoute = GENERAL_ROUTES.includes(pathname);

  // const allCookies = getCookies();
  // const requiredCookies = [
  //   TOKEN.HEADER,
  //   TOKEN.PAYLOAD,
  //   TOKEN.SIGNATURE,
  //   APP.USER_TYPE,
  // ];

  // const hasAllRequiredCookies = requiredCookies.every(
  //   (cookie) => cookie in allCookies
  // );

  // console.log({ hasAllRequiredCookies, allCookies });

  // if (!hasAllRequiredCookies) {
  //   handleError({
  //     message:
  //       "You are not authorized to view this page. Please login to continue.",
  //   });
  //   redirect(PAGES.LOGIN);
  // }

  return (
    <Suspense fallback={<SuspenseOverlay />}>
      <FlowStateProvider>{isHomeRoute ? null : children}</FlowStateProvider>
    </Suspense>
  );
}
