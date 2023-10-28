import { FPS, CAN_W, CAN_H, con } from "./option.js";
import { Point, Vector } from "./class.js";
import { player } from "./player.js";
import { enemies } from "./enemy.js";





function mainLoop() {
    con.clearRect(0, 0, CAN_W, CAN_H);

    player.updata();
    for (const enemy of enemies) {
        enemy.update();
    }
}

setInterval(mainLoop, 1000 / FPS);