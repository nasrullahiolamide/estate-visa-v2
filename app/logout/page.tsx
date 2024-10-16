"use client";

import { handleLogout, PAGES } from "@/packages/libraries";
import { useSuspenseQuery } from "@tanstack/react-query";

import { navigate } from "@/packages/actions";
// import { builder } from "@/builders";
import { useLayoutEffect } from "react";

export default function Page() {
  // useSuspenseQuery({
  //   queryKey: builder.auth.logout.get(),
  //   queryFn: builder.use().auth.logout,
  // });

  useLayoutEffect(() => {
    navigate(PAGES.DASHBOARD);
  }, []);

  return null;
}
