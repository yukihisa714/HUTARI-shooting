import { CAN_W, CAN_H, FPS } from "./option.js";

/**
 * 点のクラス
 * @param {number} x 座標
 * @param {number} y 座標
 */
export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

/**
 * ベクトルのクラス
 * @param {Point} point1 始点
 * @param {Point} point2 終点
 */
export class Vector {
    constructor(point1, point2) {
        this.x = point2.x - point1.x;
        this.y = point2.y - point1.y;
    }

    /**
     * ベクトルの長さを取得する関数
     * @returns {number} ベクトルの長さ
     */
    getLength() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    /**
     * 乗算
     * @param {number} multiplier 掛ける数
     */
    multiplication(multiplier) {
        this.x *= multiplier;
        this.y *= multiplier;
    }
}



/**
 * エンティティのクラス
 * @param {Point} position 座標
 * @param {number} width 横幅
 * @param {number} height 縦幅
 * @param {Vector} vector 速度と向き(一秒あたりのピクセル)
 */
export class Entity {
    constructor(position, width, height, vector) {
        this.pos = position;
        this.w = width;
        this.h = height;
        this.vector = vector;
    }

    /**
     * 動くメソッド
     * @param {boolean} canOffScreen 画面外に出れるかどうか
     */
    move(canOffScreen) {
        const newX = this.pos.x + this.vector.x / FPS;
        const newY = this.pos.y + this.vector.y / FPS;
        if (canOffScreen) {
            this.pos.x = newX;
            this.pos.y = newY;
        }
        else {
            if (0 < newX - this.w / 2 && newX + this.w / 2 < CAN_W) {
                this.pos.x = newX;
            }
            if (0 < newY && newY + this.h < CAN_H) {
                this.pos.y = newY;
            }
        }
    }
}
