import * as THREE from 'three';

export function createMercury() {
    const mercuryGroup = new THREE.Group();

    // Mercury geometry
    const mercuryGeometry = new THREE.SphereGeometry(0.6, 32, 32); // Mercury's radius is smaller than Earth's

    // Load texture for Mercury
    const textureLoader = new THREE.TextureLoader();
    const mercuryTexture = textureLoader.load('/textures/mercury/8k_mercury.jpg'); // Replace with correct texture path

    // Mercury material
    const mercuryMaterial = new THREE.MeshBasicMaterial({
        map: mercuryTexture,
    });

    const mercuryMesh = new THREE.Mesh(mercuryGeometry, mercuryMaterial);

    // Mercury has little to no axial tilt, so no need for significant rotation adjustment
    mercuryMesh.rotation.x = 0;

    mercuryGroup.add(mercuryMesh);

    return mercuryGroup;
}
