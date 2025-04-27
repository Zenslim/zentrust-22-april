'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiMenu, FiX, FiUser } from 'react-icons/fi'; // feather icons
import { auth } from '@/firebase'; // adjust if your firebase path is different
import { signOut } from 'firebase/auth';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/signin'); // your actual signin page
  };

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/');
  };

  const userLoggedIn = false; // 🔥 TODO: replace with real auth state detection later

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center space-x-4">
      
      {/* Sign In / Profile Icon */}
      <button
        onClick={userLoggedIn ? handleSignOut : handleSignIn}
        className="text-white hover:text-purple-400 transition-all"
      >
        <FiUser size={24} />
      </button>

      {/* Hamburger Menu */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-white hover:text-purple-400 transition-all"
      >
        {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
      </button>

      {/* Slide Out Menu */}
      {menuOpen && (
        <div className="fixed top-0 right-0 w-64 h-full bg-black bg-opacity-90 backdrop-blur-md p-8 flex flex-col space-y-6 shadow-xl animate-fade-in z-40">
          <Link href="/" onClick={() => setMenuOpen(false)} className="text-white text-xl flex items-center gap-2 hover:text-purple-400 transition-all">
            🏠 Home
          </Link>
          <Link href="/zenboard" onClick={() => setMenuOpen(false)} className="text-white text-xl flex items-center gap-2 hover:text-purple-400 transition-all">
            🌌 Zenboard
          </Link>
          <Link href="/journal" onClick={() => setMenuOpen(false)} className="text-white text-xl flex items-center gap-2 hover:text-purple-400 transition-all">
            ✍️ Journal
          </Link>
          <Link href="/why" onClick={() => setMenuOpen(false)} className="text-white text-xl flex items-center gap-2 hover:text-purple-400 transition-all">
            🌱 Why We Exist
          </Link>
          <Link href="/how" onClick={() => setMenuOpen(false)} className="text-white text-xl flex items-center gap-2 hover:text-purple-400 transition-all">
            ⚙️ How We Work
          </Link>
          <Link href="/what" onClick={() => setMenuOpen(false)} className="text-white text-xl flex items-center gap-2 hover:text-purple-400 transition-all">
            🎁 What We Offer
          </Link>
          <a
            href="https://blog.zentrust.world/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="text-white text-xl flex items-center gap-2 hover:text-purple-400 transition-all"
          >
            📝 Blog
          </a>
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="text-white text-xl flex items-center gap-2 hover:text-purple-400 transition-all">
            📬 Contact
          </Link>
        </div>
      )}
    </div>
  );
}
