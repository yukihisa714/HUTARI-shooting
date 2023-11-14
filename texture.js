import { Texture } from "./class.js";


export const TEXTURE_MAPS = {
    player:
        new Texture(0, 0, 8, 8, 4),

    standardEnemy:
        new Texture(9, 0, 8, 8, 4),

    smallEnemy:
        new Texture(4, 26, 4, 4, 4),

    largeEnemy:
        new Texture(0, 9, 16, 16, 4),

    playerBullet:
        new Texture(0, 26, 1, 4, 4),

    enemyBullet:
        new Texture(2, 26, 1, 4, 4),

};