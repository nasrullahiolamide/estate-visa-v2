"use client";

import React, { ReactNode } from "react";

import { ReactQueryProvider } from "./tanstack/react-query";
import { CustomMantineProvider } from "./mantine";
import { FavIcon } from "./favicon";
import { Bounce, ToastContainer } from "react-toastify";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ReactQueryProvider>
      <FavIcon />
      <CustomMantineProvider>{children}</CustomMantineProvider>
      <ToastContainer
        stacked
        position='top-center'
        theme='colored'
        transition={Bounce}
      />
    </ReactQueryProvider>
  );
}
