import "../styles/globals.css";
import { useEffect } from "react";
import { auth } from "../firebase";
import Header from "@/components/Header";
import Footer from "@/components/Footer"; // ✅ NEW

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(
          "✅ Signed in as:",
          user.email || "Anonymous",
          "| UID:",
          user.uid
        );
      } else {
        console.warn("⚠️ No user signed in.");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-black text-white flex flex-col overflow-x-hidden">
      {/* Global header on every page */}
      <Header />

      {/* Page content */}
      <main className="flex-1">
        <Component {...pageProps} />
      </main>

      {/* Global footer on every page */}
      <Footer />
    </div>
  );
}
