import { FPS, CAN_W, CAN_H, con } from "./option.js";
import { updateBullets } from "./bullet.js";
import { player } from "./player.js";
import { operateEnemies } from "./enemy.js";




function mainLoop() {
    con.clearRect(0, 0, CAN_W, CAN_H);

    updateBullets();
    player.updata();
    operateEnemies();
}

setInterval(mainLoop, 1000 / FPS);