import * as THREE from "three";

function asteroidTemplate(asteroidsArray, earthGroup) {
  // Create a group for all asteroids
  const asteroidGroup = new THREE.Group();

  // Earth's orbit distance (scaled down for visualization)
  const earthOrbitRadius = 40; // Scaled value for Earth's orbit around the Sun

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

    // Set a unique angle for each asteroid
    const angle = index * ((2 * Math.PI) / asteroidsArray.length); // Evenly distribute around the orbit

    // Convert polar coordinates (earthOrbitRadius and angle) to Cartesian coordinates (x, z)
    const x = Math.cos(angle) * earthOrbitRadius;
    const z = Math.sin(angle) * earthOrbitRadius;

    asteroidMesh.position.set(x, 0, z); // Set position in XZ-plane (y = 0 for no vertical movement)

    // Add the name label above the asteroid
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = "72px Arial";
    context.fillStyle = "white";
    context.fillText(asteroid.name, 0, 50);

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

  // Optional: You can animate the entire group (rotation)
  asteroidGroup.animate = function () {
    asteroidGroup.rotation.x += 0.1; // Rotate around the Y-axis for a circular orbit animation
  };
}

export { asteroidTemplate };
