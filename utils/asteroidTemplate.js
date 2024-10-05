import * as THREE from "three";
function asteroidTemplate(asteroidsArray, earthGroup) {
  // Create a group for all asteroids
  const asteroidGroup = new THREE.Group();

  // Loop through the array of asteroids
  asteroidsArray.forEach((asteroid, index) => {
    const diameterMin =
      asteroid.estimated_diameter.kilometers.estimated_diameter_min;
    const diameterMax =
      asteroid.estimated_diameter.kilometers.estimated_diameter_max;
    const avgDiameter = (diameterMin + diameterMax) / 2;

    // Create geometry for the asteroid
    const geometry = new THREE.SphereGeometry(avgDiameter * 0.1, 16, 16); // Scale down the size for visibility
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const asteroidMesh = new THREE.Mesh(geometry, material);

    // Set a unique position for each asteroid
    const distance = 2 + index * 0.5; // Increase distance to avoid overlap
    const angle = index * 0.4; // Spread out in a circular orbit
    asteroidMesh.position.set(
      distance * Math.cos(angle),
      distance * Math.sin(angle),
      index * Math.random(),
    );

    // Add the name label above the asteroid
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = "40px Arial";
    context.fillStyle = "white";
    context.fillText(asteroid.name, -40, 50);

    const texture = new THREE.CanvasTexture(canvas);
    const labelMaterial = new THREE.SpriteMaterial({ map: texture });
    const label = new THREE.Sprite(labelMaterial);

    label.scale.set(1, 0.5, 1); // Scale down the label size
    label.position.set(0, 1.2, 0); // Position the label above the asteroid
    asteroidMesh.add(label);

    // Add the asteroid mesh to the asteroid group
    asteroidGroup.add(asteroidMesh);
  });

  // Add the entire asteroid group to the Earth group
  earthGroup.add(asteroidGroup);
  asteroidGroup.animate = function () {
    asteroidGroup.rotation.x += 2;
  };
}
export { asteroidTemplate };
