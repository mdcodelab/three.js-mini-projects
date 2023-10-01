import React from "react";
import * as THREE from "three";

const Hero = () => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    camera.position.z = 5;

    // Plane
    const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10);
    const planeMaterial = new THREE.MeshPhongMaterial({
      color: "red", side: THREE.DoubleSide,
    });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(planeMesh);
    console.log(planeMesh);

    // Light
    const light = new THREE.DirectionalLight("white", 1);
    light.position.set(0, 0, 1);
    scene.add(light);

    // Animation loop
    const animate = function () {
      requestAnimationFrame(animate);

      // Rotate the plane
      //planeMesh.rotation.x += 0.01;
      //planeMesh.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      renderer.dispose();
      scene.remove(planeMesh);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Hero;
