import * as THREE from 'three';

// Function to create Jupiter and its orbit
export const createJupiter = ({ renderer, camera }) => {
    const jupiterGroup = new THREE.Group();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseClick(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(jupiterGroup, true);

        if (intersects.length > 0) {

            const hello = document.querySelector('.hello');
            hello.innerHTML = `
        <h1>Hello J<h1/>
        `
        }
    }
    renderer.domElement.addEventListener("click", onMouseClick);

    // Jupiter texture (you can use a proper texture of Jupiter here)
    const jupiterTexture = new THREE.TextureLoader().load('/textures/jupiter/8k_jupiter.jpg'); // Ensure you have this texture in your assets
    const jupiterGeometry = new THREE.SphereGeometry(7, 32, 32); // Larger than Earth
    const jupiterMaterial = new THREE.MeshStandardMaterial({
        map: jupiterTexture
    });

    // Jupiter mesh
    const jupiterMesh = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
    jupiterGroup.add(jupiterMesh);

    // Orbit line for Jupiter (using EllipseCurve)
    const orbitRadius = 30; // Distance from the Sun
    const curve = new THREE.EllipseCurve(
        0, 0, // Axes origin (orbit center)
        orbitRadius, orbitRadius, // xRadius, yRadius (could be different for elliptical orbit)
        0, 2 * Math.PI, // StartAngle, endAngle
        false, // Clockwise
        0 // Rotation
    );

    const points = curve.getPoints(100);
    const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);

    // const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    // const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);

    // jupiterGroup.add(orbitLine);

    // Animate Jupiter's rotation
    jupiterGroup.animate = () => {
        // Rotation around its own axis
        jupiterMesh.rotation.y += 0.005;

        // Orbit animation (move the entire group along the path)
        jupiterGroup.position.x = orbitRadius * Math.cos(Date.now() * 0.0002); // Slow orbit
        jupiterGroup.position.z = orbitRadius * Math.sin(Date.now() * 0.0002); // Slow orbit
    };

    return jupiterGroup;
};
