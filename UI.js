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
            this.damageAnimationHp -= 20 / FPS;
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
        con.fillStyle = "#000";
        con.fillRect(this.pos.x, this.pos.y, this.w, this.h);

        con.fillStyle = "#f00";
        con.fillRect(this.pos.x, this.pos.y, this.w * this.damageAnimationHpPercentage, this.h);

        con.fillStyle = "#0f0";
        con.fillRect(this.pos.x, this.pos.y, this.w * this.hpPercentage, this.h);

        con.strokeStyle = "#fff";
        con.lineWidth = 3;
        con.strokeRect(this.pos.x, this.pos.y, this.w, this.h);

        con.fillStyle = "#fff";
        con.beginPath();
        con.lineTo(this.pos.x - 1, this.pos.y - 1);
        con.lineTo(this.pos.x + this.h + 1, this.pos.y - 1);
        con.lineTo(this.pos.x - 1, this.pos.y + this.h + 1);
        con.closePath();
        con.fill();

        con.beginPath();
        con.lineTo(this.pos.x + this.w + 1, this.pos.y - 1);
        con.lineTo(this.pos.x + this.w + 1, this.pos.y + this.h + 1);
        con.lineTo(this.pos.x + this.w - this.h - 1, this.pos.y + this.h + 1);
        con.closePath();
        con.fill();

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
