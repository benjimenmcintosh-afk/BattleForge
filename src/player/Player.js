import * as THREE from "three";

export class Player {
constructor(scene, camera) {
this.scene = scene;
this.camera = camera;
this.health = 100;
    this.maxHealth = 100;
    this.speed = 0.12;

    this.position = new THREE.Vector3(0, 1, 10);

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
    const geometry = new THREE.BoxGeometry(1.5, 2, 1.5);

    const material = new THREE.MeshStandardMaterial({
        color: 0x4b8cff
    });

    this.mesh = new THREE.Mesh(
        geometry,
        material
    );

    this.mesh.position.copy(this.position);

    this.scene.add(this.mesh);
}

setupControls() {
    window.addEventListener("keydown", (event) => {
        this.keys[event.key.toLowerCase()] = true;
    });

    window.addEventListener("keyup", (event) => {
        this.keys[event.key.toLowerCase()] = false;
    });
}

setupMouseControls() {
    window.addEventListener("mousemove", (event) => {
        if (document.pointerLockElement !== document.body) {
            return;
        }

        this.rotationY -=
            event.movementX *
            this.mouseSensitivity;

        this.rotationX -=
            event.movementY *
            this.mouseSensitivity;

        this.rotationX = THREE.MathUtils.clamp(
            this.rotationX,
            -0.8,
            0.8
        );
    });

    window.addEventListener("click", () => {
        document.body.requestPointerLock();
    });
}

update() {
    const forward = new THREE.Vector3(
        Math.sin(this.rotationY),
        0,
        Math.cos(this.rotationY)
    );

    const right = new THREE.Vector3(
        Math.cos(this.rotationY),
        0,
        -Math.sin(this.rotationY)
    );

    if (this.keys["w"]) {
        this.mesh.position.add(
            forward.clone().multiplyScalar(-this.speed)
        );
    }

    if (this.keys["s"]) {
        this.mesh.position.add(
            forward.clone().multiplyScalar(this.speed)
        );
    }

    if (this.keys["a"]) {
        this.mesh.position.add(
            right.clone().multiplyScalar(-this.speed)
        );
    }

    if (this.keys["d"]) {
        this.mesh.position.add(
            right.clone().multiplyScalar(this.speed)
        );
    }

    this.mesh.position.x = THREE.MathUtils.clamp(
        this.mesh.position.x,
        -18,
        18
    );

    this.mesh.position.z = THREE.MathUtils.clamp(
        this.mesh.position.z,
        -18,
        18
    );

    this.mesh.rotation.y = this.rotationY;
}

updateCamera() {
    const offset = new THREE.Vector3(
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

    const lookTarget = this.mesh.position.clone();

    lookTarget.y += 1;

    const lookDirection = new THREE.Vector3(
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
        lookDirection.multiplyScalar(20)
    );

    this.camera.lookAt(lookTarget);
}

getAimDirection() {
    const direction = new THREE.Vector3(
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
    this.health -= amount;

    if (this.health < 0) {
        this.health = 0;
    }

    console.log(
        `Player health: ${this.health}/${this.maxHealth}`
    );
}

heal(amount) {
    this.health += amount;

    if (this.health > this.maxHealth) {
        this.health = this.maxHealth;
    }
}

isAlive() {
    return this.health > 0;
}