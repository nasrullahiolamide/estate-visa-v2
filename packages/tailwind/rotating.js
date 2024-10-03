import plugin from "tailwindcss/plugin";

export const rotating = plugin(function ({ theme, addComponents }) {
  addComponents({
    "@keyframes rotating": theme("keyframes.rotating"),
    ".rotating": {
      animation: theme("animation.rotating"),
    },
  });
});
