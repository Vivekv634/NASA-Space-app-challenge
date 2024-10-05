import * as THREE from "three";

export function createSun() {
    const sunGroup = new THREE.Group();


    const loader = new THREE.TextureLoader();
    const sunTexture = loader.load('../assets/textures/sun/sun_texture.jpg');

    const geometry = new THREE.SphereGeometry(1.5, 32, 32);
    const material = new THREE.MeshBasicMaterial({
        map: sunTexture,
        emissive: 0xFDB813,
        emissiveIntensity: 0.6,
    });


    const sunMesh = new THREE.Mesh(geometry, material);
    sunGroup.add(sunMesh);

    const sunLight = new THREE.PointLight(0xffffff, 2.0, 100);
    sunLight.position.set(0, 0, 0);
    sunGroup.add(sunLight);


    sunGroup.animate = function () {
        sunMesh.rotation.y += 0.002;
    };

    return sunGroup;
}
