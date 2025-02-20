document.addEventListener('DOMContentLoaded', () => {
    let lastScrollPosition = window.pageYOffset;
    const header = document.querySelector('header');
    
    // Enhanced smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced scroll handling for header
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScrollPosition && currentScroll > 100) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        lastScrollPosition = currentScroll;
    });

    // Enhanced intersection observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '-50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add slide-up effect to experience items
                const items = entry.target.querySelectorAll('.experience-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('slide-up');
                    }, index * 200);
                });
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });

    // Initial visibility check
    const checkInitialVisibility = () => {
        document.querySelectorAll('section').forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                section.classList.add('visible');
            }
        });
    };

    checkInitialVisibility();
});
