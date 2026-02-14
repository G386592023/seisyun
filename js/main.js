//必要なパーツわけ　キャラ（本体、目、羽）、地面、背景

const cv = document.getElementById("canv");
const ctx = cv.getContext("2d");
const wid = 500;
const hei = 300;
const lw = 1;   //枠線

let keyUp = false, keyDown= false, keyRight=false, keyLeft=false, keySpace = false;

addEventListener("keydown", (e)=> {
    (e.key == "ArrowUp") && (keyUp = true);
    (e.key == "ArrowDown") && (keyDown = true);
    (e.key == "ArrowRight") && (keyRight = true);
    (e.key == "ArrowLeft") && (keyLeft = true);
    // (e.key == " ") && (keySpace = true);
    (e.key == "r") && start();
})
addEventListener("keyup", (e)=>{
    (e.key == "ArrowUp") && (keyUp = false);
    (e.key == "ArrowDown") && (keyDown = false);
    (e.key == "ArrowRight") && (keyRight = false);
    (e.key == "ArrowLeft") && (keyLeft = false);
    // (e.key == " ") && (keySpace = false);
})

function drawRect(x, y, w, h, col, stroke=false){
    ctx.fillStyle = col;
    ctx.fillRect(x,y,w,h);
    if(stroke){
        ctx.strokeRect(x+lw/2, y+lw/2, w-lw, h-lw);
    }
}

class Rect{
    constructor(x, y, w, h, col, stroke){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.col = col;
        this.stroke = stroke;
    }

    draw(){
        drawRect(this.x, this.y, this.w, this.h, this.col, this.stroke);
    }
}

class Block extends Rect{
    constructor(x, y, col="rgb(228, 199, 222)", stroke){
        super(x, y, 500, 75, col, stroke);
        this.vx=0;
        this.vy=0;
        this.speed=2;
        this.dir = 1;
    }
    move(){
        const p = moves(this.x, this.y, this.w, this.h, this.vx, this.vy, this.speed, this.dir);
        this.x = p.x;
        this.y = p.y;
    }
}

class Player extends Rect{
    constructor(x, y, stroke){
        super(x, y, 100, 100, "rgb(246, 170, 230)", stroke);
        this.vx=0;
        this.vy=0;
        this.speed=-2;
        this.dir = 1;
    }
    move(){
        const p = moves(this.x, this.y, this.w, this.h, this.vx, this.vy, this.speed, this.dir);
        this.y = p.y;
    }
}

function moves(x, y, w, h, vx, vy, speed, dir){
    keyRight && (dir = 1);
    keyLeft && (dir = -1);
    (keyRight || keyLeft) ? (vx = -speed*dir) : (vx = 0);    //elseありif文
    keyUp && (dir = 1);
    keyDown && (dir = -1);
    (keyUp || keyDown) ? (vy = speed*dir) : (vy = 0);    //elseありif文

    beforColl();

    return {x:x+vx, y:y+vy};
}

function beforColl(){
    if(this.y + this.h + this.vy > blocks.y && this.y + this.vy < blocks.y + blocks.h
        && this.x + this.w > blocks.x && this.x < beforColl.x + beforColl.w){
            if(this.vy > 0){
                this.y = blocks.y - this.h;
                this.vy = 0;
            }
    }
}

function init(){
    cv.width = wid;
    cv.height = hei;
    ctx.lineWidth = lw;

    start();
    loop();
}

const ms = 25;
let map =[
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];
// console.log(map.length);
// console.log(map[0].length);

const g = 0.1;

let blocks;
let player;

function start(){
    for(let i=0; i<map.length; i++){
        for(let j=0; j<map[0].length; j++){
            let m = map[i][j];
            m==1 && (blocks = new Block(j*ms, i*ms)); //if文
            m==2 && (player = new Player(j*ms, i*ms)); //if文
        }
    }
}

function loop(){
    drawRect(0, 0, wid, hei, "rgb(90, 122, 150)");

    blocks.move();
    player.move();

    blocks.draw();
    player.draw();

    requestAnimationFrame(loop);
}

onload = init;


