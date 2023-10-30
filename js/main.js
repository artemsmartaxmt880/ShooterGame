/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const collisionCanvas = document.getElementById('collisionCanvas');
const collisionCtx = collisionCanvas.getContext('2d', { willReadFrequently: true });
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

const backgrounds = ['./img/bg1.jpg', './img/bg2.png', './img/bg3.png', './img/bg4.jpg', './img/bg5.jpg',];
document.querySelector('body').style = 'background: url(' + backgrounds[Math.floor(Math.random() * backgrounds.length)] + ') center/cover no-repeat';
const over = new Image();
over.src = './img/over.png'
let gameOver = false;

let score = 0;
ctx.font = '50px Georgia'

let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;

let ravens = [];
class Raven {
    constructor() {
        this.spriteWidth = 271;
        this.spriteHeight = 194;
        this.sizeModifier = Math.random() * 0.6 + 0.4;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 5 + 3;
        this.directionY = Math.random() * 5 - 2.5;
        this.markForDelition = false;
        this.image = new Image();
        this.image.src = './img/raven.png';
        this.frame = 0;
        this.maxFrame = 4;
        this.timeSinceFlap = 0;
        this.flapInterval = Math.random() * 50 + 50;
        this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')';
    }
    update(deltatime) {
        if (this.y < 0 || this.y > canvas.height - this.height) {
            this.directionY = this.directionY * -1;
        }
        this.x -= this.directionX;
        this.y += this.directionY;
        if (this.x < 0 - this.width) this.markForDelition = true;
        this.timeSinceFlap += deltatime;
        if (this.timeSinceFlap > this.flapInterval) {
            if (this.frame > this.maxFrame) this.frame = 0;
            else this.frame++;
            this.timeSinceFlap = 0;
        }
        if (this.x < 0 - this.width) gameOver = true;
    }
    draw() {
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}
let explosions = [];
class Explosion {
    constructor(x, y, size) {
        this.image = new Image();
        this.image.src = './img/boom.png';
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.size = size;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.sound = new Audio();
        this.sound.src = './img/crow.mp3';
        this.timeSinceLastFrame = 0;
        this.frameInterval = 70;
        this.markForDelition = false;
    }
    update(deltatime) {
        if (this.frame === 0) this.sound.play();
        this.timeSinceLastFrame += deltatime;
        if (this.timeSinceLastFrame > this.frameInterval) {
            this.frame++;
            this.timeSinceLastFrame = 0;
        }
        if (this.frame > 5) this.markForDelition = true;
    }
    draw() {
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y - this.size / 4, this.size, this.size)
    }
}
class ReloadButton {
    constructor() {
        this.x = canvas.width * 0.5;
        this.y = canvas.height * 0.5;
        this.width = 200;
        this.height = 200;
        this.image = new Image();
        this.image.src = './img/replay.png';
        this.color = 'rgb(0, 100, 100)';
    }
    draw() {
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x - this.width * 0.5, this.y + this.height * 0.25, this.width, this.height);
        ctx.drawImage(this.image, this.x - this.width * 0.5, this.y + this.height * 0.25);
    }
}
function drawScore() {
    ctx.fillStyle = 'black'
    ctx.fillText('Score: ' + score, 50, 75)
    ctx.fillStyle = 'white'
    ctx.fillText('Score: ' + score, 53, 78)
}
function drawGameOver() {
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText('Your score is : ' + score, canvas.width * 0.5, canvas.height * 0.5);
    ctx.fillStyle = 'white';
    ctx.fillText('Your score is : ' + score, canvas.width * 0.5 + 3, canvas.height * 0.5 + 3);
}
window.addEventListener('click', function (e) {
    const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1)
    const pc = detectPixelColor.data;
    ravens.forEach(object => {
        if (object.randomColors[0] === pc[0] && object.randomColors[1] === pc[1] && object.randomColors[2] === pc[2]) {
            object.markForDelition = true;
            score++;
            explosions.push(new Explosion(object.x, object.y, object.width));
        }
    })
    if (pc[0] === 0, pc[2] === 100, pc[2] === 100) {
        location.reload();
    }
})
function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
    let deltatime = timestamp - lastTime;
    lastTime = timestamp;
    timeToNextRaven += deltatime;
    if (timeToNextRaven > ravenInterval) {
        ravens.push(new Raven());
        timeToNextRaven = 0;
        ravens.sort(function (a, b) {
            return a.width - b.width;
        })
    };
    drawScore();
    [...ravens, ...explosions].forEach(object => object.update(deltatime));
    [...ravens, ...explosions].forEach(object => object.draw());
    ravens = ravens.filter(object => !object.markForDelition);
    explosions = explosions.filter(object => !object.markForDelition);
    const btn = new ReloadButton();
    if (!gameOver) requestAnimationFrame(animate);
    else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGameOver();
        btn.draw();
        ctx.drawImage(over, canvas.width * 0.5 - over.width * 0.5, canvas.height * 0.5 - over.height)
    }
}
animate(0); 