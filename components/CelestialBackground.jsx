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
    for (let i = 0; i < 100000; i++) {
      starVertices.push((Math.random() - 0.5) * 3000);
      starVertices.push((Math.random() - 0.5) * 3000);
      starVertices.push((Math.random() - 0.5) * 3000);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starMaterial = new THREE.PointsMaterial({
      size: 1,
      color: 0xffffff,
      transparent: true
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Planet textures
    const planetsData = [
      { name: "earth", url: "https://raw.githubusercontent.com/itsron717/planet-textures/main/earth.jpg" },
      { name: "jupiter", url: "https://raw.githubusercontent.com/itsron717/planet-textures/main/jupiter.jpg" },
      { name: "saturn", url: "https://raw.githubusercontent.com/itsron717/planet-textures/main/saturn.jpg" },
      { name: "pluto", url: "https://raw.githubusercontent.com/itsron717/planet-textures/main/pluto.jpg" }
    ];

    const planets = [];
    const loaders = planetsData.map((planet, index) => {
      return new Promise(resolve => {
        new THREE.TextureLoader().load(planet.url, texture => {
          const geometry = new THREE.SphereGeometry(0.3, 32, 32);
          const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0 });
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(0, 0, -5);
          mesh.scale.set(0.001, 0.001, 0.001); // start as dot
          scene.add(mesh);
          planets.push(mesh);
          resolve();
        });
      });
    });

    Promise.all(loaders).then(() => {
      let current = 0;
      const animate = () => {
        requestAnimationFrame(animate);
        stars.rotation.y += 0.0007;

        // Animate planets in sequence
        planets.forEach((planet, i) => {
          const active = i === current;
          const scale = planet.scale.x;

          if (active) {
            if (scale < 1) {
              planet.scale.multiplyScalar(1.05);
              planet.material.opacity = Math.min(1, planet.material.opacity + 0.02);
            } else {
              setTimeout(() => {
                planet.scale.set(0.001, 0.001, 0.001);
                planet.material.opacity = 0;
                current = (current + 1) % planets.length;
              }, 1000);
            }
          } else {
            planet.scale.set(0.001, 0.001, 0.001);
            planet.material.opacity = 0;
          }
        });

        renderer.render(scene, camera);
      };

      animate();
    });

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
