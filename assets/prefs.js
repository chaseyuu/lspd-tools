/*
 * LSPD Tools preferences, stored only in browser cookies (nothing is sent anywhere).
 * All tools live on chaseyuu.github.io, so path=/ cookies are shared between them.
 *
 *   lspd_theme       "dark" | "light"
 *   lspd_characters  JSON: { active: 0 | 1, list: [{ name, rank, badge, division }, ...] }  (max 2)
 */
(function () {
  var YEAR = 60 * 60 * 24 * 365;
  var MAX_CHARACTERS = 2;

  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
  }
  function setCookie(name, value) {
    document.cookie = name + '=' + encodeURIComponent(value) + '; path=/; max-age=' + YEAR + '; SameSite=Lax';
  }
  function deleteCookie(name) {
    document.cookie = name + '=; path=/; max-age=0; SameSite=Lax';
  }
  function parse(raw) {
    try { return raw ? JSON.parse(raw) : null; } catch (e) { return null; }
  }

  function getTheme() {
    return getCookie('lspd_theme') === 'light' ? 'light' : 'dark';
  }
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'light' : 'dark');
  }

  function clean(c) {
    c = c || {};
    return {
      name: String(c.name || '').trim(),
      rank: String(c.rank || ''),
      badge: String(c.badge || '').trim(),
      division: String(c.division || ''),
    };
  }
  function isFilled(c) {
    return !!(c && (c.name || c.rank || c.badge || c.division));
  }

  function getCharacters() {
    var data = parse(getCookie('lspd_characters'));
    if (!data) {
      // Older single-character cookie: move it into the first slot.
      var legacy = parse(getCookie('lspd_personnel'));
      data = { active: 0, list: legacy ? [clean(legacy)] : [] };
    }
    var list = (Array.isArray(data.list) ? data.list : []).slice(0, MAX_CHARACTERS).map(clean);
    var active = data.active === 1 && isFilled(list[1]) ? 1 : 0;
    return { active: active, list: list };
  }
  function saveCharacters(data) {
    var list = (data.list || []).slice(0, MAX_CHARACTERS).map(clean);
    while (list.length && !isFilled(list[list.length - 1])) list.pop();
    var active = data.active === 1 && isFilled(list[1]) ? 1 : 0;
    if (list.length) setCookie('lspd_characters', JSON.stringify({ active: active, list: list }));
    else deleteCookie('lspd_characters');
    deleteCookie('lspd_personnel');
    document.dispatchEvent(new CustomEvent('lspd:characters-change'));
  }

  window.LSPDPrefs = {
    MAX_CHARACTERS: MAX_CHARACTERS,
    getTheme: getTheme,
    setTheme: function (theme) {
      setCookie('lspd_theme', theme === 'light' ? 'light' : 'dark');
      applyTheme(theme);
    },
    getCharacters: getCharacters,
    saveCharacters: saveCharacters,
    isFilled: isFilled,
    /** The character whose data the tools should use. */
    getActiveCharacter: function () {
      var d = getCharacters();
      return d.list[d.active] || null;
    },
    setActive: function (index) {
      var d = getCharacters();
      d.active = index;
      saveCharacters(d);
    },
  };

  // Apply the saved theme before the page paints.
  applyTheme(getTheme());

  // Pages are designed at 1920px wide; on wider screens (e.g. 2560x1440) scale everything
  // proportionally so the layout looks the same on every monitor.
  (function () {
    var BASE = 1920;
    function fit() {
      var z = Math.max(1, window.innerWidth / BASE);
      document.documentElement.style.zoom = z > 1 ? String(z) : '';
      document.documentElement.style.setProperty('--page-zoom', String(z));
    }
    fit();
    window.addEventListener('resize', fit);
  })();
})();
