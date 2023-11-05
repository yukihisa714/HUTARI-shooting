import { FPS, CAN_W, CAN_H, con, key } from "./option.js";
import { Point, Vector, Entity, Square } from "./class.js";
import { getZeroVector } from "./function.js";
import { MachineGun } from "./machineGun.js";

export const DEFAULT_PLAYER = {
    posX: CAN_W / 2,
    posY: CAN_H * 0.8,
    maxSpeed: 120,
    accel: 480,
    RPM: 240,
    MOA: 5,
    bulletSpeed: 300,
};


/**
 * プレイヤーのクラス
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
    constructor(name, position, width, height, vector, rigidBody, maxSpeed, accel, HP, machineGun) {
        super(name, position, width, height, vector, rigidBody);
        this.speed = maxSpeed;
        this.accel = accel;
        this.hp = HP;
        this.machineGun = machineGun;
        this.machineGun.parent = this;
        this.enemyKills = {};
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

        con.fillStyle = "#00f";
        con.beginPath();
        con.lineTo(this.pos.x, this.pos.y);
        con.lineTo(this.pos.x + 10, this.pos.y + 30);
        con.lineTo(this.pos.x - 10, this.pos.y + 30);
        con.closePath();
        con.fill();

        con.fillStyle = "#fff";
        // con.fillText(this.bullets.length, 10, 10);
        con.fillText(this.hp, this.pos.x, this.pos.y + 20);
        con.fillText(this.enemyKills, 10, 50);

        this.drawRigidBody();
    }

    updata() {
        this.move(false);
        this.control();
        this.machineGun.update(key[" "]);
        this.draw();
    }
}


export const player = new Player(
    "player",
    new Point(DEFAULT_PLAYER.posX, DEFAULT_PLAYER.posY),
    20,
    30,
    getZeroVector(),
    new Square(new Point(DEFAULT_PLAYER.posX, DEFAULT_PLAYER.posY), 0, 30, 10, 10),
    DEFAULT_PLAYER.maxSpeed,
    DEFAULT_PLAYER.accel,
    100,
    new MachineGun(
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
    ),
);
