import dynamic from "next/dynamic";

const TinaAdmin = dynamic(() => import("../../../admin"), { ssr: false });

export default function AdminPage() {
  return <TinaAdmin />;
}
