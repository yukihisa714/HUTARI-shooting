import { con, P } from "./option.js";
import { Point, Vector, Square, } from "./class.js";
import { Entity, ENTITY_TYPES } from "./entity.js";
import { player } from "./player.js";
import { enemies } from "./enemy.js";
import { damageEffect } from "./effect.js";
import { newDamageNumber } from "./UI.js";
import { drawText, drawTexture } from "./function.js";
import { TEXTURE_MAPS } from "./texture.js";

///////////////////////////////////////////////////////////////

/**
 * 弾丸のクラス
 * @param {number} type エンティティタイプ
 * @param {number} name 名前
 * @param {Point} position 座標
 * @param {number} width 横幅
 * @param {number} height 縦幅
 * @param {Vector} vector 速度と向き(一秒あたりのpx)(残像の向きにも使用)
 * @param {Square} rigidBody 剛体の四角形
 * @param {number} length 弾の残像の長さ
 * @param {number} targetType 攻撃を与える対象
 */
export class Bullet extends Entity {
    constructor(type, name, position, width, height, vector, rigidBody, length, targetType) {
        super(type, name, position, width, height, vector, rigidBody);
        this.length = length;
        this.targetType = targetType;
        this.isAlive = true;
    }

    /**
     * 弾の衝突判定
     * @param {Entity} entity 敵
     * @returns {boolean} 衝突の有無
     */
    checkHit(entity) {
        return this.rigidBody.collision(entity.rigidBody);
    }

    draw() {
        const p = this.length / this.vector.getLength();
        const ex = this.pos.x + this.vector.x * p;
        const ey = this.pos.y + this.vector.y * p;
        // con.strokeStyle = "#fff";
        // con.lineWidth = 2;
        // con.beginPath();
        // con.lineTo(this.pos.x, this.pos.y);
        // con.lineTo(ex, ey);
        // con.closePath();
        // con.stroke();

        if (this.targetType === ENTITY_TYPES.enemy) {
            TEXTURE_MAPS.playerBullet.drawTexture(this.pos.x - P / 2, this.pos.y - this.length);
        }
        else if (this.targetType === ENTITY_TYPES.player) {
            TEXTURE_MAPS.enemyBullet.drawTexture(ex, ey, this.vector.getTheta() + 90);
        }
    }
}

///////////////////////////////////////////////////////////////

export const FIRED_BULLETS = [];

export function updateBullets() {
    bulletLoop: for (const bullet of FIRED_BULLETS) {
        bullet.move(true);
        bullet.draw();

        // 画面外に出たら消す
        if (bullet.checkInScreen() === false) {
            bullet.isAlive = false;
            continue;
        }

        // ヒットしたら消す
        if (bullet.targetType === ENTITY_TYPES.player) {
            if (bullet.checkHit(player)) {
                player.hp -= 10;
                damageEffect.takeDamage();
                bullet.isAlive = false;
                continue;
            }
        }
        else if (bullet.targetType === ENTITY_TYPES.enemy) {
            for (const enemy of enemies) {
                if (bullet.checkHit(enemy)) {
                    enemy.takeDamage(10);
                    newDamageNumber(new Point(enemy.pos.x, enemy.pos.y), 10);
                    bullet.isAlive = false;
                    continue bulletLoop;
                }
            }
        }
    }


    let i = 0;
    while (i < FIRED_BULLETS.length) {
        if (FIRED_BULLETS[i].isAlive === false) {
            FIRED_BULLETS.splice(i, 1);
        }
        else {
            i++;
        }
    }

    drawText(con, FIRED_BULLETS.length, new Point(10, 15), "left", 15, "Impact", "#fff");
}