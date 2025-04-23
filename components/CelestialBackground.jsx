'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import PlanetMessenger from './PlanetMessenger'
import TwinklingStars from './TwinklingStars'

export default function CelestialBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-2]"
      >
        <source src="/space1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 3D Canvas Layer */}
      <div className="absolute top-0 left-0 w-full h-full z-[-1]">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[0, 0, 10]} intensity={1.2} />
          <Stars radius={100} depth={50} count={1000} factor={4} fade />
          <TwinklingStars />
          <PlanetMessenger />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
    </div>
  )
}
