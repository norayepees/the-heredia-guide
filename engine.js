/* =====================================================================
   THE HEREDIA GUIDE — shared engine
   Reads the global CONFIG object (defined in each building's config.js)
   and I18N (shared) and renders the whole page. Nothing here should
   need editing per building — only config.js changes.
===================================================================== */
(function(){
  "use strict";

  function detectLang(){
    const nav = (navigator.language || "en").toLowerCase();
    const saved = sessionStorage.getItem('heredia_lang'); // clears itself when the tab closes — not tracking, just convenience during the visit
    if (saved === 'es' || saved === 'en') return saved;
    return nav.startsWith('es') ? 'es' : 'en';
  }
  let LANG = detectLang();

  function t(key){ return (I18N[key] && I18N[key][LANG]) || key; }
  function tt(pair){ return pair ? (pair[LANG] || pair.en || "") : ""; }

  function haversineWalkMin(lat, lng){
    if (lat == null || lng == null) return null;
    const R=6371000, toRad=d=>d*Math.PI/180;
    const b = CONFIG.building;
    const dLat=toRad(lat-b.lat), dLng=toRad(lng-b.lng);
    const a=Math.sin(dLat/2)**2+Math.cos(toRad(b.lat))*Math.cos(toRad(lat))*Math.sin(dLng/2)**2;
    const dist=R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))*1.3; // street-grid correction
    return Math.max(1, Math.round(dist/80)); // ~80m/min walking pace
  }
  function mapsUrl(p){
    if (p.link) return p.link;
    if (p.place_id) return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name||'')}&query_place_id=${p.place_id}`;
    return `https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`;
  }
  function esc(s){ return (s||"").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  // A single "go to maps" pill — always has a visible text label (not emoji-only), per accessibility requirement
  function goBtn(p){
    return `<a class="pill-btn go" target="_blank" rel="noopener noreferrer" href="${mapsUrl(p)}">🗺️ ${t('open_maps')}</a>`;
  }

  function poiCard(p, opts={}){
    const walk = opts.showWalk!==false ? haversineWalkMin(p.lat, p.lng) : null;
    const meta = [];
    if (walk) meta.push(`🚶 ${walk} ${t('walk_min')}`);
    if (p.metaExtra) meta.push(tt(p.metaExtra));
    return `<div class="card poi-card reveal">
      ${p.img ? `<img src="${esc(p.img)}" alt="${esc(p.imgAlt ? tt(p.imgAlt) : p.name)}" loading="lazy">` : ""}
      <div class="info">
        <h3>${p.ico?p.ico+' ':''}${esc(p.name)}</h3>
        ${meta.length?`<div class="meta">${meta.join(' · ')}</div>`:''}
        ${p.note ? `<p>${esc(tt(p.note))}</p>` : ''}
      </div>
      <div class="go">${goBtn(p)}</div>
    </div>`;
  }

  function noraCard(p){
    if (p.enabled === false) return "";
    return `<div class="nora-card reveal">
      <div class="kicker">${esc(tt(p.kicker))}</div>
      <h3>${p.ico?p.ico+' ':''}${esc(p.name)}</h3>
      ${p.quote ? `<p>“${esc(tt(p.quote))}”</p>` : ''}
      <div class="meta">${(() => { const w=haversineWalkMin(p.lat,p.lng); return w ? `🚶 ${w} ${t('walk_min')}` : ''; })()}</div>
      <div class="foot">${goBtn(p)}</div>
    </div>`;
  }

  function favItem(p){
    const walk = haversineWalkMin(p.lat, p.lng);
    const rec = p.rec ? ` · ⭐ ${t('recommends')}` : '';
    return `<div class="fav-item">
      <div class="info">
        <div class="name">${esc(p.name)}</div>
        ${p.note ? `<div class="desc">${esc(tt(p.note))}</div>` : ''}
        <div class="meta">${walk?`🚶 ${walk} ${t('walk_min')}`:''}${rec}</div>
      </div>
      <div class="go">${goBtn(p)}</div>
    </div>`;
  }

  function favCategory(group, idx){
    return `<details class="fav-cat reveal" ${idx===0?'open':''}>
      <summary><span>${group.ico||''} ${esc(tt(group.cat))}</span><span class="plus">+</span></summary>
      <div class="fav-items">${group.items.map(favItem).join("")}</div>
    </details>`;
  }

  function renderList(id, items, renderFn){
    const el = document.getElementById(id);
    if (!el) return;
    if (!items || !items.length){ el.innerHTML = `<p class="empty-note">—</p>`; return; }
    el.innerHTML = items.map(renderFn).join("");
  }

  function applyStaticI18n(){
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      el.innerHTML = t(el.getAttribute('data-i18n'));
    });
    document.documentElement.lang = LANG;
  }

  function renderDynamicText(){
    // Building-specific bits that live in config but use the current language
    document.querySelectorAll('[data-cfg]').forEach(el=>{
      const path = el.getAttribute('data-cfg').split('.');
      let v = CONFIG;
      for (const k of path) v = v ? v[k] : undefined;
      if (v == null) return;
      el.innerHTML = (typeof v === 'object' && (v.en || v.es)) ? tt(v) : esc(String(v));
    });
  }

  function wireHrefs(){
    const b = CONFIG.contact;
    const wa = `https://wa.me/${b.phoneDial.replace('+','')}?text=${encodeURIComponent(tt(b.whatsappMsg))}`;
    document.querySelectorAll('[data-wa]').forEach(el=>{ el.href = wa; el.rel="noopener noreferrer"; el.target="_blank"; });
    document.querySelectorAll('[data-tel]').forEach(el=>{ el.href = 'tel:'+b.phoneDial; });
    document.querySelectorAll('[data-mail]').forEach(el=>{ el.href = 'mailto:'+b.email; });

    // Review links: only show a button if a real URL has been configured
    // (not the PENDING placeholder). If none of the three are ready yet,
    // hide the whole "leave a review" prompt — asking for a review with
    // no working button feels broken, so we wait until there's at least one.
    let anyReviewVisible = false;
    document.querySelectorAll('[data-review]').forEach(el=>{
      const key = el.getAttribute('data-review');
      const url = CONFIG.reviews && CONFIG.reviews[key];
      if (url && !/pending/i.test(url)) {
        el.href = url; el.rel="noopener noreferrer"; el.target="_blank";
        el.style.display = '';
        anyReviewVisible = true;
      } else {
        el.style.display = 'none';
      }
    });
    const band = document.getElementById('reviewBand');
    if (band) band.style.display = anyReviewVisible ? '' : 'none';
  }

  function wireMapLinks(){
    document.querySelectorAll('[data-maps]').forEach(el=>{
      const path = el.getAttribute('data-maps').split('.');
      let v = CONFIG; for (const k of path) v = v ? v[k] : undefined;
      if (v) { el.href = mapsUrl(v); el.rel="noopener noreferrer"; el.target="_blank"; }
    });
  }

  function wireCopyAddress(){
    const btn = document.getElementById('copyAddressBtn');
    if (!btn) return;
    btn.addEventListener('click', ()=>{
      navigator.clipboard?.writeText(CONFIG.building.address).then(()=>{
        const old = btn.innerHTML;
        btn.innerHTML = t('copied');
        setTimeout(()=>btn.innerHTML = old, 1600);
      });
    });
  }

  function renderAll(){
    renderList('noraList', CONFIG.nora, noraCard);
    const favEl = document.getElementById('favList');
    if (favEl) favEl.innerHTML = CONFIG.favourites.map(favCategory).join("");
    renderList('exploreList', CONFIG.explore, p=>poiCard(p));
    renderList('beachList', CONFIG.beaches, p=>poiCard(p));
    renderList('shoppingList', CONFIG.shopping, p=>poiCard(p));
    renderList('transportList', [CONFIG.transport.airport, CONFIG.transport.train].filter(Boolean), p=>poiCard(p));

    // Luggage card: replaced with a "coming soon" message unless explicitly
    // enabled in config — avoids publishing an unverified or mismatched service.
    const lug = document.getElementById('luggageCard');
    if (lug && !(CONFIG.luggage && CONFIG.luggage.enabled)){
      lug.innerHTML = `<h3>📦 ${t('luggage_title')}</h3><p>${t('luggage_pending')}</p>`;
    }
  }

  function wireLangToggle(){
    const buttons = document.querySelectorAll('.lang-toggle button');
    buttons.forEach(b=>{
      b.setAttribute('aria-pressed', b.dataset.lang === LANG ? 'true':'false');
      b.addEventListener('click', ()=>{
        LANG = b.dataset.lang;
        sessionStorage.setItem('heredia_lang', LANG);
        buttons.forEach(x=>x.setAttribute('aria-pressed', x.dataset.lang===LANG ? 'true':'false'));
        applyStaticI18n(); renderDynamicText(); wireExtras(); renderAll(); wireReveal();
      });
    });
  }

  // Tab-style navigation: exactly one panel visible at a time. Any element
  // with data-panel="xxx" (the dock links, plus any in-page shortcut like
  // the hero's "Useful information" button) switches to that panel.
  function showPanel(id, {scroll=true} = {}){
    document.querySelectorAll('.panel').forEach(p => p.classList.toggle('active', p.id === id));
    document.querySelectorAll('#dock a').forEach(a => {
      if (a.dataset.panel === id) a.setAttribute('aria-current','true');
      else a.removeAttribute('aria-current');
    });
    if (scroll) window.scrollTo({ top: 0, behavior: 'auto' });
    history.replaceState(null, '', '#' + id);
  }

  function wireTabs(){
    document.querySelectorAll('[data-panel]').forEach(el=>{
      el.addEventListener('click', (e)=>{
        e.preventDefault();
        showPanel(el.dataset.panel);
      });
    });
    // Deep-link support: opening the guide at #ayuda (etc.) lands straight there —
    // handy if a QR code is ever pointed at a specific section.
    const initial = (location.hash || '').replace('#','');
    if (initial && document.getElementById(initial)) showPanel(initial, {scroll:false});
  }

  function wireReveal(){
    const io = new IntersectionObserver((es)=>es.forEach(e=>{
      if (e.isIntersecting){ e.target.classList.add('on'); io.unobserve(e.target); }
    }), {threshold:.08});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  }

  // Small building-agnostic bits that read straight from config: welcome
  // message, joined address lines, and the a-la-carte transport buttons.
  // Present in every building's index.html by element id; simply skipped
  // if a given id isn't on the page.
  function wireExtras(){
    const welcome = document.getElementById('welcomeText');
    if (welcome && CONFIG.welcome) welcome.textContent = tt(CONFIG.welcome);

    const addr = document.getElementById('addressLines');
    if (addr) addr.textContent = CONFIG.building.addressLines.join(" · ");

    const guardia = document.getElementById('guardiaBtn');
    if (guardia && CONFIG.pharmacy && CONFIG.pharmacy.guardiaLink) guardia.href = CONFIG.pharmacy.guardiaLink;

    const taxi = document.getElementById('taxiBtn');
    if (taxi && CONFIG.transport && CONFIG.transport.taxi) taxi.href = 'tel:' + CONFIG.transport.taxi.phone;

    const uber = document.getElementById('uberBtn');
    if (uber && CONFIG.transport && CONFIG.transport.uber) uber.href = CONFIG.transport.uber.link;

    const cabify = document.getElementById('cabifyBtn');
    if (cabify && CONFIG.transport && CONFIG.transport.cabify) cabify.href = CONFIG.transport.cabify.link;

    const luggageTel = document.getElementById('luggageTelBtn');
    if (luggageTel){
      if (CONFIG.luggage && CONFIG.luggage.enabled && CONFIG.luggage.phone) luggageTel.href = 'tel:' + CONFIG.luggage.phone;
      else luggageTel.style.display = 'none';
    }
  }

  function init(){
    applyStaticI18n();
    renderDynamicText();
    wireHrefs();
    wireMapLinks();
    wireCopyAddress();
    wireExtras();
    renderAll();
    wireLangToggle();
    wireTabs();
    setTimeout(wireReveal, 30);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
