/* Общие данные и утилиты для обоих вариантов. Квартиры — window.BQ из data.js (выгрузка с baqytgroup.kz 12.10.2026). */
(function () {
  const ZK = {
    life: {
      name: 'Alatau Life', dev: 'ТОО «Adi invest»', cls: 'Комфорт+', addr: 'ул. E-435, 1/1', area: 'рядом с КазУБТ', floors: 9, total: 189, ents: [1, 2, 3, 4, 5],
      status: 'Сдача: 3 квартал 2027', pay: ['Ипотека'], ceiling: '3 м',
      benefits: ['Потолки 3 метра', 'Крытый паркинг', 'Face ID и смарт-замки', 'Закрытый двор', 'Шумоизоляция', 'Скоростные лифты', 'Холлы с авторским дизайном', 'Видеонаблюдение 24/7'],
      nearby: [['Школа №90', 2], ['КазУБТ', 5], ['Школа №100', 5], ['Военный колледж', 8], ['MNU', 12]],
      photo: 'img/prev_6839859.webp', night: 'img/ph_6839859_4.webp', gallery: ['img/ph_6839859_0.webp', 'img/ph_6839859_1.webp', 'img/ph_6839859_6.webp'],
      geo: [51.14706, 71.35459]
    },
    eco: {
      name: 'Alatau Eco Park', cls: 'Комфорт+', addr: 'ул. Е 430, 2/4', area: 'район Хан Шатыра', floors: 9, total: 176, ents: [1, 2, 3, 4],
      status: 'Дом построен, осталось 3 квартиры', pay: ['Ипотека 7-20-25'], ceiling: '3 м',
      benefits: ['Потолки 3 метра', 'Face ID', 'Закрытый двор', 'Крытый паркинг', 'Бесшумные лифты', 'Смарт-замки с Touch ID', 'Видеонаблюдение на всех этажах'],
      nearby: [['Nazarbayev University', 5], ['MEGA Silk Way', 7], ['Центральная мечеть', 10], ['Аэропорт', 15]],
      photo: 'img/prev_5587279.webp', night: 'img/prev_5587279.webp', gallery: ['img/ph_5587279_3.webp', 'img/ph_5587279_4.webp', 'img/ph_5587279_7.webp'],
      geo: [51.14694, 71.36396]
    },
    plaza: {
      name: 'Alatau Plaza Residence', cls: 'Бизнес и Элит', addr: 'пр. Кабанбай батыр, 57', area: 'район Экспо', floors: 17, total: null, ents: [1, 2, 3, 4, 5, 6],
      status: 'Сдача: 2 квартал 2027, есть ДДУ', pay: ['Рассрочка', 'Ипотека'], ceiling: null,
      benefits: ['Face ID и смарт-замки', 'Кинорум', 'Детская игровая', 'Повышенная шумоизоляция', 'Чистовая отделка', 'Рассрочка от застройщика', 'Наличие ДДУ'],
      nearby: [['Республиканская мечеть', 3], ['Nazarbayev University', 5], ['MEGA Silk Way', 5]],
      photo: 'img/prev_5655382.webp', night: 'img/prev_5655382.webp', gallery: ['img/ph_5655382_2.webp', 'img/ph_5655382_3.webp', 'img/ph_5655382_4.webp'],
      geo: [51.07915, 71.39745]
    }
  };
  const PLACES = [
    ['any', 'неважно, что рядом'],
    ['Nazarbayev University', 'рядом с Nazarbayev University'],
    ['MEGA Silk Way', 'рядом с MEGA Silk Way'],
    ['Школа', 'рядом со школой'],
    ['Университет', 'рядом с университетом'],
    ['мечеть', 'рядом с мечетью'],
    ['Аэропорт', 'недалеко от аэропорта']
  ];
  function minutesTo(b, place) {
    if (place === 'any') return 0;
    let best = null;
    for (const [n, m] of ZK[b].nearby) {
      const hit = place === 'Школа' ? /школа/i.test(n)
        : place === 'Университет' ? /университет|КазУБТ|MNU/i.test(n)
        : place === 'мечеть' ? /мечеть/i.test(n)
        : n === place;
      if (hit && (best === null || m < best[1])) best = [n, m];
    }
    return best;
  }
  /* платёж в месяц — по программе, которая есть в ЖК этой квартиры (27.11.2026): 7-20-25 только в Eco Park (7%, 25 лет),
     в остальных — ипотека банка (18% пример, 20 лет). Взнос 20%. Те же значения, что открывает калькулятор на странице квартиры (kit.js PROGS). */
  const payK = (rate, years) => { const r = rate / 12, n = years * 12; return .8 * r / (1 - (1 + r) ** -n); };
  const K_ECO = payK(.07, 25), K_BANK = payK(.18, 20);
  const monthly = (p, b) => Math.round(p * (b === 'eco' ? K_ECO : K_BANK) / 100) * 100;
  const payNote = b => b === 'eco' ? 'Ипотека 7-20-25: ставка 7%, взнос 20%, 25 лет' : 'Ипотека банка: ставка 18% — пример, взнос 20%, 20 лет';
  const fmt = (v) => Math.round(v).toLocaleString('ru-RU').replace(/ /g, ' ');
  const mln = (v) => (v / 1e6).toFixed(1).replace(/\.0$/, '').replace('.', ',') + ' млн';
  const area = (a) => String(a).replace('.', ',');
  const roomsWord = (r) => r === 1 ? '1-комнатная' : r + '-комнатная';
  const plural = (n, a, b, c) => { const m10 = n % 10, m100 = n % 100; return m10 === 1 && m100 !== 11 ? a : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? b : c; };

  function score(f, q) {
    const reasons = [];
    let s = 0;
    // комнаты
    if (!q.rooms) { s += 35; }
    else {
      const want = q.rooms, have = Math.min(f.r, 4);
      if (have === want) { s += 35; reasons.push([true, roomsWord(f.r)]); }
      else if (Math.abs(have - want) === 1) { s += 12; reasons.push([false, roomsWord(f.r) + ', а вы искали ' + (want === 4 ? '4+' : want)]); }
      else reasons.push([false, roomsWord(f.r)]);
    }
    // платёж
    const m = monthly(f.p, f.b);
    if (m <= q.budget) { s += 35; reasons.push([true, 'платёж ' + fmt(m) + ' ₸ в месяц']); }
    else { const k = Math.max(0, 1 - (m - q.budget) / (q.budget * 0.6)); s += 35 * k; reasons.push([false, 'платёж ' + fmt(m) + ' ₸, выше на ' + fmt(m - q.budget)]); }
    // этаж
    if (q.floor === 'any') s += 10;
    else {
      const need = q.floor === 'high' ? 6 : 3;
      if (f.fl >= need) { s += 10; reasons.push([true, f.fl + ' этаж']); }
      else { s += 3; reasons.push([false, f.fl + ' этаж']); }
    }
    // что рядом
    if (q.place === 'any') s += 20;
    else {
      const t = minutesTo(f.b, q.place);
      if (!t) { s += 2; reasons.push([false, 'рядом нет того, что вы выбрали']); }
      else { const k = t[1] <= 5 ? 1 : t[1] <= 10 ? 0.7 : 0.45; s += 20 * k; reasons.push([k >= 0.7, t[0] + ' — ' + t[1] + ' мин']); }
    }
    return { s: Math.round(s), reasons };
  }

  // Разбор фразы. В прототипе — правила; на сайте это делает ИИ по базе квартир.
  function parse(text, q) {
    const t = text.toLowerCase().replace(/ё/g, 'е');
    const out = { ...q }, got = [];
    const r = t.match(/(\d)\s*-?\s*(к\b|ком|х\s*ком|комн)/) || (/(одн|однуш|студи)/.test(t) && [0, '1']) || (/(двух|двуш)/.test(t) && [0, '2']) || (/(трех|треш)/.test(t) && [0, '3']) || (/(четыр|больш.*сем|многодет)/.test(t) && [0, '4']);
    if (r) { out.rooms = Math.min(4, +r[1]); got.push(out.rooms === 4 ? '4+ комнаты' : out.rooms + ' ' + plural(out.rooms, 'комната', 'комнаты', 'комнат')); }
    const clean = t.replace(/(\d)\s+(\d{3})/g, '$1$2');
    const nm = clean.match(/(\d+[.,]?\d*)\s*(тыс|т\b|k|к\b|000|млн)?/g);
    if (nm) {
      for (const raw of nm) {
        const mm = raw.match(/(\d+[.,]?\d*)\s*(тыс|т\b|k|к\b|млн)?/); let v = parseFloat(mm[1].replace(',', '.'));
        if (mm[2] === 'млн') continue;
        if (v < 10) continue;
        if (v < 2000) v *= 1000;
        if (v >= 60000 && v <= 2000000) { out.budget = Math.max(90000, Math.min(900000, Math.round(v / 10000) * 10000)); got.push('до ' + fmt(out.budget) + ' ₸ в месяц'); break; }
      }
    }
    if (/высок|вид|не ниже|выше/.test(t)) { out.floor = 'high'; got.push('этаж повыше'); }
    else if (/не перв|не низк/.test(t)) { out.floor = 'mid'; got.push('не первые этажи'); }
    if (/назарбаев|nu\b|ну\b|университет назар/.test(t)) { out.place = 'Nazarbayev University'; got.push('рядом с NU'); }
    else if (/мега|mega/.test(t)) { out.place = 'MEGA Silk Way'; got.push('рядом с MEGA'); }
    else if (/школ|дет|ребен/.test(t)) { out.place = 'Школа'; got.push('рядом школа'); }
    else if (/мечет/.test(t)) { out.place = 'мечеть'; got.push('рядом мечеть'); }
    else if (/аэропорт/.test(t)) { out.place = 'Аэропорт'; got.push('недалеко аэропорт'); }
    else if (/универ|учеб|студент/.test(t)) { out.place = 'Университет'; got.push('рядом университет'); }
    return { q: out, got };
  }

  /* Адреса страниц (19.11.2026). Готовый сайт (dist/, собирает tools/build.mjs) живёт на «человеческих» адресах:
     /zhk/alatau-life/, /kvartiry/267880/, /kz/… Прототип в site/ — на старых: project.html#life, flat.html#flat-267880.
     В коде ссылки пишутся по-старому; на готовом сайте R.url() переводит их в новые. Состояние страницы (какой ЖК,
     какая квартира, вкладка) берётся из пути — это «виртуальный хэш» R.vhash, его же понимают старые обработчики. */
  const SLUG = { life: 'alatau-life', eco: 'alatau-eco-park', plaza: 'alatau-plaza-residence' };
  const BYSLUG = Object.fromEntries(Object.entries(SLUG).map(([b, s]) => [s, b]));
  const TAB = { parking: 'parking', store: 'kladovye', commerce: 'kommerciya' };
  const BYTAB = Object.fromEntries(Object.entries(TAB).map(([k, s]) => [s, k]));
  const SIMPLE = { 'zhk.html': 'zhk', 'flats.html': 'kvartiry', 'mortgage.html': 'ipoteka', 'about.html': 'o-kompanii', 'contacts.html': 'kontakty' };
  const BYSIMPLE = Object.fromEntries(Object.entries(SIMPLE).map(([f, s]) => [s, f]));
  // старая ссылка → новый адрес ('project.html#life' → '/zhk/alatau-life/'); чужие и уже новые ссылки не трогаем
  function pretty(href, lang) {
    if (!href || /^(tel|mailto|https?|javascript|data):/i.test(href) || href[0] === '#' || href[0] === '/') return href;
    const hi = href.indexOf('#'), h = hi < 0 ? '' : href.slice(hi + 1), rest = hi < 0 ? href : href.slice(0, hi);
    const qi = rest.indexOf('?'), file = (qi < 0 ? rest : rest.slice(0, qi)).replace(/^\.\//, ''), q = qi < 0 ? '' : rest.slice(qi);
    let p = null, hh = h, m;
    if (file === '' || file === '.' || file === 'index.html') p = '/';
    else if (file === 'project.html') { if (SLUG[h]) { p = `/zhk/${SLUG[h]}/`; hh = ''; } else p = '/zhk/'; }
    else if (file === 'flat.html') { if ((m = h.match(/^flat-(\d+)$/))) { p = `/kvartiry/${m[1]}/`; hh = ''; } else p = '/kvartiry/'; }
    else if (file === 'extra.html') { p = `/${TAB[h] || TAB.parking}/`; hh = ''; }
    else if (file === 'flats.html') {
      if ((m = h.match(/^r-([1-4])$/))) { p = `/kvartiry/${m[1]}-komnatnye/`; hh = ''; }
      else if ((m = h.match(/^tab-(parking|store|commerce)$/))) { p = `/${TAB[m[1]]}/`; hh = ''; }
      else p = '/kvartiry/';
    }
    else if (SIMPLE[file]) p = `/${SIMPLE[file]}/`;
    if (p === null) return href;
    if (lang === 'kz') p = '/kz' + p;
    return p + q + (hh ? '#' + hh : '');
  }
  // путь → какой шаблон и какое состояние: '/kz/zhk/alatau-life/' → { lang: 'kz', file: 'project.html', h: 'life' }
  function parsePath(path) {
    let p = (path || '/').replace(/\/index\.html$/, '/'), lang = 'ru';
    if (/^\/kz(\/|$)/.test(p)) { lang = 'kz'; p = p.slice(3) || '/'; }
    const s = p.split('/').filter(Boolean);
    let r = null;
    if (!s.length) r = { file: 'index.html', h: '' };
    else if (s.length === 1 && BYSIMPLE[s[0]]) r = { file: BYSIMPLE[s[0]], h: '' };
    else if (s.length === 1 && BYTAB[s[0]]) r = { file: 'extra.html', h: BYTAB[s[0]] };
    else if (s.length === 2 && s[0] === 'zhk' && BYSLUG[s[1]]) r = { file: 'project.html', h: BYSLUG[s[1]] };
    else if (s.length === 2 && s[0] === 'kvartiry' && /^[1-4]-komnatnye$/.test(s[1])) r = { file: 'flats.html', h: 'r-' + s[1][0] };
    else if (s.length === 2 && s[0] === 'kvartiry' && /^\d+$/.test(s[1])) r = { file: 'flat.html', h: 'flat-' + s[1] };
    return r ? Object.assign(r, { lang }) : { file: null, h: '', lang };
  }
  // тот же адрес на другом языке
  const swapLang = (path, lang) => { const p = (path || '/').replace(/^\/kz(\/|$)/, '/'); return lang === 'kz' ? '/kz' + p : p; };
  const DOC = typeof document !== 'undefined' ? document : null;
  const PRETTY = !!(DOC && DOC.documentElement.hasAttribute('data-pretty'));
  const HERE = PRETTY ? parsePath(location.pathname) : { file: null, h: '', lang: null };
  const R = {
    PRETTY, SLUG, pretty, parsePath, swapLang, lang: HERE.lang, vhash: HERE.h,
    // состояние страницы: настоящий хэш, а если его нет — из пути
    hash: () => (DOC ? location.hash.slice(1) : '') || HERE.h,
    // ссылка для перехода: на готовом сайте — новый адрес на текущем языке
    url: href => PRETTY ? pretty(href, window.BQI ? window.BQI.lang : HERE.lang) : href
  };

  window.BQX = { ZK, PLACES, minutesTo, monthly, fmt, mln, area, roomsWord, plural, score, parse, payNote, R };
})();
