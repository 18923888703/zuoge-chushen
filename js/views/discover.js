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

  function platformList() {
    if (plat === 'douyin') return ['douyin'];
    if (plat === 'xhs') return ['xhs'];
    return ['douyin', 'xhs'];
  }

  function card(v, i) {
    var pf = v.platform === 'douyin'
      ? '<span class="pf pf-dy">抖音</span>'
      : '<span class="pf pf-xhs">小红书</span>';
    return '<div class="arch">' +
      '<span class="cover">' + window.ART.get(v.art) +
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
      var body;

      if (!searched) {
        body = '<div class="empty">' + window.ART.get('empty') +
          '<p>检索一道菜，找到抖音和小红书的影像。<br>命中馆藏的可以直接配齐配料，<br>没命中的会告诉你，不做硬猜。</p></div>' +
          '<div class="pad"><div class="xs faint center">试试：红烧肉 / 番茄炒蛋 / 十分钟快手菜</div></div>';
      } else if (loading && !results.length) {
        body = '<div class="pad">' +
          '<div class="row" style="gap:8px;margin-bottom:12px">' + window.D.icon('sparkle', 'ic-sm') +
          '<span class="small muted">AI 正在检索「' + window.D.esc(q) + '」…</span></div>' +
          '<div class="sk sk-card"></div><div class="sk sk-card"></div><div class="sk sk-card"></div></div>';
      } else {
        body = (recs && recs.length ? '<div class="sec" style="margin:14px 18px 6px">' +
          '<h3>此菜流派做法<span class="hl"> ›</span></h3><span class="more">By Your Taste</span></div>' +
          '<div style="margin:0 18px 12px">' +
          recs[0].variations.map(function (x, i) {
            return '<div class="var-card' + (i === 0 ? ' on' : '') + '">' +
              '<div class="vh"><span class="vn">' + window.D.esc(recs[0].name) + ' · ' + window.D.esc(x.title) + '</span>' +
              (i === 0 ? '<span class="chip ochre">推荐</span>' : '') + '</div>' +
              '<div class="vd">' + window.D.esc(x.diff) + '</div></div>';
          }).join('') +
          '</div>' : '') +

          '<div class="sec" style="margin:6px 18px 8px">' +
          '<h3>检索到 ' + results.length + ' 份影像</h3>' +
          '<span class="more">' + (loading ? 'Searching…' : 'Click AI to Parse') + '</span></div>' +
          results.map(card).join('') +

          (parsing ? '<div class="parsed"><div class="ph">' + window.D.icon('sparkle', 'ic-sm') +
            '<span class="t">正在配上配料与工序…</span></div>' +
            '<div class="sk sk-line" style="width:80%"></div><div class="sk sk-line" style="width:65%"></div>' +
            '<div class="sk sk-line" style="width:72%"></div></div>' : '') +

          /* 没命中馆藏：诚实说明做不到，不再编一套通用模板 */
          (parsed && !parsed.matched ? '<div class="parsed">' +
            '<div class="ph">' + window.D.icon('warn', 'ic-sm') +
            '<span class="t">这道菜不在本馆馆藏里</span></div>' +
            '<div class="honest">' +
            '<p>我没法替你拆这份视频的内容 —— 配料和用量要跟着博主的手走，硬猜会误导你。</p>' +
            '<p>可以点「去平台看」直接看原视频，或者换个馆藏里有的菜名再搜一次。</p>' +
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
            '这份配料来自<b>本馆这道菜的著录</b>，不是从视频里提取的 —— 视频内容要跟着博主的手走，' +
            '请以原视频为准，这里的用量当作备料参考。' +
            '</div>' +
            '<div class="src">Matched · ' +
            (parsed.platform === 'douyin' ? '抖音' : '小红书') + ' / ' + window.D.esc(parsed.author) + '</div>' +
            '<div class="sec" style="margin:6px 0 4px"><h3 style="font-size:12.5px">配料与用量</h3></div>' +
            parsed.ingredients.map(function (i) {
              return '<div class="ing-row"><span class="cb on">' + window.D.icon('check') + '</span>' +
                '<span class="grow n">' + window.D.esc(i.name) + '</span>' +
                '<span class="a">' + window.D.esc(i.amount) + '</span></div>';
            }).join('') +
            '<div class="sec" style="margin:12px 0 4px"><h3 style="font-size:12.5px">工序</h3></div>' +
            parsed.steps.map(function (s, i) {
              return '<div class="step-item"><span class="step-no">' + (i + 1) + '</span>' +
                '<span class="grow"><span class="txt">' + window.D.esc(s.text) + '</span>' +
                (s.timer ? '<span class="tm">' + window.D.icon('timer', 'ic-sm') + window.D.esc(s.timer.label) + ' ' +
                  window.D.fmtDur(s.timer.seconds) + '</span>' : '') + '</span></div>';
            }).join('') +
            '<button class="btn btn-primary btn-block" style="margin-top:12px" data-act="addParsed">' +
              window.D.icon('basket', 'ic-sm') + '把这些加进采集清单</button>' +
            '</div>' : '');
      }

      return '<div class="page-head"><div class="t">文献检索</div>' +
        '<div class="s">Archive Search · 搜菜名找影像，命中馆藏的直接配齐配料</div></div>' +

        '<div class="search-bar">' +
          '<div class="field">' + window.D.icon('search', 'ic-sm') +
          '<input id="q" placeholder="想吃什么？比如：红烧肉" value="' + window.D.esc(q) + '" data-enter="search">' +
          '<button class="chip ochre" data-act="search">检索</button></div>' +
        '</div>' +

        '<div class="platforms">' +
          ['all', 'douyin', 'xhs'].map(function (p) {
            var label = p === 'all' ? '全部' : (p === 'douyin' ? '抖音' : '小红书');
            return '<button class="chip ' + (plat === p ? 'on' : 'plain') + '" data-act="plat" data-p="' + p + '">' + label + '</button>';
          }).join('') +
        '</div>' +

        body +
        '<div class="foot-note">影像卡片是检索结果入口，点击会跳到对应平台。<br>' +
          '配料来自本馆著录，不是从视频里提取 —— 请始终以原视频为准。</div>';
    },

    actions: {
      search: function () {
        var input = window.D.$('#q');
        var val = input ? input.value.trim() : '';
        q = val || q || '家常菜';
        loading = true; searched = true; results = []; recs = null; parsed = null; parseIdx = -1;
        window.Router.refresh();

        window.AI.findVideos(q, platformList(), function (batch) {
          results = results.concat(batch);
          window.Router.refresh();
        }).then(function () {
          loading = false;
          window.Router.refresh();
          return window.AI.recommend(q);
        }).then(function (list) {
          recs = list;
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
        var n = window.Store.addToShopping(parsed.ingredients, parsed.name + '（影像著录）');
        window.D.toast(n ? '已加入采集清单（' + n + ' 项）' : '清单里已经有了');
      }
    }
  };

  window.DiscoverView = DiscoverView;
})();
