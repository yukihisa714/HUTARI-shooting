export const FPS = 30;

export const CAN_W = 256;
export const CAN_H = 512;

const can = document.getElementById("canvas");
can.width = CAN_W;
can.height = CAN_H;
can.style.background = "#088";

export const con = can.getContext("2d");
con.imageSmoothingEnabled = false;

export const key = {};
document.onkeydown = e => {
    key[e.key] = true;
    // console.log(e.key);
}
document.onkeyup = e => key[e.key] = false;


export const IMAGE = new Image();
IMAGE.src = "/texture.png";

export const P = 4;

const tcan = document.getElementById("textures");
tcan.width = P * 32;
tcan.height = P * 32;
tcan.style.background = "#aaf";

const tcon = tcan.getContext("2d");
tcon.imageSmoothingEnabled = false;

IMAGE.onload = () => {
    tcon.drawImage(IMAGE, 0, 8, 16, 16, 0, 0, 64, 64);
    // tcon.drawImage(IMAGE, 0, 0, 32, 32, 0, 0, 128, 128);

    // tcon.imageSmoothingEnabled = true;
    // tcon.save();
    // tcon.translate(20, 20);
    // tcon.rotate(15 * Math.PI / 180);
    // tcon.drawImage(IMAGE, 0, 24, 1, 4, 0, 0, 4, 16);
    // tcon.restore();

};