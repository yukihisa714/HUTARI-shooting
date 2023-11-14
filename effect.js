import { CAN_H, CAN_W, con, FPS } from "./option.js";
import { drawStraightLine2, getVectorFromAngle, getZeroVector } from "./function.js";
import { Point } from "./class.js";
import { Entity, ENTITY_TYPES } from "./entity.js";

class DamageEffect {
    constructor() {
        this.count = 0;
        this.a = 0;
    }

    draw() {
        con.fillStyle = `rgba(255,0,0,${this.a})`;
        con.fillRect(0, 0, CAN_W, CAN_H);
    }

    takeDamage() {
        this.a = 0.5;
    }

    update() {
        if (this.a > 0) {
            this.a -= 0.5 / (FPS * 1);
        }
        else {
            this.a = 0;
        }

        this.draw();
    }
}

export const damageEffect = new DamageEffect();


///////////////////////////////////////////////////////////////


class DeathEffectParticle extends Entity {
    constructor(type, name, position, width, height, vector, rigidBody, lifeSpan, length, color, lineWidth) {
        super(type, name, position, width, height, vector, rigidBody);
        this.lifeSpan = lifeSpan;
        this.len = length;
        this.color = color;
        this.lineWidth = lineWidth;
        this.count = 0;
    }

    draw() {
        drawStraightLine2(this.pos, this.vector.changeLength(this.len), this.color, this.lineWidth);
    }
}

class DeathEffect extends Entity {
    constructor(type, name, position, width, height, vector, rigidBody, speed, lifeSpan) {
        super(type, name, position, width, height, vector, rigidBody);
        this.speed = speed;
        this.lifeSpan = lifeSpan;
        this.particles = [];
        this.particlesNum = 16;

        for (let i = 0; i < this.particlesNum; i++) {
            const angle = 360 / this.particlesNum * i;
            const vector = getVectorFromAngle(angle, this.speed);
            this.particles.push(new DeathEffectParticle(
                ENTITY_TYPES.empty,
                "deathEffectParticle",
                new Point(this.pos.x, this.pos.y),
                0,
                0,
                vector,
                undefined,
                lifeSpan,
                10,
                "#fa8",
                1,
            ));
        }
    }

    update() {
        for (const particle of this.particles) {
            particle.count++;

            particle.move(true);
            particle.draw();
        }
    }
}

const deathEffects = [];

export function newDeathEffect(position) {
    deathEffects.push(new DeathEffect(
        ENTITY_TYPES.empty,
        "deathEffect",
        position,
        0,
        0,
        getZeroVector(),
        undefined,
        10,
        FPS * 1,
    ));
}
export function updateDeathEffects() {
    for (const deathEffect of deathEffects) {
        deathEffect.update();
    }

    let i = 0;
    while (i < deathEffects.length) {
        if (deathEffects[i].particles[0].count > deathEffects[i].particles[0].lifeSpan) {
            deathEffects.splice(i, 1);
        }
        else {
            i++;
        }
    }
}