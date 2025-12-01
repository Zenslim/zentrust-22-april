'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';
import { auth } from '@/firebase';
import { signOut } from 'firebase/auth';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleSignIn = () => router.push('/signin');
  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/');
  };

  const userLoggedIn = false; // TODO: integrate real auth state

  return (
    <>
      {/* --- Top Bar with Logo + Right Controls --- */}
      <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-3 bg-black/40 backdrop-blur-md">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/zentrust-logo-white.png"
            alt="ZenTrust Logo"
            className="h-8 w-auto"
          />
          <span className="hidden sm:inline text-gray-300 text-sm">
            ZenTrust · 501(c)(3) Public Charity
          </span>
        </Link>

        {/* Right-side Icons */}
        <div className="flex items-center space-x-4">
          {/* Sign In / Profile */}
          <button
            onClick={userLoggedIn ? handleSignOut : handleSignIn}
            className="text-white hover:text-purple-400 transition-all"
          >
            <FiUser size={22} />
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white hover:text-purple-400 transition-all"
          >
            {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* --- Slide-Out Menu Panel --- */}
      {menuOpen && (
        <div className="fixed top-0 right-0 w-72 h-full bg-black bg-opacity-95 backdrop-blur-xl p-8 flex flex-col space-y-7 shadow-2xl animate-fade-in z-50">

          {/* Header inside panel */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-400 text-sm">ZenTrust Navigation</p>
            <FiX
              size={24}
              className="text-white hover:text-purple-400 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            />
          </div>

          {/* Main Routes */}
          <Link href="/" onClick={() => setMenuOpen(false)} className="menu-link">
            🏠 Home
          </Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} className="menu-link">
            ℹ️ About
          </Link>
          <Link href="/what" onClick={() => setMenuOpen(false)} className="menu-link">
            🌍 Programs
          </Link>
          <Link href="/donate" onClick={() => setMenuOpen(false)} className="menu-link font-semibold text-emerald-400">
            💚 Donate
          </Link>

          <a
            href="https://zentrust.hashnode.dev"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="menu-link"
          >
            📝 Blog
          </a>

          <Link href="/contact" onClick={() => setMenuOpen(false)} className="menu-link">
            📬 Contact
          </Link>

          {/* Mission Pages */}
          <Link href="/why" onClick={() => setMenuOpen(false)} className="menu-link">
            🌱 Why We Exist
          </Link>

          <Link href="/how" onClick={() => setMenuOpen(false)} className="menu-link">
            ⚙️ How We Work
          </Link>

          {/* Internal tools */}
          <Link href="/zenboard" onClick={() => setMenuOpen(false)} className="menu-link">
            🌀 Zenboard
          </Link>

          <Link href="/journal" onClick={() => setMenuOpen(false)} className="menu-link">
            ✍️ Journal
          </Link>

          {/* Divider */}
          <div className="border-t border-gray-800 pt-4"></div>

          {/* Auth Button */}
          <button
            onClick={userLoggedIn ? handleSignOut : handleSignIn}
            className="text-gray-300 hover:text-white text-lg transition-all"
          >
            {userLoggedIn ? "Sign Out" : "Sign In"}
          </button>
        </div>
      )}

      {/* Shared CSS for links */}
      <style jsx>{`
        .menu-link {
          @apply text-white text-xl hover:text-purple-400 transition-all flex items-center gap-2;
        }
      `}</style>
    </>
  );
}
