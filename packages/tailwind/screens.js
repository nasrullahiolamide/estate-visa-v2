import { em } from "@mantine/core";
import defaultTheme from "tailwindcss/defaultTheme";

export const borderWidth = {
  screens: {
    xs: "475px",
    ...defaultTheme.screens,
  },
};

export const container = {
  center: true,
  padding: {
    DEFAULT: em(0.5),
    sm: em(1),
    md: em(2),
    lg: em(4),
    xl: em(5),
  },
};
