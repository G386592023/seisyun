const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const wid = 500;
const hei = 300;
const lw = 3;

function drawRect(x, y, w, h, col, stroke=false){
    ctx.fillStyle = col;
    ctx.fillRect(x,y,w,h);
    if(stroke){
        ctx.strokeRect(x+lw/2, y+lw/2, w-lw, h-lw);
    }
}

function init(){
    canvas.width = wid;
    canvas.height = hei;
    ctx.lineWidth = lw;

    loop()
}

function loop(){
    requestAnimationFrame(loop)
}

onload = init;