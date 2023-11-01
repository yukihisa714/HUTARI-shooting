import { getRandom, sin, cos } from "./function.js";
import { Entity } from "./class.js";


/**
 * プレイヤーのクラス
 * @param {string} name 名前
 * @param {Point} position 座標
 * @param {number} width 横幅
 * @param {number} height 縦幅
 * @param {Vector} vector 速度と向き(一秒あたりのpx)
 * @param {number} RPM 発射レート rate per minutes
 * @param {number} MOA 命中精度 minutes of arc
 * @param {number} bulletSpeed 弾の速度
 * @param {number} capacity 装填数
 */
export class MachineGun extends Entity {
    constructor(name, position, width, height, vector, rigidBody, RPM, MOA, bulletSpeed, capacity) {
        super(name, position, width, height, vector, rigidBody);
        this.rpm = RPM;
        this.fpr = FPS / (this.rpm / 60);
        this.moa = MOA;
        this.bulletSpeed = bulletSpeed;
        this.canFire = true;
        this.rateCount = 0;
        this.firedBullets = [];
        this.capacity = capacity;
        this.remaining = this.capacity;
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
                this.firedBullets.push(
                    new Bullet(
                        "bullet",
                        new Point(this.pos.x, this.pos.y),
                        1,
                        1,
                        bulletVector,
                        new Square(new Point(this.pos.x, this.pos.y), 0, 0, 0, 0),
                        10,
                    )
                );
                this.canFire = false;
            }
        }
        else {
            this.rateCount++;
            if (this.rateCount >= this.fpr) {
                this.rateCount = 0;
                this.canFire = true;
            }
        }
    }

    operateBullets() {
        let i = 0;
        while (i < this.firedBullets.length) {
            const bullet = this.firedBullets[i];
            if (bullet.pos.y + bullet.length < 0) {
                this.firedBullets.splice(i, 1);
            }
            else i++;
        }

        for (const enemy of enemies) {
            let j = 0;
            while (j < this.firedBullets.length) {
                if (this.firedBullets[j].checkHit(enemy)) {
                    enemy.hp -= 10;
                    this.firedBullets.splice(j, 1);
                    break;
                }
                else j++;
            }
        }

        for (const bullet of this.firedBullets) {
            bullet.move(true);
            bullet.draw();
        }
    }

    update() {
        this.fire();
        this.operateBullets();
    }
}