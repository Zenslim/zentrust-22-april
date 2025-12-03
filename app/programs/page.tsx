import { ProgramCard } from '@/components/programs/ProgramCard';
import { getPrograms } from '@/lib/content';

export const revalidate = 300;

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <div className="section-shell space-y-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">Programs</p>
        <h1 className="text-4xl font-semibold text-white">Future-resilient initiatives</h1>
        <p className="text-lg text-slate-200 max-w-3xl">
          Each initiative is co-designed with local stewards and aligned to open, verifiable impact frameworks.
        </p>
      </div>
      <div className="card-grid">
        {programs.map((program) => (
          <ProgramCard
            key={program.slug}
            icon={program.icon}
            title={program.title}
            description={program.description}
            metric={program.metric}
          />
        ))}
      </div>
    </div>
  );
}
