document.addEventListener('DOMContentLoaded', () => {
    // Create and append intro overlay
    const overlay = document.createElement('div');
    overlay.className = 'intro-overlay';
    const introText = document.createElement('div');
    introText.className = 'intro-text';
    introText.textContent = 'Welcome';
    overlay.appendChild(introText);
    document.body.appendChild(overlay);

    // Remove overlay after animation
    setTimeout(() => {
        overlay.remove();
    }, 2500);

    // Smooth scroll with dramatic pause
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Add dramatic pause before scroll
                setTimeout(() => {
                    window.scrollTo({
                        top: target.offsetTop,
                        behavior: 'smooth'
                    });
                }, 300);
            }
        });
    });

    // Enhanced Intersection Observer for dramatic reveals
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger animations
                entry.target.classList.add('visible');
                
                // Stagger child elements
                const children = entry.target.querySelectorAll('.experience-item, .writing-item, .social-links a');
                children.forEach((child, index) => {
                    child.style.transitionDelay = `${0.2 + (index * 0.1)}s`;
                });
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '-50px 0px'
    });

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Parallax effect on scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const sections = document.querySelectorAll('section');
                sections.forEach(section => {
                    const rect = section.getBoundingClientRect();
                    const scrollPercent = rect.top / window.innerHeight;
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        section.style.transform = `perspective(1000px) 
                            translateY(${scrollPercent * 50}px) 
                            rotateX(${scrollPercent * 5}deg)`;
                    }
                });
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial visibility check with delay for entrance animation
    setTimeout(() => {
        const initialSection = document.querySelector('section');
        if (initialSection) {
            initialSection.classList.add('visible');
        }
    }, 2000);
});
