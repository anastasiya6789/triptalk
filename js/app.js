'use strict';
/* =========================================================
   TripTalk — английский для путешествий
   ========================================================= */
const APP_VERSION = '6';
const app = document.getElementById('app');
let user = null;   // текущий пользователь
let P = null;      // прогресс
let L = null;      // активный урок
let C = null;      // активная сессия карточек
let G = null;      // активный тест по грамматике
let guestCarry = null; // прогресс гостя, который переносим в новый аккаунт

/* ---------------- утилиты ---------------- */
const todayStr = () => new Date().toLocaleDateString('sv');
const addDays = (d, n) => { const x = new Date(d + 'T12:00:00'); x.setDate(x.getDate() + n); return x.toLocaleDateString('sv'); };
const dayDiff = (a, b) => Math.round((new Date(b + 'T12:00:00') - new Date(a + 'T12:00:00')) / 864e5);
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const sample = (a, n) => shuffle(a).slice(0, n);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const norm = s => String(s).toLowerCase().replace(/[’`]/g, "'").replace(/[.,!?;:"«»—]/g, ' ').replace(/\s+/g, ' ').trim();
const firstVariant = s => s.split(' / ')[0];
const tokenize = s => s.replace(/[.,!?;:]/g, '').split(/\s+/).filter(Boolean);
const plural = (n, one, few, many) => { const m10 = n % 10, m100 = n % 100; return m10 === 1 && m100 !== 11 ? one : m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20) ? few : many; };
const unitById = id => UNITS.find(u => u.id === id);
const cardKey = w => w.unit + '|' + w.en;

function lev(a, b) {
  const m = a.length, n = b.length; const d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[m][n];
}

function go(path) {
  const target = '#/' + path;
  if (location.hash === target) route(); else location.hash = target;
}

function toast(text) {
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = text;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add('show'), 10);
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2600);
}

/* ---------------- озвучка и звуки ---------------- */
let voice = null;
function pickVoice() {
  const vs = speechSynthesis.getVoices().filter(v => v.lang && v.lang.toLowerCase().startsWith('en'));
  voice = vs.find(v => /en-US/i.test(v.lang) && /Samantha|Google US|Natural|Aria|Jenny/i.test(v.name))
    || vs.find(v => /en-US/i.test(v.lang)) || vs[0] || null;
}
if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }

function speak(text, opts = {}) {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(firstVariant(text).replace(/^— /, ''));
  u.lang = 'en-US';
  if (voice) u.voice = voice;
  u.rate = opts.slow ? 0.6 : 0.92;
  if (opts.pitch) u.pitch = opts.pitch;
  if (opts.onend) u.onend = opts.onend;
  speechSynthesis.speak(u);
}

let actx = null;
function sound(ok) {
  if (P && P.settings.sound === false) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const notes = ok ? [587, 880] : [311, 233];
    notes.forEach((f, i) => {
      const o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime + i * 0.11;
      o.type = ok ? 'sine' : 'triangle'; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.18, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
      o.connect(g).connect(actx.destination); o.start(t); o.stop(t + 0.22);
    });
  } catch {}
}

const speakerBtn = (text, cls = '') => `<button class="speaker ${cls}" data-act="say" data-say="${esc(text)}" aria-label="Послушать">🔊</button>`;

/* ---------------- прогресс ---------------- */
function defaultProgress() {
  return {
    v: 1, xp: 0, streak: 0, best: 0, lastActive: null, goal: 30,
    today: { date: todayStr(), xp: 0 },
    lessons: {}, cards: {}, grammar: {}, sounds: {},
    settings: { sound: true, cardDir: 'en' },
    created: Date.now(),
  };
}
function normalizeProgress(p) {
  const d = defaultProgress();
  p = Object.assign(d, p || {});
  p.settings = Object.assign(defaultProgress().settings, p.settings || {});
  if (!p.today || p.today.date !== todayStr()) p.today = { date: todayStr(), xp: 0 };
  return p;
}
const currentStreak = () => (P.lastActive && dayDiff(P.lastActive, todayStr()) <= 1 ? P.streak : 0);
const level = xp => 1 + Math.floor(Math.sqrt(xp / 40));
const levelFloor = l => (l - 1) ** 2 * 40;

let saveTimer = null;
function save(now = false) {
  clearTimeout(saveTimer);
  if (now) return Backend.saveProgress(user, P);
  saveTimer = setTimeout(() => Backend.saveProgress(user, P), 500);
}
document.addEventListener('visibilitychange', () => { if (document.hidden && user && P) save(true); });

function addXp(n) {
  const t = todayStr();
  if (P.today.date !== t) P.today = { date: t, xp: 0 };
  const before = P.today.xp;
  P.today.xp += n; P.xp += n;
  if (P.lastActive !== t) {
    const d = P.lastActive ? dayDiff(P.lastActive, t) : 99;
    P.streak = d === 1 ? P.streak + 1 : 1;
    P.lastActive = t;
    P.best = Math.max(P.best || 0, P.streak);
  }
  if (before < P.goal && P.today.xp >= P.goal) setTimeout(() => toast('🎯 Цель дня выполнена! Так держать!'), 400);
  save();
}

function touchCards(words) {
  const t = todayStr();
  words.forEach(w => { if (!P.cards[cardKey(w)]) P.cards[cardKey(w)] = { box: 0, due: t }; });
}

function unitProgress(u) {
  const defs = lessonDefs(u);
  const done = defs.filter((_, i) => P.lessons[u.id + '-' + i]).length;
  return { done, total: defs.length };
}
const knownWords = () => Object.values(P.cards).filter(c => c.box >= 2).length;
const dueCards = () => {
  const t = todayStr();
  return ALL_WORDS.filter(w => { const c = P.cards[cardKey(w)]; return c && c.due <= t; });
};

/* =========================================================
   РОУТИНГ
   ========================================================= */
function route() {
  if (!user) return renderAuth();
  speechSynthesis?.cancel?.();
  if (recState) { recState.silent = true; micFinish(recState); }
  const [page, a, b] = location.hash.replace(/^#\/?/, '').split('/');
  window.scrollTo(0, 0);
  switch (page) {
    case 'lesson': return startLesson(a, +b);
    case 'cards': return a ? startCards(a) : renderCards();
    case 'grammar': return a ? renderTopic('grammar', a) : renderGrammar();
    case 'sounds': return a ? renderTopic('sounds', a) : renderSounds();
    case 'phrases': return a ? renderPhraseUnit(a) : renderPhrases();
    case 'profile': return renderProfile();
    default: return renderLearn();
  }
}
window.addEventListener('hashchange', route);

/* ---------------- каркас страницы ---------------- */
const NAV = [
  ['', '🏠', 'Учиться', 'Учёба'],
  ['cards', '🃏', 'Карточки', 'Карточки'],
  ['grammar', '📐', 'Грамматика', 'Грамм.'],
  ['sounds', '🗣️', 'Произношение', 'Звуки'],
  ['phrases', '📖', 'Разговорник', 'Фразы'],
  ['profile', '👤', 'Профиль', 'Профиль'],
];
function shell(active, content) {
  const streak = currentStreak();
  const goalPct = Math.min(100, Math.round((P.today.xp / P.goal) * 100));
  const due = dueCards().length;
  app.innerHTML = `
  <div class="layout">
    <nav class="sidebar">
      <a class="logo" href="#/"><span>🧳</span> TripTalk</a>
      ${NAV.map(([p, i, t, sh]) => `<a href="#/${p}" class="nav-item ${active === p ? 'active' : ''}" title="${t}"><span class="ni">${i}</span><span class="nt"><span class="nt-full">${t}</span><span class="nt-short">${sh}</span></span>${p === 'cards' && due ? `<span class="badge">${due}</span>` : ''}</a>`).join('')}
    </nav>
    <div class="main">
      <header class="topbar">
        <a class="logo mobile-only" href="#/"><span>🧳</span> TripTalk</a>
        <div class="stats">
          <span class="stat-pill ${streak ? 'fire' : 'off'}" title="Дней подряд">🔥 ${streak}</span>
          <span class="stat-pill xp" title="Очки опыта">⭐ ${P.xp}</span>
          <span class="stat-pill goal" title="Цель дня: ${P.today.xp}/${P.goal} XP">
            <span class="ring" style="--p:${goalPct}"></span>${P.today.xp}/${P.goal}
          </span>
        </div>
      </header>
      <main class="content">${content}</main>
    </div>
  </div>`;
}

/* =========================================================
   АВТОРИЗАЦИЯ
   ========================================================= */
let authTab = 'register';
function renderAuth(errMsg = '') {
  const isReg = authTab === 'register';
  app.innerHTML = `
  <div class="auth">
    <div class="auth-hero">
      <div class="hero-emoji">🧳✈️🗽</div>
      <h1>TripTalk</h1>
      <p>Английский для путешествий: аэропорт, отель, улица, магазин и кафе. По 5 минут в день.</p>
    </div>
    <div class="auth-card">
      <div class="tabs">
        <button class="tab ${isReg ? 'active' : ''}" data-act="auth-tab" data-tab="register">Регистрация</button>
        <button class="tab ${!isReg ? 'active' : ''}" data-act="auth-tab" data-tab="login">Вход</button>
      </div>
      <form id="auth-form" novalidate>
        ${isReg ? '<label>Как тебя зовут?<input name="name" autocomplete="name" placeholder="Например, Аня" required></label>' : ''}
        <label>Email<input name="email" type="email" autocomplete="email" placeholder="you@example.com" required></label>
        <label>Пароль<input name="pass" type="password" autocomplete="${isReg ? 'new-password' : 'current-password'}" placeholder="Минимум 6 символов" required></label>
        <div class="form-error">${esc(errMsg)}</div>
        <button class="btn primary big" type="submit">${isReg ? 'Создать аккаунт' : 'Войти'}</button>
        ${!isReg && Backend.mode === 'firebase' ? '<button type="button" class="link" data-act="reset-pass">Забыли пароль?</button>' : ''}
      </form>
      <div class="divider"><span>или</span></div>
      <button class="btn ghost big" data-act="guest">Попробовать без регистрации</button>
      <p class="fine">${Backend.mode === 'firebase'
        ? '☁️ Прогресс сохраняется в облаке — заходи с любого устройства.'
        : '💾 Прогресс сохраняется в этом браузере на этом устройстве.'}</p>
    </div>
  </div>`;
}

async function enter(u) {
  user = u;
  let p = await Backend.loadProgress(u);
  if (!p && guestCarry) { p = guestCarry; toast('Прогресс перенесён в твой аккаунт ✨'); }
  guestCarry = null;
  P = normalizeProgress(p);
  save(true);
  if (location.hash.startsWith('#/lesson') || location.hash.startsWith('#/cards/')) location.hash = '#/';
  route();
}

document.addEventListener('submit', async e => {
  if (e.target.id !== 'auth-form') return;
  e.preventDefault();
  const f = new FormData(e.target);
  const btn = e.target.querySelector('[type=submit]');
  btn.disabled = true; btn.textContent = 'Секунду…';
  try {
    const u = authTab === 'register'
      ? await Backend.register(f.get('name') || '', f.get('email') || '', f.get('pass') || '')
      : await Backend.login(f.get('email') || '', f.get('pass') || '');
    await enter(u);
  } catch (err) {
    console.error(err);
    const vals = Object.fromEntries(f);
    renderAuth(err.userMessage || 'Что-то пошло не так. Попробуй ещё раз.');
    for (const [k, v] of Object.entries(vals)) { const i = document.querySelector(`#auth-form [name=${k}]`); if (i && k !== 'pass') i.value = v; }
  }
});

