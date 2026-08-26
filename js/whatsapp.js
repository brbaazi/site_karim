/* =========================================================================
   whatsapp.js
   Everything related to WhatsApp ordering lives in this file.
   To change the company's WhatsApp number later, edit ONLY the constant
   below — every button on the site reads from this single source.
   ========================================================================= */

/* Format: country code + number, no spaces, no "+", no leading zero.
   Example for Morocco: 212661115643 (for 06 61 11 56 43) */
const WHATSAPP_NUMBER = "212661115643";

/**
 * Builds a wa.me link with a pre-filled, URL-encoded message.
 * @param {string} message
 * @returns {string}
 */
function buildWhatsAppLink(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

/**
 * Pre-filled message for a general / homepage contact button.
 */
function whatsappGeneralLink() {
  const message =
    "Bonjour STE BRAKE AUTO POIDS LOURD,\n\n" +
    "Je souhaite avoir des informations sur vos produits et services.\n\n" +
    "Merci.";
  return buildWhatsAppLink(message);
}

/**
 * Pre-filled message for ordering a specific product.
 * @param {{name:string, reference:string}} product
 */
function whatsappProductLink(product) {
  const message =
    `Bonjour STE BRAKE AUTO POIDS LOURD,\n\n` +
    `Je suis intéressé par le produit :\n${product.name}\n\n` +
    `Référence : ${product.reference}\n\n` +
    `Je voudrais connaître le prix et la disponibilité.\n\n` +
    `Merci.`;
  return buildWhatsAppLink(message);
}

/**
 * Pre-filled message for requesting a specific service.
 * @param {string} serviceTitle
 */
function whatsappServiceLink(serviceTitle) {
  const message =
    `Bonjour STE BRAKE AUTO POIDS LOURD,\n\n` +
    `Je souhaite un devis pour le service suivant :\n${serviceTitle}\n\n` +
    `Merci de me recontacter.`;
  return buildWhatsAppLink(message);
}

/**
 * Pre-filled message built from the contact form fields.
 * @param {{name:string, phone:string, subject:string, message:string}} data
 */
function whatsappContactFormLink(data) {
  const message =
    `Bonjour STE BRAKE AUTO POIDS LOURD,\n\n` +
    `Nom : ${data.name}\n` +
    `Téléphone : ${data.phone}\n` +
    `Sujet : ${data.subject}\n\n` +
    `Message :\n${data.message}`;
  return buildWhatsAppLink(message);
}

/**
 * Attaches the general WhatsApp link to every element carrying
 * [data-wa="general"] on the page (nav button, hero button, footer, etc.)
 */
function wireGeneralWhatsAppButtons() {
  document.querySelectorAll('[data-wa="general"]').forEach((el) => {
    el.setAttribute("href", whatsappGeneralLink());
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });
}

document.addEventListener("DOMContentLoaded", wireGeneralWhatsAppButtons);
