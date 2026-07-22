import * as THREE from 'three';

/**
 * Room.js — Builds the complete 3D room with all furniture and objects.
 * Returns an array of interactable mesh objects with userData.interactionKey set.
 */
export function buildRoom(scene) {
  const interactables = [];

  // ── Materials ────────────────────────────────────────────────
  const wallMat = new THREE.MeshStandardMaterial({
    color: 0x2e1f14,
    roughness: 0.92,
    metalness: 0.0,
  });
  const accentWallMat = new THREE.MeshStandardMaterial({
    color: 0x3a2518,
    roughness: 0.88,
    metalness: 0.0,
  });
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x1a110a,
    roughness: 0.8,
    metalness: 0.0,
  });
  const ceilingMat = new THREE.MeshStandardMaterial({
    color: 0x1e1308,
    roughness: 0.95,
    metalness: 0.0,
  });
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x6b3e1e,
    roughness: 0.75,
    metalness: 0.05,
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x3d2210,
    roughness: 0.8,
    metalness: 0.02,
  });
  const metalMat = new THREE.MeshStandardMaterial({
    color: 0x888888,
    roughness: 0.3,
    metalness: 0.9,
  });
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x0d1f2e,
    roughness: 0.1,
    metalness: 0.3,
    emissive: 0x0a3d62,
    emissiveIntensity: 0.6,
  });
  const screenGlowMat = new THREE.MeshStandardMaterial({
    color: 0x1a5276,
    roughness: 0.1,
    metalness: 0.2,
    emissive: 0x1a5276,
    emissiveIntensity: 0.4,
  });
  const bookMat1 = new THREE.MeshStandardMaterial({ color: 0x8b1a1a, roughness: 0.9 });
  const bookMat2 = new THREE.MeshStandardMaterial({ color: 0x1a4a8b, roughness: 0.9 });
  const bookMat3 = new THREE.MeshStandardMaterial({ color: 0x2d6a2d, roughness: 0.9 });
  const bookMat4 = new THREE.MeshStandardMaterial({ color: 0x7a5c1e, roughness: 0.9 });
  const bookMat5 = new THREE.MeshStandardMaterial({ color: 0x4a1a6a, roughness: 0.9 });
  const bookMats = [bookMat1, bookMat2, bookMat3, bookMat4, bookMat5];
  const creamMat = new THREE.MeshStandardMaterial({ color: 0xf5ede0, roughness: 0.9 });
  const frameGoldMat = new THREE.MeshStandardMaterial({
    color: 0xb8860b,
    roughness: 0.4,
    metalness: 0.7,
  });
  const canvasMat = new THREE.MeshStandardMaterial({
    color: 0xd4a464,
    roughness: 0.95,
    emissive: 0x3a2010,
    emissiveIntensity: 0.15,
  });
  const rugMat = new THREE.MeshStandardMaterial({
    color: 0x6b2d2d,
    roughness: 1.0,
  });
  const lampBaseMat = new THREE.MeshStandardMaterial({
    color: 0x4a3010,
    roughness: 0.7,
    metalness: 0.2,
  });
  const lampShadeMat = new THREE.MeshStandardMaterial({
    color: 0xc8903a,
    roughness: 0.8,
    emissive: 0xff9933,
    emissiveIntensity: 0.25,
    side: THREE.DoubleSide,
  });
  const chairMat = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    roughness: 0.8,
    metalness: 0.1,
  });
  const windowFrameMat = new THREE.MeshStandardMaterial({
    color: 0x2a1a0e,
    roughness: 0.8,
  });
  const windowGlassMat = new THREE.MeshStandardMaterial({
    color: 0x1a3a5c,
    roughness: 0.0,
    metalness: 0.1,
    transparent: true,
    opacity: 0.3,
    emissive: 0x0a2040,
    emissiveIntensity: 0.3,
  });
  const notebookMat = new THREE.MeshStandardMaterial({
    color: 0xf0e8d0,
    roughness: 0.9,
  });
  const notebookCoverMat = new THREE.MeshStandardMaterial({
    color: 0x2c3e50,
    roughness: 0.85,
  });
  const photoFrameMat = new THREE.MeshStandardMaterial({
    color: 0x5c3010,
    roughness: 0.7,
    metalness: 0.1,
  });
  const photoMat = new THREE.MeshStandardMaterial({
    color: 0xd4b896,
    roughness: 0.9,
    emissive: 0x3a2810,
    emissiveIntensity: 0.1,
  });
  const doorMat = new THREE.MeshStandardMaterial({
    color: 0x3d2210,
    roughness: 0.75,
  });
  const doorKnobMat = new THREE.MeshStandardMaterial({
    color: 0xd4a820,
    roughness: 0.2,
    metalness: 0.9,
  });

  const ROOM_W = 10;
  const ROOM_H = 4.5;
  const ROOM_D = 10;

  // ── Room Shell ───────────────────────────────────────────────

  // Floor
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_W, ROOM_D), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // Floor plank lines (decorative)
  for (let i = -4; i <= 4; i++) {
    const plank = new THREE.Mesh(
      new THREE.PlaneGeometry(0.02, ROOM_D),
      new THREE.MeshStandardMaterial({ color: 0x0e0906, roughness: 1 })
    );
    plank.rotation.x = -Math.PI / 2;
    plank.position.set(i, 0.001, 0);
    scene.add(plank);
  }

  // Ceiling
  const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_W, ROOM_D), ceilingMat);
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = ROOM_H;
  scene.add(ceiling);

  // Back wall (south)
  const backWall = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_W, ROOM_H), accentWallMat);
  backWall.position.set(0, ROOM_H / 2, -ROOM_D / 2);
  backWall.receiveShadow = true;
  scene.add(backWall);

  // Front wall (north) — with door
  const frontWallL = new THREE.Mesh(new THREE.PlaneGeometry(3.5, ROOM_H), wallMat);
  frontWallL.position.set(-3.25, ROOM_H / 2, ROOM_D / 2);
  frontWallL.rotation.y = Math.PI;
  scene.add(frontWallL);

  const frontWallR = new THREE.Mesh(new THREE.PlaneGeometry(3.5, ROOM_H), wallMat);
  frontWallR.position.set(3.25, ROOM_H / 2, ROOM_D / 2);
  frontWallR.rotation.y = Math.PI;
  scene.add(frontWallR);

  const frontWallTop = new THREE.Mesh(new THREE.PlaneGeometry(3, 1.3), wallMat);
  frontWallTop.position.set(0, ROOM_H - 0.65, ROOM_D / 2);
  frontWallTop.rotation.y = Math.PI;
  scene.add(frontWallTop);

  // Left wall (with window)
  const leftWallBack = new THREE.Mesh(new THREE.PlaneGeometry(4, ROOM_H), wallMat);
  leftWallBack.position.set(-ROOM_W / 2, ROOM_H / 2, -3);
  leftWallBack.rotation.y = Math.PI / 2;
  scene.add(leftWallBack);

  const leftWallFront = new THREE.Mesh(new THREE.PlaneGeometry(3, ROOM_H), wallMat);
  leftWallFront.position.set(-ROOM_W / 2, ROOM_H / 2, 3.5);
  leftWallFront.rotation.y = Math.PI / 2;
  scene.add(leftWallFront);

  const leftWallTop = new THREE.Mesh(new THREE.PlaneGeometry(3, 1.5), wallMat);
  leftWallTop.position.set(-ROOM_W / 2, ROOM_H - 0.75, 0.5);
  leftWallTop.rotation.y = Math.PI / 2;
  scene.add(leftWallTop);

  const leftWallBot = new THREE.Mesh(new THREE.PlaneGeometry(3, 0.8), wallMat);
  leftWallBot.position.set(-ROOM_W / 2, 0.4, 0.5);
  leftWallBot.rotation.y = Math.PI / 2;
  scene.add(leftWallBot);

  // Right wall
  const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_D, ROOM_H), wallMat);
  rightWall.position.set(ROOM_W / 2, ROOM_H / 2, 0);
  rightWall.rotation.y = -Math.PI / 2;
  scene.add(rightWall);

  // Baseboard trim
  function addBaseboard(w, rot, x, z) {
    const bb = new THREE.Mesh(
      new THREE.BoxGeometry(w, 0.12, 0.05),
      darkWoodMat
    );
    bb.rotation.y = rot;
    bb.position.set(x, 0.06, z);
    scene.add(bb);
  }
  addBaseboard(ROOM_W, 0, 0, -ROOM_D / 2 + 0.025);
  addBaseboard(ROOM_W, 0, 0, ROOM_D / 2 - 0.025);
  addBaseboard(ROOM_D, Math.PI / 2, -ROOM_W / 2 + 0.025, 0);
  addBaseboard(ROOM_D, Math.PI / 2, ROOM_W / 2 - 0.025, 0);

  // ── Window (left wall) ───────────────────────────────────────
  const winW = 2.8, winH = 2.2, winX = -ROOM_W / 2 + 0.05, winZ = 0.5, winY = 1.8;

  const winFrame = new THREE.Mesh(new THREE.BoxGeometry(0.07, winH + 0.14, 0.12), windowFrameMat);
  winFrame.position.set(winX, winY, winZ - winW / 2);
  scene.add(winFrame);
  const winFrame2 = winFrame.clone();
  winFrame2.position.set(winX, winY, winZ + winW / 2);
  scene.add(winFrame2);
  const winFrameTop = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.1, winW + 0.07), windowFrameMat);
  winFrameTop.position.set(winX, winY + winH / 2, winZ);
  scene.add(winFrameTop);
  const winFrameBot = winFrameTop.clone();
  winFrameBot.position.set(winX, winY - winH / 2, winZ);
  scene.add(winFrameBot);
  const winCross = new THREE.Mesh(new THREE.BoxGeometry(0.05, winH, 0.06), windowFrameMat);
  winCross.position.set(winX, winY, winZ);
  scene.add(winCross);
  const winCrossH = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.06, winW), windowFrameMat);
  winCrossH.position.set(winX, winY + 0.2, winZ);
  scene.add(winCrossH);

  // Glass panes
  const glassPaneGeo = new THREE.PlaneGeometry(winW - 0.1, winH - 0.1);
  const glassPane = new THREE.Mesh(glassPaneGeo, windowGlassMat);
  glassPane.rotation.y = -Math.PI / 2;
  glassPane.position.set(winX + 0.01, winY, winZ);
  scene.add(glassPane);

  // Night sky outside window
  const skyMat = new THREE.MeshBasicMaterial({ color: 0x0a0f1e, side: THREE.BackSide });
  const skyPane = new THREE.Mesh(new THREE.PlaneGeometry(winW, winH), skyMat);
  skyPane.rotation.y = -Math.PI / 2;
  skyPane.position.set(-ROOM_W / 2 - 0.5, winY, winZ);
  scene.add(skyPane);

  // Stars outside window
  const starGeo = new THREE.BufferGeometry();
  const starVerts = [];
  for (let i = 0; i < 80; i++) {
    starVerts.push(
      (Math.random() - 0.5) * winW * 0.9,
      (Math.random() - 0.5) * winH * 0.85,
      0
    );
  }
  starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVerts, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.04 }));
  stars.rotation.y = -Math.PI / 2;
  stars.position.set(-ROOM_W / 2 - 0.3, winY, winZ);
  scene.add(stars);

  // ── Rug ─────────────────────────────────────────────────────
  const rug = new THREE.Mesh(new THREE.PlaneGeometry(4.5, 3.5), rugMat);
  rug.rotation.x = -Math.PI / 2;
  rug.position.set(0.5, 0.002, 1.5);
  scene.add(rug);

  // ── Desk ─────────────────────────────────────────────────────
  // Desktop surface
  const desk = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.06, 1.1), woodMat);
  desk.position.set(2.2, 1.3, -3.8);
  desk.castShadow = true;
  desk.receiveShadow = true;
  scene.add(desk);

  // Desk legs
  const legGeo = new THREE.BoxGeometry(0.07, 1.24, 0.07);
  const legPositions = [
    [1.0, -4.35], [3.4, -4.35], [1.0, -3.25], [3.4, -3.25]
  ];
  legPositions.forEach(([x, z]) => {
    const leg = new THREE.Mesh(legGeo, darkWoodMat);
    leg.position.set(x, 0.65, z);
    leg.castShadow = true;
    scene.add(leg);
  });

  // Desk drawer block
  const drawerBlock = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.9, 0.95), darkWoodMat);
  drawerBlock.position.set(3.1, 0.77, -3.8);
  drawerBlock.castShadow = true;
  scene.add(drawerBlock);

  // Drawer face lines
  for (let i = 0; i < 3; i++) {
    const dFace = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.22, 0.02), woodMat);
    dFace.position.set(3.1, 0.96 - i * 0.3, -3.305);
    scene.add(dFace);
    const knob = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6, 6), metalMat);
    knob.position.set(3.1, 0.96 - i * 0.3, -3.285);
    scene.add(knob);
  }

  // ── Monitor ──────────────────────────────────────────────────
  // Monitor stand
  const monitorStand = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.04, 12), metalMat);
  monitorStand.position.set(2.0, 1.35, -4.1);
  scene.add(monitorStand);
  const monitorNeck = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.35, 0.04), metalMat);
  monitorNeck.position.set(2.0, 1.55, -4.1);
  scene.add(monitorNeck);

  // Monitor body
  const monitorBody = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.85, 0.07), metalMat);
  monitorBody.position.set(2.0, 1.95, -4.12);
  monitorBody.castShadow = true;
  scene.add(monitorBody);

  // Screen
  const monitorScreen = new THREE.Mesh(new THREE.BoxGeometry(1.28, 0.73, 0.02), screenMat);
  monitorScreen.position.set(2.0, 1.95, -4.08);
  scene.add(monitorScreen);

  // Screen glow
  const screenGlow = new THREE.Mesh(new THREE.BoxGeometry(1.28, 0.73, 0.01), screenGlowMat);
  screenGlow.position.set(2.0, 1.95, -4.065);
  scene.add(screenGlow);

  // Screen content lines (decorative)
  for (let i = 0; i < 6; i++) {
    const line = new THREE.Mesh(
      new THREE.PlaneGeometry(0.9 - i * 0.05, 0.018),
      new THREE.MeshBasicMaterial({ color: i === 0 ? 0x64b5f6 : 0x2980b9, transparent: true, opacity: 0.7 })
    );
    line.position.set(2.0 - 0.1, 2.12 - i * 0.1, -4.057);
    scene.add(line);
  }

  // Interactable: monitor
  const monitorInteract = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.0, 0.2), new THREE.MeshBasicMaterial({ visible: false }));
  monitorInteract.position.set(2.0, 1.95, -4.1);
  monitorInteract.userData.interactionKey = 'monitor';
  monitorInteract.userData.label = 'View Projects';
  scene.add(monitorInteract);
  interactables.push(monitorInteract);

  // Screen point light (monitor glow)
  const screenLight = new THREE.PointLight(0x1a5276, 1.2, 3, 2);
  screenLight.position.set(2.0, 1.95, -3.8);
  scene.add(screenLight);

  // ── Keyboard & Mouse ─────────────────────────────────────────
  const keyboard = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.02, 0.22), darkWoodMat);
  keyboard.position.set(2.0, 1.34, -3.72);
  scene.add(keyboard);
  // Key rows
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 10; c++) {
      const key = new THREE.Mesh(
        new THREE.BoxGeometry(0.055, 0.02, 0.045),
        new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.9 })
      );
      key.position.set(2.0 - 0.29 + c * 0.065, 1.352, -3.63 - r * 0.055);
      scene.add(key);
    }
  }
  const mouse = new THREE.Mesh(
    new THREE.BoxGeometry(0.11, 0.025, 0.17),
    new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.7, metalness: 0.1 })
  );
  mouse.position.set(2.75, 1.34, -3.72);
  scene.add(mouse);

  // ── Desk Lamp ────────────────────────────────────────────────
  // Base
  const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.04, 12), lampBaseMat);
  lampBase.position.set(1.2, 1.34, -4.1);
  scene.add(lampBase);
  // Arm
  const lampArm1 = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.55, 8), lampBaseMat);
  lampArm1.position.set(1.2, 1.6, -4.1);
  lampArm1.rotation.z = 0.3;
  scene.add(lampArm1);
  const lampArm2 = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.45, 8), lampBaseMat);
  lampArm2.position.set(1.34, 1.98, -4.1);
  lampArm2.rotation.z = -0.5;
  scene.add(lampArm2);
  // Shade
  const lampShade = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.22, 12, 1, true), lampShadeMat);
  lampShade.position.set(1.5, 2.08, -4.1);
  lampShade.rotation.x = Math.PI;
  scene.add(lampShade);

  // ── Notebook on desk ─────────────────────────────────────────
  const nbCover = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.02, 0.38), notebookCoverMat);
  nbCover.position.set(2.6, 1.34, -3.65);
  nbCover.rotation.y = 0.15;
  scene.add(nbCover);
  const nbPages = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.015, 0.35), notebookMat);
  nbPages.position.set(2.6, 1.355, -3.65);
  nbPages.rotation.y = 0.15;
  scene.add(nbPages);
  // Notebook lines
  for (let i = 0; i < 5; i++) {
    const ln = new THREE.Mesh(
      new THREE.PlaneGeometry(0.2, 0.008),
      new THREE.MeshStandardMaterial({ color: 0xb0a090, roughness: 1 })
    );
    ln.rotation.x = -Math.PI / 2;
    ln.rotation.z = 0.15;
    ln.position.set(2.6, 1.362, -3.62 - i * 0.055);
    scene.add(ln);
  }
  // Notebook spiral
  for (let i = 0; i < 8; i++) {
    const spiral = new THREE.Mesh(new THREE.TorusGeometry(0.012, 0.004, 4, 8), metalMat);
    spiral.rotation.x = Math.PI / 2;
    spiral.rotation.z = 0.15;
    spiral.position.set(2.47, 1.363, -3.51 - i * 0.042);
    scene.add(spiral);
  }

  // Interactable: notebook
  const notebookInteract = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.08, 0.45), new THREE.MeshBasicMaterial({ visible: false }));
  notebookInteract.position.set(2.6, 1.36, -3.65);
  notebookInteract.rotation.y = 0.15;
  notebookInteract.userData.interactionKey = 'notebook';
  notebookInteract.userData.label = 'Read Notebook';
  scene.add(notebookInteract);
  interactables.push(notebookInteract);

  // ── Chair ────────────────────────────────────────────────────
  // Seat
  const chairSeat = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.06, 0.68), chairMat);
  chairSeat.position.set(2.2, 1.1, -2.9);
  chairSeat.castShadow = true;
  scene.add(chairSeat);
  // Back
  const chairBack = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.85, 0.06), chairMat);
  chairBack.position.set(2.2, 1.55, -3.24);
  scene.add(chairBack);
  // Legs (5-star base)
  for (let a = 0; a < 5; a++) {
    const angle = (a / 5) * Math.PI * 2;
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 0.38), metalMat);
    arm.position.set(2.2 + Math.sin(angle) * 0.22, 0.04, -2.9 + Math.cos(angle) * 0.22);
    arm.rotation.y = angle;
    scene.add(arm);
    const wheel = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 6), new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 }));
    wheel.position.set(2.2 + Math.sin(angle) * 0.4, 0.04, -2.9 + Math.cos(angle) * 0.4);
    scene.add(wheel);
  }
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.0, 8), metalMat);
  stem.position.set(2.2, 0.6, -2.9);
  scene.add(stem);
  // Armrests
  const armRest = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.3, 0.5), chairMat);
  armRest.position.set(1.85, 1.25, -3.05);
  scene.add(armRest);
  const armRest2 = armRest.clone();
  armRest2.position.set(2.55, 1.25, -3.05);
  scene.add(armRest2);

  // ── Bookshelf ────────────────────────────────────────────────
  // Main body
  const shelfBody = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.2, 2.2), darkWoodMat);
  shelfBody.position.set(-4.85, 1.6, -2.5);
  shelfBody.castShadow = true;
  scene.add(shelfBody);

  // Shelves
  const shelfData = [0.5, 1.2, 1.9, 2.6, 3.1];
  shelfData.forEach(y => {
    const shelf = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.04, 2.1), woodMat);
    shelf.position.set(-4.72, y, -2.5);
    scene.add(shelf);
  });

  // Books on shelves
  const bookConfigs = [
    { shelfY: 0.6, books: [0.9, 0.7, 0.65, 0.8, 0.72, 0.68, 0.85] },
    { shelfY: 1.3, books: [0.75, 0.8, 0.7, 0.65, 0.9] },
    { shelfY: 2.0, books: [0.85, 0.7, 0.72, 0.78, 0.65, 0.8] },
    { shelfY: 2.7, books: [0.7, 0.65, 0.8, 0.72] },
  ];

  bookConfigs.forEach(({ shelfY, books }) => {
    let xOffset = -2.5 - (books.length * 0.14) / 2;
    books.forEach((h, bi) => {
      const w = 0.09 + Math.random() * 0.04;
      const book = new THREE.Mesh(
        new THREE.BoxGeometry(0.065, h, w),
        bookMats[bi % bookMats.length]
      );
      book.position.set(-4.68, shelfY + h / 2, xOffset + bi * 0.15);
      book.rotation.y = (Math.random() - 0.5) * 0.05;
      book.castShadow = true;
      scene.add(book);
    });
  });

  // Interactable: bookshelf
  const shelfInteract = new THREE.Mesh(new THREE.BoxGeometry(0.5, 3.2, 2.4), new THREE.MeshBasicMaterial({ visible: false }));
  shelfInteract.position.set(-4.8, 1.6, -2.5);
  shelfInteract.userData.interactionKey = 'bookshelf';
  shelfInteract.userData.label = 'Browse Shelf';
  scene.add(shelfInteract);
  interactables.push(shelfInteract);

  // ── Painting on back wall ─────────────────────────────────────
  // Outer frame
  const paintFrameW = 1.6, paintFrameH = 1.1;
  const paintFrame = new THREE.Mesh(new THREE.BoxGeometry(paintFrameW + 0.1, paintFrameH + 0.1, 0.06), frameGoldMat);
  paintFrame.position.set(-1.8, 2.8, -4.97);
  paintFrame.castShadow = true;
  scene.add(paintFrame);
  // Canvas
  const paintCanvas = new THREE.Mesh(new THREE.BoxGeometry(paintFrameW, paintFrameH, 0.03), canvasMat);
  paintCanvas.position.set(-1.8, 2.8, -4.95);
  scene.add(paintCanvas);

  // Abstract painting strokes (colored planes)
  const strokeColors = [0xe8a455, 0xc4832a, 0x8b4513, 0xd4691e, 0xffd090, 0x3d2210];
  for (let i = 0; i < 12; i++) {
    const stroke = new THREE.Mesh(
      new THREE.PlaneGeometry(
        0.2 + Math.random() * 0.6,
        0.05 + Math.random() * 0.25
      ),
      new THREE.MeshStandardMaterial({
        color: strokeColors[Math.floor(Math.random() * strokeColors.length)],
        roughness: 0.9,
        transparent: true,
        opacity: 0.7 + Math.random() * 0.3,
      })
    );
    stroke.position.set(
      -1.8 + (Math.random() - 0.5) * paintFrameW * 0.8,
      2.8 + (Math.random() - 0.5) * paintFrameH * 0.8,
      -4.93
    );
    stroke.rotation.z = (Math.random() - 0.5) * 0.8;
    scene.add(stroke);
  }

  // Interactable: painting
  const paintInteract = new THREE.Mesh(
    new THREE.BoxGeometry(paintFrameW + 0.2, paintFrameH + 0.2, 0.15),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  paintInteract.position.set(-1.8, 2.8, -4.97);
  paintInteract.userData.interactionKey = 'painting';
  paintInteract.userData.label = 'View Painting';
  scene.add(paintInteract);
  interactables.push(paintInteract);

  // ── Photo frame on desk ───────────────────────────────────────
  const photoFrameBody = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.28, 0.03), photoFrameMat);
  photoFrameBody.position.set(1.3, 1.49, -4.08);
  photoFrameBody.rotation.y = -0.25;
  scene.add(photoFrameBody);
  const photo = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.24, 0.02), photoMat);
  photo.position.set(1.3, 1.49, -4.07);
  photo.rotation.y = -0.25;
  scene.add(photo);
  // Photo stand
  const photoStand = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.15, 0.1), photoFrameMat);
  photoStand.position.set(1.3, 1.38, -4.03);
  photoStand.rotation.x = 0.4;
  photoStand.rotation.y = -0.25;
  scene.add(photoStand);

  // Interactable: photo frame
  const photoInteract = new THREE.Mesh(
    new THREE.BoxGeometry(0.35, 0.35, 0.15),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  photoInteract.position.set(1.3, 1.49, -4.08);
  photoInteract.rotation.y = -0.25;
  photoInteract.userData.interactionKey = 'photoframe';
  photoInteract.userData.label = 'Look Closer';
  scene.add(photoInteract);
  interactables.push(photoInteract);

  // ── Door (front wall) ─────────────────────────────────────────
  const doorW = 1.1, doorH = 3.2;
  const doorPanel = new THREE.Mesh(new THREE.BoxGeometry(doorW, doorH, 0.08), doorMat);
  doorPanel.position.set(0, doorH / 2, ROOM_D / 2 - 0.04);
  doorPanel.rotation.y = Math.PI;
  scene.add(doorPanel);

  // Door panels (decorative inset)
  [[0, 0.7], [0, -0.7]].forEach(([dx, dy]) => {
    const inset = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.85, 0.025), woodMat);
    inset.position.set(dx, doorH / 2 + dy, ROOM_D / 2 - 0.09);
    inset.rotation.y = Math.PI;
    scene.add(inset);
  });

  // Doorknob
  const knobSphere = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), doorKnobMat);
  knobSphere.position.set(0.47, 1.5, ROOM_D / 2 - 0.08);
  scene.add(knobSphere);
  const knobPlate = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.14, 0.02), doorKnobMat);
  knobPlate.position.set(0.47, 1.5, ROOM_D / 2 - 0.06);
  scene.add(knobPlate);

  // Door frame
  const doorFrameL = new THREE.Mesh(new THREE.BoxGeometry(0.1, doorH + 0.1, 0.12), darkWoodMat);
  doorFrameL.position.set(-doorW / 2 - 0.05, doorH / 2, ROOM_D / 2);
  scene.add(doorFrameL);
  const doorFrameR = doorFrameL.clone();
  doorFrameR.position.set(doorW / 2 + 0.05, doorH / 2, ROOM_D / 2);
  scene.add(doorFrameR);
  const doorFrameTop = new THREE.Mesh(new THREE.BoxGeometry(doorW + 0.2, 0.1, 0.12), darkWoodMat);
  doorFrameTop.position.set(0, doorH + 0.05, ROOM_D / 2);
  scene.add(doorFrameTop);

  // Interactable: door
  const doorInteract = new THREE.Mesh(
    new THREE.BoxGeometry(doorW + 0.1, doorH, 0.2),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  doorInteract.position.set(0, doorH / 2, ROOM_D / 2 - 0.05);
  doorInteract.userData.interactionKey = 'door';
  doorInteract.userData.label = 'Open Door';
  scene.add(doorInteract);
  interactables.push(doorInteract);

  // ── Plant (corner) ────────────────────────────────────────────
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.12, 0.3, 10), new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.9 }));
  pot.position.set(-4.4, 0.15, 4.2);
  scene.add(pot);
  const soil = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.02, 10), new THREE.MeshStandardMaterial({ color: 0x1a0f0a, roughness: 1 }));
  soil.position.set(-4.4, 0.31, 4.2);
  scene.add(soil);
  // Leaves
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const r = 0.08 + Math.random() * 0.12;
    const leaf = new THREE.Mesh(
      new THREE.PlaneGeometry(0.18 + Math.random() * 0.14, 0.5 + Math.random() * 0.35),
      new THREE.MeshStandardMaterial({ color: 0x1a4a1a, roughness: 0.9, side: THREE.DoubleSide })
    );
    leaf.position.set(
      -4.4 + Math.sin(angle) * r,
      0.6 + Math.random() * 0.4,
      4.2 + Math.cos(angle) * r
    );
    leaf.rotation.y = angle;
    leaf.rotation.z = (Math.random() - 0.5) * 0.6 + 0.3;
    scene.add(leaf);
  }

  // ── Ceiling light fixture ─────────────────────────────────────
  const fixtureBase = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.04, 12), metalMat);
  fixtureBase.position.set(0, ROOM_H - 0.02, 0);
  scene.add(fixtureBase);
  const fixturePole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.3, 8), metalMat);
  fixturePole.position.set(0, ROOM_H - 0.17, 0);
  scene.add(fixturePole);
  const fixtureShade = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.22, 16, 1, true), lampShadeMat);
  fixtureShade.position.set(0, ROOM_H - 0.38, 0);
  fixtureShade.rotation.x = Math.PI;
  scene.add(fixtureShade);

  // ── Couch (lounge area) ───────────────────────────────────────
  const couchBase = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 0.45, 0.9),
    new THREE.MeshStandardMaterial({ color: 0x3a2820, roughness: 0.95 })
  );
  couchBase.position.set(-1.5, 0.42, 3.8);
  couchBase.castShadow = true;
  scene.add(couchBase);
  const couchBack = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 0.65, 0.18),
    new THREE.MeshStandardMaterial({ color: 0x3a2820, roughness: 0.95 })
  );
  couchBack.position.set(-1.5, 0.82, 3.36);
  scene.add(couchBack);
  // Cushions
  [-0.65, 0, 0.65].forEach(cx => {
    const cushion = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.12, 0.75),
      new THREE.MeshStandardMaterial({ color: 0x4a3428, roughness: 0.9 })
    );
    cushion.position.set(-1.5 + cx, 0.67, 3.78);
    scene.add(cushion);
  });
  // Armrests
  [-1.2, 1.2].forEach(cx => {
    const arm = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.6, 0.9),
      new THREE.MeshStandardMaterial({ color: 0x2a1810, roughness: 0.95 })
    );
    arm.position.set(-1.5 + cx, 0.5, 3.8);
    scene.add(arm);
  });

  // ── Side table ────────────────────────────────────────────────
  const sideTable = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.25, 0.04, 12), woodMat);
  sideTable.position.set(0.6, 0.65, 3.5);
  scene.add(sideTable);
  const sideTableLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.6, 8), darkWoodMat);
  sideTableLeg.position.set(0.6, 0.34, 3.5);
  scene.add(sideTableLeg);

  // Coffee mug on side table
  const mugBody = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.055, 0.1, 10), new THREE.MeshStandardMaterial({ color: 0xd4d4d4, roughness: 0.7 }));
  mugBody.position.set(0.6, 0.72, 3.5);
  scene.add(mugBody);
  const mugHandle = new THREE.Mesh(new THREE.TorusGeometry(0.04, 0.012, 6, 12, Math.PI), new THREE.MeshStandardMaterial({ color: 0xd4d4d4, roughness: 0.7 }));
  mugHandle.position.set(0.64, 0.72, 3.5);
  mugHandle.rotation.y = Math.PI / 2;
  scene.add(mugHandle);

  return interactables;
}
