"use client";

import React, { ReactNode } from "react";

import { ReactQueryProvider } from "./tanstack/react-query";
import { CustomMantineProvider } from "./mantine";
import { FavIcon } from "./favicon";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ReactQueryProvider>
      <FavIcon />
      <CustomMantineProvider>{children}</CustomMantineProvider>
    </ReactQueryProvider>
  );
}
