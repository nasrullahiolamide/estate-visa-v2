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
import { theme } from "../theme";

interface MantineProviderProps {
  children: ReactNode;
}

export function CustomMantineProvider({ children }: MantineProviderProps) {
  return (
    <ThemeProvider defaultTheme='light' attribute='class'>
      <ColorSchemeScript defaultColorScheme='light' />
      {/*
        MantineProvider is a context provider that manages theme state
        and provides theme API to all components inside its subtree
      */}
      <MantineProvider theme={theme} defaultColorScheme='light'>
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
            position='top-center'
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
              withCloseButton: false,
              classNames: {
                title: "prose-lg/semi-bold text-primary-text-body",
                overlay: "bg-black bg-opacity-50",
              },
            }}
          >
            <DrawersProvider variant='app'>{children}</DrawersProvider>
          </ModalsProvider>
        </DirectionProvider>
      </MantineProvider>
    </ThemeProvider>
  );
}
