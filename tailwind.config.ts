import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: "#FF6B35",
          light: "#FF8F5E",
          dark: "#E04D15",
        },
        navy: {
          DEFAULT: "#0F1624",
          mid: "#1B2B4B",
          light: "#243A5E",
        },
        teal: {
          DEFAULT: "#00C2CB",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
