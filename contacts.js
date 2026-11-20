/* Страница контактов: отдел продаж, шоурум, адреса домов. Только настоящие данные с сайта */
(() => {
  const { ZK } = window.BQX;
  const K = window.BQK, { icon, ORDER, SHORT, ST, kv } = K;
  const S_ = window.BQS, { $, PHOTO } = S_;
  const map = q => `https://2gis.kz/astana/search/${encodeURIComponent(q)}`;
  const row = (t, v) => `<div class="ct-r"><dt>${t}</dt><dd>${v}</dd></div>`;
  $('#ct').innerHTML = `<div class="ct-pic" data-roof="60" data-roof-m="34"><img src="img/g/office.webp" alt=""></div>
    <div class="ct-b">
      <h2>Отдел продаж и шоурум</h2>
      <dl class="ct-l">
        ${row('Адрес', `<a href="${map('Мәңгілік Ел 54')}" target="_blank" rel="noopener">пр-т Мәңгілік Ел, 54, НП&nbsp;9</a><small>Открыть в 2ГИС</small>`)}
        ${row('Телефон', `<a class="ct-tel num" href="tel:+77008000016">+7 700 800 00 16</a>`)}
        ${row('Часы работы', `Пн–Сб 10:00–20:00<br>Вс 11:00–16:00`)}
        ${row('WhatsApp', `<a href="https://wa.me/77008000016" target="_blank" rel="noopener">Написать в WhatsApp</a>`)}
        ${row('Почта', `<a href="mailto:info@baqytgroup.kz">info@baqytgroup.kz</a>`)}
        ${row('Соцсети', `<a href="https://www.instagram.com/baqyt_group/" target="_blank" rel="noopener">Instagram</a> · <a href="https://www.tiktok.com/@baqyt_group" target="_blank" rel="noopener">TikTok</a>`)}
      </dl>
      <div class="ct-a"><button class="kb pri" data-visit>${icon('cal')}Записаться на показ</button><button class="kb" data-call>${icon('phone')}Заказать звонок</button></div>
    </div>`;
  $('#ctZkL').innerHTML = ORDER.map(b => `<a href="project.html#${b}"><img src="${PHOTO[b]}" alt="" loading="lazy"><span><b>${ZK[b].name}</b><small>${ZK[b].addr}, ${ZK[b].area}</small><small class="num">${kv(ST[b].n)} в продаже</small></span>${icon('arrow')}</a>`).join('');
  S_.start();
})();
