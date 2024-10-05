import * as THREE from 'three';

export function createNeptune() {
    const neptuneGroup = new THREE.Group();

    // Neptune geometry
    const neptuneGeometry = new THREE.SphereGeometry(4, 32, 32);

    // Load texture for Neptune
    const textureLoader = new THREE.TextureLoader();
    const neptuneTexture = textureLoader.load('/textures/neptune/2k_neptune.jpg'); // Replace with the correct path

    // Neptune material
    const neptuneMaterial = new THREE.MeshBasicMaterial({
        map: neptuneTexture,
    });

    const neptuneMesh = new THREE.Mesh(neptuneGeometry, neptuneMaterial);

    // Slight tilt for Neptune (it's less tilted compared to Uranus)
    neptuneMesh.rotation.x = Math.PI / 2;
    neptuneMesh.rotation.y = Math.PI / 8; // Adjust to reflect Neptune's axial tilt

    neptuneGroup.add(neptuneMesh);

    return neptuneGroup;
}
