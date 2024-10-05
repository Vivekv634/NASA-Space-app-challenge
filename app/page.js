'use client'
import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createEarth } from "../components/Earth";
import getStarfield from '@/utils/getStarField';


const HomePage = () => {
  useEffect(() => {

    const w = window.innerWidth;
    const h = window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    document.body.appendChild(renderer.domElement);

    // Tone mapping and color management
    THREE.ColorManagement.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

    // Add Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Add Earth to the scene
    const earthGroup = createEarth();
    scene.add(earthGroup);

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

      earthGroup.animate();

      stars.rotation.y -= 0.0002;

      renderer.render(scene, camera);
    };
    animate();

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

  return (
    <div>

    </div>
  );
};

export default HomePage;
