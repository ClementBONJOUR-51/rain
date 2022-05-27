
var canvas = document.getElementById("canvasRain");
var ctx = canvas.getContext("2d");
canvas.width = 1500;
canvas.height = 1000;
var canvasRain = {
    canvas: canvas,
    ctx: ctx,
    cw: canvas.width,
    ch: canvas.height
}

var vent = 2

var animationRain = {
    number: 1500,
    minSizeX: 0.6,
    maxSizeX: 1.2,
    minSizeY: 10,
    maxSizeY: 15,
    minSpeed: 10,
    maxSpeed: 100,
    minHeight: -vent * 100,
    maxHieght: canvasRain.cw + (vent * 100),
    color: '#FFFFFF',
    opacity: 'FF',
    arrayX: [],
    arrayY: [],
    arraySpeed: [],
    arraySize: [],
    arrayBounce: [],
}

var g_timer = null;



for (let i = 0; i < animationRain.number; i++) {
    animationRain.arrayY.push(-Math.floor(Math.random() * animationRain.maxSizeX * 100) + (-animationRain.maxSizeX))
    animationRain.arrayX.push(Math.floor(Math.random() * animationRain.maxHieght) + animationRain.minHeight)
    var speed = (Math.floor(Math.random() * animationRain.maxSpeed) + animationRain.minSpeed) / 100
    animationRain.arraySpeed.push([speed, speed])
    animationRain.arrayBounce.push(false)
    animationRain.arraySize.push([Math.floor(Math.random() * animationRain.maxSizeX) + animationRain.minSizeX, Math.floor(Math.random() * animationRain.maxSizeY) + animationRain.minSizeY])
}
drawRain(animationRain.arrayY, animationRain.arrayX, animationRain.arraySpeed, animationRain.arraySize, animationRain.arrayBounce)


function drawRain(pos, y, speed, size, bounce) {
    var x = []
    for (let i = 0; i < pos.length; i++) {
        x[i] = (pos[i] / 100) * (canvasRain.cw - animationRain.maxSizeY);
    }

    canvasRain.ctx.clearRect(0, 0, canvasRain.cw, canvasRain.ch);

    for (let i = 0; i < y.length; i++) {
        canvasRain.ctx.beginPath();
        if (!bounce[i]) {
            canvasRain.ctx.fillRect(y[i], x[i], size[i][0], size[i][1]);
        } else {
            canvasRain.ctx.fillRect(y[i], x[i], size[i][0], size[i][1] / 2);
        }
        canvasRain.ctx.fillStyle = animationRain.color + animationRain.opacity;
        canvasRain.ctx.stroke();


        if (x[i] > canvasRain.ch - 30) {
            bounce[i] = true
            setTimeout(() => {
                bounce[i] = false
                pos[i] = -10;
                speed[i][1] = speed[i][0]
                y[i] = Math.floor(Math.random() * animationRain.maxHieght) + (animationRain.minHeight);
            }, Math.floor(Math.random() * 200) + 100);


        } else if ((pos[i] > (canvasMouse.mouseY * 100) / canvasMouse.cw) && (pos[i] < (canvasMouse.mouseY * 100) / canvasMouse.cw + 10) && y[i] < canvasMouse.mouseX + canvasMouse.width && y[i] > canvasMouse.mouseX) {
            var side = Math.random() < 0.5
            if (side < 0.5) { y[i] = canvasMouse.mouseX }
            else { y[i] = canvasMouse.mouseX + canvasMouse.width }
            pos[i] = pos[i] + 5
        }

        if ((pos[i] > ((animationWomen.womenY - animationWomen.height) * 100) / canvasMouse.cw) && (pos[i] < ((animationWomen.womenY) * 100) / canvasMouse.cw) && y[i] > animationWomen.womenX && y[i] < animationWomen.womenX + animationWomen.width) {
            if (!animationWomen.rain) {
                animationWomen.rain = true
                g_timer = setTimeout(() => {
                    animationWomen.rain = false;
                }, 1000);
            } else {
                clearTimeout(g_timer);
                g_timer = setTimeout(() => {
                    animationWomen.rain = false;
                }, 1000);
            }
        }

        if (!bounce[i]) {
            speed[i][1] = speed[i][1] + 0.01
            pos[i] = pos[i] + speed[i][1]
            y[i] = y[i] + vent
        } else {
            speed[i][1] = 0.02
            pos[i] = pos[i] - speed[i][1]
            y[i] = y[i] + vent / 5
        }

    }

    requestAnimationFrame(() => { drawRain(pos, y, speed, size, bounce) });
};


