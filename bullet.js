import { con } from "./option.js";
import { Point, Vector, Square, } from "./class.js";
import { Entity } from "./entity.js";


/**
 * 弾丸のクラス
 * @param {number} name 名前
 * @param {Point} position 座標
 * @param {number} width 横幅
 * @param {number} height 縦幅
 * @param {Vector} vector 速度と向き(一秒あたりのpx)(残像の向きにも使用)
 * @param {Square} rigidBody 剛体の四角形
 * @param {number} length 弾の残像の長さ
 */
export class Bullet extends Entity {
    constructor(name, position, width, height, vector, rigidBody, length) {
        super(name, position, width, height, vector, rigidBody);
        this.length = length;
        this.isAlive = true;
    }

    /**
     * 弾の衝突判定
     * @param {Entity} entity 敵
     * @returns {boolean}
     */
    checkHit(entity) {
        return this.rigidBody.collision(entity.rigidBody);
    }

    draw() {
        const p = this.length / this.vector.getLength();
        con.strokeStyle = "#fff";
        con.lineWidth = 2;
        con.beginPath();
        con.lineTo(this.pos.x, this.pos.y);
        con.lineTo(this.pos.x + this.vector.x * p, this.pos.y + this.vector.y * p);
        con.closePath();
        con.stroke();
    }
}

export const FIRED_BULLETS = [];

export function updateBullets() {
    let i = 0;
    while (i < FIRED_BULLETS.length) {
        if (FIRED_BULLETS[i].isAlive === false) {
            FIRED_BULLETS.splice(i, 1);
        }
        else {
            i++;
        }
    }

    for (const bullet of FIRED_BULLETS) {
        bullet.move(true);

        if (bullet.checkInScreen() === false) {
            bullet.isAlive = false;
        }

        bullet.draw();
    }

    con.fillText(FIRED_BULLETS.length, 10, 10);
}