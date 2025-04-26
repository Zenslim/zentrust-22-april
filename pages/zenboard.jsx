import dynamic from 'next/dynamic';

// Dynamically load ZenboardClient
const ZenboardClient = dynamic(() => import('@/components/ZenboardClient'), { ssr: false });

export default function ZenboardPage() {
  return <ZenboardClient />;
}
