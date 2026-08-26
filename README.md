# STE BRAKE AUTO POIDS LOURD — Site web

Site vitrine + catalogue produits pour **STE BRAKE AUTO POIDS LOURD S.A.R.L**,
spécialiste des pièces de freinage et d'embrayage pour véhicules poids lourds
(Khouribga, Maroc).

Le site est construit en **HTML5 / CSS3 / JavaScript vanilla uniquement**
(aucun framework, aucun backend) et fonctionne directement sur **GitHub Pages**.

Parcours principal : **Accueil → Produits → Fiche produit → Commander sur
WhatsApp**. Le site n'a pas de paiement en ligne : c'est un catalogue qui
convertit vers WhatsApp.

---

## 1. Structure du projet

```text
ste-brake-auto/
├── index.html            Accueil
├── produits.html         Catalogue (avec filtres par catégorie)
├── services.html         Services / atelier
├── a-propos.html         À propos + informations légales
├── contact.html          Contact (formulaire, carte, horaires)
├── css/style.css         Toute la mise en forme du site
├── js/
│   ├── whatsapp.js       Numéro WhatsApp + génération des liens de commande
│   ├── products.js       Données produits + affichage des grilles/fiches
│   └── main.js           Menu mobile, formulaire, comportements globaux
├── images/                Logo, hero, icônes de catégories, images produits
└── products/               Un dossier par produit (fiche détaillée)
    ├── garniture-frein-p17/
    ├── disque-frein/
    ├── tambour-frein/
    ├── garniture-embrayage/
    └── flexible-frein/
```

> **Note sur les images :** aucune photo réelle de l'entreprise n'a été
> fournie au moment de la création du site. Toutes les images (logo, hero,
> icônes, photos produits) sont des illustrations techniques générées,
> dans un style "plan technique" cohérent avec l'identité de l'entreprise.
> Remplacez-les par vos vraies photos dès que possible (voir section 6).

---

## 2. Lancer le site en local

Aucune installation n'est nécessaire. Deux options :

**Option A — ouvrir directement le fichier**
Double-cliquez sur `index.html`. Cela fonctionne, mais certains navigateurs
bloquent parfois le chargement de fichiers locaux (`file://`).

**Option B — petit serveur local (recommandé)**
Depuis le dossier du projet :

```bash
# Avec Python (déjà installé sur la plupart des systèmes)
python3 -m http.server 8000
```

Puis ouvrez `http://localhost:8000` dans votre navigateur.

---

## 3. Ajouter un nouveau produit

Toutes les informations produits sont centralisées dans **`js/products.js`**,
dans le tableau `PRODUCTS`. Vous n'avez jamais besoin de modifier
`produits.html` directement.

**Étapes :**

1. Créez un nouveau dossier dans `products/`, par exemple
   `products/plateau-embrayage/` (copiez un dossier existant, par exemple
   `products/disque-frein/`, et renommez-le — cela copie aussi la structure
   de la page HTML et le dossier `images/`).
2. Placez 1 à 3 photos dans `products/plateau-embrayage/images/`
   (`product-1.jpg`, `product-2.jpg`, `product-3.jpg`).
3. Ajoutez aussi une image "vignette" pour le catalogue dans
   `images/products/<categorie>/`.
4. Ouvrez `js/products.js` et ajoutez un nouvel objet dans le tableau
   `PRODUCTS` :

```javascript
{
  name: "Plateau d'embrayage",
  slug: "plateau-embrayage",          // doit correspondre au nom du dossier
  reference: "PL-22",
  category: "embrayages",             // "freins" | "embrayages" | "flexibles"
  categoryLabel: "Embrayages",
  image: "images/products/embrayage/plateau-embrayage.jpg",
  gallery: ["images/product-1.jpg", "images/product-2.jpg", "images/product-3.jpg"],
  price: "Sur demande",
  description: "Description du produit...",
  specs: {
    "Référence": "PL-22",
    "Catégorie": "Plateaux d'embrayage",
    "Compatibilité": "Camions poids lourds",
    "Garantie": "6 mois",
  },
  available: true,
},
```

5. Dans le nouveau fichier `products/plateau-embrayage/index.html`, changez
   simplement l'attribut `data-slug="plateau-embrayage"` sur la balise
   `<body>` (et idéalement le `<title>` / `<meta description>` pour le SEO).
   Tout le reste (image, prix, description, disponibilité, bouton WhatsApp,
   produits similaires) est rempli **automatiquement** par le script.

