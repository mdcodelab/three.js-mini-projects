import React from 'react';
import * as THREE from "three";
import { useEffect, useRef } from "react";





const LayersExample = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
  
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setClearColor(255, 0, 0, 1);


    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      renderer.dispose();
      scene.remove(cube);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default LayersExample;

