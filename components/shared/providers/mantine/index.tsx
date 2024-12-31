"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

import {
  MantineProvider,
  ColorSchemeScript,
  DirectionProvider,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

import { DrawersProvider } from "@/components/shared/interface";
import { CancelCircleIcon } from "@/icons";
import { theme } from "../theme";

interface MantineProviderProps {
  children: ReactNode;
}

export function CustomMantineProvider({ children }: MantineProviderProps) {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <ColorSchemeScript defaultColorScheme="light" />
      {/*
        MantineProvider is a context provider that manages theme state
        and provides theme API to all components inside its subtree
      */}
      <MantineProvider theme={theme} defaultColorScheme="light">
        {/*
            DirectionProvider is a context provider that manages direction state
            and provides direction API to all components inside its subtree
          */}
        <DirectionProvider>
          {/*
              Notifications is a context provider that manages notifications state
              and provides notifications API to all components inside its subtree
            */}
          <Notifications
            position="top-center"
            styles={{
              notification: {
                alignItems: "flex-start",
              },
            }}
          />

          {/*
              ModalsProvider is a context provider that manages modals state
              and provides modals API to all components inside its subtree
            */}
          <ModalsProvider
            modalProps={{
              centered: true,
              classNames: {
                title:
                  "prose-lg/medium sm:prose-xl/medium text-primary-text-body",
                overlay: "bg-black bg-opacity-45 blur-4",
                content: "px-2 sm:px-5 pb-2 sm:pb-5 flex flex-col",
                body: "p-2 sm:p-5 !pt-0",
                header: "py-6",
              },
              closeButtonProps: {
                icon: <CancelCircleIcon />,
              },
              size: "lg",
            }}
          >
            <DrawersProvider>{children}</DrawersProvider>
          </ModalsProvider>
        </DirectionProvider>
      </MantineProvider>
    </ThemeProvider>
  );
}
