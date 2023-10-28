import { FPS, con, key, DEFAULT_PLAYER } from "./option.js";
import { getRandom, sin, cos } from "./function.js";
import { Point, Vector, Entity } from "./class.js";
import { Bullet } from "./bullet.js";
import { enemies } from "./enemy.js";

/**
 * プレイヤーのクラス
 * @param {Point} position 座標
 * @param {Vector} vector 速度と向き(一秒あたりのpx)
 * @param {number} speed プレイヤーのx,y方向の最高速度
 * @param {number} accel 加速度/s
 * @param {number} rpm 発射レート rate per minutes
 * @param {number} moa 命中精度 minutes of arc
 * @param {number} bulletSpeed 弾の速度
 */
export class Player extends Entity {
    constructor(position, vector, speed, accel, rpm, moa, bulletSpeed) {
        super(position, vector);
        this.speed = speed;
        this.accel = accel;
        this.bullets = [];
        this.rpm = rpm;
        this.fpr = FPS / (this.rpm / 60);
        this.moa = moa;
        this.rateCount = 0;
        this.canFire = true;
        this.bulletSpeed = bulletSpeed;
    }

    control() {
        const accelPF = this.accel / FPS;

        // 左
        if (key["a"]) {
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
        if (key["d"]) {
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
        if (key["w"]) {
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
        if (key["s"]) {
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

    fire() {
        if (this.canFire) {
            if (key[" "]) {
                const MOA = getRandom(-this.moa / 2, this.moa / 2, 1);
                const bulletVector = new Vector(
                    new Point(
                        cos(MOA + 90) * this.bulletSpeed,
                        sin(MOA + 90) * this.bulletSpeed,
                    ),
                    new Point(0, 0),
                );
                this.bullets.push(
                    new Bullet(
                        new Point(this.pos.x, this.pos.y),
                        bulletVector,
                        10,
                    )
                );
                this.canFire = false;
            }
        }
        else {
            this.rateCount++;
            if (this.rateCount === this.fpr) {
                this.rateCount = 0;
                this.canFire = true;
            }
        }
    }

    operateBullets() {
        let i = 0;
        while (i < this.bullets.length) {
            const bullet = this.bullets[i];
            if (bullet.pos.y + bullet.length < 0) {
                this.bullets.splice(i, 1);
            }
            else i++;
        }

        let j = 0;
        while (j < this.bullets.length) {
            const bullet = this.bullets[j];
            for (const enemy of enemies) {
                if (bullet.checkHit(enemy)) {
                    enemy.hp -= 10;
                    this.bullets.splice(j, 1);
                    break;
                }
                else j++;
            }
        }
    }


    draw() {
        for (const bullet of this.bullets) {
            bullet.move();
            bullet.draw();
        }

        con.fillStyle = "#00f";
        con.beginPath();
        con.lineTo(this.pos.x, this.pos.y);
        con.lineTo(this.pos.x + 10, this.pos.y + 30);
        con.lineTo(this.pos.x - 10, this.pos.y + 30);
        con.closePath();
        con.fill();

        con.fillStyle = "#fff";
        con.fillText(this.bullets.length, 10, 10);
        if (this.bullets.length) con.fillText(this.bullets[0].checkHit(enemies[0]), 10, 20);
    }

    updata() {
        this.move();
        this.control();
        this.fire();
        this.operateBullets();
        this.draw();
    }
}


export const player = new Player(
    new Point(DEFAULT_PLAYER.posX, DEFAULT_PLAYER.posY),
    new Vector(new Point(0, 0), new Point(0, 0)),
    DEFAULT_PLAYER.maxSpeed,
    DEFAULT_PLAYER.accel,
    DEFAULT_PLAYER.RPM,
    DEFAULT_PLAYER.MOA,
    DEFAULT_PLAYER.bulletSpeed,
);
