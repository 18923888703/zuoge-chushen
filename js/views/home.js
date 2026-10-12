(function () {
  var cur = null;
  var loading = false;

  function today() {
    var d = new Date();
    var wk = ['日', '一', '二', '三', '四', '五', '六'][d.getDay()];
    var meal = d.getHours() < 10 ? '早饭' : (d.getHours() < 15 ? '午饭' : (d.getHours() < 21 ? '晚饭' : '夜宵'));
    return (d.getMonth() + 1) + '月' + d.getDate() + '日 · 星期' + wk + ' · ' + meal;
  }

  function level(n) {
    return ['简单', '还行', '费点事'][n - 1] || '还行';
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

  /* 抽到菜之后：操作区（图上只放名字，细节放白卡里） */
  function dishBody(r) {
    return '<div class="acts">' +
        '<button class="btn btn-primary" data-act="cook" data-id="' + r.id + '">现在开做</button>' +
        '<button class="btn" data-act="detail" data-id="' + r.id + '">看菜谱</button>' +
        '<button class="btn btn-ghost" data-act="addList" data-id="' + r.id + '" aria-label="加入买菜清单">' +
          window.D.icon('plus', 'ic-sm') + '</button>' +
      '</div>' +
      '<div class="meta">' +
        '<span class="chip ochre">' + (r.prep + r.cook) + ' 分钟</span>' +
        '<span class="chip brass">' + level(r.difficulty) + '</span>' +
        '<span class="chip slate">' + r.servings + ' 人份</span>' +
        '<span class="chip">' + window.D.esc(r.origin || '家常') + '</span>' +
      '</div>' +
      '<div class="reason">' + window.D.icon('note', 'ic-sm') +
        '<span>' + window.D.esc(reason(r)) + '</span></div>';
  }

  var HomeView = {
    render: function () {
      var prefs = window.Store.get().prefs;
      var spicyTxt = ['不吃辣', '微辣', '中辣', '重辣'][prefs.spicy];
      var oilTxt = prefs.oil === 'light' ? '少油' : (prefs.oil === 'rich' ? '不忌油' : '正常');

      /* 主图：抽到菜就用那道菜的照片，没抽就用一张默认菜图垫底，永远不满屏空着 */
      var heroSrc = cur ? window.DishPhoto.src(cur) : 'assets/dishes/tomato.jpg';

      /* 图上的标题区 */
      var heroCap;
      if (loading) {
        heroCap = '<div class="hero-q">正在替你挑…</div>' +
          '<div class="hero-sub">看口味、忌口和今天的时间</div>';
      } else if (cur) {
        heroCap = '<div class="hero-badges">' +
            '<span class="badge-no">' + window.D.esc(window.DishPhoto.no(cur)) + '</span>' +
            '<span class="badge-kind">' + window.D.esc(cur.kind || '家常') + '</span>' +
            '<span class="badge-kind">' + window.D.esc(cur.season || '四季') + '</span>' +
          '</div>' +
          '<div class="hero-q">' + window.D.esc(cur.name) + '</div>' +
          '<div class="hero-sub">' + window.D.esc(cur.tagline) + '</div>';
      } else {
        heroCap = '<div class="hero-q">今天<em>做</em>什么吃？</div>' +
          '<div class="hero-sub">不知道吃什么、缺什么、怎么下手，搭子替你拿主意</div>';
      }

      /* 白卡里的下半部分 */
      var panel;
      if (loading) {
        panel = '<div class="sk sk-card"></div>' +
          '<div class="sk sk-line" style="width:58%"></div>' +
          '<div class="sk sk-line" style="width:44%"></div>';
      } else if (cur) {
        panel = dishBody(cur);
      } else {
        panel = '<div class="empty">' + window.D.icon('chef', 'ic-lg') +
          '<p>灶台上还空着。<br>点下面那块牌子，让搭子替你定。</p></div>';
      }

      var guess = window.RECIPES.filter(function (r) { return !cur || r.id !== cur.id; }).slice(0, 6);
      var meal = today().split(' · ').pop();

      return '' +
        /* ---------- 满屏主图 ---------- */
        '<div class="home-hero">' +
          '<img class="hero-img" src="' + heroSrc + '" alt="">' +
          '<div class="hero-scrim"></div>' +
          '<div class="hero-bar">' +
            window.Brand.logo('light') +
            '<span class="grow"></span>' +
            '<span class="hero-chip">' + meal + ' · ' + prefs.people + ' 人</span>' +
          '</div>' +
          '<div class="hero-cap">' + heroCap + '</div>' +
        '</div>' +

        /* ---------- 叠在图片上的白色功能卡 ---------- */
        '<div class="home-panel">' +
          '<div class="pad">' +
            '<div class="field" data-act="toSearch">' +
              window.D.icon('search', 'ic-sm') +
              '<span class="muted small">搜菜名，或者冰箱里剩下的食材</span>' +
              '<span class="chip ochre" style="height:22px">去找</span>' +
            '</div>' +
          '</div>' +

          '<div class="cabinet' + (loading ? ' shaking' : '') + '" data-act="draw">' +
            '<div class="tube">' + window.D.icon('chef', 'ic-lg') + '</div>' +
            '<div class="info">' +
              '<div class="q">' + (loading ? '搭子正在翻冰箱…' : '还是没想好？让它替你定') + '</div>' +
              '<div class="sub">会看你的口味、忌口和人数来挑</div>' +
            '</div>' +
            '<span class="go">帮我挑</span>' +
          '</div>' +

          '<div class="pad">' + panel + '</div>' +

          '<div class="pref-strip">' +
            '<span class="chip">' + spicyTxt + '</span>' +
            '<span class="chip ochre">' + oilTxt + '</span>' +
            '<span class="chip brass">' + prefs.people + ' 人吃饭</span>' +
            (prefs.avoid.length ? prefs.avoid.map(function (a) { return '<span class="chip red">忌 ' + window.D.esc(a) + '</span>'; }).join('') : '') +
            '<button class="chip plain" data-act="toPref">调整口味</button>' +
          '</div>' +
        '</div>' +

        '<div class="sec" style="margin:20px 18px 4px"><h3>照你的口味<span class="hl"> ›</span></h3><span class="more">合你胃口的那几道</span></div>' +
        '<div class="hscroll">' +
          guess.map(function (r) {
            return '<div class="mini-dish" data-act="detail" data-id="' + r.id + '">' +
              '<div class="ph">' + window.DishPhoto.html(r) + '</div>' +
              '<div class="b">' +
                '<div class="n">' + window.D.esc(r.name) + '</div>' +
                '<div class="m">' + (r.prep + r.cook) + ' 分钟 · ' + level(r.difficulty) + '</div>' +
              '</div>' +
            '</div>';
          }).join('') +
        '</div>' +

        '<div class="foot-note">做菜这事儿，最难的是决定吃什么。<br>心里有答案了就直接搜菜名。</div>';
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
          window.D.toast('今晚就吃「' + r.name + '」');
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
        window.D.toast(n ? '已加进买菜清单（' + n + ' 样）' : '清单里已经有了');
      }
    }
  };

  window.HomeView = HomeView;
})();
