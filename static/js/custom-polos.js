// ===================================================
// VENT COLLECTION - CUSTOM POLO ATELIER & STUDIO
// Interactivity for 3x3 Grid and "Image Clicked" Stage
// ===================================================

const VENT_POLOS = [
    {
        id: "VENT-POLO-01",
        title: "Archival Heavyweight Piqué Polo",
        category: "Archival Piqué Series",
        price: "₦24,500",
        usd: "$28",
        badge: "260GSM Piqué · Custom Monogram",
        fabric: "260GSM Honeycomb Cotton",
        desc: "Woven from double-ply combed cotton with an archival waffle-piqué texture. Features custom embroidered chest crest, mother-of-pearl buttons, and structured collar that never curls.",
        img: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=900&auto=format&fit=crop&q=80",
        embroideryImg: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=900&auto=format&fit=crop&q=80",
        collarImg: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=900&auto=format&fit=crop&q=80",
        colors: [
            { name: "Onyx Black", hex: "#0d0d0d" },
            { name: "Chalk White", hex: "#f4f4f4" },
            { name: "Vintage Navy", hex: "#1e3a8a" },
            { name: "Forest Green", hex: "#064e3b" }
        ]
    },
    {
        id: "VENT-POLO-02",
        title: "Vintage Tipped Collar Club Polo",
        category: "Club & Heritage Series",
        price: "₦22,000",
        usd: "$26",
        badge: "Twin Tipped · Contrast Rib",
        fabric: "240GSM Mercerized Cotton",
        desc: "Classic 70s country club silhouette with contrast twin tipping on ribbed collar and cuffs. Pre-washed for a soft vintage drape and effortless streetwear style.",
        img: "https://images.unsplash.com/photo-1625910513413-742295ddb9a5?w=900&auto=format&fit=crop&q=80",
        embroideryImg: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=900&auto=format&fit=crop&q=80",
        collarImg: "https://images.unsplash.com/photo-1625910513413-742295ddb9a5?w=900&auto=format&fit=crop&q=80",
        colors: [
            { name: "Cream Ivory", hex: "#f5f5f0" },
            { name: "Classic Navy", hex: "#1e3a8a" },
            { name: "Rust Terracotta", hex: "#7c2d12" },
            { name: "Onyx Black", hex: "#0a0a0a" }
        ]
    },
    {
        id: "VENT-POLO-03",
        title: "Racing Heritage Embroidered Polo",
        category: "Grand Prix Paddock Series",
        price: "₦26,500",
        usd: "$30",
        badge: "Chenille Crest · Boxy Fit",
        fabric: "280GSM Heavy Piqué",
        desc: "Inspired by retro Grand Prix paddock wear. Heavyweight 280GSM cotton with high-density chenille embroidery on chest, chain-stitched hem, and relaxed drop shoulder.",
        img: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=900&auto=format&fit=crop&q=80",
        embroideryImg: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=900&auto=format&fit=crop&q=80",
        collarImg: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=900&auto=format&fit=crop&q=80",
        colors: [
            { name: "Washed Navy", hex: "#1e293b" },
            { name: "Racing Red", hex: "#991b1b" },
            { name: "British Green", hex: "#064e3b" },
            { name: "Charcoal Black", hex: "#18181b" }
        ]
    },
    {
        id: "VENT-POLO-04",
        title: "90s Mineral Acid-Wash Street Polo",
        category: "Artisanal Wash Series",
        price: "₦21,000",
        usd: "$24",
        badge: "Mineral Wash · Distressed Collar",
        fabric: "250GSM Ring-Spun Cotton",
        desc: "Hand-dyed mineral wash yielding unique charcoal slate marbling on each individual piece. Softened raw collar edge and vintage single-stitch finishing.",
        img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=900&auto=format&fit=crop&q=80",
        embroideryImg: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=900&auto=format&fit=crop&q=80",
        collarImg: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=900&auto=format&fit=crop&q=80",
        colors: [
            { name: "Mineral Slate", hex: "#475569" },
            { name: "Washed Black", hex: "#18181b" },
            { name: "Vintage Olive", hex: "#3f4f34" },
            { name: "Faded Navy", hex: "#1e293b" }
        ]
    },
    {
        id: "VENT-POLO-05",
        title: "Signature Puff Logo Clean Polo",
        category: "Vent Studio Core",
        price: "₦23,500",
        usd: "$27",
        badge: "3D Puff Print · Pure White",
        fabric: "260GSM Combed Cotton",
        desc: "Clean minimal aesthetics elevated by bespoke 3D puff print lettering across the left chest and sleeve cuff. Super crisp, clean modern luxury feel.",
        img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=900&auto=format&fit=crop&q=80",
        embroideryImg: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=900&auto=format&fit=crop&q=80",
        collarImg: "https://images.unsplash.com/photo-1625910513413-742295ddb9a5?w=900&auto=format&fit=crop&q=80",
        colors: [
            { name: "Pure White", hex: "#ffffff" },
            { name: "Jet Black", hex: "#000000" },
            { name: "Cobalt Blue", hex: "#0284c7" },
            { name: "Sunset Gold", hex: "#d97706" }
        ]
    },
    {
        id: "VENT-POLO-06",
        title: "Retro Stripe Ribbed Knit Polo",
        category: "Archival Jacquard Knit",
        price: "₦28,000",
        usd: "$32",
        badge: "Jacquard Knit · Open Weave",
        fabric: "Fine-Gauge Breathable Knit",
        desc: "Bespoke open-knit construction inspired by Mediterranean vintage resort wear. Highly breathable, luxurious drape, and mother-of-pearl placket.",
        img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=900&auto=format&fit=crop&q=80",
        embroideryImg: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=900&auto=format&fit=crop&q=80",
        collarImg: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=900&auto=format&fit=crop&q=80",
        colors: [
            { name: "Terracotta Brown", hex: "#78350f" },
            { name: "Sage Forest", hex: "#064e3b" },
            { name: "Deep Ink", hex: "#0f172a" },
            { name: "Sand Dune", hex: "#f5f5f4" }
        ]
    },
    {
        id: "VENT-POLO-07",
        title: "Bespoke Monogram Club Polo",
        category: "Bespoke Atelier Collection",
        price: "₦25,000",
        usd: "$29",
        badge: "Gold Bullion Crest · Heavyweight",
        fabric: "260GSM Piqué Cotton",
        desc: "Deep British Racing Green piqué with hand-guided monogramming available on front chest or collar point. Custom woven inner neck piping and side vents.",
        img: "https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=900&auto=format&fit=crop&q=80",
        embroideryImg: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=900&auto=format&fit=crop&q=80",
        collarImg: "https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=900&auto=format&fit=crop&q=80",
        colors: [
            { name: "British Racing Green", hex: "#064e3b" },
            { name: "Midnight Navy", hex: "#1e3a8a" },
            { name: "Burgundy Wine", hex: "#7f1d1d" },
            { name: "Onyx Black", hex: "#18181b" }
        ]
    },
    {
        id: "VENT-POLO-08",
        title: "Raw-Hem Heavyweight Boxy Polo",
        category: "Streetwear Cuts",
        price: "₦24,000",
        usd: "$28",
        badge: "280GSM Boxy · Drop Shoulder",
        fabric: "280GSM Ultra-Heavy Piqué",
        desc: "Architectural boxy streetwear silhouette cut from ultra-heavy piqué cotton. Raw laser-cut hemline that curls subtly with wear without fraying.",
        img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=900&auto=format&fit=crop&q=80",
        embroideryImg: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=900&auto=format&fit=crop&q=80",
        collarImg: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=900&auto=format&fit=crop&q=80",
        colors: [
            { name: "Washed Olive", hex: "#3f4f34" },
            { name: "Charcoal Grey", hex: "#3f3f46" },
            { name: "Vintage White", hex: "#fafafa" },
            { name: "Pitch Black", hex: "#09090b" }
        ]
    },
    {
        id: "VENT-POLO-09",
        title: "Noir Tonal Stealth Custom Polo",
        category: "Triple Black Studio",
        price: "₦27,000",
        usd: "$31",
        badge: "Stealth Edition · Matte Black",
        fabric: "270GSM Mercerized Piqué",
        desc: "Triple-black edition featuring stealth matte embroidery, black dyed shell buttons, and Mercerized high-luster cotton yarn for formal and streetwear versatility.",
        img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&auto=format&fit=crop&q=80",
        embroideryImg: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=900&auto=format&fit=crop&q=80",
        collarImg: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&auto=format&fit=crop&q=80",
        colors: [
            { name: "Pitch Noir", hex: "#0a0a0a" },
            { name: "Matte Carbon", hex: "#18181b" },
            { name: "Gunmetal Slate", hex: "#262626" },
            { name: "Obsidian", hex: "#020617" }
        ]
    }
];

