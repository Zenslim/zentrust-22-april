'use client'

import { useEffect, useRef } from 'react'

export default function CelestialBackground() {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch((e) => {
        console.error('Video failed to autoplay:', e)
      })
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-50 overflow-hidden bg-black">
      <video
        ref={videoRef}
        src="/space.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover pointer-events-none opacity-80"
      />
    </div>
  )
}
