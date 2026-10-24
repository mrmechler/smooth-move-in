(() => {
  'use strict';
  const config = window.SMOOTHMOVE_CONFIG || { insuranceQuoteUrl: '', perks: [] };
  const symbol = name => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('icon');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', '#' + name);
    svg.append(use); return svg;
  };
  const externalUrl = url => typeof url === 'string' && /^https:\/\/[^\s]+$/i.test(url);
  const insuranceUrl = externalUrl(config.insuranceQuoteUrl) ? config.insuranceQuoteUrl : '';
  const modal = document.getElementById('insurance-modal'); let lastFocus;
  function showInsurance(e) {
    if (insuranceUrl) { window.open(insuranceUrl, '_blank', 'noopener,noreferrer'); return; }
    lastFocus = e.currentTarget;
    modal.hidden = false; document.body.classList.add('modal-open');
    document.getElementById('modal-close').focus();
  }
  function hideInsurance() {
    modal.hidden = true; document.body.classList.remove('modal-open'); lastFocus?.focus();
  }
  document.querySelectorAll('[data-insurance]').forEach(el => el.addEventListener('click', showInsurance));
  document.getElementById('modal-close').addEventListener('click', hideInsurance);
  document.getElementById('modal-done').addEventListener('click', hideInsurance);
  modal.addEventListener('click', e => { if (e.target === modal) hideInsurance(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) hideInsurance(); });

  const menu = document.getElementById('site-nav'); const menuToggle = document.getElementById('menu-toggle');
  function closeMenu() { menu.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false'); menuToggle.setAttribute('aria-label','Open menu'); }
  menuToggle.addEventListener('click', () => {
    const open = !menu.classList.contains('open'); menu.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.setAttribute('aria-label',open?'Close menu':'Open menu');
  });
  menu.querySelectorAll('a').forEach(el => el.addEventListener('click', closeMenu));
  document.addEventListener('click', e => { if (!menu.contains(e.target) && !menuToggle.contains(e.target)) closeMenu(); });

  const grid = document.getElementById('perks-grid');
  for (const perk of (Array.isArray(config.perks) ? config.perks : [])) {
    if (perk.enabled === false || !externalUrl(perk.url)) continue;
    const tile = document.createElement('article'); tile.className = 'perk-card';
    tile.dataset.partner = perk.id === 'inkind' ? 'inkind' : (perk.id === 'tmobile' ? 'tmobile' : 'other');
    const art = document.createElement('div'); art.className = 'perk-art';
    if (typeof perk.logo === 'string' && /^assets\/[a-z0-9_-]+\.(png|webp|jpg|jpeg|svg)$/i.test(perk.logo)) {
      const logo = document.createElement('img');
      logo.className = 'perk-logo';
      logo.src = perk.logo;
      logo.alt = perk.title + ' logo';
      logo.loading = 'lazy';
      logo.decoding = 'async';
      art.append(logo);
    } else {
      const wordmark = document.createElement('strong');
      wordmark.className = 'perk-wordmark';
      wordmark.textContent = perk.title;
      art.append(wordmark);
    }
    const content = document.createElement('div'); content.className = 'perk-body';
    const category = document.createElement('span'); category.className = 'perk-category'; category.textContent = perk.category || 'Partner offer';
    const name = document.createElement('h3'); name.textContent = perk.title;
    const description = document.createElement('p'); description.textContent = perk.subtitle || '';
    const a = document.createElement('a'); a.className = 'perk-link'; a.href = perk.url; a.target='_blank'; a.rel='noopener noreferrer sponsored';
    a.append(document.createTextNode(perk.button || 'View Offer')); a.append(symbol('arrow-up'));
    content.append(category, name, description, a); tile.append(art, content); grid.append(tile);
  }
  if (!grid.children.length) {
    const empty = document.createElement('p'); empty.textContent = 'New offers are on the way.'; grid.append(empty);
  }
  if (typeof window.impactStat === 'function') window.impactStat('transformLinks');

  const checklists = {
    buying: [
      'Confirm closing and key pickup', 'Arrange utilities and internet', 'Review homeowners insurance',
      'Schedule movers and delivery', 'Update your mailing address', 'Pack a first-night essentials bag',
      'Check locks, smoke alarms, and emergency contacts'
    ],
    renting: [
      'Confirm lease and move-in instructions', 'Arrange utilities and internet', 'Review renters insurance',
      'Schedule movers and delivery', 'Update your mailing address', 'Photograph the property at move-in',
      'Pack a first-night essentials bag'
    ]
  };
  const list = document.getElementById('checklist-items');
  const save = document.getElementById('save-list');
  function setMode(mode) {
    if (!(mode in checklists)) return;
    document.querySelectorAll('[data-mode]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.mode === mode)));
    list.replaceChildren();
    checklists[mode].forEach(label => { const li = document.createElement('li'); li.textContent = label; list.append(li); });
    save.href = `assets/checklist-${mode}.png`;
    save.download = `SmoothMove-${mode === 'buying' ? 'Buying' : 'Renting'}-Checklist.png`;
  }
  document.querySelectorAll('[data-mode]').forEach(el => el.addEventListener('click', () => setMode(el.dataset.mode)));
  document.getElementById('print-list').addEventListener('click', () => window.print());
  document.getElementById('year').textContent = new Date().getFullYear();
  setMode('buying');
})();
