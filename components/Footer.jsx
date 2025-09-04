// components/Footer.jsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-6 mt-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        {/* Left side */}
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} ZenTrust, Inc. · 501(c)(3) nonprofit (EIN: 33-4318487)
        </p>

        {/* Right side */}
        <div className="flex space-x-6 mt-4 md:mt-0">
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
