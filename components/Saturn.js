import * as THREE from 'three';

export function createSaturn({ renderer, camera }) {
    const saturnGroup = new THREE.Group();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseClick(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(saturnGroup, true);

        if (intersects.length > 0) {

            const hello = document.querySelector('.hello');
            hello.innerHTML = `
        <h1>Saturn<h1/>
        <p>Distance from the Sun: 1.4 billion km</p>
        <p>Length of a day: 10.7 hours</p>
        <p>Length of a year: 29.5 Earth years</p>
        
        `
        }
    }
    renderer.domElement.addEventListener("click", onMouseClick);
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
    const ringInnerRadius = 7;
    const ringOuterRadius = 8;
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
