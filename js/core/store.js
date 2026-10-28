(function () {
  var KEY = 'chushuen.state.v1';
  var memory = null;

  var def = {
    prefs: { spicy: 1, oil: 'normal', avoid: [], tools: ['炒锅'], people: 2 },
    shopping: [],
    favorites: [],
    history: [],
    cooked: {},
    fridge: []
  };

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  var state = clone(def);

  function load() {
    var raw = null;
    try { raw = window.localStorage.getItem(KEY); } catch (e) { raw = memory; }
    if (raw) {
      try {
        var p = JSON.parse(raw);
        Object.keys(def).forEach(function (k) { if (p[k] != null) state[k] = p[k]; });
      } catch (e) {}
    }
  }

  function save() {
    var raw = JSON.stringify(state);
    memory = raw;
    try { window.localStorage.setItem(KEY, raw); } catch (e) {}
  }

  load();

  var subs = [];
  function notify(k) { subs.forEach(function (f) { f(k); }); }

  window.Store = {
    get: function () { return state; },
    save: save,
    on: function (fn) { subs.push(fn); return function () { subs = subs.filter(function (f) { return f !== fn; }); }; },

    setPref: function (k, v) { state.prefs[k] = v; save(); notify('prefs'); },

    addToShopping: function (items, from) {
      var added = 0;
      items.forEach(function (it) {
        var exist = state.shopping.filter(function (s) { return s.name === it.name && !s.done; })[0];
        if (exist) return;
        state.shopping.push({
          id: 's' + Date.now() + Math.random().toString(36).slice(2, 6),
          name: it.name,
          amount: it.amount || '',
          cat: it.cat || '其他',
          from: from || '',
          done: false
        });
        added++;
      });
      save(); notify('shopping');
      return added;
    },

    toggleShopping: function (id) {
      var it = state.shopping.filter(function (s) { return s.id === id; })[0];
      if (it) { it.done = !it.done; save(); notify('shopping'); }
    },

    removeShopping: function (id) {
      state.shopping = state.shopping.filter(function (s) { return s.id !== id; });
      save(); notify('shopping');
    },

    clearShopping: function () {
      state.shopping = state.shopping.filter(function (s) { return !s.done; });
      save(); notify('shopping');
    },

    toggleFav: function (rid) {
      var i = state.favorites.indexOf(rid);
      if (i >= 0) state.favorites.splice(i, 1); else state.favorites.push(rid);
      save(); notify('favorites');
      return i < 0;
    },

    isFav: function (rid) { return state.favorites.indexOf(rid) >= 0; },

    logCook: function (rid) {
      state.history.unshift({ id: rid, at: Date.now() });
      state.history = state.history.slice(0, 30);
      state.cooked[rid] = (state.cooked[rid] || 0) + 1;
      save(); notify('history');
    },

    pendingCount: function () {
      return state.shopping.filter(function (s) { return !s.done; }).length;
    },

    /* —— 我的冰箱：让清单从「加法」变成「减法」 —— */
    inFridge: function (name) { return state.fridge.indexOf(name) >= 0; },

    toggleFridge: function (name) {
      var i = state.fridge.indexOf(name);
      if (i >= 0) state.fridge.splice(i, 1); else state.fridge.push(name);
      save(); notify('fridge');
      return i < 0;
    },

    clearFridge: function () { state.fridge = []; save(); notify('fridge'); },

    /* 这道菜还差几样没备齐（首页「能做 / 还差 N 样」用） */
    missingFor: function (r) {
      var all = r.ingredients.concat(r.seasonings.map(function (s) {
        return { name: s.name, amount: s.amount, cat: '调料' };
      }));
      return all.filter(function (x) { return state.fridge.indexOf(x.name) < 0; }).map(function (x) {
        return { name: x.name, amount: x.amount || '适量', cat: x.cat || '调料' };
      });
    }
  };
})();
