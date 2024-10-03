"use client";

import { mantineTheme } from "@/packages/theme";
import { mergeThemeOverrides } from "@mantine/core";

export const theme = mergeThemeOverrides(mantineTheme, {
  defaultRadius: "md",
  primaryShade: {
    light: 9,
    dark: 6,
  },
  lineHeights: {
    xs: "1.00",
    sm: "1.15",
    md: "1.25",
    lg: "1.35",
    xl: "1.45",
  },
  shadows: {
    "2xl": "var(--shadow-2xl)",
  },
});
