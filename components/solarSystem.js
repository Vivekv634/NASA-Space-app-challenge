import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { createEarth } from "./Earth";
import getStarfield from "@/utils/getStarField";

const w = window.innerWidth;
const h = window.innerHeight;

export function createSolarSystem() {
  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);

  // Position camera at an angle (not just along the z-axis)
  camera.position.set(5, 3, 10); // Adjust these values to place the camera at an angle
  camera.lookAt(new THREE.Vector3(0, 0, 0)); // Make sure camera looks at the center of the solar system (Earth's position)

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(w, h);
  document.body.appendChild(renderer.domElement);

  // Tone mapping and color management
  THREE.ColorManagement.enabled = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

  // Orbit Controls
  new OrbitControls(camera, renderer.domElement);

  // Add Earth to the scene
  const earthGroup = createEarth();
  earthGroup.position.set(0, 0, 0);
  scene.add(earthGroup);

  // Add starfield to the scene
  const stars = getStarfield({ numStars: 20000 });
  scene.add(stars);

  // Lighting setup
  const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
  sunLight.position.set(0, 0, 0);
  scene.add(sunLight);

  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);

    // Animate Earth rotation
    earthGroup.animate();

    // Rotate stars slowly for effect
    stars.rotation.y -= 0.0002;

    renderer.render(scene, camera);
  };

  animate();

  // Handle window resize
  const handleWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener("resize", handleWindowResize, false);

  // Clean up (optional, depending on your setup)
  return () => {
    window.removeEventListener("resize", handleWindowResize);
    document.body.removeChild(renderer.domElement);
  };
}
