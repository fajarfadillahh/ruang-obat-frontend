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
        lg: "1120px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Mulish", "sans-serif"],
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            foreground: "#171717", // black
            default: {
              DEFAULT: "#525252", // grey
            },
            secondary: {
              DEFAULT: "#6328c3", // purple
            },
          },
        },
      },
    }),
  ],
};
export default config;
