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
        // Smoothly reset view back to nav view after drawer closes
        setTimeout(() => {
            if (window.showSidebarNavView) window.showSidebarNavView();
        }, 350);
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
// IN-SIDEBAR AUTH CONTROLLER (Sign In & Sign Up inside Sidebar Drawer)
// No popup/modal box appears; sidebar content dynamically swaps.
// ===================================================
window.showSidebarAuthView = function(tab = 'signin') {
    const navView = document.getElementById('sidebarNavView');
    const authView = document.getElementById('sidebarAuthView');
    if (!authView) return;

    if (navView) navView.classList.add('hidden');
    authView.classList.remove('hidden');
    authView.classList.add('flex');

    window.switchSidebarAuthTab(tab);
};

window.showSidebarNavView = function() {
    const navView = document.getElementById('sidebarNavView');
    const authView = document.getElementById('sidebarAuthView');
    if (!navView || !authView) return;

    authView.classList.add('hidden');
    authView.classList.remove('flex');
    navView.classList.remove('hidden');
};

window.switchSidebarAuthTab = function(tab) {
    const signInForm = document.getElementById('sidebarSignInForm');
    const signUpForm = document.getElementById('sidebarSignUpForm');
    const tabSignIn = document.getElementById('sidebarTabSignIn');
    const tabSignUp = document.getElementById('sidebarTabSignUp');
    const title = document.getElementById('sidebarAuthTitle');
    const alertBox = document.getElementById('sidebarAuthAlert');
    if (alertBox) alertBox.classList.add('hidden');

    if (tab === 'signup') {
        if (signInForm) signInForm.classList.add('hidden');
        if (signUpForm) signUpForm.classList.remove('hidden');
        if (tabSignUp) tabSignUp.className = "flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all duration-200 bg-white text-black shadow-xs cursor-pointer";
        if (tabSignIn) tabSignIn.className = "flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all duration-200 text-neutral-500 hover:text-black cursor-pointer";
        if (title) title.innerText = "Create Account";
    } else {
        if (signUpForm) signUpForm.classList.add('hidden');
        if (signInForm) signInForm.classList.remove('hidden');
        if (tabSignIn) tabSignIn.className = "flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all duration-200 bg-white text-black shadow-xs cursor-pointer";
        if (tabSignUp) tabSignUp.className = "flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all duration-200 text-neutral-500 hover:text-black cursor-pointer";
        if (title) title.innerText = "Sign In";
    }
};

window.handleSidebarAuthSubmit = async function(event, action) {
    event.preventDefault();
    const alertBox = document.getElementById('sidebarAuthAlert');
    const submitBtn = action === 'signup' 
        ? document.getElementById('sidebarSignUpSubmitBtn') 
        : document.getElementById('sidebarSignInSubmitBtn');
    
    let payload = { action };
    if (action === 'signup') {
        payload.name = (document.getElementById('sidebarSignUpName')?.value || '').trim();
        payload.email = (document.getElementById('sidebarSignUpEmail')?.value || '').trim();
        payload.phone = (document.getElementById('sidebarSignUpPhone')?.value || '').trim();
        payload.password = document.getElementById('sidebarSignUpPassword')?.value || '';
    } else {
        payload.email = (document.getElementById('sidebarSignInEmail')?.value || '').trim();
        payload.password = document.getElementById('sidebarSignInPassword')?.value || '';
    }

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Authenticating...';
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
                alertBox.className = "mb-3 p-2.5 rounded-lg text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5";
                alertBox.innerHTML = '<i class="fa-solid fa-circle-check text-xs"></i> <span>' + (result.message || 'Welcome!') + '</span>';
                alertBox.classList.remove('hidden');
            }
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } else {
            if (alertBox) {
                alertBox.className = "mb-3 p-2.5 rounded-lg text-[11px] font-medium bg-red-50 text-red-700 border border-red-200 flex items-center gap-1.5";
                alertBox.innerHTML = '<i class="fa-solid fa-triangle-exclamation text-xs"></i> <span>' + (result.message || 'Authentication failed.') + '</span>';
                alertBox.classList.remove('hidden');
            }
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerText = action === 'signup' ? 'Create Account' : 'Sign In';
            }
        }
    } catch (err) {
        if (alertBox) {
            alertBox.className = "mb-3 p-2.5 rounded-lg text-[11px] font-medium bg-red-50 text-red-700 border border-red-200 flex items-center gap-1.5";
            alertBox.innerHTML = '<i class="fa-solid fa-triangle-exclamation text-xs"></i> <span>Network error. Please try again.</span>';
            alertBox.classList.remove('hidden');
        }
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = action === 'signup' ? 'Create Account' : 'Sign In';
        }
    }
};
