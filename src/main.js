import * as THREE from "three";
import "./style.css";

import { Player } from "./player/Player.js";
import { EnemyManager } from "./enemies/EnemyManager.js";
import { WeaponManager } from "./weapons/WeaponManager.js";

// --------------------------------------------------
// BATTLE FORGE
// --------------------------------------------------

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x080b12);

// --------------------------------------------------
// CAMERA
// --------------------------------------------------

const camera = new THREE.PerspectiveCamera(
70,
window.innerWidth / window.innerHeight,
0.1,
2000
);

// --------------------------------------------------
// RENDERER
// --------------------------------------------------

const renderer = new THREE.WebGLRenderer({
antialias: true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

renderer.setPixelRatio(
Math.min(window.devicePixelRatio, 2)
);

document.body.appendChild(
renderer.domElement
);

// --------------------------------------------------
// LIGHTING
// --------------------------------------------------

const ambientLight = new THREE.AmbientLight(
0xffffff,
0.7
);

scene.add(ambientLight);

const mainLight = new THREE.DirectionalLight(
0xffffff,
1.5
);

mainLight.position.set(
10,
20,
10
);

scene.add(mainLight);

// --------------------------------------------------
// ARENA
// --------------------------------------------------

const arenaGeometry = new THREE.BoxGeometry(
40,
1,
40
);

const arenaMaterial = new THREE.MeshStandardMaterial({
color: 0x202633
});

const arena = new THREE.Mesh(
arenaGeometry,
arenaMaterial
);

arena.position.y = -0.5;

scene.add(arena);

// --------------------------------------------------
// FORGE
// --------------------------------------------------

const forgeGeometry = new THREE.CylinderGeometry(
3,
4,
5,
8
);

const forgeMaterial = new THREE.MeshStandardMaterial({
color: 0x6d7485,
metalness: 0.8,
roughness: 0.3
});

const forge = new THREE.Mesh(
forgeGeometry,
forgeMaterial
);

forge.position.y = 2.5;

scene.add(forge);

// --------------------------------------------------
// FORGE ENERGY
// --------------------------------------------------

const energyGeometry = new THREE.SphereGeometry(
1.5,
32,
32
);

const energyMaterial = new THREE.MeshStandardMaterial({
color: 0x4b8cff,
emissive: 0x1a4fff,
emissiveIntensity: 2
});

const forgeEnergy = new THREE.Mesh(
energyGeometry,
energyMaterial
);

forgeEnergy.position.y = 5.5;

scene.add(forgeEnergy);

// --------------------------------------------------
// PLAYER
// --------------------------------------------------

const player = new Player(
scene,
camera
);

// --------------------------------------------------
// ENEMIES
// --------------------------------------------------

const enemyManager = new EnemyManager(
scene
);

enemyManager.spawnInitialEnemies();

// --------------------------------------------------
// WEAPONS
// --------------------------------------------------

const weaponManager = new WeaponManager(
scene,
player,
enemyManager
);

// --------------------------------------------------
// CROSSHAIR
// --------------------------------------------------

const crosshair = document.createElement("div");

crosshair.innerHTML = "+";

crosshair.style.position = "fixed";
crosshair.style.left = "50%";
crosshair.style.top = "50%";
crosshair.style.transform =
"translate(-50%, -50%)";

crosshair.style.color = "white";
crosshair.style.fontSize = "28px";
crosshair.style.fontWeight = "bold";
crosshair.style.pointerEvents = "none";
crosshair.style.zIndex = "1000";

crosshair.style.textShadow =
"0 0 5px black";

document.body.appendChild(
crosshair
);

// --------------------------------------------------
// WINDOW RESIZE
// --------------------------------------------------

window.addEventListener(
"resize",
() => {
camera.aspect =
window.innerWidth /
window.innerHeight;

```
    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
}
```

);

// --------------------------------------------------
// GAME LOOP
// --------------------------------------------------

function animate() {
requestAnimationFrame(
animate
);

```
player.update();

player.updateCamera();

enemyManager.update(
    player
);

weaponManager.update();

forgeEnergy.rotation.y += 0.01;

const pulse =
    1.5 +
    Math.sin(
        Date.now() * 0.003
    ) * 0.15;

forgeEnergy.scale.set(
    pulse,
    pulse,
    pulse
);

renderer.render(
    scene,
    camera
);
```

}

animate();
