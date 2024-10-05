import * as THREE from "three";

export default function getStarfield({ numStars = 500 } = {}) {
  // Function to generate a random position on a sphere's surface
  function randomSpherePoint() {
    const radius = Math.random() * 50 + 50; // Random radius between 50 and 100 units
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u; // Random azimuth angle
    const phi = Math.acos(2 * v - 1); // Random polar angle

    // Convert spherical coordinates to Cartesian coordinates
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    return {
      pos: new THREE.Vector3(x, y, z), // 3D position of the star
      hue: 0.6, // Default hue for color
      minDist: radius, // Minimum distance for scaling
    };
  }

  // Arrays to hold vertices and colors
  const verts = [];
  const colors = [];

  // Loop to generate random stars
  for (let i = 0; i < numStars; i++) {
    let p = randomSpherePoint();
    const { pos, hue } = p;

    // Generate a random color for each star (slightly varied lightness)
    const color = new THREE.Color().setHSL(hue, 0.2, Math.random());

    // Add star position and color to respective arrays
    verts.push(pos.x, pos.y, pos.z);
    colors.push(color.r, color.g, color.b);
  }

  // Create a buffer geometry and assign position and color attributes
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));


  const mat = new THREE.PointsMaterial({
    size: 0.2,
    vertexColors: true,
    map: new THREE.TextureLoader().load("/textures/stars/circle.png"),
  });


  const points = new THREE.Points(geo, mat);

  return points;
}
