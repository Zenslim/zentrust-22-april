'use client'

export default function CelestialBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        style={{ pointerEvents: 'none' }}
      >
        <source src="/space.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
