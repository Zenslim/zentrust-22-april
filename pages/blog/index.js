import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function getStaticProps() {
  const dir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(dir);

  const posts = files.map((filename) => {
    const md = fs.readFileSync(path.join(dir, filename), "utf-8");
    const { data } = matter(md);

    return {
      slug: filename.replace(".md", ""),
      title: data.title,
      date: data.date,
      summary: data.body?.slice(0, 120) || "",
      coverImage: data.coverImage || "",
    };
  });

  return { props: { posts } };
}

export default function BlogIndex({ posts }) {
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
}
