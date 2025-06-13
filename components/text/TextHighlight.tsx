import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface TextHighlightProps extends HTMLAttributes<HTMLSpanElement> {
  text: string;
  className?: string;
}

export default function TextHighlight({
  text,
  className,
  ...props
}: TextHighlightProps) {
  return (
    <span
      className={twMerge("font-bold capitalize text-purple", `${className}`)}
      {...props}
    >
      {text}
    </span>
  );
}
