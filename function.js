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

/**
 * 度数法から弧度法に変換する関数
 * @param {number} degrees 弧度法
 * @returns {number} ラジアン
 */
function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

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
