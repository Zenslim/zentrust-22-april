import Link from 'next/link';
import { getBlogPosts } from '@/lib/content';

export const revalidate = 120;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="section-shell space-y-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">Blog</p>
        <h1 className="text-4xl font-semibold text-white">Regenerative dispatches</h1>
        <p className="text-lg text-slate-200 max-w-3xl">Stories, research briefs, and playbooks from the ZenTrust network.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="glass-panel block p-5 transition hover:-translate-y-1 hover:shadow-emerald-500/20"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">{post.readTime}</p>
            <h2 className="mt-2 text-xl font-semibold text-white">{post.title}</h2>
            <p className="mt-2 text-sm text-slate-300">{post.excerpt}</p>
            <p className="mt-3 text-xs text-slate-400">Published {new Date(post.date).toLocaleDateString()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
