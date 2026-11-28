/* Страница ипотеки: подробно о каждой программе. Данные программ — в kit.js (общие с главной) */
(() => {
  const { fmt, mln } = window.BQX;
  const K = window.BQK, { icon, SHORT, ST, kv, PROGS, PIMG, PMORE, pFacts, annuity } = K;
  const S_ = window.BQS, { $, $$, PHOTO } = S_;

  // кому подходит, как оформить, что взять — общий порядок; детали уточняет банк или менеджер
  const INFO = {
    7: { who: ['Покупаете квартиру в новостройке', 'Хотите платёж, который не меняется весь срок', 'Есть 20% на первый взнос'], steps: ['Выбираете квартиру в ЖК, где действует программа', 'Менеджер бронирует её и готовит документы от застройщика', 'Подаёте заявку в банк-партнёр', 'Подписываете договор, банк перечисляет деньги'], docs: ['Удостоверение личности', 'Справка о доходах или выписка', 'Договор бронирования от застройщика'] },
    market: { who: ['Нужна квартира в любом из наших ЖК', 'Важно подать заявку в несколько банков сразу', 'Хотите сами выбрать срок и взнос'], steps: ['Выбираете квартиру', 'Менеджер собирает документы и отправляет заявку в банки-партнёры', 'Сравниваете одобренные ставки', 'Подписываете договор с выбранным банком'], docs: ['Удостоверение личности', 'Справка о доходах или выписка', 'Договор бронирования от застройщика'] },
    otbasy: { who: ['Копите на депозите в Отбасы банке', 'Хотите ставку ниже рыночной', 'Готовы внести крупный первый взнос'], steps: ['Проверяете накопления и оценочный показатель в Отбасы банке', 'Выбираете квартиру', 'Подаёте заявку в Отбасы банк с договором бронирования', 'Подписываете договор займа'], docs: ['Удостоверение личности', 'Договор о жилищных накоплениях', 'Договор бронирования от застройщика'] },
    freedom: { who: ['Пока не накопили на взнос полностью, но есть 30%', 'Хотите со временем платить по ставке 10%', 'Готовы платить по ипотеке и копить одновременно'], steps: ['Выбираете квартиру', 'Подаёте заявку в Freedom Bank онлайн — решение за несколько минут', 'Вносите 30% на депозит и подписываете договор с застройщиком', 'Платите по ипотеке; после накопления ставка снижается до 10%'], docs: ['Удостоверение личности', 'Договор с застройщиком (готовит менеджер)', 'Согласие супруга, если вы в браке'] },
    inst: { who: ['Не хотите брать кредит в банке', 'Нет справки о доходах', 'Хотите платить частями напрямую застройщику'], steps: ['Выбираете квартиру в Alatau Plaza Residence', 'Менеджер рассчитывает график под вашу сумму', 'Вносите первый взнос и подписываете договор', 'Платите частями по графику'], docs: ['Удостоверение личности', 'Первый взнос'] },
    full: { who: ['Есть часть суммы или вся сумма', 'Хотите заплатить меньше', 'Остаток готовы закрыть ипотекой или рассрочкой'], steps: ['Выбираете квартиру', 'Менеджер называет размер скидки', 'Вносите выбранную часть', 'Остаток — ипотекой, рассрочкой или сразу'], docs: ['Удостоверение личности', 'Договор бронирования'] }
  };
  const FAQ = [
    ['Можно ли совместить программы?', 'Да, часто так и делают: например, вносите часть суммы со скидкой за оплату, а остаток закрываете ипотекой. Какие сочетания возможны для вашей квартиры, скажет менеджер.'],
    ['Сколько ждать одобрения?', 'Зависит от банка. Менеджер подаёт заявку сразу в несколько банков, чтобы вы сравнили ответы и выбрали лучший.'],
    ['Можно ли погасить досрочно?', 'Обычно да. Условия досрочного погашения записаны в договоре с банком; в рассрочке от застройщика — в договоре с нами.'],
    ['Почему ставки на сайте помечены «пример»?', 'Ставка зависит от банка, взноса, срока и вашего дохода. Мы показываем примерные цифры для расчёта, а точные называет банк при одобрении.']
  ];
  const P0 = 30e6; // квартира для примера платежа
  const pay = g => g.full || g.ask ? null : g.rate ? annuity(P0 * (1 - g.d[0] / 100), g.y[1], g.rate / 100) : P0 * (1 - g.d[0] / 100) / g.y[1];
  const term = g => g.full || g.ask ? '—' : `до ${g.y[1]} ${g.u === 'm' ? 'мес.' : 'лет'}`;
  // таблица ставок банка (для программ, где ставка зависит от срока накопления)
  const rates = g => `<div class="mp-rt"><table class="num"><thead><tr><th>Срок накопления</th><th>Ставка</th><th>ГЭСВ</th></tr></thead><tbody>${g.tbl.map(([m, r, e]) => `<tr><td>${m} мес.</td><td>${r}</td><td>${e}</td></tr>`).join('')}</tbody></table><p>После накопления — 10% годовых. ГЭСВ — полная годовая стоимость займа со всеми платежами. Точный платёж рассчитает банк.</p></div>`;
  const where = g => g.zkq ? 'Уточните у менеджера' : g.zk.length === 3 ? 'Во всех ЖК' : g.zk.map(b => SHORT[b]).join(', ');

  $('#mTabs').innerHTML = PROGS.map(g => `<a href="#${g.k}" data-k="${g.k}"><img src="img/g/${PIMG[g.k]}.webp" alt="">${g.t}</a>`).join('');
  $('#mCmp').innerHTML = `<thead><tr><th>Программа</th><th>Ставка</th><th>Взнос</th><th>Срок</th><th>Платёж за ${mln(P0)} ₸</th><th>Где есть</th></tr></thead><tbody>${PROGS.map(g => {
    const p = pay(g);
    return `<tr data-k="${g.k}" tabindex="0"><td><span class="mc-n"><img src="img/g/${PIMG[g.k]}.webp" alt=""><b>${g.t}</b></span></td><td>${g.rl || (g.full || g.ask ? '—' : g.rate + '%')}${g.ex && !g.ask ? ' <small>пример</small>' : ''}</td><td>${g.dl || (g.ask ? 'у менеджера' : 'от ' + g.d[0] + '%')}</td><td>${g.yl || term(g)}</td><td>${p ? fmt(Math.round(p / 1e3) * 1e3) + ' ₸/мес' : 'у менеджера'}</td><td>${where(g)}</td></tr>`;
  }).join('')}</tbody>`;
  $('#mCmp').onclick = e => { const r = e.target.closest('tr[data-k]'); if (r) S_.scrollToEl(document.getElementById(r.dataset.k)); };
  $('#mCmp').onkeydown = e => { const r = e.target.closest('tr[data-k]'); if (r && e.key === 'Enter') S_.scrollToEl(document.getElementById(r.dataset.k)); };

  $('#mList').innerHTML = PROGS.map((g, i) => {
    const f = INFO[g.k], p = pay(g);
    return `<section class="blk wrap mp ${i % 2 ? 'flip' : ''}" id="${g.k}">
      <div class="mp-pic" data-roof="56" data-roof-m="34"><img src="img/g/${PIMG[g.k]}.webp" alt="" loading="lazy">${p ? `<div class="mp-pay num"><span>Платёж за ${mln(P0)} ₸</span><b>${fmt(Math.round(p / 1e3) * 1e3)} ₸/мес</b><small>взнос ${g.d[0]}%, ${term(g)}${g.ex ? ', пример' : ''}</small></div>` : ''}</div>
      <div class="mp-b">
        <span class="eyebrow"><i class="rm"></i>${g.s}</span><h2>${g.t}</h2>
        <div class="pg-f mp-f">${pFacts(g).map(([ic, t]) => `<span>${icon(ic)}${t}</span>`).join('')}</div>
        <div class="mp-txt">${PMORE[g.k].map(t => `<p>${t}</p>`).join('')}</div>${g.tbl ? rates(g) : ''}
        <details class="mp-more"><summary>Кому подходит, документы и шаги<i class="rm"></i></summary>
        <div class="mp-cols">
          <div><h3>${icon('user')}Кому подходит</h3><ul class="mp-who">${f.who.map(t => `<li>${icon('check')}${t}</li>`).join('')}</ul></div>
          <div><h3>${icon('doc')}Что понадобится</h3><ul class="mp-who">${f.docs.map(t => `<li>${icon('file')}${t}</li>`).join('')}</ul></div>
        </div>
        <h3 class="mp-h3">${icon('route')}Как оформить</h3>
        <ol class="mp-steps">${f.steps.map(t => `<li><span>${t}</span></li>`).join('')}</ol>
        </details>
        <h3 class="mp-h3">${icon('building')}Есть в ЖК</h3>${g.zkq ? `<p class="mp-q">В каких наших ЖК доступна программа, уточнит менеджер.</p>` : ''}
        <div class="mp-zk"${g.zkq ? ' hidden' : ''}>${g.zk.map(b => `<a href="project.html#${b}"><img src="${PHOTO[b]}" alt=""><span><b>${SHORT[b]}</b><small class="num">${kv(ST[b].n)} · от ${mln(ST[b].min)} ₸</small></span>${icon('arrow')}</a>`).join('')}</div>
        <div class="mp-cta">${g.bank ? `<button class="kb pri" data-call>${icon('phone')}Рассчитать с менеджером</button>` : `<a class="kb pri" href="./#prog-${g.k}">${icon('calc')}Рассчитать платёж</a>`}<a class="kb" href="flats.html">${icon('search')}Подобрать квартиру</a></div>
      </div>
    </section>`;
  }).join('');
  $('#mFaq').innerHTML = FAQ.map(([q, a], i) => `<details ${i ? '' : 'open'}><summary>${q}<i class="rm"></i></summary><p>${a}</p></details>`).join('');

  // подсветка текущей программы во вкладках
  const tabs = $$('#mTabs a');
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) tabs.forEach(a => a.setAttribute('aria-selected', a.dataset.k === e.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
  $$('.mp').forEach(s => io.observe(s));
  S_.start();
})();
