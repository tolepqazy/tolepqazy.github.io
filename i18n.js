/* Переключение языка сайта (русский ↔ казахский), 18.11.2026.
   Тексты в коде остаются русскими; словарь window.BQ_KZ (kz.js) даёт перевод фраз.
   Числа в фразах заменены метками {0}, {1}… — «Сдача: 3 квартал 2027» ищется как «Сдача: {0} квартал {1}».
   Выбор языка запоминается в браузере и действует на всех страницах. */
(() => {
  const NUM = /\d+(?:[   ]\d{3})*(?:[.,]\d+)?/g;
  const CYR = /[А-Яа-яЁё]/;
  const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE']); // поле ввода не пропускаем: у него переводится подсказка
  const ATTRS = ['placeholder', 'aria-label', 'title', 'alt'];
  const key = s => { const nums = []; const k = s.replace(/\s+/g, ' ').trim().replace(NUM, m => (nums.push(m), '{' + (nums.length - 1) + '}')); return [k, nums]; };
  const missing = new Set();
  let lang = 'ru';
  const R = window.BQX && window.BQX.R;
  // на готовом сайте язык задаёт адрес (/kz/… — казахский), в прототипе — выбор, запомненный в браузере
  if (R && R.PRETTY) lang = R.lang === 'kz' ? 'kz' : 'ru';
  else try { if (localStorage.getItem('bq-lang') === 'kz') lang = 'kz'; } catch (e) {}

  function tr(s) {
    if (!s || !CYR.test(s)) return null;
    const [k, nums] = key(s);
    const t = (window.BQ_KZ || {})[k];
    if (t == null) { missing.add(k); return null; }
    const lead = s.match(/^\s*/)[0], trail = s.match(/\s*$/)[0];
    return lead + t.replace(/\{(\d+)\}/g, (_, i) => nums[i] ?? '') + trail;
  }

  const RU = new WeakMap();   // текстовый узел → русский оригинал
  const OUT = new WeakMap();  // текстовый узел → что мы туда записали
  let busy = false;
  const skipEl = el => { for (let e = el; e && e !== document.documentElement; e = e.parentElement) { if (SKIP.has(e.tagName) || e.hasAttribute('data-noi18n') || (e.getAttribute('lang') || '').startsWith('kk')) return true; } return false; };

  function doText(n) {
    if (OUT.has(n) && OUT.get(n) !== n.data) { RU.delete(n); OUT.delete(n); } // текст поменял сам сайт
    if (lang === 'ru') { if (RU.has(n)) { n.data = RU.get(n); RU.delete(n); OUT.delete(n); } return; }
    if (RU.has(n) || skipEl(n.parentElement)) return;
    const t = tr(n.data); if (t == null) return;
    RU.set(n, n.data); n.data = t; OUT.set(n, t);
  }
  function doAttrs(el) {
    for (const a of ATTRS) {
      const store = 'data-ru-' + a;
      if (lang === 'ru') { if (el.hasAttribute(store)) { el.setAttribute(a, el.getAttribute(store)); el.removeAttribute(store); } continue; }
      if (!el.hasAttribute(a) || el.hasAttribute(store)) continue;
      const t = tr(el.getAttribute(a)); if (t == null) continue;
      el.setAttribute(store, el.getAttribute(a)); el.setAttribute(a, t);
    }
  }
  function walk(root) {
    if (root.nodeType === 3) { if (root.parentElement) doText(root); return; }
    if (root.nodeType !== 1 || skipEl(root)) return;
    doAttrs(root);
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, { acceptNode: n => n.nodeType === 1 && SKIP.has(n.tagName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
    for (let n = w.nextNode(); n; n = w.nextNode()) n.nodeType === 3 ? doText(n) : doAttrs(n);
  }

  let RU_TITLE = null;
  function apply() {
    busy = true;
    document.documentElement.lang = lang === 'kz' ? 'kk' : 'ru';
    document.documentElement.dataset.lang = lang;
    walk(document.body);
    if (lang === 'kz') { if (RU_TITLE == null) RU_TITLE = document.title; const t = tr(RU_TITLE); if (t) document.title = t; }
    else if (RU_TITLE != null) document.title = RU_TITLE;
    obs.takeRecords(); busy = false;
  }
  const obs = new MutationObserver(recs => {
    if (busy || lang === 'ru') return; busy = true;
    for (const r of recs) {
      if (r.type === 'characterData') doText(r.target);
      else if (r.type === 'attributes') { if (!r.target.hasAttribute('data-ru-' + r.attributeName)) doAttrs(r.target); else if (r.target.getAttribute(r.attributeName) !== tr(r.target.getAttribute('data-ru-' + r.attributeName))) { r.target.removeAttribute('data-ru-' + r.attributeName); doAttrs(r.target); } }
      else r.addedNodes.forEach(walk);
    }
    obs.takeRecords(); busy = false;
  });

  function setLang(l) {
    l = l === 'kz' ? 'kz' : 'ru';
    try { localStorage.setItem('bq-lang', l); } catch (e) {}
    // готовый сайт: у каждого языка свой адрес — переходим на него
    if (R && R.PRETTY) { if (l !== lang) location.href = R.swapLang(location.pathname, l) + location.search + location.hash; return; }
    lang = l;
    apply();
  }
  window.BQI = { get lang() { return lang; }, setLang, tr, key, missing };
  const start = () => { obs.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS }); if (lang === 'kz') apply(); };
  // скрипты стоят в конце body, поэтому следим за страницей сразу: казахский текст появляется вместе с разметкой, без мигания русского
  document.body ? start() : document.addEventListener('DOMContentLoaded', start);
})();
