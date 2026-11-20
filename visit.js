/* Запись на показ дома: формат, день и время, телефон — на странице проекта */
(() => {
  const K = window.BQK, { icon, SHORT, kv } = K;
  const S_ = window.BQS, { $, $$, PHOTO } = S_;
  const el = $('#visit'); if (!el) return;
  const DAYS = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'], MON = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  const FMT = [['house', 'home', 'Экскурсия по дому', 'Двор, подъезд, лобби и готовые этажи', '≈ 40 мин'], ['show', 'cube', 'Шоурум с макетом', 'Макет квартала, отделка и планировки', '≈ 30 мин'], ['video', 'cam', 'Онлайн по видео', 'Покажем дом и квартиру из дома', '≈ 20 мин']];
  const TIMES = ['10:00', '11:30', '13:00', '15:00', '16:30', '18:00'];
  const v = { f: 'house', d: 1, t: '11:30' };
  const day = k => { const d = new Date(); d.setDate(d.getDate() + k); return d; };
  window.BQV = b => {
    el.innerHTML = `<div class="vis">
      <div class="vis-pic" data-roof="60" data-roof-m="36"><img src="${PHOTO[b]}" alt="" loading="lazy"><img class="vis-in" src="img/g/office.webp" alt="" loading="lazy"><span class="vis-tag">${icon('pin')}${SHORT[b]}</span></div>
      <form class="vis-f" novalidate>
        <span class="eyebrow"><i class="rm"></i>Показ</span><h2>Приезжайте посмотреть ${SHORT[b]} вживую</h2>
        <p class="vis-p">Выберите формат и удобное время, менеджер подтвердит запись в WhatsApp.</p>
        <div class="vis-l">Формат</div>
        <div class="vis-fmt">${FMT.map(([k, i, t, s, m]) => `<button type="button" data-f="${k}" aria-pressed="${k === v.f}"><span class="vi">${icon(i)}</span><b>${t}</b><small>${s}</small><em class="num">${m}</em></button>`).join('')}</div>
        <div class="vis-l">День</div>
        <div class="vis-d">${[0, 1, 2, 3, 4, 5, 6].map(k => { const d = day(k); return `<button type="button" data-d="${k}" aria-pressed="${k === v.d}"><small>${k === 0 ? 'сегодня' : k === 1 ? 'завтра' : DAYS[d.getDay()]}</small><b class="num">${d.getDate()}</b><small>${MON[d.getMonth()]}</small></button>`; }).join('')}</div>
        <div class="vis-l">Время</div>
        <div class="vis-t">${TIMES.map(t => `<button type="button" data-t="${t}" aria-pressed="${t === v.t}" class="num">${t}</button>`).join('')}</div>
        <div class="vis-in2"><input class="vn" placeholder="Имя" autocomplete="name" aria-label="Имя"><input class="vp" placeholder="+7 7__ ___ __ __" inputmode="tel" autocomplete="tel" aria-label="Телефон"></div>
        <button class="kb pri vis-go" type="submit">${icon('cal')}<span></span></button>
      </form></div>`;
    const f = $('form', el), ph = $('.vp', el); K.phoneMask(ph);
    const sum = () => { const d = day(v.d); $('.vis-go span', el).textContent = `Записаться: ${v.d < 2 ? (v.d ? 'завтра' : 'сегодня') : d.getDate() + ' ' + MON[d.getMonth()]}, ${v.t}`; };
    f.onclick = e => {
      const b = e.target.closest('[data-f],[data-d],[data-t]'); if (!b) return;
      const k = b.dataset.f ? 'f' : b.dataset.d ? 'd' : 't'; v[k] = k === 'd' ? +b.dataset.d : b.dataset[k];
      $$(`[data-${k}]`, f).forEach(x => x.setAttribute('aria-pressed', x === b)); sum();
    };
    f.onsubmit = e => {
      e.preventDefault(); const ok = ph.value.replace(/\D/g, '').length === 11; ph.classList.toggle('bad', !ok); if (!ok) { ph.focus(); return; }
      const d = day(v.d), fm = FMT.find(x => x[0] === v.f)[2];
      f.innerHTML = `<div class="vis-ok">${icon('check')}<b>Вы записаны</b><p>${fm}, ${SHORT[b]}: ${d.getDate()} ${MON[d.getMonth()]}, ${v.t}. Менеджер подтвердит запись в WhatsApp.</p><small>В прототипе запись никуда не отправляется.</small></div>`;
    };
    sum(); S_.layout();
  };
})();
