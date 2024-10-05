import * as THREE from 'three';

export function createUranus() {
    const uranusGroup = new THREE.Group();

    // Uranus geometry
    const uranusGeometry = new THREE.SphereGeometry(5, 32, 32);

    // Load texture for Uranus
    const textureLoader = new THREE.TextureLoader();
    const uranusTexture = textureLoader.load('/textures/uranus/2k_uranus.jpg'); // Replace with the correct path

    // Uranus material
    const uranusMaterial = new THREE.MeshBasicMaterial({
        map: uranusTexture,
    });

    const uranusMesh = new THREE.Mesh(uranusGeometry, uranusMaterial);

    // Tilt Uranus by 98 degrees to represent its unique axis tilt
    uranusMesh.rotation.x = Math.PI / 2;
    uranusMesh.rotation.y = Math.PI / 4; // Adjust as per Uranus's axial tilt

    uranusGroup.add(uranusMesh);

    return uranusGroup;
}
