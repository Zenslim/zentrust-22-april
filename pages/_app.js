import "../styles/globals.css";
import { useEffect } from "react";
import { auth } from "../firebase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ✅ TinaCMS imports
import { TinaEditProvider, TinaCMS } from "tinacms";

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
    <TinaEditProvider
      editMode={pageProps?.editMode}
      tinaConfig={pageProps?.tinaConfig}
    >
      {/* Entire site layout */}
      <div className="relative min-h-screen w-full bg-black text-white flex flex-col overflow-x-hidden">

        {/* Global Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1">
          <Component {...pageProps} />
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </TinaEditProvider>
  );
}
