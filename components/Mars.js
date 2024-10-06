import * as THREE from 'three';

export function createMars({ renderer, camera }) {
    const marsGroup = new THREE.Group();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseClick(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(marsGroup, true);

        if (intersects.length > 0) {

            const hello = document.querySelector('.hello');
            hello.innerHTML = `
        <h1>Hello Mars<h1/>
        `
        }
    }
    renderer.domElement.addEventListener("click", onMouseClick);
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
