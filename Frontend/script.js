// ===== Scroll Progress Bar =====
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    if (scrollProgress) scrollProgress.style.width = progress + '%';
});

// ===== Sticky Nav on Scroll =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.3)";
        navbar.style.background = "rgba(3, 7, 18, 0.92)";
    } else {
        navbar.style.boxShadow = "none";
        navbar.style.background = "rgba(3, 7, 18, 0.75)";
    }
});

// ===== GSAP Animations =====
document.addEventListener("DOMContentLoaded", () => {

    // Helper: set initial hidden state via JS (so no-JS = always visible)
    function hideForAnimation(selector, props) {
        document.querySelectorAll(selector).forEach(el => {
            if (props.opacity !== undefined) el.style.opacity = props.opacity;
            if (props.y !== undefined) el.style.transform = `translateY(${props.y}px)`;
            if (props.x !== undefined) el.style.transform = `translateX(${props.x}px)`;
        });
    }

    // Universal fallback: make everything visible
    function showAll() {
        const allTargets = '.gsap-reveal, .project-card, .timeline-item';
        document.querySelectorAll(allTargets).forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
    }

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        showAll();
        return;
    }

    try {
        gsap.registerPlugin(ScrollTrigger);

        // ── Hero Entrance (no ScrollTrigger needed, plays on load) ──
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".nav-brand",     { y: -40, opacity: 0, duration: 0.7 })
          .from(".nav-links li",  { y: -40, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.5")
          .from(".greeting",      { x: -40, opacity: 0, duration: 0.6 }, "-=0.4")
          .from(".hero-name",     { x: -50, opacity: 0, duration: 0.8 }, "-=0.4")
          .from(".tagline",       { y: 20,  opacity: 0, duration: 0.6 }, "-=0.4")
          .from(".hero-cta .btn", { scale: 0.85, opacity: 0, duration: 0.5, stagger: 0.15, ease: "back.out(1.7)" }, "-=0.4")
          .from(".profile-ring",  { rotate: -8, scale: 0.85, opacity: 0, duration: 1, ease: "elastic.out(1, 0.6)" }, "-=0.7")
          .from(".floating-badge",{ y: 20, opacity: 0, duration: 0.5, stagger: 0.2 }, "-=0.4");

        // ── gsap-reveal sections (About, Contact) ──
        // CSS already sets these to opacity:0 / translateY(40px), GSAP animates TO visible
        gsap.utils.toArray('.gsap-reveal').forEach(el => {
            gsap.to(el, {
                scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
                y: 0, opacity: 1, duration: 0.75, ease: "power2.out"
            });
        });

        // ── Timeline items — set hidden via JS, then animate TO visible ──
        gsap.utils.toArray('.timeline-item').forEach((item, i) => {
            const isRight = item.classList.contains('right');
            // Set initial state via JS (safe — no-JS keeps them visible)
            item.style.opacity = '0';
            item.style.transform = `translateX(${isRight ? 50 : -50}px)`;

            gsap.to(item, {
                scrollTrigger: { trigger: item, start: "top 88%", toggleActions: "play none none none" },
                x: 0, opacity: 1,
                duration: 0.7,
                ease: "power2.out",
                delay: i * 0.1
            });
        });

        // ── Project cards — set hidden via JS, then animate TO visible ──
        document.querySelectorAll('.project-card').forEach((card, i) => {
            // Set initial state via JS (safe — no-JS keeps them visible)
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px)';

            gsap.to(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    toggleActions: "play none none none"
                },
                y: 0, opacity: 1,
                duration: 0.6,
                delay: i * 0.15,
                ease: "power2.out"
            });
        });

    } catch (err) {
        console.warn('GSAP animation error:', err);
        showAll();
    }
});

// ===== Contact Form Handler =====
async function handleFormSubmit(event) {
    event.preventDefault();

    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('formSuccess');
    const btnText = form.querySelector('.btn-text');
    const btnLoader = form.querySelector('.btn-loader');

    // Get values
    const name = document.getElementById('formName').value.trim();
    const age = document.getElementById('formAge').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const message = document.getElementById('formMessage').value.trim();

    if (!name || !age || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    // Show loading state
    btnText.style.display = 'none';
    if (btnLoader) btnLoader.style.display = 'inline-flex';

    try {
        const backendURL = 'https://raisha-first.onrender.com/api/portfolio';

        const response = await fetch(backendURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, age, email, message }),
        });

        if (response.ok) {
            form.style.display = 'none';
            successMsg.style.display = 'flex';
            successMsg.style.flexDirection = 'column';
            successMsg.style.alignItems = 'center';
            console.log('Form submitted successfully');
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again later.');

        // Reset button state
        btnText.style.display = 'inline-block';
        if (btnLoader) btnLoader.style.display = 'none';
    }
}