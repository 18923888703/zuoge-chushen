(function () {
  var map = {};
  var subs = [];
  var ctx = null;

  function audio() {
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      if (!ctx) ctx = new AC();
      if (ctx.state === 'suspended') ctx.resume();
      return ctx;
    } catch (e) { return null; }
  }

  function beep() {
    var c = audio();
    if (!c) return;
    [0, 0.32, 0.64].forEach(function (t) {
      var o = c.createOscillator(), g = c.createGain();
      o.type = 'sine';
      o.frequency.value = 880;
      g.gain.setValueAtTime(0.0001, c.currentTime + t);
      g.gain.exponentialRampToValueAtTime(0.22, c.currentTime + t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + t + 0.24);
      o.connect(g); g.connect(c.destination);
      o.start(c.currentTime + t);
      o.stop(c.currentTime + t + 0.26);
    });
  }

  function notify(ev) { subs.forEach(function (f) { f(ev, map); }); }

  function remaining(t) { return Math.max(0, (t.endsAt - Date.now()) / 1000); }

  function loop() {
    var fired = false;
    Object.keys(map).forEach(function (id) {
      var t = map[id];
      if (t.done) return;
      if (remaining(t) <= 0) {
        t.done = true;
        fired = true;
        window.D.toast('「' + t.label + '」时间到，快去看看！', 2600);
        window.D.haptic();
        beep();
      }
    });
    if (fired) { save(); notify('done'); }
    notify('tick');
  }

  setInterval(loop, 250);

  function save() {
    try { window.localStorage.setItem('chushuen.timers.v1', JSON.stringify(map)); } catch (e) {}
  }

  function load() {
    try {
      var raw = window.localStorage.getItem('chushuen.timers.v1');
      if (!raw) return;
      var p = JSON.parse(raw);
      Object.keys(p).forEach(function (k) {
        var t = p[k];
        if (t && t.endsAt) { map[k] = t; }
      });
    } catch (e) {}
  }
  load();

  window.Timers = {
    start: function (id, label, seconds, meta) {
      audio();
      map[id] = {
        id: id, label: label, seconds: seconds,
        endsAt: Date.now() + seconds * 1000,
        startedAt: Date.now(), done: false, meta: meta || {}
      };
      save(); notify('start');
      return map[id];
    },
    get: function (id) { return map[id] || null; },
    stop: function (id) { delete map[id]; save(); notify('stop'); },
    add: function (id, seconds) {
      var t = map[id]; if (!t) return;
      t.endsAt += seconds * 1000; t.done = false; save(); notify('start');
    },
    remaining: function (id) { var t = map[id]; return t ? remaining(t) : 0; },
    isRunning: function (id) { var t = map[id]; return !!t && !t.done; },
    list: function () {
      return Object.keys(map).map(function (k) { return map[k]; });
    },
    next: function () {
      var act = this.list().filter(function (t) { return !t.done; });
      if (!act.length) return null;
      act.sort(function (a, b) { return a.endsAt - b.endsAt; });
      return act[0];
    },
    subscribe: function (fn) { subs.push(fn); return function () { subs = subs.filter(function (f) { return f !== fn; }); }; },
    beep: beep
  };
})();
