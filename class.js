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

    /**
     * 乗算
     * @param {number} multiplier 掛ける数
     */
    multiplication(multiplier) {
        this.x *= multiplier;
        this.y *= multiplier;
    }
}


// export class Square {
//     constructor(centerPosition, width, height) {
//         this.pos = centerPosition;
//         this.w = width;
//         this.h = height;
//         this.left = this.pos.x - this.w / 2;
//         this.right = this.pos.x + this.w / 2;
//         this.top = this.pos.y - this.h / 2;
//         this.bottom = this.pos.y + this.h / 2;
//     }

//     /**
//      * 長方形同士の当たり判定
//      * @param {Square} square2 
//      * @returns {boolean} 当たってるか否か
//      */
//     collision(square2) {
//         if (this.left < square2.right && square2.left < this.right) {
//             if (this.top < square2.bottom && square2.top < this.bottom) {
//                 return true;
//             }
//         }
//         return false;
//     }
// }

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
