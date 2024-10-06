import * as THREE from "three";
import { getFresnelMat } from "@/utils/getFresnelMat";
import { createMoon } from "./Moon";

export function createEarth(camera) {
  const loader = new THREE.TextureLoader();
  const earthGroup = new THREE.Group();

  earthGroup.rotation.z = (-23.4 * Math.PI) / 180;

  const detail = 12;
  const geometry = new THREE.IcosahedronGeometry(1, detail);

  const earthMaterial = new THREE.MeshPhongMaterial({
    map: loader.load("/textures/earth/8k_earth_daymap.jpg"),
    bumpScale: 0.04,
  });
  earthMaterial.map.colorSpace = THREE.SRGBColorSpace;
  const earthMesh = new THREE.Mesh(geometry, earthMaterial);
  earthGroup.add(earthMesh);

  const lightsMaterial = new THREE.MeshBasicMaterial({
    map: loader.load("/textures/earth/8k_earth_nightmap.jpg"),
    blending: THREE.AdditiveBlending,
  });
  const lightsMesh = new THREE.Mesh(geometry, lightsMaterial);
  earthGroup.add(lightsMesh);

  const cloudsMaterial = new THREE.MeshStandardMaterial({
    map: loader.load("/textures/earth/8k_earth_clouds.jpg"),
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });
  const cloudsMesh = new THREE.Mesh(geometry, cloudsMaterial);
  cloudsMesh.scale.setScalar(1.003);
  earthGroup.add(cloudsMesh);

  const fresnelMaterial = getFresnelMat();
  const glowMesh = new THREE.Mesh(geometry, fresnelMaterial);
  glowMesh.scale.setScalar(1.01);
  earthGroup.add(glowMesh);

  const moonGroup = createMoon();
  earthGroup.add(moonGroup);

  earthGroup.animate = function () {
    earthMesh.rotation.y += 0.002;
    lightsMesh.rotation.y += 0.002;
    cloudsMesh.rotation.y += 0.002;
    glowMesh.rotation.y += 0.002;
    moonGroup.animate();
  };

  // Add onClick event handler
  earthGroup.onClick = function (event) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Convert the mouse click coordinates into normalized device coordinates (NDC)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Set the raycaster from the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Check for intersections between the ray and the Earth mesh
    const intersects = raycaster.intersectObject(earthMesh, true);

    if (intersects.length > 0) {
      console.log("Earth clicked!");
      window.open("https://en.wikipedia.org/wiki/Earth", "_blank");
    }
  };

  // Add event listener
  window.addEventListener("click", earthGroup.onClick);

  return earthGroup;
}

