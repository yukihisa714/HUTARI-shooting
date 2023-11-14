export const FPS = 30;

export const CAN_W = 300;
export const CAN_H = 500;

const can = document.getElementById("canvas");
can.width = CAN_W;
can.height = CAN_H;
can.style.background = "#808";

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
    tcon.drawImage(IMAGE, 0, 24, 8, 8, 0, 0, 32, 32);
};