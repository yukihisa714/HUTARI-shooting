import { CAN_W, FPS } from "./option.js";
import { getRandom } from "./function.js";
import { Point } from "./class.js";
import { enemies, ENEMIES_DATA } from "./enemy.js";

class Stage {
    constructor() {
        this.frame = 0;
        this.spawnSeconds = [5, 4, 12, 10];
    }

    update() {
        this.frame++;
        this.second = this.frame / FPS;

        if (this.second > 0 && this.second < 75) {
            if (this.frame % (FPS * 5) === 1) {
                enemies.push(ENEMIES_DATA[0].getClass(new Point(getRandom(0, CAN_W), -50)));
            }
        }

        if (this.second > 25) {
            if (this.frame % (FPS * this.spawnSeconds[1]) === 1) {
                enemies.push(ENEMIES_DATA[1].getClass(new Point(getRandom(-100, CAN_W + 100), -50)));
                this.spawnSeconds[1] = getRandom(5, 10);
            }
        }

        if (this.second > 50) {
            if (this.frame % (FPS * this.spawnSeconds[2]) === 1) {
                enemies.push(ENEMIES_DATA[2].getClass(new Point(getRandom(0, CAN_W), -50)));
                this.spawnSeconds[2] = getRandom(25, 30);
            }
        }

        if (this.second > 75) {
            if (this.frame % (FPS * this.spawnSeconds[3]) === 1) {
                enemies.push(ENEMIES_DATA[3].getClass(new Point(getRandom(0, CAN_W), -50)));
                this.spawnSeconds[3] = getRandom(8, 12);
            }
        }
    }
}

export const stage = new Stage();