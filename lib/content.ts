import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { BlogPost, PageContent, Program, SuccessStory, TeamMember } from './types';

const contentDir = path.join(process.cwd(), 'content');

async function readJson<T>(relativePath: string): Promise<T> {
  const filePath = path.join(contentDir, relativePath);
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

export async function getPage(slug: string): Promise<PageContent | null> {
  try {
    const page = await readJson<PageContent>(`pages/${slug}.json`);
    return page;
  } catch (error) {
    return null;
  }
}

export async function getPrograms(): Promise<Program[]> {
  const data = await readJson<{ items: Program[] }>('pages/programs.json');
  return data.items.filter((program) => program.status === 'published');
}

export async function getStories(): Promise<SuccessStory[]> {
  const data = await readJson<{ items: SuccessStory[] }>('pages/stories.json');
  return data.items.filter((story) => story.status === 'published');
}

export async function getTeam(): Promise<TeamMember[]> {
  const data = await readJson<{ members: TeamMember[] }>('pages/team.json');
  return data.members.filter((member) => member.status === 'published');
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const blogFolder = path.join(contentDir, 'blog');
  const files = await fs.readdir(blogFolder);
  const posts = await Promise.all(
    files.filter((file) => file.endsWith('.md')).map(async (file) => {
      const raw = await fs.readFile(path.join(blogFolder, file), 'utf-8');
      const { content, data } = matter(raw);
      return {
        title: data.title as string,
        slug: data.slug as string,
        excerpt: data.excerpt as string,
        heroImage: data.heroImage as string,
        readTime: data.readTime as string,
        date: data.date as string,
        status: (data.status as BlogPost['status']) || 'draft',
        seo: {
          title: (data.seoTitle as string) || (data.title as string),
          description: (data.seoDescription as string) || (data.excerpt as string),
          image: (data.seoImage as string) || (data.heroImage as string),
        },
        body: marked.parse(content),
      } as BlogPost;
    })
  );

  return posts.filter((post) => post.status === 'published').sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug) || null;
}
