// canvas related variables

var canvas = document.getElementById("canvasTime");
canvas.width = 1500;
canvas.height = 1000;
var ctx = canvas.getContext("2d");
var canvasTime = {
    canvas: canvas,
    ctx: ctx,
    cw: canvas.width,
    ch: canvas.height
}


// var night = ['rgb(0, 34, 28)', 'rgb(0, 163, 133)']
// var twilight = ['rgb(99, 0, 110)', 'rgb(255, 204, 0)']
var grad00 = ['#00000c', '#00000c']
var grad01 = ['#020111', '#191621']
var grad02 = ['#020111', '#20202c']
var grad03 = ['#020111', '#3a3a52']
var grad04 = ['#20202c', '#515175']
var grad05 = ['#40405c', '#8a76ab']
var grad06 = ['#4a4969', '#cd82a0']
var grad07 = ['#757abf', '#eab0d1']
var grad08 = ['#82addb', '#ebb2b1']
var grad09 = ['#94c5f8', '#b1b5ea']
var grad10 = ['#b7eaff', '#94dfff']
var grad11 = ['#9be2fe', '#67d1fb']
var grad12 = ['#90dffe', '#38a3d1']
var grad13 = ['#57c1eb', '#246fa8']
var grad14 = ['#2d91c2', '#1e528e']
var grad15 = ['#2473ab', '#5b7983']
var grad16 = ['#1e528e', '#9da671']
var grad17 = ['#1e528e', '#e9ce5d']
var grad18 = ['#154277', '#b26339']
var grad19 = ['#163C52', '#2F1107']
var grad20 = ['#071B26', '#2F1107']
var grad21 = ['#010A10', '#2F1107']
var grad22 = ['#090401', '#4B1D06']
var grad23 = ['#00000c', '#150800']


var timeline = [grad00, grad01, grad02, grad03, grad04, grad05, grad06, grad07, grad08, grad09, grad10, grad12, grad13, grad14, grad15, grad16, grad17, grad18, grad19, grad20, grad21, grad22, grad23]
var currentSky = grad15;

var animationSky = {
    opacitySteps: parseInt(60 * 3),
    opacityStep: 0,
    speedTime: 5000
}

function clear() {
    ctx.clearRect(0, 0, cw, ch);
}

function backgorundColor(Sky) {
    var degrade = canvasTime.ctx.createLinearGradient(0, 0, 0, canvasTime.cw / 2);
    degrade.addColorStop(0, Sky[0]);
    degrade.addColorStop(1, Sky[1]);
    canvasTime.ctx.fillStyle = degrade;
    canvasTime.ctx.fillRect(0, 0, canvasTime.cw, canvasTime.ch);
}

function getNextSky() {
    if (timeline.indexOf(currentSky) + 1 > timeline.length - 1) { return timeline[0] }
    return timeline[timeline.indexOf(currentSky) + 1]
}

backgorundColor(currentSky)

setInterval(() => {
    nextSky()
}, animationSky.speedTime);


function nextSky() {

    var opacity = 100 * (animationSky.opacityStep / animationSky.opacitySteps);
    if (animationSky.opacityStep >= animationSky.opacitySteps - 1) { opacity = 100; }

    canvasTime.ctx.globalAlpha = (100 - opacity) / 100;
    backgorundColor(currentSky)

    canvasTime.ctx.globalAlpha = (opacity) / 100;
    backgorundColor(getNextSky())

    canvasTime.ctx.globalAlpha = 1.00;

    if (++animationSky.opacityStep >= animationSky.opacitySteps) { currentSky = getNextSky(); animationSky.opacityStep = 0; return; }

    requestAnimationFrame(nextSky);
}
