const canvas = document.getElementById("soccerCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ballCount = 20; // Número de balones
const gravity = 0.5; // Gravedad
const friction = 0.8; // Fricción al rebotar

// Cargar imágenes de balones
const colors = ["#ffffff", "#ffcc00", "#ff0000", "#00ff00", "#00aaff"];
const soccerBall = new Image();
soccerBall.src = "https://upload.wikimedia.org/wikipedia/commons/2/20/Soccerball.svg";

class Ball {
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.drawImage(soccerBall, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        ctx.closePath();
    }

    update() {
        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy * friction; // Rebote
        } else {
            this.dy += gravity; // Aplicar gravedad
        }

        if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) {
            this.dx = -this.dx; // Rebote lateral
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

let balls = [];

function init() {
    balls = [];
    for (let i = 0; i < ballCount; i++) {
        let radius = 20 + Math.random() * 15;
        let x = Math.random() * (canvas.width - radius * 2) + radius;
        let y = Math.random() * (canvas.height - radius * 2) + radius;
        let dx = (Math.random() - 0.5) * 4;
        let dy = Math.random() * 2;
        balls.push(new Ball(x, y, dx, dy, radius));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => ball.update());
    requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

init();
animate();
