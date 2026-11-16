// ===================================================
// VENT COLLECTION - APPLE-INSPIRED V-STUDIO SHOWCASE
// Horizontal Product Card Carousel & Dynamic V-Studio
// ===================================================

const VENT_POLOS = [
    {
        id: "VENT-PIECE-01",
        title: "Archival Heavyweight Piqué Polo",
        category: "Archival Piqué Series",
        price: "₦24,500",
        usd: "$28",
        badge: "260GSM Honeycomb Cotton",
        fabric: "260GSM Double-Piqué Cotton",
        desc: "Woven from double-ply combed cotton with an archival waffle-piqué texture, structured non-curl rib collar, and genuine mother-of-pearl buttons.",
        img: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=900&auto=format&fit=crop&q=80",
        colors: [
            { name: "Onyx Black", hex: "#111111" },
            { name: "Chalk White", hex: "#f5f5f7" },
            { name: "Vintage Navy", hex: "#1e3a8a" },
            { name: "Forest Green", hex: "#064e3b" }
        ]
    },
    {
        id: "VENT-PIECE-02",
        title: "Single-Stitch 90s Vintage Graphic Tee",
        category: "Authentic Vintage Drop",
        price: "₦22,000",
        usd: "$26",
        badge: "Single-Stitch Hem · 90s Heritage",
        fabric: "100% Washed Vintage Cotton",
        desc: "Authentic single-stitch construction sourced from 90s deadstock archives with natural vintage fade and super soft washed drape.",
        img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&auto=format&fit=crop&q=80",
        colors: [
            { name: "Washed Ivory", hex: "#edece8" },
            { name: "Faded Black", hex: "#222222" },
            { name: "Heather Grey", hex: "#9ca3af" }
        ]
    },
    {
        id: "VENT-PIECE-03",
        title: "Bespoke Custom Screenprinted Tee",
        category: "Vent Studio Core",
        price: "₦26,500",
        usd: "$30",
        badge: "240GSM Heavyweight Combed Cotton",
        fabric: "240GSM Ring-Spun Cotton",
        desc: "Tailored boxy streetwear silhouette with high-density screen printing and custom woven neck label. Hand-finished in our Lagos studio.",
        img: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=900&auto=format&fit=crop&q=80",
        colors: [
            { name: "Pitch Black", hex: "#0a0a0a" },
            { name: "Pure White", hex: "#ffffff" },
            { name: "Vintage Navy", hex: "#1e293b" }
        ]
    },
    {
        id: "VENT-PIECE-04",
        title: "Signature White Minimalist Studio Tee",
        category: "Minimalist Essentials",
        price: "₦21,000",
        usd: "$24",
        badge: "High-Density Puff Lettering",
        fabric: "220GSM Luxury Jersey Cotton",
        desc: "Ultra-clean modern silhouette elevated by subtle 3D puff-print monogram lettering on the left chest and pre-shrunk finish.",
        img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=900&auto=format&fit=crop&q=80",
        colors: [
            { name: "Pure Chalk", hex: "#ffffff" },
            { name: "Charcoal Slate", hex: "#262626" },
            { name: "Olive Tint", hex: "#3f4f34" }
        ]
    },
    {
        id: "VENT-PIECE-05",
        title: "Retro Stripe Textured Knit Polo",
        category: "Archival Jacquard Knit",
        price: "₦28,000",
        usd: "$32",
        badge: "Open-Weave Breathable Knit",
        fabric: "Fine-Gauge Mercerized Knit",
        desc: "Bespoke open-knit construction inspired by Mediterranean vintage resort wear. Exceptionally breathable with luxurious natural drape.",
        img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=900&auto=format&fit=crop&q=80",
        colors: [
            { name: "Terracotta Earth", hex: "#78350f" },
            { name: "Sage Green", hex: "#064e3b" },
            { name: "Midnight Noir", hex: "#0f172a" }
        ]
    },
    {
        id: "VENT-PIECE-06",
        title: "British Racing Heritage Club Polo",
        category: "Heritage Club Series",
        price: "₦25,000",
        usd: "$29",
        badge: "Gold Bullion Thread Embroidery",
        fabric: "260GSM Combed Honeycomb",
        desc: "Deep British Racing Green piqué with hand-guided monogram crest available on the left chest or collar point. Reinforced placket.",
        img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=900&auto=format&fit=crop&q=80",
        colors: [
            { name: "Racing Green", hex: "#064e3b" },
            { name: "Navy Blue", hex: "#1e3a8a" },
            { name: "Pure White", hex: "#ffffff" }
        ]
    },
    {
        id: "VENT-PIECE-07",
        title: "Raw-Hem Drop-Shoulder Boxy Tee",
        category: "Architectural Streetwear",
        price: "₦24,000",
        usd: "$28",
        badge: "280GSM Heavyweight · Raw Hem",
        fabric: "280GSM Heavy Piqué Jersey",
        desc: "Architectural boxy streetwear cut with subtle drop shoulder and laser-clean raw hemline designed to roll slightly with wear.",
        img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=900&auto=format&fit=crop&q=80",
        colors: [
            { name: "Concrete Grey", hex: "#3f3f46" },
            { name: "Onyx Black", hex: "#09090b" },
            { name: "Chalk White", hex: "#fafafa" }
        ]
    },
    {
        id: "VENT-PIECE-08",
        title: "Stealth Noir Luxury Custom Polo",
        category: "Triple Black Studio",
        price: "₦27,000",
        usd: "$31",
        badge: "Tonal Matte Black Embroidery",
        fabric: "270GSM Mercerized Piqué",
        desc: "Monochrome triple-black edition featuring stealth matte embroidery, black dyed shell buttons, and Mercerized high-luster yarn.",
        img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=900&auto=format&fit=crop&q=80",
        colors: [
            { name: "Triple Black", hex: "#0a0a0a" },
            { name: "Carbon Slate", hex: "#262626" },
            { name: "Dark Gunmetal", hex: "#1e293b" }
        ]
    }
];

