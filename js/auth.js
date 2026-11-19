/* =========================================================
   Аккаунты и хранение прогресса.
   Два режима:
   • local    — аккаунты в localStorage этого браузера (по умолчанию)
   • firebase — Firebase Auth + Firestore (если задан FIREBASE_CONFIG)
   ========================================================= */
const Backend = (() => {
  const FB_VER = '10.12.2';
  const LS = {
    users: 'tt_users',
    session: 'tt_session',
    progress: uid => 'tt_progress_' + uid,
  };
  let mode = 'local';
  let auth = null;
  let db = null;

  const lsGet = (k, d = null) => {
    try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; }
  };
  const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
  const lsDel = k => { try { localStorage.removeItem(k); } catch {} };

  function loadScript(src) {
    return new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = src; s.onload = res; s.onerror = () => rej(new Error('Не удалось загрузить ' + src));
      document.head.appendChild(s);
    });
  }

  async function sha256(text) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  const GUEST = { uid: 'guest', name: 'Гость', email: '', guest: true };

  function err(msg) { const e = new Error(msg); e.userMessage = msg; return e; }

  function fbError(e) {
    const map = {
      'auth/email-already-in-use': 'Этот email уже зарегистрирован. Попробуй войти.',
      'auth/invalid-email': 'Похоже, email введён с ошибкой.',
      'auth/weak-password': 'Пароль слишком простой — минимум 6 символов.',
      'auth/invalid-credential': 'Неверный email или пароль.',
      'auth/invalid-login-credentials': 'Неверный email или пароль.',
      'auth/wrong-password': 'Неверный email или пароль.',
      'auth/user-not-found': 'Пользователь с таким email не найден.',
      'auth/too-many-requests': 'Слишком много попыток. Подожди немного.',
      'auth/network-request-failed': 'Нет соединения с интернетом.',
    };
    return err(map[e.code] || ('Ошибка: ' + (e.message || e.code)));
  }

  function validate(email, pass) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw err('Похоже, email введён с ошибкой.');
    if (!pass || pass.length < 6) throw err('Пароль должен быть не короче 6 символов.');
  }

  return {
    get mode() { return mode; },

    /** Подготовка; возвращает пользователя из сохранённой сессии или null */
    async init() {
      const cfg = window.FIREBASE_CONFIG;
      if (cfg && cfg.apiKey) {
        try {
          const base = `https://www.gstatic.com/firebasejs/${FB_VER}/`;
          await loadScript(base + 'firebase-app-compat.js');
          await Promise.all([
            loadScript(base + 'firebase-auth-compat.js'),
            loadScript(base + 'firebase-firestore-compat.js'),
          ]);
          firebase.initializeApp(cfg);
          auth = firebase.auth();
          db = firebase.firestore();
          mode = 'firebase';
          const fu = await new Promise(res => { const off = auth.onAuthStateChanged(u => { off(); res(u); }); });
          if (fu) return { uid: fu.uid, name: fu.displayName || fu.email.split('@')[0], email: fu.email };
        } catch (e) {
          console.warn('Firebase недоступен, работаем локально', e);
          mode = 'local';
        }
      }
      const sess = lsGet(LS.session);
      if (sess === 'guest') return GUEST;
      if (mode === 'local' && sess) {
        const users = lsGet(LS.users, {});
        const u = Object.values(users).find(x => x.uid === sess);
        if (u) return { uid: u.uid, name: u.name, email: u.email };
      }
      return null;
    },

    async register(name, email, pass) {
      email = email.trim().toLowerCase(); name = name.trim();
      if (!name) throw err('Напиши, как тебя зовут.');
      validate(email, pass);
      if (mode === 'firebase') {
        try {
          const cred = await auth.createUserWithEmailAndPassword(email, pass);
          await cred.user.updateProfile({ displayName: name });
          lsDel(LS.session);
          return { uid: cred.user.uid, name, email };
        } catch (e) { throw fbError(e); }
      }
      const users = lsGet(LS.users, {});
      if (users[email]) throw err('Этот email уже зарегистрирован. Попробуй войти.');
      const salt = crypto.getRandomValues(new Uint32Array(4)).join('-');
      const uid = 'u_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
      users[email] = { uid, name, email, salt, hash: await sha256(salt + pass) };
      lsSet(LS.users, users);
      lsSet(LS.session, uid);
      return { uid, name, email };
    },

    async login(email, pass) {
      email = email.trim().toLowerCase();
      if (!email || !pass) throw err('Введи email и пароль.');
      if (mode === 'firebase') {
        try {
          const cred = await auth.signInWithEmailAndPassword(email, pass);
          lsDel(LS.session);
          const u = cred.user;
          return { uid: u.uid, name: u.displayName || email.split('@')[0], email };
        } catch (e) { throw fbError(e); }
      }
      const u = lsGet(LS.users, {})[email];
      if (!u || (await sha256(u.salt + pass)) !== u.hash) throw err('Неверный email или пароль.');
      lsSet(LS.session, u.uid);
      return { uid: u.uid, name: u.name, email: u.email };
    },

    guest() { lsSet(LS.session, 'guest'); return GUEST; },

    async logout() {
      lsDel(LS.session);
      if (mode === 'firebase' && auth.currentUser) await auth.signOut();
    },

    async resetPassword(email) {
      if (mode !== 'firebase') throw err('Восстановление пароля доступно только при подключённом облаке (Firebase).');
      try { await auth.sendPasswordResetEmail(email.trim()); } catch (e) { throw fbError(e); }
    },

    async loadProgress(user) {
      const local = lsGet(LS.progress(user.uid));
      if (mode === 'firebase' && !user.guest) {
        try {
          const snap = await db.collection('progress').doc(user.uid).get();
          if (snap.exists) {
            const remote = JSON.parse(snap.data().json || 'null');
            // берём более свежую версию
            if (remote && (!local || (remote.updated || 0) >= (local.updated || 0))) return remote;
          }
        } catch (e) { console.warn('Не удалось загрузить прогресс из облака', e); }
      }
      return local;
    },

    async saveProgress(user, p) {
      p.updated = Date.now();
      lsSet(LS.progress(user.uid), p);
      if (mode === 'firebase' && !user.guest) {
        try {
          await db.collection('progress').doc(user.uid).set({ json: JSON.stringify(p), updated: p.updated });
        } catch (e) { console.warn('Не удалось сохранить в облако', e); }
      }
    },

    clearLocalProgress(uid) { lsDel(LS.progress(uid)); },
  };
})();
