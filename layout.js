/* =====================================================================
   Le coeur de Melly — Header + Footer injection + comportements communs
   ===================================================================== */
(function () {
  const body = document.body;
  const currentGroup = body.dataset.group || '';
  const isSubpage = location.pathname.includes('/pages/');
  const root = isSubpage ? '../' : '';
  const pageRoot = isSubpage ? '' : 'pages/';

  /* --- Logo (carré tourné avec CM) --- */
  const LOGO_HTML = `<span class="mark"><span>CM</span></span>`;

  /* --- Menu data (avec dropdowns) --- */
  const MENU = [
    { key:'ecole', label:"L'École", href:'#apropos',
      items:[
        { href:'histoire.html', title:'Notre histoire', desc:"L'aventure de l'école depuis sa création.",
          icon:'<path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><circle cx="9" cy="7" r="4"/>' },
        { href:'mot-directrice.html', title:'Mot de la Directrice', desc:"Vision, valeurs et engagement de la direction.",
          icon:'<path d="M12 3v18M3 6h18M6 6l-3 8a4 4 0 0 0 6 0zM18 6l-3 8a4 4 0 0 0 6 0z"/>' },
        { href:'projet-educatif.html', title:'Projet éducatif', desc:"Nos priorités pédagogiques et éducatives.",
          icon:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>' },
        { href:'equipe.html', title:'Notre équipe', desc:"Direction, enseignants et personnel.",
          icon:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>' },
        { href:'valeurs.html', title:'Nos valeurs', desc:"Exigence, bienveillance et ouverture.",
          icon:'<path d="M12 21s-8-4.5-8-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.5-8 11-8 11z"/>' }
      ]},
    { key:'cycles', label:'Cycles', href:'#cycles',
      items:[
        { href:'maternelle.html', title:'Maternelle', desc:"De 3 à 6 ans — éveil, langage et jeu.",
          icon:'<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>' },
        { href:'primaire.html', title:'Primaire', desc:"De 6 à 11 ans — les fondamentaux solides.",
          icon:'<path d="M4 19V5a2 2 0 0 1 2-2h13v16"/><path d="M20 22H6a2 2 0 0 1 0-4h14z"/>' },
        { href:'college.html', title:'Collège', desc:"De 11 à 15 ans — méthode et orientation.",
          icon:'<path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/>' },
        { href:'lycee.html', title:'Lycée', desc:"De 15 à 18 ans — vers le baccalauréat.",
          icon:'<path d="M2 7l10 6 10-6-10-6L2 7z"/><path d="M6 10v6c0 1.5 3 3 6 3s6-1.5 6-3v-6"/><path d="M22 7v8"/>' }
      ]},
    { key:'vie', label:'Vie scolaire', href:'#vie',
      items:[
        { href:'bibliotheque.html', title:'Bibliothèque & CDI', desc:"15 000 ouvrages et espaces de travail.",
          icon:'<path d="M4 19V5a2 2 0 0 1 2-2h13v16"/><path d="M20 22H6a2 2 0 0 1 0-4h14z"/>' },
        { href:'laboratoires.html', title:'Laboratoires', desc:"Physique, chimie et biologie.",
          icon:'<path d="M9 3v6l-5 9a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-5-9V3"/><path d="M7 3h10"/>' },
        { href:'numerique.html', title:'Numérique & Robotique', desc:"Code, robotique et outils digitaux.",
          icon:'<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>' },
        { href:'sport.html', title:'Sport', desc:"Terrain multisport et compétitions.",
          icon:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>' },
        { href:'arts-culture.html', title:'Arts & Culture', desc:"Théâtre, musique et arts plastiques.",
          icon:'<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2a10 10 0 0 0 0 20c1 0 1.5-1 1.5-2 0-.5-.5-1-.5-1.5 0-1 .5-1.5 2-1.5h1a6 6 0 0 0 6-6c0-5-4.5-9-10-9z"/>' },
        { href:'restauration.html', title:'Restauration', desc:"Repas équilibrés préparés sur place.",
          icon:'<path d="M3 2v7c0 1 1 2 2 2h1v11h2V11h1c1 0 2-1 2-2V2M15 2v20h2v-7c2 0 3-1 3-3V5c0-2-1-3-3-3z"/>' }
      ]},
    { key:'actus', label:'Actualités', href:'#actus',
      items:[
        { href:'actualites.html', title:'Actualités', desc:"Toute l'actualité de l'école.",
          icon:'<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>' },
        { href:'evenements.html', title:'Événements', desc:"Forums, sorties et rentrées.",
          icon:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>' },
        { href:'galerie.html', title:'Galerie photos', desc:"La vie de l'école en images.",
          icon:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>' },
        { href:'videos.html', title:'Vidéos', desc:"Reportages et souvenirs en vidéo.",
          icon:'<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>' }
      ]},
    { key:'admissions', label:'Admissions', href:'#admissions',
      items:[
        { href:'procedure.html', title:'Procédure', desc:"Les 4 étapes d'une inscription réussie.",
          icon:'<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>' },
        { href:'frais-scolarite.html', title:'Frais de scolarité', desc:"Tarifs, paiement et bourses.",
          icon:'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>' },
        { href:'portes-ouvertes.html', title:'Portes ouvertes', desc:"Venez visiter l'école en famille.",
          icon:'<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>' },
        { href:'inscription.html', title:'Inscription en ligne', desc:"Déposer un dossier en quelques minutes.",
          icon:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>' }
      ]},
    { key:'contact', label:'Contact', href:'#contact',
      items:[
        { href:'contact.html', title:'Nous contacter', desc:"Formulaire, coordonnées et horaires.",
          icon:'<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><polyline points="22,6 12,13 2,6"/>' },
        { href:'acces.html', title:'Plan d\'accès', desc:"Comment venir à l'école.",
          icon:'<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>' },
        { href:'horaires.html', title:'Horaires', desc:"Emplois du temps et calendrier.",
          icon:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>' }
      ]}
  ];

  /* --- Construction du HTML des menus --- */
  const desktopItems = MENU.map(m => {
    const active = currentGroup === m.key ? ' active' : '';
    const items = m.items.map(it => `
      <li><a href="${pageRoot}${it.href}">
        <span class="dd-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${it.icon}</svg></span>
        <span class="dd-txt"><b>${it.title}</b><span>${it.desc}</span></span>
      </a></li>`).join('');
    return `
      <li class="nav-item${active}">
        <a href="${isSubpage ? root + 'index.html' : ''}${m.href}">${m.label}
          <svg class="caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </a>
        <div class="dropdown-panel"><div class="dropdown-inner"><ul>${items}</ul></div></div>
      </li>`;
  }).join('');

  const mobileItems = MENU.map((m, idx) => {
    const items = m.items.map(it => `<a href="${pageRoot}${it.href}">${it.title}</a>`).join('');
    return `
      <button class="mobile-dropdown-btn" data-target="mob-${idx}">${m.label}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="mobile-submenu" id="mob-${idx}">${items}</div>`;
  }).join('');

  const headerHTML = `
    <header id="hd">
      <div class="wrap bar">
        <a href="${isSubpage ? root + 'index.html' : '#accueil'}" class="logo" aria-label="Le coeur de Melly">
          ${LOGO_HTML}
          <span>Le coeur de Melly<small>École privée · Maternelle → Lycée</small></span>
        </a>
        <button class="burger" id="bg" aria-label="Ouvrir le menu" aria-expanded="false">☰</button>
        <nav class="desktop-nav" aria-label="Navigation principale"><ul>${desktopItems}</ul></nav>
        <a href="${pageRoot}inscription.html" class="btn gold btn-header">Inscrire mon enfant</a>
      </div>
      <div id="mobileMenu" class="mobile-menu">
        <a href="${isSubpage ? root + 'index.html' : '#accueil'}">Accueil</a>
        ${mobileItems}
      </div>
    </header>`;

  const footerHTML = `
    <footer>
      <div class="wrap">
        <div class="grid">
          <div>
            <div class="brand">
              <span class="mark"><span>CM</span></span>
              <b>Le coeur de Melly<small>École privée · Maternelle → Lycée</small></b>
            </div>
            <p style="color:#9cafa4;font-size:.88rem;line-height:1.7;max-width:340px">Une école privée exigeante et bienveillante, qui accompagne chaque enfant de la maternelle à la terminale, à Brazzaville.</p>
          </div>
          <div>
            <h4>L'École</h4>
            <ul>
              <li><a href="${pageRoot}histoire.html">Notre histoire</a></li>
              <li><a href="${pageRoot}mot-directrice.html">Mot de la Directrice</a></li>
              <li><a href="${pageRoot}projet-educatif.html">Projet éducatif</a></li>
              <li><a href="${pageRoot}equipe.html">Notre équipe</a></li>
              <li><a href="${pageRoot}valeurs.html">Nos valeurs</a></li>
            </ul>
          </div>
          <div>
            <h4>Cycles</h4>
            <ul>
              <li><a href="${pageRoot}maternelle.html">Maternelle</a></li>
              <li><a href="${pageRoot}primaire.html">Primaire</a></li>
              <li><a href="${pageRoot}college.html">Collège</a></li>
              <li><a href="${pageRoot}lycee.html">Lycée</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>12 avenue de l'Éducation, Brazzaville</li>
              <li>+242 00 000 0000</li>
              <li>contact@lecoeurdemelly.edu</li>
              <li>Lun–Ven · 7h30 – 16h30</li>
            </ul>
          </div>
        </div>
        <div class="bottom">
          <span>© 2026 École Le coeur de Melly — Tous droits réservés</span>
          <span>
            <a href="#">Mentions légales</a>
            <a href="#">Règlement intérieur</a>
            <a href="${pageRoot}contact.html">Contact</a>
          </span>
        </div>
      </div>
    </footer>`;

  /* --- Injection --- */
  const hs = document.getElementById('arcons-header');
  const fs = document.getElementById('arcons-footer');
  if (hs) hs.innerHTML = headerHTML;
  if (fs) fs.innerHTML = footerHTML;

  /* --- Header + menu mobile --- */
  const hd = document.getElementById('hd');
  const bg = document.getElementById('bg');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hd && bg) {
    const checkScroll = () => hd.classList.toggle('solid', scrollY > 40);
    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();

    bg.onclick = () => {
      const open = mobileMenu.classList.toggle('open');
      hd.classList.toggle('menu-open', open);
      bg.setAttribute('aria-expanded', open);
      bg.textContent = open ? '✕' : '☰';
    };

    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hd.classList.remove('menu-open');
        bg.textContent = '☰';
      });
    });

    document.querySelectorAll('.mobile-dropdown-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = document.getElementById(btn.dataset.target);
        if (!target) return;
        const open = target.classList.toggle('open');
        btn.classList.toggle('open', open);
      });
    });
  }

  /* --- Reveal animations (.rv) --- */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .12, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.rv').forEach(e => io.observe(e));

  /* --- Formulaire --- */
  const fm = document.getElementById('fm');
  if (fm) {
    fm.addEventListener('submit', e => {
      e.preventDefault();
      const ok = document.getElementById('ok');
      if (ok) {
        ok.style.display = 'block';
        setTimeout(() => ok.style.display = 'none', 6000);
      }
      fm.reset();
    });
  }

  /* =====================================================================
     EFFET MACHINE À ÉCRIRE SUR LES TITRES
     ===================================================================== */
  function typeEffect(el, speed, delay) {
    if (!el || el.dataset.typed === 'true') return;
    el.dataset.typed = 'true';
    const originalHTML = el.innerHTML;
    const text = el.textContent.trim();
    if (!text) return;
    el.textContent = '';
    el.classList.add('type', 'typing');
    let i = 0;
    setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          el.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(interval);
          el.classList.remove('typing');
          el.classList.add('done');
          setTimeout(() => {
            el.innerHTML = originalHTML;
            el.classList.remove('type', 'done');
          }, 400);
        }
      }, speed);
    }, delay);
  }

  document.querySelectorAll('.page-hero h1').forEach((h1, i) => {
    typeEffect(h1, 45, 300 + i * 200);
  });
})();