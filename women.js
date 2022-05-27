var canvas = document.getElementById("canvasWomen");
canvas.width = 1500;
canvas.height = 1000;
var ctx = canvas.getContext("2d");
var canvasWomen = {
    canvas: canvas,
    ctx: ctx,
    cw: canvas.width,
    ch: canvas.height
}

var animationWomen = {
    womenX: canvasWomen.cw / 2,
    womenY: canvasWomen.ch,
    height: 100 * 1.5,
    width: 60 * 1.5,
    rain: false
}

setInterval(() => {
    drawWomen()
}, 10);

var imgWomen = new Image();
imgWomen.src = './women.png';

var imgWomenRain = new Image();
imgWomenRain.src = './women_rain.png';

function drawWomen() {
    canvasWomen.ctx.clearRect(0, 0, canvasWomen.cw, canvasWomen.ch);

    canvasWomen.ctx.beginPath();
    if (animationWomen.rain) {
        canvasWomen.ctx.drawImage(imgWomenRain, animationWomen.womenX, animationWomen.womenY - (animationWomen.height - 5), animationWomen.width, animationWomen.height);
    }
    else { canvasWomen.ctx.drawImage(imgWomen, animationWomen.womenX, animationWomen.womenY - (animationWomen.height - 5), animationWomen.width, animationWomen.height); }
    canvasWomen.ctx.stroke();
}