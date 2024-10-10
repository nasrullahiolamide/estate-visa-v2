import { AppShellHeader } from "@/components/admin/shared/app-shell-header";
import { navigate } from "@/packages/actions";
import { PAGES } from "@/packages/libraries";
import { Fragment } from "react";

export default function Page() {
  navigate(PAGES.OVERVIEW);
  return null;
}
