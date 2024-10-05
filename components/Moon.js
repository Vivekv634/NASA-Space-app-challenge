import * as THREE from "three";

export function createMoon() {
    const loader = new THREE.TextureLoader();

    // Create a group for the moon to handle its orbit around Earth
    const moonGroup = new THREE.Group();

    // Moon's geometry and material
    const moonRadius = 0.27; // The Moon is 0.27 times the size of Earth
    const moonGeometry = new THREE.SphereGeometry(moonRadius, 32, 32);
    const moonMaterial = new THREE.MeshPhongMaterial({
        map: loader.load("/textures/moon/8k_moon.jpg"), // Moon texture
        bumpScale: 0.05, // Slight bump map for the Moon's surface
    });
    const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);

    // Set the Moon's initial position (distance from Earth is ~384,400 km or ~30 Earth radii)
    moonMesh.position.set(3, 0, 0); // Position the Moon relative to Earth (scaled for the scene)
    moonGroup.add(moonMesh);

    // Function to animate the Moon's orbit around the Earth
    moonGroup.animate = function () {
        moonGroup.rotation.y += 0.00035; // Adjust this speed for a faster or slower orbit
    };

    return moonGroup;
}
