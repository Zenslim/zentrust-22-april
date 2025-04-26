import dynamic from 'next/dynamic';

// Dynamically import Zenboard without SSR
const Zenboard = dynamic(() => import('@/pages/zenboard'), { ssr: false });

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-black">
      <Zenboard demoMode={true} />
    </div>
  );
}
