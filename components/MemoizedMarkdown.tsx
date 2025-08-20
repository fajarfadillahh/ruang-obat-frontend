import { marked } from "marked";
import React, { memo, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

function parseMarkdownIntoBlocks(markdown: string): string[] {
  const tokens = marked.lexer(markdown);
  return tokens.map((token) => token.raw);
}

const MemoizedMarkdownBlock = memo(
  ({ content }: { content: string }) => {
    return (
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex]}
        components={{
          ol: ({ children, ...props }) => (
            <ol className="my-4 list-decimal space-y-2 pl-6" {...props}>
              {children}
            </ol>
          ),
          ul: ({ children, ...props }) => (
            <ul className="my-4 list-disc space-y-2 pl-6" {...props}>
              {children}
            </ul>
          ),

          table: ({ children, ...props }) => (
            <div className="my-6 overflow-x-auto rounded-lg border border-gray/20 scrollbar-hide">
              <table
                className="w-full table-auto border-collapse [&_td]:border-r [&_td]:border-gray/10 [&_td]:p-3 [&_td]:text-sm [&_th]:border-r [&_th]:border-gray/10 [&_th]:bg-gray/10 [&_th]:p-3 [&_th]:text-left [&_th]:text-sm [&_th]:font-bold [&_tr:last-child]:border-b-0 [&_tr]:border-b [&_tr]:border-gray/10"
                {...props}
              >
                {children}
              </table>
            </div>
          ),

          h1: ({ children, ...props }) => (
            <h1
              className="mb-4 mt-8 border-b-2 border-purple/20 pb-2 text-3xl font-black text-black"
              {...props}
            >
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="mb-3 mt-6 text-2xl font-bold text-black" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="mb-2 mt-5 text-xl font-bold text-black" {...props}>
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4
              className="mb-2 mt-4 text-lg font-semibold text-black"
              {...props}
            >
              {children}
            </h4>
          ),
          h5: ({ children, ...props }) => (
            <h5
              className="mb-2 mt-3 text-base font-semibold text-black"
              {...props}
            >
              {children}
            </h5>
          ),
          h6: ({ children, ...props }) => (
            <h6
              className="mb-2 mt-3 text-sm font-semibold text-gray"
              {...props}
            >
              {children}
            </h6>
          ),

          p: ({ children, ...props }) => (
            <p className="mb-4 text-base leading-7 text-gray" {...props}>
              {children}
            </p>
          ),

          em: ({ children, ...props }) => (
            <em className="italic text-purple" {...props}>
              {children}
            </em>
          ),
          strong: ({ children, ...props }) => (
            <strong className="font-bold text-black" {...props}>
              {children}
            </strong>
          ),

          a: ({ children, href, ...props }) => (
            <a
              href={href}
              className="text-purple underline transition-colors hover:text-purple/80"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            >
              {children}
            </a>
          ),

          code: ({ children, className, ...props }) => {
            const isInline = !className;

            if (isInline) {
              return (
                <code
                  className="rounded bg-gray/10 px-2 py-1 font-mono text-sm text-purple"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return (
              <div className="relative my-4">
                <pre className="scrollbar-thin scrollbar-thumb-gray-600 overflow-x-auto rounded-lg bg-gray-900 p-4 text-white">
                  <code className="font-mono text-sm" {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            );
          },
          pre: ({ children, ...props }) => (
            <pre
              className="overflow-x-auto rounded-b-lg bg-purple p-4 text-white"
              {...props}
            >
              {children}
            </pre>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="my-4 border-l-4 border-purple bg-purple/5 py-2 pl-4 italic text-gray"
              {...props}
            >
              {children}
            </blockquote>
          ),
          hr: ({ ...props }) => (
            <hr className="my-8 border-gray/20" {...props} />
          ),
          li: ({ children, ...props }) => {
            const childrenArray = React.Children.toArray(children);
            const firstChild = childrenArray[0];

            if (
              typeof firstChild === "string" &&
              firstChild.match(/^\[[ x]\]/)
            ) {
              const isChecked = firstChild.startsWith("[x]");
              const text = firstChild.replace(/^\[[ x]\]\s*/, "");

              return (
                <li className="mb-2 flex items-start gap-2" {...props}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    readOnly
                    className="mt-1 accent-purple"
                  />
                  <span
                    className={
                      isChecked ? "text-gray line-through" : "text-gray"
                    }
                  >
                    {text}
                    {childrenArray.slice(1)}
                  </span>
                </li>
              );
            }

            return (
              <li className="mb-2 text-gray" {...props}>
                {children}
              </li>
            );
          },
          dl: ({ children, ...props }) => (
            <dl className="my-4 space-y-2" {...props}>
              {children}
            </dl>
          ),
          dt: ({ children, ...props }) => (
            <dt className="font-bold text-black" {...props}>
              {children}
            </dt>
          ),
          dd: ({ children, ...props }) => (
            <dd className="mb-2 ml-4 text-gray" {...props}>
              {children}
            </dd>
          ),
          details: ({ children, ...props }) => (
            <details
              className="my-4 rounded-lg border border-gray/20"
              {...props}
            >
              {children}
            </details>
          ),
          summary: ({ children, ...props }) => (
            <summary
              className="cursor-pointer bg-gray/5 p-3 font-semibold text-black transition-colors hover:bg-gray/10"
              {...props}
            >
              {children}
            </summary>
          ),
          mark: ({ children, ...props }) => (
            <mark className="rounded bg-yellow-200 px-1 py-0.5" {...props}>
              {children}
            </mark>
          ),
          kbd: ({ children, ...props }) => (
            <kbd
              className="rounded border border-gray-300 bg-gray-100 px-2 py-1 font-mono text-sm shadow-sm"
              {...props}
            >
              {children}
            </kbd>
          ),
          sub: ({ children, ...props }) => (
            <sub className="text-xs" {...props}>
              {children}
            </sub>
          ),
          sup: ({ children, ...props }) => (
            <sup className="text-xs" {...props}>
              {children}
            </sup>
          ),
          small: ({ children, ...props }) => (
            <small className="text-sm text-gray" {...props}>
              {children}
            </small>
          ),
          del: ({ children, ...props }) => (
            <del className="text-red-500 line-through" {...props}>
              {children}
            </del>
          ),
          ins: ({ children, ...props }) => (
            <ins
              className="text-green-600 underline decoration-green-600"
              {...props}
            >
              {children}
            </ins>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.content !== nextProps.content) return false;
    return true;
  },
);

MemoizedMarkdownBlock.displayName = "MemoizedMarkdownBlock";

export const MemoizedMarkdown = memo(
  ({ content, id }: { content: string; id: string }) => {
    const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content]);

    return blocks.map((block, index) => (
      <MemoizedMarkdownBlock content={block} key={`${id}-block_${index}`} />
    ));
  },
);

MemoizedMarkdown.displayName = "MemoizedMarkdown";

function normalizeCustomMathTags(input: string): string {
  return input
    .replace(
      /\[(?:\/)?math\]([\s\S]*?)\[\/math\]/g,
      (_, content) => `$$${content.trim()}$$`,
    )
    .replace(
      /\[(?:\/)?inline\]([\s\S]*?)\[\/inline\]/g,
      (_, content) => `$${content.trim()}$`,
    )
    .replace(/\\\(([\s\S]*?)\\\)/g, (_, content) => `$${content.trim()}$`)
    .replace(/\\\[([\s\S]*?)\\\]/g, (_, content) => `$$${content.trim()}$$`)
    .replace(/([^$])\s*\}\s*\$\$\s*-\s*\$([^$]+)\$/g, "$1}$$ - $$2$")
    .replace(/\$\$([\s\S]*?)\$\$\s*-\s*\$([^$]+)\$/g, "$$$$1$$ - $$2$")
    .replace(/\}\s+\$\$\s*-\s*\$/g, "}$$ - $")
    .replace(/\$\$([^$]+)-\s*\$([^$]+)\$/g, "$$$$1$$ - $$2$")
    .replace(/\$\$\$+/g, "$$")
    .replace(/\\boxed\s*\{\s*([\s\S]*?)\s*\}/g, (match, content) => {
      if (!match.includes("$") && content.match(/[=+\-*/^_{}\\]/)) {
        return `$${match}$`;
      }
      return match;
    })
    .replace(
      /\\frac\s*\{\s*([\s\S]*?)\s*\}\s*\{\s*([\s\S]*?)\s*\}/g,
      (match, num, den) => {
        if (
          !match.includes("$") &&
          (num.match(/[0-9]/) || den.match(/[0-9]/))
        ) {
          return `$${match}$`;
        }
        return match;
      },
    )
    .replace(/\\sqrt\s*\{\s*([\s\S]*?)\s*\}/g, (match, content) => {
      if (!match.includes("$") && content.match(/[0-9=+\-*/^_]/)) {
        return `$${match}$`;
      }
      return match;
    })
    .replace(
      /\\begin\{(equation|align|matrix|array|cases)\}([\s\S]*?)\\end\{\1\}/g,
      "$$\\begin{$1}$2\\end{$1}$$",
    )
    .replace(/(\\(?:sum|int|lim)\s*_\{[^}]*\}\s*\^\{[^}]*\})/g, (match) => {
      if (!match.includes("$")) return `$${match}$`;
      return match;
    })
    .replace(
      /\$\$\s*([\s\S]*?)\s*\$\$/g,
      (_, content) => `$$${content.trim()}$$`,
    )
    .replace(
      /(?<!\$)\$(?!\$)\s*(.*?)\s*\$(?!\$)/g,
      (_, content) => `$${content.trim()}$`,
    )
    .replace(/\$\s*\$/g, "")
    .replace(/\$\$\s*\$\$/g, "");
}
