import { memo, MutableRefObject, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

type TypingTextProps = {
  text: string;
  speed?: number;
  onDone?: () => void;
  divRef: MutableRefObject<HTMLDivElement | null>;
};

export const TypingText = memo(function TypingText(props: TypingTextProps) {
  const { text, speed = 0.5, onDone, divRef } = props;
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(
    function () {
      if (index < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + text[index]);
          setIndex((prev) => prev + 1);

          divRef.current?.scrollIntoView({ behavior: "smooth" });
        }, speed);

        return () => clearTimeout(timeout);
      } else {
        if (onDone) {
          onDone();
        }
      }
    },
    [index, text, speed, onDone, divRef],
  );

  return (
    <ReactMarkdown
      components={{
        ol: ({ children, ...props }) => (
          <ol className="list-decimal pl-4" {...props}>
            {children}
          </ol>
        ),
        ul: ({ children, ...props }) => (
          <ul className="list-disc pl-4" {...props}>
            {children}
          </ul>
        ),
      }}
    >
      {displayedText}
    </ReactMarkdown>
  );
});
