import * as THREE from "three";

export function createSun() {
  const loader = new THREE.TextureLoader();
  const sunGroup = new THREE.Group();

  // Geometry for Sun
  const detail = 12;
  const geometry = new THREE.IcosahedronGeometry(3, detail); // Slightly larger Sun

  // Load Day Map (Sun texture) with error callback for debugging
  const sunMaterial = new THREE.MeshPhongMaterial({
    map: loader.load(
      "/textures/sun/8k_sun.jpg"
    ),
    emissive: new THREE.Color(0xff7b1f), // Add emissive lighting for glow
    emissiveIntensity: 1.2, // Increase intensity of emissive light for a glowing effect
    bumpScale: 0.02, // Slight surface detail (optional)
  });

  sunMaterial.map.colorSpace = THREE.SRGBColorSpace; // Ensure correct color space

  const sunMesh = new THREE.Mesh(geometry, sunMaterial);
  sunGroup.add(sunMesh);

  // Function to animate the Sun's rotation
  sunGroup.animate = function () {
    sunMesh.rotation.y += 0.002; // Sun rotates slowly
  };

  return sunGroup;
}
