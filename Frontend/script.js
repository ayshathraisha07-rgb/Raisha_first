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
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Entrance Animation
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".nav-brand",   { y: -40, opacity: 0, duration: 0.7 })
          .from(".nav-links li",{ y: -40, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.5")
          .from(".greeting",    { x: -40, opacity: 0, duration: 0.6 }, "-=0.4")
          .from(".hero-name",   { x: -50, opacity: 0, duration: 0.8 }, "-=0.4")
          .from(".tagline",     { y: 20,  opacity: 0, duration: 0.6 }, "-=0.4")
          .from(".hero-cta .btn",{ scale: 0.85, opacity: 0, duration: 0.5, stagger: 0.15, ease: "back.out(1.7)" }, "-=0.4")
          .from(".profile-ring",{ rotate: -8, scale: 0.85, opacity: 0, duration: 1, ease: "elastic.out(1, 0.6)" }, "-=0.7")
          .from(".floating-badge",{ y: 20, opacity: 0, duration: 0.5, stagger: 0.2 }, "-=0.4");

        // Scroll-triggered animations for all gsap-reveal elements
        gsap.utils.toArray('.gsap-reveal').forEach(el => {
            gsap.to(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 88%",
                    toggleActions: "play none none none"
                },
                y: 0,
                opacity: 1,
                duration: 0.75,
                ease: "power2.out"
            });
        });

        // Stagger timeline items
        gsap.utils.toArray('.timeline-item').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 88%",
                    toggleActions: "play none none none"
                },
                x: item.classList.contains('right') ? 50 : -50,
                opacity: 0,
                duration: 0.7,
                ease: "power2.out",
                delay: i * 0.1
            });
        });

        // Project cards stagger
        gsap.from('.project-card', {
            scrollTrigger: {
                trigger: '.projects-grid',
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 40,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out"
        });

    }
});

// ===== Contact Form Handler =====
function handleFormSubmit(event) {
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
    btnLoader.style.display = 'inline-flex';

    // Simulate sending (replace with real API call if needed)
    setTimeout(() => {
        form.style.display = 'none';
        successMsg.style.display = 'flex';
        successMsg.style.flexDirection = 'column';
        successMsg.style.alignItems = 'center';

        // Log data to console (for testing)
        console.log('Form submitted:', { name, age, email, message });
    }, 1500);
}
