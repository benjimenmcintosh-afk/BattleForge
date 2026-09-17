export class HUD {
constructor() {
this.createHUD();
}

createHUD() {
    this.container =
        document.createElement(
            "div"
        );

    this.container.id =
        "battle-forge-hud";

    this.container.innerHTML = `
        <div class="hud-top-left">
            <div class="mission-title">
                THE FORGE AWAKENS
            </div>

            <div class="mission-text">
                Defeat all enemies and secure the Forge.
            </div>
        </div>

        <div class="hud-enemies">
            <div class="enemy-label">
                ENEMIES REMAINING
            </div>

            <div class="enemy-count">
                <span id="hud-enemy-current">3</span>
                /
                <span id="hud-enemy-total">3</span>
            </div>
        </div>

        <div class="hud-top-right">
            <div>
                WAVE
                <span id="hud-wave">
                    1
                </span>
            </div>

            <div>
                SCORE
                <span id="hud-score">
                    0
                </span>
            </div>
        </div>

        <div class="hud-bottom-left">

            <div class="hud-stat">
                <div class="stat-label">
                    ❤️ HEALTH

                    <span id="hud-health-text">
                        100 / 100
                    </span>
                </div>

                <div class="bar">
                    <div
                        id="hud-health-bar"
                        class="bar-fill health-fill">
                    </div>
                </div>
            </div>

            <div class="hud-stat">
                <div class="stat-label">
                    🛡️ SHIELD

                    <span id="hud-shield-text">
                        80 / 100
                    </span>
                </div>

                <div class="bar">
                    <div
                        id="hud-shield-bar"
                        class="bar-fill shield-fill">
                    </div>
                </div>
            </div>

            <div class="hud-stat">
                <div class="stat-label">
                    ⚡ ENERGY

                    <span id="hud-energy-text">
                        70%
                    </span>
                </div>

                <div class="bar">
                    <div
                        id="hud-energy-bar"
                        class="bar-fill energy-fill">
                    </div>
                </div>
            </div>

        </div>

        <div class="hud-bottom-center">

            <div class="level">
                LV
                <span id="hud-level">
                    3
                </span>
            </div>

            <div class="xp-section">

                <div class="xp-text">
                    XP
                    <span id="hud-xp">
                        120 / 300
                    </span>
                </div>

                <div class="bar xp-bar">
                    <div
                        id="hud-xp-bar"
                        class="bar-fill xp-fill">
                    </div>
                </div>

            </div>

        </div>

        <div class="hud-bottom-right">

            <div
                class="weapon-name"
                id="hud-weapon">
                PISTOL
            </div>

            <div class="ammo">

                <span id="hud-ammo">
                    12
                </span>

                /

                <span id="hud-magazine">
                    12
                </span>

            </div>

            <div
                class="reload-text"
                id="hud-reload">
            </div>

            <div class="abilities">

                <div class="ability ready">
                    ⚡
                    <span>
                        Q
                    </span>
                </div>

                <div class="ability locked">
                    🔒
                    <span>
                        E
                    </span>
                </div>

                <div class="ability locked">
                    🔒
                    <span>
                        R
                    </span>
                </div>

            </div>

        </div>

        <div class="hud-crosshair">
            +
        </div>
    `;

    document.body.appendChild(
        this.container
    );
}

updateHealth(
    current,
    maximum
) {
    const text =
        document.getElementById(
            "hud-health-text"
        );

    const bar =
        document.getElementById(
            "hud-health-bar"
        );

    if (
        !text ||
        !bar
    ) {
        return;
    }

    text.textContent =
        `${current} / ${maximum}`;

    const percentage =
        maximum > 0
            ? (current / maximum) *
              100
            : 0;

    bar.style.width =
        `${Math.max(
            0,
            Math.min(
                100,
                percentage
            )
        )}%`;
}

updateEnemies(
    current,
    total
) {
    const currentElement =
        document.getElementById(
            "hud-enemy-current"
        );

    const totalElement =
        document.getElementById(
            "hud-enemy-total"
        );

    if (
        !currentElement ||
        !totalElement
    ) {
        return;
    }

    currentElement.textContent =
        current;

    totalElement.textContent =
        total;
}

updateWeapon(
    name,
    ammo,
    magazine,
    reloading = false
) {
    const weaponElement =
        document.getElementById(
            "hud-weapon"
        );

    const ammoElement =
        document.getElementById(
            "hud-ammo"
        );

    const magazineElement =
        document.getElementById(
            "hud-magazine"
        );

    const reloadElement =
        document.getElementById(
            "hud-reload"
        );

    if (
        !weaponElement ||
        !ammoElement ||
        !magazineElement
    ) {
        return;
    }

    weaponElement.textContent =
        name.toUpperCase();

    ammoElement.textContent =
        ammo;

    magazineElement.textContent =
        magazine;

    if (reloadElement) {
        reloadElement.textContent =
            reloading
                ? "RELOADING..."
                : "";
    }
}

updateWave(
    wave
) {
    const element =
        document.getElementById(
            "hud-wave"
        );

    if (element) {
        element.textContent =
            wave;
    }
}

updateScore(
    score
) {
    const element =
        document.getElementById(
            "hud-score"
        );

    if (element) {
        element.textContent =
            score;
    }
}

updateShield(
    current,
    maximum
) {
    const text =
        document.getElementById(
            "hud-shield-text"
        );

    const bar =
        document.getElementById(
            "hud-shield-bar"
        );

    if (
        !text ||
        !bar
    ) {
        return;
    }

    text.textContent =
        `${current} / ${maximum}`;

    const percentage =
        maximum > 0
            ? (current / maximum) *
              100
            : 0;

    bar.style.width =
        `${Math.max(
            0,
            Math.min(
                100,
                percentage
            )
        )}%`;
}

updateEnergy(
    current
) {
    const text =
        document.getElementById(
            "hud-energy-text"
        );

    const bar =
        document.getElementById(
            "hud-energy-bar"
        );

    if (
        !text ||
        !bar
    ) {
        return;
    }

    const value =
        Math.max(
            0,
            Math.min(
                100,
                current
            )
        );

    text.textContent =
        `${value}%`;

    bar.style.width =
        `${value}%`;
}

updateLevel(
    level,
    currentXP,
    requiredXP
) {
    const levelElement =
        document.getElementById(
            "hud-level"
        );

    const xpElement =
        document.getElementById(
            "hud-xp"
        );

    const xpBar =
        document.getElementById(
            "hud-xp-bar"
        );

    if (
        !levelElement ||
        !xpElement ||
        !xpBar
    ) {
        return;
    }

    levelElement.textContent =
        level;

    xpElement.textContent =
        `${currentXP} / ${requiredXP}`;

    const percentage =
        requiredXP > 0
            ? (currentXP /
                  requiredXP) *
              100
            : 0;

    xpBar.style.width =
        `${Math.max(
            0,
            Math.min(
                100,
                percentage
            )
        )}%`;
}

}