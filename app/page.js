'use client';
import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; // OrbitControls for Sun
import { createEarth } from "../components/Earth"; // Assuming Earth.js is in the components folder
import { createSun } from "../components/Sun"; // Assuming Sun.js is in the components folder
import getStarfield from "@/utils/getStarField";

const HomePage = () => {
  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.set(25, 15, 25); // Initial camera position

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    document.body.appendChild(renderer.domElement);

    // Tone mapping and color management
    THREE.ColorManagement.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

    // OrbitControls for orbiting around the Sun
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth motion
    controls.dampingFactor = 0.05;
    controls.enableZoom = true; // Allow zooming

    // Add Sun to the scene
    const sunGroup = createSun({ renderer, camera });
    scene.add(sunGroup);
    sunGroup.position.set(0, 0, 0); // Place Sun at the center

    // Add Earth to the scene (optional)
    // const earthGroup = createEarth();
    // scene.add(earthGroup);
    // earthGroup.position.set(20, 0, 0); // Position of Earth

    // Add starfield to the scene
    const stars = getStarfield({ numStars: 200000 });
    scene.add(stars);

    // Lighting setup
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
    sunLight.position.set(-2, 0.5, 1.5);
    scene.add(sunLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      controls.update(); // Update orbit controls

      // Optional: Animate Sun and Earth
      sunGroup.animate && sunGroup.animate(); // Ensure `animate` is defined
      // earthGroup.animate && earthGroup.animate();

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
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return <div className='hello border border-b-gray-100 p-4 mx-2 rounded-md  fixed top-14 right-10 bg-transparent max-w-[300px] text-white  ' >
  </div>;
};

export default HomePage;
