/* О компании: главный блок «три крыши», преимущества, стройка, кабинет, соцсети, вопросы, офис */
(() => {
  const { ZK, fmt, mln, area, roomsWord } = window.BQX;
  const K = window.BQK, { icon, ORDER, SHORT, ST, META, kv, rName } = K;
  const S_ = window.BQS, { $, $$, PHOTO, roundPoly, isPhone } = S_;
  const FL = window.BQ.flats, EX = window.BQ.extra;

  const tagHTML = b => K.tags(b).slice(0, 4).map(t => `<span class="tg tg-${t.k}">${icon(t.i)}${t.t}</span>`).join('');

  /* ценности компании */
  const VALS = [['award', 'Качество в деталях', 'Высокие потолки, тихие стены, продуманные планировки. Мелочи, которые чувствуешь каждый день.'], ['handshake', 'Честно и открыто', 'Цены, сроки и ход стройки на виду. Договор и график платежей понятны с первого прочтения.'], ['heart', 'Забота о жителях', 'Безопасный двор, общие пространства и сервис после переезда. Дом, где о вас помнят.'], ['tree', 'Город для людей', 'Строим кварталы, где всё нужное рядом: школы, парки, транспорт и магазины.']];
  $('#vals').innerHTML = VALS.map(([i, t, s], k) => `<div class="val"><span class="val-n num">0${k + 1}</span><span class="val-i">${icon(i)}</span><b>${t}</b><p>${s}</p></div>`).join('');

  /* что есть в наших домах: плитки с фото */
  const WHY = [['tree', 'Закрытый двор без машин', 'Дети гуляют сами, а родители спокойны', /двор/i, 'ph_5587279_4', 'w2 h2'], ['door', 'Просторные холлы', 'Встречают как в хорошем отеле', /холл|лобби/i, 'ph_6839859_7', 'h2'], ['ceil', 'Потолки 3 метра', 'Больше воздуха и света', /потол/i, 'ph_6839859_9', ''], ['face', 'Face ID и смарт-замки', 'Вход без ключей и карточек', /face|замк/i, 'ph_6839859_8', ''], ['film', 'Кинорум и детская', 'Общие пространства для жителей', /кино|детск/i, 'ph_5655382_4', 'w2'], ['kid', 'Детские площадки', 'Для малышей и школьников', /площад/i, 'ph_6839859_1', ''], ['mute', 'Шумоизоляция', 'Тишина от соседей и улицы', /шум/i, 'ph_6839859_10', '']];
  $('#whyG').innerHTML = WHY.map(([i, t, s, re, p, c]) => { const zk = ORDER.filter(b => ZK[b].benefits.some(x => re.test(x))); return `<figure class="bt ${c}"><img src="img/${p}.webp" alt="" loading="lazy"><figcaption><span class="bt-i">${icon(i)}</span><b>${t}</b><span>${s}</span>${zk.length ? `<span class="bt-zk">${zk.map(b => `<a href="project.html#${b}">${SHORT[b]}</a>`).join('')}</span>` : ''}</figcaption></figure>`; }).join('');
  const sold = ORDER.reduce((s, b) => s + (K.chess(b).match(/kch-c sold/g) || []).length, 0);
  $('#nums').innerHTML = [[FL.length, 'квартир сейчас в продаже'], [sold, 'квартир уже продано'], [EX['Parking place'].n + EX.Storeroom.n, 'машиномест и кладовых'], ['3 м', 'высота потолков']].map(([b, t]) => `<div><b class="num">${b}</b><span>${t}</span></div>`).join('');

  /* ход строительства: одна длинная плашка, по строке на каждый ЖК */
  const STG = ['Котлован', 'Каркас', 'Фасад', 'Отделка', 'Сдача'];
  const bStart = new Date('2026-03-22'), now = new Date();
  $('#blG').innerHTML = `<div class="bs-head"><b>Ход строительства</b><div class="bs-scale">${STG.map(t => `<span>${t}</span>`).join('')}</div><span class="bs-sp"></span></div>` + ORDER.map(b => {
    const end = new Date(META[b].service || '2027-06-01');
    const pc = b === 'eco' ? 100 : b === 'plaza' ? null : Math.max(5, Math.min(99, Math.round((now - bStart) / (end - bStart) * 100)));
    const w = pc === null ? 30 : pc, cur = pc === null ? 1 : Math.min(4, Math.floor(pc / 20));
    const note = b === 'eco' ? 'Дом построен' : b === 'plaza' ? 'Две очереди, идёт каркас' : K.status(b).t;
    return `<a class="bs" href="project.html#${b}"><span class="bs-n"><img src="${PHOTO[b]}" alt="" loading="lazy"><b>${SHORT[b]}</b><small>${note}</small></span>
      <span class="bs-t ${pc === null ? 'unk' : ''} ${pc === 100 ? 'done' : ''}"><span class="bs-bar"><i style="--w:${w}%"><em class="num">${pc === null ? STG[cur] : pc === 100 ? 'Готово' : pc + '%'}</em></i></span><span class="bs-ticks">${STG.map((t, i) => `<i class="${i < cur || pc === 100 ? 'ok' : i === cur ? 'now' : ''}"></i>`).join('')}</span></span>
      <span class="bs-go">${b === 'eco' ? 'Можно заселяться' : 'Фото со стройки'}${icon('arrow')}</span></a>`;
  }).join('');
  new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); o.disconnect(); } }), { threshold: .3 }).observe($('#blG'));

  /* история компании: от генподряда к собственным ЖК */
  const HS = [['20', 'лет на рынке строительства'], ['80', 'выполненных проектов'], ['3000+', 'договоров купли-продажи'], ['55 200+', 'м² введено в эксплуатацию']];
  $('#hStats').innerHTML = HS.map(([v, t]) => `<div><b class="num" data-cnt="${v}">${v}</b><span>${t}</span></div>`).join('');
  const HI = [
    ['2006', 'ЖК «Мереке»', 'пр. Абылай-хана, 35', 'Строительно-монтажные работы и инженерные сети', 'p1', 'gc'],
    ['2007', 'ЖД «Каминный»', 'ул. Дорожная, 4', 'Строительство блока А и инженерные сети', 'p2', 'gc'],
    ['2007', 'ЖК «Сказочный мир»', 'ул. Сыганак, 21/1', 'Строительно-монтажные работы', 'p3', 'gc'],
    ['2008', 'ЖК «Олимп Палас»', 'ул. Туркестан, 19А', 'Строительно-монтажные работы и инженерные сети', 'p4', 'gc'],
    ['2018', 'Завод медицинских изделий', 'СЭЗ «Астана — новый город»', 'Генподряд под ключ, монтаж и пусконаладка', 'p5', 'gc'],
    ['2019–2021', 'Alatau City', 'ул. Е-435', '10 этажей · 153 квартиры · 11 573 м²', 'p6', 'own', 'Сдан'],
    ['2023–2024', 'Alatau Park', 'ул. Е-181', '12 этажей · 705 квартир · 28 444 м²', 'p7', 'own', 'Сдан'],
    ['2024–2025', 'Alatau Eco Park', 'ул. Е-430, 2/4', '9 этажей · 176 квартир · 15 183 м²', 'p8', 'own', 'Сдан', 'eco'],
    ['Сейчас', 'Alatau Plaza Residence', 'пр. Кабанбай батыр, 57', '17 этажей · 267 квартир · 26 906 м²', 'p9', 'own', 'Строится', 'plaza'],
    ['2027', 'Alatau Life', 'ул. Е-435, 1/1', '9 этажей · 189 квартир · 21 873 м²', 'p10', 'own', 'Строится', 'life']];
  const firstOwn = HI.findIndex(x => x[5] === 'own');
  $('#hist').innerHTML = `<div class="hi-top"><div class="hi-era"><span class="on" data-era="gc">${icon('hammer')}Генподрядчик · 2006–2018</span><span data-era="own">${icon('building')}Собственные проекты · с 2019</span></div>
      <div class="hi-nav"><button type="button" class="ico" data-hn="-1" aria-label="Назад">${icon('back')}</button><button type="button" class="ico" data-hn="1" aria-label="Дальше">${icon('arrow')}</button></div></div>
    <div class="hi-line"><i id="hiFill"></i></div>
    <div class="hi-track" id="hiT">${HI.map(([y, n, a, d, p, k, st, b], i) => `${i === firstOwn ? `<div class="hi-turn"><svg viewBox="0 0 493 147" aria-hidden="true"><path d="M246.5 0L0 117V146.4L246.5 29.3L493 146.4V117Z"/></svg><b>2019</b><span>Начинаем строить свои дома</span></div>` : ''}
      <${b ? `a href="project.html#${b}"` : 'div'} class="hi ${k}" data-k="${k}"><div class="hi-pic"><img src="img/h/${p}.webp" alt="${n}" loading="lazy">${st ? `<span class="hi-st ${st === 'Сдан' ? 'ok' : ''}">${st}</span>` : ''}</div>
        <span class="hi-y num">${y}</span><b>${n}</b><small>${icon('pin')}${a}</small><p>${d}</p>${b ? `<span class="hi-go">Страница проекта${icon('arrow')}</span>` : ''}</${b ? 'a' : 'div'}>`).join('')}</div>`;
  const hT = $('#hiT');
  const hSync = () => {
    const max = hT.scrollWidth - hT.clientWidth, f = max > 0 ? hT.scrollLeft / max : 0;
    $('#hiFill').style.width = (f * 100).toFixed(1) + '%';
    const turn = $('.hi-turn', hT), own = turn && turn.offsetLeft - hT.scrollLeft < hT.clientWidth * .55;
    $$('.hi-era span').forEach(x => x.classList.toggle('on', (x.dataset.era === 'own') === !!own));
  };
  hT.addEventListener('scroll', hSync, { passive: true }); hSync();
  $('.hi-nav').onclick = e => { const b = e.target.closest('[data-hn]'); if (b) hT.scrollBy({ left: +b.dataset.hn * hT.clientWidth * .8, behavior: 'smooth' }); };
  $('.hi-era').onclick = e => { const x = e.target.closest('[data-era]'); if (!x) return; const t = x.dataset.era === 'own' ? $('.hi-turn', hT).offsetLeft - 8 : 0; hT.scrollTo({ left: t, behavior: 'smooth' }); };
  // колесо мыши по ленте листает её вбок
  hT.addEventListener('wheel', e => { if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return; const max = hT.scrollWidth - hT.clientWidth; if ((e.deltaY > 0 && hT.scrollLeft < max - 2) || (e.deltaY < 0 && hT.scrollLeft > 2)) { e.preventDefault(); hT.scrollLeft += e.deltaY; } }, { passive: false });
  // цифры считаются вверх, когда блок появляется на экране
  new IntersectionObserver((es, o) => es.forEach(e => { if (!e.isIntersecting) return; o.disconnect(); $$('[data-cnt]', e.target).forEach(el => { const v = el.dataset.cnt, n = +v.replace(/\D/g, ''), sfx = v.endsWith('+') ? '+' : '', t0 = performance.now(); const tick = t => { const k = Math.min(1, (t - t0) / 1400), e2 = 1 - Math.pow(1 - k, 3); el.textContent = fmt(Math.round(n * e2)) + sfx; if (k < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); }); }), { threshold: .4 }).observe($('#hStats'));

  /* кабинет и семья */
  const STEPS = [['phone', 'Войдите по номеру', 'Без пароля, код придёт в SMS или WhatsApp'], ['users', 'Добавьте семью', 'Пригласите близких ссылкой'], ['vote', 'Голосуйте и обсуждайте', 'Ставьте 👍 и 👎, пишите в чат у каждой квартиры'], ['key', 'Бронируйте онлайн', 'Договор и график платежей — в кабинете']];
  $('#steps').innerHTML = STEPS.map(([i, t, s], k) => `<div class="st ${k ? '' : 'on'}"><span class="si">${icon(i)}</span><div><b>${t}</b><span>${s}</span></div></div>`).join('');
  const setStep = k => $$('#steps .st').forEach((x, j) => x.classList.toggle('on', j === k));

  /* живой макет кабинета: вход по коду, семья подключается, голосует и пишет, бронь */
  const mf = [FL.find(f => f.b === 'life' && f.r === 3), FL.find(f => f.b === 'plaza' && f.r === 2), FL.find(f => f.b === 'eco')].filter(Boolean);
  const WHO = { me: ['Вы', '#7F42E1'], mom: ['Мама', '#E58A3B'], bro: ['Айдар', '#2AA876'] };
  const V0 = () => mf.map((f, k) => ({ f, u: [1, 1, 0][k], d: [0, 0, 1][k], c: [1, 0, 0][k], mine: 0 }));
  let V = V0();
  $('#mock').innerHTML = `<div class="mk-login" id="mkL"><span class="mk-logo"><img src="img/logo.svg" alt=""></span><b>Вход в кабинет</b><span class="mk-ph num">+7 700 ••• •• 16</span><div class="mk-code num">${[0, 1, 2, 3].map(() => '<i></i>').join('')}</div><span class="mk-ok">${icon('check')}Вход выполнен</span></div>
    <div class="mh"><b>Семья · избранное</b><div class="fam-av" id="mkAv"></div></div>
    <div class="mk-list" id="mkList"></div>
    <div class="mk-chat" id="mkChat" aria-live="polite"></div>
    <form class="mk-in" id="mkIn"><input id="mkTx" placeholder="Написать семье…" aria-label="Сообщение семье" autocomplete="off"><button class="ico" aria-label="Отправить">${icon('send')}</button></form>
    <div class="mk-toast" id="mkT"></div>`;
  const drawAv = L => { $('#mkAv').innerHTML = L.map(k => `<span style="background:${WHO[k][1]}" data-tip="${WHO[k][0]}${k === 'me' ? '' : ' в сети'}">${WHO[k][0][0]}${k !== 'me' ? '<i></i>' : ''}</span>`).join(''); };
  const score = v => v.u - v.d + v.mine;
  function drawList(anim) {
    const L = $('#mkList'), before = {}; $$('.mk-it', L).forEach(x => before[x.dataset.i] = x.getBoundingClientRect().top);
    const order = V.map((v, i) => i).sort((x, y) => score(V[y]) - score(V[x]) || x - y);
    L.innerHTML = order.map((i, pos) => { const v = V[i], f = v.f; return `<div class="mk-it ${pos ? '' : 'top'}" data-i="${i}"><img src="${f.pl}" alt=""><div><b>${roomsWord(f.r)}, ${area(f.a)} м²</b><span>${SHORT[f.b]} · ${mln(f.p)} ₸</span>
      <div class="votes"><button type="button" data-v="1" aria-pressed="${v.mine === 1}">👍 <b>${v.u + (v.mine === 1)}</b></button><button type="button" data-v="-1" aria-pressed="${v.mine === -1}">👎 <b>${v.d + (v.mine === -1)}</b></button><em>💬 ${v.c}</em></div></div>${pos ? '' : '<span class="mk-lead">Лидер семьи</span>'}</div>`; }).join('');
    if (anim) $$('.mk-it', L).forEach(x => { const b = before[x.dataset.i]; if (b == null) return; const d = b - x.getBoundingClientRect().top; if (!d) return; x.animate([{ transform: `translateY(${d}px)` }, { transform: 'none' }], { duration: 520, easing: 'cubic-bezier(.2,.8,.2,1)' }); });
  }
  const bump = (i, k) => { const el = $(`.mk-it[data-i="${i}"] [data-v="${k}"]`); if (el) el.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.35)' }, { transform: 'scale(1)' }], { duration: 420 }); };
  function say(who, text) {
    const c = $('#mkChat'), m = document.createElement('div'); m.className = 'msg ' + (who === 'me' ? 'me' : '');
    m.innerHTML = who === 'me' ? text : `<i style="background:${WHO[who][1]}">${WHO[who][0][0]}</i><span><small>${WHO[who][0]}</small>${text}</span>`;
    c.append(m); while (c.children.length > 2) c.firstElementChild.remove();
  }
  function typing(who) { const c = $('#mkChat'), m = document.createElement('div'); m.className = 'msg typing'; m.innerHTML = `<i style="background:${WHO[who][1]}">${WHO[who][0][0]}</i><span><small>${WHO[who][0]} печатает</small><em></em><em></em><em></em></span>`; c.append(m); while (c.children.length > 2) c.firstElementChild.remove(); return m; }
  const toastM = t => { const el = $('#mkT'); el.innerHTML = icon('check') + t; el.classList.add('on'); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('on'), 2600); };
  let timers = [], paused = false;
  const at = (ms, fn) => timers.push(setTimeout(() => { if (!paused) fn(); }, ms));
  const unType = () => { const t = $('#mkChat .typing'); t && t.remove(); };
  function play() {
    timers.forEach(clearTimeout); timers = []; V = V0(); $('#mkChat').innerHTML = ''; drawAv(['me']); drawList();
    const L = $('#mkL'); L.classList.add('on'); L.classList.remove('done'); $$('.mk-code i', L).forEach(i => i.textContent = '');
    setStep(0);
    '4815'.split('').forEach((d, k) => at(500 + k * 260, () => { $$('.mk-code i', L)[k].textContent = d; }));
    at(1700, () => L.classList.add('done'));
    at(2600, () => { L.classList.remove('on'); setStep(1); });
    at(3200, () => { drawAv(['me', 'mom']); toastM('Мама присоединилась'); });
    at(4300, () => { drawAv(['me', 'mom', 'bro']); toastM('Айдар присоединился'); });
    at(5400, () => { setStep(2); V[1].u++; drawList(true); bump(1, 1); });
    at(6000, () => typing('mom'));
    at(7300, () => { unType(); say('mom', 'Трёшка в Life: школа в 2 минутах, мне нравится 👍'); V[0].u++; V[0].c++; drawList(true); });
    at(8600, () => { V[2].d++; V[0].u++; drawList(true); bump(0, 1); });
    at(9300, () => typing('bro'));
    at(10500, () => { unType(); say('bro', 'Согласен. Запишемся на показ в субботу?'); V[0].c++; drawList(); });
    at(11800, () => { setStep(3); const t = $('.mk-it.top'); t && t.classList.add('pick'); toastM('Показ в субботу в 12:00 · все согласны'); });
    at(15500, play);
  }
  // пользователь может сам голосовать и писать: сценарий тогда замирает
  $('#mkList').onclick = e => { const b = e.target.closest('[data-v]'); if (!b) return; const i = +b.closest('.mk-it').dataset.i, k = +b.dataset.v; paused = true; $('#mkL').classList.remove('on'); V[i].mine = V[i].mine === k ? 0 : k; drawList(true); bump(i, k); };
  $('#mkIn').onsubmit = e => { e.preventDefault(); const t = $('#mkTx').value.trim(); if (!t) return; paused = true; $('#mkL').classList.remove('on'); unType(); say('me', t.replace(/</g, '&lt;')); $('#mkTx').value = ''; const ty = typing('mom'); setTimeout(() => { ty.remove(); say('mom', 'Хорошая идея 👍'); }, 1300); };
  $('#mkIn').addEventListener('focusin', () => { paused = true; $('#mkL').classList.remove('on'); });
  drawAv(['me', 'mom', 'bro']); drawList();
  new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting && !paused && !timers.length) play(); }), { threshold: .35 }).observe($('#mock'));

  const IG = [['ph_6839859_5', 'Alatau Life'], ['ph_5655382_1', 'Alatau Plaza Residence'], ['ph_5587279_4', 'Двор Alatau Eco Park'], ['ph_6839859_6', 'Холл Alatau Life'], ['ph_5655382_3', 'Кинорум'], ['ph_5587279_6', 'Детская площадка'], ['ph_6839859_4', 'Alatau Life вечером'], ['ph_5655382_4', 'Детская в Alatau Plaza Residence']];
  $('#igG').innerHTML = IG.map(([p, t]) => `<a href="https://www.instagram.com/baqyt_group/" target="_blank" rel="noopener" data-t="${t}"><img src="img/${p}.webp" alt="${t}" loading="lazy"></a>`).join('');
  /* вопросы: плавно раскрываются, открыт один */
  $('#faqG').innerHTML = K.FAQ.map(([q, a], i) => `<div class="fq ${i ? '' : 'on'}"><button type="button" aria-expanded="${!i}"><span class="fq-n num">${String(i + 1).padStart(2, '0')}</span><b>${q}</b><i class="fq-x"></i></button><div class="fq-a"><p>${a}</p></div></div>`).join('');
  $('#faqG').onclick = e => { const b = e.target.closest('.fq > button'); if (!b) return; const it = b.parentElement, on = !it.classList.contains('on');
    $$('#faqG .fq').forEach(x => { const o = x === it && on; x.classList.toggle('on', o); $('button', x).setAttribute('aria-expanded', o); }); };
  S_.start();
})();
