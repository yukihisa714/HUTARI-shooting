import { degreesToRadians, getZeroPoint, radiansToDegrees } from "./function.js";
import { con, IMAGE } from "./option.js";

///////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////

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
     * ベクトルの長さを取得するメソッド
     * @returns {number} ベクトルの長さ
     */
    getLength() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    /**
     * ベクトルを乗算するメソッド
     * @param {number} multiplier 掛ける数
     * @returns {Vector} 乗算されたベクトル
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

    /**
     * ベクトルの大きさを変えるメソッド
     * @param {number} length ベクトルの大きさ
     * @returns {Vector} 大きさが変更されたベクトル
     */
    changeLength(length) {
        return this.multiplication(length / this.getLength());
    }

    /**
     * ベクトルの角度を弧度法で取得するメソッド
     * @returns {number} 0~180までの角度
     */
    getTheta() {
        return radiansToDegrees(Math.atan2(this.y, this.x));
    }
}

///////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////

/**
 * テクスチャクラス
 * @param {number} tx テクスチャx座標
 * @param {number} ty テクスチャy座標
 * @param {number} tw テクスチャ縦幅
 * @param {number} th テクスチャ横幅
 * @param {number} P テクスチャ拡大率
 */
export class Texture {
    constructor(tx, ty, tw, th, P) {
        this.tx = tx;
        this.ty = ty;
        this.tw = tw;
        this.th = th;
        this.P = P;
    }

    /**
     * テクスチャを描画するメソッド
     * @param {number} dx 描画する場所
     * @param {number} dy 描画する場所
     * @param {number} tx 切り抜く場所
     * @param {number} ty 切り抜く場所
     * @param {number} tW 切り抜く横幅
     * @param {number} tH 切り抜く縦幅
     * @param {number} angle 描画する角度(度数法)
     */
    drawTexture(dx, dy, angle) {
        if (angle) {
            con.save();
            con.translate(dx, dy);
            con.rotate(degreesToRadians(angle));
            con.drawImage(IMAGE, this.tx, this.ty, this.tw, this.th, 0, 0, this.tw * this.P, this.th * this.P);
            con.restore();
        }
        else {
            con.drawImage(IMAGE, this.tx, this.ty, this.tw, this.th, dx, dy, this.tw * this.P, this.th * this.P);
        }
    }
}