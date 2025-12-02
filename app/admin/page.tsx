"use client";

import dynamic from "next/dynamic";

// TODO: Add App Router metadata for the admin page if needed.

const TinaAdmin = dynamic(async () => {
  const { TinaAdmin } = await import("tinacms");
  const tinaConfig = (await import("../../tina/config")).default;

  return function Admin() {
    return <TinaAdmin config={tinaConfig} />;
  };
}, { ssr: false });

export default function Page() {
  return (
    <>
      <TinaAdmin />
    </>
  );
}
