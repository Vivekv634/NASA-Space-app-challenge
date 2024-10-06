import * as THREE from 'three';

export function createNeptune({ renderer, camera }) {
    const neptuneGroup = new THREE.Group();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseClick(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(neptuneGroup, true);

        if (intersects.length > 0) {

            const hello = document.querySelector('.hello');
            hello.innerHTML = `
        <h1>Neptune<h1/>
        <p>Distance from the Sun: 4.5 billion km</p>
        <p>Length of a day: 16 hours</p>
        <p>Length of a year: 165 Earth years</p>
        
        `
        }
    }
    renderer.domElement.addEventListener("click", onMouseClick);
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
