export const FPS = 60;

export const CAN_W = 300;
export const CAN_H = 500;

const can = document.getElementById("canvas");
can.width = CAN_W;
can.height = CAN_H;
can.style.background = "#000";

export const con = can.getContext("2d");

export const key = {};
document.onkeydown = e => {
    key[e.key] = true;
    // console.log(e.key);
}
document.onkeyup = e => key[e.key] = false;



