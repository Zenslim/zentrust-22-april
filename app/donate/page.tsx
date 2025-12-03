import { DonationCalculator } from '@/components/impact/DonationCalculator';
import { ImpactCounters } from '@/components/impact/ImpactCounters';
import { getPage } from '@/lib/content';

export const revalidate = 60;

export default async function DonatePage() {
  const donate = await getPage('donate');

  return (
    <div className="section-shell space-y-12">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">Donate</p>
        <h1 className="text-4xl font-semibold text-white">{donate?.title}</h1>
        <p className="text-lg text-slate-200 max-w-3xl">{donate?.body}</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <DonationCalculator />
        <div className="space-y-4">
          <div className="glass-panel p-6 space-y-3">
            <h2 className="text-xl font-semibold text-white">Transparent allocation</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
              <li>70% Direct program delivery (planting, training, hydrological restoration)</li>
              <li>20% Open research, monitoring, and TinaCMS-powered storytelling</li>
              <li>10% Lean, resilient operations and community governance</li>
            </ul>
          </div>
          <div className="glass-panel p-6 space-y-3">
            <h3 className="text-lg font-semibold text-white">Impact in motion</h3>
            <ImpactCounters />
          </div>
        </div>
      </div>
    </div>
  );
}
