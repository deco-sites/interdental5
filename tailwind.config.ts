import daisyui from "daisyui";
import scrollbar from "tailwind-scrollbar";

export default {
  plugins: [daisyui, scrollbar],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],

  theme: {
    container: { center: true },
    screens: {
      "sm": "640px",
      "md": "768px",
      "lg": "1024px",
      "xl": "1248px",
      "2xl": "1248px",
    },
    fontFamily: {
      sans: ["Lato", "sans-serif"],
      serif: ["inherit", "serif"],
    },
  },
};
