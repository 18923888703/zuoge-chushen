(function () {
  /* 三个就够了：买菜 / 下厨 / 档案。
     原来第二个「搜索」页取消了 —— 想搜什么直接在首页底部对话框里说。 */
  var TABS = [
    { name: 'home', hash: '#/home', icon: 'home', label: '下厨' },
    { name: 'shopping', hash: '#/shopping', icon: 'basket', label: '买菜' },
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

  /* 悬浮的 AI 搭子：始终悬在底部操作区之上，绝不压住输入框和发送键。
     首页底部有输入区（.hdock），就按它的实际高度往上让位。 */
  function placeFab() {
    var fab = window.D.$('#ai-fab');
    if (!fab || fab.hidden) return;
    var scr = window.D.$('#screen');
    if (!scr) return;
    var bottom = 70;                       /* 没输入区时：tab 栏上方 */
    var src = scr.getBoundingClientRect();
    var dock = window.D.$('.hdock');
    if (dock) {
      bottom = Math.max(bottom, Math.round(src.bottom - dock.getBoundingClientRect().top) + 12);
    }
    var mt = window.D.$('#mini-timer');
    if (mt && !mt.hidden) {                /* 有计时条时再往上让一层 */
      bottom = Math.max(bottom, Math.round(src.bottom - mt.getBoundingClientRect().top) + 10);
    }
    fab.style.bottom = bottom + 'px';
  }

  function updateChrome(name) {
    var showBar = TAB_NAMES.indexOf(name) >= 0;
    window.D.$('#tabbar').hidden = !showBar;
    window.D.$('#ai-fab').hidden = !showBar;
    renderTabbar();
    renderMini();
    placeFab();
    requestAnimationFrame(placeFab);       /* 等这一帧排完版再量一次 */
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

  window.D.$('#ai-fab').innerHTML =
    window.D.icon('sparkle', 'fab-sp') + '<span class="fab-t">AI 搭子</span>';
  window.D.$('#ai-fab').onclick = function () {
    window.Assistant.open();
  };
  window.addEventListener('resize', placeFab);

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
  window.Router.register('me', window.MeView);

  /* 从系统分享进来：抖音/小红书「分享 → 我是厨神」会把 title/text/url 拼在 query 上。
     拿到就交给首页对话去拆解，并立刻把参数擦掉，免得刷新又问一遍。 */
  function takeIncomingShare() {
    try {
      if (!location.search) return '';
      var qs = new URLSearchParams(location.search);
      var payload = String(qs.get('text') || qs.get('url') || qs.get('title') || '').trim();
      if (history.replaceState) {
        history.replaceState(null, '', location.pathname + (location.hash || ''));
      }
      return payload;
    } catch (e) { return ''; }
  }

  clock();
  setInterval(clock, 20000);
  window.Router.start();

  /* 系统分享：等首页挂载好再把文案递过去 */
  (function () {
    var incoming = takeIncomingShare();
    if (!incoming) return;
    setTimeout(function () {
      if (!window.HomeView || !window.HomeView.actions) return;
      window.Router.go('#/home');
      window.D.toast('收到分享，这就帮你拆成步骤', 1800);
      window.HomeView.actions.ask({ q: incoming });
    }, 320);
  })();
})();
