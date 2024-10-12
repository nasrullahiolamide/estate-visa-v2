import prose from "@tailwindcss/typography";
import fluid, { extract, fontSize, screens } from "fluid-tailwind";

import {
  borderWidth,
  boxShadow,
  colors,
  container,
  files,
  fontFamily,
  skeleton,
  animation,
  keyframes,
  scrollbar,
  typography,
  gridset,
} from "./packages/tailwind";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files,
    extract,
  },
  theme: {
    screens,
    colors,
    fontSize,
    container,
    typography,
    boxShadow,
    borderWidth,
    // textShadow,
    extend: {
      fontFamily,
      keyframes,
      animation,
    },
  },
  plugins: [fluid, scrollbar, prose, gridset, skeleton],
};
