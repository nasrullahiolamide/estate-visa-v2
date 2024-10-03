import plugin from "tailwindcss/plugin";

export const scrollbar = plugin(function ({ addUtilities }) {
  addUtilities({
    ".scrollbar": {
      "&-none": {
        /* Hide scrollbar for IE, Edge and Firefox */
        scrollbarWidth: "none",
        msOverflowStyle: "none",

        /* Hide scrollbar for Chrome, Safari and Opera */
        "&::-webkit-scrollbar": {
          display: "none",
        },
      },
    },
  });
});