let currentPoloIndex = 0;
let currentColorName = "Onyx Black";
let currentSize = "L";

function selectPolo(index) {
    if (index < 0 || index >= VENT_POLOS.length) return;
    currentPoloIndex = index;
    const polo = VENT_POLOS[index];

    // 1. Update Carousel Cards Styling
    const cards = document.querySelectorAll("#poloCarouselTrack .polo-card");
    cards.forEach((card, idx) => {
        const badge = card.querySelector(".polo-active-badge");
        if (idx === index) {
            card.classList.remove("border-white/10", "opacity-80");
            card.classList.add("border-white/40", "opacity-100", "shadow-2xl", "ring-2", "ring-[#0071e3]", "ring-offset-2", "ring-offset-black", "scale-[1.02]");
            if (badge) badge.classList.remove("hidden");
        } else {
            card.classList.remove("border-white/40", "opacity-100", "shadow-2xl", "ring-2", "ring-[#0071e3]", "ring-offset-2", "ring-offset-black", "scale-[1.02]");
            card.classList.add("border-white/10", "opacity-80");
            if (badge) badge.classList.add("hidden");
        }
    });

    // 2. Update Carousel Dots
    const dots = document.querySelectorAll("#carouselDots .carousel-dot");
    dots.forEach((dot, idx) => {
        if (idx === index) {
            dot.className = "carousel-dot w-6 h-2 rounded-full bg-white transition-all duration-300";
        } else {
            dot.className = "carousel-dot w-2 h-2 rounded-full bg-white/20 hover:bg-white/40 transition-all duration-300";
        }
    });

    // 3. Smooth Cross-Fade on the Left V-Studio Stage
    const spotlightImg = document.getElementById("spotlightImg");
    if (spotlightImg) {
        spotlightImg.style.opacity = "0.2";
        spotlightImg.style.transform = "scale(0.97)";
        setTimeout(() => {
            spotlightImg.src = polo.img;
            spotlightImg.style.opacity = "1";
            spotlightImg.style.transform = "scale(1)";
        }, 150);
    }

    // 4. Update Text Info
    const elId = document.getElementById("spotlightPoloId");
    const elTitle = document.getElementById("spotlightTitle");
    const elCategory = document.getElementById("spotlightCategory");
    const elPrice = document.getElementById("spotlightPrice");
    const elUsd = document.getElementById("spotlightUsd");
    const elBadge = document.getElementById("spotlightBadge");

    if (elId) elId.textContent = polo.id;
    if (elTitle) elTitle.textContent = polo.title;
    if (elCategory) elCategory.textContent = `${polo.category} · Handcrafted in 24 Hours`;
    if (elPrice) elPrice.textContent = polo.price;
    if (elUsd) elUsd.textContent = `(${polo.usd} USD)`;
    if (elBadge) elBadge.textContent = polo.badge;

    // 5. Render Colorway Swatches
    renderColorwaySwatches(polo.colors);

    // 6. Update WhatsApp Order Link
    updatePoloWhatsAppLink();
}