/* =========================================================
   ГЛАВНАЯ: ПУТЬ ОБУЧЕНИЯ
   ========================================================= */
function lessonDefs(u) {
  const h = Math.ceil(u.words.length / 2);
  return [
    { title: 'Новые слова', icon: '📘', kind: 'words', words: u.words.slice(0, h) },
    { title: 'Ещё слова', icon: '📗', kind: 'words', words: u.words.slice(h) },
    { title: 'Фразы', icon: '💬', kind: 'phrases' },
    { title: 'Повторение', icon: '🏆', kind: 'review' },
  ];
}

function renderLearn() {
  // «продолжить» — первый незавершённый урок
  let next = null;
  for (const u of UNITS) {
    const i = lessonDefs(u).findIndex((_, i) => !P.lessons[u.id + '-' + i]);
    if (i >= 0) { next = { u, i }; break; }
  }
  const hello = user.guest ? 'Привет!' : `Привет, ${esc(user.name)}!`;
  const due = dueCards().length;
  const offsets = [0, -60, 0, 60];

  shell('', `
    <section class="welcome">
      <div>
        <h1>${hello} 👋</h1>
        <p>${next ? `Следующий урок: <b>${next.u.icon} ${esc(next.u.title)} — ${lessonDefs(next.u)[next.i].title}</b>` : 'Все уроки пройдены! Повторяй карточки и грамматику 🎉'}</p>
      </div>
      <div class="welcome-actions">
        ${next ? `<a class="btn primary" href="#/lesson/${next.u.id}/${next.i}">Продолжить ▶</a>` : ''}
        ${due ? `<a class="btn secondary" href="#/cards/review">🃏 Повторить ${due} ${plural(due, 'слово', 'слова', 'слов')}</a>` : ''}
      </div>
    </section>
    ${UNITS.map((u, ui) => {
      const defs = lessonDefs(u);
      const pr = unitProgress(u);
      const firstOpen = defs.findIndex((_, i) => !P.lessons[u.id + '-' + i]);
      return `
      <section class="unit" style="--c:${u.color}">
        <div class="unit-head">
          <div>
            <small>Раздел ${ui + 1} · ${pr.done}/${pr.total}</small>
            <h2>${u.icon} ${esc(u.title)}</h2>
            <p>${esc(u.desc)}</p>
          </div>
          <a class="unit-book" href="#/phrases/${u.id}" title="Разговорник">📖<span>Разговорник</span></a>
        </div>
        ${u.grammar ? `<div class="unit-grammar"><span>📐 Грамматика к разделу:</span>${u.grammar.map(id => `<a href="#/grammar/${id}">${esc(grammarTitle(id))}</a>`).join('')}</div>` : ''}
        <div class="path">
          ${defs.map((d, i) => {
            const done = !!P.lessons[u.id + '-' + i];
            const open = done || i <= firstOpen || firstOpen === -1;
            const current = i === firstOpen;
            const cls = done ? 'done' : current ? 'current' : open ? 'open' : 'locked';
            return `
            <div class="node-wrap" style="transform:translateX(${offsets[i % 4]}px)">
              ${current ? '<div class="start-tip">СТАРТ</div>' : ''}
              <button class="node ${cls}" ${open ? `data-act="open-lesson" data-u="${u.id}" data-i="${i}"` : 'disabled'} title="${d.title}">
                <span>${done ? '✓' : open ? d.icon : '🔒'}</span>
              </button>
              <div class="node-label">${d.title}</div>
            </div>`;
          }).join('')}
        </div>
      </section>`;
    }).join('')}
  `);
}

/* =========================================================
   УРОК
   ========================================================= */
