/* Паркинг, кладовые, коммерция: список с фильтром.
   С 17.11.2026 список — настоящие объекты из Макро (BQ.items, tools/macro_import.py). Пример раскладки — только если выгрузки нет. */
(() => {
  const { ZK, fmt, mln, area, plural } = window.BQX;
  const K = window.BQK, { icon, SHORT } = K;
  const EX = window.BQ.extra, S_ = window.BQS;
  // детерминированный «случайный» генератор, чтобы пример не менялся от загрузки к загрузке
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  function gen(n, zks, a0, a1, p0, p1, pre, extra) {
    const out = [];
    for (let i = 0; i < n; i++) {
      const b = zks[Math.floor(i / n * zks.length)], t = rnd(), a = Math.round((a0 + (a1 - a0) * (i === 0 ? 0 : i === n - 1 ? 1 : rnd())) * 10) / 10;
      const p = i === 0 ? p0 : i === n - 1 ? p1 : Math.round((p0 + (p1 - p0) * (.15 * t + .85 * (a - a0) / Math.max(.1, a1 - a0))) / 1e4) * 1e4;
      out.push({ id: pre + (i + 1), n: (pre === 'P' ? 'М-' : 'К-') + String(i + 1).padStart(3, '0'), b, a, p, ...extra(i, t) });
    }
    return out;
  }
  const Pk = EX['Parking place'], Sr = EX.Storeroom;
  const IT = window.BQ.items;
  const REAL = IT && {
    parking: IT.parking.map(x => ({ ...x, lv: '', f: [] })),
    store: IT.store.map(x => ({ ...x, lv: '', f: [] })),
    commerce: IT.commerce.map(x => ({ ...x, use: 'Коммерческое помещение', ic: 'shop', lv: x.fl ? x.fl + ' этаж' : '', f: [] }))
  };
  const DATA = REAL || {
    parking: gen(Pk.n, ['life', 'life', 'eco'], Pk.amin, Pk.amax, Pk.min, Pk.max, 'P', (i, t) => ({ lv: t > .5 ? '−1' : '−2', f: [t > .7 ? 'У лифта' : null, t < .25 ? 'Место под зарядку' : null].filter(Boolean) })),
    store: gen(Sr.n, ['life', 'life', 'plaza', 'eco'], Sr.amin, Sr.amax, Sr.min, Sr.max, 'S', (i, t) => ({ lv: t > .5 ? '−1' : 'цоколь', f: [t > .6 ? 'Рядом с паркингом' : null].filter(Boolean) })),
    commerce: [['Кофейня или пекарня', 'life', 64, 'shop'], ['Аптека', 'life', 48, 'shield'], ['Детский центр', 'plaza', 142, 'kid'], ['Офис или студия', 'plaza', 86, 'briefcase'], ['Магазин у дома', 'eco', 118, 'shop'], ['Салон красоты', 'eco', 72, 'star']]
      .map(([t, b, a, i], k) => ({ id: 'C' + (k + 1), n: 'Пом. ' + (k + 1), b, a, p: null, use: t, ic: i, lv: '1 этаж', f: ['Отдельный вход', k % 2 ? 'Витринные окна' : 'Высокий поток жильцов'] }))
  };
  const META = {
    parking: { t: 'Паркинг', one: 'машиноместо', ic: 'car', total: Pk.n, words: ['место', 'места', 'мест'], img: 'img/g/parking.webp', note: `${Pk.n} машиномест площадью ${area(Pk.amin)}–${area(Pk.amax)} м², цены от ${mln(Pk.min)} ₸.` },
    store: { t: 'Кладовые', one: 'кладовая', ic: 'box', total: Sr.n, words: ['кладовая', 'кладовые', 'кладовых'], img: 'img/g/store.webp', note: `${Sr.n} кладовых площадью ${area(Sr.amin)}–${area(Sr.amax)} м², цены от ${fmt(Sr.min)} ₸. Место для велосипедов, шин и сезонных вещей рядом с домом.` },
    commerce: { t: 'Коммерция', one: 'помещение', ic: 'shop', total: null, words: ['помещение', 'помещения', 'помещений'], img: 'img/g/commerce.webp', note: 'Помещения на первых этажах жилых комплексов. Условия покупки расскажет менеджер.' }
  };
  const ZKS = Object.fromEntries(Object.entries(DATA).map(([k, L]) => [k, ['life', 'plaza', 'eco'].filter(b => L.some(x => x.b === b))]));

  function itemCard(x, type) {
    const m = META[type];
    return `<article class="xc">
      <div class="xc-pic ${type}"><b class="num">${x.n}</b><span class="xc-lv">${type === 'commerce' ? icon(x.ic) : icon('layers')}${x.lv}</span></div>
      <div class="xc-b"><div class="xc-z">${SHORT[x.b]}</div><b class="xc-t">${type === 'commerce' ? x.use : m.one[0].toUpperCase() + m.one.slice(1) + ', ' + area(x.a) + ' м²'}</b>
        <div class="xc-p num">${x.p ? fmt(x.p) + ' ₸' : 'Цена по запросу'}</div>
        <div class="xc-f">${type === 'commerce' ? `<span class="tg">${area(x.a)} м²</span>` : ''}${x.f.map(f => `<span class="tg">${f}</span>`).join('')}</div>
        <div class="xc-a"><button class="kb pri sm" data-call>${icon(type === 'commerce' ? 'phone' : 'key')}${type === 'commerce' ? 'Узнать условия' : 'Забронировать'}</button>${type !== 'commerce' ? `<button class="kb sm ic" data-addto data-tip="Добавить к брони квартиры: одна сумма и один договор" aria-label="Добавить к квартире">${icon('home')}</button>` : ''}</div></div></article>`;
  }

  function mount(el, type, opt = {}) {
    const m = META[type], L = DATA[type], zks = ZKS[type];
    const A = [Math.floor(Math.min(...L.map(x => x.a))), Math.ceil(Math.max(...L.map(x => x.a)))];
    const PP = type === 'commerce' ? null : [Math.floor(Math.min(...L.map(x => x.p)) / 1e5) / 10, Math.ceil(Math.max(...L.map(x => x.p)) / 1e5) / 10];
    const st = { zk: 'all', a: [...A], p: PP ? [...PP] : null, sort: 'price', lv: 'any', limit: 12 };
    el.innerHTML = `<div class="xnote">${icon('info')}<span>${m.note}</span></div>
      <div class="xfil">
        <div><div class="f-l">Жилой комплекс</div>${zks.length > 3 ? `<select class="sort segsel" data-f="zk" aria-label="Жилой комплекс">${[['all', 'Все'], ...zks.map(b => [b, SHORT[b]])].map(([v, t]) => `<option value="${v}">${t}</option>`).join('')}</select>` : `<div class="seg" data-f="zk"><span class="thumb"></span>${[['all', 'Все'], ...zks.map(b => [b, SHORT[b].replace('Alatau ', '')])].map(([v, t]) => `<button type="button" data-v="${v}" aria-pressed="${v === 'all'}">${t}</button>`).join('')}</div>`}</div>
        <div><div class="f-l">Площадь, м² <b class="num" data-o="a"></b></div><div class="range" data-r="a"></div></div>
        ${PP ? `<div><div class="f-l">Цена, млн ₸ <b class="num" data-o="p"></b></div><div class="range" data-r="p"></div></div>` : ''}
        ${type !== 'commerce' && new Set(L.map(x => x.lv).filter(Boolean)).size > 1 ? `<div><div class="f-l">Уровень</div><div class="seg" data-f="lv"><span class="thumb"></span>${[['any', 'Любой'], ...[...new Set(L.map(x => x.lv))].map(v => [v, v])].map(([v, t]) => `<button type="button" data-v="${v}" aria-pressed="${v === 'any'}">${t}</button>`).join('')}</div></div>` : ''}
      </div>
      <div class="rbar"><div class="count"><span class="num" data-n></span> <span data-w></span></div><span class="sp"></span>${opt.more ? `<a class="kb" href="${opt.more}">${icon('arrow')}${opt.moreT}</a>` : ''}${PP ? `<select class="sort" aria-label="Сортировка"><option value="price">Сначала дешевле</option><option value="-price">Сначала дороже</option><option value="area">По площади</option></select>` : ''}</div>
      <div class="xgrid"></div><button class="kb morebtn" data-more>${icon('down')}<span>Показать ещё</span></button>`;
    const $ = s => el.querySelector(s), $$ = s => [...el.querySelectorAll(s)];
    const thumb = seg => { const b = seg.querySelector('[aria-pressed="true"]'), t = seg.querySelector('.thumb'); if (b && t && b.offsetWidth) { t.style.left = b.offsetLeft + 'px'; t.style.width = b.offsetWidth + 'px'; } };
    $$('.seg[data-f]').forEach(seg => seg.addEventListener('click', e => { const b = e.target.closest('[data-v]'); if (!b) return; st[seg.dataset.f] = b.dataset.v; $$('button', seg).forEach(x => x.setAttribute('aria-pressed', x === b)); thumb(seg); st.limit = 12; render(); }));
    $$('select.segsel[data-f]').forEach(sel => sel.addEventListener('change', () => { st[sel.dataset.f] = sel.value; st.limit = 12; render(); })); // много ЖК — выпадающий список (27.11.2026)
    function dual(r, key, [lo, hi], step, fm) {
      r.innerHTML = `<div class="track"><div class="fill"></div></div><input type="range" min="${lo}" max="${hi}" step="${step}" value="${lo}" aria-label="от"><input type="range" min="${lo}" max="${hi}" step="${step}" value="${hi}" aria-label="до">`;
      const [a, b] = r.querySelectorAll('input'), fill = r.querySelector('.fill'), out = $(`[data-o="${key}"]`);
      const upd = src => { let x = +a.value, y = +b.value; if (x > y) { if (src === a) a.value = x = y; else b.value = y = x; } st[key] = [x, y]; const p = v => (v - lo) / (hi - lo) * 100; fill.style.left = p(x) + '%'; fill.style.right = (100 - p(y)) + '%'; out.textContent = x === lo && y === hi ? (key === 'floor' ? 'любой' : 'любая') : `${fm(x)} – ${fm(y)}`; };
      a.oninput = () => { upd(a); st.limit = 12; render(); }; b.oninput = () => { upd(b); st.limit = 12; render(); }; upd();
    }
    dual($('[data-r="a"]'), 'a', A, type === 'store' ? .5 : 1, v => String(v).replace('.', ','));
    if (PP) dual($('[data-r="p"]'), 'p', PP, .1, v => String(v).replace('.', ','));
    if ($('select')) $('select').onchange = e => { st.sort = e.target.value; render(); };
    $('[data-more]').onclick = () => { st.limit += 12; render(); };
    el.addEventListener('click', e => { if (e.target.closest('[data-addto]')) S_.toast('Готово: менеджер оформит его вместе с вашей квартирой'); });
    function render() {
      const R = L.filter(x => (st.zk === 'all' || x.b === st.zk) && x.a >= st.a[0] && x.a <= st.a[1] + .05 && (!st.p || (x.p >= st.p[0] * 1e6 - 1 && x.p <= st.p[1] * 1e6 + 1)) && (st.lv === 'any' || x.lv === st.lv));
      const k = st.sort.replace('-', ''), d = st.sort[0] === '-' ? -1 : 1; R.sort((x, y) => k === 'area' ? x.a - y.a : ((x.p || 0) - (y.p || 0)) * d);
      $('[data-n]').textContent = R.length; $('[data-w]').textContent = plural(R.length, ...m.words) ;
      $('.xgrid').innerHTML = R.length ? R.slice(0, st.limit).map(x => itemCard(x, type)).join('') : `<div class="empty">Ничего не нашлось. Уберите одно условие или <button class="kb" data-call>${icon('phone')}спросите менеджера</button></div>`;
      const left = R.length - Math.min(R.length, st.limit); $('[data-more]').hidden = left <= 0; $('[data-more] span').textContent = `Показать ещё ${Math.min(12, left)} из ${left}`;
    }
    render(); S_.onLayout(() => $$('.seg[data-f]').forEach(thumb));
    return { render, setZk: b => { const sel = el.querySelector('select.segsel[data-f="zk"]'); if (sel) { sel.value = b; sel.dispatchEvent(new Event('change')); return; } const btn = el.querySelector(`.seg[data-f="zk"] [data-v="${b}"]`); if (btn) btn.click(); } };
  }
  window.BQE = { mount, META, DATA, count: t => t === 'commerce' ? null : META[t].total };
})();
