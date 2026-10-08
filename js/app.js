(function () {
  var TABS = [
    { name: 'home', hash: '#/home', icon: 'home', label: '展厅' },
    { name: 'discover', hash: '#/discover', icon: 'search', label: '检索' },
    { name: 'shopping', hash: '#/shopping', icon: 'basket', label: '采集' },
    { name: 'me', hash: '#/me', icon: 'me', label: '档案' }
  ];

  var TAB_NAMES = TABS.map(function (t) { return t.name; });

  function renderTabbar() {
    var el = window.D.$('#tabbar');
    var n = window.Store.pendingCount();
    el.innerHTML = TABS.map(function (t) {
      var on = window.Router.name === t.name ? ' on' : '';
      var badge = (t.name === 'shopping' && n) ? '<span class="badge">' + n + '</span>' : '';
      return '<button class="tab' + on + '" data-tab="' + t.name + '">' +
        window.D.icon(t.icon) + '<span>' + t.label + '</span>' + badge + '</button>';
    }).join('');
  }

  function renderMini() {
    var el = window.D.$('#mini-timer');
    var t = window.Timers.next();
    if (!t || window.Router.name === 'cook') { el.hidden = true; return; }
    el.hidden = false;
    var rem = window.Timers.remaining(t.id);
    var p = t.seconds ? rem / t.seconds : 0;
    el.className = 'mini-timer' + (rem <= 10 ? ' urgent' : '');
    el.innerHTML =
      '<span class="ring">' + window.D.ring(p, 26, 4) + '</span>' +
      '<span class="lb">' + window.D.esc(t.label) +
      '<span>' + window.D.esc((t.meta && t.meta.dish) || '做菜中') + '</span></span>' +
      '<span class="tv">' + window.D.fmtTime(rem) + '</span>';
    el.onclick = function () {
      if (t.meta && t.meta.recipeId) window.Router.go('#/cook/' + t.meta.recipeId);
    };
  }

  function updateChrome(name) {
    var showBar = TAB_NAMES.indexOf(name) >= 0;
    window.D.$('#tabbar').hidden = !showBar;
    window.D.$('#ai-fab').hidden = !showBar;
    renderTabbar();
    renderMini();
  }

  function sheet(opts) {
    var ov = window.D.$('#overlay');
    var head = opts.title
      ? '<div class="sheet-head"><span class="bar"></span><h3>' +
        window.D.esc(opts.title) + '</h3>' +
        (opts.close === false ? '' : '<button data-sheet-close style="width:28px;height:28px;display:flex;align-items:center;justify-content:center">' + window.D.icon('close', 'ic-sm') + '</button>') +
        '</div>'
      : '';
    ov.innerHTML = '<div class="mask" data-mask></div>' +
      '<div class="sheet"' + (opts.height ? ' style="height:' + opts.height + '"' : '') + '>' +
      head + '<div class="sheet-body">' + (opts.body || '') + '</div>' +
      (opts.footer || '') + '</div>';
    var m = ov.querySelector('[data-mask]');
    if (m) m.onclick = closeSheet;
    var c = ov.querySelector('[data-sheet-close]');
    if (c) c.onclick = closeSheet;
    if (opts.onMount) opts.onMount(ov.querySelector('.sheet-body'), ov);
  }

  function closeSheet() {
    window.D.$('#overlay').innerHTML = '';
  }

  function clock() {
    var d = new Date();
    var h = d.getHours(), m = d.getMinutes();
    window.D.$('#sb-time').textContent = h + ':' + (m < 10 ? '0' : '') + m;
  }

  var App = {
    updateChrome: updateChrome,
    renderTabbar: renderTabbar,
    renderMini: renderMini,
    sheet: sheet,
    closeSheet: closeSheet,
    refresh: function () { renderTabbar(); renderMini(); }
  };
  window.App = App;

  window.D.$('#ai-fab').innerHTML = window.D.icon('chef', 'ic-lg');
  window.D.$('#ai-fab').onclick = function () {
    window.Assistant.open();
  };

  window.D.$('#tabbar').addEventListener('click', function (e) {
    var t = e.target.closest('[data-tab]');
    if (!t) return;
    if (window.Nav) window.Nav.buzz(8);   /* Android 触感反馈 */
    window.Router.go('#/' + t.getAttribute('data-tab'));
  });

  window.Store.on(function () { renderTabbar(); });
  window.Timers.subscribe(function () { renderMini(); });

  window.Router.register('home', window.HomeView);
  window.Router.register('recipe', window.RecipeView);
  window.Router.register('shopping', window.ShoppingView);
  window.Router.register('cook', window.CookView);
  window.Router.register('discover', window.DiscoverView);
  window.Router.register('me', window.MeView);

  clock();
  setInterval(clock, 20000);
  window.Router.start();
})();
