import NextImage from 'next/image';
import type { MDXComponents } from 'mdx/types';

// ─── Callout ──────────────────────────────────────────────────────
type CalloutVariant = 'info' | 'warning' | 'tip';

const calloutStyles: Record<CalloutVariant, { border: string; bg: string; icon: string }> = {
  info: {
    border: 'border-indigo-500/40',
    bg: 'bg-indigo-500/5',
    icon: '💡',
  },
  warning: {
    border: 'border-amber-500/40',
    bg: 'bg-amber-500/5',
    icon: '⚠️',
  },
  tip: {
    border: 'border-emerald-500/40',
    bg: 'bg-emerald-500/5',
    icon: '✅',
  },
};

export function Callout({
  variant = 'info',
  title,
  children,
}: {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
}) {
  const s = calloutStyles[variant];
  return (
    <div
      className={`my-6 rounded-xl border ${s.border} ${s.bg} px-5 py-4 not-prose`}
    >
      {title && (
        <p className="mb-1 flex items-center gap-2 text-sm font-semibold text-zinc-200">
          <span>{s.icon}</span> {title}
        </p>
      )}
      <div className="text-sm leading-relaxed text-zinc-400">{children}</div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────
export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="my-12">
      <div className="mb-6 flex items-center gap-4">
        <h2 className="text-xl font-serif font-medium text-zinc-100">
          {title}
        </h2>
        <span className="h-px flex-1 bg-zinc-800" />
      </div>
      <div>{children}</div>
    </section>
  );
}

// ─── ProjectImage ─────────────────────────────────────────────────
export function ProjectImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-8 not-prose">
      <div className="relative w-full overflow-hidden rounded-xl border border-zinc-800/50 bg-zinc-900">
        <NextImage
          src={src}
          alt={alt}
          width={1200}
          height={675}
          className="w-full h-auto object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-xs text-zinc-500 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ─── Component Map ────────────────────────────────────────────────
// These components are available inside MDX files.
export const mdxComponents: MDXComponents = {
  Callout,
  Section,
  ProjectImage,

  // HTML element overrides for prose styling
  h1: (props) => (
    <h1
      className="font-serif text-3xl font-medium text-zinc-100 mt-12 mb-4"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="font-serif text-2xl font-medium text-zinc-100 mt-10 mb-3"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="font-serif text-xl font-medium text-zinc-200 mt-8 mb-3"
      {...props}
    />
  ),
  h4: (props) => (
    <h4
      className="font-serif text-lg font-medium text-zinc-300 mt-6 mb-2"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="text-indigo-400 underline decoration-indigo-500/30 underline-offset-2 hover:text-indigo-300 hover:decoration-indigo-400/50 transition-colors"
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-2 border-indigo-500/50 pl-4 italic text-zinc-400 my-6"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded-md bg-zinc-800/80 px-1.5 py-0.5 text-sm font-mono text-indigo-300 border border-zinc-700/50"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="my-6 overflow-x-auto rounded-xl bg-zinc-900 border border-zinc-800/50 p-4 text-sm leading-relaxed"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="my-4 ml-4 list-disc space-y-2 text-zinc-400" {...props} />
  ),
  ol: (props) => (
    <ol className="my-4 ml-4 list-decimal space-y-2 text-zinc-400" {...props} />
  ),
  hr: () => <hr className="my-10 border-zinc-800" />,
  table: (props) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-zinc-800/50">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="bg-zinc-900 px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400 border-b border-zinc-800"
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="px-4 py-2 text-zinc-400 border-b border-zinc-800/50"
      {...props}
    />
  ),
};
