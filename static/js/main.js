// Common script for Vent Collection
document.addEventListener('DOMContentLoaded', () => {
    // Auto-dismiss flash notifications after 6 seconds
    const flashes = document.querySelectorAll('.animate-fade-in');
    flashes.forEach(f => {
        setTimeout(() => {
            f.style.opacity = '0';
            f.style.transition = 'opacity 0.5s ease';
            setTimeout(() => f.remove(), 500);
        }, 6000);
    });

    // ===================================================
    // FLOATING HEADER TOGGLE CONTROLLER
    // ===================================================
    const headerToggleBtn = document.getElementById('headerToggleBtn');
    const headerToggleIcon = document.getElementById('headerToggleIcon');
    const mainHeader = document.getElementById('mainHeader');
    const headerOverlay = document.getElementById('headerOverlay');
    const navCloseLinks = document.querySelectorAll('.nav-close-link');

    function openHeader() {
        if (!mainHeader) return;
        mainHeader.style.transform = 'translateX(0)';
        if (headerOverlay) {
            headerOverlay.classList.remove('opacity-0', 'pointer-events-none');
            headerOverlay.classList.add('opacity-100', 'pointer-events-auto');
        }
        if (headerToggleIcon) {
            headerToggleIcon.classList.remove('fa-bars');
            headerToggleIcon.classList.add('fa-xmark');
        }
        if (headerToggleBtn) {
            headerToggleBtn.setAttribute('title', 'Close Navigation Sidebar');
            headerToggleBtn.classList.remove('bg-white');
            headerToggleBtn.classList.add('bg-neutral-100');
        }
    }

    function closeHeader() {
        if (!mainHeader) return;
        mainHeader.style.transform = 'translateX(100%)';
        if (headerOverlay) {
            headerOverlay.classList.remove('opacity-100', 'pointer-events-auto');
            headerOverlay.classList.add('opacity-0', 'pointer-events-none');
        }
        if (headerToggleIcon) {
            headerToggleIcon.classList.remove('fa-xmark');
            headerToggleIcon.classList.add('fa-bars');
        }
        if (headerToggleBtn) {
            headerToggleBtn.setAttribute('title', 'Open Navigation Sidebar');
            headerToggleBtn.classList.remove('bg-neutral-100');
            headerToggleBtn.classList.add('bg-white');
        }
    }

    function toggleHeader() {
        if (!mainHeader) return;
        const isClosed = !mainHeader.style.transform || mainHeader.style.transform === 'translateX(100%)';
        if (isClosed) {
            openHeader();
        } else {
            closeHeader();
        }
    }

    if (headerToggleBtn) {
        headerToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleHeader();
        });
    }

    if (headerOverlay) {
        headerOverlay.addEventListener('click', closeHeader);
    }

    navCloseLinks.forEach(link => {
        link.addEventListener('click', closeHeader);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeHeader();
        }
    });

    // ===================================================
    // PURPOSE POINTS STICKY SCROLL CHOREOGRAPHY
    // - As user scrolls to point: Card pins with image + JUST THE HEADING.
    // - As user scrolls again: Heading moves up and other writings come up!
    // ===================================================
    const purposeTracks = document.querySelectorAll('.purpose-track');
    if (purposeTracks.length > 0) {
        let isTicking = false;

        function updatePurposeStickyTracks() {
            const vHeight = window.innerHeight;
            // Sticky top position: 14% on desktop, 10% on mobile
            const isDesktop = window.innerWidth >= 1024;
            const stickyTop = isDesktop ? vHeight * 0.14 : vHeight * 0.10;

            purposeTracks.forEach(track => {
                const rect = track.getBoundingClientRect();
                // How many pixels has the user scrolled while pinned?
                const scrolledWhilePinned = stickyTop - rect.top;

                // When user first reaches image, scrolledWhilePinned is ~0-80px:
                // Only the heading is visible, as if it's the only information!
                // When they scroll again (scrolledWhilePinned >= 100px):
                // Heading moves up to its place, and other text comes up!
                if (scrolledWhilePinned >= 90 && rect.bottom > 140) {
                    if (!track.classList.contains('is-revealed')) {
                        track.classList.add('is-revealed');
                    }
                } else {
                    if (track.classList.contains('is-revealed')) {
                        track.classList.remove('is-revealed');
                    }
                }
            });
            isTicking = false;
        }

        window.addEventListener('scroll', () => {
            if (!isTicking) {
                window.requestAnimationFrame(updatePurposeStickyTracks);
                isTicking = true;
            }
        }, { passive: true });

        // Run initial check on load
        updatePurposeStickyTracks();
    }

    });