function scrollPoloCarousel(direction) {
    const track = document.getElementById("poloCarouselTrack");
    if (!track) return;
    const cardWidth = 240; // width + gap
    track.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
}

function scrollToPoloCard(index) {
    const track = document.getElementById("poloCarouselTrack");
    const cards = document.querySelectorAll("#poloCarouselTrack .polo-card");
    if (!track || !cards[index]) return;
    selectPolo(index);
    cards[index].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
}

function renderColorwaySwatches(colors) {
    const container = document.getElementById("colorwaySwatches");
    if (!container || !colors || !colors.length) return;

    currentColorName = colors[0].name;

    container.innerHTML = "";
    colors.forEach((color, idx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.title = color.name;
        btn.className = `w-5 h-5 rounded-full transition-transform hover:scale-125 border ${idx === 0 ? "border-black ring-2 ring-black/30 scale-110" : "border-neutral-300"}`;
        btn.style.backgroundColor = color.hex;
        btn.onclick = () => selectColorway(color.hex, color.name, btn);
        container.appendChild(btn);
    });
}

function selectColorway(hex, name, activeBtn) {
    currentColorName = name;

    const allBtns = document.querySelectorAll("#colorwaySwatches button");
    allBtns.forEach(btn => {
        btn.className = "w-5 h-5 rounded-full transition-transform hover:scale-125 border border-neutral-300";
    });
    if (activeBtn) {
        activeBtn.className = "w-5 h-5 rounded-full transition-transform hover:scale-125 border border-black ring-2 ring-black/30 scale-110";
    }

    updatePoloWhatsAppLink();
}

function selectSize(size) {
    currentSize = size;
    const buttons = document.querySelectorAll("#sizeSelectorPills .polo-size-btn");
    buttons.forEach(btn => {
        if (btn.textContent.trim() === size) {
            btn.className = "polo-size-btn px-2.5 py-1 rounded-full text-[11px] font-bold bg-black text-white shadow-sm transition-all";
        } else {
            btn.className = "polo-size-btn px-2.5 py-1 rounded-full text-[11px] font-medium bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-all";
        }
    });

    updatePoloWhatsAppLink();
}

function updatePoloWhatsAppLink() {
    const polo = VENT_POLOS[currentPoloIndex];
    if (!polo) return;

    const message = `Hello Vent Collection, I would like to order the ${polo.title} (${polo.price}) in Colorway: ${currentColorName}. Please confirm available sizes and custom delivery.`;
    const encoded = encodeURIComponent(message);

    const btn = document.getElementById("spotlightWhatsAppBtn");
    if (btn) {
        btn.href = `https://wa.me/2348000000000?text=${encoded}`;
    }
}

// Drag-to-scroll implementation on carousel track
function setupCarouselDrag() {
    const track = document.getElementById("poloCarouselTrack");
    if (!track) return;

    let isDown = false;
    let startX;
    let scrollLeft;
    let moved = false;

    track.addEventListener("mousedown", (e) => {
        isDown = true;
        moved = false;
        track.classList.add("cursor-grabbing");
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
    });

    track.addEventListener("mouseleave", () => {
        isDown = false;
        track.classList.remove("cursor-grabbing");
    });

    track.addEventListener("mouseup", () => {
        isDown = false;
        track.classList.remove("cursor-grabbing");
    });

    track.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 1.5;
        if (Math.abs(walk) > 5) moved = true;
        track.scrollLeft = scrollLeft - walk;
    });
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
    const customInput = document.getElementById("poloCustomTextInput");
    const liveMonogram = document.getElementById("liveMonogramText");

    if (customInput && liveMonogram) {
        customInput.addEventListener("input", (e) => {
            const val = e.target.value.toUpperCase();
            if (val.trim().length > 0) {
                liveMonogram.textContent = val;
            } else {
                liveMonogram.textContent = "VENT";
            }
            updatePoloWhatsAppLink();
        });
    }

    setupCarouselDrag();

    // Select initial piece #0
    selectPolo(0);
});
