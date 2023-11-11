import { CAN_H, CAN_W, con, FPS } from "./option.js";

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