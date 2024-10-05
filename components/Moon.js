import * as THREE from 'three';
export const createMoon = () => {
    const loader = new THREE.TextureLoader();
    const moonGroup = new THREE.Group();
    const moonGeometry = new THREE.SphereGeometry(0.27, 32, 32);
    const moonMaterial = new THREE.MeshPhongMaterial({
        map: loader.load("../assets/textures/moon/8k_moon.jpg"),

    });
    const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    moonGroup.add(moonMesh);
    moonGroup.position.set(2, 0, 0);
    moonGroup.animate = function (earthGroup) {
        moonMesh.rotation.y += 0.001;
        moonGroup.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.001);
    };
    return moonGroup;
}

