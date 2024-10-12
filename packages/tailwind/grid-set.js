import plugin from "tailwindcss/plugin";

export const gridset = plugin(function ({ addUtilities }) {
  addUtilities({
    ".grid-set": {
      display: "grid",
      "& *": {
        gridArea: "1 / 1",
      },
    },
  });
});
