// ===================================================
// 3D SOLAR SYSTEM & PLANETARY CAROUSEL CONTROLLER
// ===================================================

document.addEventListener('DOMContentLoaded', () => {
    const stage = document.getElementById('solarStage');
    const planets = document.querySelectorAll('.planet-item');
    if (!stage || planets.length === 0) return;

    let currentAngle = 0;
    let targetAngle = 0;
    let orbitSpeed = 0.25; // Continuous degrees per frame
    let isPaused = false;
    let isDragging = false;
    let startX = 0;
    let lastX = 0;
    let velocity = 0;

    // Number of planets
    const totalPlanets = planets.length;
    const angleStep = 360 / totalPlanets;

    // Radius of orbit in pixels (responsive for tall, screen-filling boxes)
    function getRadius() {
        if (window.innerWidth < 640) return 240; // Mobile
        if (window.innerWidth < 1024) return 380; // Tablet
        return 520; // Desktop
    }

    // Tilt of the orbital plane
    const tiltX = 65; // degrees

    function updatePlanetsPosition() {
        const radius = getRadius();

        planets.forEach((planet, index) => {
            // Angle in radians
            const baseAngle = (index * angleStep) + currentAngle;
            const rad = (baseAngle * Math.PI) / 180;

            // Coordinates on 3D ellipse
            const x = Math.sin(rad) * radius;
            const z = Math.cos(rad) * (radius * 0.45); // foreshortening on Z
            const y = (Math.cos(rad) * (radius * 0.08)); // gentle vertical tilt keeping tops fully visible

            // Scale & Depth calculations (closer planets are bigger, further are smaller)
            // Normalized Z from -1 (back) to +1 (front)
            const normZ = (z + (radius * 0.45)) / (radius * 0.9);
            const scale = 0.75 + (normZ * 0.32); // between 0.75 and 1.07
            const opacity = 0.42 + (normZ * 0.58); // between 0.42 and 1.0
            const zIndex = Math.floor(normZ * 100);

            // Center card on orbital coordinate with translate(-50%, -50%)
            planet.style.transform = `translate3d(${x}px, ${y}px, ${z}px) translate(-50%, -50%) scale(${scale})`;
            planet.style.opacity = opacity;
            planet.style.zIndex = zIndex;

            // Highlight the planet closest to the user
            if (normZ > 0.88) {
                planet.classList.add('is-focused');
            } else {
                planet.classList.remove('is-focused');
            }
        });
    }

    // Animation Loop
    function animate() {
        if (!isDragging) {
            if (!isPaused) {
                targetAngle += orbitSpeed;
            }
            // Smooth inertia
            currentAngle += (targetAngle - currentAngle) * 0.08;
            currentAngle += velocity;
            velocity *= 0.92; // friction
        } else {
            currentAngle = targetAngle;
        }

        updatePlanetsPosition();
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    // Mouse & Touch Drag Controls
    let dragDistance = 0;
    const viewport = document.getElementById('solarViewport');
    if (viewport) {
        viewport.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            lastX = e.clientX;
            dragDistance = 0;
            velocity = 0;
            viewport.style.cursor = 'grabbing';
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const delta = e.clientX - lastX;
            dragDistance += Math.abs(delta);
            lastX = e.clientX;
            targetAngle += delta * 0.35;
            velocity = delta * 0.15;
        });

        window.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            viewport.style.cursor = 'grab';
        });

        // Touch events
        let touchStartX = 0;
        let touchStartY = 0;

        viewport.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                isDragging = true;
                startX = e.touches[0].clientX;
                lastX = e.touches[0].clientX;
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
                dragDistance = 0;
                velocity = 0;
            }
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            if (!isDragging || e.touches.length !== 1) return;
            const delta = e.touches[0].clientX - lastX;
            const totalDist = Math.hypot(e.touches[0].clientX - touchStartX, e.touches[0].clientY - touchStartY);
            dragDistance += totalDist;
            lastX = e.touches[0].clientX;
            targetAngle += delta * 0.45;
            velocity = delta * 0.2;
        }, { passive: true });

        window.addEventListener('touchend', () => {
            isDragging = false;
        });

        // Pause on Hover (Desktop)
        viewport.addEventListener('mouseenter', () => { isPaused = true; });
        viewport.addEventListener('mouseleave', () => { isPaused = false; });
    }

    // ===================================================
    // MOUSE HOVER & TOUCH TO REVEAL ORIGINAL IMAGE COLOR
    // ===================================================
    planets.forEach((planet) => {
        // Immediately reveal real color the instant mouse touches the image
        planet.addEventListener('mouseenter', () => {
            planets.forEach(p => { if (p !== planet) p.classList.remove('show-color'); });
            planet.classList.add('show-color');
        });

        planet.addEventListener('mouseleave', () => {
            planet.classList.remove('show-color');
        });

        // Click / tap support for mobile and trackpads
        planet.addEventListener('click', (e) => {
            // If the user was dragging the orbit, do not trigger color reveal
            if (dragDistance > 6) return;

            e.stopPropagation();
            const wasRevealed = planet.classList.contains('show-color');

            // Reset all planets to black and white
            planets.forEach(p => p.classList.remove('show-color'));

            // Toggle original color on tapped planet
            if (!wasRevealed) {
                planet.classList.add('show-color');
            }
        });
    });

    // Clicking empty space in the viewport resets all planets back to monochrome
    if (viewport) {
        viewport.addEventListener('click', (e) => {
            if (dragDistance > 6) return;
            if (!e.target.closest('.planet-item')) {
                planets.forEach(p => p.classList.remove('show-color'));
            }
        });
    }

    // Prev / Next Controls
    const prevBtn = document.getElementById('orbitPrevBtn');
    const nextBtn = document.getElementById('orbitNextBtn');
    const playPauseBtn = document.getElementById('orbitPlayPauseBtn');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            targetAngle -= angleStep;
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            targetAngle += angleStep;
        });
    }

    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            isPaused = !isPaused;
            const icon = playPauseBtn.querySelector('i');
            if (icon) {
                icon.className = isPaused ? 'fa-solid fa-play' : 'fa-solid fa-pause';
            }
        });
    }

    // Window Resize Handler
    window.addEventListener('resize', () => {
        updatePlanetsPosition();
    });
});
