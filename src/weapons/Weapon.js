export class Weapon {
constructor(
name,
damage,
fireRate,
magazineSize,
reloadTime,
projectileSpeed,
automatic = false
) {
this.name = name;
this.damage = damage;
this.fireRate = fireRate;
this.magazineSize = magazineSize;
this.reloadTime = reloadTime;
this.projectileSpeed = projectileSpeed;
this.automatic = automatic;
    this.ammo = magazineSize;
    this.lastShotTime = 0;
    this.reloading = false;
}

canShoot() {
    const currentTime = Date.now();

    return (
        !this.reloading &&
        this.ammo > 0 &&
        currentTime - this.lastShotTime >= this.fireRate
    );
}

shoot() {
    if (!this.canShoot()) {
        return false;
    }

    this.ammo--;
    this.lastShotTime = Date.now();

    return true;
}

reload() {
    if (
        this.reloading ||
        this.ammo === this.magazineSize
    ) {
        return;
    }

    this.reloading = true;

    setTimeout(() => {
        this.ammo = this.magazineSize;
        this.reloading = false;
    }, this.reloadTime);
}

getAmmo() {
    return this.ammo;
}

getMagazineSize() {
    return this.magazineSize;
}

isReloading() {
    return this.reloading;
}