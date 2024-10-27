"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { builder } from "@/builders";
import { useLayoutEffect } from "react";
import { navigate } from "@/packages/actions";
import { PAGES } from "@/packages/libraries";

export default function Page() {
  useSuspenseQuery({
    queryKey: builder.auth.logout.get(),
    queryFn: builder.use().auth.logout,
  });

  useLayoutEffect(() => {
    navigate(PAGES.DASHBOARD);
  }, []);

  return null;
}
