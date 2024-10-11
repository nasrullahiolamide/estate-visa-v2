"use client";

import { navigate } from "@/packages/actions";
import { PAGES } from "@/packages/libraries";
import { useLayoutEffect } from "react";

export default function Page() {
  useLayoutEffect(() => {
    navigate(PAGES.OVERVIEW);
  }, []);

  return null;
}
