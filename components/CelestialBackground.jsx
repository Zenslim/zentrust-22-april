import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CelestialBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Stars
    const starGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    for (let i = 0; i < 20000; i++) {
      starVertices.push((Math.random() - 0.5) * 2000);
      starVertices.push((Math.random() - 0.5) * 2000);
      starVertices.push((Math.random() - 0.5) * 2000);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starTexture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/disc.png');
    const starMaterial = new THREE.PointsMaterial({
      size: 1.2,
      map: starTexture,
      transparent: true,
      alphaTest: 0.5,
      color: 0xffffff
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Planets
    const planetColors = [0xff69b4, 0x66ccff, 0xffff99, 0x99ffcc];
    const planets = [];

    for (let i = 0; i < 4; i++) {
      const geometry = new THREE.SphereGeometry(0.4 + Math.random() * 0.3, 32, 32);
      const material = new THREE.MeshBasicMaterial({ color: planetColors[i % planetColors.length] });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(
        Math.random() * 8 - 4,
        Math.random() * 6 - 3,
        Math.random() * -10 - 2
      );
      scene.add(sphere);
      planets.push(sphere);
    }

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);
      stars.rotation.y += 0.0007;

      planets.forEach((planet, idx) => {
        planet.rotation.y += 0.005;
        planet.position.y += Math.sin(Date.now() * 0.001 + idx) * 0.0015;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }} />;
}

