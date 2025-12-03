import Image from 'next/image';
import Link from 'next/link';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCta?: { label: string; href: string };
  image?: string;
}

export function Hero({ title, subtitle, ctaLabel, ctaHref, secondaryCta, image }: HeroProps) {
  return (
    <section className="section-shell grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
      <div className="space-y-6">
        <p className="inline-flex items-center rounded-full border border-emerald-300/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
          Future-resilient nonprofit design system
        </p>
        <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
          <span className="gradient-text">{title}</span>
        </h1>
        <p className="text-lg text-slate-200 max-w-2xl">{subtitle}</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={ctaHref}
            className="rounded-xl bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-500 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5"
          >
            {ctaLabel}
          </Link>
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-emerald-300"
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>
        <div className="grid grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="glass-panel p-4">
            <p className="text-lg font-semibold text-white">128k</p>
            <p>Native trees safeguarded</p>
          </div>
          <div className="glass-panel p-4">
            <p className="text-lg font-semibold text-white">15</p>
            <p>Regenerative hubs</p>
          </div>
          <div className="glass-panel p-4">
            <p className="text-lg font-semibold text-white">48</p>
            <p>Active research projects</p>
          </div>
        </div>
      </div>
      <div className="relative h-80 w-full overflow-hidden rounded-3xl border border-white/10 bg-grid-glow shadow-2xl">
        {image ? (
          <Image
            src={image}
            alt="ZenTrust impact"
            fill
            className="object-cover"
            priority
            sizes="(min-width: 1024px) 500px, 100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 via-cyan-400/20 to-blue-500/20" />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.4),transparent_25%)]" />
        <div className="absolute bottom-4 left-4 right-4 glass-panel p-4 text-sm text-white">
          We pair Indigenous stewardship wisdom with open innovation to restore land faster than climate disruption.
        </div>
      </div>
    </section>
  );
}
