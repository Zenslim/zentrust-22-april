export default function Page({
  params,
  frontmatter,
  content,
}: {
  params: { slug: string };
  frontmatter?: { title?: string; date?: string; coverImage?: string };
  content?: string;
}) {
  const { slug } = params;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">
        {frontmatter?.title ?? slug}
      </h1>
      <p className="text-gray-400 mb-6">{frontmatter?.date}</p>

      {frontmatter?.coverImage && (
        <img
          src={frontmatter.coverImage}
          className="rounded-xl mb-6"
          alt={frontmatter.title}
        />
      )}

      <div
        className="prose prose-invert"
        dangerouslySetInnerHTML={{ __html: content ?? "" }}
      ></div>
    </div>
  );
}

// TODO: Convert legacy dynamic data fetching for blog slug route.
