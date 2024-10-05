'use client';
import React, { useEffect } from "react";
import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import { createEarth } from "../components/Earth"; // Assuming Earth.js is in the components folder
import { createSun } from "../components/Sun"; // Assuming Sun.js is in the components folder
import getStarfield from "@/utils/getStarField";

const HomePage = () => {
  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.set(5, 3, 10); // Initial camera position

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    document.body.appendChild(renderer.domElement);

    // Tone mapping and color management
    THREE.ColorManagement.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

    // PointerLockControls for free movement
    const controls = new PointerLockControls(camera, document.body);
    document.addEventListener('click', () => {
      controls.lock();
    });

    // Movement state variables
    let moveForward = false;
    let moveBackward = false;
    let moveLeft = false;
    let moveRight = false;
    let moveUp = false; // New variable for moving up
    let moveDown = false; // New variable for moving down

    const velocity = new THREE.Vector3();
    const direction = new THREE.Vector3();
    const speed = 5; // Movement speed

    // Keyboard event handlers
    const onKeyDown = (event) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          moveForward = true;
          break;
        case 'ArrowLeft':
        case 'KeyA':
          moveLeft = true;
          break;
        case 'ArrowDown':
        case 'KeyS':
          moveBackward = true;
          break;
        case 'ArrowRight':
        case 'KeyD':
          moveRight = true;
          break;
        case 'Space': // Move up
          moveUp = true;
          break;
        case 'ShiftLeft': // Move down
          moveDown = true;
          break;
      }
    };

    const onKeyUp = (event) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          moveForward = false; // Change to false on key up
          break;
        case 'ArrowLeft':
        case 'KeyA':
          moveLeft = false; // Change to false on key up
          break;
        case 'ArrowDown':
        case 'KeyS':
          moveBackward = false; // Change to false on key up
          break;
        case 'ArrowRight':
        case 'KeyD':
          moveRight = false; // Change to false on key up
          break;
        case 'Space': // Move up
          moveUp = false; // Change to false on key up
          break;
        case 'ShiftLeft': // Move down
          moveDown = false; // Change to false on key up
          break;
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    // Add Sun to the scene
    const sunGroup = createSun();
    scene.add(sunGroup);
    sunGroup.position.set(0, 0, 0); // Place Sun at the center

    // Add Earth to the scene
    // const earthGroup = createEarth();
    // scene.add(earthGroup);
    // earthGroup.position.set(20, 0, 0); // Initial position of Earth

    // Add starfield to the scene
    const stars = getStarfield({ numStars: 20000 });
    scene.add(stars);

    // Lighting setup
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
    sunLight.position.set(-2, 0.5, 1.5);
    scene.add(sunLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Calculate direction based on keys pressed
      direction.z = Number(moveForward) - Number(moveBackward);
      direction.x = Number(moveRight) - Number(moveLeft);
      direction.normalize(); // Normalize to maintain speed in all directions

      if (controls.isLocked) {
        // Update velocity based on direction and speed
        velocity.z = direction.z * speed;
        velocity.x = direction.x * speed;

        // Move the camera based on velocity
        controls.moveForward(-velocity.z * 0.1);
        controls.moveRight(-velocity.x * 0.1);

        // Move up and down based on key presses
        if (moveUp) {
          camera.position.y += speed * 0.1; // Move up
        }
        if (moveDown) {
          camera.position.y -= speed * 0.1; // Move down
        }
      }

      // Animate Sun and Earth (optional)
      sunGroup.animate();
      // earthGroup.animate();

      // Starfield rotation
      stars.rotation.y -= 0.0002;

      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleWindowResize, false);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return <div></div>;
};

export default HomePage;
