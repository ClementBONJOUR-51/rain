var canvas = document.getElementById("canvasCloud");
var ctx = canvas.getContext("2d");
canvas.width = 1500;
canvas.height = 1000;
var canvasClouds = {
    canvas: canvas,
    ctx: ctx,
    cw: canvas.width,
    ch: canvas.height
}

var animationClouds = {
    number: 200,
    minSizeX: 40,
    maxSizeX: 50,
    minSizeY: 10,
    maxSizeY: 20,
    minSpeed: 2,
    maxSpeed: 5,
    minHeight: -50,
    maxHieght: 150,
    color: '#FFFFFF',
    opacity: 'EE',
    loop: true,
    arrayX: [],
    arrayY: [],
    arraySpeed: [],
    arraySize: [],
}



for (let i = 0; i < animationClouds.number; i++) {
    animationClouds.arrayX.push(-Math.floor(Math.random() * animationClouds.maxSizeX * 2) + -10)
    animationClouds.arrayY.push(Math.floor(Math.random() * animationClouds.maxHieght) + animationClouds.minHeight)
    animationClouds.arraySpeed.push((Math.floor(Math.random() * animationClouds.maxSpeed) + animationClouds.minSpeed) / 100)
    animationClouds.arraySize.push([Math.floor(Math.random() * animationClouds.maxSizeX) + animationClouds.minSizeX, Math.floor(Math.random() * animationClouds.maxSizeY) + animationClouds.minSizeY])
}

drawClouds(animationClouds.arrayX, animationClouds.arrayY, animationClouds.arraySpeed, animationClouds.arraySize)



function drawClouds(pos, y, speed, size) {
    var x = []
    for (let i = 0; i < pos.length; i++) {
        x[i] = (pos[i] / 100) * (canvasClouds.cw - animationClouds.maxSizeY);
    }

    canvasClouds.ctx.clearRect(0, 0, canvasClouds.cw, canvasClouds.ch);

    for (let i = 0; i < y.length; i++) {
        canvasClouds.ctx.beginPath();
        canvasClouds.ctx.ellipse(x[i], y[i], size[i][0], size[i][1], 0, 2 * Math.PI, false);
        canvasClouds.ctx.fillStyle = animationClouds.color + animationClouds.opacity;
        canvasClouds.ctx.fill();
        canvasClouds.ctx.lineWidth = 0;
        canvasClouds.ctx.strokeStyle = animationClouds.color + animationClouds.opacity;
        canvasClouds.ctx.stroke();
        if (pos[i] > 110) {
            if (animationClouds.loop) {
                pos[i] = -10;
                y[i] = Math.floor(Math.random() * animationClouds.maxHieght) + animationClouds.minHeight;
            } else {
                pos[i] = 0
                speed[i] = 0
                size[i][0] = 0; size[i][1] = 0;
            }
        } else {
            pos[i] = pos[i] + speed[i]
        }
    }

    requestAnimationFrame(() => { drawClouds(pos, y, speed, size) });
};


