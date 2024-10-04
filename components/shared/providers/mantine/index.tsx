import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
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
        <ModalsProvider>{children}</ModalsProvider>
      </MantineProvider>
    </ThemeProvider>
  );
}
