(function () {
  /* 铜版线稿标本：细墨线 + 排线阴影 + 标本台投影 */

  var INK = '#2A241E';

  function W(inner) {
    return '<svg viewBox="0 0 100 100" class="art" fill="none" stroke="' + INK + '" ' +
      'stroke-width="1" stroke-linecap="round" stroke-linejoin="round">' +
      '<g filter="url(#wobble)">' + inner + '</g></svg>';
  }

  /* 排线阴影 */
  function shade(cx, cy, rx, ry, op) {
    return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry +
      '" fill="url(#hatch)" stroke="none" opacity="' + (op || 0.5) + '"/>';
  }

  function steam(x, y) {
    return '<path d="M' + x + ' ' + y + 'c-3-3.5 2.6-5.6 0-9M' + (x + 15) + ' ' + (y - 2) +
      'c-3-3.5 2.6-5.6 0-9" stroke-width=".7" stroke-opacity=".45"/>';
  }

  /* 器皿 */
  function bowl() {
    return '<path d="M18 55h64a32 32 0 0 1-64 0Z" fill="#FDF9F1"/>' +
      '<path d="M13 55h74"/>' +
      '<path d="M23 63c6 3 14 4 27 4s21-1 27-4" stroke-width=".6" stroke-opacity=".3"/>' +
      '<path d="M28 70c5 2 12 3 22 3s17-1 22-3" stroke-width=".5" stroke-opacity=".18"/>';
  }
  function deepBowl() {
    return '<path d="M22 50h56a28 28 0 0 1-56 0Z" fill="#FDF9F1"/>' +
      '<path d="M17 50h66"/>' +
      '<path d="M27 58c6 2 13 3 23 3s17-1 23-3" stroke-width=".6" stroke-opacity=".3"/>';
  }
  function dish() {
    return '<ellipse cx="50" cy="62" rx="35" ry="16" fill="#FDF9F1"/>' +
      '<ellipse cx="50" cy="61" rx="27" ry="11" stroke-width=".7"/>' +
      '<path d="M28 70c6 3 13 4 22 4s16-1 22-4" stroke-width=".5" stroke-opacity=".2"/>';
  }
  function longPlate() {
    return '<ellipse cx="50" cy="66" rx="38" ry="13" fill="#FDF9F1"/>' +
      '<ellipse cx="50" cy="65" rx="31" ry="9" stroke-width=".7"/>' +
      '<path d="M26 72c7 3 15 4 24 4s17-1 24-4" stroke-width=".5" stroke-opacity=".2"/>';
  }

  /* 图鉴标注：圆圈数字 + 虚线引线 */
  function mark(n, x, y, tx, ty) {
    var s = '';
    if (tx != null) {
      s += '<path d="M' + x + ' ' + y + 'L' + tx + ' ' + ty + '" stroke="' + INK +
        '" stroke-width=".5" stroke-dasharray="1.6 1.6" stroke-opacity=".6"/>';
    }
    s += '<circle cx="' + x + '" cy="' + y + '" r="4.8" fill="#F0EBDC" stroke="' + INK + '" stroke-width=".7"/>';
    s += '<text x="' + x + '" y="' + (y + 2) + '" font-size="5.6" text-anchor="middle" ' +
      'fill="' + INK + '" stroke="none" font-family="Georgia,serif">' + n + '</text>';
    return s;
  }

  var A = {};

  /* ① 番茄炒蛋 */
  A['tomato-egg'] = W(
    shade(50, 84, 26, 4.5) + bowl() +
    '<path d="M29 45l11-4 4 8-10 4Z" fill="#B5544A" stroke-width=".8"/>' +
    '<path d="M45 39l13 1-3 9-11-2Z" fill="#B5544A" stroke-width=".8"/>' +
    '<path d="M31 54c3-5 13-6 17-1-3 4-13 5-17 1Z" fill="#D9B45C" stroke-width=".8"/>' +
    '<path d="M53 51c3-4 11-4 13 1-3 3-11 3-13-1Z" fill="#D9B45C" stroke-width=".8"/>' +
    '<path d="M33 47c1-2 3-3 5-3M48 41c1-1.5 3-2 5-2" stroke-width=".5" stroke-opacity=".35"/>' +
    '<circle cx="39" cy="48" r="1.2" fill="' + INK + '" stroke="none"/>' +
    '<circle cx="60" cy="45" r="1.1" fill="' + INK + '" stroke="none"/>' +
    '<circle cx="47" cy="55" r="1" fill="' + INK + '" stroke="none"/>' +
    steam(38, 32)
  );

  /* ② 红烧肉 */
  A['braised-pork'] = W(
    shade(50, 84, 26, 4.5) + bowl() +
    '<rect x="27" y="41" width="17" height="14" rx="1.5" fill="#9A6B45" stroke-width=".8"/>' +
    '<path d="M27 47h17" stroke-width=".5" stroke-opacity=".45"/>' +
    '<path d="M30 43.5l3.5-2M37 43l3-2" stroke-width=".5" stroke-opacity=".3"/>' +
    '<rect x="47" y="38" width="16" height="13" rx="1.5" fill="#7E5436" stroke-width=".8"/>' +
    '<path d="M47 44h16" stroke-width=".5" stroke-opacity=".45"/>' +
    '<rect x="38" y="52" width="15" height="12" rx="1.5" fill="#9A6B45" stroke-width=".8"/>' +
    '<path d="M38 57h15" stroke-width=".5" stroke-opacity=".4"/>' +
    '<path d="M67 52l0-5M67 52l3.5-3.5M67 52l3.5 3.5M67 52l5 0M67 52l-3.5-3.5M67 52l-3.5 3.5" stroke-width=".6"/>' +
    steam(40, 30)
  );

  /* ③ 可乐鸡翅 */
  A['cola-wings'] = W(
    shade(50, 84, 26, 4.5) + bowl() +
    '<path d="M28 48c-2-8 7-12 11-7s3 11-3 12-8-1-8-5Z" fill="#B9834E" stroke-width=".8"/>' +
    '<path d="M39 53l6 5" stroke-width=".7"/><circle cx="46" cy="59" r="2" fill="#FDF9F1" stroke-width=".7"/>' +
    '<path d="M48 42c-2-7 6-11 10-6s3 10-3 11-7-1-7-5Z" fill="#A5733F" stroke-width=".8"/>' +
    '<path d="M58 47l6 5" stroke-width=".7"/><circle cx="65" cy="53" r="1.8" fill="#FDF9F1" stroke-width=".7"/>' +
    '<path d="M36 54c-2-6 5-9 8-5s2 8-3 9-5-1-5-4Z" fill="#C08F58" stroke-width=".8"/>' +
    '<path d="M44 58l5 4" stroke-width=".7"/><circle cx="50" cy="63" r="1.6" fill="#FDF9F1" stroke-width=".7"/>' +
    '<path d="M30 44c2-2 6-2 8 0" stroke-width=".5" stroke-opacity=".35"/>'
  );

  /* ④ 酸辣土豆丝 */
  A['spicy-potato'] = W(
    shade(50, 84, 26, 4.5) + dish() +
    '<path d="M28 56l26-7M30 60l26-7M32 64l24-6M34 68l20-5M36 52l24-6" stroke="#C9A45C" stroke-width="1.1"/>' +
    '<path d="M40 58l20-5M42 62l18-4" stroke="#C9A45C" stroke-width="1" stroke-opacity=".65"/>' +
    '<path d="M62 44c5-4 10-2 11 2s-4 6-8 4c-3-1.5-3-4-3-6Z" fill="#B5544A" stroke-width=".8"/>' +
    '<path d="M62 44c-1-3 0-6 2-7" stroke="#6E8A6A" stroke-width="1"/>' +
    '<circle cx="35" cy="50" r="1" fill="' + INK + '" stroke="none"/>' +
    '<circle cx="58" cy="62" r="1" fill="' + INK + '" stroke="none"/>' +
    '<circle cx="46" cy="66" r=".9" fill="' + INK + '" stroke="none"/>'
  );

  /* ⑤ 蒜蓉西兰花 */
  A['garlic-broccoli'] = W(
    shade(50, 84, 26, 4.5) + dish() +
    '<path d="M29 52c-6 0-9-7-3-10 0-5 8-6 9-1 6-3 11 2 9 8-1 3-4 3-7 3Z" fill="#6E8A6A" stroke-width=".8"/>' +
    '<path d="M37 53v6" stroke="#6E8A6A" stroke-width="2.4"/>' +
    '<circle cx="32" cy="46" r=".9" stroke-width=".5" stroke-opacity=".45"/>' +
    '<circle cx="38" cy="43" r=".9" stroke-width=".5" stroke-opacity=".45"/>' +
    '<circle cx="34" cy="51" r=".9" stroke-width=".5" stroke-opacity=".45"/>' +
    '<path d="M54 50c-5 0-8-6-3-9 0-4 7-5 8 0 5-2 9 2 7 7-1 2-3 2-5 2Z" fill="#7C9773" stroke-width=".8"/>' +
    '<path d="M61 51v6" stroke="#7C9773" stroke-width="2.2"/>' +
    '<path d="M44 62c-2-4 0-8 3-8s5 3 3 7Z" fill="#FDF9F1" stroke-width=".7"/>' +
    '<path d="M47 54v7" stroke-width=".5"/>'
  );

  /* ⑥ 冬瓜排骨汤 */
  A['rib-soup'] = W(
    shade(50, 84, 26, 4.5) + deepBowl() +
    '<path d="M24 51c6-3 11 3 17 0s11 3 17 0 10 2 14 0" stroke-width=".6" stroke-opacity=".35"/>' +
    '<rect x="34" y="42" width="15" height="8" rx="3.5" fill="#C9A87C" stroke-width=".8"/>' +
    '<circle cx="32" cy="46" r="3.4" fill="#FDF9F1" stroke-width=".7"/>' +
    '<circle cx="51" cy="46" r="3.4" fill="#FDF9F1" stroke-width=".7"/>' +
    '<rect x="42" y="52" width="13" height="8" rx="1" fill="#E6DFCE" stroke-width=".8"/>' +
    '<path d="M42 56h13" stroke-width=".5" stroke-opacity=".35"/>' +
    '<path d="M58 50c3-3 8-3 10 0-3 3-8 3-10 0Z" fill="#E6DFCE" stroke-width=".7"/>' +
    steam(38, 34)
  );

  /* ⑦ 清蒸鲈鱼 */
  A['seabass'] = W(
    shade(50, 84, 28, 4.5) + longPlate() +
    '<path d="M22 62c8-9 25-13 39-11 9 1.5 13 5 13 5s-4 3.5-13 5c-14 2-31-2-39-11Z" fill="#A8B8BE" stroke-width=".8"/>' +
    '<path d="M74 56l11-6v13l-11-6Z" fill="#93A6AD" stroke-width=".8"/>' +
    '<path d="M40 51c7-5 15-5 21 0" stroke-width=".5" stroke-opacity=".4"/>' +
    '<path d="M42 65c7 3 15 3 21 0" stroke-width=".5" stroke-opacity=".3"/>' +
    '<path d="M46 53c-2 4-2 8 0 11M54 52c-2 4-2 9 0 12M62 54c-2 4-2 8 0 10" stroke-width=".5" stroke-opacity=".28"/>' +
    '<path d="M48 49l-5-7 12 3Z" fill="#FDF9F1" stroke-width=".7"/>' +
    '<path d="M50 66l-3 5 7-1Z" fill="#FDF9F1" stroke-width=".7"/>' +
    '<circle cx="31" cy="58" r="1.7" fill="' + INK + '" stroke="none"/>' +
    '<path d="M36 53c3-2 6-2 8 0" stroke="#6E8A6A" stroke-width="1"/>' +
    '<path d="M40 62c4-1 8-1 11 0" stroke="#6E8A6A" stroke-width="1"/>'
  );

  /* 馆长 */
  A['curator'] = W(
    '<circle cx="50" cy="44" r="18" fill="#FDF9F1"/>' +
    '<path d="M32 42c0-12 8-19 18-19s18 7 18 19" fill="#FDF9F1"/>' +
    '<path d="M32 42c1-8 6-13 10-15" stroke-width=".6" stroke-opacity=".4"/>' +
    '<circle cx="42" cy="45" r="6"/><circle cx="58" cy="45" r="6"/>' +
    '<path d="M48 45h4"/><path d="M36 43l-4-2M68 43l4-2"/>' +
    '<circle cx="42" cy="45" r="1.5" fill="' + INK + '" stroke="none"/>' +
    '<circle cx="58" cy="45" r="1.5" fill="' + INK + '" stroke="none"/>' +
    '<path d="M50 49v5"/>' +
    '<path d="M42 57c3 3 7 3 10 0" stroke-width="1"/>' +
    '<path d="M43 54c2 2 5 2 7 0" stroke-width=".6" stroke-opacity=".45"/>' +
    '<path d="M30 84c4-11 10-16 20-16s16 5 20 16"/>' +
    '<path d="M44 68l6 6 6-6" stroke-width=".7"/>' +
    '<path d="M50 74v10" stroke-width=".5" stroke-opacity=".5"/>'
  );

  /* 藏品柜（抽签） */
  A['cabinet'] = W(
    '<path d="M24 30h52v52H24Z" fill="#FDF9F1"/>' +
    '<path d="M21 30h58" stroke-width="1.3"/>' +
    '<rect x="40" y="20" width="20" height="10" fill="#FDF9F1"/>' +
    '<path d="M44 25h12" stroke-width=".5" stroke-opacity=".35"/>' +
    '<path d="M34 30v-8M50 30v-11M66 30v-6" stroke-width="1"/>' +
    '<circle cx="34" cy="20" r="2.4" fill="#B5544A" stroke-width=".7"/>' +
    '<circle cx="50" cy="17" r="2.4" fill="#D9B45C" stroke-width=".7"/>' +
    '<circle cx="66" cy="22" r="2.4" fill="#6E8A6A" stroke-width=".7"/>' +
    '<rect x="29" y="36" width="42" height="13"/>' +
    '<rect x="29" y="52" width="42" height="13"/>' +
    '<rect x="29" y="68" width="42" height="12"/>' +
    '<path d="M45 42h10M45 58h10M45 74h10" stroke-width="1.2"/>'
  );

  /* 空展柜 */
  A['empty'] = W(
    '<path d="M28 26h44v52H28Z" fill="#FDF9F1"/>' +
    '<path d="M28 26h44" stroke-width="1.3"/>' +
    '<path d="M50 26v52" stroke-width=".5" stroke-opacity=".22"/>' +
    '<path d="M34 58h32" stroke-width=".7" stroke-opacity=".5"/>' +
    '<path d="M34 40h32" stroke-width=".6" stroke-opacity=".3"/>' +
    '<path d="M42 50c-3 0-5 3-4 5" stroke-width=".6" stroke-opacity=".35"/>' +
    '<path d="M24 82h52" stroke-width=".6" stroke-opacity=".3"/>'
  );

  /* 炖锅 */
  A['pot'] = W(
    '<path d="M20 46h60v12a26 26 0 0 1-26 26H46a26 26 0 0 1-26-26V46Z" fill="#FDF9F1"/>' +
    '<path d="M16 46h68" stroke-width="1.3"/>' +
    '<path d="M68 46l8-7M32 46l-8-7" stroke-width=".8"/>' +
    '<path d="M28 56c6 3 14 4 22 4s16-1 22-4" stroke-width=".5" stroke-opacity=".22"/>' +
    steam(40, 32)
  );

  /* 蔬菜标本 */
  A['veg'] = W(
    '<path d="M50 82c-15 0-25-13-25-27 0-12 10-19 25-19s25 7 25 19c0 14-10 27-25 27Z" fill="#E1E7DE"/>' +
    '<path d="M50 40v34" stroke="#6E8A6A" stroke-width="1.2"/>' +
    '<path d="M50 56c-8-4-12-9-12-15M50 62c8-4 12-9 12-15" stroke="#6E8A6A" stroke-width=".8" stroke-opacity=".6"/>' +
    shade(50, 86, 24, 4)
  );

  window.ART = {
    get: function (key, opts) {
      var base = A[key] || A['pot'];
      if (!opts || !opts.annot) return base;
      var marks = '';
      opts.annot.forEach(function (a, i) {
        marks += mark(i + 1, a.x, a.y, a.tx, a.ty);
      });
      return base.replace('</g></svg>', marks + '</g></svg>');
    },
    raw: A,
    mark: mark
  };
})();
