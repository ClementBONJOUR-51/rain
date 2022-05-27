var canvas = document.getElementById("canvasMouse");
var ctx = canvas.getContext("2d");
canvas.width = 1500;
canvas.height = 1000;

var canvasMouse = {
    canvas: canvas,
    ctx: ctx,
    cw: canvas.width,
    ch: canvas.height,
    mouseX: 0,
    mouseY: 0,
    width: 150,
    height: 150
}
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(),
        scaleX = canvas.width / rect.width;
    scaleY = canvas.height / rect.height;

    return {
        x: (evt.clientX - rect.left) * scaleX,
        y: (evt.clientY - rect.top) * scaleY
    }
}
canvasMouse.canvas.addEventListener('mousemove', function (evt) {
    var mousePos = getMousePos(canvasMouse.canvas, evt);
    canvasMouse.mouseX = mousePos.x;
    canvasMouse.mouseY = mousePos.y;
    drawMouse()
}, false);

var imgUmbrella = new Image();
imgUmbrella.src = './umbrella.png';

function drawMouse() {
    canvasMouse.ctx.clearRect(0, 0, canvasMouse.cw, canvasMouse.ch);

    canvasMouse.ctx.beginPath();
    // canvasMouse.ctx.fillRect(canvasMouse.mouseX, canvasMouse.mouseY, canvasMouse.width, canvasMouse.height);
    // canvasMouse.ctx.fillStyle = "#000000";
    canvasMouse.ctx.drawImage(imgUmbrella, canvasMouse.mouseX, canvasMouse.mouseY, canvasMouse.width, canvasMouse.height);
    canvasMouse.ctx.stroke();
}
