import { FPS, con } from "./option.js";
import { Point, Vector, Entity } from "./class.js";
import { player } from "./player.js";

export class Enemy extends Entity {
    constructor(position, width, height, vector, speed, HP) {
        super(position, width, height, vector);
        this.speed = speed;
        this.hp = HP;
    }

    chasePlayer() {
        const targetVector = new Vector(this.pos, player.pos);
        const targetDistance = targetVector.getLength();
        targetVector.multiplication(this.speed / targetDistance);
        this.vector = targetVector;
    }

    draw() {
        con.fillStyle = "#f00";
        con.fillRect(this.pos.x - 10, this.pos.y - 10, 20, 20);

        con.fillStyle = "#fff";
        con.fillText(this.hp, this.pos.x, this.pos.y);
    }

    update() {
        this.chasePlayer();
        this.move();
        this.draw();
    }
}

export const enemies = [
    new Enemy(
        new Point(150, 100),
        20,
        20,
        new Vector(new Point(0, 0), new Point(0, 0),),
        50,
        100,
    ),
];

export function operateEnemies() {
    let i = 0;
    while (i < enemies.length) {
        enemies[i].update();
        if (enemies[i].hp <= 0) {
            enemies.splice(i, 1);
        }
        else i++;
    }
}