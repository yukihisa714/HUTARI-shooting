import { FPS, CAN_W, CAN_H, con, DEFAULT_PLAYER } from "./option.js";
import { Point, Vector } from "./class.js";
import { Player } from "./player.js";





const player = new Player(
    new Point(DEFAULT_PLAYER.posX, DEFAULT_PLAYER.posY),
    new Vector(new Point(0, 0), new Point(0, 0)),
    DEFAULT_PLAYER.maxSpeed,
    DEFAULT_PLAYER.accel,
    DEFAULT_PLAYER.RPM,
    DEFAULT_PLAYER.MOA,
    DEFAULT_PLAYER.bulletSpeed,
);

function mainLoop() {
    con.clearRect(0, 0, CAN_W, CAN_H);

    player.updata();
}

setInterval(mainLoop, 1000 / FPS);