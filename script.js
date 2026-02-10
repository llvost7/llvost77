const canvas = document.getElementById("petals");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let petals = [];

class Petal {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = 20 + Math.random() * 20; // BIG petals
    this.speedY = 1 + Math.random() * 2;
    this.speedX = Math.random() * 1.5;
    this.angle = Math.random() * Math.PI;
    this.spin = Math.random() * 0.02;
    this.color = rgba(255, ${150 + Math.random()*50}, ${180 + Math.random()*40}, 0.8);
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(this.size, -this.size, 0, -this.size*2);
    ctx.quadraticCurveTo(-this.size, -this.size, 0, 0);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.y += this.speedY;
    this.x += Math.sin(this.y * 0.01) * 1.5; // wind cuts
    this.angle += this.spin;

    if (this.y > canvas.height) {
      this.y = -50;
      this.x = Math.random() * canvas.width;
    }
  }
}

function initPetals() {
  petals = [];
  for (let i = 0; i < 40; i++) {
    petals.push(new Petal());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  petals.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

initPetals();
animate();

/* Music play (mobile safe) */
document.getElementById("playBtn").onclick = () => {
  document.getElementById("bgm").play();
};