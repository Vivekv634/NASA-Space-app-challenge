import * as THREE from 'three';
import { createEarth } from './Earth';

export function createSun() {
    const sunGroup = new THREE.Group();

    // Sun's geometry
    const geometry = new THREE.SphereGeometry(10, 32, 32);

    // Load texture for the Sun
    const textureLoader = new THREE.TextureLoader();
    const sunTexture = textureLoader.load('/textures/sun/8k_sun.jpg'); // Replace with the correct path to your texture image

    // Sun's material with texture and strong emissive property
    const material = new THREE.MeshBasicMaterial({
        map: sunTexture, // Apply the texture
        emissive: 0xFDB813, // Emissive color for the Sun's glow
        emissiveIntensity: 1.0, // Full intensity to make the Sun glow
    });

    const sunMesh = new THREE.Mesh(geometry, material);
    sunGroup.add(sunMesh);

    // Add PointLight to simulate Sun's light emitting in all directions
    const sunLight = new THREE.PointLight(0xffffff, 2.5, 1000); // Increased light intensity and range
    sunLight.position.set(0, 0, 0); // Light positioned at the center of the Sun
    sunGroup.add(sunLight);

    // Optional: Ambient light to ensure some light is present even in deep shadows
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3); // Slight global illumination
    sunGroup.add(ambientLight);

    // Create Earth and its orbit
    const earthGroup = createEarth();
    const earthOrbitRadius = 30;

    // Position Earth in orbit around the Sun
    earthGroup.position.set(earthOrbitRadius, 0, 0);
    sunGroup.add(earthGroup);

    // Create Earth's orbit ring
    const earthOrbitGeometry = new THREE.RingGeometry(earthOrbitRadius - 0.05, earthOrbitRadius + 0.05, 64);
    const earthOrbitMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
    });
    const earthOrbit = new THREE.Mesh(earthOrbitGeometry, earthOrbitMaterial);
    earthOrbit.rotation.x = Math.PI / 2;
    sunGroup.add(earthOrbit);

    // Animation for Sun, Earth, and Moon
    sunGroup.animate = function () {
        // Earth's revolution around the Sun
        const time = Date.now() * 0.0001;
        earthGroup.position.x = earthOrbitRadius * Math.cos(time);
        earthGroup.position.z = earthOrbitRadius * Math.sin(time);

        // Earth's rotation on its axis
        earthGroup.rotation.y += 0.01;

        // Earth's self-rotation
        if (earthGroup.children[0]) {
            earthGroup.children[0].rotation.y += 0.05; // Continues to rotate itself
        }

        // Moon's self-rotation (assuming the Moon is the second child)
        if (earthGroup.children[1]) {
            earthGroup.children[1].rotation.y += 0.02; // Moon rotates as well
        }
    };

    return sunGroup;
}
