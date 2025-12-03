import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPost, getBlogPosts } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export const revalidate = 120;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  if (!post) return {};
  return buildMetadata({ title: post.title, description: post.excerpt, image: post.heroImage || '' }, post.seo);
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  const posts = await getBlogPosts();
  if (!post) return notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="section-shell space-y-10">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">{post.readTime}</p>
        <h1 className="text-4xl font-semibold text-white">{post.title}</h1>
        <p className="text-sm text-slate-400">Published {new Date(post.date).toLocaleDateString()}</p>
      </div>
      <article className="prose prose-invert prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.body }} />
      {related.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Related dispatches</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {related.map((item) => (
              <Link key={item.slug} href={`/blog/${item.slug}`} className="glass-panel p-4 text-white">
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">{item.readTime}</p>
                <p className="text-lg font-semibold">{item.title}</p>
                <p className="text-sm text-slate-300">{item.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
