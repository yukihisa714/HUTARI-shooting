import { FPS, con } from "./option.js";
import { Point, Vector, Entity, Square } from "./class.js";
import { player } from "./player.js";
import { getZeroVector } from "./function.js";

export const ENEMIES_DATA = [
    {
        name: "Trooper",
        type: "Standard",
        w: 20,
        h: 20,
        speed: 50,
        hp: 50,
        dpa: 10,
        spa: 1,
        dps: 10,

        getClass: function (position) {
            return new Enemy(
                this.name,
                position,
                this.w,
                this.h,
                getZeroVector(),
                new Square(position, this.h / 2, this.h / 2, this.w / 2, this.w / 2),
                this.speed,
                this.hp,
                this.dpa,
                this.spa,
            )
        }
    },

    {
        name: "Speedster",
        type: "Small and Agile",
        w: 10,
        h: 10,
        speed: 100,
        hp: 15,
        dpa: 5,
        spa: 0.5,
        dps: 10,

        getClass: function (position) {
            return new Enemy(
                this.name,
                position,
                this.w,
                this.h,
                getZeroVector(),
                new Square(position, this.h / 2, this.h / 2, this.w / 2, this.w / 2),
                this.speed,
                this.hp,
                this.dpa,
                this.spa,
            )
        }
    },

    {
        name: "Behemoth",
        type: "Large and Strong",
        w: 40,
        h: 40,
        speed: 15,
        hp: 200,
        dpa: 25,
        spa: 2,
        dps: 12.5,

        getClass: function (position) {
            return new Enemy(
                this.name,
                position,
                this.w,
                this.h,
                getZeroVector(),
                new Square(position, this.h / 2, this.h / 2, this.w / 2, this.w / 2),
                this.speed,
                this.hp,
                this.dpa,
                this.spa,
            )
        }
    },

    {
        name: "Guardian",
        type: "Shielded",
        w: 20,
        h: 20,
        speed: 50,
        hp: 50,
        dpa: 10,
        spa: 1,
        dps: 10,
        shield: 50
    },

    {
        name: "Sniper",
        type: "Ranged Attacker",
        w: 20,
        h: 20,
        speed: 50,
        hp: 10,
        dpa: 2,
        spa: 1,
        dps: 2,
    },
];


/**
 * 敵のクラス
 * @param {string} name 名前
 * @param {Point} position 座標
 * @param {number} width 横幅
 * @param {number} height 縦幅
 * @param {Vector} vector 速度
 * @param {number} speed 速さ
 * @param {number} HP 体力
 * @param {number} DPA damage/attack
 * @param {number} SPA second/attack
 */
export class Enemy extends Entity {
    constructor(name, position, width, height, vector, rigidBody, speed, HP, DPA, SPA) {
        super(name, position, width, height, vector, rigidBody);
        this.speed = speed;
        this.hp = HP;
        this.dpa = DPA;
        this.spa = SPA;
        this.fpa = this.spa * FPS | 0;
        this.dps = this.dpa * this.spa;
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
        con.fillRect(this.pos.x - this.w / 2, this.pos.y - this.h / 2, this.w, this.h);

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
    ENEMIES_DATA[0].getClass(new Point(0, 0)),
    ENEMIES_DATA[1].getClass(new Point(150, 0)),
    ENEMIES_DATA[2].getClass(new Point(300, 0)),
];
console.log(enemies);

export function operateEnemies() {
    let i = 0;
    while (i < enemies.length) {
        enemies[i].update();
        if (enemies[i].hp <= 0) {
            player.enemyKills.push(enemies[i].name);
            enemies.splice(i, 1);
        }
        else i++;
    }
}