import { CAN_W, CAN_H, FPS, con } from "./option.js";
import { Square } from "./class.js";

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
