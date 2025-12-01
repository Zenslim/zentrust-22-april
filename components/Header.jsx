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

  const userLoggedIn = false; // TODO: wire to real auth state later

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center space-x-4">

      {/* Sign In / Profile Icon */}
      <button
        onClick={userLoggedIn ? handleSignOut : handleSignIn}
        className="text-white hover:text-purple-400 transition-all"
      >
        <FiUser size={24} />
      </button>

      {/* Hamburger Toggle */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-white hover:text-purple-400 transition-all"
      >
        {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
      </button>

      {/* Slide-Out Menu */}
      {menuOpen && (
        <div className="fixed top-0 right-0 w-72 h-full bg-black bg-opacity-95 backdrop-blur-xl p-8 flex flex-col space-y-7 shadow-2xl animate-fade-in z-40">

          {/* Close Header */}
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-400 text-sm">ZenTrust Navigation</p>
            <FiX
              size={24}
              className="text-white hover:text-purple-400 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            />
          </div>

          {/* Core Public Pages — Google Reviewer Priority */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-white text-xl hover:text-purple-400 transition-all"
          >
            🏠 Home
          </Link>

          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="text-white text-xl hover:text-purple-400 transition-all"
          >
            ℹ️ About
          </Link>

          <Link
            href="/what"
            onClick={() => setMenuOpen(false)}
            className="text-white text-xl hover:text-purple-400 transition-all"
          >
            🌍 Programs
          </Link>

          <Link
            href="/donate"
            onClick={() => setMenuOpen(false)}
            className="text-white text-xl font-semibold text-emerald-400 hover:text-emerald-300 transition-all"
          >
            💚 Donate
          </Link>

          <a
            href="https://zentrust.hashnode.dev"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="text-white text-xl hover:text-purple-400 transition-all"
          >
            📝 Blog
          </a>

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="text-white text-xl hover:text-purple-400 transition-all"
          >
            📬 Contact
          </Link>

          {/* Informational Mission Pages */}
          <Link
            href="/why"
            onClick={() => setMenuOpen(false)}
            className="text-white text-xl hover:text-purple-400 transition-all"
          >
            🌱 Why We Exist
          </Link>

          <Link
            href="/how"
            onClick={() => setMenuOpen(false)}
            className="text-white text-xl hover:text-purple-400 transition-all"
          >
            ⚙️ How We Work
          </Link>

          {/* Optional internal logged-in areas */}
          <Link
            href="/zenboard"
            onClick={() => setMenuOpen(false)}
            className="text-white text-xl hover:text-purple-400 transition-all"
          >
            🌀 Zenboard
          </Link>

          <Link
            href="/journal"
            onClick={() => setMenuOpen(false)}
            className="text-white text-xl hover:text-purple-400 transition-all"
          >
            ✍️ Journal
          </Link>

          {/* Divider */}
          <div className="border-t border-gray-800 pt-4"></div>

          {/* Auth Action */}
          <button
            onClick={userLoggedIn ? handleSignOut : handleSignIn}
            className="text-gray-300 hover:text-white text-lg transition-all"
          >
            {userLoggedIn ? "Sign Out" : "Sign In"}
          </button>
        </div>
      )}
    </div>
  );
}
