import * as THREE from 'three';
import { Timer } from 'three/addons/misc/Timer.js';
import './style.css';
import { setupLighting } from './scene/Lighting.js';
import { buildRoom } from './scene/Room.js';
import { FirstPersonControls } from './controls/FirstPersonControls.js';
import { Interactables } from './interaction/Interactables.js';
import { InfoPanel } from './interaction/InfoPanel.js';

// ── Scene setup ────────────────────────────────────────────────
const canvas = document.getElementById('canvas');

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.95;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0d0805);
scene.fog = new THREE.Fog(0x0d0805, 8, 18);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.05, 30);
camera.position.set(0, 1.72, 3.5); // start in center of room, facing desk

// ── Loading simulation ──────────────────────────────────────────
const loadingBar = document.getElementById('loading-bar');
const loadingScreen = document.getElementById('loading-screen');
const enterScreen = document.getElementById('enter-screen');
const enterBtn = document.getElementById('enter-btn');
const crosshair = document.getElementById('crosshair');
const hud = document.getElementById('hud');

function fakeLoad() {
  return new Promise((resolve) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 18 + 4;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(resolve, 300);
      }
      loadingBar.style.width = progress + '%';
    }, 100);
  });
}

// ── Build scene ────────────────────────────────────────────────
const { animateLamp } = setupLighting(scene);
const interactables = buildRoom(scene);

// ── Controls ───────────────────────────────────────────────────
const controls = new FirstPersonControls(camera, canvas);

// ── Info Panel ─────────────────────────────────────────────────
const infoPanel = new InfoPanel(() => {
  // On panel close: re-lock pointer
  controls.lock();
});

// ── Interactables ──────────────────────────────────────────────
const interactSystem = new Interactables(
  camera, scene, interactables,
  (key) => {
    // Unlock pointer when opening panel
    controls.unlock();
    infoPanel.open(key);
  }
);

// Click to interact
canvas.addEventListener('click', () => {
  if (controls.isLocked) {
    interactSystem.handleClick();
  }
});

// ── Resize ─────────────────────────────────────────────────────
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// ── Enter flow ──────────────────────────────────────────────────
enterBtn.addEventListener('click', () => {
  enterScreen.classList.add('hidden');
  crosshair.classList.add('active');
  hud.classList.remove('hidden');
  controls.lock();
});

// Show/hide HUD based on pointer lock state
document.addEventListener('pointerlockchange', () => {
  if (!document.pointerLockElement) {
    hud.classList.add('hidden');
  } else {
    hud.classList.remove('hidden');
  }
});

// ── Game Loop ──────────────────────────────────────────────────
const timer = new Timer();

function animate() {
  requestAnimationFrame(animate);
  timer.update();
  const delta = Math.min(timer.getDelta(), 0.05);

  controls.update(delta);
  interactSystem.update(controls.isLocked, infoPanel.isOpen);
  animateLamp();

  renderer.render(scene, camera);
}

// ── Boot ───────────────────────────────────────────────────────
async function boot() {
  animate(); // start rendering in background while "loading"
  await fakeLoad();

  // Fade out loading screen
  loadingScreen.classList.add('fade-out');
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    enterScreen.classList.remove('hidden');
  }, 850);
}

boot();
