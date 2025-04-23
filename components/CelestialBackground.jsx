'use client'

import { useRef, useEffect } from 'react'

export default function CelestialBackground() {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn('Autoplay prevented:', error)
        })
      }
    }
  }, [])

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden bg-black z-0">
      <video
        ref={videoRef}
        src="/space.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover opacity-60"
      />
    </div>
  )
}
