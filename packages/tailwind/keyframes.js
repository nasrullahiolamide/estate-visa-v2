export const keyframes = {
  skeleton: {
    "0%": { backgroundPosition: "200%" },
    "100%": { backgroundPosition: "-150%" },
  },
  rotating: {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
};

export const animation = {
  skeleton:
    "1.25s cubic-bezier(0,0,1,1) normal 0s infinite none running skeleton",
  rotating: "10s linear infinite running rotating",
};
