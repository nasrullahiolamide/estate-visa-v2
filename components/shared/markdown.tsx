import { PropsWithChildren } from "react";
import Remark, { Components, Options } from "react-markdown";

import clsx from "clsx";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

interface RemarkProps extends Options {
  classNames?: Partial<Record<keyof Components, string>>;
}

type MarkdownProps = PropsWithChildren<RemarkProps>;

export function Markdown({
  children,
  classNames,
  components,
  ...props
}: MarkdownProps) {
  const {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    pre,
    code,
    img,
    em,
    strong,
    ul,
    ol,
    li,
    a,
    p,
  } = {
    ...classNames,
  };

  return (
    <Remark
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ children }) => (
          <h1 className={clsx("prose-4xl/bold", h1)}>{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className={clsx("prose-3xl/semi-bold", h2)}>{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className={clsx("font-semibold prose-2xl/medium", h3)}>
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className={clsx("prose-xl/regular", h4)}>{children}</h4>
        ),
        h5: ({ children }) => (
          <h5 className={clsx("prose-lg/regular", h5)}>{children}</h5>
        ),
        h6: ({ children }) => (
          <h6 className={clsx("prose-base/regular", h6)}>{children}</h6>
        ),
        pre: ({ children }) => (
          <pre className={clsx("font-mono", pre)}>{children}</pre>
        ),
        code: ({ children }) => (
          <code className={clsx("font-mono", code)}>{children}</code>
        ),
        img: ({ src, alt, height }) => {
          return (
            <img
              src={src}
              className={clsx("object-cover w-full", img)}
              style={{
                height,
              }}
              alt={alt}
            />
          );
        },
        em: ({ children }) => (
          <em className={clsx("italic", em)}>{children}</em>
        ),
        strong: ({ children }) => (
          <strong className={clsx("font-bold", strong)}>{children}</strong>
        ),
        ul: ({ children }) => (
          <ul className={clsx("list-decimal list-outside ml-6", ul)}>
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className={clsx("list-decimal list-outside ml-6", ol)}>
            {children}
          </ol>
        ),
        li: ({ children }) => <li className={clsx("py-3", li)}>{children}</li>,
        a: ({ children, href }) => (
          <a href={href} className={clsx("text-accent-10", a)}>
            {children}
          </a>
        ),
        p: ({ children }) => <p className={clsx(p)}>{children}</p>,
        ...components,
      }}
      {...props}
      children={children}
    />
  );
}
