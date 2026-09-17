export class Enemy {
constructor(scene, position = new THREE.Vector3(0, 1, -8)) {
this.scene = scene;
    this.maxHealth = 100;
    this.health = this.maxHealth;

    this.speed = 0.025;
    this.damage = 10;
    this.attackRange = 2.5;
    this.attackCooldown = 1000;

    this.lastAttackTime = 0;
    this.alive = true;

    this.position = position.clone();

    this.createEnemy();
}

createEnemy() {
    const geometry = new THREE.BoxGeometry(1.5, 2, 1.5);

    const material = new THREE.MeshStandardMaterial({
        color: 0xc43b3b
    });

    this.mesh = new THREE.Mesh(
        geometry,
        material
    );

    this.mesh.position.copy(this.position);

    this.scene.add(this.mesh);
}

update(player) {
    if (!this.alive) {
        return;
    }

    const distance = this.mesh.position.distanceTo(
        player.mesh.position
    );

    if (distance > this.attackRange) {
        const direction = new THREE.Vector3();

        direction.subVectors(
            player.mesh.position,
            this.mesh.position
        );

        direction.y = 0;

        if (direction.length() > 0) {
            direction.normalize();

            this.mesh.position.add(
                direction.multiplyScalar(this.speed)
            );
        }
    }

    if (distance <= this.attackRange) {
        this.attack(player);
    }
}

attack(player) {
    const currentTime = Date.now();

    if (
        currentTime - this.lastAttackTime >=
        this.attackCooldown
    ) {
        player.takeDamage(this.damage);

        this.lastAttackTime = currentTime;

        console.log("Enemy attacked the player!");
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

    if (this.health <= 0) {
        this.die();
    }
}

die() {
    this.health = 0;
    this.alive = false;

    this.mesh.visible = false;

    console.log("Enemy defeated!");
}

isAlive() {
    return this.alive;
}