function optionsFrom(correct, pool, key, n = 4) {
  const seen = new Set([correct[key]]);
  const others = [];
  for (const x of shuffle(pool)) {
    if (others.length >= n - 1) break;
    if (!seen.has(x[key])) { seen.add(x[key]); others.push(x[key]); }
  }
  return shuffle([correct[key], ...others]);
}
const exEnRu = (w, pool) => ({ type: 'choice', title: 'Выбери правильный перевод', prompt: w.en, say: w.en, options: optionsFrom(w, pool, 'ru'), answer: w.ru, en: w.en, ru: w.ru });
const exRuEn = (w, pool) => ({ type: 'choice', title: 'Как сказать по-английски?', prompt: w.ru, g: w.g, options: optionsFrom(w, pool, 'en'), answer: w.en, en: w.en, ru: w.ru, enOptions: true });
const exListen = (w, pool) => ({ type: 'listen', title: 'Выбери то, что услышишь', say: w.en, options: optionsFrom(w, pool, 'en'), answer: w.en, en: w.en, ru: w.ru, enOptions: true });
const exType = w => ({ type: 'type', title: 'Напиши по-английски', prompt: w.ru, answers: w.en.split(' / '), answer: w.en, en: w.en, ru: w.ru });
const exMatch = ws => ({ type: 'match', title: 'Найди пары', pairs: ws.map(w => [w.en, w.ru]) });
function exBuild(p, pool) {
  const tokens = tokenize(p.en);
  // первое слово с маленькой буквы, чтобы заглавная не подсказывала порядок (кроме I / I'm / I'd)
  if (tokens.length && !/^I('|$)/.test(tokens[0])) tokens[0] = tokens[0][0].toLowerCase() + tokens[0].slice(1);
  const inAnswer = new Set(tokens.map(t => t.toLowerCase()));
  const extra = [];
  for (const x of shuffle(pool)) {
    if (x.en === p.en) continue;
    for (const t of tokenize(x.en).slice(1)) {
      const k = t.toLowerCase();
      if (!inAnswer.has(k) && !extra.some(e => e.toLowerCase() === k)) extra.push(t);
    }
    if (extra.length > 10) break;
  }
  const nExtra = tokens.length <= 4 ? 3 : tokens.length <= 7 ? 3 : 2;
  return { type: 'build', title: 'Переведи предложение', prompt: p.ru, g: p.g, answer: p.en, en: p.en, ru: p.ru, bank: shuffle([...tokens, ...extra.slice(0, nExtra)]) };
}

/* русское предложение с пунктирными подсказками: нажми на слово — увидишь перевод */
function glossHtml(g) {
  return g.map(([ru, en]) => en
    ? `<span class="hint" data-act="hint" tabindex="0">${esc(ru)}<span class="hint-pop">${esc(en)}</span></span>`
    : esc(ru)).join(' ');
}
const promptHtml = ex => (ex.g ? glossHtml(ex.g) : esc(ex.prompt));
const grammarTitle = id => GRAMMAR.find(t => t.id === id)?.title || '';
const seenPhrase = p => !!(P.seen && P.seen[p.en]);

function buildExercises(unit, def) {
  const wordPool = unit.words.length >= 4 ? unit.words : ALL_WORDS;
  let list = [];
  if (def.kind === 'words') {
    const ws = def.words;
    ws.forEach((w, i) => {
      if (!P.cards[cardKey(w)]) list.push({ type: 'intro', w, en: w.en });
      list.push(i % 2 ? exRuEn(w, wordPool) : exEnRu(w, wordPool));
    });
    const extra = shuffle([
      ...sample(ws, 2).map(exType),
      ...sample(ws, 2).map(w => exListen(w, wordPool)),
      exMatch(sample(ws, Math.min(5, ws.length))),
    ]);
    // разбавляем: дополнительные упражнения ставим после интро-блока
    list = list.concat(extra);
  } else if (def.kind === 'phrases') {
    // сначала объясняем фразу (разбор по словам), потом просим её собрать
    const ps = unit.phrases;
    ps.forEach(p => {
      if (!seenPhrase(p)) list.push({ type: 'pintro', p, en: p.en });
      list.push(exBuild(p, ALL_PHRASES));
    });
    list.push(...shuffle([...sample(ps, 2).map(p => exRuEn(p, ps)), ...sample(ps, 2).map(p => exListen(p, ps))]));
  } else {
    const ws = unit.words, ps = unit.phrases;
    list = shuffle([
      ...sample(ws, 4).map((w, i) => (i % 2 ? exRuEn(w, ws) : exEnRu(w, ws))),
      ...sample(ws, 2).map(exType),
      exMatch(sample(ws, 5)),
      ...sample(ps, 3).map(p => exBuild(p, ALL_PHRASES)),
      ...sample(ps, 2).map(p => exListen(p, ps)),
    ]);
  }
  return list;
}

function startLesson(uid, n) {
  const unit = unitById(uid);
  const def = unit && lessonDefs(unit)[n];
  if (!def) return go('');
  const queue = buildExercises(unit, def);
  L = { unit, n, def, queue, idx: 0, total: queue.length, done: 0, mistakes: 0, answers: 0, correct: 0, start: Date.now(), phase: 'answer' };
  drawExercise();
}

const curEx = () => L.queue[L.idx];

function drawExercise() {
  const ex = curEx();
  L.phase = 'answer'; L.sel = null;
  if (ex.type === 'build') { L.built = []; }
  if (ex.type === 'match') {
    L.m = { en: null, ru: null, done: new Set(), ruOrder: shuffle(ex.pairs.map((_, i) => i)), enOrder: shuffle(ex.pairs.map((_, i) => i)), wrong: null };
  }
  const pct = Math.round((L.done / L.total) * 100);
  app.innerHTML = `
  <div class="lesson">
    <header class="lesson-top">
      <button class="icon-btn" data-act="quit-lesson" aria-label="Выйти">✕</button>
      <div class="bar"><div style="width:${pct}%"></div></div>
      <span class="lesson-unit">${L.unit.icon}</span>
    </header>
    <main class="ex" id="ex">${exBody(ex)}</main>
    <footer class="lesson-foot" id="foot">${footer(ex)}</footer>
  </div>`;
  if (ex.type === 'intro' || ex.type === 'pintro' || ex.type === 'listen' || (ex.type === 'choice' && ex.say)) setTimeout(() => speak(ex.say || ex.en), 250);
  const ta = document.getElementById('typed');
  if (ta) { ta.focus(); ta.addEventListener('input', () => setCheckEnabled(ta.value.trim().length > 0)); }
}

function exBody(ex) {
  switch (ex.type) {
    case 'intro': {
      const w = ex.w;
      return `
      <h2 class="ex-title"><span class="new-badge">НОВОЕ СЛОВО</span></h2>
      <div class="intro-card">
        <div class="intro-en">${speakerBtn(w.en)}<span>${esc(w.en)}</span></div>
        <div class="intro-ru">${esc(w.ru)}</div>
        ${w.ex ? `<div class="intro-ex" data-act="say" data-say="${esc(w.ex)}">🔈 ${esc(w.ex)}</div>` : ''}
        <button class="slow-btn" data-act="say" data-say="${esc(w.en)}" data-slow="1">🐢 медленно</button>
      </div>`;
    }
    case 'pintro': {
      const p = ex.p;
      return `
      <h2 class="ex-title"><span class="new-badge">НОВАЯ ФРАЗА</span></h2>
      <div class="intro-card phrase-card">
        <div class="intro-en">${speakerBtn(p.en)}<span>${esc(p.en)}</span></div>
        <div class="intro-ru">${esc(p.ru)}</div>
        <button class="slow-btn" data-act="say" data-say="${esc(p.en)}" data-slow="1">🐢 медленно</button>
        <div class="breakdown">
          <div class="bd-title">Из чего состоит</div>
          ${p.g.filter(c => c[1]).map(([ru, en]) => `<div class="bd-row" data-act="say" data-say="${esc(en.replace(/\s*\(.*\)$/, '').replace(/…/g, ''))}"><b>${esc(en)}</b><span>${esc(ru.replace(/[,.?!]+$/, ''))}</span></div>`).join('')}
        </div>
        ${p.note ? `<div class="note">💡 ${esc(p.note)}</div>` : ''}
        ${p.gref ? `<div class="gref">📐 Подробнее в грамматике: «${esc(grammarTitle(p.gref))}»</div>` : ''}
      </div>`;
    }
    case 'choice':
      return `
      <h2 class="ex-title">${ex.title}</h2>
      ${ex.g ? '<p class="hint-help">Нажми на подчёркнутое слово, чтобы увидеть перевод</p>' : ''}
      <div class="prompt">${ex.say ? speakerBtn(ex.say) : '<span class="bubble-icon">💬</span>'}<span class="prompt-text">${promptHtml(ex)}</span></div>
      <div class="options">${ex.options.map((o, i) => `<button class="opt" data-act="opt" data-v="${esc(o)}"><span class="kbd">${i + 1}</span><span>${esc(o)}</span></button>`).join('')}</div>`;
    case 'listen':
      return `
      <h2 class="ex-title">${ex.title}</h2>
      <div class="listen-btns">
        <button class="big-speaker" data-act="say" data-say="${esc(ex.say)}">🔊</button>
        <button class="small-speaker" data-act="say" data-say="${esc(ex.say)}" data-slow="1">🐢</button>
      </div>
      <div class="options">${ex.options.map((o, i) => `<button class="opt" data-act="opt" data-v="${esc(o)}"><span class="kbd">${i + 1}</span><span>${esc(o)}</span></button>`).join('')}</div>`;
    case 'type':
      return `
      <h2 class="ex-title">${ex.title}</h2>
      <div class="prompt"><span class="bubble-icon">💬</span><span class="prompt-text">${esc(ex.prompt)}</span></div>
      <textarea id="typed" class="typed" rows="2" placeholder="Напиши по-английски…" autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false"></textarea>`;
    case 'build':
      return `
      <h2 class="ex-title">${ex.title}</h2>
      <p class="hint-help">Нажми на подчёркнутое слово, чтобы увидеть перевод</p>
      <div class="prompt"><span class="bubble-icon">💬</span><span class="prompt-text">${promptHtml(ex)}</span></div>
      <div id="build-area">${buildArea(ex)}</div>`;
    case 'match':
      return `
      <h2 class="ex-title">${ex.title}</h2>
      <div id="match-area">${matchArea(ex)}</div>`;
  }
}

function buildArea(ex) {
  return `
    <div class="built">${L.built.length ? L.built.map((bi, k) => `<button class="chip" data-act="unbuild" data-k="${k}">${esc(ex.bank[bi])}</button>`).join('') : '<span class="built-hint">Нажимай на слова ниже</span>'}</div>
    <div class="bank">${ex.bank.map((t, i) => `<button class="chip ${L.built.includes(i) ? 'used' : ''}" data-act="build" data-i="${i}" ${L.built.includes(i) ? 'disabled' : ''}>${esc(t)}</button>`).join('')}</div>`;
}

function matchArea(ex) {
  const m = L.m;
  const cell = (side, i) => {
    const txt = ex.pairs[i][side === 'en' ? 0 : 1];
    const cls = m.done.has(i) ? 'done' : m[side] === i ? 'sel' : m.wrong && m.wrong[side] === i ? 'wrong' : '';
    return `<button class="mcell ${cls}" data-act="match" data-side="${side}" data-i="${i}" ${m.done.has(i) ? 'disabled' : ''}>${esc(txt)}</button>`;
  };
  // одна сетка на 2 колонки: ячейки одного ряда всегда одной высоты
  return `<div class="match">${m.enOrder.map((ei, r) => cell('en', ei) + cell('ru', m.ruOrder[r])).join('')}</div>`;
}

function footer(ex, fb) {
  if (fb) {
    return `
      <div class="fb ${fb.ok ? 'ok' : 'bad'}">
        <div class="fb-icon">${fb.ok ? '✓' : '✕'}</div>
        <div class="fb-text">
          <b>${fb.title}</b>
          ${fb.detail ? `<div>${fb.detail}</div>` : ''}
        </div>
      </div>
      <button class="btn ${fb.ok ? 'primary' : 'danger'} big" data-act="next">Дальше</button>`;
  }
  if (ex.type === 'intro' || ex.type === 'pintro') return `<div class="fb-spacer"></div><button class="btn primary big" data-act="next">Понятно</button>`;
  if (ex.type === 'match') return `<div class="fb-spacer">Нажми на английское слово, затем на перевод</div><button class="btn primary big" disabled>Проверить</button>`;
  return `<button class="btn ghost" data-act="skip">Не знаю</button><button class="btn primary big" data-act="check" id="check-btn" disabled>Проверить</button>`;
}

function setCheckEnabled(on) { const b = document.getElementById('check-btn'); if (b) b.disabled = !on; }

const PRAISE = ['Отлично!', 'Супер!', 'Верно!', 'Так держать!', 'Великолепно!', 'Прекрасно!'];

function checkAnswer(skip = false) {
  if (L.phase !== 'answer') return;
  const ex = curEx();
  let ok = false, typo = false;
  if (!skip) {
    if (ex.type === 'choice' || ex.type === 'listen') ok = L.sel === ex.answer;
    else if (ex.type === 'type') {
      const v = norm(document.getElementById('typed').value);
      const strip = x => x.replace(/^(a|an|the|to) /, '');
      for (const a of ex.answers) {
        const n = norm(a);
        if (v === n || strip(v) === strip(n)) { ok = true; break; }
        if (n.length > 4 && lev(strip(v), strip(n)) <= 1) { ok = true; typo = true; }
      }
    } else if (ex.type === 'build') ok = norm(L.built.map(i => ex.bank[i]).join(' ')) === norm(ex.answer);
  }
  finishExercise(ok, typo);
}

function finishExercise(ok, typo = false) {
  const ex = curEx();
  L.phase = 'feedback';
  L.answers++;
  if (ok) { L.correct++; L.done++; } else { L.mistakes++; L.queue.push({ ...ex, retry: true }); }
  sound(ok);
  if (ok && ex.en && ex.type !== 'match') speak(ex.en);

  // подсветка вариантов
  document.querySelectorAll('.opt').forEach(b => {
    if (b.dataset.v === ex.answer) b.classList.add('right');
    else if (b.dataset.v === L.sel) b.classList.add('wrong');
    b.disabled = true;
  });
  document.querySelectorAll('.chip, .typed').forEach(b => (b.disabled = true));

  let fb;
  const enLine = ex.en ? `<span class="fb-en" data-act="say" data-say="${esc(ex.en)}">🔊 ${esc(ex.en)}</span>` : '';
  if (ex.type === 'match') fb = { ok: true, title: PRAISE[Math.floor(Math.random() * PRAISE.length)] };
  else if (ok && typo) fb = { ok: true, title: 'Почти идеально! Обрати внимание на написание:', detail: enLine };
  else if (ok) fb = { ok: true, title: PRAISE[Math.floor(Math.random() * PRAISE.length)], detail: ex.type === 'build' || ex.type === 'listen' ? `${enLine}<span class="fb-ru">${esc(ex.ru)}</span>` : '' };
  else fb = { ok: false, title: 'Правильный ответ:', detail: `${ex.type === 'choice' && !ex.enOptions ? `<span class="fb-en">${esc(ex.answer)}</span>` : enLine}${ex.ru && ex.type !== 'choice' ? `<span class="fb-ru">${esc(ex.ru)}</span>` : ''}` };

  document.getElementById('foot').innerHTML = footer(ex, fb);
  document.getElementById('foot').className = 'lesson-foot ' + (fb.ok ? 'ok' : 'bad');
  const bar = document.querySelector('.bar > div');
  if (bar) bar.style.width = Math.round((L.done / L.total) * 100) + '%';
}

function nextExercise() {
  const ex = curEx();
  if ((ex.type === 'intro' || ex.type === 'pintro') && L.phase === 'answer') { L.done++; }
  L.idx++;
  if (L.idx >= L.queue.length) return finishLesson();
  drawExercise();
}

function finishLesson() {
  const key = L.unit.id + '-' + L.n;
  const acc = L.answers ? Math.round((L.correct / L.answers) * 100) : 100;
  const xp = 10 + (L.mistakes === 0 ? 5 : 0) + (L.def.kind === 'review' ? 5 : 0);
  const prev = P.lessons[key];
  P.lessons[key] = { times: (prev?.times || 0) + 1, best: Math.max(prev?.best || 0, acc), date: todayStr() };
  const words = L.def.kind === 'words' ? L.def.words : L.def.kind === 'review' ? L.unit.words : [];
  touchCards(words);
  if (L.def.kind !== 'words') {
    P.seen = P.seen || {};
    L.queue.forEach(e => { if (e.type === 'pintro' || e.type === 'build') P.seen[e.en] = 1; });
  }
  addXp(xp);
  save(true);
  const sec = Math.round((Date.now() - L.start) / 1000);
  const time = `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
  const unitDone = unitProgress(L.unit).done === lessonDefs(L.unit).length && !prev && L.n === lessonDefs(L.unit).length - 1;
  const { unit, n } = L;
  L = null;
  app.innerHTML = `
  <div class="result">
    <div class="confetti">${Array.from({ length: 24 }, (_, i) => `<i style="--x:${Math.random() * 100}%;--d:${(Math.random() * 1.5 + 0.5).toFixed(2)}s;--c:${['#58cc02', '#1cb0f6', '#ffc800', '#ff4b4b', '#ce82ff'][i % 5]}"></i>`).join('')}</div>
    <div class="result-emoji">${unitDone ? '🏆' : acc === 100 ? '🌟' : '🎉'}</div>
    <h1>${unitDone ? `Раздел «${esc(unit.title)}» пройден!` : 'Урок пройден!'}</h1>
    <div class="result-stats">
      <div class="rstat xp"><span>Опыт</span><b>+${xp} XP</b></div>
      <div class="rstat acc"><span>Точность</span><b>${acc}%</b></div>
      <div class="rstat time"><span>Время</span><b>${time}</b></div>
    </div>
    ${words.length ? `<p class="result-note">🃏 ${words.length} ${plural(words.length, 'слово добавлено', 'слова добавлены', 'слов добавлено')} в карточки для повторения</p>` : ''}
    <div class="result-actions">
      <a class="btn ghost big" href="#/lesson/${unit.id}/${n}">Ещё раз</a>
      <a class="btn primary big" href="#/">Продолжить</a>
    </div>
  </div>`;
}

/* =========================================================
   КАРТОЧКИ (интервальное повторение)
   ========================================================= */
const INTERVALS = [0, 1, 2, 4, 7, 15, 30, 60];

function renderCards() {
  const due = dueCards().length;
  const dir = P.settings.cardDir;
  shell('cards', `
    <h1 class="page-title">🃏 Карточки</h1>
    <p class="page-sub">Слова возвращаются тогда, когда ты начинаешь их забывать. Чем лучше знаешь — тем реже повтор.</p>
    <div class="review-banner ${due ? '' : 'calm'}">
      <div>
        <b>${due ? `${due} ${plural(due, 'карточка ждёт', 'карточки ждут', 'карточек ждут')} повторения` : 'На сегодня всё повторено ✨'}</b>
        <span>Выучено слов: ${knownWords()} из ${ALL_WORDS.length}</span>
      </div>
      ${due ? '<a class="btn primary" href="#/cards/review">Повторить</a>' : ''}
    </div>
    <div class="dir-toggle">
      <span>Сторона карточки:</span>
      <button class="seg ${dir === 'en' ? 'active' : ''}" data-act="card-dir" data-dir="en">EN → RU</button>
      <button class="seg ${dir === 'ru' ? 'active' : ''}" data-act="card-dir" data-dir="ru">RU → EN</button>
    </div>
    <div class="grid">
      ${UNITS.map(u => {
        const known = u.words.filter(w => (P.cards[cardKey(w)]?.box || 0) >= 2).length;
        const pct = Math.round((known / u.words.length) * 100);
        return `
        <a class="deck" href="#/cards/${u.id}" style="--c:${u.color}">
          <div class="deck-icon">${u.icon}</div>
          <div class="deck-body">
            <b>${esc(u.title)}</b>
            <span>${known} из ${u.words.length} ${plural(u.words.length, 'слова', 'слов', 'слов')}</span>
            <div class="mini-bar"><div style="width:${pct}%"></div></div>
          </div>
        </a>`;
      }).join('')}
    </div>
  `);
}

function startCards(id) {
  const t = todayStr();
  let items;
  if (id === 'review') {
    items = shuffle(dueCards()).slice(0, 30);
    if (!items.length) { toast('Нет карточек для повторения 🎉'); return go('cards'); }
  } else {
    const u = unitById(id);
    if (!u) return go('cards');
    const due = [], fresh = [], rest = [];
    u.words.forEach(w => { const c = P.cards[cardKey(w)]; (!c ? fresh : c.due <= t ? due : rest).push(w); });
    items = [...shuffle(due), ...shuffle(fresh), ...shuffle(rest)].slice(0, 20);
  }
  C = { id, queue: items, idx: 0, flipped: false, total: items.length, seen: 0, known: 0 };
  drawCard();
}

function drawCard() {
  const w = C.queue[C.idx];
  const dir = P.settings.cardDir;
  const front = dir === 'en'
    ? `<div class="cf-main">${esc(w.en)}</div>${speakerBtn(w.en, 'card-speaker')}`
    : `<div class="cf-main ru">${esc(w.ru)}</div>`;
  const back = `
    <div class="cf-main">${esc(w.en)}</div>
    <div class="cf-ru">${esc(w.ru)}</div>
    ${w.ex ? `<div class="cf-ex" data-act="say" data-say="${esc(w.ex)}">🔈 ${esc(w.ex)}</div>` : ''}
    ${speakerBtn(w.en, 'card-speaker')}`;
  const unit = unitById(w.unit);
  app.innerHTML = `
  <div class="lesson cards-session">
    <header class="lesson-top">
      <button class="icon-btn" data-act="quit-cards" aria-label="Выйти">✕</button>
      <div class="bar blue"><div style="width:${Math.round((C.seen / C.total) * 100)}%"></div></div>
      <span class="lesson-unit">${unit.icon}</span>
    </header>
    <main class="card-stage">
      <div class="flip ${C.flipped ? 'flipped' : ''}" data-act="flip">
        <div class="face front">${front}<div class="cf-hint">нажми, чтобы перевернуть</div></div>
        <div class="face back">${back}</div>
      </div>
    </main>
    <footer class="lesson-foot card-foot" id="card-foot">${cardFooter()}</footer>
  </div>`;
  if (dir === 'en' && !C.flipped) setTimeout(() => speak(w.en), 200);
}

function cardFooter() {
  return C.flipped ? `
    <button class="grade g0" data-act="grade" data-g="0"><b>😕</b>Не помню</button>
    <button class="grade g1" data-act="grade" data-g="1"><b>🤔</b>Сложно</button>
    <button class="grade g2" data-act="grade" data-g="2"><b>😎</b>Знаю</button>`
    : '<button class="btn primary big wide" data-act="flip">Показать ответ</button>';
}

function gradeCard(g) {
  const w = C.queue[C.idx];
  const t = todayStr();
  const k = cardKey(w);
  const c = P.cards[k] || { box: 0, due: t };
  if (g === 0) { c.box = 0; c.due = t; C.queue.push(w); }
  else if (g === 1) { c.box = Math.max(1, c.box); c.due = addDays(t, 1); C.seen++; }
  else { c.box = Math.min(c.box + 1, INTERVALS.length - 1); c.due = addDays(t, INTERVALS[c.box]); C.seen++; C.known++; addXp(1); }
  P.cards[k] = c;
  save();
  C.idx++; C.flipped = false;
  if (C.idx >= C.queue.length) return finishCards();
  drawCard();
}

function finishCards() {
  save(true);
  const { total, known } = C;
  C = null;
  app.innerHTML = `
  <div class="result">
    <div class="result-emoji">🃏</div>
    <h1>Повторение завершено!</h1>
    <div class="result-stats">
      <div class="rstat acc"><span>Карточек</span><b>${total}</b></div>
      <div class="rstat xp"><span>Опыт</span><b>+${known} XP</b></div>
    </div>
    <p class="result-note">Следующий повтор каждого слова уже запланирован — загляни завтра.</p>
    <div class="result-actions">
      <a class="btn primary big" href="#/cards">Готово</a>
    </div>
  </div>`;
}

/* =========================================================
   ГРАММАТИКА
   ========================================================= */
function renderGrammar() {
  const done = GRAMMAR.filter(g => P.grammar[g.id]).length;
  let n = 0;
  shell('grammar', `
    <h1 class="page-title">📐 Грамматика</h1>
    <p class="page-sub">Короткий курс от нуля: кто такие he / she / it, когда ставить is и the, как строить предложения и вопросы и как не бояться времён. Иди по порядку — каждая тема опирается на предыдущую.</p>
    <div class="gprogress"><div class="mini-bar"><div style="width:${Math.round((done / GRAMMAR.length) * 100)}%"></div></div><span>Пройдено ${done} из ${GRAMMAR.length}</span></div>
    ${GRAMMAR_GROUPS.map(gr => `
      <h3 class="ggroup">${esc(gr.title)}<small>${esc(gr.sub)}</small></h3>
      <div class="grid">
        ${GRAMMAR.filter(g => g.group === gr.id).map(g => {
          n++;
          const r = P.grammar[g.id];
          return `
          <a class="gcard" href="#/grammar/${g.id}">
            <div class="gicon">${g.icon}</div>
            <div class="gbody">
              <small>Тема ${n}</small>
              <b>${esc(g.title)}</b>
              <span>${esc(g.sub)}</span>
            </div>
            ${r ? `<div class="gscore ${r.best === g.quiz.length ? 'full' : ''}">${r.best}/${g.quiz.length}</div>` : ''}
          </a>`;
        }).join('')}
      </div>`).join('')}
  `);
}

function grammarBank(q) {
  const ans = Array.isArray(q.a) ? q.a[0] : q.a;
  const tokens = tokenize(ans);
  if (tokens.length && !/^I('|$)/.test(tokens[0])) tokens[0] = tokens[0][0].toLowerCase() + tokens[0].slice(1);
  return shuffle([...tokens, ...(q.x || [])]);
}

/* английские примеры в <i>…</i> делаем кликабельными: нажала — услышала */
function sayable(html) {
  return html.replace(/<i>([\s\S]*?)<\/i>/g, (m, inner) => {
    const t = inner.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    if (!/[a-z]/i.test(t) || /[а-яё]/i.test(t)) return m;
    return `<i class="sayable" data-act="say" data-say="${esc(t)}">${inner}</i>`;
  });
}

const TOPICS = {
  grammar: { list: () => GRAMMAR, store: 'grammar', nav: 'grammar', back: '← Все темы грамматики' },
  sounds: { list: () => PRONUNCIATION, store: 'sounds', nav: 'sounds', back: '← Все темы произношения' },
};

function wordsHtml(words) {
  return `<div class="pwords">${words.map(([en, ru, note]) => `
    <div class="pword">
      <button class="pw-main" data-act="say" data-say="${esc(en)}"><b>${esc(en)}</b><span>${esc(ru)}</span>${note ? `<small>${esc(note)}</small>` : ''}</button>
      <div class="pw-btns">
        <button class="mini" data-act="say" data-say="${esc(en)}" data-slow="1" aria-label="Медленно">🐢</button>
        ${SR ? `<button class="mini mic" data-act="mic" data-say="${esc(en)}" aria-label="Записать">🎤</button><button class="mini mic-stop" data-act="mic-stop" aria-label="Стоп" disabled>⏹</button>` : ''}
      </div>
      <div class="pw-res"></div>
    </div>`).join('')}</div>`;
}

function renderTopic(kind, id) {
  const T = TOPICS[kind];
  const list = T.list();
  const g = list.find(x => x.id === id);
  if (!g) return go(kind);
  G = { g, kind, store: T.store, answers: {}, built: {}, banks: {}, saved: false };
  g.quiz.forEach((q, i) => { if (q.b) { G.banks[i] = grammarBank(q); G.built[i] = []; } });
  const i = list.indexOf(g);
  const prev = list[i - 1], next = list[i + 1];
  const group = kind === 'grammar' ? GRAMMAR_GROUPS.find(x => x.id === g.group)?.title : 'Произношение';
  shell(T.nav, `
    <a class="back" href="#/${kind}">${T.back}</a>
    <article class="grammar">
      <small class="gcrumb">${esc(group || '')} · Тема ${i + 1} из ${list.length}</small>
      <h1>${g.icon} ${esc(g.title)}</h1>
      <p class="page-sub">${esc(g.sub)}</p>
      <div class="gtext">${sayable(g.body)}</div>
      ${g.words ? `
      <h3>Потренируйся <small class="h-note">нажми — послушай${SR ? ', 🎤 — скажи сам' : ''}</small></h3>
      ${wordsHtml(g.words)}` : ''}
      ${g.mistakes ? `
      <h3>Типичные ошибки</h3>
      <div class="mistakes">
        ${g.mistakes.map(([bad, good, why]) => `
          <div class="mistake">
            <div class="m-bad">❌ <s>${esc(bad)}</s></div>
            <div class="m-good" data-act="say" data-say="${esc(good.split(' / ')[0])}">✅ ${esc(good)}</div>
            <div class="m-why">${esc(why)}</div>
          </div>`).join('')}
      </div>` : ''}
      ${g.examples ? `
      <h3>Примеры <small class="h-note">нажми, чтобы послушать</small></h3>
      <div class="examples">
        ${g.examples.map(([en, ru]) => `<div class="example" data-act="say" data-say="${esc(en)}"><span class="ex-en">🔊 ${esc(en)}</span><span class="ex-ru">${esc(ru)}</span></div>`).join('')}
      </div>` : ''}
      <h3>Проверь себя</h3>
      <div id="quiz">${quizHtml()}</div>
      <div class="topic-nav">
        ${prev ? `<a class="btn ghost" href="#/${kind}/${prev.id}">← ${prev.icon}</a>` : '<span></span>'}
        ${next ? `<a class="next-topic" href="#/${kind}/${next.id}">Дальше: ${next.icon} ${esc(next.title)} →</a>` : `<a class="next-topic" href="#/${kind}">🎉 Все темы пройдены — к списку</a>`}
      </div>
    </article>
  `);
}

function renderSounds() {
  const done = PRONUNCIATION.filter(t => P.sounds[t.id]).length;
  shell('sounds', `
    <h1 class="page-title">🗣️ Произношение и чтение</h1>
    <p class="page-sub">Почему could — «куд», а не «коулд»? Как читать незнакомые слова и как говорить, чтобы тебя понимали. Каждое слово можно послушать${SR ? ' и сказать в микрофон для проверки' : ''}.</p>
    <div class="gprogress"><div class="mini-bar"><div style="width:${Math.round((done / PRONUNCIATION.length) * 100)}%"></div></div><span>Пройдено ${done} из ${PRONUNCIATION.length}</span></div>
    <div class="grid" style="margin-top:16px">
      ${PRONUNCIATION.map((t, i) => {
        const r = P.sounds[t.id];
        return `
        <a class="gcard" href="#/sounds/${t.id}">
          <div class="gicon">${t.icon}</div>
          <div class="gbody"><small>Тема ${i + 1}</small><b>${esc(t.title)}</b><span>${esc(t.sub)}</span></div>
          ${r ? `<div class="gscore ${r.best === t.quiz.length ? 'full' : ''}">${r.best}/${t.quiz.length}</div>` : ''}
        </a>`;
      }).join('')}
    </div>
  `);
}

/* ---------- 🎤 распознавание речи (Chrome, Safari, Edge) ---------- */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition || null;
let recState = null;

/* слова, которые звучат одинаково: распознаватель не знает, какое из них ты имела в виду */
const HOMOPHONES = {
  know: ['no'], write: ['right', 'rite'], hour: ['our'], night: ['knight'], knight: ['night'],
  would: ['wood'], aisle: ['isle', 'ill', 'i\'ll'], suite: ['sweet'], queue: ['q', 'cue'],
  beach: ['beech'], two: ['to', 'too'], seat: [], see: ['sea'], meet: ['meat'], tea: ['t'],
  plane: ['plain'], weight: ['wait'], buy: ['by', 'bye'], hi: ['high'], high: ['hi'],
};

function micJudge(target, alts) {
  const clean = x => norm(x).replace(/'/g, '');
  const t = clean(target);
  const ok = [t, ...(HOMOPHONES[t] || []).map(clean)];
  return alts.some(a => {
    const n = clean(a);
    if (ok.includes(n)) return true;
    // фраза: все слова должны прозвучать (в длинных фразах прощаем одно пропущенное служебное слово)
    if (t.includes(' ')) {
      const heard = n.split(' ');
      const missing = t.split(' ').filter(w => !heard.includes(w)).length;
      return missing === 0 || (t.split(' ').length >= 5 && missing === 1);
    }
    // одно слово: строго — cold вместо could считается ошибкой
    return n.split(' ').includes(t) || (t.length >= 8 && lev(n, t) <= 1);
  });
}

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

function micMsg(st, cls, text) {
  if (!st.res) return;
  st.res.className = 'pw-res show ' + cls;
  st.res.textContent = text;
}

function micUi(card, recording) {
  if (!card) return;
  const start = card.querySelector('[data-act=mic]'), stop = card.querySelector('[data-act=mic-stop]');
  card.classList.toggle('recording', recording);
  if (start) start.disabled = recording;
  if (stop) stop.disabled = !recording;
}

/* завершаем запись один раз: оцениваем результат и обязательно отпускаем микрофон */
function micFinish(st) {
  if (st.done) return;
  st.done = true;
  clearTimeout(st.timer); clearTimeout(st.stopTimer); clearInterval(st.tick);
  try { st.rec.onend = st.rec.onresult = st.rec.onerror = null; st.rec.abort(); } catch {}
  if (recState === st) recState = null;
  micUi(st.card, false);
  if (st.silent) return;

  const alts = st.finals.length ? st.finals : st.interim.trim() ? [st.interim.trim()] : [];
  if (alts.length) {
    const ok = micJudge(st.target, alts.slice(0, 1)); // только главный вариант распознавателя
    sound(ok);
    return micMsg(st, ok ? 'ok' : 'bad', ok
      ? `✅ Отлично! Услышала: «${alts[0].trim()}»`
      : `🤔 Услышала: «${alts[0].trim()}». Послушай 🔊 и попробуй ещё раз`);
  }
  if (st.error === 'not-allowed')
    return micMsg(st, 'bad', isIOS
      ? '🎤 Нет доступа к микрофону. Настройки → Safari → Микрофон → Разрешить'
      : '🎤 Нет доступа к микрофону. Разреши его в настройках браузера для этого сайта');
  if (st.error === 'service-not-allowed')
    return micMsg(st, 'bad', isIOS
      ? '🎤 Включи диктовку: Настройки → Основные → Клавиатура → Диктовка'
      : '🎤 Распознавание речи недоступно в этом браузере');
  if (st.error === 'network') return micMsg(st, 'bad', '📶 Для распознавания нужен интернет — проверь подключение');
  if (st.error === 'audio-capture') return micMsg(st, 'bad', '🎤 Микрофон занят другим приложением');
  if (!st.listening) return micMsg(st, '', '👍 Микрофон готов. Нажми 🎤 ещё раз и скажи слово');
  micMsg(st, 'bad', st.heardSound
    ? '🤔 Не разобрала слово — скажи чуть громче и чётче'
    : '🤫 Ничего не слышно. Нажми 🎤, скажи слово, потом ⏹');
}

function micStop() {
  const st = recState;
  if (!st) return;
  micMsg(st, '', '⏳ Проверяю…');
  try { st.rec.stop(); } catch {}
  // Safari иногда «зависает» и не завершает запись — тогда завершаем сами
  st.stopTimer = setTimeout(() => micFinish(st), 1200);
}

function practiceSay(btn) {
  if (recState) { recState.silent = true; const old = recState; if (old.res) old.res.className = 'pw-res'; micFinish(old); }
  speechSynthesis?.cancel?.();

  let rec;
  try { rec = new SR(); } catch { return toast('Распознавание речи не поддерживается в этом браузере'); }
  rec.lang = 'en-US';
  rec.continuous = false;
  rec.interimResults = true;   // промежуточный текст сохраняем, чтобы не потерять сказанное
  rec.maxAlternatives = 3;

  const card = btn.closest('.pword');
  const st = { rec, card, target: btn.dataset.say, res: card?.querySelector('.pw-res'),
    finals: [], interim: '', error: null, heardSound: false, listening: false, startedAt: Date.now() };
  recState = st;
  micUi(card, true);
  micMsg(st, '', '⏳ Включаю микрофон…');

  rec.onstart = () => {
    st.listening = true; st.startedAt = Date.now();
    const show = () => {
      const sec = Math.floor((Date.now() - st.startedAt) / 1000);
      const live = (st.finals[0] || st.interim).trim();
      micMsg(st, 'live', live ? `● Запись 0:0${sec} · слышу: «${live}»` : `● Запись 0:0${sec} · говори, потом ⏹`);
    };
    show(); st.tick = setInterval(show, 500);
  };
  rec.onsoundstart = () => { st.heardSound = true; };
  rec.onspeechstart = () => { st.heardSound = true; };
  rec.onresult = e => {
    st.heardSound = true;
    st.interim = '';
    for (let i = 0; i < e.results.length; i++) {
      const r = e.results[i];
      if (r.isFinal) st.finals = [...r].map(a => a.transcript);
      else st.interim += r[0].transcript;
    }
  };
  rec.onerror = e => { if (e.error !== 'aborted') st.error = e.error; };
  rec.onend = () => micFinish(st);
  // страховка: больше 8 секунд не слушаем
  st.timer = setTimeout(() => micStop(), 8000);
  try { rec.start(); } catch { st.error = 'start'; micFinish(st); }
}

function quizItemHtml(q, qi) {
  const st = G.answers[qi];
  const answered = st !== undefined;
  const cls = answered ? (st.ok ? 'q-ok' : 'q-bad') : '';
  if (q.b) {
    const bank = G.banks[qi], built = G.built[qi];
    const right = Array.isArray(q.a) ? q.a[0] : q.a;
    return `
    <div class="q ${cls}" id="q${qi}">
      <div class="q-text">${qi + 1}. Собери по-английски: <span class="q-ru">«${esc(q.b)}»</span></div>
      <div class="built small">${built.length ? built.map((bi, k) => `<button class="chip" data-act="qunbuild" data-q="${qi}" data-k="${k}" ${answered ? 'disabled' : ''}>${esc(bank[bi])}</button>`).join('') : '<span class="built-hint">Нажимай на слова ниже</span>'}</div>
      ${answered ? '' : `
      <div class="bank left">${bank.map((t, i) => `<button class="chip ${built.includes(i) ? 'used' : ''}" data-act="qbuild" data-q="${qi}" data-i="${i}" ${built.includes(i) ? 'disabled' : ''}>${esc(t)}</button>`).join('')}</div>
      <button class="btn primary small q-check" data-act="qcheck" data-q="${qi}" ${built.length ? '' : 'disabled'}>Проверить</button>`}
      ${answered ? `<div class="q-exp">${st.ok ? '✅' : `💡 Правильно: <b data-act="say" data-say="${esc(right)}">${esc(right)}</b><br>`} ${esc(q.e)}</div>` : ''}
    </div>`;
  }
  return `
    <div class="q ${cls}" id="q${qi}">
      <div class="q-text">${q.say ? `<button class="mini q-say" data-act="say" data-say="${esc(q.say)}" aria-label="Послушать">🔊</button>` : ''}${qi + 1}. ${esc(q.q)}</div>
      <div class="q-opts">
        ${q.o.map((o, oi) => `<button class="qopt ${answered && oi === q.a ? 'right' : ''} ${answered && oi === st.val && !st.ok ? 'wrong' : ''}" data-act="quiz" data-q="${qi}" data-o="${oi}" ${answered ? 'disabled' : ''}>${esc(o)}</button>`).join('')}
      </div>
      ${answered ? `<div class="q-exp">${st.ok ? '✅' : '💡'} ${esc(q.e)}</div>` : ''}
    </div>`;
}

function quizHtml() {
  const { g, answers } = G;
  const doneCount = Object.keys(answers).length;
  const score = Object.values(answers).filter(a => a.ok).length;
  return g.quiz.map(quizItemHtml).join('') + (doneCount === g.quiz.length ? `
    <div class="quiz-result">
      <b>${score === g.quiz.length ? '🌟 Идеально!' : score >= g.quiz.length * 0.6 ? '👍 Хорошо!' : '📚 Перечитай тему и попробуй снова'}</b>
      <span>Результат: ${score} из ${g.quiz.length} · +${score * 2} XP</span>
      <button class="btn ghost" data-act="quiz-retry">Пройти ещё раз</button>
    </div>` : '');
}

function redrawQuizItem(qi) {
  const el = document.getElementById('q' + qi);
  if (el) el.outerHTML = quizItemHtml(G.g.quiz[qi], qi);
}

function setQuizAnswer(qi, st) {
  if (G.answers[qi] !== undefined) return;
  G.answers[qi] = st;
  sound(st.ok);
  if (Object.keys(G.answers).length === G.g.quiz.length) {
    document.getElementById('quiz').innerHTML = quizHtml();
    if (!G.saved) {
      G.saved = true;
      const score = Object.values(G.answers).filter(a => a.ok).length;
      const store = P[G.store || 'grammar'] = P[G.store || 'grammar'] || {};
      const prev = store[G.g.id];
      store[G.g.id] = { best: Math.max(prev?.best || 0, score), date: todayStr() };
      if (score) addXp(score * 2);
      save(true);
    }
    document.querySelector('.quiz-result')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else redrawQuizItem(qi);
}

function answerQuiz(qi, oi) {
  setQuizAnswer(qi, { ok: oi === G.g.quiz[qi].a, val: oi });
}

function checkQuizBuild(qi) {
  const q = G.g.quiz[qi];
  const val = G.built[qi].map(i => G.banks[qi][i]).join(' ');
  const answers = Array.isArray(q.a) ? q.a : [q.a];
  const ok = answers.some(a => norm(a) === norm(val));
  if (ok) speak(val);
  setQuizAnswer(qi, { ok, val });
}

/* =========================================================
   РАЗГОВОРНИК
   ========================================================= */
function renderPhrases() {
  shell('phrases', `
    <h1 class="page-title">📖 Разговорник</h1>
    <p class="page-sub">Все фразы, слова и живые диалоги по ситуациям. Нажми на фразу, чтобы услышать произношение.</p>
    <div class="grid">
      ${UNITS.map(u => `
        <a class="deck" href="#/phrases/${u.id}" style="--c:${u.color}">
          <div class="deck-icon">${u.icon}</div>
          <div class="deck-body"><b>${esc(u.title)}</b><span>${u.phrases.length} фраз · ${u.words.length} слов · диалог</span></div>
        </a>`).join('')}
    </div>
  `);
}

function renderPhraseUnit(id) {
  const u = unitById(id);
  if (!u) return go('phrases');
  shell('phrases', `
    <a class="back" href="#/phrases">← Разговорник</a>
    <h1 class="page-title">${u.icon} ${esc(u.title)}</h1>
    <p class="page-sub">${esc(u.desc)}</p>

    <h3 class="section-h">💬 Фразы</h3>
    <div class="phrase-list">
      ${u.phrases.map(p => `
        <div class="phrase-wrap">
          <div class="phrase">
            <div class="ph-text" data-act="say" data-say="${esc(p.en)}"><b>${esc(p.en)}</b><span>${esc(p.ru)}</span></div>
            <button class="mini" data-act="say" data-say="${esc(p.en)}">🔊</button>
            <button class="mini" data-act="say" data-say="${esc(p.en)}" data-slow="1">🐢</button>
          </div>
          <details class="ph-details">
            <summary>Разбор по словам</summary>
            <div class="breakdown">
              ${p.g.filter(c => c[1]).map(([ru, en]) => `<div class="bd-row"><b>${esc(en)}</b><span>${esc(ru.replace(/[,.?!]+$/, ''))}</span></div>`).join('')}
            </div>
            ${p.note ? `<div class="note">💡 ${esc(p.note)}</div>` : ''}
            ${p.gref ? `<a class="gref" href="#/grammar/${p.gref}">📐 Тема: ${esc(grammarTitle(p.gref))} →</a>` : ''}
          </details>
        </div>`).join('')}
    </div>

    <h3 class="section-h">🎭 Диалог <button class="btn secondary small" data-act="play-dialog" data-u="${u.id}">▶ Проиграть</button></h3>
    <div class="dialog" id="dialog">
      ${u.dialog.map((d, i) => `
        <div class="line ${d.who === 'A' ? 'left' : 'right'}" data-i="${i}" data-act="say" data-say="${esc(d.en)}">
          <div class="avatar">${d.who === 'A' ? '🧑‍💼' : '🧳'}</div>
          <div class="speech"><b>${esc(d.en)}</b><span>${esc(d.ru)}</span></div>
        </div>`).join('')}
    </div>

    <h3 class="section-h">🔤 Слова</h3>
    <div class="word-table">
      ${u.words.map(w => `
        <div class="wrow" data-act="say" data-say="${esc(w.en)}">
          <b>${esc(w.en)}</b><span>${esc(w.ru)}</span>
          ${w.ex ? `<i>${esc(w.ex)}</i>` : ''}
        </div>`).join('')}
    </div>
    <div class="cta-row">
      <a class="btn primary" href="#/lesson/${u.id}/0">Учить в уроках</a>
      <a class="btn secondary" href="#/cards/${u.id}">Карточки этой темы</a>
    </div>
  `);
}

function playDialog(uid) {
  const u = unitById(uid);
  let i = 0;
  const lines = document.querySelectorAll('#dialog .line');
  const step = () => {
    lines.forEach(l => l.classList.remove('playing'));
    if (i >= u.dialog.length || !document.getElementById('dialog')) return;
    lines[i].classList.add('playing');
    lines[i].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    const d = u.dialog[i++];
    speak(d.en, { pitch: d.who === 'A' ? 0.9 : 1.2, onend: () => setTimeout(step, 450) });
  };
  step();
}

/* =========================================================
   ПРОФИЛЬ
   ========================================================= */
function achievements() {
  const lessonsDone = Object.keys(P.lessons).length;
  const unitsDone = UNITS.filter(u => unitProgress(u).done === lessonDefs(u).length).length;
  const gramFull = Object.values(P.grammar).length;
  return [
    ['🐣', 'Первый шаг', 'Пройди первый урок', lessonsDone >= 1],
    ['🔥', 'Неделя подряд', 'Занимайся 7 дней подряд', (P.best || 0) >= 7],
    ['⭐', 'Сотня', 'Набери 100 XP', P.xp >= 100],
    ['🧠', 'Словарный запас', 'Выучи 50 слов', knownWords() >= 50],
    ['✈️', 'Готов к вылету', 'Пройди раздел «Аэропорт»', unitProgress(unitById('airport')).done === 4],
    ['📐', 'Грамотей', 'Пройди 5 тем грамматики', gramFull >= 5],
    ['🌍', 'Путешественник', 'Пройди все разделы', unitsDone === UNITS.length],
    ['🏅', 'Тысячник', 'Набери 1000 XP', P.xp >= 1000],
  ];
}

function renderProfile() {
  const lvl = level(P.xp);
  const lo = levelFloor(lvl), hi = levelFloor(lvl + 1);
  const pct = Math.round(((P.xp - lo) / (hi - lo)) * 100);
  const lessonsDone = Object.keys(P.lessons).length;
  const totalLessons = UNITS.length * 4;
  const ach = achievements();
  shell('profile', `
    <section class="profile-head">
      <div class="avatar-big">${user.guest ? '🧳' : esc(user.name[0]?.toUpperCase() || '🙂')}</div>
      <div>
        <h1>${esc(user.name)}</h1>
        <p>${user.guest ? 'Гостевой режим' : esc(user.email)} · ${Backend.mode === 'firebase' && !user.guest ? '☁️ синхронизация включена' : '💾 сохраняется в браузере'}</p>
        <div class="lvl"><b>Уровень ${lvl}</b><div class="mini-bar"><div style="width:${pct}%"></div></div><span>${P.xp - lo}/${hi - lo} XP</span></div>
      </div>
    </section>
    ${user.guest ? `<div class="guest-banner"><div><b>Сохрани свой прогресс</b><span>Создай аккаунт — всё, что ты уже прошла, перенесётся.</span></div><button class="btn primary" data-act="guest-register">Создать аккаунт</button></div>` : ''}
    <div class="stat-grid">
      <div class="sbox"><b>🔥 ${currentStreak()}</b><span>дней подряд · рекорд ${P.best || 0}</span></div>
      <div class="sbox"><b>⭐ ${P.xp}</b><span>всего XP</span></div>
      <div class="sbox"><b>📚 ${lessonsDone}/${totalLessons}</b><span>уроков</span></div>
      <div class="sbox"><b>🧠 ${knownWords()}</b><span>слов выучено</span></div>
      <div class="sbox"><b>📐 ${Object.keys(P.grammar).length}/${GRAMMAR.length}</b><span>тем грамматики</span></div>
      <div class="sbox"><b>🗣️ ${Object.keys(P.sounds || {}).length}/${PRONUNCIATION.length}</b><span>тем произношения</span></div>
    </div>

    <h3 class="section-h">Достижения</h3>
    <div class="ach-grid">
      ${ach.map(([i, t, d, ok]) => `<div class="ach ${ok ? 'got' : ''}"><div class="ach-i">${i}</div><b>${t}</b><span>${d}</span></div>`).join('')}
    </div>

    <h3 class="section-h">Настройки</h3>
    <div class="settings">
      <div class="set-row">
        <div><b>Цель дня</b><span>Сколько XP набирать ежедневно</span></div>
        <div class="segs">${[10, 20, 30, 50].map(g => `<button class="seg ${P.goal === g ? 'active' : ''}" data-act="goal" data-g="${g}">${g}</button>`).join('')}</div>
      </div>
      <div class="set-row">
        <div><b>Звуки</b><span>Сигналы правильного и неправильного ответа</span></div>
        <button class="switch ${P.settings.sound ? 'on' : ''}" data-act="toggle-sound" aria-label="Звуки"><i></i></button>
      </div>
      <div class="set-row">
        <div><b>Резервная копия</b><span>Скачать прогресс в файл или загрузить из файла</span></div>
        <div class="segs"><button class="seg" data-act="export">⬇ Скачать</button><label class="seg">⬆ Загрузить<input type="file" accept="application/json" id="import-file" hidden></label></div>
      </div>
    </div>
    <div class="profile-actions">
      <button class="btn ghost" data-act="logout">${user.guest ? 'Выйти из гостевого режима' : 'Выйти из аккаунта'}</button>
      <button class="btn link-danger" data-act="reset">Сбросить прогресс</button>
    </div>
    <p class="app-version">TripTalk · версия ${APP_VERSION}</p>
  `);
}

/* =========================================================
   ОБРАБОТЧИКИ
   ========================================================= */
const actions = {
  'auth-tab': el => { authTab = el.dataset.tab; renderAuth(); },
  guest: () => enter(Backend.guest()),
  'reset-pass': async () => {
    const email = document.querySelector('#auth-form [name=email]').value;
    if (!email) return renderAuth('Сначала введи email, на него придёт ссылка.');
    try { await Backend.resetPassword(email); toast('Письмо для сброса пароля отправлено 📬'); } catch (e) { renderAuth(e.userMessage); }
  },
  say: el => speak(el.dataset.say, { slow: !!el.dataset.slow }),
  mic: el => practiceSay(el),
  'mic-stop': () => micStop(),
  hint: el => {
    const wasOpen = el.classList.contains('open');
    closeHints();
    if (wasOpen) return;
    el.classList.add('open');
    // не даём подсказке вылезти за край экрана
    const pop = el.querySelector('.hint-pop');
    pop.style.setProperty('--shift', '0px');
    const r = pop.getBoundingClientRect();
    const W = document.documentElement.clientWidth;
    let shift = 0;
    if (r.right > W - 8) shift = W - 8 - r.right;
    if (r.left + shift < 8) shift = 8 - r.left;
    pop.style.setProperty('--shift', shift + 'px');
  },
  'open-lesson': el => go(`lesson/${el.dataset.u}/${el.dataset.i}`),

  // урок
  'quit-lesson': () => { if (L.done === 0 || confirm('Выйти из урока? Прогресс этого урока не сохранится.')) { L = null; go(''); } },
  opt: el => {
    if (L.phase !== 'answer') return;
    L.sel = el.dataset.v;
    document.querySelectorAll('.opt').forEach(b => b.classList.toggle('sel', b === el));
    if (curEx().enOptions) speak(L.sel);
    setCheckEnabled(true);
  },
  check: () => checkAnswer(),
  skip: () => checkAnswer(true),
  next: () => nextExercise(),
  build: el => {
    if (L.phase !== 'answer') return;
    const i = +el.dataset.i; L.built.push(i);
    speak(curEx().bank[i]);
    document.getElementById('build-area').innerHTML = buildArea(curEx());
    setCheckEnabled(L.built.length > 0);
  },
  unbuild: el => {
    if (L.phase !== 'answer') return;
    L.built.splice(+el.dataset.k, 1);
    document.getElementById('build-area').innerHTML = buildArea(curEx());
    setCheckEnabled(L.built.length > 0);
  },
  match: el => {
    const ex = curEx(), m = L.m, side = el.dataset.side, i = +el.dataset.i;
    if (L.phase !== 'answer' || m.done.has(i)) return;
    m.wrong = null;
    m[side] = m[side] === i ? null : i;
    if (side === 'en' && m.en !== null) speak(ex.pairs[i][0]);
    if (m.en !== null && m.ru !== null) {
      if (m.en === m.ru) { m.done.add(m.en); sound(true); }
      else { m.wrong = { en: m.en, ru: m.ru }; L.mistakes++; sound(false); setTimeout(() => { if (L && L.m === m) { m.wrong = null; const a = document.getElementById('match-area'); if (a) a.innerHTML = matchArea(ex); } }, 600); }
      m.en = m.ru = null;
    }
    document.getElementById('match-area').innerHTML = matchArea(ex);
    if (m.done.size === ex.pairs.length) setTimeout(() => finishExercise(true), 300);
  },

  // карточки
  'card-dir': el => { P.settings.cardDir = el.dataset.dir; save(); renderCards(); },
  'quit-cards': () => { save(true); C = null; go('cards'); },
  flip: () => {
    if (!C) return;
    C.flipped = !C.flipped;
    document.querySelector('.flip')?.classList.toggle('flipped', C.flipped);
    document.getElementById('card-foot').innerHTML = cardFooter();
    if (C.flipped && P.settings.cardDir === 'ru') speak(C.queue[C.idx].en);
  },
  grade: el => gradeCard(+el.dataset.g),

  // грамматика
  quiz: el => answerQuiz(+el.dataset.q, +el.dataset.o),
  qbuild: el => { const qi = +el.dataset.q; G.built[qi].push(+el.dataset.i); speak(G.banks[qi][+el.dataset.i]); redrawQuizItem(qi); },
  qunbuild: el => { const qi = +el.dataset.q; G.built[qi].splice(+el.dataset.k, 1); redrawQuizItem(qi); },
  qcheck: el => checkQuizBuild(+el.dataset.q),
  'quiz-retry': () => {
    G.answers = {}; G.saved = false;
    G.g.quiz.forEach((q, i) => { if (q.b) { G.banks[i] = grammarBank(q); G.built[i] = []; } });
    document.getElementById('quiz').innerHTML = quizHtml();
  },

  // разговорник
  'play-dialog': el => playDialog(el.dataset.u),

  // профиль
  goal: el => { P.goal = +el.dataset.g; save(); renderProfile(); },
  'toggle-sound': () => { P.settings.sound = !P.settings.sound; save(); renderProfile(); },
  export: () => {
    const blob = new Blob([JSON.stringify(P, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = `triptalk-progress-${todayStr()}.json`; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  },
  logout: async () => {
    save(true);
    await Backend.logout();
    user = null; P = null; authTab = 'login';
    location.hash = '#/'; renderAuth();
  },
  'guest-register': async () => {
    save(true);
    guestCarry = P;
    await Backend.logout();
    user = null; P = null; authTab = 'register';
    renderAuth();
  },
  reset: () => {
    if (!confirm('Точно сбросить весь прогресс? Это нельзя отменить.')) return;
    P = normalizeProgress(null); save(true); toast('Прогресс сброшен'); renderProfile();
  },
};

function closeHints() { document.querySelectorAll('.hint.open').forEach(h => h.classList.remove('open')); }

app.addEventListener('click', e => {
  const el = e.target.closest('[data-act]');
  if (!el || el.dataset.act !== 'hint') closeHints();
  if (!el || el.disabled) return;
  // клик по кнопке озвучки внутри карточки не должен её переворачивать
  if (el.dataset.act === 'flip' && e.target.closest('.speaker, .cf-ex')) return;
  const fn = actions[el.dataset.act];
  if (fn) { e.stopPropagation(); fn(el, e); }
});

document.addEventListener('change', e => {
  if (e.target.id !== 'import-file') return;
  const file = e.target.files[0];
  if (!file) return;
  file.text().then(t => {
    const data = JSON.parse(t);
    if (typeof data !== 'object' || data.xp === undefined) throw new Error();
    P = normalizeProgress(data); save(true); toast('Прогресс загружен ✅'); renderProfile();
  }).catch(() => toast('Не получилось прочитать файл 😕'));
});

document.addEventListener('keydown', e => {
  if (L) {
    const ex = curEx();
    if (e.key === 'Enter') {
      e.preventDefault();
      if (L.phase === 'feedback' || ex.type === 'intro') return nextExercise();
      const b = document.getElementById('check-btn');
      if (b && !b.disabled) checkAnswer();
      return;
    }
    if (L.phase === 'answer' && /^[1-9]$/.test(e.key) && document.activeElement?.tagName !== 'TEXTAREA') {
      const opt = document.querySelectorAll('.opt')[+e.key - 1];
      if (opt) actions.opt(opt);
    }
  } else if (C) {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); actions.flip(); }
    else if (C.flipped && ['1', '2', '3'].includes(e.key)) gradeCard(+e.key - 1);
  }
});

/* =========================================================
   СТАРТ
   ========================================================= */
(async function init() {
  app.innerHTML = '<div class="splash"><div class="splash-emoji">🧳</div><div class="spinner"></div></div>';
  try {
    const u = await Backend.init();
    if (u) {
      user = u;
      P = normalizeProgress(await Backend.loadProgress(u));
    }
  } catch (e) { console.error(e); }
  route();
})();
