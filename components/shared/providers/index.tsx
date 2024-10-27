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
      <CustomMantineProvider>{children}</CustomMantineProvider>
      <ToastContainer
        stacked
        draggable
        position='top-right'
        theme='colored'
        transition={Bounce}
        className='z-[999]'
      />
    </ReactQueryProvider>
  );
}
