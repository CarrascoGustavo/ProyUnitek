// Header scroll effect and logo change
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    const logo = document.querySelector('.logo img');
    // Only swap logo if we are on the home page (which has a .hero section)
    const isHomePage = document.querySelector('.hero');

    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
        // Change to the second logo when scrolling (ONLY on home page)
        if (logo && isHomePage) {
            logo.src = '../Imagenes/LogoUnitek.png';
        }
    } else {
        header.classList.remove('header-scrolled');
        // Change back to the first logo when at the top (ONLY on home page)
        if (logo && isHomePage) {
            logo.src = '../Imagenes/LogoUnitek1.png';
        }
    }
});

// Mobile menu toggle
// Global function for inline onclick
window.toggleMobileMenu = function () {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    if (mobileMenuBtn && navMenu) {
        console.log('Menu toggled');
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn && navMenu) {
        // Event listener removed in favor of inline onclick to ensure interaction

        // Close mobile menu when clicking on a link

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }

    // Interactive mouse movement effect on hero section with cursor follower
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroOverlay = document.querySelector('.hero-overlay');

    if (hero && heroContent) {
        // Create cursor follower element
        const cursorFollower = document.createElement('div');
        cursorFollower.className = 'cursor-follower';
        hero.appendChild(cursorFollower);

        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;

        document.addEventListener('mousemove', function (e) {
            mouseX = (e.clientX / window.innerWidth) - 0.5;
            mouseY = (e.clientY / window.innerHeight) - 0.5;
        });

        function animate() {
            // Smooth interpolation for fluid movement
            currentX += (mouseX - currentX) * 0.1;
            currentY += (mouseY - currentY) * 0.1;

            // Apply parallax effect to content (stronger movement)
            const moveX = currentX * 30;
            const moveY = currentY * 30;
            heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;

            // Apply dynamic gradient to overlay based on mouse position
            if (heroOverlay) {
                const gradientX = (currentX + 0.5) * 100;
                const gradientY = (currentY + 0.5) * 100;
                heroOverlay.style.background = `
                radial-gradient(circle at ${gradientX}% ${gradientY}%, 
                    rgba(0, 184, 212, 0.6) 0%, 
                    rgba(0, 102, 204, 0.85) 50%, 
                    rgba(0, 82, 163, 0.9) 100%)
            `;
            }

            requestAnimationFrame(animate);
        }

        animate();
    }
});

// Smooth scroll for anchor links
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
