import { getZeroPoint, radiansToDegrees } from "./function.js";
import { CAN_W, CAN_H, FPS, con } from "./option.js";

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
 * エンティティのクラス
 * @param {string} name 名前
 * @param {Point} position 座標
 * @param {number} width 横幅
 * @param {number} height 縦幅
 * @param {Vector} vector 速度と向き(一秒あたりのピクセル)
 * @param {Square} rigidBody 当たり判定の剛体
 */
export class Entity {
    constructor(name, position, width, height, vector, rigidBody) {
        this.name = name;
        this.pos = position;
        this.w = width;
        this.h = height;
        this.vector = vector;
        this.rigidBody = rigidBody;
        if (rigidBody === undefined) {
            this.rigidBody = new Square(this.pos, 0, 0, 0, 0);
        }
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

        this.rigidBody.update(this.pos);
    }

    /**
     * 他のエンティティ追従するメソッド
     * @param {Entity} entity 追従先のエンティティ
     */
    follow(entity) {
        this.pos.x = entity.pos.x;
        this.pos.y = entity.pos.y;
    }

    drawRigidBody() {
        con.strokeStyle = "#fff";
        con.lineWidth = 1;
        con.beginPath();
        con.lineTo(this.rigidBody.left, this.rigidBody.top);
        con.lineTo(this.rigidBody.right, this.rigidBody.top);
        con.lineTo(this.rigidBody.right, this.rigidBody.bottom);
        con.lineTo(this.rigidBody.left, this.rigidBody.bottom);
        con.closePath();
        con.stroke();
    }
}
