(function () {
  var Router = {
    routes: {},
    name: 'home',
    params: [],

    register: function (name, view) { this.routes[name] = view; },

    parse: function (hash) {
      var parts = String(hash || '').replace(/^#\/?/, '').split('/').filter(Boolean);
      return { name: parts[0] || 'home', params: parts.slice(1) };
    },

    go: function (hash) {
      if (location.hash === hash) { this.handle(); }
      else { location.hash = hash; }
    },

    render: function () {
      var v = this.routes[this.name] || this.routes.home;
      var root = window.D.$(v.container || '#view');
      if (v.container === '#cook-layer') window.D.$('#view').innerHTML = '';
      else window.D.$('#cook-layer').innerHTML = '';
      root.innerHTML = (v.render ? v.render(this.params) : '') || '';
      root.scrollTop = 0;
      if (v.mount) v.mount(root, this.params);
      window.App.updateChrome(this.name);
    },

    handle: function () {
      var p = this.parse(location.hash);
      if (!this.routes[p.name]) p = { name: 'home', params: [] };
      this.name = p.name;
      this.params = p.params;
      this.render();
    },

    refresh: function () { this.render(); },

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
