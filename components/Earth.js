import * as THREE from "three";
import { getFresnelMat } from "@/utils/getFresnelMat";
import { createMoon } from "./Moon";

export function createEarth() {
  const loader = new THREE.TextureLoader();
  const earthGroup = new THREE.Group();

  // Earth's axial tilt
  earthGroup.rotation.z = (-23.4 * Math.PI) / 180;

  // Geometry for Earth
  const detail = 12;
  const geometry = new THREE.IcosahedronGeometry(1, detail);

  // Day Map (Earth texture)
  const earthMaterial = new THREE.MeshPhongMaterial({
    map: loader.load("/textures/earth/8k_earth_daymap.jpg"),
    bumpScale: 0.04,
  });
  earthMaterial.map.colorSpace = THREE.SRGBColorSpace;
  const earthMesh = new THREE.Mesh(geometry, earthMaterial);
  earthGroup.add(earthMesh);

  // Night Lights Map
  const lightsMaterial = new THREE.MeshBasicMaterial({
    map: loader.load("/textures/earth/8k_earth_nightmap.jpg"),
    blending: THREE.AdditiveBlending,
  });
  const lightsMesh = new THREE.Mesh(geometry, lightsMaterial);
  earthGroup.add(lightsMesh);

  // Clouds Map
  const cloudsMaterial = new THREE.MeshStandardMaterial({
    map: loader.load("/textures/earth/8k_earth_clouds.jpg"),
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });
  const cloudsMesh = new THREE.Mesh(geometry, cloudsMaterial);
  cloudsMesh.scale.setScalar(1.003); // Slightly larger to create cloud effect
  earthGroup.add(cloudsMesh);

  // Glow effect using Fresnel shading
  const fresnelMaterial = getFresnelMat();
  const glowMesh = new THREE.Mesh(geometry, fresnelMaterial);
  glowMesh.scale.setScalar(1.01); // Slightly larger for glow effect
  earthGroup.add(glowMesh);

  // Add the Moon and its orbit around Earth
  const moonGroup = createMoon();
  earthGroup.add(moonGroup);

  // Function to animate the Earth rotation and Moon's orbit
  earthGroup.animate = function () {
    earthMesh.rotation.y += 0.002; // Earth rotates slowly
    lightsMesh.rotation.y += 0.002; // Night lights rotate with Earth
    cloudsMesh.rotation.y += 0.0023; // Clouds rotate slightly faster
    glowMesh.rotation.y += 0.002; // Glow effect rotates with Earth
    moonGroup.animate(); // Moon orbits around the Earth
  };

  return earthGroup;
}
