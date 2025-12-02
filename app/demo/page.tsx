"use client";

import dynamic from "next/dynamic";

// Dynamically import Zenboard without SSR
const ZenboardClient = dynamic(() => import("@/components/ZenboardClient"), {
  ssr: false,
});

export default function Page() {
  return (
    <>
      <div className="min-h-screen bg-black">
        <ZenboardClient />
      </div>
    </>
  );
}
