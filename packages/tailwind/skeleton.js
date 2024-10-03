import plugin from "tailwindcss/plugin";

export const skeleton = plugin(function ({ theme, addComponents }) {
  addComponents({
    "@keyframes skeleton": theme("keyframes.skeleton"),
    ".skeleton": {
      position: "relative",
      color: "transparent !important",
      backgroundColor: "var(--gray-3) !important",
      backgroundImage:
        "linear-gradient(to right, transparent, var(--gray-2) 40%, transparent 60%) !important",
      backgroundSize: "200% 100% !important",
      backgroundRepeat: "no-repeat !important",
      animation: theme("animation.skeleton"),
      borderRadius: theme("borderRadius.DEFAULT"),

      "> *": {
        visibility: "hidden",
      },
    },
  });
});
