import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        lg: "1200px",
      },
    },
    extend: {
      screens: {
        xs: "481px",
        sm: "641px",
        md: "769px",
        lg: "1025px",
        xl: "1281px",
        "2xl": "1537px",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        black: "#171717",
        gray: {
          DEFAULT: "#525252",
        },
        purple: {
          DEFAULT: "#6238C3",
        },
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            secondary: {
              DEFAULT: "#6238C3", // purple
            },
          },
        },
      },
    }),
  ],
};
export default config;
