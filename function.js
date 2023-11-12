import { Point, Vector } from "./class.js";

///////////////////////////////////////////////////////////////

/**
 * 精度を指定して乱数を取得する関数
 * @param {number} minimum 以上
 * @param {number} maximum 以下
 * @param {number} precision 精度
 * @returns {number} 乱数
 */
export function getRandom(minimum, maximum, precision) {
    if (precision === undefined) {
        precision = 0; // デフォルトの精度は整数
    }

    const factor = Math.pow(10, precision);
    const min = Math.ceil(minimum * factor);
    const max = Math.floor(maximum * factor);
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

    return randomNum / factor;
}

///////////////////////////////////////////////////////////////

/**
 * 度数法から弧度法に変換する関数
 * @param {number} degrees 度数法
 * @returns {number} ラジアン
 */
export function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}
/**
 * 弧度法から度数法に変換する関数
 * @param {number} radians ラジアン
 * @returns {number} 度数法
 */
export function radiansToDegrees(radians) {
    return radians * 180 / Math.PI;
}

///////////////////////////////////////////////////////////////

/**
 * sin
 * @param {number} theta 度数法
 * @returns {number}
 */
export function sin(theta) {
    return Math.sin(degreesToRadians(theta));
}

/**
 * cos
 * @param {number} theta 度数法
 * @returns {number}
 */
export function cos(theta) {
    return Math.cos(degreesToRadians(theta));
}

/**
 * tan
 * @param {number} theta 度数法
 * @returns {number}
 */
export function tan(theta) {
    return Math.tan(degreesToRadians(theta));
}

///////////////////////////////////////////////////////////////

/**
 * 0 Pointを取得する関数
 * @returns {Point} 0 Point
 */
export function getZeroPoint() {
    return new Point(0, 0);
}

/**
 * 0 Vectorを取得する関数
 * @returns {Vector} 0 Vector
 */
export function getZeroVector() {
    return new Vector(getZeroPoint(), getZeroPoint());
}

///////////////////////////////////////////////////////////////

/**
 * 平行四辺形を描画する関数
 * @param {any} ctx context
 * @param {Point} pos 位置(左上)
 * @param {number} w 横幅
 * @param {number} h 縦幅
 * @param {string} fillColor 塗りつぶす色
 * @param {string} strokeColor 縁取る色
 */
export function drawParallelogram(ctx, pos, width, height, fillColor, strokeColor, lineWidth) {
    ctx.beginPath();
    ctx.lineTo(pos.x, pos.y);
    ctx.lineTo(pos.x + width, pos.y);
    ctx.lineTo(pos.x + width - height, pos.y + height);
    ctx.lineTo(pos.x - height, pos.y + height);
    ctx.closePath();

    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
    if (strokeColor) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    }
}


/**
 * テキストを描画する関数
 * @param {any} ctx context
 * @param {any} text テキスト
 * @param {Point} pos 位置
 * @param {string} align 揃える位置
 * @param {number} size フォントサイズ
 * @param {string} font フォント
 * @param {string} fillColor 塗りつぶす色
 * @param {string} strokeColor 縁取る色
 */
export function drawText(ctx, text, pos, align, size, font, fillColor, strokeColor) {
    if (align) ctx.textAlign = align;
    // else ctx.textAlign = "left";

    ctx.font = `${size}px ${font}`;

    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fillText(text, pos.x, pos.y);
    }
    if (strokeColor) {
        ctx.strokeStyle = strokeColor;
        ctx.strokeText(text, pos.x, pos.y);
    }

}