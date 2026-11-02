// Common script for WhatsWeb / Vendify24
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
        mainHeader.classList.remove('translate-x-full');
        mainHeader.classList.add('translate-x-0');
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
            headerToggleBtn.classList.remove('bg-white', 'text-black');
            headerToggleBtn.classList.add('bg-black', 'text-white');
        }
    }

    function closeHeader() {
        if (!mainHeader) return;
        mainHeader.classList.remove('translate-x-0');
        mainHeader.classList.add('translate-x-full');
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
            headerToggleBtn.classList.remove('bg-black', 'text-white');
            headerToggleBtn.classList.add('bg-white', 'text-black');
        }
    }

    function toggleHeader() {
        if (!mainHeader) return;
        const isOpen = mainHeader.classList.contains('translate-x-0');
        if (isOpen) {
            closeHeader();
        } else {
            openHeader();
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

    // ===================================================
    // INTERACTIVE STORE BUILDER SIMULATOR CONTROLLER
    // ===================================================
    let currentSimCurrency = '$';
    let currentSimCategory = 'Fashion';
    let simCountdownInterval = null;

    const simPresets = {
        'Fashion': {
            name: 'Bella Luxe Boutique',
            slug: 'bellaluxe',
            tagline: 'Curated luxury fashion, silk dresses & bespoke accessories delivered nationwide.',
            products: [
                { name: 'Silk Slip Evening Dress', price: '48.00', img: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&auto=format&fit=crop&q=80' },
                { name: 'Handcrafted Leather Tote', price: '95.00', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&auto=format&fit=crop&q=80' },
                { name: 'Minimalist Trench Coat', price: '110.00', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80' }
            ]
        },
        'Beauty': {
            name: 'Aura Glow Cosmetics',
            slug: 'auraglow',
            tagline: 'Clean skincare, hydration elixirs & cruelty-free beauty essentials.',
            products: [
                { name: 'Matte Velvet Lip Kit', price: '24.00', img: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&auto=format&fit=crop&q=80' },
                { name: 'Vitamin C Radiance Serum', price: '38.00', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&auto=format&fit=crop&q=80' },
                { name: 'Flawless Setting Powder', price: '29.00', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&auto=format&fit=crop&q=80' }
            ]
        },
        'Bakery': {
            name: 'Golden Crust Artisan Bakery',
            slug: 'goldencrust',
            tagline: 'Freshly baked sourdough, delicate pastries & custom celebration cakes.',
            products: [
                { name: 'Red Velvet Cupcake Box (6)', price: '18.00', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&auto=format&fit=crop&q=80' },
                { name: 'Artisan Sourdough Loaf', price: '12.00', img: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=300&auto=format&fit=crop&q=80' },
                { name: 'Triple Chocolate Ganache Cake', price: '45.00', img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=300&auto=format&fit=crop&q=80' }
            ]
        },
        'Jewelry': {
            name: 'Celeste Fine Jewelry',
            slug: 'celestejewels',
            tagline: 'Timeless 18k gold vermeil, pearls & minimalist luxury accessories.',
            products: [
                { name: '18k Gold Plated Link Chain', price: '65.00', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&auto=format&fit=crop&q=80' },
                { name: 'Baroque Pearl Drop Earrings', price: '42.00', img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&auto=format&fit=crop&q=80' },
                { name: 'Minimalist Chrono Watch', price: '88.00', img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=300&auto=format&fit=crop&q=80' }
            ]
        },
        'Gadgets': {
            name: 'VoltGear Tech Lab',
            slug: 'voltgear',
            tagline: 'High performance audio gear, fast wireless charging & smart accessories.',
            products: [
                { name: 'Wireless Noise-Cancelling Pods', price: '55.00', img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&auto=format&fit=crop&q=80' },
                { name: 'MagSafe Fast PowerBank 10k', price: '39.00', img: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=300&auto=format&fit=crop&q=80' },
                { name: 'Smart Fitness Tracker Band', price: '49.00', img: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=300&auto=format&fit=crop&q=80' }
            ]
        }
    };

    window.goToSimStep = function(stepNum) {
        for (let i = 1; i <= 4; i++) {
            const stepEl = document.getElementById(`simStep${i}`);
            const tabEl = document.getElementById(`stepTab${i}`);
            if (stepEl) {
                if (i === stepNum) {
                    stepEl.classList.remove('hidden');
                } else {
                    stepEl.classList.add('hidden');
                }
            }
            if (tabEl) {
                const badge = tabEl.querySelector('span:first-child');
                if (i === stepNum) {
                    tabEl.className = 'step-tab flex items-center justify-center gap-2 pb-2 border-b-2 border-black text-black font-black cursor-pointer';
                    if (badge) badge.className = 'w-5 h-5 flex items-center justify-center bg-black text-white text-[11px]';
                } else if (i < stepNum) {
                    tabEl.className = 'step-tab flex items-center justify-center gap-2 pb-2 border-b-2 border-black/40 text-black font-semibold cursor-pointer';
                    if (badge) badge.className = 'w-5 h-5 flex items-center justify-center bg-black/20 text-black text-[11px]';
                } else {
                    tabEl.className = 'step-tab flex items-center justify-center gap-2 pb-2 text-black/40 border-b-2 border-transparent cursor-pointer';
                    if (badge) badge.className = 'w-5 h-5 flex items-center justify-center bg-black/10 text-black text-[11px]';
                }
            }
        }
    };

    window.updateStoreNamePreview = function(val) {
        const cleanName = val.trim() || 'My Business Store';
        const previewStoreName = document.getElementById('previewStoreName');
        if (previewStoreName) previewStoreName.textContent = cleanName;

        const slug = cleanName.toLowerCase().replace(/[^a-z0-9]/g, '');
        const simSlug = document.getElementById('simSlug');
        if (simSlug) simSlug.value = slug || 'mybusiness';
        window.updateSlugPreview(simSlug ? simSlug.value : 'mybusiness');
    };

    window.updateSlugPreview = function(val) {
        const slug = (val || 'mybusiness').toLowerCase().replace(/[^a-z0-9]/g, '');
        const host = `${slug || 'mybusiness'}.vendify24.com`;
        const previewBarUrl = document.getElementById('previewBarUrl');
        const simWebsiteUrlText = document.getElementById('simWebsiteUrlText');
        if (previewBarUrl) previewBarUrl.textContent = host;
        if (simWebsiteUrlText) simWebsiteUrlText.textContent = `https://${host}`;
    };

    window.updateTaglinePreview = function(val) {
        const previewTagline = document.getElementById('previewTagline');
        if (previewTagline) previewTagline.textContent = val.trim() || 'Official digital store with direct WhatsApp checkout.';
    };

    window.setSimCurrency = function(curr) {
        currentSimCurrency = curr;
        document.querySelectorAll('.sim-curr-btn').forEach(b => {
            if (b.textContent.includes(curr)) {
                b.className = 'sim-curr-btn px-4 py-2 border-2 border-black bg-black text-white text-xs font-bold cursor-pointer';
            } else {
                b.className = 'sim-curr-btn px-4 py-2 border border-black/20 bg-white text-black text-xs font-bold cursor-pointer';
            }
        });
        renderProductsUI();
    };

    function renderProductsUI() {
        const preset = simPresets[currentSimCategory] || simPresets['Fashion'];
        const listContainer = document.getElementById('simProductsList');
        const gridContainer = document.getElementById('previewProductsGrid');

        if (listContainer) {
            listContainer.innerHTML = preset.products.map(p => `
                <div class="flex items-center gap-3 p-2.5 border border-black/15 bg-neutral-50/50">
                    <img src="${p.img}" alt="${p.name}" class="w-10 h-10 object-cover border border-black/10">
                    <div class="flex-1 min-w-0">
                        <span class="text-xs font-bold text-black block truncate">${p.name}</span>
                        <span class="text-[11px] text-black/60 font-mono">${currentSimCurrency}${p.price}</span>
                    </div>
                    <span class="text-[10px] font-bold px-2 py-0.5 bg-black/10 text-black">Active</span>
                </div>
            `).join('');
        }

        if (gridContainer) {
            gridContainer.innerHTML = preset.products.map(p => `
                <div class="flex items-center justify-between p-2 border border-black/10 hover:border-black/30 transition">
                    <div class="flex items-center gap-2.5 min-w-0">
                        <img src="${p.img}" alt="${p.name}" class="w-10 h-10 object-cover">
                        <div class="min-w-0">
                            <span class="text-xs font-bold text-black block truncate">${p.name}</span>
                            <span class="text-[11px] font-mono text-black/70 font-semibold">${currentSimCurrency}${p.price}</span>
                        </div>
                    </div>
                    <button type="button" class="px-2.5 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-wider shrink-0 cursor-pointer">
                        Add
                    </button>
                </div>
            `).join('');
        }
    }

    window.applyCategoryPreset = function(catKey) {
        currentSimCategory = catKey;
        const preset = simPresets[catKey];
        if (!preset) return;

        document.querySelectorAll('.cat-preset-btn').forEach(btn => {
            if (btn.textContent.includes(catKey) || (catKey === 'Fashion' && btn.textContent.includes('Fashion')) || (catKey === 'Gadgets' && btn.textContent.includes('Tech'))) {
                btn.className = 'cat-preset-btn px-3.5 py-1.5 border-2 border-black bg-black text-white text-xs font-bold cursor-pointer';
            } else {
                btn.className = 'cat-preset-btn px-3.5 py-1.5 border border-black/20 bg-white text-black text-xs font-bold cursor-pointer';
            }
        });

        const simStoreName = document.getElementById('simStoreName');
        const simSlug = document.getElementById('simSlug');
        const simTagline = document.getElementById('simTagline');

        if (simStoreName) simStoreName.value = preset.name;
        if (simSlug) simSlug.value = preset.slug;
        if (simTagline) simTagline.value = preset.tagline;

        window.updateStoreNamePreview(preset.name);
        window.updateTaglinePreview(preset.tagline);
        renderProductsUI();
    };

    window.launchSimulation = function() {
        window.goToSimStep(4);

        const storeName = (document.getElementById('simStoreName')?.value || 'My Store').trim();
        const vendorName = (document.getElementById('simVendorName')?.value || '').trim();
        const whatsapp = (document.getElementById('simWhatsapp')?.value || '').trim();

        const targetUrl = `/order?plan=basic_2&business_name=${encodeURIComponent(storeName)}&vendor_name=${encodeURIComponent(vendorName)}&whatsapp_number=${encodeURIComponent(whatsapp)}&category=${encodeURIComponent(currentSimCategory)}`;

        const simWebsiteLink = document.getElementById('simWebsiteLink');
        const simWebsiteLinkBtn = document.getElementById('simWebsiteLinkBtn');
        const simSignupBtn = document.getElementById('simSignupBtn');

        if (simWebsiteLink) simWebsiteLink.href = targetUrl;
        if (simWebsiteLinkBtn) simWebsiteLinkBtn.href = targetUrl;
        if (simSignupBtn) simSignupBtn.href = targetUrl;

        if (simCountdownInterval) clearInterval(simCountdownInterval);

        let totalSeconds = 24 * 3600 - 1;
        function tickCountdown() {
            if (totalSeconds <= 0) totalSeconds = 24 * 3600;
            const h = Math.floor(totalSeconds / 3600);
            const m = Math.floor((totalSeconds % 3600) / 60);
            const s = totalSeconds % 60;

            const hEl = document.getElementById('simTimerHours');
            const mEl = document.getElementById('simTimerMinutes');
            const sEl = document.getElementById('simTimerSeconds');

            if (hEl) hEl.textContent = String(h).padStart(2, '0');
            if (mEl) mEl.textContent = String(m).padStart(2, '0');
            if (sEl) sEl.textContent = String(s).padStart(2, '0');

            totalSeconds--;
        }
        tickCountdown();
        simCountdownInterval = setInterval(tickCountdown, 1000);
    };

    // Initialize the simulator with Fashion preset
    if (document.getElementById('builder-simulator')) {
        renderProductsUI();
    }
});
