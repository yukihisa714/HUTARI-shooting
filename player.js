import { FPS, CAN_W, CAN_H, con, key } from "./option.js";
import { getZeroVector } from "./function.js";
import { Point, Vector, Square } from "./class.js";
import { TEXTURE_MAPS } from "./texture.js";
import { Entity, ENTITY_TYPES } from "./entity.js";
import { HealthGauge } from "./UI.js";
import { MachineGun } from "./machineGun.js";

///////////////////////////////////////////////////////////////

export const DEFAULT_PLAYER = {
    posX: CAN_W / 2,
    posY: CAN_H * 0.8,
    width: 32,
    height: 32,
    maxSpeed: 120,
    accel: 480,
    RPM: 240,
    MOA: 5,
    bulletSpeed: 300,
};

///////////////////////////////////////////////////////////////

/**
 * プレイヤーのクラス
 * @param {number} type エンティティタイプ
 * @param {string} name 名前
 * @param {Point} position 座標
 * @param {number} width 横幅
 * @param {number} height 縦幅
 * @param {Vector} vector 速度と向き(一秒あたりのpx)
 * @param {number} maxSpeed プレイヤーのx,y方向の最高速度
 * @param {number} accel 加速度/s
 * @param {number} HP 体力
 * @param {MachineGun} machineGun 機銃
 */
export class Player extends Entity {
    constructor(type, name, position, width, height, vector, rigidBody, maxSpeed, accel, HP, machineGun) {
        super(type, name, position, width, height, vector, rigidBody);
        this.speed = maxSpeed;
        this.accel = accel;
        this.hp = HP;
        this.machineGun = machineGun;
        this.machineGun.parent = this;
        this.enemyKills = {};

        this.healthGauge = new HealthGauge(ENTITY_TYPES.empty, "HpGauge", new Point(25, 480), 260, 8, getZeroVector, undefined, this.hp);
    }

    control() {
        const accelPF = this.accel / FPS;

        // 左
        if (key["ArrowLeft"]) {
            if (this.vector.x > -this.speed) {
                this.vector.x -= accelPF;
            }
        }
        else {
            if (this.vector.x < 0) {
                this.vector.x += accelPF;
            }
        }

        // 右
        if (key["ArrowRight"]) {
            if (this.vector.x < this.speed) {
                this.vector.x += accelPF;
            }
        }
        else {
            if (this.vector.x > 0) {
                this.vector.x -= accelPF;
            }
        }

        // 前
        if (key["ArrowUp"]) {
            if (this.vector.y > -this.speed) {
                this.vector.y -= accelPF;
            }
        }
        else {
            if (this.vector.y < 0) {
                this.vector.y += accelPF;
            }
        }

        // 後
        if (key["ArrowDown"]) {
            if (this.vector.y < this.speed) {
                this.vector.y += accelPF;
            }
        }
        else {
            if (this.vector.y > 0) {
                this.vector.y -= accelPF;
            }
        }
    }


    draw() {

        // con.fillStyle = "#00f";
        // con.beginPath();
        // con.lineTo(this.pos.x, this.pos.y);
        // con.lineTo(this.pos.x + this.w / 2, this.pos.y + this.h);
        // con.lineTo(this.pos.x - this.w / 2, this.pos.y + this.h);
        // con.closePath();
        // con.fill();

        TEXTURE_MAPS.player.drawTexture(this.pos.x - this.w / 2, this.pos.y);
        // this.drawRigidBody();
    }

    updata() {
        this.move(false);
        this.control();
        this.machineGun.update(key[" "]);
        this.draw();
        this.healthGauge.currentHp = this.hp;
        this.healthGauge.update();
    }
}

///////////////////////////////////////////////////////////////

export const player = new Player(
    ENTITY_TYPES.player,
    "player",
    new Point(DEFAULT_PLAYER.posX, DEFAULT_PLAYER.posY),
    DEFAULT_PLAYER.width,
    DEFAULT_PLAYER.height,
    getZeroVector(),
    new Square(
        new Point(DEFAULT_PLAYER.posX, DEFAULT_PLAYER.posY),
        0, DEFAULT_PLAYER.height, DEFAULT_PLAYER.width / 2, DEFAULT_PLAYER.width / 2
    ),
    DEFAULT_PLAYER.maxSpeed,
    DEFAULT_PLAYER.accel,
    100,
    new MachineGun(
        ENTITY_TYPES.empty,
        "machineGun",
        new Point(DEFAULT_PLAYER.posX, DEFAULT_PLAYER.posY),
        0,
        0,
        getZeroVector(),
        new Square(new Point(DEFAULT_PLAYER.posX, DEFAULT_PLAYER.posY), 0, 0, 0, 0),
        240,
        5,
        300,
        1200,
        -90,
        ENTITY_TYPES.enemy,
    ),
);
