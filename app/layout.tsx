import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ZenTrust | Regenerative nonprofit for resilient futures',
  description:
    'ZenTrust is a 501(c)(3) regenerating watersheds, funding land stewards, and backing climate-positive research.',
  openGraph: {
    title: 'ZenTrust | Regenerative nonprofit for resilient futures',
    description:
      'ZenTrust is a 501(c)(3) regenerating watersheds, funding land stewards, and backing climate-positive research.',
    url: 'https://zentrust.org',
    siteName: 'ZenTrust',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZenTrust | Regenerative nonprofit for resilient futures',
    description:
      'ZenTrust is a 501(c)(3) regenerating watersheds, funding land stewards, and backing climate-positive research.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
