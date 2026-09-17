import * as THREE from "three";

export const HEROES = {
guardian: {
name: "The Guardian",
role: "Tank / Defense",
color: 0x4b8cff,
energyColor: 0x1a4fff,
weapon: "Plasma Assault Rifle",
abilities: [
"Shield Barrier",
"Ground Slam",
"Team Heal"
]
},

shadow: {
    name: "The Shadow",
    role: "Assassin / Stealth",
    color: 0x8b5cf6,
    energyColor: 0x6d28d9,
    weapon: "Energy Blades / Bow",
    abilities: [
        "Shadow Step",
        "Smoke Bomb",
        "Precision Strike"
    ]
},

warden: {
    name: "The Warden",
    role: "Support / Healer",
    color: 0xf0c419,
    energyColor: 0xffd84d,
    weapon: "Healing Staff / Energy Pistol",
    abilities: [
        "Healing Wave",
        "Energy Shield",
        "Resurrection"
    ]
},

reaver: {
    name: "The Reaver",
    role: "DPS / Damage",
    color: 0xff3b30,
    energyColor: 0xd71920,
    weapon: "Heavy Blaster / Shotgun",
    abilities: [
        "Berserker Rage",
        "Dash Strike",
        "Overload"
    ]
},

sentinel: {
    name: "The Sentinel",
    role: "Ranged / Control",
    color: 0x22d3ee,
    energyColor: 0x0891b2,
    weapon: "Sniper Rifle / Tactical Drone",
    abilities: [
        "Hacking Pulse",
        "Tactical Drone",
        "Time Slow"
    ]
}

};

