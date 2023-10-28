import { con } from "./option.js";
import { Point, Vector, Entity, } from "./class.js";
import { Enemy } from "./enemy.js";


/**
 * 弾丸のクラス
 * @param {Point} position 座標
 * @param {Vector} vector 速度と向き(一秒あたりのpx)(残像の向きにも使用)
 * @param {number} length 弾の残像の長さ
 */
export class Bullet extends Entity {
    constructor(position, vector, length) {
        super(position, vector);
        this.length = length;
    }

    /**
     * 敵との衝突判定
     * @param {Enemy} enemy 敵
     * @returns {boolean}
     */
    checkHit(enemy) {
        const left = enemy.pos.x - enemy.w / 2;
        const right = enemy.pos.x + enemy.w / 2;
        const top = enemy.pos.y - enemy.h / 2;
        const bottom = enemy.pos.y + enemy.h / 2;
        if (left < this.pos.x && this.pos.x < right) {
            if (top < this.pos.y && this.pos.y < bottom) {
                console.log("Hit");
                return true;
            }
        }
        return false;
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
