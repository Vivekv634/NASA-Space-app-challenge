import * as THREE from 'three';

export function createMercury({ renderer, camera }) {
    const mercuryGroup = new THREE.Group();

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseClick(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(mercuryGroup, true);

        if (intersects.length > 0) {

            const hello = document.querySelector('.hello');
            hello.innerHTML = `
        <h1>Mercury<h1/>
        <p>Distance from the Sun: 57.9 million km</p>
        <p>Length of a day: 58.6 Earth days</p>
        <p>Length of a year: 88 Earth days</p>
        
        `
        }
    }
    renderer.domElement.addEventListener("click", onMouseClick);

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
