/**
 * Manejo del Lightbox para la galería de proyectos
 */
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    if (!lightbox || !lightboxImg) return;

    // Función global para abrir el lightbox (llamada desde el HTML onclick)
    window.openLightbox = function (element) {
        const imgSrc = element.querySelector('img').src;
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    };

    // Función global para cerrar el lightbox
    window.closeLightbox = function () {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restaurar scroll
    };

    // Cerrar al hacer clic fuera de la imagen
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Cerrar con la tecla Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === "Escape") {
            closeLightbox();
        }
    });
});
