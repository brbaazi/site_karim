/* =========================================================================
   products.js
   Single source of truth for the product catalogue.

   TO ADD A NEW PRODUCT:
     1. Create a folder:  products/<slug>/  (copy an existing product
        folder such as products/disque-frein/ and rename it)
     2. Put 1-3 photos inside products/<slug>/images/
        (product-1.jpg, product-2.jpg, product-3.jpg)
     3. Add one object to the PRODUCTS array below.
   That's it — the homepage, the catalogue page (produits.html) and the
   product page itself all read from this one array automatically.
   ========================================================================= */

const PRODUCTS = [
  {
    name: "Garniture de frein P17",
    slug: "garniture-frein-p17",
    reference: "P17",
    category: "freins",
    categoryLabel: "Freins",
    image: "images/products/frein/garniture-frein-p17.jpg",
    gallery: ["images/product-1.jpg", "images/product-2.jpg", "images/product-3.jpg"],
    price: "Sur demande",
    description:
      "Garniture de frein haute résistance conçue pour les véhicules poids lourds. Offre un freinage stable, une usure régulière et une excellente tenue à la chaleur, même en usage intensif.",
    specs: {
      "Référence": "P17",
      "Catégorie": "Garnitures de frein",
      "Compatibilité": "Camions & remorques poids lourds",
      "Matériau": "Composite haute friction",
      "Garantie": "6 mois",
    },
    available: true,
  },
  {
    name: "Disque de frein renforcé",
    slug: "disque-frein",
    reference: "DF-320",
    category: "freins",
    categoryLabel: "Freins",
    image: "images/products/disques/disque-frein.jpg",
    gallery: ["images/product-1.jpg", "images/product-2.jpg", "images/product-3.jpg"],
    price: "Sur demande",
    description:
      "Disque de frein ventilé pour poids lourds, usiné avec précision pour une dissipation thermique optimale et une réduction du voile dans le temps.",
    specs: {
      "Référence": "DF-320",
      "Catégorie": "Disques de frein",
      "Diamètre": "320-410 mm (selon modèle)",
      "Type": "Ventilé",
      "Garantie": "6 mois",
    },
    available: true,
  },
  {
    name: "Tambour de frein",
    slug: "tambour-frein",
    reference: "TB-410",
    category: "freins",
    categoryLabel: "Freins",
    image: "images/products/tambours/tambour-frein.jpg",
    gallery: ["images/product-1.jpg", "images/product-2.jpg", "images/product-3.jpg"],
    price: "Sur demande",
    description:
      "Tambour de frein robuste, fabriqué pour supporter les charges lourdes et les cycles de freinage répétés des camions et remorques.",
    specs: {
      "Référence": "TB-410",
      "Catégorie": "Tambours de frein",
      "Compatibilité": "Essieux poids lourds",
      "Matériau": "Fonte traitée",
      "Garantie": "6 mois",
    },
    available: true,
  },
  {
    name: "Garniture d'embrayage",
    slug: "garniture-embrayage",
    reference: "EMB-08",
    category: "embrayages",
    categoryLabel: "Embrayages",
    image: "images/products/embrayage/garniture-embrayage.jpg",
    gallery: ["images/product-1.jpg", "images/product-2.jpg", "images/product-3.jpg"],
    price: "Sur demande",
    description:
      "Garniture d'embrayage conçue pour une transmission de puissance fiable sur véhicules poids lourds, avec une bonne résistance à l'usure et à la chaleur.",
    specs: {
      "Référence": "EMB-08",
      "Catégorie": "Garnitures d'embrayage",
      "Compatibilité": "Camions & tracteurs routiers",
      "Matériau": "Composite renforcé",
      "Garantie": "6 mois",
    },
    available: true,
  },
  {
    name: "Flexible de frein",
    slug: "flexible-frein",
    reference: "FLX-12",
    category: "flexibles",
    categoryLabel: "Flexibles",
    image: "images/products/flexibles/flexible-frein.jpg",
    gallery: ["images/product-1.jpg", "images/product-2.jpg", "images/product-3.jpg"],
    price: "Sur demande",
    description:
      "Flexible de frein renforcé, résistant à la haute pression, conçu pour garantir la sécurité du circuit de freinage sur poids lourds.",
    specs: {
      "Référence": "FLX-12",
      "Catégorie": "Flexibles de frein",
      "Pression max": "Haute pression hydraulique",
      "Matériau": "Tressé acier / caoutchouc technique",
      "Garantie": "3 mois",
    },
    available: false,
  },
];

const CATEGORY_LABELS = {
  freins: "Freins",
  embrayages: "Embrayages",
  flexibles: "Flexibles",
};

/* ---------------------------------------------------------------------- */
/* Data helpers                                                           */
/* ---------------------------------------------------------------------- */

function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug) || null;
}

function getProductsByCategory(category) {
  if (!category || category === "all") return PRODUCTS.slice();
  return PRODUCTS.filter((p) => p.category === category);
}

function getRelatedProducts(product, limit = 3) {
  return PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.category === product.category
  ).slice(0, limit);
}

/* Resolves an image path relative to the current page location.
   basePath: "" for root pages, "../../" for pages inside products/<slug>/ */
function resolveProductImage(product, basePath) {
  return basePath + product.image;
}

/* ---------------------------------------------------------------------- */
/* Rendering                                                               */
/* ---------------------------------------------------------------------- */

