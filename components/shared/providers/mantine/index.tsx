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
    <ThemeProvider defaultTheme='system' attribute='class'>
      <ColorSchemeScript defaultColorScheme='auto' />
      {/*
        MantineProvider is a context provider that manages theme state
        and provides theme API to all components inside its subtree
      */}
      <MantineProvider theme={theme} defaultColorScheme='auto'>
        <ModalsProvider>{children}</ModalsProvider>
      </MantineProvider>
    </ThemeProvider>
  );
}
