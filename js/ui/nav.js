/* 页面转场 + iOS 风格边缘右滑返回 + 触感反馈
   只做「手感」，不碰业务逻辑。 */
(function () {
  var DUR = 300;      // 转场时长 ms，与 css/05-app.css 里的动画时长保持一致

  function reduced() {
    try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
    catch (e) { return false; }
  }

  /* 当前可见的主容器：厨房层优先，否则 #view */
  function activeEl() {
    return document.querySelector('.cook') || document.getElementById('view');
  }

  var Nav = {
    ghost: null,

    /* 清掉当前快照 + 屏幕上任何历史残留（异常路径漏删的旧页克隆） */
    clear: function () {
      if (this.ghost && this.ghost.parentNode) this.ghost.parentNode.removeChild(this.ghost);
      this.ghost = null;
      var leftovers = document.querySelectorAll('.nav-ghost');
      for (var i = 0; i < leftovers.length; i++) {
        if (leftovers[i].parentNode) leftovers[i].parentNode.removeChild(leftovers[i]);
      }
    },

    /* 旧页快照：把当前页面拷一份贴在屏幕上，好让它「滑走」。
       只在真的要播转场（fwd/back）时调用；dir='none' 的渲染绝不能拍，
       否则快照没人播放会永久残留，叠在新页上变成重影。 */
    snapshot: function () {
      if (reduced()) return;
      this.clear();                       /* 防止连点时快照叠加 */
      var screen = document.getElementById('screen');
      var el = activeEl();
      if (!screen || !el || !el.firstChild) { this.ghost = null; return; }

      /* 手势可能把当前页推出去了，先归位再测量，否则快照会带位移 */
      this.reset(el);

      var sr = screen.getBoundingClientRect();
      var er = el.getBoundingClientRect();
      var g = document.createElement('div');
      g.className = 'nav-ghost';
      g.innerHTML = el.innerHTML;
      g.style.left = (er.left - sr.left) + 'px';
      g.style.top = (er.top - sr.top) + 'px';
      g.style.width = er.width + 'px';
      g.style.height = er.height + 'px';
      var bg = getComputedStyle(el).backgroundColor;
      if (!bg || bg === 'transparent' || bg === 'rgba(0, 0, 0, 0)') bg = '#F6F3EA';
      g.style.background = bg;
      screen.appendChild(g);
      g.scrollTop = el.scrollTop;
      this.ghost = g;
    },

    /* 新页进场 + 旧页退场（dir: 'fwd' 前进 / 'back' 返回） */
    play: function (el, dir) {
      var g = this.ghost;
      this.ghost = null;
      if (!g || reduced()) { if (g) g.remove(); return; }

      if (dir === 'back') {
        g.classList.add('nav-out-right');
        el.classList.add('nav-in-left');
      } else {
        g.classList.add('nav-out-left');
        el.classList.add('nav-in-right');
      }
      setTimeout(function () {
        if (g && g.parentNode) g.parentNode.removeChild(g);
        el.classList.remove('nav-in-left', 'nav-in-right');
      }, DUR + 30);
    },

    /* 清掉手势/动画残留 */
    reset: function (el) {
      if (!el) return;
      el.classList.remove('nav-in-left', 'nav-in-right', 'swiping');
      el.style.transform = '';
      el.style.transition = '';
    },

    back: function () {
      if (window.Router && window.Router.canBack()) history.back();
    },

    buzz: function (ms) {
      try { if (navigator.vibrate) navigator.vibrate(ms || 8); } catch (e) {}
    }
  };

  /* ---------- 边缘右滑返回（iOS 手势同款） ---------- */
  var EDGE = 34;      // 只有从左边缘 34px 内起手才算返回手势
  var COMMIT = 76;    // 拖过 76px 或速度够快就返回

  var start = null, dragged = false, moved = 0, t0 = 0;

  function onStart(e) {
    if (e.touches.length !== 1) return;
    var scr = document.getElementById('screen');
    if (!scr || !window.Router || !window.Router.canBack()) return;
    var t = e.touches[0];
    var r = scr.getBoundingClientRect();
    if (t.clientX - r.left > EDGE) return;
    start = { x: t.clientX, y: t.clientY };
    dragged = false; moved = 0; t0 = Date.now();
  }

  function onMove(e) {
    if (!start) return;
    var t = e.touches[0];
    var dx = t.clientX - start.x, dy = t.clientY - start.y;

    if (!dragged) {
      if (dx < 8 || Math.abs(dy) > Math.abs(dx)) { if (Math.abs(dy) > 8) start = null; return; }
      dragged = true;
      activeEl().classList.add('swiping');
    }
    if (e.cancelable) e.preventDefault();
    moved = Math.max(0, Math.min(dx, window.innerWidth));
    activeEl().style.transform = 'translateX(' + moved + 'px)';
  }

  function onEnd() {
    if (!start) return;
    start = null;
    if (!dragged) return;
    dragged = false;

    var el = activeEl();
    var v = moved / Math.max(1, Date.now() - t0);   // px/ms
    var commit = moved > COMMIT || (moved > 28 && v > 0.45);

    el.style.transition = 'transform .22s cubic-bezier(.2,.8,.3,1)';
    if (commit) {
      el.style.transform = 'translateX(100%)';
      Nav.buzz(6);
      setTimeout(function () { Nav.back(); }, 170);
    } else {
      el.style.transform = 'translateX(0)';
      setTimeout(function () {
        el.style.transition = '';
        el.style.transform = '';
        el.classList.remove('swiping');
      }, 230);
    }
    moved = 0;
  }

  var screenEl = document.getElementById('screen');
  if (screenEl) {
    screenEl.addEventListener('touchstart', onStart, { passive: true });
    screenEl.addEventListener('touchmove', onMove, { passive: false });
    screenEl.addEventListener('touchend', onEnd);
    screenEl.addEventListener('touchcancel', onEnd);
  }

  window.Nav = Nav;
})();
