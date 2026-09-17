import * as THREE from "three";
import { Weapon } from "./Weapon.js";
import { Projectile } from "./Projectile.js";

export class WeaponManager {
constructor(
scene,
player,
enemyManager
) {
this.scene = scene;
this.player = player;
this.enemyManager =
enemyManager;

    this.projectiles = [];

    this.weapons = {
        pistol: new Weapon(
            "Pistol",
            25,
            350,
            12,
            1200,
            0.45,
            false
        ),

        assaultRifle: new Weapon(
            "Assault Rifle",
            15,
            100,
            30,
            1600,
            0.55,
            true
        ),

        shotgun: new Weapon(
            "Shotgun",
            12,
            750,
            6,
            1800,
            0.4,
            false
        )
    };

    this.currentWeapon =
        this.weapons.pistol;

    this.mouseDown = false;

    this.raycaster =
        new THREE.Raycaster();

    this.setupControls();
}

setupControls() {
    window.addEventListener(
        "mousedown",
        (event) => {
            if (
                event.button === 0
            ) {
                this.mouseDown =
                    true;

                if (
                    !this.currentWeapon
                        .automatic
                ) {
                    this.shoot();
                }
            }
        }
    );

    window.addEventListener(
        "mouseup",
        (event) => {
            if (
                event.button === 0
            ) {
                this.mouseDown =
                    false;
            }
        }
    );

    window.addEventListener(
        "keydown",
        (event) => {
            if (
                event.key === "1"
            ) {
                this.switchWeapon(
                    "pistol"
                );
            }

            if (
                event.key === "2"
            ) {
                this.switchWeapon(
                    "assaultRifle"
                );
            }

            if (
                event.key === "3"
            ) {
                this.switchWeapon(
                    "shotgun"
                );
            }

            if (
                event.key.toLowerCase() ===
                "r"
            ) {
                this.currentWeapon.reload();
            }
        }
    );
}

switchWeapon(
    weaponName
) {
    if (
        !this.weapons[
            weaponName
        ]
    ) {
        return;
    }

    this.currentWeapon =
        this.weapons[
            weaponName
        ];

    console.log(
        "Weapon switched to: " +
        this.currentWeapon.name
    );
}

shoot() {
    const weapon =
        this.currentWeapon;

    if (!weapon.shoot()) {
        return;
    }

    const position =
        this.player.mesh.position.clone();

    position.y += 1;

    const direction =
        this.player.getAimDirection();

    const projectile =
        new Projectile(
            this.scene,
            position,
            direction,
            weapon.projectileSpeed,
            weapon.damage
        );

    this.projectiles.push(
        projectile
    );

    this.raycaster.set(
        position,
        direction
    );

    const enemies =
        this.enemyManager
            .getAliveEnemies();

    const enemyMeshes = [];

    for (
        const enemy of enemies
    ) {
        enemyMeshes.push(
            enemy.mesh
        );
    }

    const hits =
        this.raycaster.intersectObjects(
            enemyMeshes,
            true
        );

    if (
        hits.length > 0
    ) {
        let hitMesh =
            hits[0].object;

        let enemy = null;

        while (
            hitMesh &&
            !enemy
        ) {
            enemy =
                enemies.find(
                    (candidate) =>
                        candidate.mesh ===
                        hitMesh
                );

            hitMesh =
                hitMesh.parent;
        }

        if (enemy) {
            enemy.takeDamage(
                weapon.damage
            );

            console.log(
                weapon.name +
                " hit enemy for " +
                weapon.damage +
                " damage!"
            );
        }
    }

    console.log(
        weapon.name +
        " fired. Ammo: " +
        weapon.ammo +
        "/" +
        weapon.magazineSize
    );
}

update() {
    if (
        this.mouseDown &&
        this.currentWeapon.automatic
    ) {
        this.shoot();
    }

    for (
        const projectile of
        this.projectiles
    ) {
        projectile.update();
    }

    this.projectiles =
        this.projectiles.filter(
            (projectile) =>
                projectile.isAlive()
        );
}

getCurrentWeapon() {
    return this.currentWeapon;
}

getAmmo() {
    return this.currentWeapon
        .getAmmo();
}

getMagazineSize() {
    return this.currentWeapon
        .getMagazineSize();
}

isReloading() {
    return this.currentWeapon
        .isReloading();
}

}