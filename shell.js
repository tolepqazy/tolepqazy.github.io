/* Общая оболочка всех страниц: демо-панель, шапка с меню, подвал с силуэтом домов, панель на телефоне,
   избранное, сравнение, контекстное меню, суперподсказка шахматки, переходы между страницами. */
(() => {
  const { ZK, monthly, fmt, mln, area, roomsWord, plural, R } = window.BQX;
  /* готовая страница (dist/): в body лежит уже отрисованная копия для поисковиков, а исходная разметка — в <template id="bq-tpl">.
     Убираем копию и запускаем страницу как обычно, иначе шапка, подвал и блоки задвоятся. */
  const TPL = document.getElementById('bq-tpl');
  if (TPL) { [...document.body.children].forEach(el => { if (el !== TPL && el.tagName !== 'SCRIPT') el.remove(); }); document.body.prepend(TPL.content.cloneNode(true)); TPL.remove(); }
  const T0 = document.title; // заголовок готовой страницы (из сборки) — страница не должна его перетирать
  const K = window.BQK, { icon, ORDER, SHORT, ST, META, kv, rName } = K;
  const FL = window.BQ.flats, EX = window.BQ.extra;
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const main = $('main'), PAGE = main.dataset.page || 'home';
  const PHOTO = { life: 'img/prev_6839859.webp', plaza: 'img/prev_5655382.webp', eco: 'img/prev_5587279.webp' };
  const ROOFM = 'M246.5 0L0 117V146.4L246.5 29.3L493 146.4V117Z';
  const ss = (k, v) => { try { if (v === undefined) { const x = sessionStorage.getItem(k); sessionStorage.removeItem(k); return x; } sessionStorage.setItem(k, v); } catch (e) { return null; } };
  const byId = id => FL.find(f => f.id === +id);
  const roomStat = r => { const L = FL.filter(f => Math.min(f.r, 4) === r); return { n: L.length, min: Math.min(...L.map(f => f.p)) }; };
  const DEAL = FL.filter(f => K.delta(f) <= -8).sort((a, b) => K.delta(a) - K.delta(b));

  /* страницы прототипа */
  const PAGES = [['home', './', 'Главная'], ['zhk', 'zhk.html', 'Проекты'], ['project', 'project.html', 'Проект'], ['flats', 'flats.html', 'Квартиры'], ['flat', 'flat.html', 'Квартира'], ['extra', 'extra.html', 'Помещения'], ['mortgage', 'mortgage.html', 'Ипотека'], ['about', 'about.html', 'О компании'], ['contacts', 'contacts.html', 'Контакты']];
  const FILE = { 'index.html': 'home', './': 'home', '.': 'home', 'zhk.html': 'zhk', 'project.html': 'project', 'flats.html': 'flats', 'flat.html': 'flat', 'extra.html': 'extra', 'about.html': 'about', 'mortgage.html': 'mortgage', 'contacts.html': 'contacts' };
  const pageOf = href => {
    const f = href.split('#')[0];
    if (f === '') return PAGE;
    if (f[0] === '/') { const r = R.parsePath(f.split('?')[0]); return r.file ? FILE[r.file] || 'home' : null; } // новый адрес
    return FILE[f.split('?')[0]] || null;
  };
  const normP = x => x.replace(/\/index\.html$/, '/').replace(/\/?$/, '/');
  const samePath = (a, b) => normP(a) === normP(b);

  /* меню второго уровня: ведёт на страницы */
  const MEGA = {
    projects: ORDER.map(b => ({ i: 'building', t: ZK[b].name, s: `${META[b].cls} · ${K.status(b).t} · ${kv(ST[b].n)}`, e: `от ${mln(ST[b].min)} ₸`, img: PHOTO[b], href: `project.html#${b}` }))
      .concat([{ i: 'map', t: 'Все ЖК на карте', s: 'Сколько ехать от работы, школы, центра', img: 'img/g/map.webp', href: 'zhk.html#map' }]),
    flats: [1, 2, 3, 4].map(r => { const s = roomStat(r), f = FL.filter(x => Math.min(x.r, 4) === r).sort((a, b) => a.p - b.p)[0]; return { i: 'door', t: r === 4 ? '4+ комнаты' : r + '-комнатные', s: `${s.n} в продаже · от ${area(f.a)} м²`, e: `от ${mln(s.min)} ₸`, img: `img/g/room-${r}.webp`, href: `flats.html#r-${r}` }; })
      .concat([{ i: 'quiz', t: 'Подбор за 6 вопросов', s: 'Квиз сам настроит фильтр', img: 'img/g/quiz-3d.webp', href: 'flats.html#quiz' }, { i: 'grid', t: 'Шахматка', s: 'Все квартиры по этажам', img: 'img/g/chess.webp', href: 'flats.html#chess' }]),
    commerce: [{ i: 'car', t: 'Паркинг', s: `${EX['Parking place'].n} мест · ${area(EX['Parking place'].amin)}–${area(EX['Parking place'].amax)} м²`, e: `от ${mln(EX['Parking place'].min)} ₸`, img: 'img/g/parking.webp', href: 'extra.html#parking' }, { i: 'box', t: 'Кладовые', s: `${EX.Storeroom.n} шт. · ${area(EX.Storeroom.amin)}–${area(EX.Storeroom.amax)} м²`, e: `от ${fmt(EX.Storeroom.min)} ₸`, img: 'img/g/store.webp', href: 'extra.html#store' }, { i: 'shop', t: 'Коммерческие помещения', s: 'Первые этажи · по запросу', img: 'img/g/commerce.webp', href: 'extra.html#commerce' }],
    buy: [{ i: 'bank', t: 'Ипотека', s: 'Программы и расчёт платежа', img: 'img/g/mortgage-family.webp', href: 'mortgage.html' }, { i: 'percent', t: 'Ипотека 7-20-25', s: 'Государственная программа', img: 'img/g/prog-7-20-25.webp', href: 'mortgage.html#7' }, { i: 'wallet', t: 'Рассрочка', s: 'От застройщика, в Alatau Plaza Residence', img: 'img/g/prog-installment.webp', href: 'mortgage.html#inst' }, { i: 'tag', t: 'Скидки за оплату', s: 'Размер скидки назовёт менеджер', img: 'img/g/prog-full.webp', href: 'mortgage.html#full' }, { i: 'gift', t: 'Предложения', s: 'Условия по каждому ЖК', img: 'img/g/deals.webp', href: './#promo' }],
    about: [{ i: 'star', t: 'Почему Baqyt', s: 'Что есть в наших домах', img: 'img/g/why.webp', href: 'about.html#why' }, { i: 'hammer', t: 'Стройка и документы', s: 'Фото каждый месяц', img: 'img/g/build.webp', href: 'about.html#build' }, { i: 'users', t: 'Кабинет и семья', s: 'Выбирайте квартиру вместе', img: 'img/g/family-cabinet.webp', href: 'about.html#family' }, { i: 'briefcase', t: 'Карьера', s: 'Работа в Baqyt Group', img: 'img/g/office.webp', href: 'about.html#career' }, { i: 'info', t: 'Частые вопросы', s: 'Ипотека, сроки, документы', img: 'img/g/lead.webp', href: 'about.html#faq' }, { i: 'pin', t: 'Контакты', s: 'Отдел продаж, шоурум, часы работы', img: 'img/g/office.webp', href: 'contacts.html' }, { i: 'pin', t: 'Контакты и офис продаж', s: 'пр-т Мәңгілік Ел, 54, НП 9', img: 'img/g/office.webp', href: 'about.html#contacts' }]
  };
  const NAVP = { zhk: 'projects', project: 'projects', flats: 'flats', flat: 'flats', extra: 'commerce', about: 'about', contacts: 'about', mortgage: 'buy' }[PAGE];
  const aOf = (x, i) => `<a href="${x.href}" data-i="${i}" class="${i ? '' : 'on'}"><span class="mi">${icon(x.i)}</span><div><b>${x.t}</b><span>${x.s}</span></div><em class="num">${x.e || ''}</em></a>`;

  /* каркас */
  document.body.insertAdjacentHTML('afterbegin', `
<nav class="demo" aria-label="Прототип" hidden>
  <div class="grp pages">${R.PRETTY ? '' : PAGES.map(([k, h, t]) => `<a href="${h}" ${k === PAGE ? 'aria-current="true"' : ''}>${t}</a>`).join('')}</div>
  <div class="grp"><button id="mDesk" aria-pressed="true">Компьютер</button><button id="mPhone" aria-pressed="false">Телефон</button></div>
</nav>
<div class="stage" id="stage" data-mode="desk"><div class="frame" id="frame"><div class="site" id="site" data-page="${PAGE}"></div></div></div>`);
  const site = $('#site'), stage = $('#stage');
  site.insertAdjacentHTML('beforeend', `
<header class="hdr" id="hdr">
  <div class="hdr-in wrap">
    <a class="logo lgo" href="./" aria-label="Baqyt Group, на главную"><img src="img/logo.svg" alt="Baqyt Group" width="67" height="40"><span class="lg-say" aria-hidden="true"><svg class="lg-roof" viewBox="0 0 60 12"><path d="M2 10.5 30 2l28 8.5"/></svg>${[['ru', 'Жить', 'счастливо'], ['kz', 'Бақытты', 'өмір сүр'], ['en', 'Live', 'happily']].map(([l, a, b]) => `<span class="lg-l" data-l="${l}"><i><b>${a}</b></i><i><b>${b}</b></i></span>`).join('')}</span></a>
    <a class="city" href="zhk.html#map" title="Все наши дома — в Астане">${icon('pin')}<span>Астана</span></a>
    <nav class="mainnav" id="mainnav" aria-label="Разделы">
      <span class="navmark rm" id="navmark" aria-hidden="true"></span>
      ${[['projects', 'Проекты'], ['flats', 'Квартиры'], ['commerce', 'Помещения'], ['buy', 'Покупка'], ['about', 'О компании']].map(([k, t]) => `<button data-menu="${k}" aria-expanded="false" ${k === NAVP ? 'class="cur"' : ''}>${t} <i class="caret rm"></i></button>`).join('')}
      <a href="./#promo" class="hot" data-icon="gift">Предложения</a>
    </nav>
    <div class="hdr-r">
      <a class="phone num" href="tel:+77008000016" data-icon="phone" aria-label="Позвонить в отдел продаж" data-tip="Отдел продаж · Пн–Сб 10–20"><span>+7 700 800 00 16</span><em class="ph-n" aria-hidden="true">+7 700 800 00 16</em></a>
      <div class="langw" data-noi18n><button class="lang" id="lang" aria-haspopup="true" aria-expanded="false" aria-label="Язык сайта">${icon('globe')}<b>РУС</b><i class="caret rm"></i></button><div class="langm" id="langM" hidden></div></div>
      <button class="ico" id="favBtn" aria-label="Избранное" data-icon="heart"><span class="badge" id="favN">0</span></button>
      <button class="kb cab" data-cab data-icon="user"><span>Кабинет</span></button>
      <button class="ico burger" id="burger" aria-label="Меню" data-icon="menu"></button>
    </div>
  </div>
  <div class="mega" id="mega">${Object.entries(MEGA).map(([k, L]) => `<div class="mega-p wrap" data-panel="${k}"><div class="mlist">${L.map(aOf).join('')}</div><div class="mimg">${L.map((x, i) => `<img src="${x.img}" alt="" class="${i ? '' : 'on'} ${x.plan ? 'plan' : ''}" loading="lazy">`).join('')}</div></div>`).join('')}</div>
</header>`);
  site.appendChild(main);
  site.insertAdjacentHTML('beforeend', `
<footer class="foot" id="contacts">
  <div class="wrap">
    <div class="f-top">
      <div><p class="say"><em>Жить счастливо</em><span class="say-kz" lang="kk">Бақытты өмір сүр</span></p></div>
      <div class="f-cta"><a class="tel num" href="tel:+77008000016">+7 700 800 00 16</a><span>Пн–Сб 10–20, Вс 11–16</span><div class="row"><button class="kb pri" data-call data-icon="phone">Заказать звонок</button></div></div>
    </div>
    <div class="fgrid">
      <div><h4><i class="rm"></i>Проекты</h4><ul>${ORDER.map(b => `<li><a href="project.html#${b}">${ZK[b].name}</a></li>`).join('')}<li><a href="zhk.html#map">Все ЖК на карте</a></li></ul></div>
      <div><h4><i class="rm"></i>Квартиры</h4><ul>${[1, 2, 3, 4].map(r => `<li><a href="flats.html#r-${r}">${r === 4 ? '4+ комнаты' : r + '-комнатные'}</a></li>`).join('')}<li><a href="flats.html#quiz">Подбор по квизу</a></li></ul></div>
      <div><h4><i class="rm"></i>Покупка</h4><ul><li><a href="mortgage.html">Ипотека</a></li><li><a href="mortgage.html#7">Программа 7-20-25</a></li><li><a href="mortgage.html#inst">Рассрочка</a></li><li><a href="./#mortgage">Калькулятор</a></li><li><a href="./#promo">Предложения</a></li></ul></div>
      <div><h4><i class="rm"></i>Помещения</h4><ul><li><a href="extra.html#parking">Паркинг</a></li><li><a href="extra.html#store">Кладовые</a></li><li><a href="extra.html#commerce">Коммерческие помещения</a></li></ul></div>
      <div><h4><i class="rm"></i>Контакты</h4><ul><li><a href="https://2gis.kz/astana/search/Мәңгілік%20Ел%2054" target="_blank" rel="noopener">пр-т Мәңгілік Ел, 54, НП&nbsp;9</a></li><li><a href="mailto:info@baqytgroup.kz">info@baqytgroup.kz</a></li><li><a href="contacts.html">Все контакты</a></li><li><a href="about.html">О компании</a></li></ul>
        <div class="f-soc"><a href="https://www.instagram.com/baqyt_group/" target="_blank" rel="noopener" aria-label="Instagram" data-icon="insta"></a><a href="https://www.tiktok.com/@baqyt_group" target="_blank" rel="noopener" aria-label="TikTok" data-icon="tiktok"></a><a href="https://www.youtube.com/results?search_query=Baqyt+Group" target="_blank" rel="noopener" aria-label="YouTube" data-icon="yt"></a><a href="https://wa.me/77008000016" target="_blank" rel="noopener" aria-label="WhatsApp" data-icon="wa"></a></div></div>
    </div>
  </div>
  <div class="wrap"><div class="copy"><span>© Baqyt Group</span><span>Цены и наличие квартир уточняйте в отделе продаж</span></div></div>
</footer>
<button class="fab" data-ai data-icon="spark" aria-label="Baqyt AI"><span class="fab-t">Baqyt AI</span></button>
<button class="totop" id="totop" aria-label="Наверх"><i class="rm"></i></button>
<nav class="tabbar" id="tabbar" aria-label="Навигация">
  <a href="./" ${PAGE === 'home' ? 'aria-current="true"' : ''} data-icon="home">Главная</a>
  <a href="flats.html" ${PAGE === 'flats' || PAGE === 'flat' ? 'aria-current="true"' : ''} data-icon="search">Квартиры</a>
  <button data-ai data-icon="spark">ИИ-подбор</button>
  <button data-cab data-icon="user">Кабинет<span class="badge" id="favN2">0</span></button>
</nav>
<div class="msheet" id="msheet" aria-label="Меню">
  <div class="mh"><a class="logo" href="./"><img src="img/logo.svg" alt="Baqyt Group" style="height:32px;width:auto"></a><button class="ico" id="mClose" aria-label="Закрыть" data-icon="close"></button></div>
  <div>${Object.entries({ projects: 'Проекты', flats: 'Квартиры', commerce: 'Помещения', buy: 'Покупка', about: 'О компании' }).map(([k, t]) => `<details ${k === (NAVP || 'projects') ? 'open' : ''}><summary>${t}<i class="rm"></i></summary><div class="ml">${MEGA[k].map(x => `<a href="${x.href}"><span class="mi">${x.plan ? icon(x.i) : `<img src="${x.img}" alt="" loading="lazy">`}</span><div><b>${x.t}</b><span>${x.s}</span></div></a>`).join('')}</div></details>`).join('')}</div>
  <div class="mc"><a class="kb num" href="tel:+77008000016" data-icon="phone">+7 700 800 00 16</a><button class="kb pri" data-call data-icon="phone">Заказать звонок</button></div>
</div>
<div class="cmpbar" id="cmpBar" role="region" aria-label="Сравнение"></div>
<div class="stip" id="stip" role="tooltip"></div>
<div class="scrim" id="scrim"></div>
<div class="ctx" id="ctx" role="menu"></div>
<div class="toast" id="toast" role="status"></div>
<div class="tip" id="tip" role="tooltip"></div>
<div class="press" id="press"></div>`);

  /* утилиты */
  const toast = t => { const el = $('#toast'); el.textContent = t; el.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove('on'), 2800); };
  /* подсказки: у кнопок-иконок и всего, где есть data-tip или title */
  (() => {
    const tp = $('#tip'); let cur = null;
    const hide = () => { tp.classList.remove('on'); cur = null; };
    const show = el => {
      if (el.title) { el.dataset.tip = el.title; el.removeAttribute('title'); }
      const t = el.dataset.tip; if (!t) return; cur = el; tp.textContent = t; tp.classList.add('on');
      const r = el.getBoundingClientRect(), w = tp.offsetWidth, h = tp.offsetHeight, vw = document.documentElement.clientWidth;
      const below = r.top < h + 16, x = Math.max(8, Math.min(vw - w - 8, r.left + r.width / 2 - w / 2));
      tp.style.left = x + 'px'; tp.style.top = (below ? r.bottom + 10 : r.top - h - 10) + 'px'; tp.classList.toggle('below', below);
      tp.style.setProperty('--ax', (r.left + r.width / 2 - x) + 'px');
    };
    const pick = e => e.target.closest && e.target.closest('[data-tip],button[title],a[title]');
    document.addEventListener('pointerover', e => { if (e.pointerType === 'touch') return; const el = pick(e); if (el && el !== cur) show(el); else if (!el && cur) hide(); });
    document.addEventListener('focusin', e => { const el = pick(e); if (el && el.matches(':focus-visible')) show(el); });
    document.addEventListener('focusout', hide); window.addEventListener('scroll', hide, { passive: true }); document.addEventListener('pointerdown', hide);
  })();
  const fillIcons = (root = document) => $$('[data-icon]', root).forEach(el => { if (!el.dataset.iconed) { el.insertAdjacentHTML('afterbegin', icon(el.dataset.icon)); el.dataset.iconed = 1; } });
  const inFrame = () => stage.dataset.mode === 'phone';
  const isPhone = () => inFrame() || site.clientWidth <= 760;
  const scroller = () => inFrame() ? site : document.scrollingElement;
  const demoH = () => $('.demo').offsetHeight;
  const syncTop = () => site.style.setProperty('--hdrTop', inFrame() ? '0px' : demoH() + 'px');
  const topOff = () => $('#hdr').offsetHeight + (inFrame() ? 0 : demoH()) + (parseFloat(getComputedStyle(site).getPropertyValue('--stick')) || 0) + 12;
  function scrollToEl(el, smooth = true) {
    const sc = scroller(); if (!el) { sc.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' }); return; }
    sc.scrollTo({ top: el.getBoundingClientRect().top - (inFrame() ? site.getBoundingClientRect().top : 0) + sc.scrollTop - topOff(), behavior: smooth ? 'smooth' : 'auto' });
  }
  const frameOff = () => { if (!inFrame()) return [0, 0]; const r = $('#frame').getBoundingClientRect(); return [r.left, r.top]; };
  const boxSize = () => inFrame() ? [$('#frame').clientWidth, $('#frame').clientHeight] : [innerWidth, innerHeight];
  function roundPoly(pts, r) {
    let d = '';
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i], a = pts[(i - 1 + pts.length) % pts.length], b = pts[(i + 1) % pts.length];
      const da = Math.hypot(a[0] - p[0], a[1] - p[1]), db = Math.hypot(b[0] - p[0], b[1] - p[1]);
      const ra = Math.min(r, da / 2), rb = Math.min(r, db / 2);
      const s = [p[0] + (a[0] - p[0]) * ra / da, p[1] + (a[1] - p[1]) * ra / da], e = [p[0] + (b[0] - p[0]) * rb / db, p[1] + (b[1] - p[1]) * rb / db];
      d += (i ? 'L' : 'M') + s[0].toFixed(1) + ' ' + s[1].toFixed(1) + 'Q' + p[0].toFixed(1) + ' ' + p[1].toFixed(1) + ' ' + e[0].toFixed(1) + ' ' + e[1].toFixed(1);
    }
    return d + 'Z';
  }
  // крыша из логотипа сверху у любого блока: data-roof="высота"
  function roofClip(el, H, r = 22) { const w = el.offsetWidth, h = el.offsetHeight; if (w) el.style.clipPath = `path("${roundPoly([[0, H], [w / 2, 0], [w, H], [w, h], [0, h]], r)}")`; }
  const layoutFns = [];
  const layout = () => { $$('[data-roof]').forEach(el => roofClip(el, isPhone() ? +(el.dataset.roofM || 30) : +el.dataset.roof, isPhone() ? +(el.dataset.roofRm || 18) : +(el.dataset.roofR || 24))); layoutFns.forEach(fn => fn()); };
  new ResizeObserver(() => layout()).observe(site);

  /* переход на страницу: хэш дублируем в память вкладки, на случай если он потеряется */
  function go(href) {
    href = R.url(href);
    const p = pageOf(href), h = href.split('#')[1] || '', path = href.split('#')[0];
    if (p === PAGE && (!path || (R.PRETTY && h && samePath(path.split('?')[0], location.pathname)))) return route(h, true);
    ss('bq-hash', JSON.stringify({ p, h })); location.href = href;
  }
  let routeFn = null;
  function route(h, smooth) {
    closeMenus();
    if (routeFn && routeFn(h, smooth)) return;
    const el = h && document.getElementById(h); scrollToEl(el || null, smooth);
  }

  /* режим ПК / телефон */
  function setMode(m) {
    stage.dataset.mode = m; $('#mDesk').setAttribute('aria-pressed', m === 'desk'); $('#mPhone').setAttribute('aria-pressed', m === 'phone');
    scrollTo(0, 0); site.scrollTop = 0; closeMenus(); syncTop();
    try { localStorage.setItem('bq-mode', m); } catch (e) {}
    requestAnimationFrame(layout);
  }
  $('#mDesk').onclick = () => setMode('desk'); $('#mPhone').onclick = () => setMode('phone');

  /* мега-меню */
  $$('.mlist').forEach(L => L.addEventListener('mouseover', e => { const a = e.target.closest('a[data-i]'); if (!a) return; $$('a', L).forEach(x => x.classList.toggle('on', x === a)); $$('img', L.nextElementSibling).forEach((im, k) => im.classList.toggle('on', k === +a.dataset.i)); }));
  const mega = $('#mega'), navmark = $('#navmark'), nav = $('#mainnav'); let megaT;
  function openMega(name) { clearTimeout(megaT); $$('[data-menu]').forEach(b => b.setAttribute('aria-expanded', b.dataset.menu === name)); $$('.mega-p').forEach(p => p.classList.toggle('on', p.dataset.panel === name)); mega.classList.add('open'); }
  function closeMega() { mega.classList.remove('open'); $$('[data-menu]').forEach(b => b.setAttribute('aria-expanded', 'false')); markCur(); }
  const markAt = it => { navmark.style.opacity = 1; navmark.style.transform = `translateX(${it.offsetLeft + it.offsetWidth / 2 - 8}px)`; };
  const markCur = () => { const c = $('#mainnav .cur'); if (c && c.offsetWidth) markAt(c); else navmark.style.opacity = 0; };
  $$('[data-menu]').forEach(b => { b.addEventListener('mouseenter', () => { clearTimeout(megaT); megaT = setTimeout(() => openMega(b.dataset.menu), 110); }); b.addEventListener('click', () => b.getAttribute('aria-expanded') === 'true' ? closeMega() : openMega(b.dataset.menu)); });
  $('#hdr').addEventListener('mouseleave', () => { clearTimeout(megaT); megaT = setTimeout(closeMega, 220); });
  mega.addEventListener('mouseenter', () => clearTimeout(megaT));
  $$('#mainnav>a').forEach(a => a.addEventListener('mouseenter', () => { clearTimeout(megaT); megaT = setTimeout(closeMega, 150); }));
  nav.addEventListener('mouseover', e => { const it = e.target.closest('#mainnav>button, #mainnav>a'); if (it) markAt(it); });
  nav.addEventListener('mouseleave', () => { if (!mega.classList.contains('open')) markCur(); });
  layoutFns.push(markCur);
  const msheet = $('#msheet');
  $('#burger').onclick = () => { $('#kchat')?.classList.remove('on'); msheet.classList.add('on'); }; $('#mClose').onclick = () => msheet.classList.remove('on');
  function closeMenus() { closeMega(); msheet.classList.remove('on'); closeCtx(); hideTip(true); }

  /* избранное */
  const fav = new Set(K.store('bq-fav'));
  const syncFav = bump => ['#favN', '#favN2'].forEach(s => { const b = $(s); b.textContent = fav.size; b.classList.toggle('on', fav.size > 0); if (bump) { b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); } });
  function favToggle(id) {
    fav.has(id) ? fav.delete(id) : fav.add(id); K.store('bq-fav', [...fav]);
    $$(`[data-fav="${id}"]`).forEach(b => b.setAttribute('aria-pressed', fav.has(id))); syncFav(true);
    toast(fav.has(id) ? 'Добавили в избранное' : 'Убрали из избранного');
  }
  syncFav();
  const showFav = () => { if (!fav.size) { toast('Нажмите ♡ на квартире, чтобы сохранить её'); return; } K.cabinet([...fav]); };
  $('#favBtn').onclick = showFav;

  const openFlat = id => go(`flat.html#flat-${id}`);
  // ответ ИИ-чата: на странице квартир применяем сразу, с других страниц переносим запрос
  const api = {
    isFav: id => fav.has(id), fav: favToggle, toast, family: K.family, form: K.form, open: openFlat, back: () => go('flats.html'),
    apply: q => { if (BQS.applyAI) BQS.applyAI(q, ['запрос из чата']); else { ss('bq-ai', JSON.stringify(q)); go('flats.html#ai'); } }
  };

  /* общие клики */
  document.addEventListener('click', e => {
    const t = e.target;
    if (t.closest('.km') || t.closest('.kc') || t.closest('.fx')) {
      const a = t.closest('a[href]'); if (a && !a.target && pageOf(a.getAttribute('href'))) { e.preventDefault(); K.closeModal(); go(a.getAttribute('href')); }
      return;
    }
    if (t.closest('[data-call]')) { e.preventDefault(); closeMenus(); K.form('call'); return; }
    if (t.closest('[data-visit]')) { e.preventDefault(); closeMenus(); const vs = document.getElementById('visit'); if (vs) scrollToEl(vs); else K.form('visit'); return; }
    if (t.closest('[data-cab]')) { e.preventDefault(); closeMenus(); K.cabinet([...fav]); return; }
    if (t.closest('[data-ai]')) { e.preventDefault(); closeMenus(); K.chat(api); return; }
    if (t.closest('[data-favs]')) { showFav(); return; }
    const a = t.closest('a[href]'); if (!a || a.target) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) return; // открыть в новой вкладке — как обычная ссылка
    const href = a.getAttribute('href'); if (/^(tel|mailto|https?):/.test(href)) return;
    const p = pageOf(href); if (!p) return;
    e.preventDefault(); closeMenus();
    const [path, hh = ''] = href.split('#');
    if (R.PRETTY) {
      // готовый сайт: другой адрес — переход; тот же адрес с #якорем — прокрутка на месте
      if (!path || samePath(path.split('?')[0], location.pathname)) { route(hh, true); try { history.replaceState(null, '', location.pathname + location.search + (hh ? '#' + hh : '')); } catch (x) {} }
      else go(href);
      return;
    }
    if (p === PAGE) { route(hh, true); try { history.replaceState(null, '', hh ? location.pathname + location.search + '#' + hh : location.pathname); } catch (x) {} }
    else go(href);
  });

  /* карточка квартиры */
  function card(f, i, sc) {
    const m = monthly(f.p), d = K.delta(f), same = K.samePlan(f), stt = K.status(f.b);
    return `<article class="card" data-id="${f.id}" style="--i:${i}" tabindex="0" aria-label="${roomsWord(f.r)}, ${area(f.a)} м², ${SHORT[f.b]}">
      <div class="ch"><b>${SHORT[f.b]}</b><div class="pays">${META[f.b].pay.map(p => `<span class="tg ${p === 'inst' ? 'tg-cls' : 'tg-status'}">${K.PAYN[p]}</span>`).join('')}</div></div>
      <div class="pic">${sc ? `<span class="match">${icon('spark')}${sc}%</span>` : ''}${d <= -8 ? `<span class="deal">${icon('tag')}−${-d}% к средней</span>` : ''}<img src="${f.pl}" alt="Планировка ${roomsWord(f.r)}" loading="lazy"><button class="pfav" type="button" data-fav="${f.id}" aria-pressed="${fav.has(f.id)}" aria-label="В избранное">${icon('heart')}</button></div>
      <div class="body">
        <div class="price num"><a href="${R.url('flat.html#flat-' + f.id)}" style="color:inherit;text-decoration:none">${fmt(f.p)} ₸</a>${d <= -8 ? `<span class="dealm">−${-d}%</span>` : ''}</div>
        <div class="m2 num">${fmt(f.m2)} ₸/м² · ${fmt(m)} ₸ в месяц</div>
        <div class="spec">${roomsWord(f.r)}<i></i>${area(f.a)} м²<i></i>${f.fl}${K.floorsOf(f) ? ' из ' + K.floorsOf(f) : ''} этаж</div><div class="subm num">${SHORT[f.b]} · ${fmt(m)} ₸ в месяц</div>
        <div class="rows">
          <div>${icon(stt.k === 'done' ? 'key' : 'clock')}${stt.k === 'done' ? 'Готовность' : 'Срок сдачи'}<b>${stt.t.replace('Сдача: ', '')}</b></div>
          <div>${icon('tag')}Цена за м²<b class="${d <= -1 ? 'good' : ''}">${d <= -1 ? `на ${-d}% ниже средней` : d >= 1 ? `на ${d}% выше средней` : 'средняя по ЖК'}</b></div>
          <div>${icon('layers')}Такая планировка<b>${same > 1 ? `ещё ${same - 1}` : 'одна'}</b></div>
          <div>${icon('building')}Подъезд и квартира<b>${f.e} · № ${f.n}</b></div>
        </div>
        <div class="acts"><button class="kb pri" data-book="${f.id}">${icon('key')}Забронировать</button><button class="kb ic" data-cmp="${f.id}" aria-pressed="${K.cmp.has(f.id)}" aria-label="Сравнить" title="Сравнить">${icon('compare')}</button><button class="kb ic" data-fav="${f.id}" aria-pressed="${fav.has(f.id)}" aria-label="В избранное">${icon('heart')}</button></div>
      </div></article>`;
  }
  // клики, правая кнопка и долгое нажатие на карточках
  let suppress = false;
  function bindGrid(grid, opts = {}) {
    grid.addEventListener('click', e => {
      if (e.target.closest('[data-call]') || suppress) return;
      if (e.target.closest('a[href]')) return; // ссылку на квартиру ведёт общий обработчик кликов
      const h = e.target.closest('[data-fav]'); if (h) { favToggle(+h.dataset.fav); return; }
      const cm = e.target.closest('[data-cmp]'); if (cm) { const on = K.cmpToggle(+cm.dataset.cmp); toast(on ? 'Добавили к сравнению' : 'Убрали из сравнения'); return; }
      const bk = e.target.closest('[data-book]'); if (bk) { K.form('book', byId(bk.dataset.book)); return; }
      const c = e.target.closest('.card'); if (c) openFlat(+c.dataset.id);
    });
    grid.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.classList.contains('card')) openFlat(+e.target.dataset.id); });
    grid.addEventListener('contextmenu', e => { const c = e.target.closest('.card'); if (!c) return; e.preventDefault(); openCtx(+c.dataset.id, e.clientX, e.clientY, opts.similar); });
    let lpT, lpXY;
    grid.addEventListener('pointerdown', e => {
      if (e.pointerType === 'mouse') return; const c = e.target.closest('.card'); if (!c) return;
      lpXY = [e.clientX, e.clientY]; const pr = $('#press'), fr = frameOff();
      pr.style.left = (e.clientX - fr[0]) + 'px'; pr.style.top = (e.clientY - fr[1]) + 'px'; pr.classList.remove('go'); void pr.offsetWidth; pr.classList.add('go');
      lpT = setTimeout(() => { pr.classList.remove('go'); suppress = true; navigator.vibrate?.(12); openCtx(+c.dataset.id, lpXY[0], lpXY[1], opts.similar); setTimeout(() => suppress = false, 450); }, 520);
    });
    const lpCancel = () => { clearTimeout(lpT); $('#press').classList.remove('go'); };
    grid.addEventListener('pointerup', lpCancel); grid.addEventListener('pointercancel', lpCancel);
    grid.addEventListener('pointermove', e => { if (lpXY && Math.hypot(e.clientX - lpXY[0], e.clientY - lpXY[1]) > 10) lpCancel(); });
  }
  const ctx = $('#ctx');
  function openCtx(id, x, y, similar) {
    const f = byId(id); if (!f) return;
    const it = [['home', 'Открыть квартиру', () => openFlat(id)], ['heart', fav.has(id) ? 'Убрать из избранного' : 'В избранное', () => favToggle(id)], ['compare', K.cmp.has(id) ? 'Убрать из сравнения' : 'Сравнить', () => K.cmpToggle(id)], ['users', 'Обсудить с семьёй', () => K.family(f)],
      ['layers', 'Похожие квартиры', () => similar ? similar(f) : go(`flats.html#zk-${f.b}`)], ['cal', 'Записаться на показ', () => K.form('visit', f)], ['key', 'Забронировать', () => K.form('book', f)]];
    ctx.innerHTML = `<div class="chd">${SHORT[f.b]} · кв. ${f.n} · ${area(f.a)} м²</div>` + it.map(([i, t], k) => `<button role="menuitem" data-k="${k}">${icon(i)}${t}</button>`).join('');
    const fr = frameOff(), [bw, bh] = boxSize();
    ctx.classList.add('on'); const w = ctx.offsetWidth, h = ctx.offsetHeight;
    ctx.style.left = Math.max(8, Math.min(x - fr[0], bw - w - 8)) + 'px'; ctx.style.top = Math.max(8, Math.min(y - fr[1], bh - h - 8)) + 'px';
    ctx.onclick = e => { const b = e.target.closest('button'); if (!b) return; closeCtx(); it[+b.dataset.k][2](); };
  }
  function closeCtx() { ctx.classList.remove('on'); }
  document.addEventListener('pointerdown', e => { if (!e.target.closest('#ctx')) closeCtx(); if (!e.target.closest('#stip') && !e.target.closest('.kch-c')) hideTip(true); }, true);

  /* суперподсказка шахматки: вся квартира при наведении, на телефоне — по первому касанию */
  const tip = $('#stip'); let tipId = null, tipT, tipTouch = false;
  function tipHTML(f) {
    const d = K.delta(f), fls = K.floorsOf(f), stt = K.status(f.b);
    return `<div class="stip-pic"><img src="${f.pl}" alt="Планировка"><span class="stip-n">кв. ${f.n}</span><span class="stip-ic"><button class="kb sm ic" data-tfav="${f.id}" aria-pressed="${fav.has(f.id)}" aria-label="В избранное" data-tip="В избранное">${icon('heart')}</button><button class="kb sm ic" data-tcmp="${f.id}" aria-pressed="${K.cmp.has(f.id)}" aria-label="Сравнить" data-tip="Сравнить">${icon('compare')}</button></span></div>
      <div class="stip-b">
        <div class="stip-h"><b>${roomsWord(f.r)}, ${area(f.a)} м²</b><span>${SHORT[f.b]} · подъезд ${f.e} · ${f.fl}${fls ? ' из ' + fls : ''} этаж</span></div>
        <div class="stip-p num"><b>${fmt(f.p)} ₸</b><span>${fmt(f.m2)} ₸/м²</span></div>
        <div class="stip-rows num">
          <div>${icon('bank')}<span>Ипотека</span><b>${fmt(monthly(f.p))} ₸/мес</b></div>
          <div>${icon('tag')}<span>К средней цене</span><b class="${d <= -1 ? 'good' : ''}">${d <= -1 ? `−${-d}%` : d >= 1 ? `+${d}%` : 'средняя'}</b></div>
          <div>${icon(stt.k === 'done' ? 'key' : 'clock')}<span>${stt.k === 'done' ? 'Готовность' : 'Срок'}</span><b>${stt.t.replace('Сдача: ', '')}</b></div>
        </div>
        <div class="stip-a"><a class="kb pri sm" href="${R.url('flat.html#flat-' + f.id)}">${icon('arrow')}Открыть</a><button class="kb sm" data-tbook="${f.id}">${icon('key')}Бронь</button></div>
      </div>`;
  }
  function showTip(cell) {
    const f = byId(cell.dataset.flat); if (!f) return; clearTimeout(tipT);
    $$('.kch-c.tipon').forEach(c => c.classList.remove('tipon')); cell.classList.add('tipon');
    if (tipId !== f.id) { tip.innerHTML = tipHTML(f); tipId = f.id; }
    tip.classList.toggle('sheet', isPhone());
    tip.classList.add('on');
    if (isPhone()) { tip.style.left = tip.style.top = ''; return; }
    const r = cell.getBoundingClientRect(), fr = frameOff(), [bw, bh] = boxSize(), w = tip.offsetWidth, h = tip.offsetHeight;
    let x = r.right - fr[0] + 12; if (x + w > bw - 12) x = r.left - fr[0] - w - 12;
    let y = r.top - fr[1] + r.height / 2 - h / 2; y = Math.max(12, Math.min(y, bh - h - 12));
    tip.style.left = Math.max(12, x) + 'px'; tip.style.top = y + 'px';
  }
  function hideTip(now) { clearTimeout(tipT); const f = () => { tip.classList.remove('on'); tipId = null; $$('.kch-c.tipon').forEach(c => c.classList.remove('tipon')); }; if (now) f(); else tipT = setTimeout(f, 180); }
  tip.addEventListener('mouseenter', () => clearTimeout(tipT)); tip.addEventListener('mouseleave', () => { if (!tip.classList.contains('sheet')) hideTip(); });
  tip.addEventListener('click', e => {
    const fv = e.target.closest('[data-tfav]'); if (fv) { favToggle(+fv.dataset.tfav); fv.setAttribute('aria-pressed', fav.has(+fv.dataset.tfav)); return; }
    const cm = e.target.closest('[data-tcmp]'); if (cm) { const on = K.cmpToggle(+cm.dataset.tcmp); cm.setAttribute('aria-pressed', on); toast(on ? 'Добавили к сравнению' : 'Убрали из сравнения'); return; }
    const bk = e.target.closest('[data-tbook]'); if (bk) { hideTip(true); K.form('book', byId(bk.dataset.tbook)); }
  });
  function bindChess(root) {
    root.addEventListener('pointerover', e => { if (e.pointerType !== 'mouse') return; const c = e.target.closest('.kch-c[data-flat]'); if (c) showTip(c); });
    root.addEventListener('pointerout', e => { if (e.pointerType !== 'mouse') return; const c = e.target.closest('.kch-c[data-flat]'); if (c && !c.contains(e.relatedTarget)) hideTip(); });
    root.addEventListener('pointerdown', e => { tipTouch = e.pointerType !== 'mouse'; });
    root.addEventListener('click', e => {
      const c = e.target.closest('.kch-c[data-flat]'); if (!c) return; e.stopPropagation(); e.preventDefault(); // ячейка — ссылка; переход делаем сами
      if (c.href && (e.metaKey || e.ctrlKey || e.shiftKey)) { window.open(c.href, '_blank'); return; }
      if (tipTouch && tipId !== +c.dataset.flat) { showTip(c); return; }
      openFlat(+c.dataset.flat);
    }, true);
    root.addEventListener('scroll', () => hideTip(true), { passive: true, capture: true });
  }

  /* сравнение */
  const cmpBar = $('#cmpBar');
  function renderCmp() {
    const L = [...K.cmp].map(byId).filter(Boolean);
    $$('[data-cmp]').forEach(b => b.setAttribute('aria-pressed', K.cmp.has(+b.dataset.cmp)));
    cmpBar.classList.toggle('on', L.length > 0);
    cmpBar.innerHTML = `<span class="th">${L.map(f => `<img src="${f.pl}" alt="">`).join('')}</span><b>Сравнение · ${L.length}</b><button class="kb sm pri" data-c="open">${icon('compare')}${L.length > 1 ? 'Сравнить' : 'Добавьте ещё'}</button><button class="kb sm ic" data-c="clr" aria-label="Очистить">${icon('close')}</button>`;
  }
  cmpBar.onclick = e => { const b = e.target.closest('[data-c]'); if (!b) return; if (b.dataset.c === 'clr') { [...K.cmp].forEach(id => K.cmpToggle(id)); return; } K.compare(id => openFlat(id)); };
  K.cmpL.add(renderCmp); renderCmp();

  /* заявка-дом: вставляется в <section data-lead> */
  function lead(el) {
    el.classList.add('wrap');
    const q = el.dataset.chips !== '0' && (!el.dataset.kick || el.dataset.kick === 'Ипотека');
    const chips = (t, arr, k) => `<div class="lq"><span>${t}</span><div>${arr.map(x => `<button type="button" data-${k}="${x}" aria-pressed="false">${x}</button>`).join('')}</div></div>`;
    el.innerHTML = `<div class="lead lead2"><div class="bgc" data-roof="80" data-roof-m="48"><img src="${el.dataset.img || 'img/g/lead2.webp'}" alt="" loading="lazy"></div>
      <div class="l-txt"><span class="eyebrow"><i class="rm"></i>${el.dataset.kick || 'Подбор'}</span><h2>${el.dataset.h || 'Подберём квартиру за вас'}</h2><p>${el.dataset.p || 'Пришлём в WhatsApp варианты под ваш бюджет. Бесплатно.'}</p>
        <ol class="l-steps"><li><b>Оставляете номер</b></li><li><b>Менеджер пишет в WhatsApp</b></li><li><b>Смотрите вживую или онлайн</b></li></ol></div>
      <figure class="l-pic" data-roof="46" data-roof-m="30" data-roof-r="14" data-roof-rm="10"><img src="${el.dataset.img || 'img/g/lead2.webp'}" alt="" loading="lazy"><figcaption><i class="dot"></i><span><b>Менеджеры на связи</b>Пн–Сб 10–20, Вс 11–16</span></figcaption></figure>
      <form class="lform l-card" novalidate><h3>${q ? 'Что подобрать?' : 'Оставьте контакт'}</h3>
        ${q ? chips('Комнат', ['Студия', '1', '2', '3', '4+'], 'r') + chips('Бюджет, млн ₸', ['до 25', '25–40', '40–60', '60+'], 'b') : ''}
        <div class="lq"><span>Как связаться</span><div class="l-seg">${[['wa', 'WhatsApp'], ['call', 'Звонок'], ['tg', 'Telegram']].map(([k, t], i) => `<button type="button" data-c="${t}" aria-pressed="${!i}">${icon(k === 'call' ? 'phone' : k)}${t}</button>`).join('')}</div></div>
        <div class="l-in"><input class="ln" placeholder="Имя" autocomplete="name" aria-label="Имя"><input class="lp" placeholder="+7 7__ ___ __ __" inputmode="tel" autocomplete="tel" aria-label="Телефон"></div>
        <button class="kb pri" type="submit">${icon('send')}${el.dataset.btn || 'Получить подборку'}</button>
        <a class="wa" href="https://wa.me/77008000016" target="_blank" rel="noopener">${icon('wa')}или сразу написать в WhatsApp</a><small>Нажимая кнопку, вы соглашаетесь на обработку данных.</small></form></div>`;
    const form = $('form', el), ph = $('.lp', el); K.phoneMask(ph);
    form.addEventListener('click', e => {
      const b = e.target.closest('.lq button'); if (!b) return;
      if (b.dataset.c) $$('[data-c]', form).forEach(x => x.setAttribute('aria-pressed', x === b)); else b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true');
    });
    form.addEventListener('submit', e => {
      e.preventDefault(); const ok = ph.value.replace(/\D/g, '').length === 11; ph.classList.toggle('bad', !ok); if (!ok) { ph.focus(); return; }
      const name = $('.ln', el).value.trim().replace(/[<>&"]/g, '');
      const pick = k => $$(`[data-${k}][aria-pressed="true"]`, form).map(x => x.dataset[k]).join(', ');
      const how = pick('c'), wish = [pick('r') && 'комнат: ' + pick('r'), pick('b') && 'бюджет: ' + pick('b') + ' млн ₸'].filter(Boolean).join('; ');
      form.innerHTML = `<div class="done"><b>Спасибо${name ? ', ' + name : ''}!</b><p>${{ 'Звонок': 'Перезвоним', 'Telegram': 'Напишем в Telegram' }[how] || 'Напишем в WhatsApp'}${wish ? ` и пришлём варианты (${wish})` : ''}.</p><p>На настоящем сайте заявка уйдёт в CRM. В прототипе она никуда не отправляется.</p></div>`;
    });
  }
  $$('[data-lead]').forEach(lead);
  // на главной кнопка Baqyt AI появляется, когда пролистали первый блок (там уже есть ИИ)
  const fab = $('.fab'), hero1 = PAGE === 'home' && $('main > section');
  if (fab && hero1) { fab.classList.add('later'); new IntersectionObserver(([e]) => fab.classList.toggle('later', e.isIntersecting), { threshold: .15 }).observe(hero1); }

  /* прокрутка */
  const onScroll = () => { const y = scroller().scrollTop; $('#hdr').classList.toggle('scrolled', y > 10); $('#totop').classList.toggle('on', y > 900); closeCtx(); hideTip(true); scrollFns.forEach(fn => fn(y)); };
  const scrollFns = [];
  addEventListener('scroll', onScroll, { passive: true }); site.addEventListener('scroll', onScroll, { passive: true });
  $('#totop').onclick = () => scrollToEl(null);
  addEventListener('resize', syncTop);
  const scrim = $('#scrim');
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { K.closeModal(); closeMenus(); scrim.classList.remove('on'); scrimFns.forEach(fn => fn()); } });
  const scrimFns = []; scrim.onclick = () => { scrim.classList.remove('on'); scrimFns.forEach(fn => fn()); };

  /* язык: перевод делает i18n.js по словарю kz.js */
  // английский скрыт, пока нет перевода (18.11.2026)
  const LANGS = [['ru', 'РУС', 'Русский'], ['kz', 'ҚАЗ', 'Қазақша']];
  let lang = window.BQI ? BQI.lang : 'ru';
  const langM = $('#langM'), langB = $('#lang');
  const langOpen = on => { langM.hidden = !on; langB.setAttribute('aria-expanded', on); };
  // в меню только два других языка, текущий — на кнопке
  const langDraw = () => { langM.innerHTML = LANGS.filter(l => l[0] !== lang).map(([k, s, t]) => `<button data-l="${k}"><b>${s}</b>${t}</button>`).join(''); };
  langDraw(); $('b', langB).textContent = LANGS.find(l => l[0] === lang)[1];
  langB.onclick = e => { e.stopPropagation(); langOpen(langM.hidden); };
  document.addEventListener('click', e => { if (!e.target.closest('.langw')) langOpen(false); });
  langM.onclick = e => {
    const b = e.target.closest('[data-l]'); if (!b) return;
    if (R.PRETTY) { langOpen(false); if (window.BQI) BQI.setLang(b.dataset.l); return; } // на готовом сайте — переход на адрес /kz/…
    lang = b.dataset.l; langOpen(false); langDraw(); $('b', langB).textContent = LANGS.find(l => l[0] === lang)[1];
    if (window.BQI) BQI.setLang(lang);
  };


  /* готовый сайт: старые ссылки в разметке → новые адреса; #якорь — к текущему адресу (иначе <base href="/"> уведёт на главную) */
  function fixLinks(root) {
    const L = root.matches && root.matches('a[href]') ? [root] : $$('a[href]', root);
    L.forEach(a => { const h = a.getAttribute('href'); const n = h[0] === '#' && h.length > 1 ? location.pathname + h : R.url(h); if (n !== h) a.setAttribute('href', n); });
  }
  // H1 по карте страниц (docs/seo/PAGES.md): текст задаёт сборка в <meta name="bq-h1">; если на странице H1 нет — невидимый
  function seoH1() {
    const m = document.querySelector('meta[name="bq-h1"]'); if (!m) return;
    const hs = $$('main h1');
    // «ЖК Alatau Life — квартиры рядом с КазУБТ»: название крупно, пояснение — второй строкой помельче (текст H1 целиком тот же)
    const [a, ...rest] = m.content.split(' — '), sub = rest.join(' — ');
    const html = sub ? `${a}<span style="font-size:0"> — </span><span style="display:block;font-size:.42em;line-height:1.25;font-weight:400;letter-spacing:0;margin-top:.3em;color:var(--ink2)">${sub}</span>` : null;
    if (hs.length) { if (hs[0].textContent !== m.content) { if (html) hs[0].innerHTML = html; else hs[0].textContent = m.content; } hs.slice(1).forEach(h => { const x = document.createElement('div'); x.className = h.className; x.innerHTML = h.innerHTML; h.replaceWith(x); }); }
    else main.insertAdjacentHTML('afterbegin', `<h1 class="bq-h1" style="position:absolute;width:1px;height:1px;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">${m.content}</h1>`);
  }

  const BQS = window.BQS = {
    $, $$, PAGE, PHOTO, DEAL, ROOFM, byId, roomStat, toast, fillIcons, isPhone, inFrame, scroller, scrollToEl, roundPoly, roofClip, layout, go, ss, api,
    fav, favToggle, card, bindGrid, bindChess, openFlat, openCtx, scrim, onScrim: fn => scrimFns.push(fn), onLayout: fn => layoutFns.push(fn), onScroll: fn => scrollFns.push(fn),
    setRoute: fn => { routeFn = fn; }, lead, seoH1, R,
    // запустить страницу: иконки, режим, переход по хэшу.
    // done = true: страница уже сама показала состояние из адреса (ЖК, квартира, вкладка) — второй раз не рисуем, чтобы не мигало
    start(done) {
      fillIcons();
      let m0 = 'desk'; try { m0 = localStorage.getItem('bq-mode') || 'desk'; } catch (e) {}
      setMode(m0);
      let h = R.hash();
      try { const x = JSON.parse(ss('bq-hash') || 'null'); if (!h && x && x.p === PAGE) h = x.h; } catch (e) {}
      if (h && !(done && h === R.hash())) setTimeout(() => { BQS.virtual = !location.hash; route(h, false); BQS.virtual = false; }, 60);
      document.fonts && document.fonts.ready.then(layout);
      addEventListener('hashchange', () => route(location.hash.slice(1), true));
      if (R.PRETTY) {
        seoH1(); document.title = T0; fixLinks(document.body);
        new MutationObserver(rs => rs.forEach(r => r.addedNodes.forEach(n => n.nodeType === 1 && fixLinks(n)))).observe(document.body, { childList: true, subtree: true });
        setTimeout(() => { seoH1(); document.title = T0; document.documentElement.dataset.ready = '1'; }, 400); // метка для сборки: страница дорисована
      }
    }
  };
})();
