import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface TextHighlightBackgroundProps extends HTMLAttributes<HTMLSpanElement> {
  text: string;
  className?: string;
}

export default function TextHighlightBackground({
  text,
  className,
  ...props
}: TextHighlightBackgroundProps) {
  return (
    <span
      className={twMerge(
        "relative inline-block text-white before:absolute before:-inset-1 before:-z-10 before:block before:bg-purple",
        `${className}`,
      )}
      {...props}
    >
      {text}
    </span>
  );
}
