# AGENT.md — abhijitparida.me

Project notes for Antigravity (or any future agent) working on this repo.

---

## What This Project Is

A **Three.js first-person 3D room** portfolio for `abhijitparida.me`. Instead of a traditional webpage, visitors walk through a cozy lo-fi study room and interact with objects to learn about Abhijit. Think walking simulator meets personal portfolio.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Three.js](https://threejs.org) | 3D rendering (npm package, not CDN) |
| [Vite](https://vite.dev) | Dev server + bundler |
| HTML / Vanilla CSS | UI overlays, panels, animations |
| PointerLock API | First-person mouse look |
| GitHub Actions | CI/CD deploy to GitHub Pages |

**Node version**: 20+  
**Three.js version**: check `package.json`  
**Deploy target**: `abhijitparida.me` (CNAME set, GitHub Pages)

---

## Project Structure

```
abhijitparida.me/
├── index.html                        ← entry HTML: loading screen, enter screen, canvas, info panel overlay
├── vite.config.js                    ← Vite config (base: '/')
├── package.json
├── CNAME                             ← abhijitparida.me
├── .github/
│   └── workflows/
│       └── deploy.yml                ← auto deploy to GitHub Pages on push to main
└── src/
    ├── main.js                       ← entry point: boots scene, game loop, loading flow
    ├── style.css                     ← global styles, design tokens, all UI components
    ├── data/
    │   └── content.js                ← ALL personal content lives here (edit this!)
    ├── scene/
    │   ├── Room.js                   ← 3D room geometry: walls, furniture, all objects
    │   └── Lighting.js               ← warm ambient + flickering desk lamp + ceiling light
    ├── controls/
    │   └── FirstPersonControls.js    ← PointerLock WASD movement + mouse look + collision
    └── interaction/
        ├── Interactables.js          ← raycasting system: hover detect, crosshair, E key
        └── InfoPanel.js              ← overlay panel that reads from content.js
```

---

## Running Locally

```bash
npm install
npm run dev
# → http://localhost:5173
```

## Building for Production

```bash
npm run build
# output in dist/
```

---

## How Content Works

All personal text/HTML lives in **[`src/data/content.js`](./src/data/content.js)**. Each key maps to an interactable object in the room:

| Key | Object in Room | What It Shows |
|---|---|---|
| `painting` | Framed painting on back wall | About / Bio |
| `monitor` | Monitor on desk | Projects (with links) |
| `bookshelf` | Bookshelf on left wall | Skills / Tech stack |
| `notebook` | Notebook on desk | Interests / hobbies |
| `photoframe` | Photo frame on desk | What I'm up to now |
| `door` | Door on front wall | Contact / Social links |

To update content: open `src/data/content.js`, edit the `tag`, `title`, and `body` (HTML string) fields for whichever key you want. No other files need changing.

---

## Interaction System

1. **PointerLock** — click "Enter" → pointer is locked, mouse look enabled
2. **Raycaster** — every frame, a ray is cast from the camera through screen center
3. **Hover** — if ray hits an interactable within 3.5 units, crosshair glows amber + prompt shows
4. **Interact** — press `E` or click → pointer is unlocked, info panel opens with content
5. **Close** — click `×`, press `ESC`, or click the backdrop → panel closes, pointer re-locks

**Interactable meshes** are invisible `BoxGeometry` with `visible: false` placed over the real geometry. They live in `Room.js` and have `userData.interactionKey` and `userData.label` set.

---

## Controls (In-Game)

| Input | Action |
|---|---|
| `W` / `↑` | Move forward |
| `S` / `↓` | Move backward |
| `A` / `←` | Strafe left |
| `D` / `→` | Strafe right |
| Mouse | Look around |
| `E` or Click | Interact with highlighted object |
| `ESC` | Release mouse / close panel |

---

## Collision System

Player is constrained to room bounds in `FirstPersonControls.js`:

```js
bounds: { minX: -4.3, maxX: 4.3, minZ: -4.0, maxZ: 4.7 }
```

Additional blocked zones (desk, bookshelf, couch) are rectangular AABB checks. If you add furniture, add a new entry to the `blockedZones` array.

---

## Lighting

All lights are in `Lighting.js`:

- **Ambient** — warm golden `#ffd090`, intensity `0.35`
- **Desk lamp** (PointLight) — warm orange `#ff9f4a`, intensity `4.5`, subtle animated flicker
- **Ceiling** (PointLight) — warm `#ffecd0`, intensity `1.2`
- **Window fill** (DirectionalLight) — cool blue `#8ab4e0`, intensity `0.15` (simulates night outside)

---

## Design System (CSS)

CSS variables defined in `src/style.css`:

```css
--amber:       #e8a455   /* primary accent, crosshair, labels */
--amber-dark:  #c4832a   /* darker amber */
--cream:       #f5ede0   /* primary text */
--cream-dim:   #d4c4a8   /* secondary text */
--brown:       #3d2b1f   /* dark background element */
--brown-mid:   #5c3d2a
--ink:         #1a1007   /* darkest bg */
--panel-bg:    rgba(30, 18, 8, 0.96)
--panel-border: rgba(232, 164, 85, 0.25)
```

Font: `Inter` (UI) + `Lora` (headings/serif) via Google Fonts.

---

## Deployment

**Auto-deploy**: push to `main` → GitHub Actions runs `npm ci && npm run build` → deploys `dist/` to GitHub Pages.

**First-time setup**: Go to GitHub repo → Settings → Pages → Source: **GitHub Actions**.

---

## Known Issues / Notes

- `THREE.Timer` is used instead of deprecated `THREE.Clock` (fixed post-scaffold)
- `PCFShadowMap` is used instead of deprecated `PCFSoftShadowMap` (fixed post-scaffold)
- Shadows use 512×512 shadow maps (balanced quality/perf). Increase to 1024 if shadow quality looks bad
- No mobile support currently — PointerLock doesn't work on iOS/Android without extra work
- No model loading (GLB/GLTF) — all geometry is procedural Three.js for zero asset deps

---

## Future Ideas

- [ ] Load GLTF models for higher-fidelity furniture
- [ ] Add ambient room sounds (lo-fi music, rain on window)
- [ ] Animate door opening on interact
- [ ] Add a working "clock" on the wall showing real time
- [ ] Mobile touch controls (joystick + swipe look)
- [ ] Transition animations between rooms
- [ ] Dark mode / light mode toggle (night vs day lighting)
