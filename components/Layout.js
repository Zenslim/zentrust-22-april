export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* HEADER — visible on ALL pages */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <a href="/">
            <img
              src="/zentrust-logo-white.png"
              alt="ZenTrust Logo"
              className="h-9 md:h-10 w-auto"
            />
          </a>
          <span className="hidden sm:inline text-xs text-gray-400">
            ZenTrust · 501(c)(3) Public Charity
          </span>
        </div>

        <nav className="flex items-center gap-3 text-xs sm:text-sm">
          <a href="/about" className="hover:text-gray-300">About</a>
          <a href="/what" className="hover:text-gray-300">Programs</a>
          <a
            href="https://zentrust.hashnode.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            Blog
          </a>
          <a href="/contact" className="hover:text-gray-300">Contact</a>
          <a
            href="/donate"
            className="ml-2 px-3 py-1.5 rounded-full bg-emerald-500 text-black font-semibold hover:bg-emerald-600 transition"
          >
            Donate
          </a>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow flex flex-col items-center">
        {children}
      </main>

      {/* FOOTER — visible on ALL pages */}
      <footer className="w-full border-t border-gray-800 mt-10 py-6 text-center text-gray-400 text-xs">
        <p>
          ZenTrust, Inc. · 501(c)(3) Public Charity · EIN: 33-4318487
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-2">
          <a href="/about" className="underline hover:text-white">About</a>
          <a href="/donate" className="underline hover:text-white">Donate</a>
          <a href="/contact" className="underline hover:text-white">Contact</a>
          <a
            href="https://zentrust.hashnode.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            Blog
          </a>
          <a href="/privacy" className="underline hover:text-white">Privacy</a>
          <a href="/terms" className="underline hover:text-white">Terms</a>
          <a href="/donor-rights" className="underline hover:text-white">
            Donor Rights & Refund Policy
          </a>
        </div>
      </footer>
    </div>
  );
}
