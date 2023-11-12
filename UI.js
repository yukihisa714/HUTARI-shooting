import { Point } from "./class.js";
import { Entity, ENTITY_TYPES } from "./entity.js";
import { drawParallelogram, getZeroVector } from "./function.js";
import { FPS, con } from "./option.js";

export class HealthGauge extends Entity {
    constructor(type, name, position, width, height, vector, rigidBody, maxHp) {
        super(type, name, position, width, height, vector, rigidBody);
        this.maxHp = maxHp;
        this.currentHp = this.maxHp;
        this.damageAnimationHp = this.currentHp;
        this.animationCount = this.w / 20 / FPS;
        this.updatePercentage();
    }

    updatePercentage() {
        this.hpPercentage = this.currentHp / this.maxHp;
        this.damageAnimationHpPercentage = this.damageAnimationHp / this.maxHp;
    }

    damageAnimation() {
        if (this.damageAnimationHp > this.currentHp) {
            this.damageAnimationHp -= this.animationCount;
        }
    }

    limitHp() {
        if (this.currentHp < 0) {
            this.currentHp = 0;
        }
        if (this.damageAnimationHp < 0) {
            this.damageAnimationHp = 0;
        }
    }

    draw() {
        drawParallelogram(con, new Point(this.pos.x - 1, this.pos.y - 3), this.w + 8, this.h + 6, "#fff");
        drawParallelogram(con, this.pos, this.w, this.h, "#000");
        drawParallelogram(con, this.pos, this.w * this.damageAnimationHpPercentage, this.h, "#f00");
        drawParallelogram(con, this.pos, this.w * this.hpPercentage, this.h, "#0f0");
        drawParallelogram(con, this.pos, this.w, this.h, undefined, "#000", 1);

        con.fillStyle = "#fff";
        con.font = "15px Fantasy";
        con.textAlign = "right";
        con.fillText(`${this.currentHp} / ${this.maxHp}`, this.pos.x + this.w, this.pos.y - 5);
    }

    update() {
        this.limitHp();
        this.updatePercentage();
        this.damageAnimation();
        this.draw();
    }
}


class DamageNumber extends Entity {
    constructor(type, name, position, width, height, vector, rigidBody, damage, lifeTime) {
        super(type, name, position, width, height, vector, rigidBody);
        this.damage = damage;
        this.lifeTime = lifeTime;
        this.lifeCount = this.lifeTime * FPS;
        this.isAlive = true;
        this.count = 0;
        this.a = 1;
    }

    draw() {
        con.fillStyle = `rgba(255,255,0,${this.a})`;
        con.font = "15px Fantasy";
        con.fillText(this.damage, this.pos.x, this.pos.y);
    }

    update() {
        this.count++;

        if (this.count > FPS * 0.3) {
            this.a -= 1 / (FPS * 0.2);
        }

        if (this.count > FPS * 0.5) {
            this.isAlive = false;
        }

        this.draw();
    }
}

const damageNumbers = [];

export function newDamageNumber(position, damage) {
    damageNumbers.push(new DamageNumber(
        ENTITY_TYPES.empty,
        "damageNumber",
        position,
        0, 0,
        getZeroVector,
        undefined,
        damage,
        undefined,
    ));
}

export function updateDamageNumbers() {
    for (const damageNumber of damageNumbers) {
        damageNumber.update();
    }

    let i = 0;
    while (i < damageNumbers.length) {
        if (damageNumbers[i].isAlive === false) {
            damageNumbers.splice(i, 1);
        }
        else {
            i++;
        }
    }
}
