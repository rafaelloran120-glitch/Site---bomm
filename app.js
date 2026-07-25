// canvas background + scroll animations

(function () {
    'use strict';

    // === CANVAS: Stars + Hearts + Clouds ===
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let W, H;
    const particles = [];

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Particle types: star, heart, cloud
    function createParticle(type) {
        const base = {
            x: Math.random() * W,
            y: -20,
            type: type,
            size: type === 'cloud' ? 40 + Math.random() * 60 : 2 + Math.random() * 4,
            speedY: type === 'cloud' ? 0.15 + Math.random() * 0.2 : 0.3 + Math.random() * 0.7,
            speedX: (Math.random() - 0.5) * 0.5,
            opacity: type === 'cloud' ? 0.08 + Math.random() * 0.06 : 0.3 + Math.random() * 0.7,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.02,
            pulse: Math.random() * Math.PI * 2,
        };
        if (type === 'heart') {
            base.size = 6 + Math.random() * 8;
            base.color = ['#f8a4c8', '#d4c5f9', '#ff9a9e', '#fad0c4'][Math.floor(Math.random() * 4)];
        } else if (type === 'star') {
            base.color = ['#fff', '#f8a4c8', '#a8d8ea', '#d4c5f9'][Math.floor(Math.random() * 4)];
        } else {
            base.color = '#fff';
        }
        return base;
    }

    function drawHeart(x, y, size, color, opacity) {
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x, y + size * 0.3);
        ctx.bezierCurveTo(x, y, x - size, y, x - size, y + size * 0.3);
        ctx.bezierCurveTo(x - size, y + size * 0.6, x, y + size, x, y + size * 1.2);
        ctx.bezierCurveTo(x, y + size, x + size, y + size * 0.6, x + size, y + size * 0.3);
        ctx.bezierCurveTo(x + size, y, x, y, x, y + size * 0.3);
        ctx.fill();
        ctx.restore();
    }

    function drawStar(x, y, size, color, opacity, rotation) {
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = color;
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
            const r = i === 0 ? size : size;
            ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size);
            const innerAngle = angle + (2 * Math.PI) / 10;
            ctx.lineTo(Math.cos(innerAngle) * size * 0.4, Math.sin(innerAngle) * size * 0.4);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    function drawCloud(x, y, size, opacity) {
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
        ctx.arc(x + size * 0.4, y - size * 0.1, size * 0.35, 0, Math.PI * 2);
        ctx.arc(x - size * 0.35, y + size * 0.05, size * 0.3, 0, Math.PI * 2);
        ctx.arc(x + size * 0.15, y + size * 0.15, size * 0.25, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    // Spawn initial particles
    for (let i = 0; i < 30; i++) {
        const p = createParticle(['star', 'heart', 'cloud'][Math.floor(Math.random() * 3)]);
        p.y = Math.random() * H;
        particles.push(p);
    }

    function animateCanvas() {
        ctx.clearRect(0, 0, W, H);

        // Spawn new particles occasionally
        if (Math.random() < 0.03) {
            particles.push(createParticle('star'));
        }
        if (Math.random() < 0.015) {
            particles.push(createParticle('heart'));
        }
        if (Math.random() < 0.005) {
            particles.push(createParticle('cloud'));
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += p.rotSpeed;
            p.pulse += 0.02;

            const pulsedOpacity = p.type !== 'cloud'
                ? p.opacity * (0.7 + 0.3 * Math.sin(p.pulse))
                : p.opacity;

            if (p.type === 'star') {
                drawStar(p.x, p.y, p.size, p.color, pulsedOpacity, p.rotation);
            } else if (p.type === 'heart') {
                drawHeart(p.x, p.y, p.size, p.color, pulsedOpacity);
            } else {
                drawCloud(p.x, p.y, p.size, pulsedOpacity);
            }

            // Remove off-screen
            if (p.y > H + 50 || p.x < -50 || p.x > W + 50) {
                particles.splice(i, 1);
            }
        }

        requestAnimationFrame(animateCanvas);
    }
    animateCanvas();

    // === SCROLL ANIMATIONS ===
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.2 }
    );

    document.querySelectorAll('.card, .final-title, .final-quote, .final-sub').forEach((el) => {
        observer.observe(el);
    });

    // === HEARTS RAIN in final section ===
    const heartsContainer = document.getElementById('hearts-rain');
    if (heartsContainer) {
        setInterval(() => {
            const heart = document.createElement('span');
            heart.textContent = '💜';
            heart.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: -20px;
                font-size: ${12 + Math.random() * 16}px;
                animation: heartFall ${3 + Math.random() * 4}s linear forwards;
                pointer-events: none;
            `;
            heartsContainer.appendChild(heart);
            setTimeout(() => heart.remove(), 7000);
        }, 400);
    }

    // Inject heart fall animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes heartFall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

})();
