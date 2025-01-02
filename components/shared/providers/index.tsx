"use client";

import { ReactNode, useEffect } from "react";
import { Bounce, ToastContainer } from "react-toastify";

import AOS from "aos";
import NextTopLoader from "nextjs-toploader";

import { FavIcon } from "./favicon";
import { CustomMantineProvider } from "./mantine";
import { ReactQueryProvider } from "./tanstack/react-query";
import { NavigationProvider } from "@/components/layout/flow-context";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <ReactQueryProvider>
      <FavIcon />
      <NextTopLoader
        showSpinner={false}
        color='var(--blue-7)'
        height={4}
        crawlSpeed={500}
      />
      <NavigationProvider>
        <CustomMantineProvider>{children}</CustomMantineProvider>
      </NavigationProvider>
      <ToastContainer
        stacked
        draggable
        position='top-right'
        theme='colored'
        transition={Bounce}
        className='z-[999] min-w-96'
      />
    </ReactQueryProvider>
  );
}
