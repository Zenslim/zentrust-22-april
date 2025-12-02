import type { FC } from "react";

interface BlogPost {
  slug: string;
  title: string;
  date?: string;
  summary?: string;
  coverImage?: string;
}

interface BlogIndexProps {
  posts: BlogPost[];
}

const BlogList: FC<BlogIndexProps> = ({ posts }) => {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-semibold">ZenTrust Blog</h1>

      <div className="space-y-6">
        {posts.map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-6 bg-gray-900 rounded-xl hover:bg-gray-800 transition"
          >
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <p className="text-gray-400 mt-2">{post.summary}...</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default function Page({ posts }: BlogIndexProps) {
  return (
    <>
      <BlogList posts={posts} />
    </>
  );
}

// TODO: Convert legacy blog index data fetching.
