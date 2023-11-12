import { FPS, CAN_W, CAN_H, con } from "./option.js";
import { updateBullets } from "./bullet.js";
import { player } from "./player.js";
import { operateEnemies } from "./enemy.js";
import { stage } from "./stage.js";
import { damageEffect } from "./effect.js";
import { updateDamageNumbers } from "./UI.js";




function mainLoop() {
    con.clearRect(0, 0, CAN_W, CAN_H);

    stage.update();

    updateBullets();
    player.updata();
    operateEnemies();

    damageEffect.update();

    updateDamageNumbers();
}

setInterval(mainLoop, 1000 / FPS);