import * as THREE from 'three';

export function createVenus() {
    const venusGroup = new THREE.Group();

    // Venus geometry
    const venusGeometry = new THREE.SphereGeometry(1, 32, 32); // Venus is larger than Mercury

    // Load texture for Venus
    const textureLoader = new THREE.TextureLoader();
    const venusTexture = textureLoader.load('/textures/venus/8k_venus_surface.jpg'); // Replace with the correct path to your texture image

    // Venus material
    const venusMaterial = new THREE.MeshBasicMaterial({
        map: venusTexture,
    });

    const venusMesh = new THREE.Mesh(venusGeometry, venusMaterial);

    // Venus has a slight axial tilt
    venusMesh.rotation.x = 0.3; // slight tilt for realism

    venusGroup.add(venusMesh);

    return venusGroup;
}
