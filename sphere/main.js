import * as THREE from "three";

//scene
const scene = new THREE.Scene();

//create sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material=new THREE.MeshStandardMaterial({
    color: "blue"
})
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//light
const light = new THREE.PointLight("#fff", 1, 100);
light.position.set(0, 10, 10);
scene.add(light);

//camera
const camera = new THREE.PerspectiveCamera(45, 800 / 600, 0.1, 100);
camera.position.z=20;
scene.add(camera);


//render
const canvas=document.querySelector(".canvas");
const renderer= new THREE.WebGL1Renderer({canvas})

renderer.setSize(800, 600);
renderer.render(scene, camera);

