import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export async function getStaticPaths() {
  const dir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(dir);

  const paths = files.map((filename) => ({
    params: { slug: filename.replace(".md", "") },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const file = fs.readFileSync(
    path.join(process.cwd(), "content/blog", params.slug + ".md"),
    "utf-8"
  );

  const { data, content } = matter(file);

  return {
    props: { frontmatter: data, content: marked(content) },
  };
}

export default function BlogPost({ frontmatter, content }) {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{frontmatter.title}</h1>
      <p className="text-gray-400 mb-6">{frontmatter.date}</p>

      {frontmatter.coverImage && (
        <img
          src={frontmatter.coverImage}
          className="rounded-xl mb-6"
          alt={frontmatter.title}
        />
      )}

      <div
        className="prose prose-invert"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
}
