import { createTheme, DefaultMantineColor } from "@mantine/core";

import { breakpoints } from "./breakpoints";
import { colors } from "./colors";
import { components } from "./components";
import { headings } from "./headings";
import { shadows } from "./shadows";

export const mantineTheme = createTheme({
  components,
  primaryColor: "accent",
  colors,
  white: "var(--white)",
  black: "var(--black)",
  respectReducedMotion: true,
  breakpoints,
  headings,
  shadows,
});

type ExtendedCustomColors =
  | "accent"
  | "amber"
  | "sky"
  | "purple"
  | "plum"
  | "bronze"
  | "gold"
  | "grass"
  | "crimson"
  | "tomato"
  | "mint"
  | "overlay";

export type MantineColors = DefaultMantineColor | ExtendedCustomColors;
