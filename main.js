import { FPS, CAN_W, CAN_H, con } from "./option.js";
import { Point, Vector } from "./class.js";
import { player } from "./player.js";
import { operateEnemies } from "./enemy.js";





function mainLoop() {
    con.clearRect(0, 0, CAN_W, CAN_H);

    player.updata();
    operateEnemies();
}

setInterval(mainLoop, 1000 / FPS);