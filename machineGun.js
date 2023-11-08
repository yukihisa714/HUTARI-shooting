import { FPS } from "./option.js";
import { getRandom, sin, cos, getZeroPoint } from "./function.js";
import { Point, Vector } from "./class.js";
import { Entity, ENTITY_TYPES } from "./entity.js";
import { Bullet, FIRED_BULLETS } from "./bullet.js";


/**
 * 機銃のクラス
 * @param {string} name 名前
 * @param {Point} position 座標
 * @param {number} width 横幅
 * @param {number} height 縦幅
 * @param {Vector} vector 速度と向き(一秒あたりのpx)
 * @param {number} RPM 発射レート rate per minutes
 * @param {number} MOA 命中精度 minutes of arc
 * @param {number} bulletSpeed 弾の速度
 * @param {number} capacity 装填数
 * @param {Entity} parent 親のエンティティ
 */
export class MachineGun extends Entity {
    constructor(type, name, position, width, height, vector, rigidBody, RPM, MOA, bulletSpeed, capacity, aimDirection, targetType, parent) {
        super(type, name, position, width, height, vector, rigidBody);
        this.rpm = RPM;
        this.fpr = FPS / (this.rpm / 60);
        this.moa = MOA;
        this.bulletSpeed = bulletSpeed;
        this.canFire = true;
        this.rateCount = 0;
        // this.firedBullets = [];
        this.capacity = capacity;
        this.remaining = this.capacity;
        this.aimDirection = aimDirection;
        this.targetType = targetType;
        this.parent = parent;
    }

    /**
     * 
     * @param {number} direction 狙う方向（弧度法, y-が90°）
     */
    fire(direction) {
        const MOA = getRandom(-this.moa / 2, this.moa / 2, 1);
        const bulletVector = new Vector(
            getZeroPoint(),
            new Point(
                cos(MOA + direction) * this.bulletSpeed,
                sin(MOA + direction) * this.bulletSpeed,
            ),
        );
        // this.firedBullets.push(
        FIRED_BULLETS.push(
            new Bullet(
                ENTITY_TYPES[0],
                "bullet",
                new Point(this.pos.x, this.pos.y),
                1,
                1,
                bulletVector,
                undefined,
                10,
                this.targetType,
            )
        );
    }

    operateFire(trigger) {
        if (this.canFire) {
            if (trigger) {
                this.fire(this.aimDirection);
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


    update(trigger) {
        this.follow(this.parent);
        this.operateFire(trigger);
    }
}