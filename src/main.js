import * as THREE from "three";
import "./style.css";

import { Player } from "./player/Player.js";
import { EnemyManager } from "./enemies/EnemyManager.js";
import { WeaponManager } from "./weapons/WeaponManager.js";
import { HUD } from "./ui/HUD.js";

const scene =
new THREE.Scene();

scene.background =
new THREE.Color(
0x080b12
);

const camera =
new THREE.PerspectiveCamera(
70,
window.innerWidth /
window.innerHeight,
0.1,
2000
);

const renderer =
new THREE.WebGLRenderer({
antialias: true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

renderer.setPixelRatio(
Math.min(
window.devicePixelRatio,
2
)
);

document.body.appendChild(
renderer.domElement
);

const ambientLight =
new THREE.AmbientLight(
0xffffff,
0.7
);

scene.add(
ambientLight
);

const mainLight =
new THREE.DirectionalLight(
0xffffff,
1.5
);

mainLight.position.set(
10,
20,
10
);

scene.add(
mainLight
);

const arenaGeometry =
new THREE.BoxGeometry(
40,
1,
40
);

const arenaMaterial =
new THREE.MeshStandardMaterial({
color: 0x202633,
metalness: 0.3,
roughness: 0.8
});

const arena =
new THREE.Mesh(
arenaGeometry,
arenaMaterial
);

arena.position.y =
-0.5;

scene.add(
arena
);

const forgeGeometry =
new THREE.CylinderGeometry(
3,
4,
5,
8
);

const forgeMaterial =
new THREE.MeshStandardMaterial({
color: 0x6d7485,
metalness: 0.8,
roughness: 0.3
});

const forge =
new THREE.Mesh(
forgeGeometry,
forgeMaterial
);

forge.position.y =
2.5;

scene.add(
forge
);

const energyGeometry =
new THREE.SphereGeometry(
1.5,
32,
32
);

const energyMaterial =
new THREE.MeshStandardMaterial({
color: 0x4b8cff,
emissive: 0x1a4fff,
emissiveIntensity: 2
});

const forgeEnergy =
new THREE.Mesh(
energyGeometry,
energyMaterial
);

forgeEnergy.position.y =
5.5;

scene.add(
forgeEnergy
);

const player =
new Player(
scene,
camera
);

const enemyManager =
new EnemyManager(
scene
);

enemyManager.spawnInitialEnemies();

const weaponManager =
new WeaponManager(
scene,
player,
enemyManager
);

const hud =
new HUD();

window.addEventListener(
"resize",
() => {
camera.aspect =
window.innerWidth /
window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
}

);

function animate() {
requestAnimationFrame(
animate
);

player.update();

player.updateCamera();

enemyManager.update(
    player
);

weaponManager.update();

hud.updateHealth(
    player.health,
    player.maxHealth
);

hud.updateShield(
    player.shield,
    player.maxShield
);

hud.updateEnergy(
    player.energy
);

hud.updateLevel(
    player.level,
    player.xp,
    player.requiredXP
);

hud.updateEnemies(
    enemyManager.getEnemyCount(),
    enemyManager.getTotalEnemies()
);

hud.updateWeapon(
    weaponManager
        .getCurrentWeapon()
        .name,
    weaponManager.getAmmo(),
    weaponManager.getMagazineSize(),
    weaponManager.isReloading()
);

forgeEnergy.rotation.y +=
    0.01;

const pulse =
    1.5 +
    Math.sin(
        Date.now() *
            0.003
    ) *
        0.15;

forgeEnergy.scale.set(
    pulse,
    pulse,
    pulse
);

renderer.render(
    scene,
    camera
);

}

animate();