(function () {
  var AVOIDS = ['香菜', '葱', '蒜', '花生', '海鲜', '羊肉', '内脏'];

  /* 冰箱候选：从菜谱库里按出现频次取，再补上中式厨房的常备项 */
  function fridgeItems() {
    var count = {};
    (window.RECIPES || []).forEach(function (r) {
      r.ingredients.concat(r.seasonings).forEach(function (x) { count[x.name] = (count[x.name] || 0) + 1; });
    });
    ['姜', '蒜', '小葱', '食用油', '盐', '生抽', '老抽', '料酒', '白糖', '淀粉', '醋'].forEach(function (k) {
      count[k] = (count[k] || 0) + 3;
    });
    return Object.keys(count).map(function (k) { return { name: k, n: count[k] }; })
      .sort(function (a, b) { return b.n - a.n; })
      .slice(0, 30)
      .map(function (x) { return x.name; });
  }

  function seg(items, cur, act) {
    return '<div class="seg">' + items.map(function (it) {
      return '<button class="' + (cur === it.v ? 'on' : '') + '" data-act="' + act + '" data-v="' + it.v + '">' + it.t + '</button>';
    }).join('') + '</div>';
  }

  var MeView = {
    render: function () {
      var st = window.Store.get();
      var p = st.prefs;
      var cookCount = Object.keys(st.cooked).reduce(function (a, k) { return a + st.cooked[k]; }, 0);

      return '<div class="me-head">' +
        '<div class="avatar">' + window.ART.get('curator') + '</div>' +
        '<div>' +
          '<div class="nm">研究员 · 厨房新手</div>' +
          '<div class="sb">Researcher · 制作过 ' + cookCount + ' 件 · 收藏 ' + st.favorites.length + ' 件</div>' +
        '</div>' +
        '<span class="grow"></span>' +
        '<button class="chip plain" data-act="goHome">去挑展品</button>' +
      '</div>' +

      '<div class="sec" style="margin:18px 18px 8px"><h3>口味偏好<span class="hl"> ›</span></h3><span class="more">Affects Selection</span></div>' +
      '<div class="pref-card">' +
        '<div class="pref-row"><div class="lbl">能接受的辣度</div>' +
          seg([
            { v: 0, t: '不吃辣' }, { v: 1, t: '微辣' }, { v: 2, t: '中辣' }, { v: 3, t: '重辣' }
          ], p.spicy, 'setSpicy') +
        '</div>' +
        '<div class="pref-row"><div class="lbl">油的态度</div>' +
          seg([
            { v: 'light', t: '少油' }, { v: 'normal', t: '正常' }, { v: 'rich', t: '不忌油' }
          ], p.oil, 'setOil') +
        '</div>' +
        '<div class="pref-row"><div class="lbl">几个人吃饭</div>' +
          seg([
            { v: 1, t: '1 人' }, { v: 2, t: '2 人' }, { v: 3, t: '3 人' }, { v: 4, t: '4 人+' }
          ], p.people, 'setPeople') +
        '</div>' +
        '<div class="pref-row"><div class="lbl">忌口（点了就不会再推给你）</div>' +
          '<div class="opts">' + AVOIDS.map(function (a) {
            var on = p.avoid.indexOf(a) >= 0;
            return '<button class="chip ' + (on ? 'red' : 'plain') + '" data-act="toggleAvoid" data-v="' + a + '">' +
              (on ? '忌 ' : '') + a + '</button>';
          }).join('') + '</div>' +
        '</div>' +
      '</div>' +

      '<div class="sec" style="margin:18px 18px 8px"><h3>我的冰箱<span class="hl"> ›</span></h3>' +
        '<span class="more">已登记 ' + st.fridge.length + ' 样</span></div>' +
      '<div class="pref-card">' +
        '<div class="fridge-note" style="padding-top:0">勾上你家现在就有的。之后清单只会补你缺的，' +
        '抽签也会优先推能立刻动手的菜。</div>' +
        '<div class="fridge-opts" style="margin-top:10px">' +
          fridgeItems().map(function (n) {
            var on = st.fridge.indexOf(n) >= 0;
            return '<button class="chip ' + (on ? 'on' : 'plain') + '" data-act="toggleFridge" data-v="' + window.D.esc(n) + '">' +
              (on ? '有 ' : '') + window.D.esc(n) + '</button>';
          }).join('') +
        '</div>' +
        (st.fridge.length ? '<div style="padding:12px 0 2px"><button class="btn btn-sm" data-act="clearFridge">清空冰箱</button></div>' : '') +
      '</div>' +

      '<div class="sec" style="margin:16px 18px 4px"><h3>我的收藏</h3><span class="more">' + st.favorites.length + ' Items</span></div>' +
      '<div class="pref-card">' +
        (st.favorites.length ? st.favorites.map(function (id) {
          var r = window.findRecipe(id);
          if (!r) return '';
          return '<div class="rec-row" data-act="detail" data-id="' + r.id + '">' +
            '<div class="art">' + window.ART.get(r.art) + '</div>' +
            '<span class="grow"><span class="n">' + window.D.esc(r.name) + '</span>' +
            '<span class="d">' + window.D.esc(r.no || '') + ' · ' + window.D.esc(r.family || '') + '</span></span>' +
            window.D.icon('right', 'ic-sm') +
          '</div>';
        }).join('') : '<div class="xs muted" style="padding:8px 2px">还没有收藏，看到喜欢的展品点一下收藏。</div>') +
      '</div>' +

      '<div class="sec" style="margin:16px 18px 4px"><h3>制作记录</h3><span class="more">最近 ' + st.history.length + ' 次</span></div>' +
      '<div class="pref-card">' +
        (st.history.length ? st.history.slice(0, 8).map(function (h) {
          var r = window.findRecipe(h.id);
          if (!r) return '';
          var d = new Date(h.at);
          return '<div class="rec-row" data-act="detail" data-id="' + r.id + '">' +
            '<div class="art">' + window.ART.get(r.art) + '</div>' +
            '<span class="grow"><span class="n">' + window.D.esc(r.name) + '</span>' +
            '<span class="d">' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' +
            (d.getHours() < 10 ? '0' : '') + d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes() + ' 完成</span></span>' +
            window.D.icon('right', 'ic-sm') +
          '</div>';
        }).join('') : '<div class="xs muted" style="padding:8px 2px">还没有记录，做完一件展品点「完成了」就会记在这里。</div>') +
      '</div>' +

      '<div class="install-hint"><b>把本馆装进手机</b> —— iOS：Safari 里点<b>分享 › 添加到主屏幕</b>' +
      '；Android：浏览器菜单里点<b>添加到主屏幕 / 安装应用</b>。装好后全屏打开，离线也能看。</div>' +

      '<div class="foot-note">这是个原型，数据都存在你自己的浏览器里。<br>AI 部分目前用本地模拟，接口层已单独封装，换真实模型改动很小。</div>';
    },

    actions: {
      setSpicy: function (d) { window.Store.setPref('spicy', parseInt(d.v, 10)); window.Router.refresh(); },
      setOil: function (d) { window.Store.setPref('oil', d.v); window.Router.refresh(); },
      setPeople: function (d) { window.Store.setPref('people', parseInt(d.v, 10)); window.Router.refresh(); },
      toggleAvoid: function (d) {
        var st = window.Store.get();
        var arr = st.prefs.avoid.slice();
        var i = arr.indexOf(d.v);
        if (i >= 0) arr.splice(i, 1); else arr.push(d.v);
        window.Store.setPref('avoid', arr);
        window.Router.refresh();
      },
      toggleFridge: function (d) {
        window.Store.toggleFridge(d.v);
        window.Router.refresh();
      },
      clearFridge: function () {
        window.Store.clearFridge();
        window.D.toast('冰箱已清空');
        window.Router.refresh();
      },
      detail: function (d) { window.Router.go('#/recipe/' + d.id); },
      goHome: function () { window.Router.go('#/home'); }
    }
  };

  window.MeView = MeView;
})();
