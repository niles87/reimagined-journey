const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let numberOfParticles = 100;
let particlesArray = [];
let hue = 0;

const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
gradient.addColorStop("0.2", "orangered");
gradient.addColorStop("0.4", "grey");
gradient.addColorStop("0.6", "yellow");
gradient.addColorStop("0.8", "blue");

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 15 + 2;
    this.speedX = Math.random() * 3 - 2;
    this.speedY = Math.random() * 3 - 2;
  }

  createParticles() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  updateParticles() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.speedX = -this.speedX;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.speedY = -this.speedY;
    }
    this.createParticles();
  }
}

function init() {
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].updateParticles();
  }
  requestAnimationFrame(animate);
}
init();
animate();

// `hsl(${(hue = Math.random() * 360 + 1)},${Math.random() * 100 + 1}%,${
//     Math.random() * 100 + 1
//   }%)`;
