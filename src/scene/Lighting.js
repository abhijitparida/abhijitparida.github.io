import * as THREE from 'three';

/**
 * Lighting.js — Warm cozy lo-fi room lighting.
 * Ambient base + desk lamp point light + subtle fill.
 */
export function setupLighting(scene) {
  // Warm ambient — low intensity, golden tint
  const ambient = new THREE.AmbientLight(0xffd090, 0.35);
  scene.add(ambient);

  // Desk lamp — warm orange point light
  const deskLamp = new THREE.PointLight(0xff9f4a, 4.5, 7, 2);
  deskLamp.position.set(1.8, 2.0, -0.5); // above desk area
  deskLamp.castShadow = true;
  deskLamp.shadow.mapSize.set(512, 512);
  deskLamp.shadow.camera.near = 0.1;
  deskLamp.shadow.camera.far = 8;
  scene.add(deskLamp);

  // Ceiling light — dim warm overhead
  const ceiling = new THREE.PointLight(0xffecd0, 1.2, 12, 1.5);
  ceiling.position.set(0, 3.8, 0);
  ceiling.castShadow = true;
  ceiling.shadow.mapSize.set(512, 512);
  scene.add(ceiling);

  // Window fill — very subtle cool blue from "outside"
  const windowFill = new THREE.DirectionalLight(0x8ab4e0, 0.15);
  windowFill.position.set(-5, 3, 2);
  scene.add(windowFill);

  // Subtle lamp glow sphere (visual only, no shadow)
  const lampGeo = new THREE.SphereGeometry(0.06, 8, 8);
  const lampMat = new THREE.MeshBasicMaterial({ color: 0xffcc66 });
  const lampMesh = new THREE.Mesh(lampGeo, lampMat);
  lampMesh.position.copy(deskLamp.position);
  lampMesh.position.y -= 0.18;
  scene.add(lampMesh);

  // Animate the desk lamp flicker subtly
  let t = 0;
  function animateLamp() {
    t += 0.02;
    deskLamp.intensity = 4.5 + Math.sin(t * 1.3) * 0.12 + Math.sin(t * 3.7) * 0.06;
  }

  return { animateLamp };
}
