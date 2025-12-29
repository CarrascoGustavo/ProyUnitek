/* Unikcito.js - Formal AI Assistant (Direct Browser Integration) */

const UNIKCITO_CONFIG = {
    apiKey: "AIzaSyB3LBBrgEP-_CvxMfk3pUyOHAnMqfEftKI",
    model: "gemini-1.5-flash",
    systemPrompt: `Eres "Unikcito", el Asistente Virtual Ejecutivo y Representante Digital de UNITEK.
UNITEK es una prestigiosa compañía peruana líder en infraestructura tecnológica de misión crítica.

TU PERSONALIDAD:
- Eres extremadamente formal, servicial y ejecutivo. Utilizas un lenguaje impecable y profesional.
- Eres capaz de entender cualquier tipo de lenguaje (jerga, regionalismos o palabras coloquiales), pero TÚ siempre respondes con elegancia, profesionalismo y formalidad, redirigiendo al usuario hacia las soluciones tecnológicas de la empresa.
- Tu trato es cordial pero respetuoso (Tratas de "Usted" al usuario).

CONOCIMIENTO ESTRATÉGICO DE UNITEK:
1. Infraestructura TI: Diseño de Data Centers y cableado certificado redundante para máxima disponibilidad.
2. Redes y Conectividad: Soluciones WiFi 6, SD-WAN y VPNs corporativas de baja latencia.
3. Seguridad Electrónica: CCTV con analítica de IA y control de acceso biométrico avanzado.
4. Sistemas y Software: Especialistas en Nube (Microsoft/Google) y arquitecturas de virtualización.
5. Puntos de Venta (POS): Hardware y software para agilizar transacciones en retail e industria.
6. Soluciones Digitales: Experiencias visuales de alto impacto (Videowalls, IoT).
7. Soporte Técnico: Mantenimiento preventivo y correctivo 24/7 con soporte en sitio.
8. Equipamiento Tecnológico: Suministro de hardware premium para entornos corporativos y aeronáuticos.
9. Desarrollo Web Premium: Creación de plataformas con arquitectura moderna, UI/UX de alta gama y SEO avanzado.

REGLAS DE INTERACCIÓN:
- Responde siempre basado en el sistema de UNITEK. Si la pregunta es ajena, ofrece ayuda tecnológica relacionada.
- Eres dinámico: Resuelves dudas complejas de forma estructurada.
- Al final de interacciones importantes, invita amablemente a una consultoría personalizada vía WhatsApp (950144190).
- Misión UNITEK: Revolucionar industrias mediante tecnología y talento humano de excelencia.`
};

class UnikcitoAssistant {
    constructor() {
        this.isOpen = false;
        this.history = []; // History will be updated only on successful exchanges
        this.initUI();
        this.addEvents();
    }

    initUI() {
        // Launcher
        const launcher = document.createElement('div');
        launcher.className = 'unikcito-launcher';
        launcher.id = 'uLauncher';
        launcher.innerHTML = `<img src="../Imagenes/ChatBotUnitek.svg" alt="Unikcito">`;
        document.body.appendChild(launcher);

        // Window
        const window = document.createElement('div');
        window.className = 'unikcito-window';
        window.id = 'uWindow';
        window.innerHTML = `
            <div class="unikcito-header">
                <div class="bot-brand">
                    <img src="../Imagenes/ChatBotUnitek.svg" alt="Unitek Logo">
                    <h3>Unikcito | UNITEK AI</h3>
                </div>
                <div class="close-icon" id="uClose"><i class="fas fa-times"></i></div>
            </div>
            <div class="unikcito-messages" id="uMessages">
                <div class="u-message bot">Estimado usuario, sea bienvenido a UNITEK. Desempeño el cargo de asistente ejecutivo digital; mi propósito es asistirle con absoluta precisión en sus requerimientos tecnológicos. ¿En qué área de nuestra especialidad puedo apoyarle hoy?</div>
            </div>
            <div class="u-typing" id="uTyping">Unikcito está procesando su solicitud...</div>
            <div class="unikcito-input-section">
                <input type="text" id="uInput" placeholder="Escriba su consulta ejecutiva..." autocomplete="off">
                <button id="uSend">ENVIAR</button>
            </div>
        `;
        document.body.appendChild(window);

        this.launcher = launcher;
        this.window = window;
        this.msgContainer = document.getElementById('uMessages');
        this.input = document.getElementById('uInput');
        this.sendBtn = document.getElementById('uSend');
        this.typing = document.getElementById('uTyping');
    }

    addEvents() {
        this.launcher.addEventListener('click', () => this.toggle());
        document.getElementById('uClose').addEventListener('click', () => this.toggle());
        this.sendBtn.addEventListener('click', () => this.send());
        this.input.addEventListener('keypress', (e) => { if (e.key === 'Enter') this.send(); });
    }

    toggle() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.window.style.display = 'flex';
            setTimeout(() => {
                this.window.classList.add('active');
                this.input.focus();
            }, 10);
        } else {
            this.window.classList.remove('active');
            setTimeout(() => this.window.style.display = 'none', 400);
        }
    }

    async send() {
        const text = this.input.value.trim();
        if (!text) return;

        this.append('user', text);
        this.input.value = '';
        this.showTyping(true);

        try {
            const botResponse = await this.getGeminiResponse(text);
            this.showTyping(false);
            this.append('bot', botResponse);
        } catch (e) {
            console.error("Unikcito Technical Detail:", e);
            this.showTyping(false);
            this.append('bot', "Lamento informarle que presento una dificultad temporal de enlace con mi núcleo de procesamiento. Por favor, asegúrese de que su conexión sea estable e inténtelo una vez más.");
        }
    }

    append(role, text) {
        const div = document.createElement('div');
        div.className = `u-message ${role}`;
        div.textContent = text;
        this.msgContainer.appendChild(div);
        this.msgContainer.scrollTop = this.msgContainer.scrollHeight;
    }

    showTyping(show) {
        this.typing.style.display = show ? 'block' : 'none';
        this.msgContainer.scrollTop = this.msgContainer.scrollHeight;
    }

    async getGeminiResponse(userMessage) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${UNIKCITO_CONFIG.model}:generateContent?key=${UNIKCITO_CONFIG.apiKey}`;

        // Create a temporary history for the request to ensure roles always alternate
        const currentContents = [...this.history, { role: "user", parts: [{ text: userMessage }] }];

        const payload = {
            system_instruction: { parts: [{ text: UNIKCITO_CONFIG.systemPrompt }] },
            contents: currentContents,
            generationConfig: { maxOutputTokens: 1000, temperature: 0.7 }
        };

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(errorBody.error?.message || "Error de red API");
        }

        const data = await response.json();

        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            const botText = data.candidates[0].content.parts[0].text;
            // Committing both user and model parts to permanent history only after successful call
            this.history.push({ role: "user", parts: [{ text: userMessage }] });
            this.history.push({ role: "model", parts: [{ text: botText }] });
            return botText;
        } else {
            throw new Error("Respuesta de IA vacía");
        }
    }
}

// Global initialization to avoid multiple instances
document.addEventListener('DOMContentLoaded', () => {
    if (!window.unikcitoInstance) {
        window.unikcitoInstance = new UnikcitoAssistant();
    }
});
