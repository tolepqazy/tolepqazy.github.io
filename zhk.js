/* Страница ЖК: три комплекса, схема города с расстояниями, подробно о каждом комплексе */
(() => {
  const { ZK, monthly, fmt, mln, area, roomsWord, plural, R } = window.BQX;
  const K = window.BQK, { icon, ORDER, SHORT, ST, META, kv, rName } = K;
  const S_ = window.BQS, { $, $$, PHOTO, toast, go, isPhone, roundPoly } = S_;
  const FL = window.BQ.flats, EX = window.BQ.extra;

  const tagHTML = b => K.tags(b).slice(0, 4).map(t => `<span class="tg tg-${t.k}">${icon(t.i)}${t.t}</span>`).join('');
  const PG = b => `project.html#${b}`;

  /* список проектов: компактные карточки и фильтр (проектов со временем станет больше) */
  if ($('#zgrid')) {
    $('#zMeta').innerHTML = `<div><b class="num">${EX['Parking place'].n + EX.Storeroom.n}</b>машиномест и кладовых</div><div><b class="num">${FL.length}</b>квартир в продаже</div><div><b class="num">${ORDER.filter(b => K.status(b).k === 'done').length}</b>дом уже сдан</div>`;
    const ZF = [['st', [['all', 'Все'], ['build', 'Строятся'], ['done', 'Сданы']]], ['cls', [['all', 'Любой класс'], ['Комфорт+', 'Комфорт+'], ['Бизнес', 'Бизнес']]], ['pay', [['all', 'Любая оплата'], ['mort', 'Ипотека'], ['inst', 'Рассрочка']]]];
    const zf = { st: 'all', cls: 'all', pay: 'all' };
    $('#zFil').innerHTML = ZF.map(([k, o]) => `<div class="zf" data-f="${k}">${o.map(([v, t]) => `<button type="button" data-v="${v}" aria-pressed="${v === 'all'}">${t}</button>`).join('')}</div>`).join('') + `<span class="zf-n num" id="zfN"></span>`;
    const ok = b => (zf.st === 'all' || K.status(b).k === zf.st) && (zf.cls === 'all' || META[b].cls === zf.cls) && (zf.pay === 'all' || META[b].pay.includes(zf.pay));
    // пока проектов немного — большие панели «крыши»; когда станет больше 4 — компактная сетка
    const ROOFS = ORDER.length <= 4; $('#roofs').hidden = !ROOFS; $('#zgrid').hidden = ROOFS;
    const drawGrid = () => {
      const L = ORDER.filter(ok);
      if (ROOFS) { $$('#roofs .panel').forEach(p => p.classList.toggle('off', !L.includes(p.dataset.b))); $('#zfN').textContent = `Подходит ${L.length} из ${ORDER.length}`; return; }
      $('#zfN').textContent = `Показано ${L.length} из ${ORDER.length}`;
      $('#zgrid').innerHTML = L.length ? L.map(b => { const z = ZK[b], s = ST[b];
        return `<a class="zc" href="${PG(b)}"><div class="zc-img" data-roof="30" data-roof-m="24"><img src="${PHOTO[b]}" alt="${SHORT[b]}" loading="lazy"><div class="chips">${tagHTML(b)}</div></div>
          <div class="zc-b"><h3>${SHORT[b]}</h3><p>${icon('pin')}${z.addr} · ${z.area}</p>
          <div class="zc-r num">${s.rows.map(([r, x]) => `<span><b>${r === 4 ? '4+' : r}к</b>от ${mln(x.p)}</span>`).join('')}</div>
          <div class="zc-f num"><span>${kv(s.n)}</span><b>от ${mln(s.min)} ₸</b></div></div></a>`; }).join('')
        : `<div class="zc-none">${icon('info')}Под такой фильтр проектов нет. <button class="lnk" type="button" data-zr>Сбросить</button></div>`;
      S_.layout();
    };
    $('#zFil').onclick = e => {
      const b = e.target.closest('[data-v]'); if (!b) return; const f = b.parentNode.dataset.f; zf[f] = b.dataset.v;
      $$('button', b.parentNode).forEach(x => x.setAttribute('aria-pressed', x === b)); drawGrid();
    };
    $('#zgrid').onclick = e => { if (e.target.closest('[data-zr]')) { Object.keys(zf).forEach(k => zf[k] = 'all'); $$('#zFil button').forEach(x => x.setAttribute('aria-pressed', x.dataset.v === 'all')); drawGrid(); } };
    drawGrid();
  }
  if ($('#roofs')) {
  $('#roofs').insertAdjacentHTML('beforeend', ORDER.map(b => {
    const z = ZK[b], s = ST[b];
    return `<a class="panel" data-b="${b}" href="project.html#${b}" aria-label="${SHORT[b]}: ${kv(s.n)}"><img src="${PHOTO[b]}" alt="">
      <div class="chips">${tagHTML(b)}</div>
      <div class="pin"><h2>${SHORT[b]}</h2><div class="addr">${z.addr} · ${z.area}</div>
        <div class="from"><span>от</span><b class="num">${mln(s.min)} ₸</b><span>· ${kv(s.n)}</span></div>
        <div class="peek"><div><table class="num">${s.rows.map(([r, x]) => `<tr><td>${rName(r)}</td><td>от ${area(x.a)} м²</td><td>от ${mln(x.p)} ₸</td></tr>`).join('')}</table><span class="go">Подробнее о проекте${icon('arrow')}</span></div></div>
      </div></a>`;
  }).join(''));
  function layoutRoofs() {
    const box = $('#roofs'), panels = $$('.panel', box), W = box.clientWidth; if (!W) return;
    if (isPhone()) { for (const p of panels) { const w = p.offsetWidth, h = p.offsetHeight; p.style.clipPath = `path("${roundPoly([[0, 34], [w / 2, 0], [w, 34], [w, h], [0, h]], 18)}")`; } return; }
    const H = Math.min(92, W * .064), y = x => H * Math.abs(x - W / 2) / (W / 2);
    for (const p of panels) {
      const L = p.offsetLeft, w = p.offsetWidth, h = p.offsetHeight, pts = [[0, y(L)]];
      if (L < W / 2 && L + w > W / 2) pts.push([W / 2 - L, 0]);
      pts.push([w, y(L + w)], [w, h], [0, h]); p.style.clipPath = `path("${roundPoly(pts, 22)}")`;
    }
    const svg = $('#roofline'), path = $('path', svg);
    svg.setAttribute('height', H + 6); svg.style.top = '-16px';
    path.setAttribute('d', `M2 ${H + 2} L${W / 2} 2 L${W - 2} ${H + 2}`); svg.style.setProperty('--len', Math.ceil(path.getTotalLength()) + 2);
  }
  S_.onLayout(layoutRoofs);
  const ro = new ResizeObserver(layoutRoofs); $$('.panel').forEach(p => ro.observe(p));
  setTimeout(() => $('#roofline').classList.add('drawn'), 350);
  }

  /* схема города: точки по координатам, расстояния по прямой */
  const { CATS, LM, hav, carMin } = K.GEO;
  const lmCat = { cat: 'sight' };
  const lmVis = () => LM.filter(l => l[5] === lmCat.cat);
  const LBL = { mega: [0, 20, 'middle'], nu: [-10, 4, 'end'], baiterek: [0, -10, 'middle'], akorda: [10, 12, 'start'], khan: [-10, 4, 'end'], khanm: [-10, 4, 'end'], 'l-uni': [-10, 4, 'end'], 'l-nura': [-10, 8, 'end'], 'p-nu': [-10, 14, 'end'], 'm-cg': [-10, 12, 'end'], 'm-card': [-10, 4, 'end'], adp: [10, 14, 'start'], kazguu: [10, -6, 'start'], arch: [10, 10, 'start'] };
  // фото-подложка карты (OpenStreetMap), границы снимка
  const BASE = { src: 'img/map-astana.webp', la0: 50.93, la1: 51.30, lo0: 71.05, lo1: 71.85 };
  // для карты вокруг ЖК: по одному ближайшему месту каждой категории
  const nearBy = c => CATS.map(([k]) => LM.filter(l => l[5] === k && l[0] !== 'khanm').map(l => ({ l, d: hav(c, [l[2], l[3]]) })).sort((a, b) => a.d - b.d)[0]).filter(x => x && x.d < 7).map(x => x.l);
  const KX = Math.cos(51.1 * Math.PI / 180);

  // один компонент на две карты: обзорная (все ЖК) и вокруг выбранного ЖК
  function makeMap(el, opt) {
    const svg = $('svg', el), pins = $('.pins', el); let W, H, M;
    const m = { pt: null, ptName: '', sel: null };
    function fit() {
      W = el.clientWidth || 1000; H = el.clientHeight || 600;
      const c = opt.focus ? ZK[opt.focus].geo : null;
      const pts = opt.focus ? [c, ...nearBy(c).map(l => [l[2], l[3]])] : [...lmVis().map(l => [l[2], l[3]]), ...ORDER.map(b => ZK[b].geo)];
      let la0 = Math.min(...pts.map(p => p[0])), la1 = Math.max(...pts.map(p => p[0])), lo0 = Math.min(...pts.map(p => p[1])), lo1 = Math.max(...pts.map(p => p[1]));
      if (opt.focus) { const dla = Math.max(.03, ...pts.map(p => Math.abs(p[0] - c[0]))), dlo = Math.max(.03 / KX, ...pts.map(p => Math.abs(p[1] - c[1]))); la0 = c[0] - dla; la1 = c[0] + dla; lo0 = c[1] - dlo; lo1 = c[1] + dlo; }
      const narrow = W < 600, pad = opt.focus ? { t: 60, b: 50, l: narrow ? 40 : 120, r: narrow ? 90 : 160 } : { t: narrow ? 110 : 120, b: narrow ? 120 : 80, l: narrow ? 70 : 110, r: narrow ? 90 : 160 };
      const s = Math.min((W - pad.l - pad.r) / ((lo1 - lo0) * KX), (H - pad.t - pad.b) / (la1 - la0));
      M = { s, lo0, la1, x0: pad.l + ((W - pad.l - pad.r) - (lo1 - lo0) * KX * s) / 2, y0: pad.t + ((H - pad.t - pad.b) - (la1 - la0) * s) / 2 };
    }
    const proj = (la, lo) => [M.x0 + (lo - M.lo0) * KX * M.s, M.y0 + (M.la1 - la) * M.s];
    const unproj = (x, y) => [M.la1 - (y - M.y0) / M.s, M.lo0 + (x - M.x0) / (KX * M.s)];
    function draw() {
      fit(); svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
      const c = proj(...(opt.focus ? ZK[opt.focus].geo : [51.125, 71.43])), R = M.s / 111;
      const b0 = proj(BASE.la1, BASE.lo0), b1 = proj(BASE.la0, BASE.lo1);
      let s = `<image class="base" href="${BASE.src}" x="${b0[0]}" y="${b0[1]}" width="${b1[0] - b0[0]}" height="${b1[1] - b0[1]}" preserveAspectRatio="none"/><g>`;
      const rings = opt.focus ? [1, 3, 5] : [3, 6, 9, 12];
      rings.forEach(k => c[1] + k * R * .71 + 12 > H - 24 || c[0] + k * R * .71 + 44 > W ? s += `<circle class="ring" cx="${c[0]}" cy="${c[1]}" r="${k * R}"/>` : s += `<circle class="ring" cx="${c[0]}" cy="${c[1]}" r="${k * R}"/><text class="rl" x="${c[0] + k * R * .71 + 4}" y="${c[1] + k * R * .71 + 12}">${k} км${opt.focus ? ` · ≈${carMin(k)} мин` : k === 3 && W > 600 ? ' от центра' : ''}</text>`);
      s += '</g>';
      if (m.pt) { const p = proj(...m.pt); ORDER.forEach(b => { const z = proj(...ZK[b].geo); s += `<path class="line" d="M${p} L${z}"/>`; }); }
      const SHOW = opt.focus ? nearBy(ZK[opt.focus].geo) : lmVis();
      if (opt.focus) { const z = proj(...ZK[opt.focus].geo); SHOW.forEach(([k, n, la, lo]) => { const d = hav(ZK[opt.focus].geo, [la, lo]); { const p = proj(la, lo); s += `<path class="line soft" d="M${z} L${p}"/>`; } }); }
      // подписи не должны налезать друг на друга и на карточки ЖК: пробуем 4 стороны
      pins.innerHTML = ORDER.map(b => {
        const [x, y] = proj(...ZK[b].geo), d = m.pt ? hav(m.pt, ZK[b].geo) : 0, small = opt.focus && b !== opt.focus;
        if (x < 0 || x > W || y < 0 || y > H) return '';
        if (small) return `<button class="mpin small" data-z="${b}" style="left:${x}px;top:${y}px"><i class="rf rm"></i><b>${SHORT[b]}</b></button>`;
        return `<button class="mpin ${!opt.focus && b === 'plaza' ? 'down' : ''}" data-z="${b}" aria-pressed="${(opt.focus || m.sel) === b}" style="left:${x}px;top:${y}px"><span class="hb"><img src="${PHOTO[b]}" alt=""><span><b>${SHORT[b]}</b><span class="num">от ${mln(ST[b].min)} ₸</span></span>${m.pt ? `<span class="km2 num">${d.toFixed(1)} км</span>` : ''}</span><i class="rf rm"></i></button>`;
      }).join('');
      if (!opt.focus) fixOverlap();
      pins.classList.add('nt'); const er = el.getBoundingClientRect();
      const busy = [...pins.children].map(p => { const r = p.getBoundingClientRect(); return [r.left - er.left - 4, r.top - er.top - 4, r.right - er.left + 4, r.bottom - er.top + 4]; });
      SHOW.forEach(l => { const [x, y] = proj(l[2], l[3]); busy.push([x - 6, y - 6, x + 6, y + 6]); });
      pins.classList.remove('nt');
      rings.forEach(k => { const x = c[0] + k * R * .71 + 4, y = c[1] + k * R * .71 + 12; busy.push([x, y - 11, x + (k === 3 && !opt.focus ? 96 : opt.focus ? 100 : 36), y + 3]); });
      const hit = r => busy.some(o => r[0] < o[2] && r[2] > o[0] && r[1] < o[3] && r[3] > o[1]);
      s += SHOW.map(([k, n, la, lo, ic, cat]) => {
        const [x, y] = proj(la, lo); if (x < -20 || x > W + 20 || y < -20 || y > H + 20) return '';
        const fd = opt.focus ? hav(ZK[opt.focus].geo, [la, lo]).toFixed(1).replace('.', ',') : '', nm = fd ? `${n} · ${fd} км` : n;
        const w = nm.length * 8.5 + 6, opts = [LBL[k] || [10, 4, 'start'], [10, 4, 'start'], [-10, 4, 'end'], [0, -10, 'middle'], [0, 19, 'middle'], [10, 18, 'start'], [-10, 18, 'end'], [10, -8, 'start'], [-10, -8, 'end'], ...[32, 46, 60].flatMap(d => [[0, d, 'middle'], [10, d, 'start'], [-10, d, 'end']])];
        const box = ([dx, dy, an]) => { const x0 = an === 'start' ? x + dx : an === 'end' ? x + dx - w : x + dx - w / 2; return [x0, y + dy - 12, x0 + w, y + dy + 3]; };
        const pick = opts.find(o => { const r = box(o); return r[0] > 4 && r[2] < W - 4 && !hit(r); });
        // нет свободного места — только точка, название всплывает при наведении (18.11.2026)
        if (!pick) return `<g class="lm c-${cat} ${m.ptName === n ? 'on' : ''}"><circle cx="${x}" cy="${y}" r="5"><title>${nm}</title></circle></g>`;
        busy.push(box(pick));
        const [dx, dy, an] = pick;
        return `<g class="lm c-${cat} ${m.ptName === n ? 'on' : ''}"><circle cx="${x}" cy="${y}" r="5"/><text x="${x + dx}" y="${y + dy}" text-anchor="${an}">${nm}</text></g>`;
      }).join('');
      s += `<text class="osm" x="${W - 10}" y="${H - 10}" text-anchor="end">© OpenStreetMap</text>`;
      if (m.pt && !LM.some(l => l[1] === m.ptName)) { const [x, y] = proj(...m.pt); s += `<g class="me"><circle class="pulse" cx="${x}" cy="${y}" r="8"/><circle cx="${x}" cy="${y}" r="6"/></g>`; }
      svg.innerHTML = s;
    }
    // пины Life и Eco Park стоят рядом — разводим подписи
    function fixOverlap() {
      const a = $('[data-z="life"]', pins), e = $('[data-z="eco"]', pins); if (!a || !e) return;
      const ra = a.getBoundingClientRect(), re = e.getBoundingClientRect();
      if (ra.right > re.left && ra.left < re.right && Math.abs(ra.top - re.top) < ra.height) { const ax = parseFloat(a.style.left), sh = Math.min(ra.width + 4, ax - 6); a.style.transform = `translate(-${sh}px,-100%)`; e.style.transform = `translate(${Math.max(4, ra.width + 8 - sh - (parseFloat(e.style.left) - ax))}px,-100%)`; }
    }
    el.addEventListener('click', e => {
      const p = e.target.closest('.mpin'); if (p) { opt.onPin && opt.onPin(p.dataset.z); return; }
      if (!opt.pick) return;
      const r = el.getBoundingClientRect(); m.setPoint(unproj(e.clientX - r.left, e.clientY - r.top), 'Ваша точка');
    });
    m.setPoint = (p, n) => { m.pt = p; m.ptName = n; draw(); opt.onPoint && opt.onPoint(); };
    m.draw = draw;
    return m;
  }

  let mapA = null, mapF = null;
  S_.onLayout(() => { mapA && mapA.draw(); mapF && mapF.draw(); });
  if ($('#mapA')) {
  mapA = makeMap($('#mapA'), { pick: true, onPin: b => go(PG(b)), onPoint: () => { renderSide(); toast(`${mapA.ptName}: посчитали расстояние до каждого ЖК`); } });
  const lmsDraw = () => { $('#lms').innerHTML = lmVis().map(([k, n, , , i]) => `<button data-lm="${k}" aria-pressed="${n === mapA.ptName}">${icon(i)}${n}</button>`).join(''); };
  $('#lmt').innerHTML = CATS.map(([k, t, i]) => `<button type="button" data-cat="${k}" aria-selected="${k === lmCat.cat}">${icon(i)}${t}</button>`).join('');
  $('#lmt').onclick = e => { const b = e.target.closest('[data-cat]'); if (!b) return; lmCat.cat = b.dataset.cat; $$('#lmt [data-cat]').forEach(x => x.setAttribute('aria-selected', x === b)); lmsDraw(); mapA.draw(); };
  lmsDraw();
  $('#lms').onclick = e => { const b = e.target.closest('[data-lm]'); if (!b) return; const l = LM.find(x => x[0] === b.dataset.lm); mapA.setPoint([l[2], l[3]], l[1]); };
  function renderSide() {
    $$('#lms [data-lm]').forEach(b => b.setAttribute('aria-pressed', LM.find(x => x[0] === b.dataset.lm)[1] === mapA.ptName));
    const pt = mapA.pt, L = ORDER.map(b => ({ b, d: pt ? hav(pt, ZK[b].geo) : null })).sort((x, y) => pt ? x.d - y.d : 0);
    $('#zl').innerHTML = (pt ? `<p class="zl-h">${icon('pin')}От точки «${mapA.ptName}»</p>` : `<p class="zl-h">${icon('info')}Нажмите на карту или выберите место выше</p>`) + L.map(({ b, d }, i) => `<button class="zi" data-z="${b}"><img src="${PHOTO[b]}" alt=""><div><b>${SHORT[b]}</b>${pt ? `<span class="num">${d.toFixed(1)} км по прямой · ≈ ${carMin(d)} мин на машине</span>` : `<span>${ZK[b].area} · от ${mln(ST[b].min)} ₸</span>`}${pt && !i ? '<em>Ближе всего</em>' : ''}</div>${icon('arrow')}</button>`).join('');
  }
  $('#zl').onclick = e => { const b = e.target.closest('[data-z]'); if (b) go(PG(b.dataset.z)); };
  renderSide();

  }

  if ($('#zd')) {
  /* подробно о комплексе */
  let cur = 'life';
  const chs = { r: 0 };
  const PAYI = { mort: 'bank', inst: 'wallet' };
  function buildPc(b) {
    const start = new Date('2026-03-22'), end = new Date(META[b].service || '2027-06-01');
    return b === 'eco' ? 100 : b === 'plaza' ? null : Math.max(5, Math.min(99, Math.round((Date.now() - start) / (end - start) * 100)));
  }
  // мини-кнопка с ходом стройки в меню проекта
  function navBuild(b) {
    const pc = buildPc(b), C = 2 * Math.PI * 9, done = pc === 100;
    return `<a class="zd-bp${done ? ' done' : pc === null ? ' unk' : ''}" href="#zBuild" data-to-b data-tip="${done ? 'Дом сдан, можно заезжать' : pc === null ? 'Две очереди, сроки уточняются' : 'Оценка по сроку сдачи: ' + K.status(b).t}"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle class="bp-v" cx="12" cy="12" r="9" style="stroke-dasharray:${C};--off:${pc === null ? C * .72 : C * (1 - pc / 100)};--c:${C}"/></svg><b class="num">${pc === null ? 'идёт' : done ? 'сдан' : pc + '%'}</b><span>стройка</span></a>`;
  }
  function buildHTML(b) {
    const now = new Date(), pc = buildPc(b);
    const stages = ['Котлован', 'Каркас', 'Фасад', 'Отделка', 'Сдача'], cs = pc === null ? 1 : Math.min(4, Math.floor(pc / 20));
    const ph = { life: [0, 2, 4, 6], plaza: [0, 1, 2, 3], eco: [0, 2, 5, 7] }[b], id = { life: '6839859', plaza: '5655382', eco: '5587279' }[b];
    const MON = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
    return `<div class="bl-h"><div><h3>Ход строительства</h3><p>${b === 'eco' ? 'Дом построен' : b === 'plaza' ? 'Две очереди, сроки уточняются' : K.status(b).t}</p></div><div class="bl-pc num">${pc === null ? '—' : pc + '%'}<small>${b === 'eco' ? 'готово' : pc === null ? 'добавит менеджер' : 'оценка по сроку сдачи'}</small></div></div>
      <div class="bl-bar"><i style="--w:${pc || 0}%"></i></div>
      <div class="bl-steps">${stages.map((t, i) => `<span class="${i < cs || pc === 100 ? 'ok' : i === cs && pc !== null ? 'now' : ''}">${t}</span>`).join('')}</div>
      <div class="bl-ph">${ph.map((n, i) => { const d = new Date(now.getFullYear(), now.getMonth() - i, 1); return `<figure><img src="img/ph_${id}_${n}.webp" alt="" loading="lazy"><figcaption>${MON[d.getMonth()]} ${d.getFullYear()}</figcaption></figure>`; }).join('')}</div>
      <span class="demo-lab">${icon('info')}Фотоотчёт со стройки обновляем каждый месяц</span>`;
  }
  /* лендинг проекта: преимущества, галерея, локация, акции, видео */
  const PHS = { life: [3, 1, 7, 4, 0, 2, 5, 6, 8, 9, 10], plaza: [0, 1, 3, 4, 2], eco: [0, 4, 5, 7, 1, 2, 3, 6] }, PID = { life: '6839859', plaza: '5655382', eco: '5587279' };
  const ph = (b, n) => `img/ph_${PID[b]}_${n}.webp`;
  // фото по разделам: [ключ, название, иконка, подпись раздела, [[номер фото, подпись], ...]]
  const GCAT = {
    life: [['fac', 'Фасад', 'building', 'Светлый дом в 9 этажей с панорамными окнами и подсветкой', [[3, 'Фасад и панорамные окна'], [4, 'Архитектурная подсветка вечером'], [5, 'Улица у дома']]],
      ['yard', 'Двор', 'tree', 'Закрытый двор без машин: зелень, площадки и места для отдыха', [[0, 'Зелёный двор'], [1, 'Детская площадка'], [2, 'Прогулочная зона']]],
      ['hall', 'Холл', 'sofa', 'Входная группа как в отеле: лобби, зона ожидания, лифтовые холлы', [[6, 'Входная группа'], [7, 'Лобби с зоной ожидания'], [9, 'Лифтовой холл'], [8, 'Вход в подъезд'], [10, 'Коридор на этаже']]]],
    plaza: [['fac', 'Фасад', 'building', '17 этажей бизнес-класса в районе Экспо, две очереди', [[0, 'Главный фасад'], [2, 'Вид с Кабанбай батыра'], [1, 'Комплекс и зелёная зона']]],
      ['com', 'Для жителей', 'sofa', 'Общие пространства внутри дома: кинорум и детская игровая', [[3, 'Кинорум для жителей'], [4, 'Детская игровая']]]],
    eco: [['fac', 'Фасад', 'building', 'Дом уже построен: так он выглядит сейчас', [[0, 'Фасад с названием комплекса'], [3, 'Фасад вдоль улицы'], [2, 'Общий вид комплекса'], [1, 'Первые этажи']]],
      ['yard', 'Двор', 'tree', 'Двор без машин с клумбами, детской и спортивной площадками', [[4, 'Двор с клумбой'], [5, 'Спортивная и детская площадки'], [6, 'Детская площадка']]],
      ['hall', 'Холл', 'sofa', 'Светлый холл, вход по Face ID и бесшумные лифты', [[7, 'Холл с лифтами']]]]
  };
  // всё для просмотра: фото по разделам + рендеры
  const galItems = b => [...GCAT[b].flatMap(([k, t, , , L]) => L.map(([n, c]) => ({ src: ph(b, n), cap: c, cat: k, ct: t }))),
    { src: PHOTO[b], cap: 'Визуализация проекта', cat: 'rn', ct: 'Рендеры' }, { src: ZK[b].night, cap: 'Вечером', cat: 'rn', ct: 'Рендеры' }];
  // раздел галереи: большое фото + до 4 малых, лишнее — «+N»
  const gcatGrid = (b, L, k, max = 5) => { const sh = L.slice(0, max), more = L.length - sh.length, n = sh.length;
    const cls = i => i === 0 ? (n === 1 ? 'w4 h2' : 'w2 h2') : n === 2 ? 'w2 h2' : n === 3 ? 'w2' : n === 4 && i === 1 ? 'w2' : '';
    return sh.map(([no, c], i) => `<button type="button" class="gi ${cls(i)}" data-v="${k}:${i}" aria-label="${c}"><img src="${ph(b, no)}" alt="" loading="lazy"><span class="gi-c">${c}</span>${more && i === n - 1 ? `<span class="gi-plus num">+${more}</span>` : ''}</button>`).join(''); };
  const USP = {
    life: [['Архитектура', 'Светлый фасад и панорамные окна', 'Дом в 9 этажей с панорамным остеклением и благоустроенной территорией. Потолки 3 метра: в квартирах много воздуха и света.', 3, ['Панорамные окна', 'Потолки 3 м', 'Подсветка фасада']],
      ['Двор', 'Двор без машин', 'Закрытая территория только для жителей: детская площадка, зелень и места для отдыха. Дети гуляют сами, а родители спокойны.', 1, ['Закрытый двор', 'Детская площадка', 'Видеонаблюдение']],
      ['Холл', 'Холлы с авторским дизайном', 'Входная группа как в хорошем отеле: зона ожидания, скоростные лифты, вход по Face ID и смарт-замки в квартирах.', 7, ['Face ID', 'Смарт-замки', 'Скоростные лифты']],
      ['Вечером', 'Дом, который красив и вечером', 'Архитектурная подсветка делает дом заметным и уютным, а освещённый двор — безопасным в любое время.', 4, ['Подсветка', 'Освещённый двор', 'Шумоизоляция']]],
    plaza: [['Архитектура', 'Бизнес-класс на Кабанбай батыра', 'Современный 17-этажный комплекс из двух очередей в районе Экспо. Чистовая отделка и повышенная шумоизоляция.', 0, ['Бизнес-класс', '2 очереди', 'Чистовая отделка']],
      ['Территория', 'Озеленённая территория', 'Прогулочные дорожки и зелёные зоны вокруг комплекса: место для прогулок с детьми и вечернего отдыха.', 1, ['Прогулочные дорожки', 'Зелёные зоны', 'Face ID']],
      ['Для жителей', 'Свой кинорум в доме', 'Кинорум для жителей: смотреть фильмы с друзьями и соседями, не выходя из дома.', 3, ['Кинорум', 'Общие пространства', 'Смарт-замки']],
      ['Для детей', 'Детская игровая прямо в доме', 'Тёплая игровая комната для малышей: играть можно в любую погоду, даже зимой.', 4, ['Детская игровая', 'Безопасно', 'Рядом с домом']]],
    eco: [['Дом построен', 'Можно заезжать сразу', 'Alatau Eco Park уже сдан: приезжайте, посмотрите квартиру, двор и подъезд вживую и заезжайте после сделки.', 0, ['Дом сдан', 'Ипотека 7-20-25', 'Потолки 3 м']],
      ['Двор', 'Закрытый двор с зелёной зоной', 'Двор без машин с местами для отдыха и зеленью. Видеонаблюдение по периметру и на всех этажах.', 4, ['Закрытый двор', 'Видеонаблюдение', 'Зелень']],
      ['Площадки', 'Детская и спортивная площадки', 'Во дворе есть всё для детей и подростков: игровая зона и спортивная площадка.', 5, ['Детская площадка', 'Спортплощадка', 'Безопасно']],
      ['Холл', 'Светлый холл и бесшумные лифты', 'Вход по Face ID, смарт-замки с Touch ID и бесшумные лифты: удобно каждый день.', 7, ['Face ID', 'Touch ID', 'Бесшумные лифты']]]
  };
  const UNDER = b => [
    ZKS_P.includes(b) && ['car', 'Крытый паркинг', 'Тёплое место под домом, лифт до этажа, места под зарядку электромобиля.', 'img/g/card-park.webp', `от ${mln(EX['Parking place'].min)} ₸`, 'extra.html#parking', 'Выбрать место'],
    ['box', 'Кладовые', 'Место для колясок, шин и сезонных вещей, чтобы в квартире было свободно.', 'img/g/card-store.webp', `от ${area(EX.Storeroom.amin)} м² · от ${mln(EX.Storeroom.min)} ₸`, 'extra.html#store', 'Выбрать кладовую'],
    ['shop', 'Коммерция на первом этаже', b === 'plaza' ? 'Детский центр, офисы и сервисы прямо в доме.' : 'Кофейня, аптека и сервисы в шаге от подъезда.', 'img/g/card-shop.webp', 'Помещения от 48 м²', 'extra.html#commerce', 'Смотреть помещения']].filter(Boolean);
  const ZKS_P = ['life', 'eco'];
  const eom = () => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59); };
  const eow = () => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate() + (7 - d.getDay()) % 7, 23, 59, 59); };
  const PROMO = b => {
    const ch = FL.filter(f => f.b === b).sort((x, y) => x.p - y.p)[0], n = FL.filter(f => f.b === b).length;
    const L = {
      inst: { img: 'promo-inst', pc: '#5B21B6', ic: 'wallet', lab: 'Рассрочка', t: 'Рассрочка 0% без банка', p: 'Взнос от 30%, остаток равными платежами до 24 месяцев.', h: 'mortgage.html#inst', until: eom() },
      full: { img: 'promo-full', pc: '#9A4A00', ic: 'percent', lab: 'Скидка', t: 'До 10% за оплату сразу', p: '3% при 25%, 5% при 50% и 10% при полной оплате.', h: 'mortgage.html#full', until: eom() },
      hot: { img: 'promo-hot', pc: '#A3135A', ic: 'tag', lab: 'Спеццена недели', t: `${roomsWord(ch.r)} за ${mln(ch.p)} ₸`, p: `${area(ch.a)} м², ${ch.fl} этаж. Цена действует до воскресенья.`, h: `flat.html#flat-${ch.id}`, until: eow() },
      last: { img: 'promo-last', pc: '#B4380B', ic: 'bell', lab: 'Осталось мало', t: (n === 1 ? 'Последняя квартира' : `Последние ${kv(n)}`), p: 'Дом построен, можно заезжать сразу после сделки.', h: `flats.html#zk-${b}`, left: n },
      g7: { img: 'promo-7', pc: '#1E3FA8', ic: 'bank', lab: 'Госпрограмма', t: 'Ипотека 7-20-25', p: 'Ставка 7% на весь срок, взнос от 20%, до 25 лет.', h: 'mortgage.html#7' },
      park: { img: 'promo-park', pc: '#0B6B66', ic: 'car', lab: 'Вместе с квартирой', t: 'Машиноместо к квартире', p: 'Один договор и одна сумма с квартирой.', h: 'extra.html#parking', until: new Date(new Date().getFullYear(), new Date().getMonth() + 2, 0, 23, 59, 59) } };
    return { life: ['hot', 'full', 'park'], plaza: ['inst', 'full', 'hot'], eco: ['last', 'g7', 'park'] }[b].map(k => L[k]);
  };
  const VIDS = b => [['yt', `Обзор ${SHORT[b]}: двор, холл и квартиры`, PHOTO[b], 'https://www.youtube.com/results?search_query=' + encodeURIComponent('Baqyt Group ' + SHORT[b])],
    ['ig', 'Двор и площадки', ph(b, USP[b][1][3]), 'https://www.instagram.com/baqyt_group/'], ['ig', USP[b][2][1], ph(b, USP[b][2][3]), 'https://www.instagram.com/baqyt_group/'], ['ig', b === 'eco' ? 'Дом вечером' : 'Ход стройки за месяц', ph(b, USP[b][3][3]), 'https://www.instagram.com/baqyt_group/']];
  function landHTML(b) {
    const z = ZK[b], m = META[b], phs = PHS[b];
    return `
      <nav class="zd-nav" id="zdNav" aria-label="Разделы проекта">${[['zUsp', 'Преимущества'], ['zGal', 'Галерея'], ['zLoc', 'Локация'], ['zPromo', 'Акции'], ['zVid', 'Видео'], ['zBuild', 'Стройка'], ['zchess', 'Квартиры']].map(([id, t], i) => `<a href="#${id}" data-to="${id}" class="${i ? '' : 'on'}">${t}</a>`).join('')}${navBuild(b)}<button class="kb pri sm" data-visit>${icon('cal')}Записаться на показ</button></nav>
      <section class="zl-sec" id="zUsp"><div class="sec-h"><div><span class="eyebrow"><i class="rm"></i>Преимущества</span><h2>Почему выбирают ${SHORT[b]}</h2></div><p>${z.benefits.slice(0, 4).join(' · ')}</p></div>
        <div class="usp">${USP[b].map(([e, t, d, n, pts], i) => `<article class="us ${i % 2 ? 'flip' : ''}"><div class="us-pic" data-roof="40" data-roof-m="24"><img src="${ph(b, n)}" alt="${t}" loading="lazy"><span class="us-n num">0${i + 1}</span></div>
          <div class="us-t"><span class="us-e">${e}</span><h3>${t}</h3><p>${d}</p><div class="us-pts">${pts.map(p => `<span>${icon(K.benefitIcon(p))}${p}</span>`).join('')}</div></div></article>`).join('')}</div>
        <h3 class="us-h">Под домом и на первом этаже</h3>
        <div class="under">${UNDER(b).map(([i, t, d, img, pr, h, go]) => `<a class="un" href="${h}"><img src="${img}" alt="" loading="lazy"><span class="un-i">${icon(i)}</span><div><b>${t}</b><p>${d}</p><span class="un-f"><em class="num">${pr}</em><span>${go}${icon('arrow')}</span></span></div></a>`).join('')}</div></section>
      <section class="zl-sec" id="zGal"><div class="sec-h"><div><span class="eyebrow"><i class="rm"></i>Галерея</span><h2>Фото, рендеры и 3D-тур</h2></div>
          <div class="gtabs" role="tablist"><button type="button" data-g="all" aria-pressed="true">${icon('grid')}Все <b class="num">${GCAT[b].reduce((a, c) => a + c[4].length, 0)}</b></button>${GCAT[b].map(([k, t, ic, , L]) => `<button type="button" data-g="${k}" aria-pressed="false">${icon(ic)}${t} <b class="num">${L.length}</b></button>`).join('')}<button type="button" data-g="rn" aria-pressed="false">${icon('eye')}Рендеры</button><button type="button" data-g="pn" aria-pressed="false">${icon('cube')}360°</button></div></div>
        <div class="gal gall on" data-gp="all">${GCAT[b].map(([k, t, ic, d, L], ci) => `<div class="gc"><div class="gc-h"><span class="gc-n num">0${ci + 1}</span><h3>${icon(ic)}${t}</h3><p>${d}</p><button type="button" class="lnk" data-v="${k}:0" data-icon="arrow">Смотреть ${L.length} фото</button></div><div class="gc-g">${gcatGrid(b, L, k)}</div></div>`).join('')}</div>
        ${GCAT[b].map(([k, t, , , L]) => `<div class="gal" data-gp="${k}">${gcatGrid(b, L, k, 99)}</div>`).join('')}
        <div class="gal rn" data-gp="rn"><button type="button" class="gi w2 h2" data-v="rn:0"><img src="${PHOTO[b]}" alt="" loading="lazy"><span class="gi-l">Визуализация проекта</span></button><button type="button" class="gi" data-v="rn:1"><img src="${z.night}" alt="" loading="lazy"><span class="gi-l">Вечером</span></button><div class="gi gi-more">${icon('info')}<span>Новые рендеры и планы благоустройства публикуем по мере готовности</span></div></div>
        <div class="gal pn" data-gp="pn"><div class="pano"><img src="${PHOTO[b]}" alt=""><div class="pano-c"><span class="pano-i">${icon('cube')}</span><b>${m.pano ? 'Прогуляйтесь по проекту в 3D' : '3D-тур готовится'}</b><p>${m.pano ? 'Двор, холл и вид из окон в панораме 360°. Тур откроется в новой вкладке.' : 'Дом уже построен: приезжайте и посмотрите всё вживую.'}</p>${m.pano ? `<a class="kb pri" href="${m.pano}" target="_blank" rel="noopener">${icon('cube')}Открыть 3D-тур</a>` : `<button class="kb pri" data-visit>${icon('cal')}Записаться на показ</button>`}</div></div></div></section>
      <section class="zl-sec" id="zLoc"><div class="sec-h"><div><span class="eyebrow"><i class="rm"></i>Локация</span><h2>Всё нужное рядом с домом</h2></div><p>${z.addr} · ${z.area}. Выберите, что важно: ЛРТ, школы, ТРЦ, больницы или парки, и посмотрите, сколько до них ехать.</p></div>
        ${K.nearMap(b, ['lrt', 'edu', 'mall', 'park'])}</section>
      <section class="zl-sec" id="zPromo"><div class="sec-h"><div><span class="eyebrow"><i class="rm"></i>Акции</span><h2>Выгодно в ${SHORT[b]} сейчас</h2></div><div class="zd-pay">${m.pay.map(p => `<a class="tg tg-status" href="mortgage.html#${p === 'inst' ? 'inst' : b === 'eco' ? '7' : 'market'}">${icon(PAYI[p])}${K.PAYN[p]}</a>`).join('')}<a class="tg" href="mortgage.html#full">${icon('key')}Скидки за оплату</a></div></div>
        <div class="zpr">${PROMO(b).map(x => `<a class="pr pr2" href="${x.h}" style="--pc:${x.pc}"><img src="img/g/${x.img}.webp" alt="" loading="lazy"><span class="lab">${icon(x.ic)}${x.lab}</span>${x.until ? `<span class="pr-tm num" data-until="${+x.until}" data-tip="Срок акции указан для примера">${icon('clock')}<b></b></span>` : x.left ? `<span class="pr-tm hot num">${icon('bell')}<b>Осталось ${x.left}</b></span>` : ''}<h3>${x.t}</h3><p>${x.p}</p><span class="go">Подробнее${icon('arrow')}</span></a>`).join('')}</div></section>
      <section class="zl-sec" id="zVid"><div class="sec-h"><div><span class="eyebrow"><i class="rm"></i>Видео</span><h2>Видеообзоры и рилсы</h2></div><p>Прогулка по двору и холлам, вид из окон и ход стройки. Видео откроются в YouTube и Instagram.</p></div>
        <div class="vids">${VIDS(b).map(([k, t, img, h], i) => `<a class="vd ${k} ${i ? '' : 'big'}" href="${h}" target="_blank" rel="noopener"><img src="${img}" alt="" loading="lazy"><span class="vd-s">${icon(k === 'yt' ? 'yt' : 'insta')}${k === 'yt' ? 'YouTube' : 'Reels'}</span><span class="vd-p">${icon('play')}</span><b>${t}</b></a>`).join('')}</div></section>`;
  }
  function mountLand(root) {
    root.querySelectorAll('#zPromo, a[href="#zPromo"]').forEach(el => el.remove()); // неподтверждённые акции (CLAUDE.md)
    K.mountNear(root);
    // таймеры акций
    const tick = () => $$('[data-until]', root).forEach(el => { const d = Math.max(0, +el.dataset.until - Date.now()), D = Math.floor(d / 864e5), p2 = n => String(n).padStart(2, '0'); $('b', el).textContent = `${D ? D + ' д ' : ''}${p2(Math.floor(d / 36e5) % 24)}:${p2(Math.floor(d / 6e4) % 60)}:${p2(Math.floor(d / 1e3) % 60)}`; });
    tick(); clearInterval(window._zt); window._zt = setInterval(tick, 1000);
    // галерея: вкладки и просмотр на весь экран
    const gt = $('.gtabs', root);
    gt.onclick = e => { const x = e.target.closest('[data-g]'); if (!x) return; $$('[data-g]', gt).forEach(y => y.setAttribute('aria-pressed', y === x)); $$('[data-gp]', root).forEach(p => p.classList.toggle('on', p.dataset.gp === x.dataset.g)); S_.layout && S_.layout(); };
    // навигация по разделам: подсветка текущего
    const nav = $('#zdNav', root), ids = $$('[data-to]', nav).map(a => a.dataset.to);
    nav.onclick = e => { const a = e.target.closest('[data-to],[data-to-b]'); if (!a) return; e.preventDefault(); const t = document.getElementById(a.dataset.to || 'zBuild'); if (t) scrollTo({ top: t.getBoundingClientRect().top + scrollY - 150, behavior: 'smooth' }); };
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { $$('[data-to]', nav).forEach(a => a.classList.toggle('on', a.dataset.to === en.target.id)); const on = $('.on', nav); on && nav.scrollTo({ left: on.offsetLeft - 20, behavior: 'smooth' }); } }), { rootMargin: '-40% 0px -55% 0px' });
    ids.forEach(id => { const s = document.getElementById(id); s && io.observe(s); });
    const first = document.getElementById(ids[0]); window.removeEventListener('scroll', window._zs || (() => {})); window._zs = () => { if (first.getBoundingClientRect().top > innerHeight * .45) $$('[data-to]', nav).forEach((a, i) => a.classList.toggle('on', !i)); }; window.addEventListener('scroll', window._zs, { passive: true });
    // появление блоков при прокрутке
    const rv = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); rv.unobserve(en.target); } }), { threshold: .2 });
    $$('.us, .un, .vd', root).forEach(x => rv.observe(x));
  }
  // просмотрщик: разделы, лента миниатюр, приближение, слайд-шоу, свайп
  const PAUSE = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>';
  function viewer(b, cat, idx) {
    const L = galItems(b), cats = [...new Map(L.map(x => [x.cat, x.ct])).entries()];
    let i = Math.max(0, L.findIndex(x => x.cat === cat) + idx), zoom = false, play = null;
    const box = document.createElement('div'); box.className = 'pv'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', 'Просмотр фото ' + SHORT[b]);
    box.innerHTML = `<div class="pv-top"><b class="pv-t">${SHORT[b]}</b><div class="pv-tabs">${cats.map(([k, t]) => `<button type="button" data-c="${k}">${t} <span class="num">${L.filter(x => x.cat === k).length}</span></button>`).join('')}</div>
      <span class="pv-c num"></span><button class="ico pv-pl" aria-label="Слайд-шоу" data-tip="Слайд-шоу">${icon('play')}</button><button class="ico pv-z" aria-label="Приблизить" data-tip="Приблизить">${icon('search')}</button><button class="kb pri sm pv-go" data-visit>${icon('cal')}Посмотреть вживую</button><button class="ico pv-x" aria-label="Закрыть">${icon('close')}</button></div>
      <div class="pv-st"><div class="pv-im"><img alt=""></div><button class="ico pv-p" aria-label="Назад">${icon('back')}</button><button class="ico pv-n" aria-label="Дальше">${icon('arrow')}</button>
        <div class="pv-cap"><span class="pv-cat"></span><b></b></div><i class="pv-bar"></i></div>
      <div class="pv-strip">${L.map((x, k) => `<button type="button" data-k="${k}" class="${k && x.cat !== L[k - 1].cat ? 'gap' : ''}" aria-label="${x.cap}"><img src="${x.src}" alt="" loading="lazy"></button>`).join('')}</div>`;
    const im = $('.pv-im img', box), wrap = $('.pv-im', box), strip = $('.pv-strip', box);
    const setZoom = (z, ev) => { zoom = z; box.classList.toggle('zoom', z); if (z && ev) pan(ev); if (!z) im.style.transformOrigin = '50% 50%'; };
    const pan = ev => { const r = wrap.getBoundingClientRect(); im.style.transformOrigin = `${((ev.clientX - r.left) / r.width) * 100}% ${((ev.clientY - r.top) / r.height) * 100}%`; };
    const show = (dir = 0) => { const x = L[i]; setZoom(false); im.classList.remove('in'); im.style.setProperty('--dx', dir * 40 + 'px'); void im.offsetWidth; im.src = x.src; im.classList.add('in');
      $('.pv-cap b', box).textContent = x.cap; $('.pv-cat', box).textContent = x.ct; $('.pv-c', box).textContent = `${i + 1} / ${L.length}`;
      $$('.pv-tabs button', box).forEach(t => t.setAttribute('aria-pressed', t.dataset.c === x.cat));
      $$('.pv-strip button', box).forEach((t, k) => t.classList.toggle('on', k === i)); const on = $('.pv-strip .on', box); on && strip.scrollTo({ left: on.offsetLeft - strip.clientWidth / 2 + on.offsetWidth / 2, behavior: 'smooth' });
      [L[(i + 1) % L.length], L[(i - 1 + L.length) % L.length]].forEach(n => { const p = new Image(); p.src = n.src; }); if (play) restartBar(); };
    const go = d => { i = (i + d + L.length) % L.length; show(d); };
    const restartBar = () => { const bar = $('.pv-bar', box); bar.classList.remove('run'); void bar.offsetWidth; bar.classList.add('run'); };
    const toggle = on => { clearInterval(play); play = on ? setInterval(() => go(1), 4000) : null; box.classList.toggle('playing', !!play); $('.pv-pl', box).innerHTML = play ? PAUSE : icon('play'); if (play) restartBar(); };
    const close = () => { toggle(false); box.classList.add('out'); setTimeout(() => box.remove(), 250); document.removeEventListener('keydown', key); document.documentElement.style.overflow = ''; };
    const key = ev => { if (ev.key === 'Escape') { zoom ? setZoom(false) : close(); } else if (ev.key === 'ArrowRight') go(1); else if (ev.key === 'ArrowLeft') go(-1); else if (ev.key === ' ') { ev.preventDefault(); toggle(!play); } };
    box.onclick = ev => { const t = ev.target;
      if (t.closest('.pv-n')) go(1); else if (t.closest('.pv-p')) go(-1); else if (t.closest('.pv-x')) close(); else if (t.closest('.pv-pl')) toggle(!play);
      else if (t.closest('.pv-z')) setZoom(!zoom); else if (t.closest('[data-k]')) { toggle(false); const k = +t.closest('[data-k]').dataset.k; const d = k > i ? 1 : -1; i = k; show(d); }
      else if (t.closest('[data-c]')) { toggle(false); i = L.findIndex(x => x.cat === t.closest('[data-c]').dataset.c); show(1); }
      else if (t.closest('.pv-go')) close();
      else if (t === im) { toggle(false); setZoom(!zoom, ev); } else if (t.classList.contains('pv-st')) close(); };
    wrap.onmousemove = ev => { if (zoom) pan(ev); };
    let sx = null; wrap.ontouchstart = ev => { sx = ev.touches[0].clientX; }; wrap.ontouchend = ev => { if (sx === null || zoom) return; const dx = ev.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); sx = null; };
    document.addEventListener('keydown', key); document.body.append(box); document.documentElement.style.overflow = 'hidden'; show();
  }
  document.addEventListener('click', e => { const g = e.target.closest('[data-v]'); if (!g || !g.closest('#zd')) return; const [c, k] = g.dataset.v.split(':'); viewer(cur, c, +k); });
  function select(b) {
    if (!ZK[b]) return; cur = b; const z = ZK[b], m = META[b], s = ST[b], st = K.status(b);
    document.title = SHORT[b] + ' · Baqyt'; $('#crumbN').textContent = SHORT[b];
    $('#zOther').innerHTML = ORDER.filter(x => x !== b).map(x => `<a class="zo" href="${PG(x)}"><img src="${PHOTO[x]}" alt="" loading="lazy"><span><b>${SHORT[x]}</b><small class="num">${kv(ST[x].n)} · от ${mln(ST[x].min)} ₸</small></span>${icon('arrow')}</a>`).join('');
    if (window.BQV) window.BQV(b);
    const facts = [['star', 'Класс', m.cls], [st.k === 'done' ? 'key' : 'clock', 'Срок', st.t.replace('Сдача: ', '')], ['building', 'Этажей', m.floors + (m.queues ? ', две очереди' : '')], ['door', 'Подъездов', z.ents.length], ['ceil', 'Потолки', m.ceil || 'уточняется'], ['home', 'В продаже', kv(s.n)]];
    const cheap = [1, 2, 3, 4].map(r => FL.filter(f => f.b === b && Math.min(f.r, 4) === r).sort((x, y) => x.p - y.p)[0]).filter(Boolean);
    $('#zd').innerHTML = `
      <div class="zd-h"><div><div class="zd-tags">${tagHTML(b)}</div><h1 class="zd-name">${SHORT[b]}</h1><p class="fx-addr">${icon('pin')}${z.addr} · ${z.area}</p></div>
        <div class="zd-cta"><div class="zd-from num"><span>Квартиры от</span><b>${mln(s.min)} ₸</b></div><a class="kb pri" href="flats.html#zk-${b}">${icon('search')}${kv(s.n)}</a><button class="kb" data-visit>${icon('cal')}Показ</button>${m.pano ? `<a class="kb" href="${m.pano}" target="_blank" rel="noopener">${icon('cube')}3D-тур</a>` : ''}</div></div>
      <div class="zd-gal"><img src="${PHOTO[b]}" alt="${z.name}" data-roof="44" data-roof-m="26">${z.gallery.map(g => `<img src="${g}" alt="" loading="lazy">`).join('')}</div>
      <div class="zd-facts">${facts.map(([i, l, v]) => `<div>${icon(i)}<span>${l}</span><b>${v}</b></div>`).join('')}</div>
${landHTML(b)}
      <div class="zd-sec build" id="zBuild"><div class="bl">${buildHTML(b)}</div>
        <div class="bl"><div class="bl-h"><div><h3>Документы</h3><p>Оригиналы покажем в офисе, копии пришлём в кабинет</p></div></div>
          <div class="docs">${z.dev ? `<div class="doc"><span class="di">${icon('building')}</span><div><b>Застройщик</b><span>${z.dev}</span></div></div>` : ''}<div class="doc"><span class="di">${icon('doc')}</span><div><b>Разрешение на строительство</b><span>${z.name}</span></div></div><div class="doc"><span class="di">${icon('file')}</span><div><b>Проектная декларация</b><span>Сроки, этажность, площади</span></div></div><div class="doc"><span class="di">${icon('key')}</span><div><b>Договор долевого участия</b><span>Образец можно прочитать до брони</span></div></div></div>
          <button class="kb" data-call>${icon('phone')}Запросить документы</button></div></div>
      <div class="zd-sec" id="zchess"><div class="sec-h"><div><h2>Все квартиры по этажам</h2></div><p>Выберите этаж и окна, которые нравятся: у каждой квартиры есть планировка, цена и расчёт платежа.</p></div>
        <div class="chs-top"><div class="chipset" id="zR">${[[0, 'Все'], [1, '1к'], [2, '2к'], [3, '3к'], [4, '4к+']].map(([r, t]) => `<button aria-pressed="${r === chs.r}" data-r="${r}">${t}</button>`).join('')}</div>
          <div class="chs-leg"><span><i style="background:#EFE7FF"></i>1к</span><span><i style="background:#DCCBFF"></i>2к</span><span><i style="background:#C2A6FA"></i>3к</span><span><i style="background:#A27EF0"></i>4к+</span><span><i style="background:repeating-linear-gradient(135deg,var(--line) 0 3px,transparent 3px 6px)"></i>продана</span></div></div>
        <div class="chs-wrap" id="zChess">${K.chess(b, chs.r)}</div></div>
      <div class="zd-sec"><div class="sec-h"><div><h2>Самые доступные по комнатности</h2></div><a class="kb" href="flats.html#zk-${b}">${icon('arrow')}${s.n === 1 ? '' : 'Все '}${kv(s.n)}</a></div><div class="grid" id="zFlats">${cheap.map((f, i) => S_.card(f, i)).join('')}</div></div>`;
    $('#zR').onclick = e => { const x = e.target.closest('[data-r]'); if (!x) return; chs.r = +x.dataset.r; $$('#zR button').forEach(y => y.setAttribute('aria-pressed', +y.dataset.r === chs.r)); $('#zChess').innerHTML = K.chess(cur, chs.r); };
    mountLand($('#zd'));
    requestAnimationFrame(() => S_.layout());
  }
  S_.bindChess($('#zd'));
  S_.bindGrid($('#zd'));
  select(ZK[R.hash()] ? R.hash() : 'life');

  S_.setRoute(h => { if (ZK[h]) { select(h); scrollTo(0, 0); return true; } return false; });
  }
  S_.start(!!ZK[R.hash()]);
})();
