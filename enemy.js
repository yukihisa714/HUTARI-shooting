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
        color: "#f00",
        speed: 50,
        hp: 50,
        dpa: 10,
        spa: 1,
        dps: 10,
        shield: 0,

        getClass: function (position) {
            return new Enemy(
                this.name,
                position,
                this.w,
                this.h,
                getZeroVector(),
                new Square(position, this.h / 2, this.h / 2, this.w / 2, this.w / 2),
                this.color,
                this.speed,
                this.hp,
                this.dpa,
                this.spa,
                this.shield,
            )
        }
    },

    {
        name: "Speedster",
        type: "Small and Agile",
        w: 10,
        h: 10,
        color: "#ff0",
        speed: 100,
        hp: 15,
        dpa: 5,
        spa: 0.5,
        dps: 10,
        shield: 0,

        getClass: function (position) {
            return new Enemy(
                this.name,
                position,
                this.w,
                this.h,
                getZeroVector(),
                new Square(position, this.h / 2, this.h / 2, this.w / 2, this.w / 2),
                this.color,
                this.speed,
                this.hp,
                this.dpa,
                this.spa,
                this.shield,
            )
        }
    },

    {
        name: "Behemoth",
        type: "Large and Strong",
        w: 40,
        h: 40,
        color: "#080",
        speed: 20,
        hp: 200,
        dpa: 25,
        spa: 2,
        dps: 12.5,
        shield: 0,

        getClass: function (position) {
            return new Enemy(
                this.name,
                position,
                this.w,
                this.h,
                getZeroVector(),
                new Square(position, this.h / 2, this.h / 2, this.w / 2, this.w / 2),
                this.color,
                this.speed,
                this.hp,
                this.dpa,
                this.spa,
                this.shield,
            )
        }
    },

    {
        name: "Guardian",
        type: "Shielded",
        w: 20,
        h: 20,
        color: "#f00",
        speed: 50,
        hp: 50,
        dpa: 10,
        spa: 1,
        dps: 10,
        shield: 100,

        getClass: function (position) {
            return new Enemy(
                this.name,
                position,
                this.w,
                this.h,
                getZeroVector(),
                new Square(position, this.h / 2, this.h / 2, this.w / 2, this.w / 2),
                this.color,
                this.speed,
                this.hp,
                this.dpa,
                this.spa,
                this.shield,
            )
        }
    },

    {
        name: "Sniper",
        type: "Ranged Attacker",
        w: 20,
        h: 20,
        color: "#f00",
        speed: 50,
        hp: 10,
        dpa: 2,
        spa: 1,
        dps: 2,
        shield: 0,
    },
];


/**
 * 敵のクラス
 * @param {string} name 名前
 * @param {Point} position 座標
 * @param {number} width 横幅
 * @param {number} height 縦幅
 * @param {Vector} vector 速度
 * @param {string} color 色
 * @param {number} speed 速さ
 * @param {number} HP 体力
 * @param {number} DPA damage/attack
 * @param {number} SPA second/attack
 * @param {number} shieldHP シールドの有無
 */
export class Enemy extends Entity {
    constructor(name, position, width, height, vector, rigidBody, color, speed, HP, DPA, SPA, shieldHP) {
        super(name, position, width, height, vector, rigidBody);
        this.color = color;
        this.speed = speed;
        this.hp = HP;
        this.dpa = DPA;
        this.spa = SPA;
        this.fpa = this.spa * FPS | 0;
        this.dps = this.dpa * this.spa;
        this.attackCount = 0;
        this.canAttack = true;
        this.shieldHp = shieldHP;
        this.shieldHpMax = shieldHP;
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

    takeDamage(damage) {
        if (this.shieldHp) {
            this.shieldHp -= damage;
        }
        else {
            this.hp -= damage;
        }
    }

    draw() {
        con.fillStyle = this.color;
        con.fillRect(this.pos.x - this.w / 2, this.pos.y - this.h / 2, this.w, this.h);

        if (this.shieldHp > 0) {
            const radius = Math.max(this.w, this.h) * Math.sqrt(2) * 0.75 * this.shieldHp / this.shieldHpMax;

            con.beginPath();
            con.arc(this.pos.x, this.pos.y, radius, 0, Math.PI * 2, false);
            con.closePath();
            con.fillStyle = "rgba(255,255,255,0.2)";
            con.fill();
            con.lineWidth = 1;
            con.storkeStyle = "#fff";
            con.stroke();
        }

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
    ENEMIES_DATA[3].getClass(new Point(125, 0)),
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