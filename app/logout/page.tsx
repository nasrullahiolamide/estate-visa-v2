"use client";

import { navigate } from "@/packages/actions";
import { clearCookies } from "@/packages/actions/clear-cookies";
import { PAGES } from "@/packages/libraries";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { refresh } = useRouter();

  useEffect(() => {
    clearCookies();
    localStorage.clear();
    navigate(PAGES.WEBSITE);
    refresh();
  }, []);

  return null;
}
