import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CelestialBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // ★ Twinkling Starfield
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 100000;
    const starVertices = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      starVertices[i] = (Math.random() - 0.5) * 3000;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starVertices, 3));
    const starMaterial = new THREE.PointsMaterial({
      size: 1,
      color: 0xffffff
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // 🪐 Realistic Planetary Sequence
    const planetURLs = [
      "https://raw.githubusercontent.com/itsron717/planet-textures/main/mercury.jpg",
      "https://raw.githubusercontent.com/itsron717/planet-textures/main/venus.jpg",
      "https://raw.githubusercontent.com/itsron717/planet-textures/main/earth.jpg",
      "https://raw.githubusercontent.com/itsron717/planet-textures/main/mars.jpg",
      "https://raw.githubusercontent.com/itsron717/planet-textures/main/jupiter.jpg",
      "https://raw.githubusercontent.com/itsron717/planet-textures/main/saturn.jpg",
      "https://raw.githubusercontent.com/itsron717/planet-textures/main/uranus.jpg",
      "https://raw.githubusercontent.com/itsron717/planet-textures/main/neptune.jpg",
      "https://raw.githubusercontent.com/itsron717/planet-textures/main/pluto.jpg"
    ];

    const planets = [];
    const loader = new THREE.TextureLoader();

    Promise.all(
      planetURLs.map(url =>
        new Promise(resolve => {
          loader.load(url, texture => {
            const geometry = new THREE.SphereGeometry(0.6, 32, 32);
            const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
            const planet = new THREE.Mesh(geometry, material);
            planet.material.opacity = 0;
            planet.scale.set(0.01, 0.01, 0.01);
            planet.visible = false;
            scene.add(planet);
            planets.push(planet);
            resolve();
          });
        })
      )
    ).then(() => {
      let current = 0;
      let phase = "fadeIn";
      let clock = 0;

      const animate = () => {
        requestAnimationFrame(animate);

        // Starfield twinkle
        stars.rotation.y += 0.0005;

        const planet = planets[current];
        if (!planet.visible) planet.visible = true;

        if (phase === "fadeIn") {
          planet.scale.multiplyScalar(1.06);
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
    window.addEventListener("resize", handleResize);

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }} />;
}
