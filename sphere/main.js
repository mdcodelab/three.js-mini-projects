import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { gsap } from "gsap";

//scene
const scene = new THREE.Scene();

//sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//create sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material=new THREE.MeshStandardMaterial({
    color: "lightblue",
    roughness: 0.5
})
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//light
const light = new THREE.PointLight("#fff", 1, 100);
light.position.set(0, 10, 10); //x, y, z
light.intensity=1.25;
scene.add(light);

//camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z=20;
scene.add(camera);

//render
const canvas=document.querySelector(".canvas");
const renderer= new THREE.WebGL1Renderer({canvas: canvas})

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

//resize
window.addEventListener("resize", () => {
  //update the sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height); //canvas size
}) 

// controls;
const controls = new OrbitControls(camera, canvas);
controls.enableDampening = true;
controls.enablePan=false;
controls.enableZoom=false;
controls.autoRotate=true;
controls.autoRotateSpeed=2;

const loop = () => {
//mesh.position.x+=0.2;
controls.update();
  requestAnimationFrame(loop);
  renderer.render(scene, camera);
};

loop();


//gsap
//timeline magic
const tl=gsap.timeline({defaults: {duration: 1}}); // synchronises multiple animations together
tl.fromTo(mesh.scale, {z: 0, y: 0, x: 0}, {z: 1, y: 1, x: 1});
tl.fromTo("nav", {y: "-100%"}, {y: "0%"})
tl.fromTo(".title", { opacity: "0" }, { opacity: "1" });
 

//mouse animation color
let rgb=[];
let mouseDown=false;
window.addEventListener ("mousedown", ()=> mouseDown=true)
window.addEventListener("mouseup", () => (mouseDown = false));

window.addEventListener("pointermove", (e) => {
if(mouseDown) {
    rgb = [
      Math.round(e.pageX / sizes.width) * 255,
      Math.round(e.pageY/sizes.height), 150
    ];
    let newColor = new THREE.Color(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
    gsap.to(mesh.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
    });
}
})
l


l





