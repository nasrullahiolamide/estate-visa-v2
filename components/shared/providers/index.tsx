"use client";

import React, { ReactNode } from "react";

import { ReactQueryProvider } from "./tanstack/react-query";
import { CustomMantineProvider } from "./mantine";
import { FavIcon } from "./favicon";
import { Bounce, ToastContainer } from "react-toastify";
import NextTopLoader from "nextjs-toploader";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ReactQueryProvider>
      <FavIcon />
      <NextTopLoader showSpinner={false} color='var(--blue-7)' />
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
