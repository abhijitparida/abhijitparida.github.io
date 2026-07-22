import * as THREE from 'three';

/**
 * Interactables.js — Raycasting system.
 * Detects which interactable object the crosshair is pointing at,
 * shows interaction prompt, handles click/E-key to trigger content panel.
 */
export class Interactables {
  constructor(camera, scene, interactableObjects, onInteract) {
    this.camera = camera;
    this.scene = scene;
    this.objects = interactableObjects;
    this.onInteract = onInteract;

    this.raycaster = new THREE.Raycaster();
    this.center = new THREE.Vector2(0, 0);
    this.maxDistance = 3.5;

    this.currentTarget = null;

    this.crosshair = document.getElementById('crosshair');
    this.prompt = document.getElementById('interact-prompt');
    this.promptLabel = document.getElementById('interact-label');

    this._onKeyDown = this._onKeyDown.bind(this);
    document.addEventListener('keydown', this._onKeyDown);
  }

  _onKeyDown(e) {
    if (e.code === 'KeyE' && this.currentTarget) {
      this.onInteract(this.currentTarget.userData.interactionKey);
    }
  }

  handleClick() {
    if (this.currentTarget) {
      this.onInteract(this.currentTarget.userData.interactionKey);
    }
  }

  update(isLocked, isPanelOpen) {
    if (!isLocked || isPanelOpen) {
      this.currentTarget = null;
      this.crosshair.classList.remove('hovering');
      this.prompt.classList.add('hidden');
      return;
    }

    this.raycaster.setFromCamera(this.center, this.camera);
    const intersects = this.raycaster.intersectObjects(this.objects);

    if (intersects.length > 0 && intersects[0].distance < this.maxDistance) {
      const hit = intersects[0].object;
      this.currentTarget = hit;
      this.crosshair.classList.add('hovering');
      this.promptLabel.textContent = hit.userData.label || 'Press E to Interact';
      this.prompt.classList.remove('hidden');
    } else {
      this.currentTarget = null;
      this.crosshair.classList.remove('hovering');
      this.prompt.classList.add('hidden');
    }
  }

  dispose() {
    document.removeEventListener('keydown', this._onKeyDown);
  }
}
