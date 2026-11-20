/* Каталог: вкладки квартиры / паркинг / кладовые / коммерция; сбоку квиз или фильтр; карточки или шахматка */
(() => {
  const { ZK, monthly, fmt, mln, area, roomsWord, plural, R } = window.BQX;
  const K = window.BQK, { icon, ORDER, SHORT, ST, META, kv } = K;
  const S_ = window.BQS, { $, $$, toast, go, ss, isPhone, DEAL } = S_;
  const FL = window.BQ.flats, EX = window.BQ.extra;
  const byId = S_.byId;

  /* вкладки */
  const TABS = [['flats', 'Квартиры', 'home', FL.length], ['parking', 'Паркинг', 'car', EX['Parking place'].n], ['store', 'Кладовые', 'box', EX.Storeroom.n], ['commerce', 'Коммерция', 'shop', null]];
  $('#fMeta').innerHTML = `<div><b class="num">${FL.length}</b>квартир</div><div><b class="num">${EX['Parking place'].n}</b>машиномест</div><div><b class="num">${EX.Storeroom.n}</b>кладовых</div>`;
  $('#ftabs').innerHTML = TABS.map(([k, t, i, n]) => `<button role="tab" data-tab="${k}" aria-selected="${k === 'flats'}">${icon(i)}${t}${n ? ` <small class="num">${n}</small>` : ''}</button>`).join('');
  const mounted = {};
  function tab(k) {
    $$('#ftabs [data-tab]').forEach(b => b.setAttribute('aria-selected', b.dataset.tab === k));
    $$('.fpane').forEach(p => p.hidden = p.dataset.pane !== k);
    if (k !== 'flats' && !mounted[k]) mounted[k] = window.BQE.mount($(`.xm[data-x="${k}"]`), k, { more: `extra.html#${k}`, moreT: 'Подробнее о разделе' });
    S_.layout(); placeSegs();
  }
  $('#ftabs').onclick = e => { const b = e.target.closest('[data-tab]'); if (b) { tab(b.dataset.tab); try { history.replaceState(null, '', location.pathname + (b.dataset.tab === 'flats' ? '' : '#tab-' + b.dataset.tab)); } catch (x) {} } };

  /* фильтр */
  const PR = [Math.floor(Math.min(...FL.map(f => f.p)) / 1e6), Math.ceil(Math.max(...FL.map(f => f.p)) / 1e6)];
  const MR = [Math.floor(Math.min(...FL.map(f => monthly(f.p))) / 1000), Math.ceil(Math.max(...FL.map(f => monthly(f.p))) / 1000)];
  const AR = [Math.floor(Math.min(...FL.map(f => f.a))), Math.ceil(Math.max(...FL.map(f => f.a)))];
  const FLR = [1, Math.max(...FL.map(f => f.fl))];
  const st = { zk: 'all', rooms: new Set(), pmode: 'price', price: [...PR], month: [...MR], area: [...AR], floor: [...FLR], notFirst: false, notLast: false, ready: 'any', pay: 'any', near: new Set(), has: new Set(), sort: 'mix', limit: 12, ai: null, deal: false };
  const HAS = { face: [/face/i, 'Face ID', 'face'], ceil: [/потол/i, 'Потолки 3 м', 'ceil'], yard: [/двор/i, 'Закрытый двор', 'tree'], park: [/паркинг/i, 'Паркинг', 'car'], kids: [/детск|кино/i, 'Кинорум и детская', 'kid'] };
  const NEAR = [['lrt', 'ЛРТ', 'route'], ['mall', 'ТРЦ', 'mall'], ['edu', 'Образование', 'school'], ['med', 'Медицина', 'shield'], ['park', 'Парк', 'tree'], ['mosque', 'Мечеть', 'mosque']];
  const hasB = (b, k) => ZK[b].benefits.some(x => HAS[k][0].test(x));
  function seg(el, opts, key) {
    el.innerHTML = '<span class="thumb"></span>' + opts.map(([v, t]) => `<button type="button" data-v="${v}" aria-pressed="${st[key] === v}">${t}</button>`).join('');
    el.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; st[key] = b.dataset.v; syncSeg(el, key); apply(); });
  }
  function syncSeg(el, key) { $$('button', el).forEach(b => b.setAttribute('aria-pressed', b.dataset.v === st[key])); placeThumb(el); }
  function placeThumb(el) { const b = $('[aria-pressed="true"]', el), t = $('.thumb', el); if (!b || !t || !b.offsetWidth) return; t.style.left = b.offsetLeft + 'px'; t.style.width = b.offsetWidth + 'px'; if (el.scrollWidth > el.clientWidth + 1) el.scrollTo({ left: b.offsetLeft - (el.clientWidth - b.offsetWidth) / 2, behavior: 'smooth' }); }
  const placeSegs = () => $$('.seg').forEach(placeThumb);
  seg($('#fZk'), [['all', 'Все'], ...ORDER.map(b => [b, { life: 'Life', plaza: 'Plaza Residence', eco: 'Eco Park' }[b]])], 'zk');
  seg($('#fReady'), [['any', 'Любая'], ['done', 'Готов'], ['build', 'Строится']], 'ready');
  seg($('#fPay'), [['any', 'Любой'], ['mort', 'Ипотека'], ['inst', 'Рассрочка']], 'pay');
  $('#fRooms').innerHTML = [1, 2, 3, 4].map(r => `<button type="button" data-r="${r}" aria-pressed="false">${r === 4 ? '4+' : r}</button>`).join('');
  $('#fRooms').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const r = +b.dataset.r; st.rooms.has(r) ? st.rooms.delete(r) : st.rooms.add(r); syncAll(); apply(); });
  const chipset = (el, items, set) => { el.innerHTML = items.map(([k, t, i]) => `<button type="button" data-k="${k}" aria-pressed="false">${icon(i)}${t}</button>`).join(''); el.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const k = b.dataset.k; if (set === 'floorX') st[k] = !st[k]; else st[set].has(k) ? st[set].delete(k) : st[set].add(k); syncAll(); apply(); }); };
  chipset($('#fNear'), NEAR, 'near');
  chipset($('#fHas'), Object.entries(HAS).map(([k, v]) => [k, v[1], v[2]]), 'has');
  chipset($('#fFloorX'), [['notFirst', 'Не первый', 'stairs'], ['notLast', 'Не последний', 'stairs']], 'floorX');
  function dual(el, key, [lo, hi], step, out, fm) {
    el.innerHTML = `<div class="track"><div class="fill"></div></div><input type="range" min="${lo}" max="${hi}" step="${step}" value="${lo}" aria-label="от"><input type="range" min="${lo}" max="${hi}" step="${step}" value="${hi}" aria-label="до">`;
    const [a, b] = $$('input', el), fill = $('.fill', el);
    const upd = src => { let x = +a.value, y = +b.value; if (x > y) { if (src === a) a.value = x = y; else b.value = y = x; } st[key] = [x, y]; const p = v => (v - lo) / (hi - lo) * 100; fill.style.left = p(x) + '%'; fill.style.right = (100 - p(y)) + '%'; out.textContent = x === lo && y === hi ? (key === 'floor' ? 'любой' : 'любая') : `${fm(x)} – ${fm(y)}`; a.style.zIndex = x > lo + (hi - lo) * .9 ? 3 : 1; };
    a.oninput = () => { upd(a); apply(); }; b.oninput = () => { upd(b); apply(); };
    el.set = v => { a.value = v[0]; b.value = v[1]; upd(); }; upd();
  }
  const priceRange = () => { if (st.pmode === 'price') { dual($('#rPrice'), 'price', PR, 1, $('#vPrice'), v => v + ' млн'); $('#lPrice').textContent = 'Цена, млн ₸'; } else { dual($('#rPrice'), 'month', MR, 10, $('#vPrice'), v => fmt(v * 1000) + ' ₸'); $('#lPrice').textContent = 'Платёж в месяц'; } };
  priceRange();
  $('#pmode').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; st.pmode = b.dataset.v; st.price = [...PR]; st.month = [...MR]; $$('#pmode button').forEach(x => x.setAttribute('aria-pressed', x === b)); priceRange(); apply(); });
  dual($('#rArea'), 'area', AR, 1, $('#vArea'), v => v);
  dual($('#rFloor'), 'floor', FLR, 1, $('#vFloor'), v => v);
  function resetF() { Object.assign(st, { zk: 'all', pmode: 'price', price: [...PR], month: [...MR], area: [...AR], floor: [...FLR], notFirst: false, notLast: false, ready: 'any', pay: 'any', sort: 'mix', ai: null, deal: false }); st.rooms = new Set(); st.near = new Set(); st.has = new Set(); $('#got').classList.remove('on'); }
  function syncAll() {
    syncSeg($('#fZk'), 'zk'); syncSeg($('#fReady'), 'ready'); syncSeg($('#fPay'), 'pay');
    $$('#fRooms button').forEach(x => x.setAttribute('aria-pressed', st.rooms.has(+x.dataset.r)));
    $$('#fNear button').forEach(x => x.setAttribute('aria-pressed', st.near.has(x.dataset.k)));
    $$('#fHas button').forEach(x => x.setAttribute('aria-pressed', st.has.has(x.dataset.k)));
    $$('#fFloorX button').forEach(x => x.setAttribute('aria-pressed', !!st[x.dataset.k]));
    $$('#pmode button').forEach(x => x.setAttribute('aria-pressed', x.dataset.v === st.pmode)); priceRange();
    $('#rPrice').set(st.pmode === 'price' ? st.price : st.month); $('#rArea').set(st.area); $('#rFloor').set(st.floor); $('#sort').value = st.sort;
  }
  $('#reset').onclick = () => { resetF(); qz.reset(); syncAll(); apply(); };
  $('#sort').onchange = e => { st.sort = e.target.value; apply(); };
  $('#more').onclick = () => { st.limit += 12; render(true); };

  function matchF(f) {
    if (st.zk !== 'all' && f.b !== st.zk) return false;
    if (st.rooms.size && !st.rooms.has(Math.min(f.r, 4))) return false;
    if (st.pmode === 'price' ? (f.p < st.price[0] * 1e6 || f.p > (st.price[1] + 1) * 1e6) : (monthly(f.p) < st.month[0] * 1000 || monthly(f.p) > st.month[1] * 1000 + 999)) return false;
    if (f.a < st.area[0] || f.a >= st.area[1] + 1) return false;
    if (f.fl < st.floor[0] || f.fl > st.floor[1]) return false;
    if (st.notFirst && f.fl <= 2) return false;
    if (st.notLast && K.floorsOf(f) && f.fl >= K.floorsOf(f)) return false;
    if (st.ready !== 'any' && K.status(f.b).k !== st.ready) return false;
    if (st.pay !== 'any' && !META[f.b].pay.includes(st.pay)) return false;
    if (st.deal && K.delta(f) > -8) return false;
    for (const n of st.near) if (!(K.nearMin(f.b, n) <= 12)) return false;
    for (const h of st.has) if (!hasB(f.b, h)) return false;
    return true;
  }
  function score(f) {
    const q = st.ai; if (!q) return null; let s = 100;
    if (q.priceMax) s -= Math.max(0, (f.p / 1e6 - q.priceMax * .85) / q.priceMax * 60);
    if (q.near) s -= (K.nearMin(f.b, q.near) || 12) * 1.5;
    if (q.monthMax) s -= Math.max(0, (monthly(f.p) - q.monthMax * .85) / q.monthMax * 60);
    return Math.max(60, Math.min(99, Math.round(s)));
  }
  function filtered() {
    const L = FL.filter(matchF);
    if (st.sort === 'mix') { const g = {}; L.sort((x, y) => x.p - y.p).forEach(f => (g[f.b + Math.min(f.r, 4)] ||= []).push(f)); const keys = ORDER.flatMap(b => [1, 2, 3, 4].map(r => b + r)).filter(k => g[k]), out = []; while (out.length < L.length) for (const k of keys) if (g[k].length) out.push(g[k].shift()); return out; }
    const k = st.sort.replace('-', ''), dir = st.sort[0] === '-' ? -1 : 1, key = { price: 'p', area: 'a', floor: 'fl', m2: 'm2' }[k];
    return L.sort((x, y) => (x[key] - y[key]) * dir || x.p - y.p);
  }
  // что сейчас выбрано — снимаемыми чипами над списком
  function activeChips() {
    const c = [];
    if (st.zk !== 'all') c.push(['zk', SHORT[st.zk]]);
    if (st.rooms.size) c.push(['rooms', [...st.rooms].sort().map(r => r === 4 ? '4+' : r).join(', ') + ' комн.']);
    if (st.pmode === 'price' && st.price + '' !== PR + '') c.push(['price', `${st.price[0]}–${st.price[1]} млн ₸`]);
    if (st.pmode === 'month' && (st.month[1] < MR[1] - 10 || st.month[0] > MR[0] + 10)) c.push(['price', `до ${fmt(st.month[1] * 1000)} ₸/мес`]);
    if (st.area + '' !== AR + '') c.push(['area', `${st.area[0]}–${st.area[1]} м²`]);
    if (st.floor + '' !== FLR + '') c.push(['floor', `${st.floor[0]}–${st.floor[1]} этаж`]);
    if (st.notFirst) c.push(['notFirst', 'Не первый этаж']); if (st.notLast) c.push(['notLast', 'Не последний']);
    if (st.ready !== 'any') c.push(['ready', st.ready === 'done' ? 'Дом готов' : 'Строится']);
    if (st.pay !== 'any') c.push(['pay', K.PAYN[st.pay]]);
    if (st.deal) c.push(['deal', 'Цена ниже средней']);
    st.near.forEach(n => c.push(['near:' + n, 'Рядом: ' + K.NEARN[n]]));
    st.has.forEach(h => c.push(['has:' + h, HAS[h][1]]));
    return c;
  }
  function dropChip(k) {
    const [a, b] = k.split(':');
    if (a === 'zk') st.zk = 'all'; else if (a === 'rooms') st.rooms = new Set(); else if (a === 'price') { st.price = [...PR]; st.month = [...MR]; } else if (a === 'area') st.area = [...AR]; else if (a === 'floor') st.floor = [...FLR];
    else if (a === 'notFirst' || a === 'notLast' || a === 'deal') st[a] = false; else if (a === 'ready' || a === 'pay') st[a] = 'any'; else if (a === 'near') st.near.delete(b); else if (a === 'has') st.has.delete(b);
    syncAll(); apply();
  }
  $('#chipsOn').onclick = e => { const b = e.target.closest('[data-drop]'); if (!b) return; if (b.dataset.drop === '*') { resetF(); qz.reset(); syncAll(); apply(); } else dropChip(b.dataset.drop); };
  /* подбор в адресе страницы: ?zk=life&r=1,2&p=20-40 … — «Назад» его не сбрасывает, ссылкой можно поделиться */
  const rng = (v, d) => v + '' === d + '' ? null : v.join('-');
  let urlOn = false;
  function writeURL() {
    if (!urlOn || $('#ftabs [aria-selected="true"]')?.dataset.tab !== 'flats') return;
    const u = new URLSearchParams(), put = (k, v) => { if (v !== null && v !== '' && v !== undefined) u.set(k, v); };
    if (st.zk !== 'all') put('zk', st.zk);
    const vr = (R.vhash.match(/^r-(\d)$/) || [])[1]; // комнаты уже заданы адресом подборки
    if (!(vr && st.rooms.size === 1 && st.rooms.has(+vr))) put('r', [...st.rooms].sort().join(','));
    if (st.pmode === 'month') { u.set('pm', 'month'); put('m', rng(st.month, MR)); } else put('p', rng(st.price, PR));
    put('a', rng(st.area, AR)); put('fl', rng(st.floor, FLR));
    if (st.notFirst) u.set('nf', 1); if (st.notLast) u.set('nl', 1); if (st.deal) u.set('deal', 1);
    if (st.ready !== 'any') u.set('ready', st.ready); if (st.pay !== 'any') u.set('pay', st.pay);
    put('near', [...st.near].join(',')); put('has', [...st.has].join(','));
    if (st.sort !== 'mix') u.set('sort', st.sort);
    const q = u.toString().replace(/%2C/g, ',');
    try { history.replaceState(history.state, '', location.pathname + (q ? '?' + q : '')); } catch (x) {}
  }
  function readURL() {
    const u = new URLSearchParams(location.search); if (![...u.keys()].some(k => /^(zk|r|pm|m|p|a|fl|nf|nl|deal|ready|pay|near|has|sort)$/.test(k))) return false;
    const two = (v, [lo, hi]) => { const m = (v || '').match(/^(\d+)-(\d+)$/); return m ? [Math.max(lo, Math.min(+m[1], hi)), Math.max(lo, Math.min(+m[2], hi))] : [lo, hi]; };
    const list = (v, ok) => new Set((v || '').split(',').filter(ok));
    resetF();
    if (ZK[u.get('zk')]) st.zk = u.get('zk');
    st.rooms = new Set([...list(u.get('r'), x => /^[1-4]$/.test(x))].map(Number));
    if (u.get('pm') === 'month') { st.pmode = 'month'; st.month = two(u.get('m'), MR); } else st.price = two(u.get('p'), PR);
    st.area = two(u.get('a'), AR); st.floor = two(u.get('fl'), FLR);
    st.notFirst = u.has('nf'); st.notLast = u.has('nl'); st.deal = u.has('deal');
    if (['done', 'build'].includes(u.get('ready'))) st.ready = u.get('ready');
    if (['mort', 'inst'].includes(u.get('pay'))) st.pay = u.get('pay');
    st.near = list(u.get('near'), x => NEAR.some(n => n[0] === x)); st.has = list(u.get('has'), x => x in HAS);
    if (/^-?(price|area|floor|m2)$/.test(u.get('sort') || '')) st.sort = u.get('sort');
    syncAll(); return true;
  }
  let applyT; function apply() { clearTimeout(applyT); applyT = setTimeout(() => { st.limit = 12; render(); }, 40); }
  let list = [], shownN = -1;
  function render(append) {
    list = filtered(); const n = list.length, cnt = $('#cnt');
    if (n !== shownN) { cnt.textContent = n; cnt.classList.remove('flip'); void cnt.offsetWidth; cnt.classList.add('flip'); shownN = n; }
    $('#cntW').textContent = plural(n, 'квартира', 'квартиры', 'квартир');
    $('#showN').innerHTML = n ? `${icon('search')}Показать ${n} ${plural(n, 'квартиру', 'квартиры', 'квартир')}` : 'Ничего не найдено'; $('#showN').disabled = !n;
    const ac = activeChips(); $('#fN').textContent = ac.length ? ' · ' + ac.length : '';
    $('#chipsOn').innerHTML = ac.length ? ac.map(([k, t]) => `<button class="tg" data-drop="${k}">${t}${icon('close')}</button>`).join('') + `<button class="lnk" data-drop="*">Сбросить всё</button>` : '';
    const g = $('#grid'), from = append ? $$('.card', g).length : 0; g.classList.toggle('ai-on', !!st.ai);
    if (!append) g.innerHTML = '';
    if (!n) g.innerHTML = `<div class="empty">Таких квартир сейчас нет. Уберите одно условие или <button class="kb" data-call style="margin-left:6px">${icon('phone')}оставьте заявку</button></div>`;
    else g.insertAdjacentHTML('beforeend', list.slice(from, st.limit).map((f, i) => S_.card(f, i, score(f))).join(''));
    const left = n - Math.min(st.limit, n); $('#more').hidden = left <= 0; $('#more').lastChild.textContent = `Показать ещё ${Math.min(12, left)} из ${left}`;
    qz.count(n);
    if (!append) writeURL();
    if (!$('#chessV').hidden) renderChess();
  }
  S_.bindGrid($('#grid'), { similar: f => { resetF(); st.zk = f.b; st.rooms = new Set([Math.min(f.r, 4)]); syncAll(); render(); S_.scrollToEl($('.rbar')); } });

  /* квиз: каждый ответ сразу настраивает фильтр, счётчик живой */
  const Q = [
    { k: 'who', q: 'Для кого квартира?', a: [['self', 'Для себя', 'user'], ['pair', 'Для пары', 'users'], ['family', 'Семья с детьми', 'kid'], ['invest', 'Для инвестиций', 'percent']],
      set: v => { st.rooms = new Set({ self: [1, 2], pair: [1, 2], family: [3, 4], invest: [1] }[v]); if (v === 'family') st.near.add('edu'); if (v === 'invest') st.sort = 'm2'; } },
    { k: 'rooms', q: 'Сколько комнат?', hint: 'Подсказали по первому ответу, можно поменять', a: [['1', '1 комната', 'door'], ['2', '2 комнаты', 'door'], ['3', '3 комнаты', 'door'], ['4', '4 и больше', 'door'], ['keep', 'Как подсказали', 'check']],
      set: v => { if (v !== 'keep') st.rooms = new Set([+v]); } },
    { k: 'pay', q: 'Как планируете покупать?', a: [['mort', 'Ипотека', 'bank'], ['inst', 'Рассрочка от застройщика', 'wallet'], ['full', 'Наличными, 100% оплата', 'key']],
      set: v => { st.pay = v === 'full' ? 'any' : v; st.pmode = v === 'mort' ? 'month' : 'price'; } },
    { k: 'bud', slider: 1, q: () => st.pmode === 'month' ? 'Какой платёж в месяц комфортен?' : 'Какой бюджет?', a: () => st.pmode === 'month' ? [['150', 'до 150 000 ₸', 'wallet'], ['200', 'до 200 000 ₸', 'wallet'], ['300', 'до 300 000 ₸', 'wallet'], ['0', 'Больше', 'wallet']] : [['25', 'до 25 млн ₸', 'wallet'], ['35', 'до 35 млн ₸', 'wallet'], ['50', 'до 50 млн ₸', 'wallet'], ['0', 'Больше', 'wallet']],
      set: v => { if (st.pmode === 'month') st.month = [MR[0], +v ? Math.min(MR[1], +v) : MR[1]]; else st.price = [PR[0], +v ? Math.min(PR[1], +v) : PR[1]]; } },
    { k: 'when', q: 'Когда хотите въехать?', a: [['now', 'В сданный дом', 'key'], ['wait', 'Готов дождаться сдачи', 'clock'], ['any', 'Неважно', 'check']],
      set: v => { st.ready = v === 'now' ? 'done' : v === 'wait' ? 'build' : 'any'; } },
    { k: 'near', q: 'Что важно рядом?', multi: 1, a: [...NEAR.slice(0, 5), ['none', 'Неважно', 'check']],
      set: v => { st.near = new Set(v.filter(x => x !== 'none')); } }];
  const qz = (() => {
    const box = $('#quiz'); let i = 0, ans = {}, n = FL.length;
    const qText = s => typeof s.q === 'function' ? s.q() : s.q, qOpts = s => typeof s.a === 'function' ? s.a() : s.a;
    function draw() {
      if (i >= Q.length) {
        box.innerHTML = `<div class="qz-done"><div class="qz-ic">${icon('sparkle')}</div><b>Подобрали ${kv(n)}</b><span>Ответы сразу настроили фильтр. Поменяйте любой:</span>
          <div class="qz-sum">${Q.map((s, k) => { const v = ans[s.k]; const t = s.slider ? (+v ? 'до ' + budL(+v) : v === '0' ? 'Не важно' : '') : s.multi ? (v || []).map(x => qOpts(s).find(o => o[0] === x)?.[1]).join(', ') : qOpts(s).find(o => o[0] === v)?.[1]; return `<button data-edit="${k}"><span>${qText(s).replace('?', '')}</span><b>${t || '—'}</b>${icon('arrow')}</button>`; }).join('')}</div>
          <div class="qz-acts"><button class="kb" data-restart>${icon('back')}Заново</button><button class="kb pri" data-call>${icon('phone')}Подобрать с менеджером</button></div></div>`;
        return;
      }
      const s = Q[i], cur = ans[s.k], sel = s.multi ? new Set(cur || []) : null;
      box.innerHTML = `<div class="qz-top"><span class="num">Вопрос ${i + 1} из ${Q.length}</span>${i ? `<button class="lnk" data-back>${icon('back')}Назад</button>` : ''}</div>
        <div class="qz-bar">${Q.map((_, k) => `<i class="${k < i ? 'ok' : k === i ? 'now' : ''}"></i>`).join('')}</div>
        <h3>${qText(s)}</h3>${s.hint && st.rooms.size ? `<p class="qz-hint">${icon('info')}${s.hint}: ${[...st.rooms].sort().join(' или ')}</p>` : ''}
        ${s.slider ? slider() : ''}<div class="qz-a" ${s.slider ? 'hidden' : ''}>${qOpts(s).map(([v, t, ic]) => `<button data-a="${v}" aria-pressed="${s.multi ? sel.has(v) : cur === v}">${s.k === 'rooms' && +v ? `<img class="qi qimg3" src="img/g/room-${v}.webp" alt="" loading="lazy">` : `<span class="qi">${icon(ic)}</span>`}${t}</button>`).join('')}</div>
        ${s.multi ? `<button class="kb pri qz-next" data-next>${icon('check')}Готово</button>` : ''}
        <p class="qz-n" id="qzN"></p>`;
      count(n);
      if (s.slider) slide(+$('#qzR', box).value);
    }
    // бюджет — ползунком: счётчик квартир меняется, пока двигаете
    const budL = v => st.pmode === 'month' ? fmt(v * 1000) + ' ₸/мес' : v + ' млн ₸';
    function slider() {
      const pm = st.pmode === 'month', [lo, hi] = pm ? MR : PR, v = +ans.bud || Math.round(lo + (hi - lo) * .45 / (pm ? 5 : 1)) * (pm ? 5 : 1);
      return `<div class="qz-sl"><div class="qz-sv num"><span>до</span><b id="qzV">${budL(v)}</b></div><input type="range" id="qzR" min="${lo}" max="${hi}" step="${pm ? 5 : 1}" value="${v}" aria-label="${pm ? 'Платёж в месяц' : 'Бюджет'}"><div class="qz-sx num"><span>${budL(lo)}</span><span>${budL(hi)}</span></div>
        <div class="qz-sb"><button class="kb" data-slany>Не важно</button><button class="kb pri" data-slnext>${icon('arrow')}Далее</button></div></div>`;
    }
    function slide(v) { if (st.pmode === 'month') st.month = [MR[0], v]; else st.price = [PR[0], v]; $('#qzV', box).textContent = budL(v); const r = $('#qzR', box); r.style.setProperty('--p', (v - r.min) / (r.max - r.min) * 100 + '%'); syncAll(); render(); }
    box.addEventListener('input', e => { if (e.target.id === 'qzR') slide(+e.target.value); });
    function count(x) { n = x; const el = $('#qzN', box); if (el) el.innerHTML = x ? `${icon('home')}Сейчас подходит <b class="num">${kv(x)}</b>` : `${icon('info')}Пока ничего не подходит — смягчите ответ`; const d = $('.qz-done b', box); if (d) d.textContent = `Подобрали ${kv(x)}`; }
    // применяем все ответы по порядку с чистого фильтра
    function replay() { resetF(); Q.forEach(s => { if (ans[s.k] !== undefined) s.set(ans[s.k]); }); syncAll(); render(); }
    box.addEventListener('click', e => {
      const t = e.target;
      if (t.closest('[data-back]')) { i--; draw(); return; }
      if (t.closest('[data-restart]')) { reset(); draw(); return; }
      const ed = t.closest('[data-edit]'); if (ed) { i = +ed.dataset.edit; draw(); return; }
      if (t.closest('[data-slnext]')) { ans.bud = $('#qzR', box).value; replay(); i++; draw(); return; }
      if (t.closest('[data-slany]')) { ans.bud = '0'; replay(); i++; draw(); return; }
      if (t.closest('[data-next]')) { if (!ans[Q[i].k]) ans[Q[i].k] = ['none']; replay(); i++; draw(); return; }
      const a = t.closest('[data-a]'); if (!a) return; const s = Q[i];
      if (s.multi) { const v = new Set(ans[s.k] || []); const x = a.dataset.a; if (x === 'none') v.clear(); else v.delete('none'); v.has(x) ? v.delete(x) : v.add(x); ans[s.k] = [...v]; a.parentNode.querySelectorAll('[data-a]').forEach(b => b.setAttribute('aria-pressed', v.has(b.dataset.a))); replay(); return; }
      ans[s.k] = a.dataset.a; if (s.k === 'pay' && ans.bud) delete ans.bud; replay(); i++; setTimeout(draw, 160);
      $$('[data-a]', box).forEach(b => b.setAttribute('aria-pressed', b === a));
    });
    function reset() { i = 0; ans = {}; }
    return { draw, count, reset: () => { reset(); draw(); }, start: v => { reset(); ans.who = v; replay(); i = 1; draw(); } };
  })();

  /* квиз или фильтр */
  function mode(m) { $$('#sMode button').forEach(b => b.setAttribute('aria-pressed', b.dataset.v === m)); placeThumb($('#sMode')); $('#quiz').hidden = m !== 'quiz'; $('#filter').hidden = m !== 'filter'; $('#aiPane').hidden = m !== 'ai'; [$('#quiz'), $('#filter'), $('#aiPane')].forEach(p => { if (!p.hidden) { p.classList.remove('pin'); void p.offsetWidth; p.classList.add('pin'); } }); if (m === 'filter') { syncAll(); requestAnimationFrame(placeSegs); } }
  $('#sMode').onclick = e => { const b = e.target.closest('[data-v]'); if (b) mode(b.dataset.v); };
  // на телефоне подбор — выезжающая панель
  const side = $('#side');
  const openSide = () => { side.classList.add('on'); S_.scrim.classList.add('on'); requestAnimationFrame(placeSegs); };
  const closeSide = () => { side.classList.remove('on'); S_.scrim.classList.remove('on'); };
  $('#openF').onclick = openSide; $('[data-closes]').onclick = closeSide; S_.onScrim(closeSide);
  $('#showN').onclick = () => { closeSide(); S_.scrollToEl($('.rbar')); };

  /* ИИ-строка */
  $('#aiPane').addEventListener('submit', e => { e.preventDefault(); const v = $('#aiIn').value.trim(); if (v) { runAI(v); if (isPhone()) closeSide(); } });
  $('#aiIn').addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); $('#aiPane').requestSubmit(); } });
  $('#aiEx').innerHTML = ['Двушка до 30 млн', 'Трёшка рядом со школой', 'Готовый дом, ипотека', 'Однушка у ЛРТ'].map(t => `<button type="button">${t}</button>`).join('');
  $('#aiEx').onclick = e => { const b = e.target.closest('button'); if (b) { $('#aiIn').value = b.textContent; $('#aiIn').focus(); } };
  function applyAI(q, got) {
    resetF(); qz.reset();
    if (q.zk) st.zk = q.zk; if (q.rooms) st.rooms = new Set(q.rooms);
    if (q.priceMax) st.price = [PR[0], Math.min(PR[1], Math.ceil(q.priceMax))];
    if (q.monthMax) { st.pmode = 'month'; st.month = [MR[0], Math.min(MR[1], Math.ceil(q.monthMax / 1000))]; }
    if (q.areaMin) st.area = [Math.max(AR[0], q.areaMin), AR[1]];
    if (q.notFirst) st.notFirst = true; if (q.floorMin) st.floor = [q.floorMin, FLR[1]];
    if (q.near) st.near = new Set([q.near]); if (q.pay) st.pay = q.pay; if (q.ready) st.ready = 'done'; if (q.sort) st.sort = q.sort;
    st.ai = q; syncAll(); apply();
    const g = $('#got'); g.innerHTML = `<span>${icon('spark')}Понял:</span>${(got || []).map(x => `<span class="tg">${x}</span>`).join('')}<button class="lnk" type="button" id="aiClear">${icon('close')}Сбросить</button>`; g.classList.add('on');
    $('#aiClear').onclick = () => { resetF(); syncAll(); apply(); };
  }
  function runAI(text) { const { q, got } = K.parse(text); if (!got.length) { toast('Не понял запрос. Напишите комнаты, бюджет или что рядом'); return; } $('#aiIn').value = text; applyAI(q, got); }
  S_.applyAI = (q, got) => { tab('flats'); applyAI(q, got); S_.scrollToEl($('.rbar')); };

  /* шахматка: неподходящие квартиры бледнеют, наведение — суперподсказка */
  let chB = 'life';
  $('#chsZk').innerHTML = '<span class="thumb"></span>' + ORDER.map(b => `<button type="button" aria-pressed="${b === chB}" data-b="${b}">${SHORT[b]}</button>`).join('');
  $('#chsZk').onclick = e => { const b = e.target.closest('[data-b]'); if (b) { chB = b.dataset.b; renderChess(); } };
  function renderChess() {
    $$('#chsZk button').forEach(b => b.setAttribute('aria-pressed', b.dataset.b === chB)); placeThumb($('#chsZk'));
    $('#chsG').innerHTML = K.chess(chB);
    const ok = new Set(list.map(f => f.id)); $$('#chsG [data-flat]').forEach(c => c.classList.toggle('dim', !ok.has(+c.dataset.flat)));
  }
  S_.bindChess($('#chsG'));
  function view(v) { $$('#view button').forEach(b => b.setAttribute('aria-pressed', b.dataset.v === v)); placeThumb($('#view')); $('#cardsV').hidden = v !== 'cards'; $('#chessV').hidden = v !== 'chess'; if (v === 'chess') { if (st.zk !== 'all') chB = st.zk; renderChess(); } }
  $('#view').onclick = e => { const b = e.target.closest('[data-v]'); if (b) view(b.dataset.v); };

  /* просмотренные и подписка */
  const seenL = K.seen(); if (seenL.length) { const el = $('#seen'); el.hidden = false; el.innerHTML = `<span>${icon('clock')}Вы смотрели</span>` + seenL.map(f => `<a href="flat.html#flat-${f.id}"><img src="${f.pl}" alt=""><span><b>${f.r}к · ${area(f.a)} м²</b> · ${mln(f.p)} ₸</span></a>`).join(''); }
  $('#alertBtn').onclick = () => { const z = st.zk !== 'all' ? SHORT[st.zk] : 'Все ЖК', r = st.rooms.size ? [...st.rooms].sort().map(x => x === 4 ? '4+' : x).join(', ') + '-комн.' : 'любые квартиры'; K.alertForm(`${z} · ${r}`); };

  /* переходы: #r-2, #zk-life, #quiz, #chess, #deal, #q, #ai, #tab-parking */
  S_.setRoute((h, smooth) => {
    let m;
    if ((m = h.match(/^tab-(parking|store|commerce)$/))) { tab(m[1]); return true; }
    tab('flats');
    if ((m = h.match(/^r-([1-4])$/))) { resetF(); qz.reset(); st.rooms = new Set([+m[1]]); syncAll(); apply(); mode('filter'); }
    else if ((m = h.match(/^zk-(\w+)$/)) && ZK[m[1]]) { resetF(); qz.reset(); st.zk = m[1]; syncAll(); apply(); mode('filter'); }
    else if (h === 'deal') { resetF(); qz.reset(); st.deal = true; st.sort = 'm2'; syncAll(); apply(); }
    else if (h === 'chess') { view('chess'); }
    else if (h === 'quiz') { mode('quiz'); if (isPhone()) openSide(); }
    else if ((m = h.match(/^quiz-(self|pair|family|invest)$/))) { qz.start(m[1]); mode('quiz'); if (isPhone()) openSide(); h = 'quiz'; }
    else if (h === 'q') { try { const q = JSON.parse(ss('bq-q') || 'null'); if (q) { resetF(); qz.reset(); st.zk = q.zk || 'all'; st.rooms = new Set(q.rooms || []); if (q.max) { st.pmode = q.pm; if (q.pm === 'price') st.price = [PR[0], Math.min(PR[1], q.max)]; else st.month = [MR[0], Math.min(MR[1], q.max)]; } syncAll(); apply(); mode('filter'); } } catch (e) {} }
    else if (h === 'ai') { mode('ai'); try { const q = JSON.parse(ss('bq-ai') || 'null'); if (q) applyAI(q, K.parse(Object.values(q).join(' ')).got.length ? ['запрос с главной'] : ['запрос с главной']); } catch (e) {} }
    else return false;
    if (!S_.virtual) setTimeout(() => S_.scrollToEl(h === 'quiz' || h === 'chess' ? $('#flatsPane') : $('.rbar'), smooth), 80); // подборку по адресу открываем сверху
    return true;
  });

  S_.onLayout(placeSegs);
  const fromURL = !location.hash && readURL();
  qz.draw(); render(); mode(fromURL ? 'filter' : 'quiz');
  S_.start(); urlOn = true;
})();
