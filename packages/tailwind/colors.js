const counts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

/**
 * @typedef {{
 *  1: string;
 *  2: string;
 *  3: string;
 *  4: string;
 *  5: string;
 *  6: string;
 *  7: string;
 *  8: string;
 *  9: string;
 *  10: string;
 *  11: string;
 *  12: string;
 * }} ColorCount
 *
 * @description
 * This function generates the color count object for the given color.
 *
 * @param {string} color The color name
 * @returns {ColorCount} The color count object
 *
 * @example
 *
 * // "rgb(from var(--orange-1) r g b / <alpha-value>)"
 * makeColorCount("orange");
 */
const makeColorCount = (color) => {
  return counts.reduce((acc, count) => {
    acc[count] = `rgb(from var(--${color}-${count}) r g b / <alpha-value>)`;
    return acc;
  }, {});
};

/**
 * @type {Record<string, ColorCount>}
 */
const color = [
  "gray",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "plum",
  "pink",
  "bronze",
  "gold",
  "grass",
  "crimson",
  "tomato",
  "mint",
  "brown",
  "accent",
].reduce((colors, color) => {
  colors[color] = makeColorCount(color);
  return colors;
}, {});

const overlay = {
  1: "var(--overlay-1)",
  2: "var(--overlay-2)",
  3: "var(--overlay-3)",
  4: "var(--overlay-4)",
  5: "var(--overlay-5)",
  6: "var(--overlay-6)",
  7: "var(--overlay-7)",
  8: "var(--overlay-8)",
  9: "var(--overlay-9)",
  10: "var(--overlay-10)",
  11: "var(--overlay-11)",
  12: "var(--overlay-12)",
};

const white = "rgb(from var(--white) r g b / <alpha-value>)";
const black = "rgb(from var(--black) r g b / <alpha-value>)";

const primary = {
  button: {
    normal: "var(--primary-button-normal)",
    hover: "var(--primary-button-hover)",
    surface: "var(--primary-button-surface)",
  },

  border: {
    light: "var(--primary-border-light)",
    normal: "var(--primary-border-normal)",
    dark: "var(--primary-border-dark)",
  },

  background: {
    white: "var(--primary-background-white)",
    subtle: "var(--primary-background-subtle)",
    dark: "var(--primary-background-dark)",
  },

  text: {
    body: "var(--primary-text-body)",
    subtle: "var(--primary-text-subtle)",
    caption: "var(--primary-text-caption)",
    normal: "var(--primary-text-normal)",
    hover: "var(--primary-text-hover)",
    active: "var(--primary-text-active)",
  },
};

const success = {
  background: {
    normal: "var(--success-background-normal)",
    hover: "var(--success-background-hover)",
  },
  text: {
    primary: "var(--success-text-primary)",
    secondary: "var(--success-text-secondary)",
  },
  surface: {
    light: "var(--success-surface-light)",
    normal: "var(--success-surface-normal)",
    dark: "var(--success-surface-dark)",
  },
};

const warning = {
  background: {
    normal: "var(--warning-background-normal)",
    hover: "var(--warning-background-hover)",
  },
  text: {
    primary: "var(--warning-text-primary)",
    secondary: "var(--warning-text-secondary)",
  },
  surface: {
    light: "var(--warning-surface-light)",
    normal: "var(--warning-surface-normal)",
    dark: "var(--warning-surface-dark)",
  },
};

const error = {
  background: {
    normal: "var(--error-background-normal)",
    hover: "var(--error-background-hover)",
  },
  text: {
    primary: "var(--error-text-primary)",
    secondary: "var(--error-text-secondary)",
  },
  surface: {
    light: "var(--error-surface-light)",
    normal: "var(--error-surface-normal)",
    dark: "var(--error-surface-dark)",
  },
};

const info = {
  background: {
    normal: "var(--info-background-normal)",
    hover: "var(--info-background-hover)",
  },
  text: {
    primary: "var(--info-text-primary)",
    secondary: "var(--info-text-secondary)",
  },
  surface: {
    light: "var(--info-surface-light)",
    normal: "var(--info-surface-normal)",
    dark: "var(--info-surface-dark)",
  },
};

const transparent = "transparent";
const currentColor = "currentColor";

/**
 * @description
 * This note mentions the difference in the nomenclature in the Design System and the Tailwind CSS theme.
 *
 * @summary
 * The `on-surface` variable has been changed to `surface` in this theme representation.
 * The `background-surface` and `text-surface` have been replaced with `background` and `text` respectively.
 * The `primary-btn` variable has been changed to `button` in this theme representation.
 * All, including the `border` variables, have been moved to the `primary` object.
 */
export const colors = Object.assign(color, {
  white,
  black,
  transparent,
  currentColor,
  overlay,
  primary,
  success,
  warning,
  error,
  info,
});
