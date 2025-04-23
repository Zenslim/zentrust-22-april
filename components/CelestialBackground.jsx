'use client'

import { useRef, useEffect, useState } from 'react'

export default function CelestialBackground() {
  const videoRef = useRef(null)
  const [fade, setFade] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const checkTime = () => {
      if (video.currentTime > video.duration - 0.8) {
        setFade(true)
      } else if (video.currentTime < 0.2) {
        setFade(false)
      }
    }

    video.addEventListener('timeupdate', checkTime)
    video.play().catch(() => {})

    return () => video.removeEventListener('timeupdate', checkTime)
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
        className={`w-full h-full object-cover transition-opacity duration-1000 ${
          fade ? 'opacity-80' : 'opacity-100'
        }`}
      />
    </div>
  )
}
