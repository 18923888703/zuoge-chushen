(function () {
  var q = '';
  var plat = 'all';
  var loading = false;
  var results = [];
  var recs = null;
  var parsed = null;
  var parsing = false;
  var parseIdx = -1;
  var searched = false;
  var more = [];

  var QUICK = ['红烧肉', '番茄炒蛋', '快手菜', '川菜', '汤', '鸡蛋'];

  function platformList() {
    if (plat === 'douyin') return ['douyin'];
    if (plat === 'xhs') return ['xhs'];
    return ['douyin', 'xhs'];
  }

  function level(n) {
    return ['简单', '还行', '费点事'][n - 1] || '还行';
  }

  /* ---------- 菜谱结果卡：点整张进做法详情页 ---------- */
  function dishCard(r) {
    return '<div class="dish-card" data-act="detail" data-id="' + r.id + '">' +
      '<div class="ph">' + window.DishPhoto.html(r) + '</div>' +
      '<div class="b">' +
        '<div class="n">' + window.D.esc(r.name) + '</div>' +
        '<div class="m">' + window.D.esc(window.DishPhoto.no(r)) + ' · ' +
          window.D.esc(r.origin || '家常') + '</div>' +
        '<div class="tl">' + window.D.esc(r.tagline) + '</div>' +
        '<div class="tags">' +
          '<span class="chip ochre">' + (r.prep + r.cook) + ' 分钟</span>' +
          '<span class="chip brass">' + level(r.difficulty) + '</span>' +
          '<span class="chip slate">' + r.steps.length + ' 步</span>' +
        '</div>' +
      '</div>' +
      window.D.icon('right', 'ic-sm') +
    '</div>';
  }

  function videoCard(v, i) {
    var pf = v.platform === 'douyin'
      ? '<span class="pf pf-dy">抖音</span>'
      : '<span class="pf pf-xhs">小红书</span>';
    return '<div class="arch">' +
      '<span class="cover dish-cover">' +
          (function () {
            var vr = v.recipeId ? window.findRecipe(v.recipeId) : null;
            return vr ? window.DishPhoto.html(vr) : '<span class="cover-blank">' + window.D.icon('play', 'ic') + '</span>';
          })() +
        '<span class="dur">' + window.D.esc(v.dur) + '</span></span>' +
      '<span class="grow">' +
        '<span class="vt">' + window.D.esc(v.title) + '</span>' +
        '<span class="vm">' + pf + '<span>' + window.D.esc(v.author) + '</span>' +
        '<span>' + window.D.esc(v.plays) + ' 播放</span></span>' +
        '<span class="ops">' +
          '<button class="chip ' + (parseIdx === i ? 'ochre' : 'plain') + '" data-act="parse" data-i="' + i + '">' +
            window.D.icon('sparkle', 'ic-sm') + (parseIdx === i ? '已展开' : '配齐这道菜') + '</button>' +
          '<a class="chip plain" href="' + v.url + '" target="_blank" rel="noopener">去平台看</a>' +
        '</span>' +
      '</span>' +
    '</div>';
  }

  var DiscoverView = {
    render: function () {
      var head = '<div class="page-head">' +
          '<div class="t">找菜谱</div>' +
          '<div class="s">搜菜名，或者冰箱里剩下的食材 —— 点开就有完整做法</div>' +
        '</div>' +
        '<div class="search-bar">' +
          '<div class="field">' + window.D.icon('search', 'ic-sm') +
          '<input id="q" placeholder="想吃什么？比如：红烧肉" value="' + window.D.esc(q) + '" data-enter="search">' +
          '<button class="chip ochre" data-act="search">搜索</button></div>' +
        '</div>';

      /* ---------- 还没搜：给几个入口词，别空着 ---------- */
      if (!searched) {
        return head +
          '<div class="sec"><h3>大家常搜</h3></div>' +
          '<div style="padding:0 18px"><div class="opts">' +
            QUICK.map(function (k) {
              return '<button class="chip plain" data-act="quick" data-v="' + window.D.esc(k) + '">' +
                window.D.esc(k) + '</button>';
            }).join('') +
          '</div></div>' +
          '<div class="empty">' + window.D.icon('search', 'ic-lg') +
          '<p>搜菜名、口味，或者冰箱里剩下的那样食材。<br>命中菜谱库的直接给你完整做法。</p></div>';
      }

      /* ---------- 菜谱结果：主结果 ---------- */
      var dishBlock;
      if (loading && !recs) {
        dishBlock = '<div class="sec"><h3>正在找…</h3></div>' +
          '<div style="padding:0 18px"><div class="sk sk-card"></div><div class="sk sk-card"></div>' +
          '<div class="sk sk-card"></div></div>';
      } else if (recs && recs.length) {
        dishBlock = '<div class="sec"><h3>找到 ' + recs.length + ' 道菜</h3>' +
          '<span class="more">点开就有分步做法</span></div>' +
          '<div class="dish-list">' + recs.map(dishCard).join('') + '</div>' +
          /* 命中太少时补几道，别让结果页空荡荡 */
          (more.length ? '<div class="sec tight"><h3>顺手看看</h3>' +
            '<span class="more">本馆里的同路菜</span></div>' +
            '<div class="dish-list">' + more.map(dishCard).join('') + '</div>' : '');
      } else {
        dishBlock = '<div class="empty">' + window.D.icon('note', 'ic-lg') +
          '<p>菜谱里没有「' + window.D.esc(q) + '」。<br>换个菜名，或者直接搜手里有的食材。</p></div>' +
          '<div style="padding:0 18px"><div class="opts">' +
            QUICK.map(function (k) {
              return '<button class="chip plain" data-act="quick" data-v="' + window.D.esc(k) + '">' +
                window.D.esc(k) + '</button>';
            }).join('') + '</div></div>';
      }

      /* ---------- 视频：次要补充，放在菜谱后面 ---------- */
      var videoBlock = '';
      if (results.length) {
        videoBlock = '<div class="sec tight"><h3>看别人怎么做</h3>' +
          '<span class="more">视频与图文</span></div>' +
          '<div class="platforms">' +
            ['all', 'douyin', 'xhs'].map(function (p) {
              var label = p === 'all' ? '全部' : (p === 'douyin' ? '抖音' : '小红书');
              return '<button class="chip ' + (plat === p ? 'on' : 'plain') + '" data-act="plat" data-p="' + p + '">' + label + '</button>';
            }).join('') +
          '</div>' +
          results.map(videoCard).join('') +

          (parsing ? '<div class="parsed"><div class="ph">' + window.D.icon('sparkle', 'ic-sm') +
            '<span class="t">正在配上配料与工序…</span></div>' +
            '<div class="sk sk-line" style="width:80%"></div><div class="sk sk-line" style="width:65%"></div>' +
            '<div class="sk sk-line" style="width:72%"></div></div>' : '') +

          /* 没命中菜谱库：诚实说明做不到，不再编一套通用模板 */
          (parsed && !parsed.matched ? '<div class="parsed">' +
            '<div class="ph">' + window.D.icon('warn', 'ic-sm') +
            '<span class="t">这道菜不在现有菜谱里</span></div>' +
            '<div class="honest">' +
            '<p>我没法替你拆这份视频的内容 —— 配料和用量要跟着博主的手走，硬猜会误导你。</p>' +
            '<p>可以点「去平台看」直接看原视频，或者换个菜谱里有的菜名再搜一次。</p>' +
            '</div>' +
            '<a class="btn btn-primary btn-block" style="margin-top:12px" href="' +
              (results[parseIdx] ? results[parseIdx].url : '#') + '" target="_blank" rel="noopener">' +
              window.D.icon('play', 'ic-sm') + '去 ' +
              (parsed.platform === 'douyin' ? '抖音' : '小红书') + '看原视频</a>' +
            '</div>' : '') +

          (parsed && parsed.matched ? '<div class="parsed">' +
            '<div class="ph">' + window.D.icon('sparkle', 'ic-sm') +
            '<span class="t">参考配料 · ' + window.D.esc(parsed.name) + '</span></div>' +
            '<div class="honest">' +
            '这份配料来自<b>这道菜在菜谱里的数据</b>，不是从视频里提取的 —— 视频内容要跟着博主的手走，' +
            '请以原视频为准，这里的用量当作备料参考。' +
            '</div>' +
            '<div class="src">Matched · ' +
            (parsed.platform === 'douyin' ? '抖音' : '小红书') + ' / ' + window.D.esc(parsed.author) + '</div>' +
            '<div class="sec sub"><h3>配料与用量</h3></div>' +
            parsed.ingredients.map(function (i) {
              return '<div class="ing-row"><span class="cb on">' + window.D.icon('check') + '</span>' +
                '<span class="grow n">' + window.D.esc(i.name) + '</span>' +
                '<span class="a">' + window.D.esc(i.amount) + '</span></div>';
            }).join('') +
            '<div class="sec sub"><h3>工序</h3></div>' +
            parsed.steps.map(function (s, i) {
              return '<div class="step-item"><span class="step-no">' + (i + 1) + '</span>' +
                '<span class="grow"><span class="txt">' + window.D.esc(s.text) + '</span>' +
                (s.timer ? '<span class="tm">' + window.D.icon('timer', 'ic-sm') + window.D.esc(s.timer.label) + ' ' +
                  window.D.fmtDur(s.timer.seconds) + '</span>' : '') + '</span></div>';
            }).join('') +
            '<button class="btn btn-primary btn-block" style="margin-top:12px" data-act="addParsed">' +
              window.D.icon('basket', 'ic-sm') + '把这些加进买菜清单</button>' +
            '</div>' : '');
      }

      return head + dishBlock + videoBlock +
        '<div class="foot-note">菜谱来自本馆 100 道菜的做法数据；视频卡片跳到对应平台，' +
          '配料仅供参考，请以原视频为准。</div>';
    },

    actions: {
      /* 点菜谱卡 → 做法详情页（完整教程） */
      detail: function (d) { window.Router.go('#/recipe/' + d.id); },

      quick: function (d) {
        q = d.v;
        DiscoverView.actions.search();
      },

      search: function () {
        var input = window.D.$('#q');
        var val = input ? input.value.trim() : '';
        q = val || q || '';
        if (!q) { window.D.toast('写个菜名或食材'); return; }
        loading = true; searched = true; results = []; recs = null; more = []; parsed = null; parseIdx = -1;
        window.Router.refresh();

        window.AI.recommend(q).then(function (list) {
          recs = list || [];
          if (recs.length < 4) {
            var ids = recs.map(function (r) { return r.id; });
            more = (window.RECIPES || []).filter(function (r) {
              return ids.indexOf(r.id) < 0;
            }).slice(0, 4 - recs.length);
          }
          window.Router.refresh();
        });

        window.AI.findVideos(q, platformList(), function (batch) {
          results = results.concat(batch);
          window.Router.refresh();
        }).then(function () {
          loading = false;
          window.Router.refresh();
        });
      },

      plat: function (d) {
        plat = d.p;
        window.Router.refresh();
        if (searched) DiscoverView.actions.search();
      },

      parse: function (d) {
        var i = parseInt(d.i, 10);
        var v = results[i];
        if (!v) return;
        parseIdx = i; parsing = true; parsed = null;
        window.Router.refresh();
        window.AI.parseVideo(v).then(function (p) {
          parsed = p; parsing = false;
          window.Router.refresh();
        });
      },

      addParsed: function () {
        if (!parsed || !parsed.matched) return;
        var n = window.Store.addToShopping(parsed.ingredients, parsed.name + '（视频菜谱数据）');
        window.D.toast(n ? '已加入买菜清单（' + n + ' 项）' : '清单里已经有了');
      }
    }
  };

  window.DiscoverView = DiscoverView;
})();
