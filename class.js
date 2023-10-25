import { FPS } from "./option.js";

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
}

/**
 * エンティティのクラス
 * @param {Point} position 座標
 * @param {Vector} vector 速度と向き(一秒あたりのピクセル)
 */
export class Entity {
    constructor(position, vector) {
        this.pos = position;
        this.vector = vector;
    }

    /**
     * 動くメソッド
     */
    move() {
        this.pos.x += this.vector.x / FPS;
        this.pos.y += this.vector.y / FPS;
    }
}
