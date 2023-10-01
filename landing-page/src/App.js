import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const FloatingCubes = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    // create scena, camera și renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    // add light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // Adăugăm cuburi
    var geometry = new THREE.SphereGeometry(8.55, 8, 8);
    var bgMaterial = new THREE.MeshStandardMaterial({
      color: 0x161616,
      roughness: 0.45,
      metalness: 0.99,
      side: THREE.BackSide,
    });

    for (let i = 0; i < 10; i++) {
      const cubeSize = Math.random() * 1 + 0.5;
      const sphere = new THREE.Mesh(geometry, bgMaterial);
      sphere.position.x = Math.random() * 10;
      sphere.position.y = Math.random() * 10-2;
      sphere.position.z = Math.random() * 10;
      //cube.scale.set(cubeSize, cubeSize, cubeSize);
      scene.add(sphere);
    }

    // Funcția de animație
    const animate = () => {
      requestAnimationFrame(animate);
      // Plutim cuburile
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.position.y += 0.01;
          if (object.position.y > 10) {
            object.position.y = 0;
          }
        }
      });
      renderer.render(scene, camera);
    };

    // Funcția de redimensionare a canvas-ului la modificarea dimensiunii ferestrei
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    animate();

    // Funcția de cleanup pentru eliminarea evenimentului de redimensionare
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={sceneRef} />;
};

export default FloatingCubes;
