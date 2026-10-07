(function () {
  var stepIdx = 0;
  var resumed = false;
  var unsub = null;
  var wakeLock = null;

  function tid(rid, i) { return 'timer-' + rid + '-' + i; }

  /* 这道菜有没有正在跑（或已响过）的计时器 —— 有就说明人走开时正在做，回来该接上进度 */
  function runningStep(r) {
    for (var i = 0; i < r.steps.length; i++) {
      if (window.Timers.get(tid(r.id, i))) return i;
    }
    return -1;
  }

  /* 厨房模式下计时器用暖金色，深色底上比朱砂更醒目 */
  var RING = '#E8C77A';
  var RING_DONE = '#8FBF7A';

  function timerBox(r, i) {
    var s = r.steps[i];
    if (!s || !s.timer) return '';
    var id = tid(r.id, i);
    var t = window.Timers.get(id);
    var secs = s.timer.seconds;

    if (t && !t.done) {
      var rem = window.Timers.remaining(id);
      return '<div class="timer-box">' +
        '<div class="ring-wrap">' + window.D.ring(rem / secs, 176, 10, RING) +
          '<div class="txt"><div class="tv">' + window.D.fmtTime(rem) + '</div>' +
          '<div class="tl">' + window.D.esc(s.timer.label) + '</div></div>' +
        '</div>' +
        '<div class="timer-acts">' +
          '<button class="btn btn-sm btn-soft" data-act="addMin">+1 分钟</button>' +
          '<button class="btn btn-sm btn-ghost" data-act="stopTimer">结束计时</button>' +
        '</div>' +
        '<div class="xs faint" style="margin-top:8px">可以离开这页去做别的，计时会在底部继续跑</div>' +
      '</div>';
    }

    if (t && t.done) {
      return '<div class="timer-box">' +
        '<div class="ring-wrap done">' + window.D.ring(0, 176, 10, RING_DONE) +
          '<div class="txt"><div class="tv" style="font-size:24px">时间到</div>' +
          '<div class="tl">' + window.D.esc(s.timer.label) + '</div></div>' +
        '</div>' +
        '<div class="timer-acts">' +
          '<button class="btn btn-sm btn-sage" data-act="startTimer">再来一次</button>' +
        '</div>' +
      '</div>';
    }

    return '<div class="timer-box">' +
      '<div class="ring-wrap">' + window.D.ring(1, 176, 10, 'rgba(244,238,224,.35)') +
        '<div class="txt"><div class="tv">' + window.D.fmtTime(secs) + '</div>' +
        '<div class="tl">' + window.D.esc(s.timer.label) + '</div></div>' +
      '</div>' +
      '<div class="timer-acts">' +
        '<button class="btn btn-primary" data-act="startTimer">' + window.D.icon('play', 'ic-sm') + '开始计时</button>' +
      '</div>' +
    '</div>';
  }

  /* 这一步真正要用到的食材（从步骤文本里命中） */
  function stepIngs(r, s) {
    var hit = r.ingredients.concat(r.seasonings).filter(function (x) {
      return s.text.indexOf(x.name) >= 0;
    });
    if (!hit.length) return '';
    return '<div class="cook-ings">' + hit.slice(0, 4).map(function (x) {
      return '<span class="chip plain">' + window.D.esc(x.name) + '</span>';
    }).join('') + '</div>';
  }

  var CookView = {
    container: '#cook-layer',

    render: function (params) {
      var r = window.findRecipe(params[0]);
      if (!r) return '';
      /* 只有「从别的页面进来」才决定从哪步开始：
         有计时在跑 → 接上进度并显示提示；没计时 → 从头开始。
         页内翻用的是 Router.refresh()，此时旧 DOM 还在，不会误判 */
      var entering = !document.querySelector('.cook');
      if (entering) {
        var rs = runningStep(r);
        stepIdx = rs > 0 ? rs : 0;
        resumed = stepIdx > 0;
      }
      if (stepIdx >= r.steps.length) stepIdx = 0;
      var s = r.steps[stepIdx];
      var last = stepIdx === r.steps.length - 1;

      var dots = r.steps.map(function (_, i) {
        var c = i < stepIdx ? 'done' : (i === stepIdx ? 'on' : '');
        return '<i class="' + c + '"></i>';
      }).join('');

      return '<div class="cook">' +
        '<div class="cook-top">' +
          '<button class="x" data-act="exit" aria-label="退出做菜">' + window.D.icon('close', 'ic-sm') + '</button>' +
          '<span class="cook-dish">' + window.D.esc(r.name) + '</span>' +
          '<span class="grow"></span>' +
          '<span class="dots">' + dots + '</span>' +
        '</div>' +

        '<div class="cook-body">' +
          (resumed ? '<div class="cook-resume">接着上次，从第 ' + (stepIdx + 1) + ' 步继续 · 计时一直在跑</div>' : '') +
          '<div class="cook-no">第 ' + (stepIdx + 1) + ' 步 / 共 ' + r.steps.length + ' 步</div>' +
          '<div class="cook-text">' + window.D.esc(s.text) + '</div>' +
          (s.tip ? '<div class="cook-tip">' + window.D.icon('sparkle', 'ic-sm') + ' ' + window.D.esc(s.tip) + '</div>' : '') +
          stepIngs(r, s) +
          '<div id="timer-slot">' + timerBox(r, stepIdx) + '</div>' +
        '</div>' +

        '<div class="cook-bottom">' +
          '<button class="btn" data-act="prev"' + (stepIdx === 0 ? ' disabled' : '') + '>上一步</button>' +
          '<button class="btn btn-primary" data-act="next">' + (last ? '做完了' : '下一步') + '</button>' +
        '</div>' +

        '<button class="cook-ask" data-act="ask" aria-label="向馆长请教">' + window.D.icon('chef', 'ic-lg') + '</button>' +
      '</div>';
    },

    mount: function (root, params) {
      var r = window.findRecipe(params[0]);
      if (unsub) { unsub(); unsub = null; }
      /* 厨房模式：尽量保持屏幕常亮，手上有油不用去点屏幕 */
      try {
        if (navigator.wakeLock && navigator.wakeLock.request && !wakeLock) {
          navigator.wakeLock.request('screen').then(function (l) { wakeLock = l; }, function () {});
        }
      } catch (e) {}
      if (!r) return;
      unsub = window.Timers.subscribe(function () {
        var slot = window.D.$('#timer-slot');
        if (slot) slot.innerHTML = timerBox(r, stepIdx);
      });
    },

    actions: {
      exit: function () {
        if (unsub) { unsub(); unsub = null; }
        try { if (wakeLock && wakeLock.release) { wakeLock.release(); wakeLock = null; } } catch (e) {}
        window.Router.go('#/home');
      },

      prev: function () {
        var r = window.findRecipe(window.Router.params[0]);
        if (r && stepIdx > 0) { stepIdx--; window.Router.refresh(); }
      },

      next: function () {
        var r = window.findRecipe(window.Router.params[0]);
        if (!r) return;
        if (stepIdx < r.steps.length - 1) {
          stepIdx++;
          window.Router.refresh();
        } else {
          window.Store.logCook(r.id);
          window.D.toast('「' + r.name + '」完成，记进你的做菜本了', 2400);
          if (unsub) { unsub(); unsub = null; }
          try { if (wakeLock && wakeLock.release) { wakeLock.release(); wakeLock = null; } } catch (e) {}
          stepIdx = 0;
            resumed = false;
          window.Router.go('#/me');
        }
      },

      startTimer: function () {
        var r = window.findRecipe(window.Router.params[0]);
        if (!r) return;
        var s = r.steps[stepIdx];
        if (!s.timer) return;
        window.Timers.start(tid(r.id, stepIdx), s.timer.label, s.timer.seconds, { dish: r.name, recipeId: r.id });
        window.Router.refresh();
      },

      stopTimer: function () {
        var r = window.findRecipe(window.Router.params[0]);
        if (!r) return;
        window.Timers.stop(tid(r.id, stepIdx));
        window.Router.refresh();
      },

      addMin: function () {
        var r = window.findRecipe(window.Router.params[0]);
        if (!r) return;
        window.Timers.add(tid(r.id, stepIdx), 60);
        window.D.toast('加了 1 分钟');
      },

      ask: function () {
        var r = window.findRecipe(window.Router.params[0]);
        window.Assistant.open('', { recipe: r });
      }
    }
  };

  window.CookView = CookView;
})();
