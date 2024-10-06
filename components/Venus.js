import * as THREE from 'three';

export function createVenus({ renderer, camera }) {
    const venusGroup = new THREE.Group();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseClick(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(venusGroup, true);

        if (intersects.length > 0) {

            const hello = document.querySelector('.hello');
            hello.innerHTML = `
        <h1>Hello V<h1/>
        `
        }
    }
    renderer.domElement.addEventListener("click", onMouseClick);
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
