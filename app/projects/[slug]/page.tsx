import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { getAllProjects, getProjectBySlug } from '@/lib/projects';
import { mdxComponents } from '@/components/mdx-components';
import PageTransition from '@/components/page-transition';
import type { Metadata } from 'next';

// ─── Static params (required for output: 'export') ───────────────
export function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

// ─── Dynamic metadata per project ────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.meta.title} | Joakim H. Nguyen`,
    description: project.meta.description,
  };
}

// ─── Page ─────────────────────────────────────────────────────────
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { meta, content } = project;

  const formattedDate = new Date(meta.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <PageTransition>
    <article>
      {/* Back link */}
      <a
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-indigo-400 transition-colors mb-10 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to projects
      </a>

      {/* Header */}
      <header className="mb-12">
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-zinc-100 mb-4 leading-tight">
          {meta.title}
        </h1>

        <p className="text-base text-zinc-400 leading-relaxed mb-6 max-w-2xl">
          {meta.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {formattedDate}
          </span>

          <span className="h-4 w-px bg-zinc-800" />

          <div className="flex flex-wrap items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-zinc-600" />
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[11px] uppercase tracking-wider font-mono rounded-md bg-zinc-900/80 border border-zinc-800 text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <hr className="mt-8 border-zinc-800/60" />
      </header>

      {/* MDX Content */}
      <div className="prose-custom">
        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>
    </article>
    </PageTransition>
  );
}
