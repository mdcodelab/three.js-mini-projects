import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const FloatingCubes = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    // Creăm scena, cameră și renderer
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

    // Adăugăm iluminare
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // Adăugăm cuburi
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

    for (let i = 0; i < 10; i++) {
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.x = Math.random() * 10 - 5;
      cube.position.y = Math.random() * 10;
      cube.position.z = Math.random() * 10 - 5;
      scene.add(cube);
    }

    // Funcția de animație
    const animate = () => {
      requestAnimationFrame(animate);
      // Rotim cuburile
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.rotation.x += 0.01;
          object.rotation.y += 0.01;
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
