(function () {
  var varIdx = 0;
  var lastId = null;

  function stars(n) {
    var s = '';
    for (var i = 1; i <= 3; i++) s += i <= n ? '●' : '○';
    return s;
  }

  function diffLabel(n) { return n === 1 ? '入门' : (n === 2 ? '进阶' : '硬菜'); }

  /* 人数换算：菜谱基准份量 → 实际吃饭人数 */
  function ratioFor(r) {
    var people = window.Store.get().prefs.people || 2;
    return people / (r.servings || 2);
  }

  function flavorRow(r) {
    if (!r.flavor) return '';
    var keys = ['咸', '甜', '酸', '鲜', '辣', '油'];
    return '<div class="ing-card" style="padding-top:9px;padding-bottom:9px">' +
      keys.map(function (k) {
        var v = r.flavor[k] || 0;
        var cells = '';
        for (var i = 1; i <= 4; i++) cells += '<i class="' + (i <= v ? 'on' : '') + '"></i>';
        return '<div class="row flavor" style="padding:3px 0">' +
          '<span class="fk">' + k + '</span><span class="bar">' + cells + '</span></div>';
      }).join('') +
    '</div>';
  }

  function catalogue(r) {
    var bits = [
      ['No.', r.no || '—'],
      ['Latin', r.latin || '—'],
      ['Family', r.family || '—'],
      ['Season', r.season || '四季'],
      ['Origin', r.origin || '家常']
    ];
    return '<div class="rc-meta">' + bits.map(function (b) {
      return '<span class="m">' + b[0] + ' <b>' + window.D.esc(b[1]) + '</b></span>';
    }).join('<span class="m">·</span>') + '</div>';
  }

  function ingRow(x, ratio, askable) {
    var have = window.Store.inFridge(x.name);
    return '<div class="ing-row">' +
      '<span class="cb' + (have ? ' on' : '') + '">' + window.D.icon('check') + '</span>' +
      '<span class="grow"><span class="n">' + window.D.esc(x.name) + '</span>' +
      (x.note ? '<span class="note">' + window.D.esc(x.note) + '</span>' : '') +
      (have ? '<span class="have">家里有</span>' : '') +
      (askable ? '<button class="ask-btn" data-act="askRole" data-q="' + window.D.esc(x.name) + '">问作用</button>' : '') +
      '</span>' +
      '<span class="a' + (have ? ' dim' : '') + '">' + window.D.esc(window.D.scaleAmount(x.amount, ratio)) + '</span>' +
    '</div>';
  }

  var RecipeView = {
    render: function (params) {
      var r = window.findRecipe(params[0]);
      if (!r) return '<div class="empty">' + window.ART.get('empty') + '<p>馆藏里没有这件</p></div>';
      if (params[0] !== lastId) { lastId = params[0]; varIdx = 0; }

      var fav = window.Store.isFav(r.id);
      var v = r.variations[varIdx] || r.variations[0];
      var people = window.Store.get().prefs.people || 2;
      var ratio = ratioFor(r);
      var miss = window.Store.missingFor(r);
      var total = r.ingredients.length + r.seasonings.length;

      return '' +
        '<div class="pad" style="padding-top:8px;display:flex;align-items:center;gap:8px">' +
          '<button class="btn btn-sm" data-act="back">' + window.D.icon('left', 'ic-sm') + '返回</button>' +
          '<span class="grow"></span>' +
          '<button class="chip ' + (fav ? 'red' : 'plain') + '" data-act="fav" data-id="' + r.id + '">' +
            window.D.icon('heart', 'ic-sm') + (fav ? '已收藏' : '收藏') + '</button>' +
        '</div>' +

        '<div class="rc-hero">' +
          '<div class="rc-plate"><div class="art">' + window.ART.get(r.art, { annot: r.annot }) + '</div></div>' +
        '</div>' +

        catalogue(r) +

        '<div class="rc-title">' +
          '<h2>' + window.D.esc(r.name) + '</h2>' +
          '<div class="tl">' + window.D.esc(r.tagline) + '</div>' +
          '<div style="margin-top:11px"><span class="stamp">馆藏认证</span></div>' +
        '</div>' +

        '<div class="stat-row">' +
          '<div class="stat"><div class="k">Prep</div><div class="v">' + r.prep + ' 分</div></div>' +
          '<div class="stat"><div class="k">Cook</div><div class="v">' + r.cook + ' 分</div></div>' +
          '<div class="stat"><div class="k">Level</div><div class="v">' + diffLabel(r.difficulty) + '</div></div>' +
          '<div class="stat"><div class="k">Serves</div><div class="v">' + people + ' 人</div></div>' +
        '</div>' +

        (Math.abs(ratio - 1) > 0.02 ? '<div class="pad" style="padding-top:9px">' +
          '<div class="reason" style="margin:0">' + window.D.icon('note', 'ic-sm') +
          '<span>用量已按 <b>' + people + ' 人</b> 换算（原谱基准 ' + r.servings + ' 人）。</span></div></div>' : '') +

        '<div class="sec" style="margin:18px 18px 8px"><h3>备料情况<span class="hl"> ›</span></h3>' +
          '<span class="more">' + (miss.length ? '还差 ' + miss.length + ' 样' : '冰箱齐了') + ' / 共 ' + total + '</span></div>' +
        '<div class="ing-card">' +
          '<div class="ing-group">' +
          r.ingredients.map(function (i) { return ingRow(i, ratio, false); }).join('') +
          '</div>' +
          '<hr class="dash-soft">' +
          '<div class="ing-group">' +
          r.seasonings.map(function (s) { return ingRow(s, ratio, true); }).join('') +
          '</div>' +
        '</div>' +

        '<div style="padding:13px 18px 0">' +
          '<button class="btn btn-primary btn-block btn-lg" data-act="justCook" data-id="' + r.id + '">' +
            window.D.icon('fire', 'ic-sm') + '就做这道 · 备料并开始</button>' +
          '<button class="btn btn-block" style="margin-top:8px" data-act="addList" data-id="' + r.id + '">' +
            window.D.icon('basket', 'ic-sm') + '只把缺的加进清单</button>' +
        '</div>' +

        (r.flavor ? '<div class="sec" style="margin:20px 18px 8px"><h3>风味谱<span class="hl"> ›</span></h3><span class="more">Flavor Profile 0–4</span></div>' +
        flavorRow(r) : '') +

        '<div class="sec" style="margin:20px 18px 8px"><h3>流派做法<span class="hl"> ›</span></h3><span class="more">按你的偏好排序</span></div>' +
        r.variations.map(function (x, i) {
          return '<div class="var-card' + (i === varIdx ? ' on' : '') + '" data-act="pickVar" data-i="' + i + '">' +
            '<div class="vh"><span class="vn">' + window.D.esc(x.title) + '</span>' +
            '<span class="chip ' + (i === varIdx ? 'ochre' : 'plain') + '">' + (i === varIdx ? '已选' : '选这个') + '</span></div>' +
            '<div class="vd">' + window.D.esc(x.diff) + '</div>' +
            (i === varIdx ? '<div class="vs">✓ 已按这个流派调整下面的工序说明</div>' : '') +
          '</div>';
        }).join('') +

        '<div class="sec" style="margin:16px 18px 6px"><h3>制作工序</h3><span class="more">' + r.steps.length + ' Steps</span></div>' +
        '<div class="ing-card">' +
          r.steps.map(function (s, i) {
            return '<div class="step-item">' +
              '<span class="step-no">' + (i + 1) + '</span>' +
              '<span class="grow">' +
                '<span class="txt">' + window.D.esc(s.text) + '</span>' +
                (s.tip ? '<span class="tip">' + window.D.icon('note', 'ic-sm') + window.D.esc(s.tip) + '</span>' : '') +
                (s.timer ? '<span class="tm">' + window.D.icon('timer', 'ic-sm') + window.D.esc(s.timer.label) + ' ' + window.D.fmtDur(s.timer.seconds) + '</span>' : '') +
              '</span>' +
            '</div>';
          }).join('') +
        '</div>' +

        '<div class="sec" style="margin:20px 18px 8px"><h3>影像档案<span class="hl"> ›</span></h3><span class="more">External Reference</span></div>' +
        '<div class="arch" style="cursor:pointer" data-act="openDy" data-id="' + r.id + '">' +
          '<span class="cover">' + window.ART.get(r.art) + '<span class="dur">VIDEO</span></span>' +
          '<span class="grow">' +
            '<span class="vt">抖音上检索「' + window.D.esc(r.name) + '」</span>' +
            '<span class="vm"><span class="pf pf-dy">抖音</span>看别人怎么做</span>' +
          '</span>' +
          window.D.icon('link', 'ic-sm') +
        '</div>' +
        '<div class="arch" style="cursor:pointer" data-act="openXhs" data-id="' + r.id + '">' +
          '<span class="cover">' + window.ART.get(r.art) + '<span class="dur">NOTE</span></span>' +
          '<span class="grow">' +
            '<span class="vt">小红书上检索「' + window.D.esc(r.name) + '」</span>' +
            '<span class="vm"><span class="pf pf-xhs">小红书</span>看图文笔记</span>' +
          '</span>' +
          window.D.icon('link', 'ic-sm') +
        '</div>' +

        '<div style="padding:10px 18px 24px">' +
          '<button class="btn btn-block" data-act="cook" data-id="' + r.id + '">' +
            window.D.icon('play', 'ic-sm') + '直接开始制作（不备料）</button>' +
        '</div>';
    },

    mount: function () {},

    actions: {
      back: function () { window.Router.go('#/home'); },
      cook: function (d) { window.Router.go('#/cook/' + d.id); },
      detail: function (d) { window.Router.go('#/recipe/' + d.id); },

      /* 一键直达：只补冰箱里缺的，然后直接进制作页 */
      justCook: function (d) {
        var r = window.findRecipe(d.id);
        if (!r) return;
        var ratio = ratioFor(r);
        var miss = window.Store.missingFor(r).map(function (x) {
          return { name: x.name, amount: window.D.scaleAmount(x.amount, ratio), cat: x.cat };
        });
        var n = miss.length ? window.Store.addToShopping(miss, r.name) : 0;
        window.D.toast(n ? '缺的 ' + n + ' 样已进清单，开做' : '冰箱齐了，直接开做');
        window.Router.go('#/cook/' + d.id);
      },

      fav: function (d) {
        var on = window.Store.toggleFav(d.id);
        window.D.toast(on ? '已收进我的收藏' : '取消收藏');
        window.Router.refresh();
      },

      pickVar: function (d) {
        varIdx = parseInt(d.i, 10) || 0;
        window.Router.refresh();
      },

      addList: function (d) {
        var r = window.findRecipe(d.id);
        if (!r) return;
        var ratio = ratioFor(r);
        var miss = window.Store.missingFor(r).map(function (x) {
          return { name: x.name, amount: window.D.scaleAmount(x.amount, ratio), cat: x.cat };
        });
        if (!miss.length) { window.D.toast('冰箱里都有，不用买'); return; }
        var n = window.Store.addToShopping(miss, r.name);
        window.D.toast(n ? '缺的 ' + n + ' 样已进清单' : '清单里已经有了');
      },

      askRole: function (d) {
        window.Assistant.open(d.q + '是干嘛的？有什么用？');
      },

      openDy: function (d) {
        var r = window.findRecipe(d.id);
        if (r) window.open(r.links.douyin, '_blank', 'noopener');
      },

      openXhs: function (d) {
        var r = window.findRecipe(d.id);
        if (r) window.open(r.links.xhs, '_blank', 'noopener');
      }
    }
  };

  window.RecipeView = RecipeView;
})();
