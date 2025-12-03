import { Hero } from '@/components/hero/Hero';
import { DonationCalculator } from '@/components/impact/DonationCalculator';
import { ImpactCounters } from '@/components/impact/ImpactCounters';
import { ProgramCard } from '@/components/programs/ProgramCard';
import { NewsletterForm } from '@/components/layout/NewsletterForm';
import { StoryCard } from '@/components/testimonials/StoryCard';
import { TeamCard } from '@/components/team/TeamCard';
import { getPage, getPrograms, getStories, getTeam } from '@/lib/content';

export const revalidate = 60;

export default async function HomePage() {
  const [page, programs, stories, team] = await Promise.all([
    getPage('home'),
    getPrograms(),
    getStories(),
    getTeam(),
  ]);

  return (
    <div className="space-y-16">
      <Hero
        title={page?.title || 'Regeneration for people and planet'}
        subtitle={page?.body || ''}
        ctaLabel="Donate to regenerate"
        ctaHref="/donate"
        secondaryCta={{ label: 'Explore programs', href: '/programs' }}
        image={page?.heroImage}
      />

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">Mission</p>
            <h2 className="text-3xl font-semibold text-white">We rebuild living systems faster than climate disruption.</h2>
            <p className="text-lg text-slate-200">
              ZenTrust aligns Indigenous stewardship, regenerative science, and transparent technology so every donation lands where it
              matters: restoring watersheds, backing land stewards, and proving impact in real-time.
            </p>
          </div>
          <DonationCalculator />
        </div>
      </section>

      <section className="section-shell space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold text-white">Impact dashboard</h2>
          <p className="text-sm text-slate-300">Edge-optimized counters refreshed automatically.</p>
        </div>
        <ImpactCounters />
      </section>

      <section className="section-shell space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">Programs</p>
            <h2 className="text-3xl font-semibold text-white">Future-resilient initiatives</h2>
          </div>
          <a href="/programs" className="text-sm font-semibold text-emerald-200 hover:underline">
            View all programs
          </a>
        </div>
        <div className="card-grid">
          {programs.slice(0, 3).map((program) => (
            <ProgramCard
              key={program.slug}
              icon={program.icon}
              title={program.title}
              description={program.description}
              metric={program.metric}
            />
          ))}
        </div>
      </section>

      <section className="section-shell space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">Success stories</p>
            <h2 className="text-3xl font-semibold text-white">Impact you can feel</h2>
          </div>
          <a href="/impact" className="text-sm font-semibold text-emerald-200 hover:underline">
            Impact hub
          </a>
        </div>
        <div className="card-grid">
          {stories.slice(0, 3).map((story) => (
            <StoryCard key={story.slug} title={story.title} summary={story.summary} image={story.image} link={story.link} />
          ))}
        </div>
      </section>

      <section className="section-shell grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">Stay ahead</p>
          <h2 className="text-3xl font-semibold text-white">Get regenerative intelligence in your inbox</h2>
          <p className="text-lg text-slate-200">
            Join thousands of builders, donors, and land stewards receiving transparent updates, open data drops, and opportunities to
            deploy capital where it counts.
          </p>
        </div>
        <NewsletterForm />
      </section>

      <section className="section-shell space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">Team</p>
            <h2 className="text-3xl font-semibold text-white">Stewards behind the mission</h2>
          </div>
        </div>
        <div className="card-grid">
          {team.map((member) => (
            <TeamCard
              key={member.name}
              name={member.name}
              role={member.role}
              bio={member.bio}
              photo={member.photo}
              socials={member.socials}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
