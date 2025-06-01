import { memo, MutableRefObject, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
      children={displayedText}
      remarkPlugins={[remarkGfm]}
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
        table: ({ children, ...props }) => (
          <div className="overflow-x-scroll scrollbar-hide">
            <table
              className="my-4 table-auto border border-black [&_td]:border [&_td]:p-4 [&_th]:whitespace-nowrap [&_th]:border [&_th]:bg-gray/20 [&_th]:p-4 [&_tr:last-child]:border-b-0 [&_tr]:border-b"
              {...props}
            >
              {children}
            </table>
          </div>
        ),
      }}
    />
  );
});
