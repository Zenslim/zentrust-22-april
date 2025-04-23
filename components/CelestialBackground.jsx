'use client'

import { useRef, useEffect, useState } from 'react'

export default function CelestialBackground() {
  const primaryRef = useRef(null)
  const secondaryRef = useRef(null)
  const [useSecondary, setUseSecondary] = useState(false)

  useEffect(() => {
    const video = primaryRef.current
    if (!video) return

    const duration = video.duration || 1
    let fadeStarted = false

    const loopWatcher = setInterval(() => {
      if (video.currentTime > duration - 2 && !fadeStarted) {
        fadeStarted = true
        const next = secondaryRef.current
        next.currentTime = 0
        next.play()
        setUseSecondary(true)
        setTimeout(() => {
          fadeStarted = false
          const swap = primaryRef.current
          primaryRef.current = secondaryRef.current
          secondaryRef.current = swap
          setUseSecondary(false)
        }, 1000)
      }
    }, 500)

    video.play().catch(() => {})
    return () => clearInterval(loopWatcher)
  }, [])

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden bg-black z-0">
      <video
        ref={primaryRef}
        src="/space.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover opacity-100 transition-opacity duration-1000"
      />
      <video
        ref={secondaryRef}
        src="/space.mp4"
        muted
        playsInline
        className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ${
          useSecondary ? 'opacity-60' : 'opacity-0'
        }`}
      />
    </div>
  )
}
