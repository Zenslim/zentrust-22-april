import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-6 mt-12 border-t border-gray-800">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">

        {/* Left side */}
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} ZenTrust, Inc. · 501(c)(3) nonprofit (EIN: 33-4318487)
        </p>

        {/* Right side */}
        <div className="flex flex-wrap gap-6 mt-4 md:mt-0 text-sm justify-center md:justify-end">

          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>

          <Link href="/donate" className="hover:text-white transition-colors">
            Donate
          </Link>

          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>

          <a
            href="https://zentrust.hashnode.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Blog
          </a>

          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>

          <Link href="/terms" className="hover:text-white transition-colors">
            Terms of Service
          </Link>

          <Link href="/donor-rights" className="hover:text-white transition-colors">
            Donor Rights
          </Link>
        </div>
      </div>
    </footer>
  );
}