C'est tout — le produit apparaît désormais sur la page d'accueil (s'il fait
partie des premiers du tableau), sur `produits.html`, et possède sa propre
fiche détaillée.

**Pour supprimer un produit :** supprimez son objet dans `PRODUCTS` (le
dossier peut rester sur le disque sans être lié depuis le site).

**Pour modifier un produit :** modifiez directement son objet dans
`PRODUCTS` (prix, description, disponibilité, etc.) — la mise à jour
s'applique partout automatiquement.

---

## 4. Changer le numéro WhatsApp

Tout le système de commande WhatsApp est centralisé dans **`js/whatsapp.js`**.
Il suffit de changer **une seule ligne** :

```javascript
const WHATSAPP_NUMBER = "212661115643";
```

Format attendu : indicatif pays + numéro, sans "+", sans espace, sans le 0
initial. Exemple pour `06 61 11 56 43` → `212661115643`.

Tous les boutons WhatsApp du site (header, hero, fiches produits, services,
formulaire de contact, bouton flottant) utilisent automatiquement ce numéro.

---

## 5. Changer les informations de l'entreprise

Les coordonnées et informations légales apparaissent à plusieurs endroits
(en-tête, pied de page, page Contact, page À propos). Elles ne sont **pas**
centralisées dans un fichier de configuration : il faut les modifier
directement dans les fichiers `.html` concernés (recherchez le texte à
remplacer, par exemple avec `Ctrl+F` dans votre éditeur) :

- Téléphones : `06 61 11 56 43`, `06 64 30 13 56` (aussi présents comme liens
  `tel:+212...`)
- Email : `societebrakeautopoidslourd@gmail.com`
- Adresse : `N°77, Bd Moukawama, Hay El-Fath, Khouribga`
- Informations légales (page `a-propos.html` et pied de page de chaque
  page) : IF, Patente, RC, ICE

Astuce : la plupart des éditeurs de code (VS Code, Sublime Text...)
proposent une fonction "Rechercher / Remplacer dans tous les fichiers", ce
qui permet de changer une information partout en une seule opération.

---

## 6. Remplacer les images par vos vraies photos

Gardez exactement les mêmes noms de fichiers pour ne rien casser :

- Logo : `images/logo/logo.png`
- Image d'accueil (hero) : `images/hero/hero-truck.jpg`
- Icônes de catégories : `images/icons/cat-*.jpg`
- Photos produits (vignette catalogue) : `images/products/<categorie>/<slug>.jpg`
- Photos produits (fiche détaillée) : `products/<slug>/images/product-1.jpg`, `product-2.jpg`, `product-3.jpg`

Le favicon (icône d'onglet) se trouve dans `images/icons/favicon-*.png` —
régénérez-le à partir de votre logo définitif si besoin.

---

## 7. Déployer sur GitHub Pages

1. Créez un nouveau dépôt GitHub (par exemple `ste-brake-auto`).
2. Poussez tout le contenu de ce dossier à la racine du dépôt :

```bash
git init
git add .
git commit -m "Site STE BRAKE AUTO POIDS LOURD"
git branch -M main
git remote add origin https://github.com/<votre-utilisateur>/ste-brake-auto.git
git push -u origin main
```

3. Sur GitHub : **Settings → Pages → Source**, sélectionnez la branche
   `main` et le dossier `/ (root)`, puis enregistrez.
4. Après quelques minutes, le site sera disponible à l'adresse :
   `https://<votre-utilisateur>.github.io/ste-brake-auto/`

Tous les chemins du site sont **relatifs** (`./css/...`, `../../images/...`),
il n'y a donc rien à modifier pour que cela fonctionne sur GitHub Pages.

---

## 8. Vérifications effectuées

- Tous les liens internes et chemins d'images ont été vérifiés
  automatiquement (aucun lien cassé).
- Le site a été testé visuellement en résolution desktop et mobile.
- Aucune donnée du formulaire de contact n'est stockée ou envoyée à un
  serveur : le formulaire prépare uniquement un message WhatsApp.

---

## 9. Support technique

Pour toute question technique sur la structure du code, référez-vous aux
commentaires présents en haut de chaque fichier JavaScript
(`js/whatsapp.js`, `js/products.js`, `js/main.js`).
