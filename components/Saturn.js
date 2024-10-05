import * as THREE from 'three';

export function createSaturn() {
    const saturnGroup = new THREE.Group();

    // Saturn's geometry
    const saturnGeometry = new THREE.SphereGeometry(6, 32, 32);

    // Load texture for Saturn
    const textureLoader = new THREE.TextureLoader();
    const saturnTexture = textureLoader.load('/textures/saturn/8k_saturn.jpg'); // Replace with correct path

    // Saturn's material
    const saturnMaterial = new THREE.MeshBasicMaterial({
        map: saturnTexture,
    });

    const saturnMesh = new THREE.Mesh(saturnGeometry, saturnMaterial);
    saturnGroup.add(saturnMesh);

    // Saturn's ring geometry
    const ringInnerRadius = 0.1;
    const ringOuterRadius = 0.2;
    const ringGeometry = new THREE.RingGeometry(ringInnerRadius, ringOuterRadius, 64);

    // Ring material
    const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        map: textureLoader.load('/textures/saturn/8k_saturn_ring.png'), // Saturn ring texture
        transparent: true,
    });

    const saturnRing = new THREE.Mesh(ringGeometry, ringMaterial);
    saturnRing.rotation.x = Math.PI / 2; // Rotate the ring to be horizontal around Saturn
    saturnGroup.add(saturnRing);

    return saturnGroup;
}
