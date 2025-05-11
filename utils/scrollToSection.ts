import { RefObject } from "react";

export const scrollToSection = (ref: RefObject<HTMLElement>) => {
  ref.current?.scrollIntoView({ behavior: "smooth" });
};
