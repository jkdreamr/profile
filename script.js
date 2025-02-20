document.addEventListener('DOMContentLoaded', () => {
    let lastScrollPosition = window.pageYOffset;
    const header = document.querySelector('header');
    
    // Mouse trail effect
    class MouseTrail {
        constructor() {
            this.points = [];
            this.target = { x: 0, y: 0 };
            this.createTrail();
            this.attachEvents();
        }

        createTrail() {
            const trail = document.createElement('div');
            trail.className = 'mouse-trail';
            document.body.appendChild(trail);
            
            for (let i = 0; i < 20; i++) {
                const point = document.createElement('div');
                point.className = 'trail-point';
                trail.appendChild( point);
                this.points.push({
                    x: 0, y: 0,
                    element: point
                });
            }
        }

        attachEvents() {
            document.addEventListener('mousemove', (e) => {
                this.target.x = e.clientX;
                this.target.y = e.clientY;
            });

            this.animate();
        }

        animate() {
            let x = this.target.x;
            let y = this.target.y;

            this.points.forEach((point, index) => {
                const dx = x - point.x;
                const dy = y - point.y;
                
                point.x += dx * 0.1;
                point.y += dy * 0.1;
                
                point.element.style.transform = `translate(${point.x}px, ${point.y}px)`;
                
                x = point.x;
                y = point.y;
            });

            requestAnimationFrame(() => this.animate());
        }
    }

    new MouseTrail();

    // Enhanced smooth scroll with custom easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                smoothScrollTo(targetPosition, 1000);
            }
        });
    });

    function smoothScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            // Custom easing function (easeInOutExpo)
            const easing = progress === 1 ? 1 : 
                progress < 0.5 ? Math.pow(2, 20 * progress - 10) / 2 :
                (2 - Math.pow(2, -20 * progress + 10)) / 2;

            window.scrollTo(0, startPosition + (distance * easing));

            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    // Magnetic effect for experience items
    document.querySelectorAll('.experience-item').forEach(item => {
        const strength = 50;
        const magnetic = item.querySelector('.company-logo');

        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = x - centerX;
            const deltaY = y - centerY;
            
            const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
            const normalized = Math.min(distance / centerX, 1);
            
            const magneticX = deltaX * strength / distance;
            const magneticY = deltaY * strength / distance;
            
            magnetic.style.transform = `translate(${magneticX}px, ${magneticY}px)`;
            
            // Card tilt effect
            const rotateX = (deltaY / centerY) * 10;
            const rotateY = (deltaX / centerX) * 10;
            
            item.style.transform = `
                perspective(1000px)
                rotateX(${-rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.02)
            `;
        });

        item.addEventListener('mouseleave', () => {
            magnetic.style.transform = '';
            item.style.transform = '';
        });
    });

    // Progressive loading animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '-50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                const items = entry.target.querySelectorAll('.experience-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('slide-up');
                        item.style.transitionDelay = `${index * 150}ms`;
                    }, index * 150);
                });
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });

    // Handle navigation to writings page
    document.querySelector('a[href="#writings"]').addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'writings.html';
    });

    // Particle background effect
    class ParticleBackground {
        constructor() {
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.particles = [];
            this.initCanvas();
            this.createParticles();
            this.animate();
        }

        initCanvas() {
            this.canvas.style.position = 'fixed';
            this.canvas.style.top = '0';
            this.canvas.style.left = '0';
            this.canvas.style.width = '100%';
            this.canvas.style.height = '100%';
            this.canvas.style.pointerEvents = 'none';
            this.canvas.style.zIndex = '-1';
            document.body.prepend(this.canvas);
            this.resize();
            window.addEventListener('resize', () => this.resize());
        }

        resize() {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        }

        createParticles() {
            for (let i = 0; i < 50; i++) {
                this.particles.push({
                    x: Math.random() * this.width,
                    y: Math.random() * this.height,
                    size: Math.random() * 2 + 1,
                    speedX: Math.random() * 2 - 1,
                    speedY: Math.random() * 2 - 1
                });
            }
        }

        animate() {
            this.ctx.clearRect(0, 0, this.width, this.height);
            
            this.particles.forEach(particle => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                if (particle.x < 0 || particle.x > this.width) particle.speedX *= -1;
                if (particle.y < 0 || particle.y > this.height) particle.speedY *= -1;
                
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
                this.ctx.fill();
            });

            requestAnimationFrame(() => this.animate());
        }
    }

    new ParticleBackground();
});
