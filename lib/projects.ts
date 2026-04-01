import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// ─── Types ────────────────────────────────────────────────────────
export interface ProjectMeta {
  title: string;
  slug: string;
  description: string;
  date: string;
  tags: string[];
  thumbnail: string;
  featured: boolean;
}

export interface Project {
  meta: ProjectMeta;
  content: string; // raw MDX source
}

// ─── Paths ────────────────────────────────────────────────────────
const PROJECTS_DIR = path.join(process.cwd(), 'content', 'projects');

// ─── Utilities ────────────────────────────────────────────────────

/**
 * Read all .mdx files from content/projects/, parse frontmatter,
 * and return sorted metadata (featured first, then by date descending).
 */
export function getAllProjects(): ProjectMeta[] {
  if (!fs.existsSync(PROJECTS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith('.mdx'));

  const projects: ProjectMeta[] = files.map((filename) => {
    const filePath = path.join(PROJECTS_DIR, filename);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(raw);

    return {
      title: data.title ?? '',
      slug: data.slug ?? filename.replace(/\.mdx$/, ''),
      description: data.description ?? '',
      date: data.date ?? '',
      tags: data.tags ?? [],
      thumbnail: data.thumbnail ?? '',
      featured: data.featured ?? false,
    } satisfies ProjectMeta;
  });

  // Sort: featured first, then newest first
  return projects.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * Load a single project by slug.
 * Returns parsed metadata + raw MDX content for rendering.
 */
export function getProjectBySlug(slug: string): Project | null {
  if (!fs.existsSync(PROJECTS_DIR)) return null;

  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith('.mdx'));

  for (const filename of files) {
    const filePath = path.join(PROJECTS_DIR, filename);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);

    const fileSlug = data.slug ?? filename.replace(/\.mdx$/, '');

    if (fileSlug === slug) {
      return {
        meta: {
          title: data.title ?? '',
          slug: fileSlug,
          description: data.description ?? '',
          date: data.date ?? '',
          tags: data.tags ?? [],
          thumbnail: data.thumbnail ?? '',
          featured: data.featured ?? false,
        },
        content,
      };
    }
  }

  return null;
}
