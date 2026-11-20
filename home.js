/* Главная: истории с подбором, три ЖК, предложения, ипотека по программам, преимущества */
(() => {
  const { ZK, monthly, fmt, mln, area, roomsWord, plural, R } = window.BQX;
  const K = window.BQK, { icon, ORDER, SHORT, ST, META, kv, rName } = K;
  const S_ = window.BQS, { $, $$, PHOTO, DEAL, toast, go, ss, roundPoly, isPhone } = S_;
  const FL = window.BQ.flats, EX = window.BQ.extra;

  /* единая крыша над историями и подбором, как у логотипа */
  function roofRow() {
    const box = $('#hgrid'), panels = $$('.rp', box), W = box.clientWidth; if (!W) return;
    if (isPhone()) { const sv = $('#sv'); sv.style.clipPath = `path("${roundPoly([[0, 30], [sv.offsetWidth / 2, 0], [sv.offsetWidth, 30], [sv.offsetWidth, sv.offsetHeight], [0, sv.offsetHeight]], 18)}")`; $('#hs').style.clipPath = 'none'; return; }
    const H = Math.min(64, W * .046), y = x => H * Math.abs(x - W / 2) / (W / 2);
    for (const p of panels) {
      const L = p.offsetLeft, w = p.offsetWidth, h = p.offsetHeight, pts = [[0, y(L)]];
      if (L < W / 2 && L + w > W / 2) pts.push([W / 2 - L, 0]);
      pts.push([w, y(L + w)], [w, h], [0, h]); p.style.clipPath = `path("${roundPoly(pts, 22)}")`;
    }
    $('#sv').style.setProperty('--barTop', H + 22 + 'px');
    const svg = $('#roofline'), path = $('path', svg);
    svg.setAttribute('height', H + 6); path.setAttribute('d', `M2 ${H + 2} L${W / 2} 2 L${W - 2} ${H + 2}`); svg.style.setProperty('--len', Math.ceil(path.getTotalLength()) + 2);
  }
  S_.onLayout(roofRow);
  setTimeout(() => $('#roofline').classList.add('drawn'), 400);

  /* истории */
  const S = [
    { who: 'Alatau Life', hot: 1, img: PHOTO.life, th: PHOTO.life, lab: [K.status('life').sub ? 'Сдача через ' + K.status('life').sub.replace('через ', '') : K.status('life').t, 'clock'], h: 'Сдача в 3 квартале 2027. Выбирайте этаж, пока есть', p: `${kv(ST.life.n)} в продаже, от ${mln(ST.life.min)} ₸. Потолки 3 метра, Face ID, закрытый двор.`, cta: [['Квартиры Life', 'flats.html#zk-life', 'pri', 'arrow'], ['О комплексе', 'project.html#life']] },
    { who: 'Alatau Plaza Residence', short: 'Plaza Residence', img: 'img/ph_5655382_0.webp', th: PHOTO.plaza, lab: ['Рассрочка', 'wallet'], h: 'Рассрочка от застройщика, без банка', p: `${kv(ST.plaza.n)} в продаже, от ${mln(ST.plaza.min)} ₸. Две очереди, класс бизнес, кинорум и детская.`, cta: [['Квартиры в рассрочку', 'flats.html#zk-plaza', 'pri', 'arrow'], ['Посчитать', './#prog-inst']] },
    { who: 'Eco Park', hot: 1, img: 'img/ph_5587279_3.webp', th: PHOTO.eco, lab: [(ST.eco.n === 1 ? 'Последняя квартира' : `Осталось ${kv(ST.eco.n)}`), 'bell', 'hot'], h: ST.eco.n === 1 ? 'Дом построен. Последняя квартира' : 'Дом построен. Последние квартиры', p: `От ${mln(ST.eco.min)} ₸. Ипотека по программе 7-20-25. Можно въехать без ожидания стройки.`, cta: [['Успеть посмотреть', 'flats.html#zk-eco', 'pri', 'arrow'], ['Записаться на показ', '#visit']] },
    { who: 'Выгодно', hot: 1, ic: 'tag', img: 'img/g/deals.webp', lab: ['Считает сайт', 'spark'], h: `${kv(DEAL.length)} дешевле средней цены за м²`, p: 'Сайт сам сравнивает каждую квартиру со средней ценой за м² в её ЖК и комнатности. Список обновляется вместе с ценами.', cta: [['Показать выгодные', 'flats.html#deal', 'pri', 'arrow']] },
    { who: 'Ипотека', ic: 'percent', img: 'img/g/mortgage-family.webp', lab: ['7-20-25', 'bank'], h: 'Ипотека 7%: взнос от 20%, до 25 лет', p: 'Госпрограмма для новостроек. Посчитайте платёж и сравните с ипотекой банка, Отбасы и рассрочкой.', cta: [['Посчитать платёж', './#prog-7', 'pri', 'calc']] },
    { who: 'Стройка', ic: 'hammer', img: 'img/ph_6839859_1.webp', lab: ['Ход строительства', 'cam'], h: 'Alatau Life растёт каждый месяц', p: 'Фото со стройки и этапы готовности. На сайте менеджер загружает новые фото каждый месяц.', cta: [['Смотреть ход стройки', 'about.html#build', 'pri', 'arrow']] },
    { who: 'Паркинг', ic: 'car', img: 'img/g/parking.webp', lab: [`${EX['Parking place'].n} мест`, 'car'], h: `Машиноместо от ${mln(EX['Parking place'].min)} ₸`, p: `Тёплый подземный паркинг, ${area(EX['Parking place'].amin)}–${area(EX['Parking place'].amax)} м². Можно купить вместе с квартирой.`, cta: [['Выбрать место', 'extra.html#parking', 'pri', 'arrow']] },
    { who: 'Кладовые', ic: 'box', img: 'img/g/store.webp', lab: [`${EX.Storeroom.n} кладовых`, 'box'], h: `Кладовая от ${fmt(EX.Storeroom.min)} ₸`, p: `${area(EX.Storeroom.amin)}–${area(EX.Storeroom.amax)} м² для колясок, шин и сезонных вещей.`, cta: [['Выбрать кладовую', 'extra.html#store', 'pri', 'arrow']] },
    { who: 'Семья', ic: 'users', img: 'img/g/family-cabinet.webp', lab: ['Кабинет', 'users'], h: 'Выбирайте квартиру всей семьёй', p: 'Добавьте близких в кабинет: общий список, голосование и чат под каждой квартирой.', cta: [['Как это работает', 'about.html#family', 'pri', 'arrow']] },
    { who: 'Квиз', ic: 'quiz', img: 'img/g/quiz.webp', lab: ['6 вопросов', 'quiz'], h: 'Не знаете, с чего начать? Ответьте на 6 вопросов', p: 'Квиз сам настроит фильтр: комнаты, бюджет, сроки и что важно рядом. Сразу видно, сколько квартир подходит.', cta: [['Начать квиз', 'flats.html#quiz', 'pri', 'arrow']] },
    { who: 'Шахматка', ic: 'grid', img: 'img/g/chess.webp', lab: ['Все этажи', 'grid'], h: 'Каждая квартира на своём этаже', p: `${kv(FL.length)} в продаже. Наведите на ячейку: покажем планировку, цену и платёж в месяц.`, cta: [['Открыть шахматку', 'flats.html#chess', 'pri', 'arrow']] },
    { who: 'Карта', ic: 'map', img: 'img/g/map.webp', lab: ['Сколько ехать', 'map'], h: 'Сколько ехать до работы, школы и центра', p: 'Поставьте свою точку на карте: покажем расстояние до каждого ЖК и время на машине.', cta: [['Открыть карту', 'zhk.html#map', 'pri', 'arrow']] },
    { who: 'Бизнес', ic: 'shop', img: 'img/g/commerce.webp', lab: ['1 этаж', 'shop'], h: 'Помещения для бизнеса на первых этажах', p: 'Кофейня, аптека или офис рядом с жильцами. Отдельный вход с улицы.', cta: [['Смотреть помещения', 'extra.html#commerce', 'pri', 'arrow']] }];
  S.sort((a, b) => (b.hot || 0) - (a.hot || 0));
  let si = 0, paused = false, timer; const seen = new Set();
  const stoB = (s, i) => `<button class="sto${s.hot ? ' hot' : ''}" role="tab" data-s="${i}"><span class="hs"><div>${(s.th || s.img) ? `<img src="${s.th || s.img}" alt="">` : `<span class="ic">${icon(s.ic)}</span>`}</div></span><span class="sto-t">${s.short || s.who}</span></button>`;
  $('#stories').innerHTML = S.map(stoB).join('');
  // мягкая «крыша» у кружков историй
  // мягкая «крыша» у историй: внутренние слои — точная копия внешнего контура, сдвинутая внутрь, поэтому зазор ровный везде
  const roundSto = () => $$('#stories .hs').forEach(hs => {
    const W = hs.offsetWidth, Hh = hs.offsetHeight; if (!W) return;
    const H = Hh * .3, R = 12, k = H / (W / 2), c = Math.sqrt(1 + k * k), hb = hs.getBoundingClientRect(), sc = W / hb.width;
    [hs, ...hs.querySelectorAll('div, img, .ic')].forEach(el => {
      const d = el === hs ? 0 : (el.getBoundingClientRect().left - hb.left) * sc;
      const pts = [[d, H - k * d + d * c], [W / 2, d * c], [W - d, H - k * d + d * c], [W - d, Hh - d], [d, Hh - d]].map(([x, y]) => [x - d, y - d]);
      el.style.clipPath = `path("${S_.roundPoly(pts, Math.max(R - d, 2))}")`;
    });
  });
  $('#sv').innerHTML = `<div class="bars">${S.map(() => '<i><b></b></i>').join('')}</div><div class="who"><span class="av"><img src="img/logo.svg" alt=""></span><div>baqyt_group <span id="svWho"></span></div></div>
    ${S.map((s, i) => `<div class="sl" data-i="${i}"><img src="${s.img}" alt="" ${i ? 'loading="lazy"' : ''}><span class="lab ${s.hot ? 'hot' : ''}">${icon(s.lab[1])}${s.lab[0]}</span>${i || R.PRETTY ? `<h2>${s.h}</h2>` : `<h1>${s.h}</h1>`}<p>${s.p}</p><a class="more" href="${s.cta[0][1]}">${s.cta[0][0]}${icon('arrow')}</a></div>`).join('')}
    <button class="tapl" aria-label="Предыдущая"></button><button class="tapr" aria-label="Следующая"></button>`;
  const DUR = 7000;
  function show(i) {
    si = (i + S.length) % S.length; seen.add(si);
    $$('#sv .sl').forEach((s, k) => s.classList.toggle('on', k === si));
    $$('#sv .bars i').forEach((b, k) => { b.className = k < si ? 'done' : ''; });
    const cur = $$('#sv .bars i')[si]; void cur.offsetWidth; cur.className = 'cur';
    $('#svWho').textContent = '· ' + S[si].who;
    $$('#stories .sto').forEach((b, k) => { b.setAttribute('aria-current', k === si); b.classList.toggle('seen', seen.has(k) && k !== si); });
    clearTimeout(timer); if (!paused) timer = setTimeout(() => show(si + 1), DUR);
  }
  $('#sv').style.setProperty('--dur', DUR / 1000 + 's');
  const setPause = p => { paused = p; $('#sv').classList.toggle('paused', p); clearTimeout(timer); if (!p) timer = setTimeout(() => show(si + 1), DUR / 2); };
  // пауза — когда курсор на истории
  $('#sv').addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') setPause(true); });
  $('#sv').addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') setPause(false); });
  $('.tapl').onclick = () => show(si - 1); $('.tapr').onclick = () => show(si + 1);
  $('#stories').onclick = e => { const b = e.target.closest('[data-s]'); if (b) show(+b.dataset.s); };
  // при наведении на подбор истории замирают, чтобы не отвлекать
  $('#hs').addEventListener('pointerenter', () => { if (!paused) { $('#sv').classList.add('paused'); clearTimeout(timer); } });
  $('#hs').addEventListener('pointerleave', () => { if (!paused) { $('#sv').classList.remove('paused'); timer = setTimeout(() => show(si + 1), DUR / 2); } });
  setPause(false); show(0); S_.onLayout(roundSto); roundSto();

  /* главный блок: сразу ИИ или сразу квиз */
  const EXS = ['Двушка до 30 млн', 'Трёшка рядом со школой', 'Готовый дом, ипотека', 'Однушка для инвестиций', 'Рассрочка, платёж до 200 тыс в месяц'];
  $('#hEx').innerHTML = EXS.map(t => `<button type="button">${t}</button>`).join('');
  const hm = { m: 'ai' };
  function hMode(m) {
    hm.m = m; $$('#hMode button').forEach(b => b.setAttribute('aria-pressed', b.dataset.m === m));
    $('#hpAi').hidden = m !== 'ai'; $('#hpQuiz').hidden = m !== 'quiz';
    const on = $('#hMode [aria-pressed="true"]'), th = $('#hMode .thumb'); if (on && on.offsetWidth) { th.style.left = on.offsetLeft + 'px'; th.style.width = on.offsetWidth + 'px'; }
  }
  $('#hMode').onclick = e => { const b = e.target.closest('[data-m]'); if (b) { hMode(b.dataset.m); if (b.dataset.m === 'ai') $('#hAi').focus(); } };
  function hLive() {
    const v = $('#hAi').value.trim(), { q, got } = K.parse(v), n = got.length ? FL.filter(f => K.match(f, q)).length : FL.length;
    $('#hGot').innerHTML = got.length ? `<span class="lab">${icon('check')}Понял:</span>${got.map(g => `<span class="tg">${g}</span>`).join('')}` : v ? `<span class="lab mute">${icon('info')}Напишите комнаты, бюджет, район или что важно рядом</span>` : '';
    if ($('#hpAi').classList.contains('chat')) { $('#hGo').innerHTML = `${icon('send')}Спросить`; $('#hGo').disabled = false; return; }
    $('#hGo').innerHTML = got.length ? (n ? `${icon('search')}Показать ${n} ${plural(n, 'квартиру', 'квартиры', 'квартир')}` : 'Таких нет — смягчите условия') : `${icon('spark')}Подобрать`;
    $('#hGo').disabled = !!got.length && !n;
  }
  $('#hAi').addEventListener('input', hLive);
  $('#hAi').addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); $('#hs').requestSubmit(); } });
  $('#hEx').onclick = e => { const b = e.target.closest('button'); if (b) { $('#hAi').value = b.textContent; hLive(); $('#hAi').focus(); } };
  const WHO = [['self', 'Для себя', 'room-1'], ['pair', 'Для пары', 'room-2'], ['family', 'Семья с детьми', 'room-3'], ['invest', 'Для инвестиций', 'deals']];
  $('#hWho').innerHTML = WHO.map(([v, t, im]) => `<button type="button" data-who="${v}"><img src="img/g/${im}.webp" alt="" loading="lazy"><b>${t}</b></button>`).join('');
  $('#hQn').innerHTML = `${icon('home')}${kv(FL.length)} в продаже`;
  $('#hWho').onclick = e => { const b = e.target.closest('[data-who]'); if (b) go('flats.html#quiz-' + b.dataset.who); };
  $('#hs').addEventListener('submit', e => {
    e.preventDefault(); const v = $('#hAi').value.trim();
    if (!v) { $('#hAi').focus(); toast('Напишите, какую квартиру ищете, или выберите пример'); return; }
    hSay(v);
  });
  // чат прямо в главном блоке: вопрос — ответ с квартирами, без перехода на другую страницу
  function hSay(v) {
    const log = $('#hLog'), pane = $('#hpAi'); log.hidden = false; pane.classList.add('chat');
    log.insertAdjacentHTML('beforeend', `<div class="hm me">${v.replace(/[<>&]/g, '')}</div><div class="hm bot typing"><i></i><i></i><i></i></div>`);
    $('#hAi').value = ''; hLive(); log.scrollTop = log.scrollHeight;
    setTimeout(() => {
      const a = K.answer(v), t = $('.typing', log); t.classList.remove('typing');
      t.innerHTML = `<span>${a.text}</span>` + (a.flats ? `<div class="hm-fl">${a.flats.map(f => `<a href="flat.html#flat-${f.id}"><img src="${f.pl}" alt=""><span><b>${roomsWord(f.r)}, ${area(f.a)} м²</b>${SHORT[f.b]} · ${mln(f.p)} ₸</span></a>`).join('')}</div>` : '')
        + (a.q && a.n ? `<button class="lnk" type="button" data-all>${icon('arrow')}${a.n === 1 ? '' : 'Все '}${kv(a.n)} в каталоге</button>` : '');
      const all = $('[data-all]', t); if (all) all.onclick = () => { ss('bq-ai', JSON.stringify(a.q)); go('flats.html#ai'); };
      log.scrollTop = log.scrollHeight;
    }, 600);
  }
  S_.onLayout(() => hMode(hm.m)); hLive();

  const roomStat = S_.roomStat;
  const QS = [1, 2, 3, 4].map(r => { const s = roomStat(r); return `<a href="flats.html#r-${r}"><img class="qimg" src="img/g/room-${r}.webp" alt="" loading="lazy"><div><b>${r === 4 ? '4+ комнаты' : r + '-комнатные'}</b><span class="num">${s.n} шт. · от ${mln(s.min)} ₸</span></div></a>`; }).join('')
    + `<a class="hotq" href="flats.html#deal"><img class="qimg" src="img/g/deals.webp" alt="" loading="lazy"><div><b>Выгодно</b><span class="num">${DEAL.length} ниже средней</span></div></a>`
    + `<a href="extra.html#parking"><img class="qimg" src="img/g/parking.webp" alt="" loading="lazy"><div><b>Паркинг</b><span class="num">${EX['Parking place'].n} мест · от ${mln(EX['Parking place'].min)} ₸</span></div></a><a href="extra.html#store"><img class="qimg" src="img/g/store.webp" alt="" loading="lazy"><div><b>Кладовые</b><span class="num">${EX.Storeroom.n} шт. · от ${fmt(EX.Storeroom.min)} ₸</span></div></a>`;
  // бегущая полоса: два одинаковых набора, бесконечно по кругу; при наведении стоит
  $('#quick').innerHTML = `<div class="qtrack"><div class="qset">${QS}</div><div class="qset" aria-hidden="true">${QS.replace(/<a /g, '<a tabindex="-1" ')}</div></div>`;

  /* три ЖК */
  const tagHTML = b => K.tags(b).slice(0, 4).map(t => `<span class="tg tg-${t.k}">${icon(t.i)}${t.t}</span>`).join('');
  // на десктопе 4 места: проекты, а пока их меньше четырёх, последнее место — карточка «Все проекты»
  const PG4 = ORDER.slice(0, 4);
  $('#pgrid').innerHTML = PG4.map(b => {
    const z = ZK[b], s = ST[b];
    return `<div class="pc" data-go="project.html#${b}" tabindex="0">
      <div class="pimg"><img src="${PHOTO[b]}" alt="${z.name}" loading="lazy"><div class="chips">${tagHTML(b)}</div></div>
      <div class="pb"><h3>${{ life: 'Alatau Life', plaza: 'Alatau Plaza Residence', eco: 'Alatau Eco Park' }[b]}</h3><div class="addr">${icon('pin')}${z.addr}</div>
        <div class="sum num"><span>от ${area(s.amin)} м²</span><em>${kv(s.n)}</em><b>от ${mln(s.min)} ₸</b></div>
        <div class="tbl"><table class="num"><caption>${kv(s.n)} <span>в продаже</span></caption>${s.rows.map(([r, x]) => `<tr><td>${r === 0 ? 'Студия' : r >= 4 ? '4+ комн.' : r + '-комн.'}<small>от ${area(x.a)} м²</small></td><td><b>от ${mln(x.p)} ₸</b></td></tr>`).join('')}</table>
        <div class="pbtn"><a class="kb ic" href="project.html#${b}" aria-label="О комплексе" title="О комплексе">${icon('building')}</a><a class="kb pri" href="flats.html#zk-${b}">${icon('arrow')}Квартиры</a></div></div>
      </div></div>`;
  }).join('') + (ORDER.length < 4 ? (() => { const build = ORDER.filter(b => K.status(b).k !== 'done').length, done = ORDER.length - build;
    return `<a class="pc pc-all" href="zhk.html"><svg class="pa-roof" viewBox="0 0 493 147" aria-hidden="true"><path d="M246.5 0L0 117V146.4L246.5 29.3L493 146.4V117Z"/></svg>
      <div class="pa-stack">${ORDER.map((b, i) => `<img src="${PHOTO[b]}" alt="" loading="lazy" style="--i:${i - (ORDER.length - 1) / 2};z-index:${10 - Math.round(Math.abs(i - (ORDER.length - 1) / 2) * 2)}">`).join('')}</div>
      <div class="pa-b"><span class="pa-e">${icon('building')}Все проекты</span><h3>Смотреть все дома Baqyt</h3>
        <ul class="num"><li><b>${FL.length}</b>квартир в продаже</li><li><b>${build}</b>${plural(build, 'дом строится', 'дома строятся', 'домов строятся')}</li><li><b>${done}</b>${plural(done, 'дом сдан', 'дома сданы', 'домов сдано')}</li></ul>
        <span class="pa-go">Все проекты и карта${icon('arrow')}</span></div></a>`; })() : '');
  // точные высоты для плавной смены «цены → таблица» при наведении
  const pgH = () => $$('#pgrid .pc .sum, #pgrid .pc .tbl').forEach(el => el.style.setProperty('--h', el.scrollHeight + 'px'));
  pgH(); document.fonts && document.fonts.ready.then(pgH); addEventListener('resize', pgH);
  $('#pgrid').addEventListener('click', e => { if (e.target.closest('a')) return; const c = e.target.closest('[data-go]'); if (c) go(c.dataset.go); });

  /* предложения */
  const fEco = FL.filter(f => f.b === 'eco'), cheapLife = FL.filter(f => f.b === 'life' && f.r === 1).sort((a, b) => a.p - b.p)[0];
  // акций может быть сколько угодно: раскладываем рядами по 3, каждый ряд — своя «гармошка»
  // сроки акций — пример; реальные даты задаёт отдел продаж
  const nowD = new Date(), eom = new Date(nowD.getFullYear(), nowD.getMonth() + 1, 0, 23, 59, 59), eow = new Date(nowD.getFullYear(), nowD.getMonth(), nowD.getDate() + (7 - nowD.getDay()) % 7, 23, 59, 59), eonm = new Date(nowD.getFullYear(), nowD.getMonth() + 2, 0, 23, 59, 59);
  const PROMOS = [
    { h: 'flats.html#zk-plaza', img: 'img/g/promo-inst.webp', pc: '#5B21B6', ic: 'wallet', lab: 'Alatau Plaza Residence', t: 'Рассрочка 0% без банка', p: 'Первый взнос от 30%, остаток равными платежами до 24 месяцев. Без справок о доходе и переплаты.', go: 'Смотреть квартиры', until: eom },
    { h: 'flats.html#zk-eco', img: 'img/g/promo-last.webp', pc: '#B4380B', ic: 'bell', lab: 'Alatau Eco Park', t: (fEco.length === 1 ? 'Последняя квартира в готовом доме' : `Последние ${kv(fEco.length)} в готовом доме`), p: `Дом построен, можно заезжать сразу после сделки. Ипотека 7-20-25, от ${mln(ST.eco.min)} ₸.`, go: 'Успеть', left: fEco.length },
    { h: `flat.html#flat-${cheapLife.id}`, img: 'img/g/promo-hot.webp', pc: '#A3135A', ic: 'tag', lab: 'Спеццена недели', t: `<span class="old num">${mln(cheapLife.p * 1.03)}</span>${mln(cheapLife.p)} ₸`, p: 'Однокомнатная квартира в Alatau Life по специальной цене. Только до воскресенья.', go: 'Открыть квартиру', until: eow },
    { h: 'mortgage.html#full', img: 'img/g/promo-full.webp', pc: '#9A4A00', ic: 'percent', lab: 'Все проекты', t: 'Скидка до 10% за оплату', p: 'Чем больше вносите сразу, тем ниже цена: 3% при 25%, 5% при 50% и 10% при полной оплате.', go: 'Узнать условия', until: eom },
    { h: 'mortgage.html#7', img: 'img/g/promo-7.webp', pc: '#1E3FA8', ic: 'bank', lab: 'Госпрограмма', t: 'Ипотека 7-20-25', p: 'Ставка 7% на весь срок, взнос от 20%, до 25 лет. Поможем собрать документы за один визит.', go: 'Как работает' },
    { h: 'extra.html#parking', img: 'img/g/promo-park.webp', pc: '#0B6B66', ic: 'car', lab: 'Вместе с квартирой', t: 'Машиноместо к квартире', p: `Добавьте место в крытом паркинге к брони: один договор и одна сумма. ${EX['Parking place'].n} мест, от ${mln(EX['Parking place'].min)} ₸.`, go: 'Выбрать место', until: eonm }];
  const PR_ROW = 3, rows = [];
  for (let k = 0; k < PROMOS.length; k += PR_ROW) rows.push(PROMOS.slice(k, k + PR_ROW));
  $('#promoG').innerHTML = rows.map(r => `<div class="prow">${r.map(x => `<a class="pr pr2" href="${x.h}" style="--pc:${x.pc}"><img src="${x.img}" alt="" loading="lazy"><span class="lab">${icon(x.ic)}${x.lab}</span>${x.until ? `<span class="pr-tm num" data-until="${+x.until}" data-tip="Срок акции указан для примера">${icon('clock')}<b></b></span>` : x.left ? `<span class="pr-tm hot num">${icon('bell')}<b>Осталось ${x.left}</b></span>` : ''}<h3>${x.t}</h3><p>${x.p}</p><span class="go">${x.go}${icon('arrow')}</span></a>`).join('')}</div>`).join('');
  // акции: карточка расширяется по очереди, при наведении — та, что под курсором
  // обратный отсчёт до конца акции
  const tmTick = () => $$('#promoG [data-until]').forEach(el => { const d = Math.max(0, +el.dataset.until - Date.now()), D = Math.floor(d / 864e5), h = Math.floor(d / 36e5) % 24, m = Math.floor(d / 6e4) % 60, sec = Math.floor(d / 1e3) % 60, p2 = n => String(n).padStart(2, '0'); $('b', el).textContent = `${D ? D + ' д ' : ''}${p2(h)}:${p2(m)}:${p2(sec)}`; });
  tmTick(); setInterval(tmTick, 1000);
  const prs = $$('#promoG .pr'); let pi = 0, ptm;
  // в каждом ряду раскрыта одна карточка; по очереди переходим по всем акциям
  const pOn = k => { pi = k; const row = prs[k].parentNode; $$('.pr', row).forEach(p => p.classList.toggle('on', p === prs[k])); };
  $$('#promoG .prow').forEach(r => r.firstElementChild.classList.add('on'));
  const pNext = () => { clearTimeout(ptm); ptm = setTimeout(() => { pOn((pi + 1) % prs.length); pNext(); }, 4500); };
  pOn(0); pNext();
  prs.forEach((p, x) => p.addEventListener('pointerenter', e => { if (e.pointerType !== 'mouse') return; clearTimeout(ptm); pOn(x); }));
  $('#promoG').addEventListener('pointerleave', pNext);
  // акции придуманы в прототипе и не подтверждены (CLAUDE.md, 17.11.2026): блок был скрыт стилями, теперь его нет и в разметке
  clearTimeout(ptm); $('#promoG').remove(); $('#promo > .sec-h')?.remove();
  // DEAL отсортирован от самой большой выгоды; из каждой группы (ЖК + комнаты) берём первую, то есть самую выгодную
  const seenG = new Set(), pick = DEAL.filter(f => { const k = f.b + Math.min(f.r, 4); if (seenG.has(k)) return false; seenG.add(k); return true; }).slice(0, 4);
  $('#deals').innerHTML = pick.map(f => `<a class="dl" href="flat.html#flat-${f.id}"><img src="${f.pl}" alt="" loading="lazy"><div><b>${roomsWord(f.r)}, ${area(f.a)} м²</b><span>${SHORT[f.b]} · ${f.fl} этаж · ${mln(f.p)} ₸</span><em>${icon('tag')}на ${-K.delta(f)}% ниже средней</em></div></a>`).join('');

  /* ипотека: программы. Ставки, кроме 7-20-25, — примеры для расчёта */
  const PR = [Math.floor(Math.min(...FL.map(f => f.p)) / 1e6), Math.ceil(Math.max(...FL.map(f => f.p)) / 1e6)];
  const cs = { k: '7', p: 30, d: 20, y: 25, rate: 7 };
  const { PROGS, PIMG, PMORE, pFacts } = K;
  $('#progs').innerHTML = PROGS.map(g => `<div class="pg" role="button" tabindex="0" data-k="${g.k}" aria-pressed="${g.k === cs.k}"><div class="pg-h"><img class="pi" src="img/g/${PIMG[g.k]}.webp" alt="" loading="lazy"><div><b>${g.t}</b><span>${g.s}</span></div><em class="num">${g.rl || (g.ask || g.full ? '—' : g.rate + '%')}${g.ex && !g.ask ? '<small>пример</small>' : ''}</em></div>
    <div class="pg-b"><div><div class="pg-f">${pFacts(g).map(([i, t]) => `<span>${icon(i)}${t}</span>`).join('')}</div>
      <div class="pg-go"><span>Есть в ЖК</span><div>${g.zkq ? '<span>уточнит менеджер</span>' : ''}${(g.zkq ? [] : g.zk).map(b => `<a class="kb sm" href="project.html#${b}">${icon('building')}${SHORT[b]}</a>`).join('')}</div>
      <a class="kb pri sm pg-page" href="mortgage.html#${g.k}">${icon('doc')}Как работает программа${icon('arrow')}</a></div></div></div></div>`).join('');
  $('#calc2').innerHTML = `<div><h3 id="cT"></h3></div><p class="sub" id="cSub"></p>
    <div class="zks" id="cZ"></div>
    <div class="ks">
      <div><div class="f-l">Стоимость квартиры <b class="num" id="cP"></b></div><input class="krange" type="range" min="${PR[0]}" max="${PR[1]}" step="1" value="30" id="rcP" aria-label="Стоимость"></div>
      <div class="loan"><div class="f-l">Первый взнос <b class="num" id="cD"></b></div><input class="krange" type="range" id="rcD" aria-label="Взнос"></div>
      <div class="loan"><div class="f-l">Срок <b class="num" id="cY"></b></div><input class="krange" type="range" id="rcY" aria-label="Срок"></div>
      <div class="loan"><div class="f-l">Ставка <b class="num" id="cR"></b></div><input class="krange" type="range" min="0" max="25" step=".5" id="rcR" aria-label="Ставка"></div>
    </div>
    <div class="res loan"><div class="big num" id="cM"></div><div class="over num" id="cO"></div></div>
    <div class="split loan" id="cS"><i style="background:#fff"></i><i style="background:#9A6BEA"></i><i style="background:#4B3E6B"></i></div>
    <div class="legend num loan" id="cL"></div>
    <div class="gchart loan"><div class="gh"><span id="cGh"></span><span>${'<span style="color:#9A6BEA">■</span> долг · <span style="color:#6B5C93">■</span> проценты'}</span></div><div class="gbars" id="cG"></div></div>
    <div class="full"><div class="fopts" id="cF"></div><p class="fnote">${icon('info')}Размер скидок — пример. Точную скидку для вашей квартиры назовёт менеджер.</p></div>
    <p class="note" id="cN"></p>
    <div class="acts"><a class="kb pri" id="cGo" href="flats.html#q">${icon('search')}<span></span></a><button class="kb" data-ai>${icon('spark')}Спросить ИИ</button><button class="kb" data-call>${icon('phone')}<span id="cCall">Расчёт от банка</span></button></div>`;
  const prog = () => PROGS.find(g => g.k === cs.k);
  function setProg(k) {
    cs.k = k; const g = prog(); $$('#progs .pg').forEach(b => b.setAttribute('aria-pressed', b.dataset.k === k));
    $('#calc2').classList.toggle('isfull', !!(g.full || g.ask)); $('#calc2 .fnote').style.display = g.ask ? 'none' : ''; $('#cCall').textContent = g.ask ? 'Узнать условия' : 'Расчёт от банка';
    if (!g.full && g.d) {
      const rd = $('#rcD'), ry = $('#rcY'), rr = $('#rcR');
      rd.min = g.d[0]; rd.max = g.d[1]; rd.step = 5; rd.value = cs.d = g.d[2];
      ry.min = g.y[0]; ry.max = g.y[1]; ry.step = 1; ry.value = cs.y = g.y[2];
      rr.value = cs.rate = g.rate; rr.disabled = !!g.fixed;
    }
    $('#cT').textContent = g.t; $('#cSub').textContent = g.s;
    $('#cZ').innerHTML = g.zkq ? '<span class="tg">ЖК уточнит менеджер</span>' : ORDER.map(b => `<span class="tg ${g.zk.includes(b) ? '' : 'no'}">${SHORT[b]}</span>`).join('');
    $('#cN').innerHTML = g.note ? icon('info') + g.note : icon('info') + 'Платите всю сумму или её часть сразу и получайте скидку. Без кредита и переплаты.';
    cRecalc();
  }
  function cRecalc() {
    const g = prog(), P = cs.p * 1e6;
    $('#cP').textContent = cs.p + ' млн ₸';
    $('#cGo span').textContent = `Квартиры до ${cs.p} млн ₸`;
    $$('#calc2 .krange').forEach(i => i.style.setProperty('--p', (i.value - i.min) / (i.max - i.min) * 100 + '%'));
    if (g.bank) { $('#cF').innerHTML = `<div class="fo best ask"><b>Ставка зависит от срока накопления</b><table class="fo-rt num"><thead><tr><th>Копите</th><th>Ставка</th></tr></thead><tbody>${g.tbl.map(([m, r]) => `<tr><td>${m} мес.</td><td>${r}</td></tr>`).join('')}</tbody></table><p>Взнос 30% лежит на депозите под 7%. После накопления — 10% годовых. Точный платёж рассчитает банк, подать заявку поможет менеджер.</p></div>`; return; }
    if (g.ask) { $('#cF').innerHTML = `<div class="fo best ask"><b>Условия рассчитает менеджер</b><p>${g.full ? 'Чем больше вносите сразу, тем больше скидка. Размер скидки для вашей квартиры назовёт менеджер.' : 'Взнос, срок и график рассрочки менеджер рассчитает под выбранную квартиру.'}</p></div>`; return; }
    if (g.full) {
      // три варианта: сколько вносите сразу, какая скидка, сколько остаётся
      $('#cF').innerHTML = [[25, 3], [50, 5], [100, 10]].map(([x, d]) => { const S = P * (1 - d / 100), now = S * x / 100, rest = S - now;
        return `<div class="fo ${x === 100 ? 'best' : ''}"><span class="fo-x">${x}%</span><span class="fo-d">скидка ${d}%</span><b class="num">${fmt(Math.round(S / 1e3) * 1e3)} ₸</b><small class="num">вместо ${fmt(P)} ₸</small>
          <dl class="num"><dt>Сразу</dt><dd>${mln(now)} ₸</dd><dt>Остаток</dt><dd>${rest > 0 ? mln(rest) + ' ₸' : 'нет'}</dd></dl><span class="fo-h">${rest > 0 ? 'остаток в ипотеку или рассрочку' : 'вся сумма сразу'}</span></div>`; }).join('');
      return;
    }
    const D = P * cs.d / 100, L = P - D, n = g.u === 'm' ? cs.y : cs.y * 12, r = cs.rate / 100 / 12;
    const M = r ? L * r / (1 - (1 + r) ** -n) : L / n, I = M * n - L;
    $('#cD').textContent = `${cs.d}% · ${mln(D)} ₸`; $('#cY').textContent = cs.y + ' ' + (g.u === 'm' ? plural(cs.y, 'месяц', 'месяца', 'месяцев') : plural(cs.y, 'год', 'года', 'лет')); $('#cR').textContent = cs.rate + '%' + (g.ex ? ' · пример' : '');
    $('#cM').innerHTML = `<small>Платёж в месяц</small>${fmt(M)} ₸`;
    $('#cO').innerHTML = I > 1 ? `Переплата<b>${mln(I)} ₸</b>` : `Переплата<b>нет</b>`;
    const sp = $$('#cS i'); sp[0].style.flexGrow = D; sp[1].style.flexGrow = L; sp[2].style.flexGrow = Math.max(I, 0);
    $('#cL').innerHTML = `<span style="--c:#fff">Взнос ${mln(D)}</span><span style="--c:#9A6BEA">Кредит ${mln(L)}</span><span style="--c:#4B3E6B">Проценты ${mln(Math.max(I, 0))}</span>`;
    // график: из чего состоят платежи за каждый год (или месяц у рассрочки)
    const per = g.u === 'm' ? 1 : 12, cols = Math.ceil(n / per); let debt = L, bars = '';
    for (let c = 0; c < cols; c++) { let pr = 0, it = 0; for (let k = 0; k < per && c * per + k < n; k++) { const ii = debt * r; it += ii; pr += M - ii; debt -= M - ii; } const tot = pr + it; bars += `<i style="height:100%" title="${c + 1}-й ${g.u === 'm' ? 'месяц' : 'год'}: долг ${mln(pr)}, проценты ${mln(it)}"><s style="height:${it / tot * 100}%"></s><b style="height:${pr / tot * 100}%"></b></i>`; }
    $('#cG').innerHTML = bars; $('#cGh').textContent = `Из чего состоит платёж: по ${g.u === 'm' ? 'месяцам' : 'годам'}`;
  }
  $('#progs').onclick = e => {
    if (e.target.closest('.pg-go a')) return;
    const b = e.target.closest('[data-k]'); if (b) setProg(b.dataset.k);
  };
  $('#progs').onkeydown = e => { const b = e.target.closest('.pg'); if (b && e.target === b && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); setProg(b.dataset.k); } };
  [['#rcP', 'p'], ['#rcD', 'd'], ['#rcY', 'y'], ['#rcR', 'rate']].forEach(([s, k]) => $(s).oninput = e => { cs[k] = +e.target.value; cRecalc(); });
  $('#cGo').onclick = e => { e.preventDefault(); e.stopPropagation(); ss('bq-q', JSON.stringify({ zk: 'all', rooms: [], pm: 'price', max: cs.p })); go('flats.html#q'); };
  setProg('7');

  /* почему мы */
  const WHY = [['ceil', 'Потолки 3 метра', 'Больше воздуха и света', /потол/i], ['face', 'Face ID', 'Вход без ключей и карточек', /face/i], ['lock', 'Смарт-замки', 'Открывайте дверь с телефона', /замк/i], ['tree', 'Закрытый двор', 'Без машин, безопасно для детей', /двор/i], ['car', 'Крытый паркинг', 'Тепло зимой, место за вами', /паркинг/i], ['mute', 'Шумоизоляция', 'Тишина от соседей и улицы', /шум/i], ['cam', 'Видеонаблюдение', 'Двор и подъезды под контролем', /видео/i], ['film', 'Кинорум и детская', 'Общие пространства для жильцов', /кино|детск/i]];
  if ($('#whyG')) $('#whyG').innerHTML = WHY.map(([i, t, s, re]) => `<div class="wy"><div class="wi">${icon(i)}</div><b>${t}</b><span>${s}</span><div class="dots">${ORDER.filter(b => ZK[b].benefits.some(x => re.test(x))).map(b => `<em>${SHORT[b]}</em>`).join('')}</div></div>`).join('');

  /* переходы по ссылкам вида ./#prog-7 */
  S_.setRoute(h => {
    const m = h.match(/^prog-(\w+)$/); if (m && PROGS.some(g => g.k === m[1])) { setProg(m[1]); S_.scrollToEl($('#mortgage')); return true; }
    return false;
  });
  S_.start();
})();
