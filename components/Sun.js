import * as THREE from "three";
import { createMercury } from "./Mercury";
import { createVenus } from "./Venus";
import { createEarth } from "./Earth";
import { createMars } from "./Mars"; // Import Mars module
import { createJupiter } from "./Jupiter";
import { createSaturn } from "./Saturn";
import { createUranus } from "./Uranus";
import { createNeptune } from "./Neptune";
import axios from "axios";
import { asteroidTemplate } from "@/utils/asteroidTemplate";

export function createSun({ renderer, camera }) {
    const sunGroup = new THREE.Group();

    // Sun's geometry
    const geometry = new THREE.SphereGeometry(10, 32, 32);

    // Load texture for the Sun
    const textureLoader = new THREE.TextureLoader();
    const sunTexture = textureLoader.load("/textures/sun/8k_sun.jpg"); // Replace with the correct path to your texture image

    // Sun's material with texture and strong emissive property
    const material = new THREE.MeshBasicMaterial({
        map: sunTexture,
        emissive: 0xfdb813,
        emissiveIntensity: 1.0,
    });

    const sunMesh = new THREE.Mesh(geometry, material);
    sunGroup.add(sunMesh);

    // Add PointLight to simulate Sun's light emitting in all directions
    const sunLight = new THREE.PointLight(0xffffff, 2.5, 1000);
    sunLight.position.set(0, 0, 0);
    sunGroup.add(sunLight);

    // Optional: Ambient light to ensure some light is present even in deep shadows
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    sunGroup.add(ambientLight);

  // Create Mercury and its orbit
  const mercuryGroup = createMercury({ renderer, camera });
  const mercuryOrbitRadius = 20; // Mercury's orbit is the closest to the Sun

    // Position Mercury in orbit around the Sun
    mercuryGroup.position.set(mercuryOrbitRadius, 0, 0);
    sunGroup.add(mercuryGroup);

    // Create Mercury's orbit ring
    const mercuryOrbitGeometry = new THREE.RingGeometry(
        mercuryOrbitRadius - 0.05,
        mercuryOrbitRadius + 0.05,
        64,
    );
    const mercuryOrbitMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
    });
    const mercuryOrbit = new THREE.Mesh(
        mercuryOrbitGeometry,
        mercuryOrbitMaterial,
    );
    mercuryOrbit.rotation.x = Math.PI / 2;
    sunGroup.add(mercuryOrbit);

  // Create Venus and its orbit
  const venusGroup = createVenus({ renderer, camera });
  const venusOrbitRadius = 30; // Venus is closer to the Sun than Earth

    // Position Venus in orbit around the Sun
    venusGroup.position.set(venusOrbitRadius, 0, 0);
    sunGroup.add(venusGroup);

    // Create Venus's orbit ring
    const venusOrbitGeometry = new THREE.RingGeometry(
        venusOrbitRadius - 0.05,
        venusOrbitRadius + 0.05,
        64,
    );
    const venusOrbitMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
    });
    const venusOrbit = new THREE.Mesh(venusOrbitGeometry, venusOrbitMaterial);
    venusOrbit.rotation.x = Math.PI / 2;
    sunGroup.add(venusOrbit);


    const earthGroup = createEarth({ renderer, camera });
    const earthOrbitRadius = 40;


    // Create InfoCard for the Sun


    sunMesh.onClick = function () {
        saturnGroup
        const hello = document.querySelector('.hello');
        hello.innerHTML = `<div className='text-3xl font-bold'> Sun </div>
        <p> Distance from Earth: 149.6 million km </p>
        <p> Length of a day: 24 hours </p>
        <p> Length of a year: 365.25 days </p>
        <p> Fun Fact: The Sun is the star at the center of the Solar System. It is a nearly perfect sphere of hot plasma, with internal convective motion that generates a magnetic field via a dynamo process. It is by far the most important source of energy for life on Earth. </p>
        `
    };
    // Add InfoCard to the DOM


    // Add raycaster and mouse vector for detecting clicks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseClick(event) {
        // Calculate mouse position in normalized device coordinates (-1 to +1) for both components
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update the raycaster with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);

        // Calculate objects intersecting the picking ray
        const intersects = raycaster.intersectObjects(sunGroup.children, true);

        for (let i = 0; i < intersects.length; i++) {
            if (intersects[i].object === sunMesh) {
                sunMesh.onClick();
                break;
            }
        }
    }

    // Add event listener to the renderer's DOM element
    renderer.domElement.addEventListener('click', onMouseClick, false);
    // Position Earth in orbit around the Sun
    earthGroup.position.set(earthOrbitRadius, 0, 0);
    sunGroup.add(earthGroup);

    // Create Earth's orbit ring
    const earthOrbitGeometry = new THREE.RingGeometry(
        earthOrbitRadius - 0.05,
        earthOrbitRadius + 0.05,
        64,
    );
    const earthOrbitMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
    });
    const earthOrbit = new THREE.Mesh(earthOrbitGeometry, earthOrbitMaterial);
    earthOrbit.rotation.x = Math.PI / 2;
    sunGroup.add(earthOrbit);

  asteroidTemplate(data, sunGroup);
  // Create Mars and its orbit
  const marsGroup = createMars({ renderer, camera });
  const marsOrbitRadius = 55; // Mars is further from the Sun than Earth

    // Position Mars in orbit around the Sun
    marsGroup.position.set(marsOrbitRadius, 0, 0);
    sunGroup.add(marsGroup);

    // Create Mars's orbit ring
    const marsOrbitGeometry = new THREE.RingGeometry(
        marsOrbitRadius - 0.05,
        marsOrbitRadius + 0.05,
        64,
    );
    const marsOrbitMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
    });
    const marsOrbit = new THREE.Mesh(marsOrbitGeometry, marsOrbitMaterial);
    marsOrbit.rotation.x = Math.PI / 2;
    sunGroup.add(marsOrbit);

  // Create Jupiter and its orbit
  const jupiterGroup = createJupiter({ renderer, camera });
  const jupiterOrbitRadius = 70;

    jupiterGroup.position.set(jupiterOrbitRadius, 0, 0);
    sunGroup.add(jupiterGroup);

    const jupiterOrbitGeometry = new THREE.RingGeometry(
        jupiterOrbitRadius - 0.05,
        jupiterOrbitRadius + 0.05,
        64,
    );
    const jupiterOrbitMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
    });
    const jupiterOrbit = new THREE.Mesh(
        jupiterOrbitGeometry,
        jupiterOrbitMaterial,
    );
    jupiterOrbit.rotation.x = Math.PI / 2;
    sunGroup.add(jupiterOrbit);

  // Create Saturn and its orbit
  const saturnGroup = createSaturn({ renderer, camera });
  const saturnOrbitRadius = 85;

    saturnGroup.position.set(saturnOrbitRadius, 0, 0);
    sunGroup.add(saturnGroup);

    const saturnOrbitGeometry = new THREE.RingGeometry(
        saturnOrbitRadius - 0.05,
        saturnOrbitRadius + 0.05,
        64,
    );
    const saturnOrbitMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
    });
    const saturnOrbit = new THREE.Mesh(saturnOrbitGeometry, saturnOrbitMaterial);
    saturnOrbit.rotation.x = Math.PI / 2;
    sunGroup.add(saturnOrbit);

  // Create Uranus and its orbit
  const uranusGroup = createUranus({ renderer, camera });
  const uranusOrbitRadius = 100;

    uranusGroup.position.set(uranusOrbitRadius, 0, 0);
    sunGroup.add(uranusGroup);

    const uranusOrbitGeometry = new THREE.RingGeometry(
        uranusOrbitRadius - 0.05,
        uranusOrbitRadius + 0.05,
        64,
    );
    const uranusOrbitMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
    });
    const uranusOrbit = new THREE.Mesh(uranusOrbitGeometry, uranusOrbitMaterial);
    uranusOrbit.rotation.x = Math.PI / 2;
    sunGroup.add(uranusOrbit);

  // Create Neptune and its orbit
  const neptuneGroup = createNeptune({ renderer, camera });
  const neptuneOrbitRadius = 110;

    neptuneGroup.position.set(neptuneOrbitRadius, 0, 0);
    sunGroup.add(neptuneGroup);

    const neptuneOrbitGeometry = new THREE.RingGeometry(
        neptuneOrbitRadius - 0.05,
        neptuneOrbitRadius + 0.05,
        64,
    );
    const neptuneOrbitMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
    });
    const neptuneOrbit = new THREE.Mesh(
        neptuneOrbitGeometry,
        neptuneOrbitMaterial,
    );
    neptuneOrbit.rotation.x = Math.PI / 2;
    sunGroup.add(neptuneOrbit);

    // Animation for Sun, Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune
    sunGroup.animate = function () {
        const time = Date.now() * 0.0001;

        mercuryGroup.position.x = mercuryOrbitRadius * Math.cos(time * 1.6); // Mercury has a faster orbit
        mercuryGroup.position.z = mercuryOrbitRadius * Math.sin(time * 1.6);
        mercuryGroup.rotation.y += 0.01;

        venusGroup.position.x = venusOrbitRadius * Math.cos(time * 1.2); // Venus has a slower orbit than Mercury
        venusGroup.position.z = venusOrbitRadius * Math.sin(time * 1.2);
        venusGroup.rotation.y += 0.01;

        earthGroup.position.x = earthOrbitRadius * Math.cos(time);
        earthGroup.position.z = earthOrbitRadius * Math.sin(time);
        earthGroup.rotation.y += 0.01;

        marsGroup.position.x = marsOrbitRadius * Math.cos(time * 0.8); // Mars has a slower orbit than Earth
        marsGroup.position.z = marsOrbitRadius * Math.sin(time * 0.8);
        marsGroup.rotation.y += 0.01;

        const jupiterTime = Date.now() * 0.00005;
        jupiterGroup.position.x = jupiterOrbitRadius * Math.cos(jupiterTime);
        jupiterGroup.position.z = jupiterOrbitRadius * Math.sin(jupiterTime);
        jupiterGroup.rotation.y += 0.01;

        const saturnTime = Date.now() * 0.00002;
        saturnGroup.position.x = saturnOrbitRadius * Math.cos(saturnTime);
        saturnGroup.position.z = saturnOrbitRadius * Math.sin(saturnTime);
        saturnGroup.rotation.y += 0.01;

        const uranusTime = Date.now() * 0.00001;
        uranusGroup.position.x = uranusOrbitRadius * Math.cos(uranusTime);
        uranusGroup.position.z = uranusOrbitRadius * Math.sin(uranusTime);
        uranusGroup.rotation.y += 0.01;

        const neptuneTime = Date.now() * 0.000005;
        neptuneGroup.position.x = neptuneOrbitRadius * Math.cos(neptuneTime);
        neptuneGroup.position.z = neptuneOrbitRadius * Math.sin(neptuneTime);
        neptuneGroup.rotation.y += 0.01;
    };

    return sunGroup;
}
