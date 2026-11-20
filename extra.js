/* Презентационная страница: паркинг, кладовые, коммерция */
(() => {
  const { ZK, fmt, mln, area, R } = window.BQX;
  const K = window.BQK, { icon } = K;
  const S_ = window.BQS, { $, $$ } = S_, E = window.BQE;
  const EX = window.BQ.extra, Pk = EX['Parking place'], Sr = EX.Storeroom;
  const homes = ZK.life.total + ZK.eco.total;
  const P = {
    parking: { t: 'Паркинг', ic: 'car', img: 'img/g/parking.webp', h: 'Машиноместо в крытом паркинге', p: 'Крытый паркинг есть в Alatau Life и Alatau Eco Park. Место оформляется в собственность, его можно купить вместе с квартирой или отдельно.',
      nums: [[Pk.n, 'мест в продаже'], [`от ${mln(Pk.min)} ₸`, 'цена места'], [`${area(Pk.amin)}–${area(Pk.amax)} м²`, 'площадь']],
      f: [['car', 'Крытый паркинг', 'Машина не стоит под снегом и солнцем'], ['key', 'В собственности', 'Место закреплено за вами по договору'], ['home', 'Вместе с квартирой', 'Одна бронь и один договор'], ['cam', 'Видеонаблюдение', 'Есть в обоих домах с паркингом']],
      q: [['Можно купить место без квартиры?', 'Да, машиноместо продаётся отдельно. Покупатели квартир обычно выбирают раньше, поэтому места у подъездов заканчиваются быстрее.'], ['Можно в ипотеку или рассрочку?', 'Условия зависят от банка и ЖК. Менеджер посчитает место вместе с квартирой одной суммой.'], ['Где именно моё место?', 'Менеджер покажет схему уровня с номерами мест и поможет выбрать место ближе к лифту или к вашему подъезду.']] },
    store: { t: 'Кладовые', ic: 'box', img: 'img/g/store.webp', h: 'Кладовая для всего, что не помещается дома', p: 'Коляска, шины, велосипед, зимние вещи — всё рядом с квартирой, но не в ней. Кладовые на нижних уровнях домов, площадь от 2 до 6 м².',
      nums: [[Sr.n, 'кладовых в продаже'], [`от ${fmt(Sr.min)} ₸`, 'цена'], [`${area(Sr.amin)}–${area(Sr.amax)} м²`, 'площадь']],
      f: [['box', 'От 2 до 6 м²', 'От шкафа для шин до комнаты для велосипедов'], ['key', 'В собственности', 'Оформляется как отдельное помещение'], ['home', 'Вместе с квартирой', 'Можно выбрать рядом со своим подъездом'], ['lock', 'Закрывается на замок', 'Доступ только у вас']],
      q: [['Что можно хранить в кладовой?', 'Коляски, велосипеды, шины, сезонные вещи, инструменты. Нельзя: горючие вещества и продукты, которые портятся.'], ['Можно купить без квартиры?', 'Да. Но приоритет обычно у жильцов дома — уточните у менеджера.'], ['Как выбрать кладовую рядом с подъездом?', 'Менеджер покажет схему уровня и свободные кладовые рядом с вашей квартирой.']] },
    commerce: { t: 'Коммерция', ic: 'shop', img: 'img/g/commerce.webp', h: 'Помещения на первых этажах для бизнеса', p: `Кофейня, аптека, детский центр или офис рядом с жильцами: только в Alatau Life и Eco Park ${homes} квартир. Узнайте у менеджера, какие помещения свободны.`,
      nums: [[homes, 'квартир в двух домах'], ['1 этаж', 'отдельные входы'], ['по запросу', 'цена и площадь']],
      f: [['users', 'Свой поток клиентов', 'Жильцы домов рядом каждый день'], ['door', 'Отдельный вход', 'С улицы, не через подъезд'], ['briefcase', 'Под любой бизнес', 'Кафе, услуги, офис, магазин'], ['handshake', 'Продажа или аренда', 'Условия обсуждаются с застройщиком']],
      q: [['Сколько стоит помещение?', 'Цены и площади пока не опубликованы на сайте. Менеджер пришлёт планировки и условия.'], ['Можно арендовать, а не купить?', 'Уточните у менеджера: формат зависит от конкретного помещения.'], ['Какие помещения есть?', 'Помещения на первых этажах наших жилых комплексов, все с отдельным входом с улицы. Актуальный список и планировки пришлёт менеджер.']] }
  };
  $('#xtabs').classList.add('slide');
  $('#xtabs').innerHTML = `<span class="tind" aria-hidden="true"></span>` + Object.entries(P).map(([k, x]) => `<button role="tab" data-x="${k}" aria-selected="false">${icon(x.ic)}${x.t}</button>`).join('');
  const cnt = k => k === 'commerce' ? 'по запросу' : `${E.count(k)} в продаже`;
  // «хлебные крошки»: последний шаг — переключатель разделов
  const cr = $('#xCrumb');
  const drawCrumb = k => { cr.innerHTML = `<button type="button" class="csw-b" aria-expanded="false" aria-haspopup="true">${icon(P[k].ic)}<b>${P[k].t}</b>${icon('down')}</button>
    <div class="csw-m" role="menu">${Object.entries(P).map(([q, x]) => `<button type="button" role="menuitem" data-x="${q}" aria-current="${q === k}"><span class="csw-i">${icon(x.ic)}</span><span><b>${x.t}</b><small>${cnt(q)}</small></span>${q === k ? icon('check') : ''}</button>`).join('')}</div>`; };
  const csw = o => { cr.classList.toggle('open', o); $('.csw-b', cr).setAttribute('aria-expanded', o); };
  cr.onclick = e => { const b = e.target.closest('[data-x]'); if (b) { csw(false); go(b.dataset.x); return; } if (e.target.closest('.csw-b')) csw(!cr.classList.contains('open')); };
  document.addEventListener('click', e => { if (!cr.contains(e.target)) csw(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') csw(false); });
  const tind = () => { const b = $('#xtabs [aria-selected="true"]'), t = $('#xtabs .tind'); if (b && t && b.offsetWidth) { t.style.transform = `translateX(${b.offsetLeft}px)`; t.style.width = b.offsetWidth + 'px'; t.style.height = b.offsetHeight + 'px'; t.style.top = b.offsetTop + 'px'; } };
  let cur = null, swapT;
  function show(k, anim) {
    if (!P[k]) return;
    if (anim && cur && cur !== k) { const xp = $('#xpage'); xp.classList.add('out'); clearTimeout(swapT); $$('#xtabs [data-x]').forEach(b => b.setAttribute('aria-selected', b.dataset.x === k)); tind(); swapT = setTimeout(() => { xp.classList.remove('out'); show(k); xp.classList.remove('in'); void xp.offsetWidth; xp.classList.add('in'); }, 230); return; }
    cur = k; const x = P[k];
    $$('#xtabs [data-x]').forEach(b => b.setAttribute('aria-selected', b.dataset.x === k)); tind(); drawCrumb(k);
    document.title = x.t + ' · Baqyt';
    $('#xpage').innerHTML = `
      <section class="wrap xh"><div class="xh-img" data-roof="60" data-roof-m="30"><img src="${x.img}" alt=""></div>
        <div class="xh-t"><span class="eyebrow"><i class="rm"></i>${x.t}</span><h2>${x.h}</h2><p>${x.p}</p>
          <div class="xh-n">${x.nums.map(([b, s]) => `<div><b class="num">${b}</b><span>${s}</span></div>`).join('')}</div>
          <div class="xh-a"><button class="kb pri" data-jump>${icon('search')}Выбрать${k === 'commerce' ? ' помещение' : ''}</button><a class="kb" href="flats.html#tab-${k}">${icon('grid')}В каталоге с квартирами</a></div></div></section>
      <section class="blk wrap"><div class="xf">${x.f.map(([i, t, s]) => `<div class="wy"><div class="wi">${icon(i)}</div><b>${t}</b><span>${s}</span></div>`).join('')}</div></section>
      <section class="blk wrap" id="xlist"><div class="sec-h"><div><span class="eyebrow"><i class="rm"></i>Выбор</span><h2>${k === 'commerce' ? 'Помещения' : k === 'parking' ? 'Свободные места' : 'Свободные кладовые'}</h2></div><p>Выберите комплекс, площадь и цену. Забронировать можно в один клик.</p></div><div class="xm"></div></section>
      <section class="blk wrap"><div class="sec-h"><div><span class="eyebrow"><i class="rm"></i>Как купить</span><h2>Три шага</h2></div></div>
        <div class="xs">${[['search', 'Выберите', k === 'commerce' ? 'Помещение и формат: покупка или аренда' : 'Место рядом со своим подъездом'], ['key', 'Забронируйте', 'Менеджер подтвердит, что оно свободно'], ['doc', 'Оформите договор', 'Вместе с квартирой или отдельно']].map(([i, t, s], n) => `<div><em class="num">${n + 1}</em>${icon(i)}<b>${t}</b><span>${s}</span></div>`).join('')}</div></section>
      <section class="blk wrap"><div class="sec-h"><div><span class="eyebrow"><i class="rm"></i>Вопросы</span><h2>Частые вопросы</h2></div></div><div class="faq">${x.q.map(([q, a], i) => `<details ${i ? '' : 'open'}><summary>${q}<i class="rm"></i></summary><p>${a}</p></details>`).join('')}</div></section>`;
    E.mount($('#xpage .xm'), k, { more: `flats.html#tab-${k}`, moreT: 'Все в каталоге' });
    $('[data-jump]').onclick = () => S_.scrollToEl($('#xlist'));
    S_.layout();
  }
  function go(k) {
    if (R.PRETTY) { location.href = R.url('extra.html#' + k); return; }
    show(k, true); try { history.replaceState(null, '', location.pathname + '#' + k); } catch (x) {} S_.scrollToEl(null);
  }
  $('#xtabs').onclick = e => { const b = e.target.closest('[data-x]'); if (b) go(b.dataset.x); };
  S_.onLayout(tind);
  S_.setRoute(h => { if (P[h]) { show(h); S_.scrollToEl(null, false); return true; } return false; });
  show((R.hash() in P) ? R.hash() : 'parking'); $('#xpage').classList.add('in');
  S_.start(R.hash() in P);
})();