let currentPoloIndex = 0;
let currentColorName = "Onyx Black";
let currentSize = "L";
let currentAngle = "front";

function selectPolo(index) {
    if (index < 0 || index >= VENT_POLOS.length) return;
    currentPoloIndex = index;
    const polo = VENT_POLOS[index];

    // 1. Update Grid Cards Styling inside the Black Expanding Canvas
    const cards = document.querySelectorAll("#poloGridCards .polo-card");
    cards.forEach((card, idx) => {
        const badge = card.querySelector(".polo-active-badge");
        if (idx === index) {
            card.classList.remove("border-white/20");
            card.classList.add("border-2", "border-white", "shadow-lg", "ring-2", "ring-emerald-400");
            if (badge) badge.classList.remove("hidden");
        } else {
            card.classList.remove("border-2", "border-white", "shadow-lg", "ring-2", "ring-emerald-400");
            card.classList.add("border-white/20");
            if (badge) badge.classList.add("hidden");
        }
    });

    // 2. Update Spotlight Details
    const spotlightImg = document.getElementById("spotlightImg");
    if (spotlightImg) {
        spotlightImg.style.opacity = "0.3";
        setTimeout(() => {
            currentAngle = "front";
            spotlightImg.src = polo.img;
            spotlightImg.style.opacity = "1";
        }, 150);
    }

    // Reset Angle Buttons
    updateAngleButtons();

    // Update Text Fields
    const elId = document.getElementById("spotlightPoloId");
    const elTitle = document.getElementById("spotlightTitle");
    const elCategory = document.getElementById("spotlightCategory");
    const elPrice = document.getElementById("spotlightPrice");
    const elUsd = document.getElementById("spotlightUsd");
    const elBadge = document.getElementById("spotlightBadge");
    const elDesc = document.getElementById("spotlightDesc");
    const elSpecFabric = document.getElementById("specFabric");

    if (elId) elId.textContent = polo.id;
    if (elTitle) elTitle.textContent = polo.title;
    if (elCategory) elCategory.textContent = polo.category;
    if (elPrice) elPrice.textContent = polo.price;
    if (elUsd) elUsd.textContent = `(${polo.usd} USD)`;
    if (elBadge) elBadge.textContent = polo.badge;
    if (elDesc) elDesc.textContent = polo.desc;
    if (elSpecFabric) elSpecFabric.textContent = polo.fabric;

    // 3. Render Colorway Swatches
    renderColorwaySwatches(polo.colors);

    // 4. Update WhatsApp CTA Link
    updatePoloWhatsAppLink();

    // 5. Scroll smoothly to spotlight on mobile if needed
    if (window.innerWidth < 768) {
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
    const label = document.getElementById("selectedColorName");
    if (label) label.textContent = currentColorName;

    container.innerHTML = "";
    colors.forEach((color, idx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.title = color.name;
        btn.className = `w-8 h-8 rounded-full shadow-sm transition-transform hover:scale-110 ${idx === 0 ? "border-2 border-black ring-2 ring-black/20" : "border-2 border-neutral-300"}`;
        btn.style.backgroundColor = color.hex;
        btn.onclick = () => selectColorway(color.hex, color.name, btn);
        container.appendChild(btn);
    });
}

function selectColorway(hex, name, activeBtn) {
    currentColorName = name;
    const label = document.getElementById("selectedColorName");
    if (label) label.textContent = name;

    const allBtns = document.querySelectorAll("#colorwaySwatches button");
    allBtns.forEach(btn => {
        btn.className = "w-8 h-8 rounded-full border-2 border-neutral-300 shadow-sm transition-transform hover:scale-110";
    });
    if (activeBtn) {
        activeBtn.className = "w-8 h-8 rounded-full border-2 border-black ring-2 ring-black/20 shadow-sm transition-transform hover:scale-110";
    }

    updatePoloWhatsAppLink();
}

function selectSize(size) {
    currentSize = size;
    const buttons = document.querySelectorAll("#sizeSelectorPills .polo-size-btn");
    buttons.forEach(btn => {
        if (btn.textContent.trim() === size) {
            btn.className = "polo-size-btn py-2 rounded-lg border-2 border-black text-xs font-black bg-black text-white transition-all shadow-sm";
        } else {
            btn.className = "polo-size-btn py-2 rounded-lg border border-black/20 text-xs font-black bg-white hover:border-black transition-all";
        }
    });

    updatePoloWhatsAppLink();
}

function switchSpotlightAngle(angle) {
    currentAngle = angle;
    const polo = VENT_POLOS[currentPoloIndex];
    const spotlightImg = document.getElementById("spotlightImg");

    if (spotlightImg && polo) {
        spotlightImg.style.opacity = "0.3";
        setTimeout(() => {
            if (angle === "embroidery") {
                spotlightImg.src = polo.embroideryImg;
            } else if (angle === "collar") {
                spotlightImg.src = polo.collarImg;
            } else {
                spotlightImg.src = polo.img;
            }
            spotlightImg.style.opacity = "1";
        }, 120);
    }

    updateAngleButtons();
}

function updateAngleButtons() {
    const frontBtn = document.getElementById("angleFrontBtn");
    const embBtn = document.getElementById("angleEmbBtn");
    const collarBtn = document.getElementById("angleCollarBtn");

    const activeClasses = "px-3.5 py-1.5 rounded-full text-xs font-bold bg-black text-white transition-all shadow-sm";
    const inactiveClasses = "px-3.5 py-1.5 rounded-full text-xs font-bold bg-neutral-100 text-black hover:bg-neutral-200 transition-all";

    if (frontBtn) frontBtn.className = currentAngle === "front" ? activeClasses : inactiveClasses;
    if (embBtn) embBtn.className = currentAngle === "embroidery" ? activeClasses : inactiveClasses;
    if (collarBtn) collarBtn.className = currentAngle === "collar" ? activeClasses : inactiveClasses;
}

function updatePoloWhatsAppLink() {
    const polo = VENT_POLOS[currentPoloIndex];
    if (!polo) return;

    const customTextInput = document.getElementById("poloCustomTextInput");
    const customText = customTextInput ? customTextInput.value.trim() : "VENT 94";

    const message = `Hello Vent Collection, I would like to order the ${polo.title} (${polo.price}) in Size: ${currentSize}, Colorway: ${currentColorName}, Custom Monogram: "${customText}". Please provide order confirmation & payment details.`;
    const encoded = encodeURIComponent(message);

    const btn = document.getElementById("spotlightWhatsAppBtn");
    if (btn) {
        btn.href = `https://wa.me/2348000000000?text=${encoded}`;
    }
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
    // 1. Live Monogram Text binding
    const customInput = document.getElementById("poloCustomTextInput");
    const liveMonogram = document.getElementById("liveMonogramText");
    const liveContainer = document.getElementById("liveMonogramPreview");

    if (customInput && liveMonogram) {
        customInput.addEventListener("input", (e) => {
            const val = e.target.value.toUpperCase();
            if (val.trim().length > 0) {
                liveMonogram.textContent = val;
                if (liveContainer) liveContainer.style.opacity = "1";
            } else {
                liveMonogram.textContent = "VENT";
            }
            updatePoloWhatsAppLink();
        });
    }

    // 2. Select initial polo #0
    selectPolo(0);
});
