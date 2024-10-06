import * as THREE from 'three';

export function createUranus({ renderer, camera }) {
    const uranusGroup = new THREE.Group();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseClick(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(uranusGroup, true);

        if (intersects.length > 0) {

            const hello = document.querySelector('.hello');
            hello.innerHTML = `
        <h1>Uranus<h1/>
        <p>Distance from the Sun: 2.9 billion km</p>
        <p>Length of a day: 17.2 hours</p>
        <p>Length of a year: 84 Earth years</p>
        
        `
        }
    }
    renderer.domElement.addEventListener("click", onMouseClick);

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
