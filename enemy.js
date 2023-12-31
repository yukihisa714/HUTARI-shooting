import { FPS, con } from "./option.js";
import { drawText, getZeroVector } from "./function.js";
import { Point, Vector, Square, Texture } from "./class.js";
import { TEXTURE_MAPS } from "./texture.js";
import { Entity, ENTITY_TYPES } from "./entity.js";
import { damageEffect, newDeathEffect } from "./effect.js";
import { MachineGun } from "./machineGun.js";
import { player } from "./player.js";

///////////////////////////////////////////////////////////////

export const ENEMIES_DATA = [
    {
        name: "Trooper",
        type: "Standard",
        w: 32,
        h: 32,
        color: "#f00",
        speed: 50,
        hp: 25,
        dpa: 10,
        spa: 1,
        dps: 10,
        texture: TEXTURE_MAPS.standardEnemy,

        getClass: function (position) {
            return new StandardEnemy(
                ENTITY_TYPES.enemy,
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
                this.texture,
            );
        }
    },

    {
        name: "Speedster",
        type: "Small and Agile",
        w: 16,
        h: 16,
        color: "#ff0",
        speed: 150,
        hp: 5,
        dpa: 5,
        spa: 0.5,
        dps: 10,
        texture: TEXTURE_MAPS.smallEnemy,

        getClass: function (position) {
            return new StandardEnemy(
                ENTITY_TYPES.enemy,
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
                this.texture,
            );
        }
    },

    {
        name: "Behemoth",
        type: "Large and Strong",
        w: 64,
        h: 64,
        color: "#080",
        speed: 20,
        hp: 200,
        dpa: 25,
        spa: 2,
        dps: 12.5,
        texture: TEXTURE_MAPS.largeEnemy,

        getClass: function (position) {
            return new StandardEnemy(
                ENTITY_TYPES.enemy,
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
                this.texture,
            );
        }
    },

    {
        name: "Guardian",
        type: "Shielded",
        w: 32,
        h: 32,
        color: "#f00",
        speed: 50,
        hp: 25,
        dpa: 10,
        spa: 1,
        dps: 10,
        texture: TEXTURE_MAPS.shieldEnemy,
        shield: 50,

        getClass: function (position) {
            return new ShieldEnemy(
                ENTITY_TYPES.enemy,
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
                this.texture,
                this.shield,
            );
        }
    },

    {
        name: "Sniper",
        type: "Ranged Attacker",
        w: 20,
        h: 20,
        color: "#f00",
        speed: 50,
        hp: 15,
        dpa: 2,
        spa: 1,
        dps: 2,
        texture: TEXTURE_MAPS.rangeAttackEnemy,

        getClass: function (position) {
            return new RangeAttackEnemy(
                ENTITY_TYPES.enemy,
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
                this.texture,
                new MachineGun(
                    ENTITY_TYPES.empty,
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
                    ENTITY_TYPES.player,
                ),
            );
        }
    },
];

///////////////////////////////////////////////////////////////

/**
 * 標準の敵のクラス
 * @param {number} type エンティティタイプ
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
 * @param {Texture} texture テクスチャマップ
 */
export class StandardEnemy extends Entity {
    constructor(type, name, position, width, height, vector, rigidBody, color, speed, HP, DPA, SPA, texture) {
        super(type, name, position, width, height, vector, rigidBody);
        this.color = color;
        this.speed = speed;
        this.hp = HP;
        this.dpa = DPA;
        this.spa = SPA;
        this.fpa = this.spa * FPS | 0;
        this.dps = this.dpa * this.spa;
        this.attackCount = 0;
        this.canAttack = true;
        this.texture = texture;
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
                damageEffect.takeDamage();
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
        this.hp -= damage;
    }

    draw() {

        if (this.texture) {
            this.texture.drawTexture(this.pos.x - this.w / 2, this.pos.y - this.h / 2);
        }
        else {
            con.fillStyle = this.color;
            con.fillRect(this.pos.x - this.w / 2, this.pos.y - this.h / 2, this.w, this.h);

        }

        // drawText(con, this.hp, this.pos, "right", 15, "Impact", "#fff");

        // this.drawRigidBody();
    }

    update() {
        this.chasePlayer();
        this.move(true);
        this.attack();
        this.draw();
    }
}

///////////////////////////////////////////////////////////////

/**
 * シールドの敵のクラス
 * @param {number} type エンティティタイプ
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
 * @param {Texture} texture テクスチャマップ
 * @param {number} shieldHP シールドの体力
 */
export class ShieldEnemy extends StandardEnemy {
    constructor(type, name, position, width, height, vector, rigidBody, color, speed, HP, DPA, SPA, texture, shieldHp) {
        super(type, name, position, width, height, vector, rigidBody, color, speed, HP, DPA, SPA, texture);
        this.shieldHp = shieldHp;
        this.shieldHpMax = this.shieldHp;
        this.shieldRadiusMax = Math.max(this.w, this.h) * Math.sqrt(2) * 0.75;
        this.shieldRadiusMin = Math.max(this.w, this.h) / 2;
        this.updateShield();
    }

    takeDamage(damage) {
        if (this.shieldHp > 0) {
            this.shieldHp -= damage;
        }
        else {
            this.hp -= damage;
        }
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
            con.strokeStyle = "#fff";
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

///////////////////////////////////////////////////////////////

/**
 * 遠隔攻撃の敵のクラス
 * @param {number} type エンティティタイプ
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
 * @param {Texture} texture テクスチャマップ
 * @param {MachineGun} machineGun 機銃
 */
class RangeAttackEnemy extends StandardEnemy {
    constructor(type, name, position, width, height, vector, rigidBody, color, speed, HP, DPA, SPA, texture, machineGun) {
        super(type, name, position, width, height, vector, rigidBody, color, speed, HP, DPA, SPA, texture);
        this.machineGun = machineGun;
        this.machineGun.parent = this;
    }

    aim() {
        const vectorToPlayer = this.getVectorToPlayer();
        const aimDirection = vectorToPlayer.getTheta();
        this.machineGun.aimDirection = aimDirection;
    }

    update() {
        this.chasePlayer();
        this.move(true);
        this.attack();
        this.aim();
        this.machineGun.update(true);
        this.draw();
    }

}

///////////////////////////////////////////////////////////////

export const enemies = [
    // ENEMIES_DATA[0].getClass(new Point(0, 50)),
    // ENEMIES_DATA[1].getClass(new Point(150, 50)),
    // ENEMIES_DATA[2].getClass(new Point(300, 50)),
    // ENEMIES_DATA[3].getClass(new Point(125, 50)),
    // ENEMIES_DATA[4].getClass(new Point(225, 50)),
];
console.log(enemies);

///////////////////////////////////////////////////////////////

export function operateEnemies() {
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
            newDeathEffect(new Point(enemies[i].pos.x, enemies[i].pos.y));
            enemies.splice(i, 1);
        }
        else i++;
    }

}

