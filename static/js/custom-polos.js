// ===================================================
// VENT COLLECTION - APPLE-INSPIRED V-STUDIO SHOWCASE
// Ultra-refined product interaction & live dynamic V preview
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
        img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&auto=format&fit=crop&q=80",
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
        img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&auto=format&fit=crop&q=80",
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
        title: "British Racing Green Club Polo",
        category: "Heritage Club Series",
        price: "₦25,000",
        usd: "$29",
        badge: "Gold Bullion Thread Embroidery",
        fabric: "260GSM Combed Honeycomb",
        desc: "Deep British Racing Green piqué with hand-guided monogram crest available on the left chest or collar point. Reinforced placket.",
        img: "https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=900&auto=format&fit=crop&q=80",
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

    // 1. Update Grid Cards Styling
    const cards = document.querySelectorAll("#poloGridCards .polo-card");
    cards.forEach((card, idx) => {
        const badge = card.querySelector(".polo-active-badge");
        if (idx === index) {
            card.classList.remove("border-transparent", "opacity-80");
            card.classList.add("border-white", "opacity-100", "shadow-xl", "ring-2", "ring-[#0071e3]", "scale-[1.02]");
            if (badge) badge.classList.remove("hidden");
        } else {
            card.classList.remove("border-white", "opacity-100", "shadow-xl", "ring-2", "ring-[#0071e3]", "scale-[1.02]");
            card.classList.add("border-transparent", "opacity-80");
            if (badge) badge.classList.add("hidden");
        }
    });

    // 2. Smooth Cross-Fade on the Left V-Studio Stage
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

    // 3. Update Text Info
    const elId = document.getElementById("spotlightPoloId");
    const elTitle = document.getElementById("spotlightTitle");
    const elCategory = document.getElementById("spotlightCategory");
    const elPrice = document.getElementById("spotlightPrice");
    const elUsd = document.getElementById("spotlightUsd");
    const elBadge = document.getElementById("spotlightBadge");
    const elDesc = document.getElementById("spotlightDesc");

    if (elId) elId.textContent = polo.id;
    if (elTitle) elTitle.textContent = polo.title;
    if (elCategory) elCategory.textContent = polo.category;
    if (elPrice) elPrice.textContent = polo.price;
    if (elUsd) elUsd.textContent = `(${polo.usd} USD)`;
    if (elBadge) elBadge.textContent = polo.badge;
    if (elDesc) elDesc.textContent = polo.desc;

    // 4. Render Colorway Swatches
    renderColorwaySwatches(polo.colors);

    // 5. Update WhatsApp Order Link
    updatePoloWhatsAppLink();

    // 6. Smooth Scroll on Mobile
    if (window.innerWidth < 1024) {
        const stage = document.getElementById("imageClickedStage");
        if (stage) {
            stage.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }
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

    const customTextInput = document.getElementById("poloCustomTextInput");
    const customText = customTextInput ? customTextInput.value.trim() : "VENT 94";

    const message = `Hello Vent Collection, I would like to order the ${polo.title} (${polo.price}) in Size: ${currentSize}, Colorway: ${currentColorName}, Custom Monogram: "${customText}". Please confirm turnaround time and payment options.`;
    const encoded = encodeURIComponent(message);

    const btn = document.getElementById("spotlightWhatsAppBtn");
    if (btn) {
        btn.href = `https://wa.me/2348000000000?text=${encoded}`;
    }
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

    // Select initial piece #0
    selectPolo(0);
});
