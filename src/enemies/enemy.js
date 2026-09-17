import * as THREE from "three";

export class Enemy {
constructor(
scene,
position = new THREE.Vector3(
0,
1,
-8
)
) {
this.scene = scene;

    this.maxHealth = 100;
    this.health = 100;

    this.speed = 0.025;
    this.damage = 10;
    this.attackRange = 2.5;
    this.attackCooldown = 1000;

    this.lastAttackTime = 0;

    this.alive = true;

    this.position =
        position.clone();

    this.createEnemy();
}

createEnemy() {
    const armorMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x252525,
            metalness: 0.75,
            roughness: 0.4
        });

    const darkMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x111111,
            metalness: 0.5,
            roughness: 0.5
        });

    const redMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x8f2020,
            emissive: 0x500000,
            emissiveIntensity: 1.5,
            metalness: 0.7,
            roughness: 0.3
        });

    this.mesh =
        new THREE.Group();

    const body =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.45,
                1.8,
                1.1
            ),
            armorMaterial
        );

    body.position.y =
        1.7;

    this.mesh.add(
        body
    );

    const chestCore =
        new THREE.Mesh(
            new THREE.OctahedronGeometry(
                0.22,
                0
            ),
            redMaterial
        );

    chestCore.position.set(
        0,
        1.9,
        -0.62
    );

    this.mesh.add(
        chestCore
    );

    const head =
        new THREE.Mesh(
            new THREE.IcosahedronGeometry(
                0.48,
                1
            ),
            darkMaterial
        );

    head.position.y =
        3.0;

    this.mesh.add(
        head
    );

    const eye =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.5,
                0.08,
                0.08
            ),
            redMaterial
        );

    eye.position.set(
        0,
        3.05,
        -0.43
    );

    this.mesh.add(
        eye
    );

    const leftShoulder =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.55,
                0.55,
                0.65
            ),
            darkMaterial
        );

    leftShoulder.position.set(
        -0.95,
        2.35,
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

    const leftLeg =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.55,
                1.1,
                0.65
            ),
            darkMaterial
        );

    leftLeg.position.set(
        -0.4,
        0.45,
        0
    );

    this.mesh.add(
        leftLeg
    );

    const rightLeg =
        leftLeg.clone();

    rightLeg.position.x =
        0.4;

    this.mesh.add(
        rightLeg
    );

    this.mesh.position.copy(
        this.position
    );

    this.scene.add(
        this.mesh
    );
}

update(player) {
    if (!this.alive) {
        return;
    }

    const distance =
        this.mesh.position.distanceTo(
            player.mesh.position
        );

    if (
        distance >
        this.attackRange
    ) {
        const direction =
            new THREE.Vector3();

        direction.subVectors(
            player.mesh.position,
            this.mesh.position
        );

        direction.y = 0;

        if (
            direction.length() > 0
        ) {
            direction.normalize();

            this.mesh.position.add(
                direction.multiplyScalar(
                    this.speed
                )
            );
        }
    }

    if (
        distance <=
        this.attackRange
    ) {
        this.attack(player);
    }
}

attack(player) {
    const currentTime =
        Date.now();

    if (
        currentTime -
            this.lastAttackTime >=
        this.attackCooldown
    ) {
        player.takeDamage(
            this.damage
        );

        this.lastAttackTime =
            currentTime;

        console.log(
            "Enemy attacked the player!"
        );
    }
}

takeDamage(amount) {
    if (!this.alive) {
        return;
    }

    this.health -= amount;

    console.log(
        `Enemy health: ${this.health}/${this.maxHealth}`
    );

    if (
        this.health <= 0
    ) {
        this.die();
    }
}

die() {
    this.health = 0;
    this.alive = false;

    this.mesh.visible = false;

    console.log(
        "Enemy defeated!"
    );
}

isAlive() {
    return this.alive;
}

}