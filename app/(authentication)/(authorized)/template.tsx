import { APP, PAGES, TOKEN } from "@/packages/libraries";
import { hasCookie, getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { PropsWithChildren } from "react";

export type TemplateProps = PropsWithChildren<{}>;

export default function Template({ children }: TemplateProps) {
  if (!hasCookie(TOKEN.HEADER, { cookies })) {
    redirect(PAGES.LOGIN);
  }

  if (Boolean(getCookie(APP.ONBOARDED, { cookies }))) {
    redirect(PAGES.DASHBOARD);
  }

  return children;
}
