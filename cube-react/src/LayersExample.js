import React from 'react';
import * as THREE from "three";
import { useEffect, useRef } from "react";


const LayersExample = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
  
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, ///default
      window.innerWidth / window.innerHeight,  //aspect ratio
      0.1,  
      1000
    );

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setClearColor(0, 0, 0, 1);


    renderer.setSize(window.innerWidth, window.innerHeight);  

    const geometry = new THREE.BoxGeometry(2, 2, 2); //width, height, thickness
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x00ff00,
      side: THREE.DoubleSide,
      flatShading: true
     });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    console.log(cube.geometry.attributes.position.array);
    let array=cube.geometry.attributes.position.array;
    for(let i = 0; i <array.length; i+=3) {   
      console.log(array[i]);
      const x = array[i];
      const y = array[i+1];
      const z = array[i+2];

      array[i+2]=x+3  //moving to the right 3 positions
    }

    const light = new THREE.DirectionalLight(0xffffff, 1)  //color of the light, the intensity of the light
      light.position.set(0, 0, 1); //x, y, z
      scene.add(light);


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

  return <canvas ref={canvasRef} style={{backgroundColor: "black"}}/>;
};

export default LayersExample;
