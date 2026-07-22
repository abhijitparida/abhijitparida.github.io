import * as THREE from 'three';

/**
 * FirstPersonControls.js — PointerLock-based first-person movement.
 * WASD to move, mouse to look. Simple AABB collision with room walls.
 */
export class FirstPersonControls {
  constructor(camera, domElement) {
    this.camera = camera;
    this.domElement = domElement;

    this.isLocked = false;
    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;

    this.velocity = new THREE.Vector3();
    this.direction = new THREE.Vector3();

    // Room bounds (keep player inside)
    this.bounds = {
      minX: -4.3,
      maxX: 4.3,
      minZ: -4.0,
      maxZ: 4.7,
    };

    // Desk area blocked zone
    this.blockedZones = [
      { minX: 0.8, maxX: 3.8, minZ: -4.9, maxZ: -3.0 }, // desk area
      { minX: -5.1, maxX: -4.0, minZ: -4.0, maxZ: -1.0 }, // bookshelf
      { minX: -2.8, maxX: 0.3, minZ: 3.0, maxZ: 5.1 }, // couch area
    ];

    this.euler = new THREE.Euler(0, 0, 0, 'YXZ');
    this.PI_2 = Math.PI / 2;

    this._onKeyDown = this._onKeyDown.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onPointerlockChange = this._onPointerlockChange.bind(this);

    document.addEventListener('keydown', this._onKeyDown);
    document.addEventListener('keyup', this._onKeyUp);
    document.addEventListener('mousemove', this._onMouseMove);
    document.addEventListener('pointerlockchange', this._onPointerlockChange);
  }

  lock() {
    this.domElement.requestPointerLock();
  }

  unlock() {
    document.exitPointerLock();
  }

  _onPointerlockChange() {
    this.isLocked = document.pointerLockElement === this.domElement;
  }

  _onKeyDown(e) {
    switch (e.code) {
      case 'ArrowUp':
      case 'KeyW': this.moveForward = true; break;
      case 'ArrowDown':
      case 'KeyS': this.moveBackward = true; break;
      case 'ArrowLeft':
      case 'KeyA': this.moveLeft = true; break;
      case 'ArrowRight':
      case 'KeyD': this.moveRight = true; break;
    }
  }

  _onKeyUp(e) {
    switch (e.code) {
      case 'ArrowUp':
      case 'KeyW': this.moveForward = false; break;
      case 'ArrowDown':
      case 'KeyS': this.moveBackward = false; break;
      case 'ArrowLeft':
      case 'KeyA': this.moveLeft = false; break;
      case 'ArrowRight':
      case 'KeyD': this.moveRight = false; break;
    }
  }

  _onMouseMove(e) {
    if (!this.isLocked) return;

    const movementX = e.movementX || 0;
    const movementY = e.movementY || 0;

    this.euler.setFromQuaternion(this.camera.quaternion);
    this.euler.y -= movementX * 0.0018;
    this.euler.x -= movementY * 0.0018;
    this.euler.x = Math.max(-this.PI_2 * 0.75, Math.min(this.PI_2 * 0.75, this.euler.x));

    this.camera.quaternion.setFromEuler(this.euler);
  }

  update(delta) {
    if (!this.isLocked) return;

    // Damping
    this.velocity.x -= this.velocity.x * 10.0 * delta;
    this.velocity.z -= this.velocity.z * 10.0 * delta;

    this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
    this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
    this.direction.normalize();

    const speed = 4.5;
    if (this.moveForward || this.moveBackward) this.velocity.z -= this.direction.z * speed * delta * 10;
    if (this.moveLeft || this.moveRight) this.velocity.x -= this.direction.x * speed * delta * 10;

    // Save old position for collision rollback
    const oldX = this.camera.position.x;
    const oldZ = this.camera.position.z;

    // Apply movement in camera-local space
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);
    forward.y = 0;
    forward.normalize();
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(this.camera.quaternion);
    right.y = 0;
    right.normalize();

    this.camera.position.addScaledVector(forward, -this.velocity.z * delta);
    this.camera.position.addScaledVector(right, -this.velocity.x * delta);

    // Room wall collision
    this.camera.position.x = Math.max(this.bounds.minX, Math.min(this.bounds.maxX, this.camera.position.x));
    this.camera.position.z = Math.max(this.bounds.minZ, Math.min(this.bounds.maxZ, this.camera.position.z));

    // Blocked zone collision
    const px = this.camera.position.x;
    const pz = this.camera.position.z;
    for (const zone of this.blockedZones) {
      if (px > zone.minX && px < zone.maxX && pz > zone.minZ && pz < zone.maxZ) {
        this.camera.position.x = oldX;
        this.camera.position.z = oldZ;
        break;
      }
    }

    // Lock Y (first person eye height)
    this.camera.position.y = 1.72;
  }

  dispose() {
    document.removeEventListener('keydown', this._onKeyDown);
    document.removeEventListener('keyup', this._onKeyUp);
    document.removeEventListener('mousemove', this._onMouseMove);
    document.removeEventListener('pointerlockchange', this._onPointerlockChange);
  }
}
