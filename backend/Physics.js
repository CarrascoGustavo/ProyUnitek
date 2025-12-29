// Google Antigravity Effect using Matter.js
// Adapted for UNITEK Hero Section

document.addEventListener('DOMContentLoaded', function () {
    // Only run if Matter.js is loaded and we are on the hero section
    if (typeof Matter === 'undefined' || !document.querySelector('.hero')) return;

    // Trigger button for the effect (optional, or can be auto-triggered)
    // For now, we'll expose a global function to start it, or start on click of a special button
    // The user requested "Google Antigravity style", which usually starts immediately or soon after.
    // Let's make it interactive: "Click to Activate Gravity" or just run it.
    // Given the request, we'll initialize it but wait for a user interaction (like a click on the hero) 
    // or just run it to surprise them. Let's add a "Gravity" button toggle or just run it on 'd' key or similar?
    // Actually, getting the elements to fall *in place* requires swapping them with canvas/bodies.

    // STRATEGY: 
    // 1. We won't remove the DOM elements because that kills SEO and Accessibility.
    // 2. Instead, we'll make the DOM elements absolute positioned and map their positions to the physics bodies engine.
    // 3. This is cleaner than drawing them on canvas (text rendering on canvas is hard to match exactly).

    const Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite,
        Mouse = Matter.Mouse,
        MouseConstraint = Matter.MouseConstraint,
        Events = Matter.Events;

    // Create engine
    const engine = Engine.create();
    const world = engine.world;

    // We need a canvas for the mouse interaction / debug (optional)
    // We will use the DOM elements themselves as the visual representation.

    const heroSection = document.querySelector('.hero');
    const elementsToAnimate = [
        document.querySelector('.hero-title'),
        document.querySelector('.hero-subtitle'),
        document.querySelector('.hero-buttons')
        // Add logo if desired: document.querySelector('.logo img') 
    ];

    let isGravityActive = false;
    let physicsBodies = [];

    // Function to start the effect
    window.startAntigravity = function () {
        if (isGravityActive) return;
        isGravityActive = true;

        const width = window.innerWidth;
        const height = window.innerHeight;

        // Add boundaries (transparent)
        const ground = Bodies.rectangle(width / 2, height + 50, width, 100, { isStatic: true });
        const leftWall = Bodies.rectangle(-50, height / 2, 100, height, { isStatic: true });
        const rightWall = Bodies.rectangle(width + 50, height / 2, 100, height, { isStatic: true });

        Composite.add(world, [ground, leftWall, rightWall]);

        // Process elements
        elementsToAnimate.forEach(el => {
            if (!el) return;

            // Get current geometry
            const rect = el.getBoundingClientRect();

            // Fix their dimensions in CSS so they don't collapse when made absolute
            el.style.width = rect.width + 'px';
            el.style.height = rect.height + 'px';

            // Create physics body match
            const body = Bodies.rectangle(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2,
                rect.width,
                rect.height,
                {
                    restitution: 0.8, // Bouncy
                    friction: 0.1,
                    density: 0.04
                }
            );

            // Save reference to DOM element on the body
            body.domElement = el;
            physicsBodies.push(body);

            // Set DOM to absolute positioning to follow body
            el.style.position = 'fixed'; // Fixed relative to viewport for physics
            el.style.left = '0px';
            el.style.top = '0px';
            el.style.margin = '0';
            el.style.transform = `translate(${rect.left}px, ${rect.top}px)`;
            el.style.zIndex = '1000'; // Bring to front
        });

        Composite.add(world, physicsBodies);

        // Add mouse control
        const mouse = Mouse.create(heroSection);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        });
        Composite.add(world, mouseConstraint);

        // Sync physics with DOM
        // Create runner
        const runner = Runner.create();
        Runner.run(runner, engine);

        // Update loop
        Events.on(engine, 'afterUpdate', function () {
            physicsBodies.forEach(body => {
                if (body.domElement) {
                    const el = body.domElement;
                    const x = body.position.x - el.offsetWidth / 2;
                    const y = body.position.y - el.offsetHeight / 2;
                    const angle = body.angle;

                    el.style.transform = `translate(${x}px, ${y}px) rotate(${angle}rad)`;
                }
            });
        });
    };

    // Optional: Add a hidden trigger or run after a delay
    // For now, let's trigger it when the user clicks anywhere on the hero title, 
    // OR we can make a specific "Gravity" button.
    // Let's Auto-trigger after 3 seconds for the "User wow factor"? 
    // Or simpler: Double click the hero background?

    // Let's add a small visible control for the user to try it, or attach to the hero title click?
    // The query: "hacer el efecto... parecido".

    // Attaching to hero click (background)
    heroSection.addEventListener('dblclick', function (e) {
        // Prevent triggering if clicking buttons
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;
        startAntigravity();
    });

    // Also expose simpler command
    console.log("Antigravity loaded. Double click background to start or call startAntigravity()");
});
