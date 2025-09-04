import '../styles/globals.css'
import { useEffect } from 'react'
import { auth } from '../firebase'
import Header from '@/components/Header'; // ✅ Add this
import Footer from "@/components/Footer"; // ✅ Add this

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        console.log("✅ Signed in as:", user.email || "Anonymous", "| UID:", user.uid)
      } else {
        console.warn("⚠️ No user signed in.")
      }
    })
    return () => unsubscribe()
  }, [])

  return (
    <div className="relative min-h-screen w-full bg-black overflow-x-hidden">
      <Header /> {/* ✅ Header floating always */}
      <Component {...pageProps} />
    </div>
  )
}
