const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const numberOfParticles = 150;
let particleArray = [];

const mouse = {
  x: null,
  y: null,
};

window.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

setInterval(function () {
  mouse.x = undefined;
  mouse.y = undefined;
}, 200);

class Particle {
  constructor(x, y, size, color, weight) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.weight = weight;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.size -= 0.05;
    if (this.size < 0) {
      this.x = mouse.x + (Math.random() * 20 - 10);
      this.y = mouse.y + (Math.random() * 20 - 10);
      this.size = Math.random() * 10 + 2;
      this.weight = Math.random() * 2 - 0.8;
    }
    this.y += this.weight;
    this.weight += 0.2;

    if (this.y > canvas.height - this.size) {
      this.weight *= -0.9;
    }
  }
}

function init() {
  particleArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let size = Math.random() * 5 + 1;
    let color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)})`;
    let weight = 1;
    particleArray.push(new Particle(x, y, size, color, weight));
  }
}

function animate() {
  //   ctx.fillStyle = "rgba(0,0,0,0.05)";
  //   ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();
  }
  connections();
  requestAnimationFrame(animate);
}

init();
animate();

function connections() {
  let opacityValue = 1;
  for (let a = 0; a < particleArray.length; a++) {
    for (let b = a; b < particleArray.length; b++) {
      let distance =
        (particleArray[a].x - particleArray[b].x) * (particleArray[a].x - particleArray[b].x) +
        (particleArray[a].y - particleArray[b].y) * (particleArray[a].y - particleArray[b].y);

      if (distance < 2800) {
        opacityValue = 1 - distance / 10000;
        ctx.strokeStyle = `rgba(100,100,100,${opacityValue})`;

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(particleArray[a].x, particleArray[a].y);
        ctx.lineTo(particleArray[b].x, particleArray[b].y);
        ctx.stroke();
      }
    }
  }
}
