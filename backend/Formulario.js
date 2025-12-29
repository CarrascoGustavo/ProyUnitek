document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Deshabilitar botón durante el envío
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

            const formData = new FormData(contactForm);
            const action = contactForm.getAttribute('action');

            fetch(action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        // Success: Show message and reset immediately
                        successMessage.style.display = 'flex';
                        errorMessage.style.display = 'none';
                        contactForm.reset();

                        // Scroll to message for visibility
                        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    } else {
                        return response.json().then(data => {
                            const errorMsg = data?.errors?.map(e => e.message).join(', ') || 'Hubo un problema al enviar el mensaje.';
                            throw new Error(errorMsg);
                        });
                    }
                })
                .catch(error => {
                    console.error('Error detail:', error);
                    const span = errorMessage.querySelector('span');
                    if (span) {
                        span.textContent = error.message;
                    } else {
                        errorMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i> <span>${error.message}</span>`;
                    }

                    errorMessage.style.display = 'flex';
                    successMessage.style.display = 'none';
                    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;

                    // Ocultar mensajes después de un tiempo razonable
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                        errorMessage.style.display = 'none';
                    }, 10000); // 10 seconds for readability
                });
        });
    }
});