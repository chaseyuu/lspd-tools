/*
 * Header character switcher: shows the active character's name; clicking it opens a
 * small list to switch between the saved characters (max 2) or to edit them.
 * Usage: <div class="char-switcher" data-settings-url="settings/"></div>
 */
(function () {
  var CHECK = '<svg class="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
  var CHEVRON = '<svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  var PEN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.38 3.62a1 1 0 0 1 3 3L7.37 18.64a2 2 0 0 1-.86.5l-2.87.84a.5.5 0 0 1-.62-.62l.84-2.87a2 2 0 0 1 .5-.86z"/></svg>';

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function label(c, i) {
    return (c && c.name) || (i === 0 ? 'Ana Karakter' : 'Alt Karakter');
  }

  function render(root) {
    var settingsUrl = root.getAttribute('data-settings-url') || 'settings/';
    var data = LSPDPrefs.getCharacters();
    var filled = data.list.map(function (c, i) { return { c: c, i: i }; })
      .filter(function (x) { return LSPDPrefs.isFilled(x.c); });

    if (!filled.length) {
      root.innerHTML = '<a class="char-trigger" href="' + settingsUrl + '">Karakter Tanımla</a>';
      return;
    }

    var active = data.list[data.active];
    var items = filled.map(function (x) {
      var sub = [x.c.rank, x.c.badge && ('#' + x.c.badge), x.c.division].filter(Boolean).join(' · ');
      return '<li role="option" tabindex="-1" data-index="' + x.i + '" aria-selected="' + (x.i === data.active) + '">' +
        CHECK + '<span class="char-item"><span class="char-name">' + esc(label(x.c, x.i)) + '</span>' +
        (sub ? '<span class="char-sub">' + esc(sub) + '</span>' : '') + '</span></li>';
    }).join('');

    root.innerHTML =
      '<button type="button" class="char-trigger" aria-haspopup="listbox" aria-expanded="false">' +
        '<span>' + esc(label(active, data.active)) + '</span>' + CHEVRON +
      '</button>' +
      '<div class="char-menu" role="presentation">' +
        '<ul role="listbox" aria-label="Karakter seç">' + items + '</ul>' +
        '<a class="char-edit" href="' + settingsUrl + '">' + PEN + 'Karakterleri Düzenle</a>' +
      '</div>';

    var trigger = root.querySelector('.char-trigger');
    function close() { root.classList.remove('open'); trigger.setAttribute('aria-expanded', 'false'); }
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !root.classList.contains('open');
      root.classList.toggle('open', open);
      trigger.setAttribute('aria-expanded', String(open));
    });
    root.querySelectorAll('li[data-index]').forEach(function (li) {
      li.addEventListener('click', function () {
        LSPDPrefs.setActive(Number(li.getAttribute('data-index')));
        close();
      });
    });
    document.addEventListener('click', function (e) { if (!root.contains(e.target)) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  function renderAll() {
    document.querySelectorAll('.char-switcher').forEach(render);
  }
  document.addEventListener('lspd:characters-change', renderAll);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderAll);
  else renderAll();
})();
