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

// ===================================================
// AUTH MODAL CONTROLLER (Sign In / Sign Up)
// ===================================================
window.openAuthModal = function(tab = 'signin') {
    const modal = document.getElementById('authModal');
    const card = document.getElementById('authModalCard');
    if (!modal) {
        window.location.href = '/auth?tab=' + tab;
        return;
    }
    window.switchModalAuthTab(tab);
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100', 'pointer-events-auto');
    if (card) {
        card.classList.remove('scale-95');
        card.classList.add('scale-100');
    }
    // Also close the sidebar navigation so the modal has complete focus
    const mainHeader = document.getElementById('mainHeader');
    const headerOverlay = document.getElementById('headerOverlay');
    const headerToggleIcon = document.getElementById('headerToggleIcon');
    const headerToggleBtn = document.getElementById('headerToggleBtn');
    if (mainHeader) mainHeader.style.transform = 'translateX(100%)';
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
};

window.closeAuthModal = function() {
    const modal = document.getElementById('authModal');
    const card = document.getElementById('authModalCard');
    if (!modal) return;
    modal.classList.remove('opacity-100', 'pointer-events-auto');
    modal.classList.add('opacity-0', 'pointer-events-none');
    if (card) {
        card.classList.remove('scale-100');
        card.classList.add('scale-95');
    }
};

window.switchModalAuthTab = function(tab) {
    const signInForm = document.getElementById('modalSignInForm');
    const signUpForm = document.getElementById('modalSignUpForm');
    const tabSignIn = document.getElementById('modalTabSignIn');
    const tabSignUp = document.getElementById('modalTabSignUp');
    const alertBox = document.getElementById('authModalAlert');
    if (alertBox) alertBox.classList.add('hidden');

    if (tab === 'signup') {
        if (signInForm) signInForm.classList.add('hidden');
        if (signUpForm) signUpForm.classList.remove('hidden');
        if (tabSignUp) tabSignUp.className = "flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-200 bg-white text-black shadow-xs";
        if (tabSignIn) tabSignIn.className = "flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-200 text-neutral-500 hover:text-black";
    } else {
        if (signUpForm) signUpForm.classList.add('hidden');
        if (signInForm) signInForm.classList.remove('hidden');
        if (tabSignIn) tabSignIn.className = "flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-200 bg-white text-black shadow-xs";
        if (tabSignUp) tabSignUp.className = "flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-200 text-neutral-500 hover:text-black";
    }
};

window.handleModalAuthSubmit = async function(event, action) {
    event.preventDefault();
    const alertBox = document.getElementById('authModalAlert');
    const submitBtn = action === 'signup' 
        ? document.getElementById('modalSignUpSubmitBtn') 
        : document.getElementById('modalSignInSubmitBtn');
    
    let payload = { action };
    if (action === 'signup') {
        payload.name = document.getElementById('modalSignUpName').value.trim();
        payload.email = document.getElementById('modalSignUpEmail').value.trim();
        payload.phone = document.getElementById('modalSignUpPhone').value.trim();
        payload.password = document.getElementById('modalSignUpPassword').value;
    } else {
        payload.email = document.getElementById('modalSignInEmail').value.trim();
        payload.password = document.getElementById('modalSignInPassword').value;
    }

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Processing...';
    }

    try {
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();

        if (response.ok && result.success) {
            if (alertBox) {
                alertBox.className = "mb-4 p-3 rounded-xl text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-2";
                alertBox.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span>' + (result.message || 'Authenticated successfully!') + '</span>';
                alertBox.classList.remove('hidden');
            }
            setTimeout(() => {
                window.location.reload();
            }, 600);
        } else {
            if (alertBox) {
                alertBox.className = "mb-4 p-3 rounded-xl text-xs font-medium bg-red-50 text-red-700 border border-red-200 flex items-center gap-2";
                alertBox.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> <span>' + (result.message || 'Authentication failed.') + '</span>';
                alertBox.classList.remove('hidden');
            }
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerText = action === 'signup' ? 'Create Account & Unlock Orders' : 'Sign In to Vent Atelier';
            }
        }
    } catch (err) {
        if (alertBox) {
            alertBox.className = "mb-4 p-3 rounded-xl text-xs font-medium bg-red-50 text-red-700 border border-red-200 flex items-center gap-2";
            alertBox.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> <span>Network connection error. Please try again.</span>';
            alertBox.classList.remove('hidden');
        }
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = action === 'signup' ? 'Create Account & Unlock Orders' : 'Sign In to Vent Atelier';
        }
    }
};
