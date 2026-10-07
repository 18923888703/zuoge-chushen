(function () {
  var cur = null;
  var loading = false;

  function today() {
    var d = new Date();
    var wk = ['日', '一', '二', '三', '四', '五', '六'][d.getDay()];
    var meal = d.getHours() < 10 ? '早饭' : (d.getHours() < 15 ? '午饭' : (d.getHours() < 21 ? '晚饭' : '夜宵'));
    return (d.getMonth() + 1) + '月' + d.getDate() + '日 · 星期' + wk + ' · ' + meal;
  }

  function stars(n) {
    var s = '';
    for (var i = 1; i <= 3; i++) s += i <= n ? '●' : '○';
    return s;
  }

  function reason(r) {
    var p = window.Store.get().prefs;
    var bits = [];
    if (r.difficulty === 1) bits.push('今天想轻松一点');
    if (/健康|清淡|素菜/.test(r.flavors.join('')) && p.oil === 'light') bits.push('你偏好清淡');
    if (/辣/.test(r.flavors.join('')) && p.spicy >= 2) bits.push('你想吃点辣');
    if (/快手/.test(r.flavors.join(''))) bits.push('它够快');
    if (r.flavors.indexOf('宴客') >= 0) bits.push('今天值得隆重一点');
    if (!bits.length) bits.push('它很适合现在');
    return '为什么挑它：' + bits.join('，') + '。';
  }

  function dishCard(r) {
    return '<div class="specimen-card">' +
      '<div class="no">' +
        '<span class="no-plate"><i class="sq"></i>' + window.D.esc(r.no || 'No.00') + '</span>' +
        '<span class="stamp">' + window.D.esc(r.family || '家常') + '</span>' +
        '<span class="grow"></span>' +
        '<span class="tag">' + window.D.esc(r.season || '四季') + ' · ' + window.D.esc(r.origin || '家常') + '</span>' +
      '</div>' +
      '<div class="head">' +
        '<div class="art">' + window.ART.get(r.art, { annot: r.annot }) + '</div>' +
        '<div class="grow">' +
          '<div class="nm">' + window.D.esc(r.name) + '</div>' +
          '<div class="latin">' + window.D.esc(r.latin || '') + '</div>' +
          '<div class="tl">' + window.D.esc(r.tagline) + '</div>' +
          '<div class="meta">' +
            '<span class="chip ochre">' + (r.prep + r.cook) + ' 分钟</span>' +
            '<span class="chip brass">' + stars(r.difficulty) + '</span>' +
            '<span class="chip">' + r.servings + ' 人份</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="reason">' + window.D.icon('note', 'ic-sm') +
        '<span>' + window.D.esc(reason(r)) + '</span></div>' +
      '<div class="acts">' +
        '<button class="btn btn-primary" data-act="cook" data-id="' + r.id + '">开始制作</button>' +
        '<button class="btn" data-act="detail" data-id="' + r.id + '">看展签</button>' +
        '<button class="btn btn-ghost" data-act="addList" data-id="' + r.id + '" style="flex:0 0 auto;padding:0 11px" aria-label="加入采集清单">' +
          window.D.icon('plus', 'ic-sm') + '</button>' +
      '</div>' +
    '</div>';
  }

  var HomeView = {
    render: function () {
      var prefs = window.Store.get().prefs;
      var spicyTxt = ['不吃辣', '微辣', '中辣', '重辣'][prefs.spicy];
      var oilTxt = prefs.oil === 'light' ? '少油' : (prefs.oil === 'rich' ? '不忌油' : '正常');

      var slot;
      if (loading) {
        slot = '<div style="margin:16px 18px 0"><div class="sk sk-card"></div>' +
          '<div class="sk sk-line" style="width:58%"></div>' +
          '<div class="sk sk-line" style="width:44%"></div></div>';
      } else if (cur) {
        slot = dishCard(cur);
      } else {
        slot = '<div class="empty">' + window.ART.get('cabinet') +
          '<p>展台上还空着。<br>点上面的藏品柜，让馆长替你挑一件。</p></div>';
      }

      var guess = window.RECIPES.filter(function (r) { return !cur || r.id !== cur.id; }).slice(0, 6);

      return '' +
        '<div class="home-head">' +
          '<div class="hi">Museum of Home Cooking · ' + today() + '</div>' +
          '<div class="t">今日展品</div>' +
          '<div class="s">不知道吃什么、要买什么、怎么做，馆长替你拿主意</div>' +
        '</div>' +

        '<div style="padding:14px 18px 0">' +
          '<div class="field" data-act="toSearch">' +
            window.D.icon('search', 'ic-sm') +
            '<span class="muted small">检索馆藏…菜名或食材</span>' +
            '<span class="chip ochre" style="height:21px">去检索</span>' +
          '</div>' +
        '</div>' +

        '<div class="cabinet' + (loading ? ' shaking' : '') + '" data-act="draw">' +
          '<div class="tube">' + window.ART.get('cabinet') + '</div>' +
          '<div class="info">' +
            '<div class="q">' + (loading ? '馆长正在翻藏品柜…' : '不知道吃什么？翻藏品柜') + '</div>' +
            '<div class="sub">会参考你的口味偏好与忌口来挑</div>' +
          '</div>' +
          '<span class="go">抽一件</span>' +
        '</div>' +

        slot +

        '<div class="pref-strip">' +
          '<span class="chip">' + spicyTxt + '</span>' +
          '<span class="chip ochre">' + oilTxt + '</span>' +
          '<span class="chip brass">' + prefs.people + ' 人吃饭</span>' +
          (prefs.avoid.length ? prefs.avoid.map(function (a) { return '<span class="chip red">忌 ' + window.D.esc(a) + '</span>'; }).join('') : '') +
          '<button class="chip plain" data-act="toPref">调整口味</button>' +
        '</div>' +

        '<div class="sec" style="margin:18px 18px 4px"><h3>常设陈列<span class="hl"> ›</span></h3><span class="more">By Your Taste</span></div>' +
        '<div class="hscroll">' +
          guess.map(function (r) {
            return '<div class="mini-dish" data-act="detail" data-id="' + r.id + '">' +
              '<div class="art">' + window.ART.get(r.art) + '</div>' +
              '<div class="n">' + window.D.esc(r.name) + '</div>' +
              '<div class="m">' + window.D.esc(r.no || '') + ' · ' + stars(r.difficulty) + '</div>' +
            '</div>';
          }).join('') +
        '</div>' +

        '<div class="foot-note">做菜这事儿，第一步永远是决定吃什么。<br>已经有答案了就直接检索菜名。</div>';
    },

    actions: {
      draw: function () {
        if (loading) return;
        loading = true;
        window.Router.refresh();
        window.AI.drawToday(window.Store.get().prefs).then(function (r) {
          cur = r;
          loading = false;
          window.Router.refresh();
          window.D.toast('抽到「' + r.name + '」');
        });
      },

      detail: function (d) { window.Router.go('#/recipe/' + d.id); },
      cook: function (d) { window.Router.go('#/cook/' + d.id); },
      toSearch: function () { window.Router.go('#/discover'); },
      toPref: function () { window.Router.go('#/me'); },

      addList: function (d) {
        var r = window.findRecipe(d.id);
        if (!r) return;
        var n = window.Store.addToShopping(r.ingredients.concat(r.seasonings.map(function (s) {
          return { name: s.name, amount: s.amount, cat: '调料' };
        })), r.name);
        window.D.toast(n ? '已加入采集清单（' + n + ' 项）' : '清单里已经有了');
      }
    }
  };

  window.HomeView = HomeView;
})();
