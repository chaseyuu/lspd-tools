/*
 * LSPD Tools preferences, stored only in browser cookies (nothing is sent anywhere).
 * All tools live on chaseyuu.github.io, so path=/ cookies are shared between them.
 *
 *   lspd_theme      "dark" | "light"
 *   lspd_personnel  JSON: { name, rank, badge, division }
 */
(function () {
  var YEAR = 60 * 60 * 24 * 365;

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

  function getTheme() {
    return getCookie('lspd_theme') === 'light' ? 'light' : 'dark';
  }
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'light' : 'dark');
  }

  function getPersonnel() {
    try {
      var raw = getCookie('lspd_personnel');
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  window.LSPDPrefs = {
    getTheme: getTheme,
    setTheme: function (theme) {
      setCookie('lspd_theme', theme === 'light' ? 'light' : 'dark');
      applyTheme(theme);
    },
    getPersonnel: getPersonnel,
    setPersonnel: function (data) {
      setCookie('lspd_personnel', JSON.stringify(data));
    },
    clearPersonnel: function () {
      deleteCookie('lspd_personnel');
    },
  };

  // Apply the saved theme before the page paints.
  applyTheme(getTheme());
})();
