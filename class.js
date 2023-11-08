import { getZeroPoint, radiansToDegrees } from "./function.js";


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
        return new Vector(
            getZeroPoint(),
            new Point(
                this.x *= multiplier,
                this.y *= multiplier,
            )
        )
    }

    changeLength(length) {
        return this.multiplication(length / this.getLength());
    }

    getTheta() {
        return radiansToDegrees(Math.atan2(this.y, this.x));
    }
}


/**
 * 当たり判定の長方形のクラス
 * @param {Point} position 座標
 * @param {number} marginTop 上余白
 * @param {number} marginBottom 下余白
 * @param {number} marginLeft 左余白
 * @param {number} marginRight 右余白
 */
export class Square {
    constructor(position, marginTop, marginBottom, marginLeft, marginRight) {
        this.pos = position;
        this.mTop = marginTop;
        this.mLeft = marginLeft;
        this.mRight = marginRight;
        this.mBottom = marginBottom;

        this.update(this.pos);
    }

    /**
     * 座標の更新
     * @param {Point} newPosition 新しい座標
     */
    update(newPosition) {
        this.pos = newPosition;
        this.top = this.pos.y - this.mTop;
        this.left = this.pos.x - this.mLeft;
        this.right = this.pos.x + this.mRight;
        this.bottom = this.pos.y + this.mBottom;
    }

    /**
     * 四角同士の衝突判定
     * @param {Square} square2 二つ目の四角
     * @returns {boolean} 衝突してるかどうか
     */
    collision(square2) {
        if (square2.bottom < this.top || this.bottom < square2.top) return false;
        if (square2.right < this.left || this.right < square2.left) return false;
        return true;
    }
}
