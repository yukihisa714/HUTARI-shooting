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



export const DEFAULT_PLAYER = {
    posX: CAN_W / 2,
    posY: CAN_H * 0.8,
    maxSpeed: 120,
    accel: 240,
    RPM: 240,
    MOA: 5,
    bulletSpeed: 300,
};

export const ENEMIES_DATA = [
    {
        name: "Trooper",
        type: "Standard",
        w: 20,
        h: 20,
        speed: 50,
        HP: 50,
        dpa: 10,
        spa: 1,
        dps: 10,
    },
    {
        name: "Speedster",
        type: "Small and Agile",
        w: 10,
        h: 10,
        speed: 100,
        HP: 15,
        dpa: 5,
        spa: 0.5,
        dps: 10,
    },
    {
        name: "Behemoth",
        type: "Large and Strong",
        w: 40,
        h: 40,
        speed: 15,
        HP: 200,
        dpa: 25,
        spa: 2,
        dps: 12.5,
    },
    {
        name: "Guardian",
        type: "Shielded",
        w: 20,
        h: 20,
        speed: 50,
        HP: 50,
        dpa: 10,
        spa: 1,
        dps: 10,
        shield: 50
    },
    {
        name: "Sniper",
        type: "Ranged Attacker",
        w: 20,
        h: 20,
        speed: 50,
        HP: 10,
        dpa: 2,
        spa: 1,
        dps: 2,
    },
]