export class Player {
constructor(scene, camera) {
this.scene = scene;
this.camera = camera;

    this.heroId = "guardian";
    this.hero = HEROES[this.heroId];

    this.health = 100;
    this.maxHealth = 100;

    this.shield = 80;
    this.maxShield = 100;

    this.energy = 70;
    this.maxEnergy = 100;

    this.level = 3;
    this.xp = 120;
    this.requiredXP = 300;

    this.speed = 0.12;

    this.position = new THREE.Vector3(
        0,
        1,
        10
    );

    this.keys = {};

    this.rotationY = 0;
    this.rotationX = 0;

    this.mouseSensitivity = 0.0025;

    this.cameraDistance = 12;
    this.cameraHeight = 7;

    this.createPlayer();

    this.setupControls();

    this.setupMouseControls();
}

createPlayer() {
    this.mesh = new THREE.Group();

    this.mesh.position.copy(
        this.position
    );

    const armorMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x252b35,
            metalness: 0.85,
            roughness: 0.28
        });

    const darkArmorMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x111722,
            metalness: 0.75,
            roughness: 0.32
        });

    const silverMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x9ba6b7,
            metalness: 0.9,
            roughness: 0.22
        });

    const blueMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x123c91,
            emissive: 0x124fff,
            emissiveIntensity: 1.8,
            metalness: 0.7,
            roughness: 0.25
        });

    const skinMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x8d552f,
            roughness: 0.8
        });

    const hairMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x111111,
            roughness: 0.9
        });

    const capeMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x07152f,
            emissive: 0x071d55,
            emissiveIntensity: 0.5,
            metalness: 0.35,
            roughness: 0.65,
            side: THREE.DoubleSide
        });

    const leftThigh =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.65,
                1.15,
                0.7
            ),
            armorMaterial
        );

    leftThigh.position.set(
        -0.45,
        0.85,
        0
    );

    this.mesh.add(
        leftThigh
    );

    const rightThigh =
        leftThigh.clone();

    rightThigh.position.x =
        0.45;

    this.mesh.add(
        rightThigh
    );

    const leftBoot =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.7,
                0.75,
                0.95
            ),
            darkArmorMaterial
        );

    leftBoot.position.set(
        -0.45,
        0.05,
        -0.08
    );

    this.mesh.add(
        leftBoot
    );

    const rightBoot =
        leftBoot.clone();

    rightBoot.position.x =
        0.45;

    this.mesh.add(
        rightBoot
    );

    const torso =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.55,
                1.8,
                0.75
            ),
            armorMaterial
        );

    torso.position.y =
        2.15;

    this.mesh.add(
        torso
    );

    const chestPlate =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.15,
                1.25,
                0.18
            ),
            silverMaterial
        );

    chestPlate.position.set(
        0,
        2.25,
        -0.42
    );

    this.mesh.add(
        chestPlate
    );

    const core =
        new THREE.Mesh(
            new THREE.OctahedronGeometry(
                0.28,
                0
            ),
            blueMaterial
        );

    core.position.set(
        0,
        2.35,
        -0.58
    );

    this.mesh.add(
        core
    );

    const leftShoulder =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.48,
                16,
                12
            ),
            silverMaterial
        );

    leftShoulder.scale.set(
        1.25,
        0.75,
        1
    );

    leftShoulder.position.set(
        -0.95,
        2.75,
        0
    );

    this.mesh.add(
        leftShoulder
    );

    const rightShoulder =
        leftShoulder.clone();

    rightShoulder.position.x =
        0.95;

    this.mesh.add(
        rightShoulder
    );

    const leftArm =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.45,
                1.15,
                0.5
            ),
            armorMaterial
        );

    leftArm.position.set(
        -1.0,
        2.05,
        0
    );

    this.mesh.add(
        leftArm
    );

    const rightArm =
        leftArm.clone();

    rightArm.position.x =
        1.0;

    this.mesh.add(
        rightArm
    );

    const leftForearm =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.48,
                0.9,
                0.55
            ),
            darkArmorMaterial
        );

    leftForearm.position.set(
        -1.0,
        1.15,
        -0.05
    );

    this.mesh.add(
        leftForearm
    );

    const rightForearm =
        leftForearm.clone();

    rightForearm.position.x =
        1.0;

    this.mesh.add(
        rightForearm
    );

    const neck =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.25,
                0.3,
                0.35,
                12
            ),
            darkArmorMaterial
        );

    neck.position.y =
        3.15;

    this.mesh.add(
        neck
    );

    const head =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.48,
                24,
                18
            ),
            skinMaterial
        );

    head.scale.set(
        0.9,
        1.08,
        0.92
    );

    head.position.set(
        0,
        3.7,
        -0.02
    );

    this.mesh.add(
        head
    );

    const hair =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.49,
                20,
                12
            ),
            hairMaterial
        );

    hair.scale.set(
        0.92,
        0.48,
        0.9
    );

    hair.position.set(
        0,
        4.03,
        -0.01
    );

    this.mesh.add(
        hair
    );

    const foreheadCore =
        new THREE.Mesh(
            new THREE.OctahedronGeometry(
                0.08,
                0
            ),
            blueMaterial
        );

    foreheadCore.position.set(
        0,
        3.78,
        -0.43
    );

    this.mesh.add(
        foreheadCore
    );

    const capeGeometry =
        new THREE.PlaneGeometry(
            1.9,
            3.8,
            8,
            8
        );

    const cape =
        new THREE.Mesh(
            capeGeometry,
            capeMaterial
        );

    cape.position.set(
        0,
        1.75,
        0.48
    );

    cape.rotation.x =
        THREE.MathUtils.degToRad(3);

    this.mesh.add(
        cape
    );

    const capeSymbol =
        new THREE.Mesh(
            new THREE.OctahedronGeometry(
                0.3,
                0
            ),
            blueMaterial
        );

    capeSymbol.position.set(
        0,
        2.1,
        0.51
    );

    capeSymbol.scale.set(
        0.6,
        1.5,
        0.2
    );

    this.mesh.add(
        capeSymbol
    );

    const energyStripGeometry =
        new THREE.BoxGeometry(
            0.08,
            0.75,
            0.05
        );

    const leftStrip =
        new THREE.Mesh(
            energyStripGeometry,
            blueMaterial
        );

    leftStrip.position.set(
        -0.49,
        2.25,
        -0.54
    );

    this.mesh.add(
        leftStrip
    );

    const rightStrip =
        leftStrip.clone();

    rightStrip.position.x =
        0.49;

    this.mesh.add(
        rightStrip
    );

    this.scene.add(
        this.mesh
    );
}

