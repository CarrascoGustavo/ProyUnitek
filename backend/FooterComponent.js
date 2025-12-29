document.addEventListener('DOMContentLoaded', () => {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;

    const footerHTML = `
    <footer>
        <div class="row">
            <div class="col">
                <img src="../Imagenes/LogoUnitek1.png" alt="Logo Unitek" class="footer-logo">
                <p>Unitek es una empresa líder en la industria de la tecnología, especializada en la innovación y el
                    desarrollo de soluciones tecnológicas para empresas y organizaciones.</p>
            </div>
            <div class="col">
                <h3>Oficina</h3>
                <p>Av. Monteverde #4, Ate Vitarte </p>
                <p>Lima, Perú</p>
                <p class="email-id">ventas@progamer.pe</p>
                <h4>+51 927 032 227</h4>
                <h4>+51 950 144 190</h4>
                <br>
                <p>Lunes a sábado de 10:00 a 20:00</p>
            </div>
            <div class="col">
                <h3>Links</h3>
                <ul>
                    <li><a href="index.html#inicio">Inicio</a></li>
                    <li><a href="NuestraEmpresa.html">Nuestra empresa</a></li>
                    <li><a href="index.html#servicios">Servicios</a></li>
                    <li><a href="index.html#trabajos">Trabajos</a></li>
                    <li><a href="index.html#cotizar">Cotizar</a></li>
                </ul>
            </div>
            <div class="col">
                <h3>Newsletter</h3>
                <form>
                    <i class="far fa-envelope"></i>
                    <input type="email" placeholder="Ingresa tu correo" required>
                    <button type="submit" aria-label="Suscribirse"><i class="fas fa-arrow-right"></i></button>
                </form>
                <div class="social-icons">
                    <a href="https://www.facebook.com/profile.php?id=61585153525863" target="_blank"
                        rel="noopener noreferrer" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://www.instagram.com/unitek_peru" target="_blank" rel="noopener noreferrer"
                        aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                    <a href="https://www.linkedin.com/company/unitek-progamer-linea-corporativa/?viewAsMember=true"
                        target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i
                            class="fab fa-linkedin-in"></i></a>
                    <a href="https://wa.me/51950144190?text=Estoy%20interesado%20en%20sus%20servicios,%20quisiera%20m%C3%A1s%20informaci%C3%B3n!!." target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i
                            class="fab fa-whatsapp"></i></a>
                    <a href="https://www.tiktok.com/@unitek_peru" target="_blank" rel="noopener noreferrer"
                        aria-label="TikTok"><i class="fab fa-tiktok"></i></a>
                </div>
            </div>
        </div>
        <hr>
        <p class="copyright">Unitek © 2025 - Todos los derechos reservados</p>
    </footer>
    `;

    footerContainer.innerHTML = footerHTML;
});
