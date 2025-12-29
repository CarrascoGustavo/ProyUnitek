/**
 * CarruselProyectos.js
 * Lógica refinada para el carrusel 3D de proyectos
 */

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.projects-carousel');
    const container = document.querySelector('.projects-container');
    const cards = document.querySelectorAll('.project-card');
    const prevBtn = document.querySelector('.carousel-nav-btn.prev');
    const nextBtn = document.querySelector('.carousel-nav-btn.next');

    if (cards.length === 0) return;

    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;

    function updateCarousel() {
        cards.forEach((card, index) => {
            card.classList.remove('active', 'prev', 'next');

            // Lógica circular
            if (index === currentIndex) {
                card.classList.add('active');
            } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
                card.classList.add('prev');
            } else if (index === (currentIndex + 1) % cards.length) {
                card.classList.add('next');
            }
        });
    }

    function slideNext() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    }

    function slidePrev() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    }

    // Navegación por botones
    if (nextBtn) nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        slideNext();
    });
    if (prevBtn) prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        slidePrev();
    });

    // Clic en tarjetas
    cards.forEach((card) => {
        card.addEventListener('click', () => {
            if (card.classList.contains('prev')) {
                slidePrev();
            } else if (card.classList.contains('next')) {
                slideNext();
            } else if (card.classList.contains('active')) {
                // Abrir Lightbox si existe la función global
                if (typeof window.openLightbox === 'function') {
                    window.openLightbox(card);
                }
            }
        });
    });

    // Navegación por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') slidePrev();
        if (e.key === 'ArrowRight') slideNext();
    });

    // Soporte para Touch/Swipe
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) slideNext();
            else slidePrev();
            isDragging = false; // Solo un slide por gesto
        }
    }, { passive: true });

    carousel.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Inicializar
    updateCarousel();
});
