import * as THREE from 'three';

export function createMars() {
    const marsGroup = new THREE.Group();

    // Mars geometry
    const marsGeometry = new THREE.SphereGeometry(0.7, 32, 32); // Size can be adjusted

    // Load texture for Mars
    const textureLoader = new THREE.TextureLoader();
    const marsTexture = textureLoader.load('/textures/mars/8k_mars.jpg'); // Replace with the correct path to your texture image

    // Mars material
    const marsMaterial = new THREE.MeshBasicMaterial({
        map: marsTexture,
    });

    const marsMesh = new THREE.Mesh(marsGeometry, marsMaterial);

    // Mars has a slight axial tilt
    marsMesh.rotation.x = 0.2; // slight tilt for realism

    marsGroup.add(marsMesh);

    return marsGroup;
}
