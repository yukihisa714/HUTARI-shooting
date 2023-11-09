import { Point } from "./class.js";
import { drawParallelogram } from "./function.js";
import { FPS, con } from "./option.js";

export class HealthGauge {
    constructor(position, width, height, maxHp) {
        this.pos = position;
        this.w = width;
        this.h = height;
        this.maxHp = maxHp;
        this.currentHp = this.maxHp;
        this.damageAnimationHp = this.currentHp;
        this.updatePercentage();
    }

    updatePercentage() {
        this.hpPercentage = this.currentHp / this.maxHp;
        this.damageAnimationHpPercentage = this.damageAnimationHp / this.maxHp;
    }

    damageAnimation() {
        if (this.damageAnimationHp > this.currentHp) {
            this.animationCount += this.w / 180 / FPS
            this.damageAnimationHp -= this.animationCount;

        }
        else {
            this.animationCount = 0;
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
