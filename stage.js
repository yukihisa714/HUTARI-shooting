import { CAN_W, FPS } from "./option.js";
import { getRandom } from "./function.js";
import { Point } from "./class.js";
import { enemies, ENEMIES_DATA } from "./enemy.js";

class Stage {
    constructor() {
        this.frame = 0;
    }

    update() {
        this.frame++;

        if (this.frame % (FPS * 5) === 1) {
            enemies.push(ENEMIES_DATA[0].getClass(new Point(getRandom(0, CAN_W), -50)));
        }
    }
}

export const stage = new Stage();