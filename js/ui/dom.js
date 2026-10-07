(function () {
  var ICONS = {
    home: '<path d="M4 11.5 12 5l8 6.5"/><path d="M6.5 10.5V19h11v-8.5"/>',
    search: '<circle cx="11" cy="11" r="6"/><path d="M15.5 15.5 20 20"/>',
    basket: '<path d="M3.5 9h17l-1.6 9.4a2 2 0 0 1-2 1.7H7.1a2 2 0 0 1-2-1.7L3.5 9Z"/><path d="M8.6 9 11 4.2M15.4 9 13 4.2"/>',
    me: '<circle cx="12" cy="8.5" r="3.5"/><path d="M5 19c0-3.6 3.1-5.5 7-5.5s7 1.9 7 5.5"/>',
    sparkle: '<path d="M11 3.5 12.7 8l4.5 1.7L12.7 11.4 11 16 9.3 11.4 4.8 9.7 9.3 8 11 3.5Z"/><path d="M18.3 15.2 19 17l1.8.7L19 18.4l-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z"/>',
    chef: '<path d="M6.5 12.5c-1.6-1.4-1.4-4 .3-5.3C7 6 7.2 4.5 7.2 4.5s1.6.6 2 2.2c1-.6 2.3-.8 3.3-.4 1.9.7 2.7 2.9 2 4.8"/><path d="M6.2 12.6h11.6v3.2H6.2z"/><path d="M7 19.5c0-2.4 2.2-3.7 5-3.7s5 1.3 5 3.7"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    clock: '<circle cx="12" cy="12" r="8"/><path d="M12 7.5V12l3 2"/>',
    fire: '<path d="M12 3.5s4.6 3.8 4.6 7.4A4.6 4.6 0 0 1 12 15.5a4.6 4.6 0 0 1-4.6-4.6C7.4 7.3 12 3.5 12 3.5Z"/><path d="M12 19.5c-2.5 0-4.5-1.9-4.5-4.3"/>',
    timer: '<circle cx="12" cy="13.5" r="7"/><path d="M12 9.8V13.5l2.4 1.7M9.6 3.6h4.8"/>',
    check: '<path d="M5 12.5 10 17.5 19 7"/>',
    plus: '<path d="M12 6v12M6 12h12"/>',
    right: '<path d="M9 5l7 7-7 7"/>',
    left: '<path d="M15 5l-7 7 7 7"/>',
    send: '<path d="M4 12l16-7-7 16-2.2-6.8L4 12Z"/>',
    refresh: '<path d="M19 12a7 7 0 1 1-2.1-5"/><path d="M19 4.2v4h-4"/>',
    heart: '<path d="M12 19.2s-6.6-4.1-6.6-8.5A3.8 3.8 0 0 1 12 8.4a3.8 3.8 0 0 1 6.6 2.3c0 4.4-6.6 8.5-6.6 8.5Z"/>',
    video: '<rect x="3" y="6" width="13" height="12" rx="2.6"/><path d="M16 11l5-3v8l-5-3"/>',
    link: '<path d="M10.6 13.4a3.4 3.4 0 0 0 4.8 0l2.8-2.8a3.4 3.4 0 0 0-4.8-4.8l-1 1"/><path d="M13.4 10.6a3.4 3.4 0 0 0-4.8 0l-2.8 2.8a3.4 3.4 0 0 0 4.8 4.8l1-1"/>',
    question: '<circle cx="12" cy="12" r="8"/><path d="M9.8 9.6A2.3 2.3 0 0 1 12 7.7c1.3 0 2.3.9 2.3 1.9 0 1.3-1 1.8-2.1 2.2-.7.2-1.2.6-1.2 1.3v.3"/><circle cx="12" cy="16.3" r=".95" fill="currentColor" stroke="none"/>',
    leaf: '<path d="M5 19c0-7 4.2-11 14-11 0 8.2-4.2 12-11 12Z"/><path d="M5.5 18.5c3-3 6.2-5 9.4-6"/>',
    pot: '<path d="M4.2 11h15.6v3.1a5 5 0 0 1-5 5H9.2a5 5 0 0 1-5-5V11Z"/><path d="M8.4 8.2h7.2M12 5.2v3"/>',
    star: '<path d="m12 5 2.3 4.7 5.2.7-3.8 3.6.9 5.1-4.6-2.5-4.6 2.5.9-5.1L4.5 10.4l5.2-.7L12 5Z"/>',
    play: '<path d="M8 5.6 18 12 8 18.4V5.6Z"/>',
    pause: '<path d="M9.2 6v12M14.8 6v12"/>',
    trash: '<path d="M5 7h14M10 7V5h4v2M6.6 7l1 12h8.8l1-12"/>',
    bell: '<path d="M6.2 16.2V11l1.8-1.1V8.4a4 4 0 0 1 8 0V9.9l1.8 1.1v5.2"/><path d="M10 16.2a2 2 0 0 0 4 0"/>',
    warn: '<path d="M12 4.6 3.5 19.4h17L12 4.6Z"/><path d="M12 10v4"/><circle cx="12" cy="16.8" r=".95" fill="currentColor" stroke="none"/>',
    note: '<path d="M6 3.5h9l4 4V20H6V3.5Z"/><path d="M14.5 3.5V8H19M9 12h7M9 16h5"/>',
    fish: '<path d="M4 12s3.5-5 9-5c4 0 7 2.6 7 5s-3 5-7 5c-5.5 0-9-5-9-5Z"/><path d="M4 12 2 8.6v6.8L4 12Z"/><circle cx="15.5" cy="10.8" r=".9" fill="currentColor" stroke="none"/>'
  };

  function icon(name, cls) {
    var p = ICONS[name] || '';
    return '<svg viewBox="0 0 24 24" class="ic ' + (cls || '') + '">' + p + '</svg>';
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function fmtTime(sec) {
    sec = Math.max(0, Math.round(sec));
    var m = Math.floor(sec / 60), s = sec % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  function fmtDur(sec) {
    if (sec < 60) return sec + ' 秒';
    var m = Math.round(sec / 60);
    if (m < 60) return m + ' 分钟';
    var h = Math.floor(m / 60), rm = m % 60;
    return rm ? h + ' 小时 ' + rm + ' 分' : h + ' 小时';
  }

  /* 用量按人数缩放：「2 个（约 300g）」× 1.5 → 「3 个（约 450g）」 */
  function scaleAmount(str, ratio) {
    if (!str) return '';
    if (Math.abs(ratio - 1) < 0.02) return String(str);
    return String(str).replace(/(\d+(?:\.\d+)?)\s*([^\s\d，,、（）()]{0,3})/g, function (m, n, u) {
      var v = parseFloat(n) * ratio;
      var out = v >= 10 ? String(Math.round(v)) : String(Math.round(v * 10) / 10);
      return out + (u || '');
    });
  }

  function ring(p, size, sw, color) {
    size = size || 168; sw = sw || 9; color = color || 'var(--seal)';
    var r = (size - sw) / 2 - 1.5;
    var c = 2 * Math.PI * r;
    var on = Math.max(0, Math.min(1, p)) * c;
    return '<svg viewBox="0 0 ' + size + ' ' + size + '">' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r.toFixed(1) + '" fill="none" stroke="var(--paper-3)" stroke-width="' + sw + '"/>' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + (r - sw - 3).toFixed(1) + '" fill="none" stroke="var(--rule)" stroke-width=".55" stroke-dasharray="1.5 2"/>' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r.toFixed(1) + '" fill="none" stroke="' + color + '" stroke-width="' + sw + '" stroke-linecap="round" stroke-dasharray="' + on.toFixed(1) + ' ' + c.toFixed(1) + '"/>' +
      '</svg>';
  }

  function toast(msg, ms) {
    var wrap = $('#toasts');
    if (!wrap) return;
    var d = document.createElement('div');
    d.className = 'toast';
    d.textContent = msg;
    wrap.appendChild(d);
    setTimeout(function () {
      d.style.transition = 'opacity .25s';
      d.style.opacity = '0';
      setTimeout(function () { d.remove(); }, 260);
    }, ms || 1900);
  }

  function haptic() {
    try { if (navigator.vibrate) navigator.vibrate([30, 40, 30]); } catch (e) {}
  }

  window.D = {
    icon: icon, esc: esc, $: $, $$: $$, sleep: sleep,
    fmtTime: fmtTime, fmtDur: fmtDur, ring: ring, toast: toast, haptic: haptic,
    scaleAmount: scaleAmount
  };
})();
