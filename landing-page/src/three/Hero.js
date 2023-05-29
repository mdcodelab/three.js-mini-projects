import React from 'react';
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
    //renderer.setClearColor(255, 0, 0, 1); 
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const geometry = new THREE.BoxGeometry(1, 1,1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const mesh = new THREE.Mesh(geometry, material); //cube
    scene.add(mesh);

    camera.position.z = 5;

    const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10); //x, y, nr.div X, nr. div y
    const planeMaterial = new THREE.MeshBasicMaterial({color: "#ff0000", side: THREE.DoubleSide});
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial); 
    scene.add(planeMesh);

    console.log(planeGeometry);
    const animate = function () {
      requestAnimationFrame(animate);

      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
      planeMesh.rotation.x += 0.01;
      planeMesh.rotation.y += 0.01;
      
      

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      renderer.dispose();
      scene.remove(mesh);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Hero;

