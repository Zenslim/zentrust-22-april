'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import clsx from 'clsx';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/programs', label: 'Programs' },
  { href: '/impact', label: 'Impact' },
  { href: '/blog', label: 'Blog' },
  { href: '/donate', label: 'Donate' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl border-b border-white/10 bg-black/40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-semibold gradient-text">
          ZenTrust
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium sm:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'transition hover:text-teal-300',
                pathname === item.href ? 'text-teal-300' : 'text-slate-200'
              )}
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
        <div className="flex items-center gap-3 sm:hidden">
          <ThemeToggle />
          <button
            aria-label="Toggle navigation"
            onClick={() => setIsOpen((open) => !open)}
            className="rounded-lg border border-white/10 bg-white/5 p-2"
          >
            <span className="block h-0.5 w-5 bg-white mb-1" />
            <span className="block h-0.5 w-5 bg-white" />
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="sm:hidden border-t border-white/10 bg-black/70 backdrop-blur-xl">
          <div className="px-4 py-3 flex flex-col gap-3 text-sm text-slate-100">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-teal-300">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
