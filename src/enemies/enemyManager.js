import * as THREE from "three";
import { Enemy } from "./Enemy.js";

export class EnemyManager {
constructor(scene) {
this.scene = scene;

    this.enemies = [];

    this.maxEnemies = 5;

    this.totalEnemies = 3;
}

spawnEnemy(position) {
    if (
        this.enemies.length >=
        this.maxEnemies
    ) {
        return;
    }

    const enemy =
        new Enemy(
            this.scene,
            position
        );

    this.enemies.push(
        enemy
    );
}

spawnInitialEnemies() {
    this.spawnEnemy(
        new THREE.Vector3(
            0,
            1,
            -8
        )
    );

    this.spawnEnemy(
        new THREE.Vector3(
            8,
            1,
            -6
        )
    );

    this.spawnEnemy(
        new THREE.Vector3(
            -8,
            1,
            -6
        )
    );
}

update(player) {
    for (
        const enemy of this.enemies
    ) {
        enemy.update(player);
    }

    this.removeDeadEnemies();
}

removeDeadEnemies() {
    this.enemies =
        this.enemies.filter(
            (enemy) =>
                enemy.isAlive()
        );
}

getAliveEnemies() {
    return this.enemies.filter(
        (enemy) =>
            enemy.isAlive()
    );
}

getEnemyCount() {
    return this.getAliveEnemies()
        .length;
}

getTotalEnemies() {
    return this.totalEnemies;
}

}