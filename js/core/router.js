(function () {
  var TABSET = { home: 1, discover: 1, shopping: 1, me: 1 };

  var Router = {
    routes: {},
    name: 'home',
    params: [],
    _stack: [],

    /* 还有上一页可以返回吗（右滑手势用） */
    canBack: function () { return this._stack.length > 1; },

    register: function (name, view) { this.routes[name] = view; },

    parse: function (hash) {
      var parts = String(hash || '').replace(/^#\/?/, '').split('/').filter(Boolean);
      return { name: parts[0] || 'home', params: parts.slice(1) };
    },

    go: function (hash) {
      if (location.hash === hash) { this.handle(); }
      else { location.hash = hash; }
    },

    render: function (dir) {
      var v = this.routes[this.name] || this.routes.home;
      var root = window.D.$(v.container || '#view');

      /* 转场：先给旧页拍快照，再换内容，最后让它滑走 */
      if (window.Nav) {
        window.Nav.snapshot();
        window.Nav.reset(root);
      }

      if (v.container === '#cook-layer') window.D.$('#view').innerHTML = '';
      else window.D.$('#cook-layer').innerHTML = '';
      root.innerHTML = (v.render ? v.render(this.params) : '') || '';
      root.scrollTop = 0;
      if (v.mount) v.mount(root, this.params);
      window.App.updateChrome(this.name);

      if (window.Nav && (dir === 'fwd' || dir === 'back')) window.Nav.play(root, dir);
    },

    handle: function () {
      var p = this.parse(location.hash);
      if (!this.routes[p.name]) p = { name: 'home', params: [] };

      /* 判断方向：回退 = 命中栈里上一页；tab 之间互切 = 无动画 */
      var h = location.hash || '#/home';
      var st = this._stack;
      var dir = 'none';
      if (!st.length) { st.push(h); }                                  /* 首屏 */
      else if (st.length >= 2 && st[st.length - 2] === h) { st.pop(); dir = 'back'; }
      else if (st[st.length - 1] === h) { /* 原地刷新，不动 */ }
      else if (TABSET[p.name]) {                                       /* tab 是根：回 tab 等于收起详情页 */
        var fromDetail = !TABSET[this.name];
        st.length = 0; st.push(h);
        dir = fromDetail ? 'back' : 'none';
      }
      else { st.push(h); dir = 'fwd'; }

      this.name = p.name;
      this.params = p.params;
      this.render(dir);
    },

    refresh: function () { this.render('none'); },

    /* 幂等：重复调用会导致事件被派发两次 */
    start: function () {
      if (this._started) return;
      this._started = true;
      var self = this;
      var root = window.D.$('#screen');

      function dispatch(type, e) {
        var t = e.target.closest(type === 'click' ? '[data-act]' : '[data-change]');
        if (!t) return;
        var v = self.routes[self.name];
        if (!v) return;
        var key = t.getAttribute(type === 'click' ? 'data-act' : 'data-change');
        var fn = v.actions && v.actions[key];
        if (fn) fn(t.dataset, t, e);
      }

      root.addEventListener('click', function (e) { dispatch('click', e); });
      root.addEventListener('change', function (e) { dispatch('change', e); });
      root.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          var t = e.target.closest('[data-enter]');
          if (!t) return;
          var v = self.routes[self.name];
          var fn = v && v.actions && v.actions[t.getAttribute('data-enter')];
          if (fn) fn(t.dataset, t, e);
        }
      });

      window.addEventListener('hashchange', function () { self.handle(); });

      if (!location.hash || location.hash === '#') location.hash = '#/home';
      else this.handle();
    }
  };

  window.Router = Router;
})();
