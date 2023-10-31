import { FPS, con } from "./option.js";
import { Point, Vector, Entity, Square } from "./class.js";
import { player } from "./player.js";


/**
 * 敵のクラス
 * @param {Point} position 座標
 * @param {number} width 横幅
 * @param {number} height 縦幅
 * @param {Vector} vector 速度
 * @param {number} speed 速さ
 * @param {number} HP 体力
 * @param {number} DPS damage/second
 * @param {number} DPA damage/attack
 */
export class Enemy extends Entity {
    constructor(position, width, height, vector, rigidBody, speed, HP, DPS, DPA) {
        super(position, width, height, vector, rigidBody);
        this.speed = speed;
        this.hp = HP;
        this.dps = DPS;
        this.dpa = DPA;
        this.fpa = this.dpa / this.dps * FPS;
        this.attackCount = 0;
        this.canAttack = true;
    }

    chasePlayer() {
        const targetVector = new Vector(this.pos, player.pos);
        const targetDistance = targetVector.getLength();
        targetVector.multiplication(this.speed / targetDistance);
        this.vector = targetVector;
    }

    attack() {
        if (this.canAttack) {
            if (this.rigidBody.collision(player.rigidBody)) {
                player.hp -= this.dpa;
                this.canAttack = false;
            }
        }
        else {
            this.attackCount++;
            if (this.attackCount % this.fpa === 0) {
                this.attackCount = 0;
                this.canAttack = true;
            }
        }
    }

    draw() {
        con.fillStyle = "#f00";
        con.fillRect(this.pos.x - 10, this.pos.y - 10, 20, 20);

        con.fillStyle = "#fff";
        con.fillText(this.hp, this.pos.x, this.pos.y);
    }

    update() {
        this.chasePlayer();
        this.move(true);
        this.attack();
        this.draw();
    }
}

export const enemies = [
    new Enemy(
        new Point(150, 100),
        20,
        20,
        new Vector(new Point(0, 0), new Point(0, 0),),
        new Square(new Point(150, 100), 10, 10, 10, 10),
        50,
        100,
        10,
        10,
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