function productCardHTML(product, basePath = "") {
  const badge = product.available
    ? `<span class="product-badge in">En stock</span>`
    : `<span class="product-badge out">Sur commande</span>`;
  const catLabel = product.categoryLabel || CATEGORY_LABELS[product.category] || product.category;
  return `
    <article class="product-card" data-category="${product.category}">
      <a href="${basePath}products/${product.slug}/" class="product-thumb">
        <img src="${basePath}${product.image}" alt="${product.name} - ${product.reference}" loading="lazy">
        <span class="ref-tag">${product.reference}</span>
        ${badge}
      </a>
      <div class="product-body">
        <span class="product-cat">${catLabel}</span>
        <h3><a href="${basePath}products/${product.slug}/">${product.name}</a></h3>
        <span class="price">${product.price}</span>
        <a class="btn btn-whatsapp btn-block" target="_blank" rel="noopener"
           href="${whatsappProductLink(product)}">
          ${waIconSVG()} <span>Commander sur WhatsApp</span>
        </a>
      </div>
    </article>`;
}

function waIconSVG() {
  return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.09c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.13.11-1.82-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.17-4.94-4.36-.14-.2-1.19-1.58-1.19-3.01 0-1.43.75-2.13 1.02-2.42.26-.29.57-.36.76-.36h.55c.18 0 .42-.03.65.5.24.55.81 1.9.88 2.04.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.75 1.24 1.61 2 1.11.99 2.04 1.3 2.33 1.44.29.15.46.13.63-.05.17-.19.72-.84.92-1.13.19-.29.38-.24.63-.14.26.1 1.63.77 1.91.91.29.14.48.21.55.34.07.13.07.7-.17 1.38Z"/></svg>`;
}

function renderProductGrid(containerId, list, basePath = "") {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!list.length) {
    el.innerHTML = `<div class="empty-state">Aucun produit dans cette catégorie pour le moment.</div>`;
    return;
  }
  el.innerHTML = list.map((p) => productCardHTML(p, basePath)).join("");
}

/* ---------------------------------------------------------------------- */
/* Page controllers                                                       */
/* ---------------------------------------------------------------------- */

/* Homepage: featured products (first N) */
function initFeaturedProducts(containerId = "featured-products", count = 3) {
  renderProductGrid(containerId, PRODUCTS.slice(0, count), "");
}

/* produits.html: full catalogue with category filters */
function initCatalogPage(containerId = "catalog-grid") {
  const grid = document.getElementById(containerId);
  if (!grid) return;

  const params = new URLSearchParams(window.location.search);
  let activeCategory = params.get("categorie") || "all";

  const filterButtons = document.querySelectorAll(".filter-btn");

  function applyFilter(category) {
    activeCategory = category;
    filterButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.category === category);
    });
    renderProductGrid(containerId, getProductsByCategory(category), "");
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => applyFilter(btn.dataset.category));
  });

  applyFilter(activeCategory);
}

/* products/<slug>/index.html: single product page, driven by data-slug on <body> */
function initProductPage() {
  const slug = document.body.getAttribute("data-slug");
  const product = getProductBySlug(slug);
  const basePath = "../../";

  if (!product) {
    const main = document.querySelector("main");
    if (main) {
      main.innerHTML = `<div class="container section"><h1>Produit introuvable</h1>
        <p><a href="${basePath}produits.html">Retour au catalogue</a></p></div>`;
    }
    return;
  }

  document.title = `${product.name} | STE BRAKE AUTO POIDS LOURD`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", product.description.slice(0, 155));

  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };
  const setHTML = (id, html) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  };

  setText("pd-name", product.name);
  setText("pd-category", product.categoryLabel || product.category);
  setText("pd-reference-tag", `Réf. ${product.reference}`);
  setText("pd-price", product.price);
  setText("pd-description", product.description);
  setText("breadcrumb-current", product.name);

  const availEl = document.getElementById("pd-availability");
  if (availEl) {
    availEl.textContent = product.available ? "Disponible en stock" : "Disponible sur commande";
    availEl.className = "pd-avail " + (product.available ? "in" : "out");
  }

  // Gallery
  const images = (product.gallery || []).map((g) => basePath + "products/" + product.slug + "/" + g);
  const mainImg = document.getElementById("pd-main-image");
  const thumbsWrap = document.getElementById("pd-thumbs");
  if (mainImg && images.length) {
    mainImg.src = images[0];
    mainImg.alt = product.name;
  }
  if (thumbsWrap && images.length) {
    thumbsWrap.innerHTML = images
      .map(
        (src, i) =>
          `<button type="button" class="${i === 0 ? "active" : ""}" data-src="${src}">
             <img src="${src}" alt="${product.name} - vue ${i + 1}" loading="lazy">
           </button>`
      )
      .join("");
    thumbsWrap.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        mainImg.src = btn.dataset.src;
        thumbsWrap.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  }

  // Specs table
  const specsBody = document.getElementById("pd-specs");
  if (specsBody && product.specs) {
    specsBody.innerHTML = Object.entries(product.specs)
      .map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`)
      .join("");
  }

  // WhatsApp CTA
  const waBtn = document.getElementById("pd-whatsapp-btn");
  if (waBtn) {
    waBtn.href = whatsappProductLink(product);
    waBtn.target = "_blank";
    waBtn.rel = "noopener";
  }

  // Related products
  const related = getRelatedProducts(product);
  renderProductGrid("related-products", related, basePath);
}
