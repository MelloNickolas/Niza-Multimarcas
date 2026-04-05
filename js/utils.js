/* ============================================================
   NIZA MULTIMARCAS — utils.js
   Funções compartilhadas por todas as páginas
   ============================================================ */

// ── HEADER SCROLL ──────────────────────────────────────────
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ── MENU MOBILE ────────────────────────────────────────────
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.nav-mobile');
  if (!toggle || !mobileNav) return;
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
  // fecha ao clicar em link
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });
}

// ── ACTIVE NAV LINK ────────────────────────────────────────
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// ── SCROLL FADE-UP ─────────────────────────────────────────
function initScrollReveal() {
  const els = document.querySelectorAll('.fade-up');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));
}

// ── FORMATAR PREÇO ─────────────────────────────────────────
function formatPrice(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  }).format(value);
}

// ── FORMATAR KM ────────────────────────────────────────────
function formatKm(value) {
  return new Intl.NumberFormat('pt-BR').format(value) + ' km';
}

// ── RENDER CARD DE VEÍCULO ─────────────────────────────────
function renderVehicleCard(v) {
  const img = v.galeria && v.galeria.length > 0
    ? `<img src="${v.galeria[0]}" alt="${v.nome}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'card-img-placeholder\\'>🚗</div>'">`
    : `<div class="card-img-placeholder">🚗</div>`;

  return `
  <article class="vehicle-card fade-up" onclick="window.location.href='veiculo.html?id=${v.id}'">
    <div class="card-img-wrap">
      ${img}
      <span class="card-badge">${v.tipo}</span>
    </div>
    <div class="card-body">
      <div class="card-year-brand">${v.ano} · ${v.marca}</div>
      <h3 class="card-name">${v.nome}</h3>
      <div class="card-specs">
        <span class="card-spec"><span class="spec-icon">⚙</span>${v.cambio}</span>
        <span class="card-spec"><span class="spec-icon">⛽</span>${v.combustivel}</span>
        <span class="card-spec"><span class="spec-icon">📍</span>${formatKm(v.km)}</span>
      </div>
      <div class="card-footer">
        <div class="card-price">${formatPrice(v.preco)}</div>
        <span class="card-cta">Ver mais →</span>
      </div>
    </div>
  </article>`;
}

// ── CARREGAR VEÍCULOS DO JSON ──────────────────────────────
async function loadVehicles() {
  try {
    const res = await fetch('data/veiculos.json');
    if (!res.ok) throw new Error('Falha ao carregar veículos');
    return await res.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}

// ── GET PARAMS DA URL ──────────────────────────────────────
function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    id:       params.get('id'),
    precoMin: params.get('precoMin'),
    precoMax: params.get('precoMax'),
    anoMin:   params.get('anoMin'),
    anoMax:   params.get('anoMax'),
    tipo:     params.get('tipo'),
    busca:    params.get('busca'),
  };
}

// ── INIT GLOBAL ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  setActiveNav();
  initScrollReveal();
});
