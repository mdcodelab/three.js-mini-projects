import React, { useRef, useEffect } from "react";
import "./App.css";
import * as THREE from "three";

function App() {
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGL1Renderer({
      canvas: sceneRef.current,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);
    renderer.render(scene, camera);

    
  }, []);

  return <canvas ref={sceneRef} id="canvas" />;
}

export default App;
