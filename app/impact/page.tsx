import { ImpactCounters } from '@/components/impact/ImpactCounters';
import { StoryCard } from '@/components/testimonials/StoryCard';
import { getPage, getStories } from '@/lib/content';

export const revalidate = 120;

export default async function ImpactPage() {
  const [impact, stories] = await Promise.all([getPage('impact'), getStories()]);

  return (
    <div className="section-shell space-y-10">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">Impact</p>
        <h1 className="text-4xl font-semibold text-white">{impact?.title}</h1>
        <p className="text-lg text-slate-200 max-w-3xl">{impact?.body}</p>
      </div>
      <ImpactCounters />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Success stories</h2>
          <p className="text-sm text-slate-300">Learnings from the field</p>
        </div>
        <div className="card-grid">
          {stories.map((story) => (
            <StoryCard key={story.slug} title={story.title} summary={story.summary} image={story.image} link={story.link} />
          ))}
        </div>
      </div>
    </div>
  );
}
