import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CelestialBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // ★ Stars
    const starGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    for (let i = 0; i < 100000; i++) {
      starVertices.push((Math.random() - 0.5) * 2000);
      starVertices.push((Math.random() - 0.5) * 2000);
      starVertices.push((Math.random() - 0.5) * 2000);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starMaterial = new THREE.PointsMaterial({
      size: 1,
      color: 0xffffff,
      transparent: true
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // 🪐 Realistic Planet Sequence
    const planetsData = [
      { name: "Earth", url: "https://raw.githubusercontent.com/itsron717/planet-textures/main/earth.jpg" },
      { name: "Jupiter", url: "https://raw.githubusercontent.com/itsron717/planet-textures/main/jupiter.jpg" },
      { name: "Saturn", url: "https://raw.githubusercontent.com/itsron717/planet-textures/main/saturn.jpg" },
      { name: "Pluto", url: "https://raw.githubusercontent.com/itsron717/planet-textures/main/pluto.jpg" }
    ];

    const planets = [];
    const loaders = planetsData.map((planet, index) => {
      return new Promise(resolve => {
        new THREE.TextureLoader().load(planet.url, texture => {
          const geometry = new THREE.SphereGeometry(0.8, 32, 32);
          const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0 });
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(0, 0, 0);
          mesh.scale.set(0.01, 0.01, 0.01);
          mesh.visible = false;
          scene.add(mesh);
          planets.push(mesh);
          resolve();
        });
      });
    });

    Promise.all(loaders).then(() => {
      let current = 0;
      let phase = "fadeIn";
      let clock = 0;

      const animate = () => {
        requestAnimationFrame(animate);

        stars.rotation.y += 0.0007;

        const planet = planets[current];
        if (!planet.visible) planet.visible = true;

        if (phase === "fadeIn") {
          planet.scale.multiplyScalar(1.05);
          planet.material.opacity += 0.02;
          if (planet.material.opacity >= 1) {
            planet.material.opacity = 1;
            phase = "hold";
            clock = 0;
          }
        } else if (phase === "hold") {
          clock++;
          if (clock > 80) {
            phase = "fadeOut";
          }
        } else if (phase === "fadeOut") {
          planet.scale.multiplyScalar(0.95);
          planet.material.opacity -= 0.02;
          if (planet.material.opacity <= 0.05) {
            planet.material.opacity = 0;
            planet.scale.set(0.01, 0.01, 0.01);
            planet.visible = false;
            current = (current + 1) % planets.length;
            phase = "fadeIn";
          }
        }

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
