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

  /* （旧 dishBody 已并入一体化抽签卡 .dcard） */


  var HomeView = {
    render: function () {
      var prefs = window.Store.get().prefs;
      var spicyTxt = ['不吃辣', '微辣', '中辣', '重辣'][prefs.spicy];
      var oilTxt = prefs.oil === 'light' ? '少油' : (prefs.oil === 'rich' ? '不忌油' : '正常');

      /* 开场插画：水彩蔬菜装饰带（固定素材） */
      var heroSrc = 'assets/illust/ill-top.jpg';

      /* 顶部只留装饰带；标题、抽签、结果全部放进白卡，一屏就能操作 */

      /* ---------- 抽一抽：一体化卡片 ----------
         卡片本身就是结果：未抽是入口，抽中后整张卡变成那道菜，
         操作与「换一道」都在卡上，不再拆成两块。 */
      var card;
      if (loading) {
        card = '<div class="dcard shaking">' +
            '<div class="dc-cover idle">' +
              '<span class="dc-mark">' + window.D.icon('chef', 'ic-lg') + '</span>' +
              '<div class="dc-name">正在替你抽…</div>' +
            '</div>' +
            '<div class="dc-body">' +
              '<div class="dc-tl">看口味、忌口和今天的时间</div>' +
              '<button class="dc-btn" data-act="draw" disabled>抽一抽</button>' +
            '</div>' +
          '</div>';
      } else if (cur) {
        /* 整张卡就是这道菜的入口：点卡片任意处 → 菜谱详情（做法步骤） */
        card = '<div class="dcard" data-act="detail" data-id="' + cur.id + '" role="button" tabindex="0">' +
            '<div class="dc-cover">' +
              '<img class="dc-img" src="' + window.DishPhoto.src(cur) + '" alt="' + window.D.esc(cur.name) + '">' +
              '<div class="dc-veil"></div>' +
              '<span class="dc-no">' + window.D.esc(window.DishPhoto.no(cur)) + '</span>' +
              '<span class="dc-go">看做法 ›</span>' +
              '<div class="dc-name">' + window.D.esc(cur.name) + '</div>' +
            '</div>' +
            '<div class="dc-body">' +
              '<div class="dc-tl">' + window.D.esc(cur.tagline) + '</div>' +
              '<div class="dc-meta">' +
                '<span class="chip ochre">' + (cur.prep + cur.cook) + ' 分钟</span>' +
                '<span class="chip brass">' + level(cur.difficulty) + '</span>' +
                '<span class="chip slate">' + cur.servings + ' 人份</span>' +
                '<span class="chip">' + window.D.esc(cur.origin || '家常') + '</span>' +
              '</div>' +
              '<div class="dc-why">' + window.D.esc(reason(cur)) + '</div>' +
              '<div class="dc-acts">' +
                '<button class="btn btn-primary" data-act="cook" data-id="' + cur.id + '">现在开做</button>' +
                '<button class="btn btn-ghost" data-act="addList" data-id="' + cur.id + '" aria-label="加入买菜清单">' +
                  window.D.icon('plus', 'ic-sm') + '</button>' +
              '</div>' +
              '<div class="dc-foot">' +
                '<span class="dc-hint">这一道不合意？</span>' +
                '<button class="dc-swap" data-act="draw">换一道</button>' +
              '</div>' +
            '</div>' +
          '</div>';
      } else {
        card = '<div class="dcard">' +
            '<div class="dc-cover idle">' +
              '<span class="dc-mark">' + window.D.icon('chef', 'ic-lg') + '</span>' +
              '<div class="dc-name">今天吃什么？</div>' +
            '</div>' +
            '<div class="dc-body">' +
              '<div class="dc-tl">按你的口味、忌口和人数，随机挑一道</div>' +
              '<button class="dc-btn" data-act="draw">抽一抽</button>' +
            '</div>' +
          '</div>';
      }

      var guess = window.RECIPES.filter(function (r) { return !cur || r.id !== cur.id; }).slice(0, 6);
      var meal = today().split(' · ').pop();

      var heroCls = 'home-hero';
      var topRight = '<span class="hero-chip">' + meal + ' · ' + prefs.people + ' 人</span>';

      return '' +
        /* ---------- 水彩插画装饰带 ---------- */
        '<div class="' + heroCls + '">' +
          '<img class="hero-img" src="' + heroSrc + '" alt="">' +
          '<div class="hero-scrim"></div>' +
          '<div class="hero-bar">' + topRight + '</div>' +
          '<div class="hero-cap">' + window.Brand.logo('', { size: 30 }) + '</div>' +
        '</div>' +

        /* ---------- 白卡：搜索 → 一体化抽签卡 → 口味 ---------- */
        '<div class="home-panel">' +
          '<div class="pad">' +
            '<div class="field" data-act="toSearch">' +
              window.D.icon('search', 'ic-sm') +
              '<span class="muted small">搜菜名，或者冰箱里剩下的食材</span>' +
              '<span class="chip ochre" style="height:22px">去找</span>' +
            '</div>' +
          '</div>' +

          '<div class="pad" style="margin-top:14px">' + card + '</div>' +

          '<div class="pref-strip">' +
            '<span class="chip">' + spicyTxt + '</span>' +
            '<span class="chip ochre">' + oilTxt + '</span>' +
            '<span class="chip brass">' + prefs.people + ' 人吃饭</span>' +
            (prefs.avoid.length ? prefs.avoid.map(function (a) { return '<span class="chip red">忌 ' + window.D.esc(a) + '</span>'; }).join('') : '') +
            '<button class="chip plain" data-act="toPref">调整口味</button>' +
          '</div>' +
        '</div>' +

        '<div class="sec"><h3>照你的口味</h3><span class="more">合你胃口的那几道</span></div>' +
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

        '<img class="ill-corner" src="assets/illust/ill-corner-full.jpg" alt="">' +
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
