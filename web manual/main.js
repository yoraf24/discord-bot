// =======================
// Smooth Mouse Parallax (Hero Only)
// =======================

const header = document.querySelector(".game-hero");

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;
const speed = 0.05;

document.addEventListener("mousemove", (e) => {
  mouseX = (window.innerWidth / 2 - e.clientX) / 40;
  mouseY = (window.innerHeight / 2 - e.clientY) / 40;
});

function animateParallax() {
  currentX += (mouseX - currentX) * speed;
  currentY += (mouseY - currentY) * speed;

  header.style.transform = `translate(${currentX}px, ${currentY}px)`;

  requestAnimationFrame(animateParallax);
}

animateParallax();


// =======================
// Scroll Reveal Animation
// =======================

function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
