export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-800 mt-8 py-6 text-center text-gray-400 text-xs sm:text-sm">
      <p>
        ZenTrust, Inc. · 501(c)(3) Public Charity · EIN: 33-4318487 · Donations
        are tax-deductible as allowed by law.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mt-2">
        <a href="/about" className="underline hover:text-white">
          About
        </a>
        <a href="/donate" className="underline hover:text-white">
          Donate
        </a>
        <a href="/contact" className="underline hover:text-white">
          Contact
        </a>
        <a
          href="https://zentrust.hashnode.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white"
        >
          Blog
        </a>
        <a href="/privacy" className="underline hover:text-white">
          Privacy Policy
        </a>
        <a href="/terms" className="underline hover:text-white">
          Terms of Service
        </a>
        <a href="/donor-rights" className="underline hover:text-white">
          Donor Rights &amp; Refund Policy
        </a>
      </div>
    </footer>
  );
}
