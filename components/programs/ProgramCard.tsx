interface ProgramCardProps {
  icon: string;
  title: string;
  description: string;
  metric?: string;
}

export function ProgramCard({ icon, title, description, metric }: ProgramCardProps) {
  return (
    <div className="glass-panel h-full p-5 transition hover:-translate-y-1 hover:shadow-emerald-500/20">
      <div className="flex items-center gap-3 text-lg font-semibold text-white">
        <span className="text-2xl">{icon}</span>
        {title}
      </div>
      <p className="mt-3 text-sm text-slate-300">{description}</p>
      {metric && <p className="mt-4 inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">{metric}</p>}
    </div>
  );
}
