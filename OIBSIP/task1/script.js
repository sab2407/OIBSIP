// 1. CUSTOM CURSOR GLOW
const cursorGlow = document.getElementById('cursor-glow');
window.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// 2. NAVBAR BACKGROUND ON SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 3. COUNTER ANIMATION
const counters = document.querySelectorAll('.counter');
let countersStarted = false;

const runCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const current = +counter.innerText;
        const increment = target / 100;

        if (current < target) {
            counter.innerText = Math.ceil(current + increment);
            setTimeout(runCounters, 20);
        } else {
            counter.innerText = target + '+';
        }
    });
};

// 4. COUNTDOWN TIMER
const countdown = () => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 3);
    const now = new Date().getTime();
    const diff = endDate - now;

    if (diff < 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days < 10 ? '0' + days : days;
    document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById('mins').innerText = mins < 10 ? '0' + mins : mins;
    document.getElementById('secs').innerText = secs < 10 ? '0' + secs : secs;
};
setInterval(countdown, 1000);
countdown();

// 5. SCROLL REVEAL
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            if (entry.target.classList.contains('stats-strip') && !countersStarted) {
                countersStarted = true;
                runCounters();
            }
        }
    });
}, observerOptions);

const sectionsToReveal = document.querySelectorAll('.section, .stats-strip, .cat-card, .product-card, .contact-form-wrapper');
sectionsToReveal.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    fadeInObserver.observe(section);
});

// 6. CONTACT FORM INTERACTION
const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simple interactive feedback
    const btn = form.querySelector('button');
    const originalText = btn.innerText;
    
    btn.innerText = "Sending...";
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerText = "Message Sent!";
        btn.style.background = "#27ae60"; // Green success color
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = "";
            btn.disabled = false;
            form.reset();
        }, 2000);
    }, 1000);
});

// 7. SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});