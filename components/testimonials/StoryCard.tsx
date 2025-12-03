import Image from 'next/image';

interface StoryCardProps {
  title: string;
  summary: string;
  image: string;
  link?: string;
}

export function StoryCard({ title, summary, image, link }: StoryCardProps) {
  const body = (
    <div className="flex flex-col h-full rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-100 shadow-lg shadow-emerald-500/10">
      <div className="relative h-40 w-full overflow-hidden rounded-xl">
        <Image src={image} alt={title} fill className="object-cover" sizes="(min-width: 768px) 400px, 100vw" />
      </div>
      <div className="mt-4 space-y-2">
        <p className="text-sm uppercase tracking-wide text-emerald-200/80">Success story</p>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-slate-300">{summary}</p>
      </div>
      <div className="mt-auto pt-4 text-sm font-semibold text-emerald-200">{link ? 'Read full story →' : 'Impact verified'}</div>
    </div>
  );

  if (link) {
    return (
      <a href={link} className="block transition hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/20">
        {body}
      </a>
    );
  }

  return body;
}
