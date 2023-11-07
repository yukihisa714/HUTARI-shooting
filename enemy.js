import { FPS, con } from "./option.js";
import { Point, Vector, Entity, Square } from "./class.js";
import { player } from "./player.js";
import { getZeroVector } from "./function.js";
import { MachineGun } from "./machineGun.js";

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

        getClass: function (position) {
            return new StandardEnemy(
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

        getClass: function (position) {
            return new StandardEnemy(
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

        getClass: function (position) {
            return new StandardEnemy(
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
        shield: 50,

        getClass: function (position) {
            return new ShieldEnemy(
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

        getClass: function (position) {
            return new RangeAttackEnemy(
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
                new MachineGun(
                    "machineGun",
                    position,
                    0,
                    0,
                    getZeroVector(),
                    new Square(position, 0, 0, 0, 0),
                    60,
                    10,
                    150,
                    1200,
                    0,
                ),
            )
        }
    },
];


/**
 * 標準の敵のクラス
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
 */
export class StandardEnemy extends Entity {
    constructor(name, position, width, height, vector, rigidBody, color, speed, HP, DPA, SPA) {
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
    }

    getVectorToPlayer() {
        return new Vector(this.pos, player.pos);
    }

    chasePlayer() {
        this.vector = this.getVectorToPlayer().changeLength(this.speed);
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
        if (this.shieldHp > 0) {
            this.shieldHp -= damage;
        }
        else {
            this.hp -= damage;
        }
    }

    draw() {
        con.fillStyle = this.color;
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

/**
 * シールドの敵のクラス
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
 * @param {number} shieldHP シールドの体力
 */
export class ShieldEnemy extends StandardEnemy {
    constructor(name, position, width, height, vector, rigidBody, color, speed, HP, DPA, SPA, shieldHp) {
        super(name, position, width, height, vector, rigidBody, color, speed, HP, DPA, SPA);
        this.shieldHp = shieldHp;
        this.shieldHpMax = this.shieldHp;
        this.shieldRadiusMax = Math.max(this.w, this.h) * Math.sqrt(2) * 0.75;
        this.shieldRadiusMin = Math.max(this.w, this.h) / 2;
        this.updateShield();
    }

    controlCollision() {
        if (this.shieldHp > 0) {
            this.rigidBody.mTop = this.shieldRadius;
            this.rigidBody.mBottom = this.shieldRadius;
            this.rigidBody.mLeft = this.shieldRadius;
            this.rigidBody.mRight = this.shieldRadius;
        }
    }

    updateShield() {
        this.shieldRadius = this.shieldRadiusMin + (this.shieldRadiusMax - this.shieldRadiusMin) * this.shieldHp / this.shieldHpMax;
    }

    drawShield() {
        if (this.shieldHp > 0) {
            con.beginPath();
            con.arc(this.pos.x, this.pos.y, this.shieldRadius, 0, Math.PI * 2, false);
            con.closePath();
            con.fillStyle = "rgba(255,255,255,0.2)";
            con.fill();
            con.lineWidth = 1;
            con.storkeStyle = "#fff";
            con.stroke();
        }
    }

    update() {
        this.chasePlayer();
        this.move(true);
        this.attack();
        this.controlCollision();
        this.updateShield();
        this.draw();
        this.drawShield();
    }

}


class RangeAttackEnemy extends StandardEnemy {
    constructor(name, position, width, height, vector, rigidBody, color, speed, HP, DPA, SPA, machineGun) {
        super(name, position, width, height, vector, rigidBody, color, speed, HP, DPA, SPA);
        this.machineGun = machineGun;
        this.machineGun.parent = this;
    }

    rangeAttack() {
        const vectorToPlayer = this.getVectorToPlayer();
        const aimDirection = vectorToPlayer.getTheta();
        this.machineGun.aimDirection = aimDirection;

        let i = 0;
        while (i < this.machineGun.firedBullets.length) {
            const bullets = this.machineGun.firedBullets;
            if (bullets[i].checkHit(player)) {
                player.hp -= 10;
                bullets.splice(i, 1);
            }
            else {
                i++;
            }
        }
    }

    update() {
        this.chasePlayer();
        this.move(true);
        this.attack();
        this.rangeAttack();
        this.machineGun.update(true);
        this.draw();
    }

}


export const enemies = [
    ENEMIES_DATA[0].getClass(new Point(0, 0)),
    ENEMIES_DATA[1].getClass(new Point(150, 0)),
    ENEMIES_DATA[2].getClass(new Point(300, 0)),
    ENEMIES_DATA[3].getClass(new Point(125, 0)),
    ENEMIES_DATA[4].getClass(new Point(225, 0)),
];
console.log(enemies);

export function operateEnemies() {
    for (const enemy of enemies) {
        let j = 0;
        const bullets = player.machineGun.firedBullets;
        while (j < bullets.length) {
            if (bullets[j].checkHit(enemy)) {
                enemy.takeDamage(10);
                bullets.splice(j, 1);
                break;
            }
            else j++;
        }
    }

    let i = 0;
    while (i < enemies.length) {
        enemies[i].update();
        if (enemies[i].hp <= 0) {
            const name = enemies[i].name;
            if (player.enemyKills[name]) {
                player.enemyKills[name]++;
            }
            else {
                player.enemyKills[name] = 1;
            }
            enemies.splice(i, 1);
        }
        else i++;
    }
}