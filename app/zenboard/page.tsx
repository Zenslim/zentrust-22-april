"use client";

import dynamic from "next/dynamic";

const ZenboardClient = dynamic(() => import("@/components/ZenboardClient"), {
  ssr: false,
});

export default function Page() {
  return (
    <>
      <ZenboardClient />
    </>
  );
}
