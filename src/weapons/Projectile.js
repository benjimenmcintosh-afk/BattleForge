import * as THREE from "three";

export class Projectile {
constructor(
scene,
position,
direction,
speed,
damage
) {
this.scene = scene;

    this.direction =
        direction
            .clone()
            .normalize();

    this.speed = speed;

    this.damage = damage;

    this.alive = true;

    this.mesh =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.15,
                8,
                8
            ),
            new THREE.MeshStandardMaterial({
                color: 0xffff00,
                emissive: 0xff8800,
                emissiveIntensity: 3
            })
        );

    this.mesh.position.copy(
        position
    );

    this.scene.add(
        this.mesh
    );
}

update() {
    if (!this.alive) {
        return;
    }

    this.mesh.position.add(
        this.direction
            .clone()
            .multiplyScalar(
                this.speed
            )
    );

    if (
        Math.abs(
            this.mesh.position.x
        ) > 100 ||
        Math.abs(
            this.mesh.position.y
        ) > 100 ||
        Math.abs(
            this.mesh.position.z
        ) > 100
    ) {
        this.destroy();
    }
}

destroy() {
    if (!this.alive) {
        return;
    }

    this.alive = false;

    this.scene.remove(
        this.mesh
    );
}

isAlive() {
    return this.alive;
}

}