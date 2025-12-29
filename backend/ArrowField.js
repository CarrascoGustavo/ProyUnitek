// Interactive Magnetic Flow Field Effect
// "Vortex / Wave" Style: Particles swirl around the mouse continuously

document.addEventListener('DOMContentLoaded', function () {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Check/Create Canvas
    let canvas = document.querySelector('.arrow-field-canvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.className = 'arrow-field-canvas';
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '3';
        canvas.style.pointerEvents = 'none';
        hero.insertBefore(canvas, hero.firstChild);
    }

    const ctx = canvas.getContext('2d');
    let width, height;

    // Config
    const particleCount = 200;
    const particles = [];

    // Mouse state (default to center)
    let mouse = { x: null, y: null };

    function resize() {
        width = canvas.width = hero.offsetWidth;
        height = canvas.height = hero.offsetHeight;
        // Default mouse to center if not interacting yet
        if (mouse.x === null) {
            mouse.x = width / 2;
            mouse.y = height / 2;
        }
        initParticles();
    }
    window.addEventListener('resize', resize);

    hero.addEventListener('mousemove', function (e) {
        const rect = hero.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    // Don't clear mouse on leave, let it spin at last position
    // hero.addEventListener('mouseleave', ...); 

    class Particle {
        constructor() {
            this.reset();
            // Start at random positions
            this.x = Math.random() * width;
            this.y = Math.random() * height;
        }

        reset() {
            // Random distance from center
            this.angle = Math.random() * Math.PI * 2;
            this.radius = Math.random() * (width > height ? width : height);
            this.speed = Math.random() * 0.02 + 0.005; // Orbital speed
            this.wobble = Math.random() * Math.PI * 2; // For wave effect
            this.wobbleSpeed = Math.random() * 0.05 + 0.02;

            this.size = Math.random() * 4 + 2;
            const colors = [
                'rgba(0, 184, 212, 0.9)', // Cyan
                'rgba(0, 102, 204, 0.9)', // Blue
                'rgba(255, 255, 255, 0.7)' // White
            ];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            // "Move like waves in a circle"
            // We rotate around the mouse position

            // 1. Update Angle (Circle motion)
            this.angle += this.speed;

            // 2. Update Radius (Wave effect - expanding/contracting slightly)
            this.wobble += this.wobbleSpeed;
            const currentRadius = this.radius + Math.sin(this.wobble) * 20;

            // 3. Calculate Target Position relative to Mouse
            const targetX = mouse.x + Math.cos(this.angle) * currentRadius;
            const targetY = mouse.y + Math.sin(this.angle) * currentRadius;

            // 4. Ease towards target (Smooth flow)
            this.x += (targetX - this.x) * 0.05;
            this.y += (targetY - this.y) * 0.05;

            // 5. Rotation of the particle itself
            // It should face the direction of movement (tangent)
            // or face the center? Let's face the center for "compass" look
            // or face tangent for "flow" look. Flow is better.
            const flowAngle = this.angle + Math.PI / 2;
            this.rotation = flowAngle;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);

            ctx.beginPath();
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';

            // Draw tick/line
            ctx.moveTo(-this.size, 0);
            ctx.lineTo(this.size, 0);

            ctx.stroke();
            ctx.restore();
        }
    }

    function initParticles() {
        particles.length = 0;
        const count = width < 768 ? 80 : particleCount;
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    // Initial setup
    resize();

    function animate() {
        // Trail effect? 
        ctx.clearRect(0, 0, width, height); // Clean wipe
        // Optional: ctx.fillStyle = 'rgba(0,0,0,0.1)'; ctx.fillRect... for trails

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
});
