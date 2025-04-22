import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CelestialBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // ✨ Stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 100000;
    const positions = [];
    for (let i = 0; i < starsCount; i++) {
      positions.push((Math.random() - 0.5) * 200);
      positions.push((Math.random() - 0.5) * 200);
      positions.push((Math.random() - 0.5) * 200);
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const starMaterial = new THREE.PointsMaterial({
  size: 0.4,
  color: 0xffffff,
  sizeAttenuation: true,
  transparent: true,
  opacity: 0.8
});
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // 🌍 Planets
    const planetUrls = [
      "https://raw.githubusercontent.com/itsron717/planet-textures/main/earth.jpg",
      "https://raw.githubusercontent.com/itsron717/planet-textures/main/mars.jpg",
      "https://raw.githubusercontent.com/itsron717/planet-textures/main/jupiter.jpg",
      "https://raw.githubusercontent.com/itsron717/planet-textures/main/saturn.jpg"
    ];

    const planets = [];
    const loader = new THREE.TextureLoader();

    Promise.all(
      planetUrls.map((url, i) =>
        new Promise((resolve) => {
          loader.load(
            url,
            (texture) => {
              const geometry = new THREE.SphereGeometry(0.6, 32, 32);
              const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0 });
              const mesh = new THREE.Mesh(geometry, material);
              mesh.scale.set(0.01, 0.01, 0.01);
              mesh.visible = false;
              scene.add(mesh);
              planets.push(mesh);
              resolve();
            },
            undefined,
            () => {
              // fallback color if texture fails
              const geometry = new THREE.SphereGeometry(0.6, 32, 32);
              const material = new THREE.MeshBasicMaterial({ color: 0x9999ff });
              const mesh = new THREE.Mesh(geometry, material);
              mesh.scale.set(0.01, 0.01, 0.01);
              mesh.visible = false;
              scene.add(mesh);
              planets.push(mesh);
              resolve();
            }
          );
        })
      )
    ).then(() => {
      let current = 0;
      let phase = "fadeIn";
      let counter = 0;

      const animate = () => {
        requestAnimationFrame(animate);

        stars.rotation.y += 0.0005;

        const planet = planets[current];
        if (!planet.visible) planet.visible = true;

        if (phase === "fadeIn") {
          planet.scale.multiplyScalar(1.05);
          planet.material.opacity += 0.02;
          if (planet.material.opacity >= 1) {
            phase = "hold";
            counter = 0;
          }
        } else if (phase === "hold") {
          counter++;
          if (counter > 60) {
            phase = "fadeOut";
          }
        } else if (phase === "fadeOut") {
          planet.scale.multiplyScalar(0.95);
          planet.material.opacity -= 0.02;
          if (planet.material.opacity <= 0.05) {
            planet.visible = false;
            planet.scale.set(0.01, 0.01, 0.01);
            planet.material.opacity = 0;
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