setupControls() {
    window.addEventListener(
        "keydown",
        (event) => {
            this.keys[
                event.key.toLowerCase()
            ] = true;
        }
    );

    window.addEventListener(
        "keyup",
        (event) => {
            this.keys[
                event.key.toLowerCase()
            ] = false;
        }
    );
}

setupMouseControls() {
    window.addEventListener(
        "mousemove",
        (event) => {
            if (
                document.pointerLockElement !==
                document.body
            ) {
                return;
            }

            this.rotationY -=
                event.movementX *
                this.mouseSensitivity;

            this.rotationX -=
                event.movementY *
                this.mouseSensitivity;

            this.rotationX =
                THREE.MathUtils.clamp(
                    this.rotationX,
                    -0.8,
                    0.8
                );
        }
    );

    window.addEventListener(
        "click",
        () => {
            document.body.requestPointerLock();
        }
    );
}

update() {
    const forward =
        new THREE.Vector3(
            Math.sin(this.rotationY),
            0,
            Math.cos(this.rotationY)
        );

    const right =
        new THREE.Vector3(
            Math.cos(this.rotationY),
            0,
            -Math.sin(this.rotationY)
        );

    if (this.keys["w"]) {
        this.mesh.position.add(
            forward
                .clone()
                .multiplyScalar(
                    -this.speed
                )
        );
    }

    if (this.keys["s"]) {
        this.mesh.position.add(
            forward
                .clone()
                .multiplyScalar(
                    this.speed
                )
        );
    }

    if (this.keys["a"]) {
        this.mesh.position.add(
            right
                .clone()
                .multiplyScalar(
                    -this.speed
                )
        );
    }

    if (this.keys["d"]) {
        this.mesh.position.add(
            right
                .clone()
                .multiplyScalar(
                    this.speed
                )
        );
    }

    this.mesh.position.x =
        THREE.MathUtils.clamp(
            this.mesh.position.x,
            -18,
            18
        );

    this.mesh.position.z =
        THREE.MathUtils.clamp(
            this.mesh.position.z,
            -18,
            18
        );

    this.mesh.rotation.y =
        this.rotationY;
}

updateCamera() {
    const offset =
        new THREE.Vector3(
            0,
            this.cameraHeight,
            this.cameraDistance
        );

    offset.applyAxisAngle(
        new THREE.Vector3(0, 1, 0),
        this.rotationY
    );

    this.camera.position.copy(
        this.mesh.position
    ).add(offset);

    const lookTarget =
        this.mesh.position.clone();

    lookTarget.y += 1;

    const lookDirection =
        new THREE.Vector3(
            0,
            0,
            -1
        );

    lookDirection.applyEuler(
        new THREE.Euler(
            this.rotationX,
            this.rotationY,
            0,
            "YXZ"
        )
    );

    lookTarget.add(
        lookDirection.multiplyScalar(
            20
        )
    );

    this.camera.lookAt(
        lookTarget
    );
}

getAimDirection() {
    const direction =
        new THREE.Vector3(
            0,
            0,
            -1
        );

    direction.applyEuler(
        new THREE.Euler(
            this.rotationX,
            this.rotationY,
            0,
            "YXZ"
        )
    );

    return direction.normalize();
}

takeDamage(amount) {
    let remainingDamage =
        amount;

    if (this.shield > 0) {
        const shieldDamage =
            Math.min(
                this.shield,
                remainingDamage
            );

        this.shield -=
            shieldDamage;

        remainingDamage -=
            shieldDamage;
    }

    if (
        remainingDamage > 0
    ) {
        this.health -=
            remainingDamage;
    }

    if (this.health < 0) {
        this.health = 0;
    }

    console.log(
        `Player health: ${this.health}/${this.maxHealth}`
    );
}

heal(amount) {
    this.health += amount;

    if (
        this.health >
        this.maxHealth
    ) {
        this.health =
            this.maxHealth;
    }
}

isAlive() {
    return this.health > 0;
}

}