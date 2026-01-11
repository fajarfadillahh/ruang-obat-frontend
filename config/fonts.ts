import {
  Inter as FontInter,
  Fira_Code as FontMono,
  Mulish as FontSans,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontInter = FontInter({
  subsets: ["latin"],
  variable: "--font-inter",
});
