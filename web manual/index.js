// =======================
// Typing Effect
// =======================

const text = "WELCOME TO AETHERION";
let i = 0;

function typeWriter() {
  if (i < text.length) {
    document.querySelector(".typing").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 60);
  }
}
typeWriter();

// =======================
// Redirect Button
// =======================

document.getElementById("enterBtn").addEventListener("click", function() {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.6s ease";

  setTimeout(() => {
    window.location.href = "main.html";
  }, 600);
});

// =======================
// Particle Background
// =======================

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 70; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2,
    dx: (Math.random() - 0.5),
    dy: (Math.random() - 0.5)
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#00eaff";
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// =======================
// Smooth Mouse Parallax
// =======================

const header = document.querySelector("header");

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;
const speed = 0.05;

document.addEventListener("mousemove", (e) => {
  mouseX = (window.innerWidth / 2 - e.clientX) / 25;
  mouseY = (window.innerHeight / 2 - e.clientY) / 25;
});

function animateParallax() {
  currentX += (mouseX - currentX) * speed;
  currentY += (mouseY - currentY) * speed;

  header.style.transform = `translate(${currentX}px, ${currentY}px)`;

  requestAnimationFrame(animateParallax);
}

animateParallax();

