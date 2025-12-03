import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="section-shell grid gap-10 md:grid-cols-3">
        <div className="space-y-3">
          <p className="text-lg font-semibold text-white">ZenTrust Foundation</p>
          <p className="text-sm text-slate-300">
            Regenerating land, restoring watersheds, and uplifting climate-forward communities with radical transparency.
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-200">Explore</p>
          <div className="flex flex-col gap-2 text-sm text-slate-300">
            <Link href="/programs" className="hover:text-teal-200">Programs</Link>
            <Link href="/impact" className="hover:text-teal-200">Impact</Link>
            <Link href="/blog" className="hover:text-teal-200">Blog</Link>
            <Link href="/donate" className="hover:text-teal-200">Donate</Link>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-200">Connect</p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-300">
            <Link href="https://www.linkedin.com" className="hover:text-teal-200" aria-label="LinkedIn">LinkedIn</Link>
            <Link href="https://www.instagram.com" className="hover:text-teal-200" aria-label="Instagram">Instagram</Link>
            <Link href="mailto:hello@zentrust.org" className="hover:text-teal-200" aria-label="Email">Email</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} ZenTrust Foundation — Future-resilient nonprofit design system.
      </div>
    </footer>
  );
}
