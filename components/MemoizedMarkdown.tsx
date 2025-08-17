import { marked } from "marked";
import { memo, useMemo } from "react";
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
      >
        {normalizeCustomMathTags(content)}
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
