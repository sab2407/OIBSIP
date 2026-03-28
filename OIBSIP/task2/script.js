// Typing effect for hero title
const typeWriter = (element, text, speed = 100) => {
  let i = 0;
  element.innerHTML = '';
  const timer = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
};

// Scroll reveal animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

// Back to top button
const createBackToTopButton = () => {
  const button = document.createElement('button');
  button.innerHTML = '↑';
  button.className = 'back-to-top';
  button.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #2196f3;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 1000;
  `;
  button.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  document.body.appendChild(button);

  window.addEventListener('scroll', () => {
    button.style.opacity = window.scrollY > 300 ? '1' : '0';
  });
};

// Smooth scrolling for nav links
const smoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
};

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  // Typing effect
  const heroTitle = document.querySelector('#hero h1');
  if (heroTitle) {
    typeWriter(heroTitle, 'Sabareesh Sivakumar');
  }

  // Observe sections for scroll animations
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  // Create back to top button
  createBackToTopButton();

  // Smooth scrolling
  smoothScroll();
});

// Open project modal
function openProject(title, desc, tech, link) {
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalDesc").innerText = desc;
  document.getElementById("modalTech").innerText = tech;
  document.getElementById("modalLink").href = link;
  document.getElementById("projectModal").style.display = "flex";
}

// Close project modal
function closeProject() {
  document.getElementById("projectModal").style.display = "none";
}