(function () {
  /* 首页 = 一段对话：你说一句，搭子回一道菜。
     对话历史存在模块里，切 tab 回来不丢；重进页面清空。 */
  var msgs = [];
  var draft = '';
  var busy = false;

  var TIME_RE = /(\d+)\s*(?:分钟|分|min)/;
  var ANY_RE = /随便|都行|不知道|帮我定|帮我选|帮我挑|来一[个道份]|抽一|换个|决定/;
  var ASK_RE = /为什么|干嘛|作用|管什么|区别|不同|代替|替代|怎么办|咋办|行不行|可以吗|能不能|多久|几分|多久能|熟没熟|熟了吗|咸|淡了|太淡|太咸|放多少|什么是|坏了吗|保存|区分/;

  function total(r) { return r.prep + r.cook; }

  function level(n) {
    return ['简单', '还行', '费点事'][n - 1] || '还行';
  }

  function mealOf() {
    var h = new Date().getHours();
    return h < 10 ? '早饭' : (h < 15 ? '午饭' : (h < 21 ? '晚饭' : '夜宵'));
  }

  function greet() {
    var h = new Date().getHours();
    return h < 10 ? '早上好' : (h < 15 ? '中午好' : (h < 21 ? '晚上好' : '夜深了'));
  }

  function today() {
    var d = new Date();
    var wk = ['日', '一', '二', '三', '四', '五', '六'][d.getDay()];
    return (d.getMonth() + 1) + '月' + d.getDate() + '日 · 星期' + wk;
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

  /* ---------- 意图：先判断该「答疑」还是「推荐菜」 ---------- */
  function askish(q) {
    if (ANY_RE.test(q)) return false;          /* 「随便来一个」是点菜，不是提问 */
    return ASK_RE.test(q);
  }

  /* 按话里的时间 / 口味再筛一遍；筛没了就照原样推荐 */
  function refine(list, q) {
    var out = list.slice();
    var m = q.match(TIME_RE);
    if (m) {
      var t = parseInt(m[1], 10);
      var f = out.filter(function (r) { return total(r) <= t; });
      if (f.length) out = f;
    }
    if (/清淡|少油|健康|素一点|不长胖/.test(q)) {
      var g = out.filter(function (r) { return /清淡|健康|素菜/.test(r.flavors.join('')); });
      if (g.length) out = g;
    }
    if (/辣|重口|下饭/.test(q)) {
      var s = out.filter(function (r) { return /辣|重口|下饭/.test(r.flavors.join('')); });
      if (s.length) out = s;
    }
    return out;
  }

  /* 搭子开口的第一句：跟这道菜和这句话都对得上 */
  function leadFor(q, r) {
    var named = window.RECIPES.filter(function (x) {
      return r.id !== x.id && q.indexOf(x.name) >= 0;
    })[0];
    if (named && named.id === r.id) return '「' + r.name + '」在这儿，照着做就行。';
    if (/家里有|冰箱里有|只剩下|还有/.test(q)) return '用你手边这些就能做 —— 这道最顺手。';
    var m = q.match(TIME_RE);
    if (m) return '要 ' + m[1] + ' 分钟以内搞定，这道 ' + total(r) + ' 分钟能上桌。';
    if (/清淡|少油|健康|不长胖/.test(q)) return '想吃得清爽，这道合适。';
    if (/辣|重口|下饭/.test(q)) return '想吃点带劲的 —— 这道够味。';
    if (/汤/.test(q)) return '想喝汤的话，这道趁热最好。';
    if (/随便|都行|不知道|帮我定|帮我选|来一|抽一/.test(q)) return '替你定了：就这道吧。';
    if (named) return '你想的是「' + named.name + '」，这道最接近。';
    return '这道合你的口味 ——';
  }

  /* ---------- 快捷提问：把最常见的话摆出来，省得打字 ---------- */
  function quicks() {
    var p = window.Store.get().prefs;
    /* 第一颗是动作按钮（贴视频），其余是话 */
    var list = [{ act: 'paste', label: '粘贴视频链接' }];
    ['帮我随便定一道', '30 分钟以内', '清淡一点'].forEach(function (q) {
      list.push({ act: 'ask', label: q, q: q });
    });
    list.push({ act: 'ask', label: p.spicy >= 2 ? '想吃辣的' : '不太能吃辣', q: p.spicy >= 2 ? '想吃辣的' : '不太能吃辣' });
    var f = window.Store.get().fridge || [];
    var fq = f.length ? '冰箱里有' + f[0] : '家里有鸡蛋';
    list.push({ act: 'ask', label: fq, q: fq });
    var pq = p.people + '个人吃点儿啥';
    list.push({ act: 'ask', label: pq, q: pq });
    return list;
  }

  /* ---------- 一张菜卡（对话里的回答主体） ---------- */
  function dishCard(r) {
    return '<div class="dcard" data-act="detail" data-id="' + r.id + '" role="button" tabindex="0">' +
        '<div class="dc-cover">' +
          '<img class="dc-img" src="' + window.DishPhoto.src(r) + '" alt="' + window.D.esc(r.name) + '">' +
          '<div class="dc-veil"></div>' +
          '<span class="dc-no">' + window.D.esc(window.DishPhoto.no(r)) + '</span>' +
          '<span class="dc-go">看做法 ›</span>' +
          '<div class="dc-name">' + window.D.esc(r.name) + '</div>' +
        '</div>' +
        '<div class="dc-body">' +
          '<div class="dc-tl">' + window.D.esc(r.tagline) + '</div>' +
          '<div class="dc-meta">' +
            '<span class="chip ochre">' + total(r) + ' 分钟</span>' +
            '<span class="chip brass">' + level(r.difficulty) + '</span>' +
            '<span class="chip slate">' + r.servings + ' 人份</span>' +
            '<span class="chip">' + window.D.esc(r.origin || '家常') + '</span>' +
          '</div>' +
          '<div class="dc-why">' + window.D.esc(reason(r)) + '</div>' +
          '<div class="dc-acts">' +
            '<button class="btn btn-primary" data-act="cook" data-id="' + r.id + '">现在开做</button>' +
            '<button class="btn btn-ghost" data-act="addList" data-id="' + r.id + '" aria-label="加入买菜清单">' +
              window.D.icon('plus', 'ic-sm') + '</button>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function byId(id) { return window.findRecipe(id); }

  /* ---------- 视频拆解：别人分享来的视频，拆成照着能做的版本 ---------- */
  /* 原型里拿不到视频画面，能用的只有分享文案的标题，所以一切依据都写在卡片上 */
  function totalOf(r) { return r.prep + r.cook; }

  function stepRow(s, i) {
    return '<div class="vstep">' +
        '<span class="i">' + (i + 1) + '</span>' +
        '<div class="x">' + window.D.esc(s.text) +
          (s.timer ? '<span class="vt">' + window.D.icon('timer', 'ic-sm') +
            window.D.esc(s.timer.label) + ' ' + window.D.fmtDur(s.timer.seconds) + '</span>' : '') +
          (s.tip ? '<span class="vtip">' + window.D.esc(s.tip) + '</span>' : '') +
        '</div>' +
      '</div>';
  }

  function videoCard(m, i) {
    var p = m.plan;
    var r = p.dish ? byId(p.dish.id) : null;
    var all = r ? r.steps : [];
    var shown = m.open ? all : all.slice(0, 3);

    return '<div class="vcard">' +
        '<div class="vhead">' +
          '<span class="vplat">' + window.D.esc(p.platformName || '视频') + '</span>' +
          '<span class="vtitle">' + (p.title ? window.D.esc(p.title) : '（这条分享没写标题）') + '</span>' +
        '</div>' +
        '<div class="vbody">' +

          (r ?
            '<div class="vdish">' + window.D.esc(r.name) +
              (p.dish.confidence === 'fuzzy' ? '<span class="vguess">照「' +
                window.D.esc(p.dish.keyword) + '」猜的</span>' : '') +
            '</div>' +
            '<div class="vsec">' + window.D.esc(r.tagline || '') + '</div>' +
            '<div class="vmeta">' +
              '<span class="chip ochre">' + totalOf(r) + ' 分钟</span>' +
              '<span class="chip brass">' + ['简单', '还行', '费点事'][r.difficulty - 1] + '</span>' +
              '<span class="chip slate">' + r.servings + ' 人份</span>' +
              '<span class="chip">' + all.length + ' 步</span>' +
            '</div>' +

            '<div class="vlabel">配料（' + (r.ingredients.length + r.seasonings.length) + ' 样）</div>' +
            '<div class="vings">' +
              r.ingredients.concat(r.seasonings).map(function (x) {
                return '<span class="chip plain">' + window.D.esc(x.name) + ' ' +
                  window.D.esc(x.amount) + '</span>';
              }).join('') +
            '</div>' +

            '<div class="vlabel">步骤</div>' +
            '<div class="vsteps">' + shown.map(stepRow).join('') + '</div>' +
            (all.length > 3 ?
              '<button class="vmore" data-act="toggleShare" data-i="' + i + '">' +
                (m.open ? '收起' : '展开剩下 ' + (all.length - 3) + ' 步') + '</button>' : '') +

            '<div class="vacts">' +
              '<button class="btn btn-primary" data-act="cook" data-id="' + r.id + '">现在开做</button>' +
              '<button class="btn" data-act="detail" data-id="' + r.id + '">看菜谱</button>' +
              '<button class="btn btn-ghost" data-act="addList" data-id="' + r.id + '" aria-label="加入买菜清单">' +
                window.D.icon('plus', 'ic-sm') + '</button>' +
            '</div>'
            :

            '<div class="vmiss">' +
              (p.title
                ? '标题是《' + p.title + '》，我的菜谱库里没有同名这道菜。'
                : '这条分享里没写明是哪道菜。') +
            '</div>' +
            (p.near.length ?
              '<div class="vlabel">库里最接近的几道</div>' +
              '<div class="vings">' + p.near.map(function (x) {
                return '<button class="chip" data-act="detail" data-id="' + x.id + '">' +
                  window.D.esc(x.name) + '</button>';
              }).join('') + '</div>' : '') +
            '<div class="vmiss ask">再告诉我一句 —— 视频里主料是什么、大概几步，我照着给你配。</div>'
          ) +

          '<div class="vnote">' + window.D.icon('sparkle', 'ic-sm') + ' ' + window.D.esc(p.note) + '</div>' +
        '</div>' +
      '</div>';
  }

  /* 分享进来的那一句：长文案收成一行，别把对话撑爆 */
  function shareSummary(p) {
    if (!p.title) return '帮我拆解这个' + (p.platformName || '') + '视频';
    return '帮我拆解这个' + (p.platformName || '') + '视频：' + p.title;
  }

  /* ---------- 消息 → HTML ---------- */
  function msgHtml(m, i) {
    if (m.who === 'me') {
      return '<div class="bubble me">' + window.D.esc(m.text) +
        (m.share ? '<div class="mshare">' + window.D.icon('play', 'ic-sm') +
          window.D.esc('来自 ' + m.share.platformName) + '</div>' : '') +
        '</div>';
    }
    if (m.kind === 'thinking') {
      return '<div class="bubble ai"><div class="who">厨房搭子</div>' +
        '<span class="dots"><i></i><i></i><i></i></span></div>';
    }
    if (m.kind === 'text') {
      return '<div class="bubble ai" id="m' + i + '"><div class="who">厨房搭子</div>' +
        '<span class="t">' + window.D.esc(m.text) + '</span>' +
        (m.typing ? '<span class="caret"></span>' : '') + '</div>';
    }
    if (m.kind === 'share') {
      return '<div class="bubble ai wide" id="m' + i + '">' +
          '<div class="who">厨房搭子</div>' +
          '<div class="lead">' + window.D.esc(m.say) + '</div>' +
          videoCard(m, i) +
        '</div>';
    }
    if (m.kind === 'dishes') {
      var ids = m.ids || [];
      var r = byId(ids[m.ptr || 0]);
      if (!r) return '';
      var others = ids.filter(function (id) { return id !== r.id; }).slice(0, 3);
      return '<div class="bubble ai wide" id="m' + i + '">' +
          '<div class="who">厨房搭子</div>' +
          '<div class="lead">' + window.D.esc(m.say) + '</div>' +
          dishCard(r) +
          '<div class="rend">' +
            '<button class="chip plain" data-act="reroll" data-i="' + i + '">' +
              window.D.icon('refresh', 'ic-sm') + '换一个</button>' +
            (others.length ? '<span class="xs faint">也可以：</span>' : '') +
            others.map(function (id) {
              var x = byId(id);
              return x ? '<button class="chip" data-act="detail" data-id="' + x.id + '">' +
                window.D.esc(x.name) + '</button>' : '';
            }).join('') +
          '</div>' +
        '</div>';
    }
    return '';
  }

  function scrollDown() {
    var v = window.D.$('#view');
    if (v) v.scrollTop = v.scrollHeight;
  }

  var HomeView = {
    render: function () {
      var prefs = window.Store.get().prefs;
      var spicyTxt = ['不吃辣', '微辣', '中辣', '重辣'][prefs.spicy];
      var oilTxt = prefs.oil === 'light' ? '少油' : (prefs.oil === 'rich' ? '不忌油' : '正常');

      /* 开场：装饰带压矮，把位置让给对话 */
      var hero =
        '<div class="home-hero compact">' +
          '<img class="hero-img" src="assets/illust/ill-top.jpg" alt="">' +
          '<div class="hero-scrim"></div>' +
          '<div class="hero-bar">' +
            '<span class="hero-chip">' + mealOf() + ' · ' + today() + '</span>' +
          '</div>' +
          '<div class="hero-cap">' + window.Brand.logo('', { size: 30 }) + '</div>' +
        '</div>';

      /* 对话开场始终在第一行 */
      var opening = '<div class="bubble ai wide">' +
          '<div class="who">厨房搭子</div>' +
          '<div class="lead">' + greet() + '，' + mealOf() + '想好吃什么了吗？<br>' +
            '说一句就行，比如「家里有土豆，20 分钟搞定」；刷到抖音/小红书的菜视频，' +
            '也可以直接分享过来或把链接贴给我，我帮你拆成配料和步骤。' +
            '我会按你记的口味挑：' + spicyTxt + ' · ' + oilTxt + ' · ' + prefs.people + ' 人。</div>' +
        '</div>';

      /* 没对话时给一组照口味排的候选，聊起来之后不再出现 */
      var fresh = !msgs.length;
      var guess = fresh ? window.RECIPES.slice().sort(function (a, b) {
        return (a.difficulty - b.difficulty);
      }).slice(0, 6) : [];

      var stream =
        opening +
        msgs.map(msgHtml).join('') +
        (fresh && guess.length ?
          '<div class="chat-say xs faint">合你胃口的这几道，点开就能看做法</div>' +
          '<div class="hscroll">' + guess.map(function (r) {
            return '<div class="mini-dish" data-act="detail" data-id="' + r.id + '">' +
              '<div class="ph">' + window.DishPhoto.html(r) + '</div>' +
              '<div class="b"><div class="n">' + window.D.esc(r.name) + '</div>' +
              '<div class="m">' + total(r) + ' 分钟 · ' + level(r.difficulty) + '</div></div>' +
            '</div>';
          }).join('') + '</div>'
          : '');

      var dock =
        '<div class="hdock">' +
          '<div class="hquick">' +
            '<div class="hquick-track">' +
              quicks().map(function (q) {
                return q.act === 'paste'
                  ? '<button class="chip plain vpaste" data-act="paste">' +
                      window.D.icon('link', 'ic-sm') + window.D.esc(q.label) + '</button>'
                  : '<button class="chip plain" data-act="ask" data-q="' + window.D.esc(q.q) + '">' +
                      window.D.esc(q.label) + '</button>';
              }).join('') +
            '</div>' +
          '</div>' +
          '<div class="hbar">' +
            '<div class="field">' +
              window.D.icon('pot', 'ic-sm') +
              '<input id="home-ask" data-enter="ask" placeholder="想吃什么？也可以粘贴视频链接" ' +
                'autocomplete="off" value="' + window.D.esc(draft) + '">' +
            '</div>' +
            '<button class="hsend" data-act="ask" aria-label="发送">' + window.D.icon('send', 'ic-sm') + '</button>' +
          '</div>' +
        '</div>';

      return '<div class="hchat">' + hero +
        '<div class="hstream">' + stream + '</div>' +
        dock +
      '</div>';
    },

    mount: function (root) {
      var input = root.querySelector('#home-ask');
      if (input) {
        input.value = draft;
        input.addEventListener('input', function () { draft = input.value; });
      }
      scrollDown();
    },

    actions: {
      detail: function (d) { window.Router.go('#/recipe/' + d.id); },
      cook: function (d) { window.Router.go('#/cook/' + d.id); },
      toPref: function () { window.Router.go('#/me'); },

      /* 拆解卡：把剩下的步骤摊开 */
      toggleShare: function (d) {
        var m = msgs[+d.i];
        if (!m || m.kind !== 'share') return;
        m.open = !m.open;
        window.Router.refresh();
      },

      /* 直接把抖音/小红书的分享文案贴进来（本机剪贴板，需 https 或 localhost） */
      paste: function () {
        if (!navigator.clipboard || !navigator.clipboard.readText) {
          window.D.toast('长按输入框粘贴就行');
          return;
        }
        navigator.clipboard.readText().then(function (txt) {
          if (!txt || !txt.trim()) { window.D.toast('剪贴板是空的'); return; }
          ask(txt.trim());
        })['catch'](function () {
          window.D.toast('读不到剪贴板，长按输入框粘贴吧');
        });
      },

      ask: function (d) {
        if (busy) return;
        var q = d && d.q ? d.q : (draft || '').trim();
        if (!q) return;
        draft = '';
        ask(q);
      },

      /* 同一批备选里换一道，话说出去的次数不浪费 */
      reroll: function (d) {
        var m = msgs[+d.i];
        if (!m || m.kind !== 'dishes') return;
        m.ptr = ((m.ptr || 0) + 1) % m.ids.length;
        var r = byId(m.ids[m.ptr]);
        if (r) m.say = '换一道 —— 这道也合得上。';
        window.Router.refresh();
      },

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

  /* ---------- 一轮对话：我说 → 搭子想 → 搭子答 ---------- */
  function ask(q) {
    q = String(q || '').trim();
    if (!q) return;

    /* 分享来的视频先识别。这里刻意不把长文案塞进气泡，收成一行标题 */
    var plan = window.ShareParse ? window.ShareParse.plan(q) : null;
    if (plan) {
      msgs.push({ who: 'me', text: shareSummary(plan), share: { platformName: plan.platformName } });
      busy = true;
      var si = msgs.push({ who: 'ai', kind: 'thinking' }) - 1;
      window.Router.refresh();
      setTimeout(function () {
        var r = plan.dish ? byId(plan.dish.id) : null;
        msgs[si] = {
          who: 'ai', kind: 'share', plan: plan, open: false,
          say: r
            ? '视频标题里这道是「' + r.name + '」，我按标准做法给你拆好了 —— ' +
              (r.ingredients.length + r.seasonings.length) + ' 样配料、' + r.steps.length + ' 步。'
            : '这条视频我暂时认不出来，先不给你瞎编配料。'
        };
        busy = false;
        window.Router.refresh();
      }, 680);
      return;
    }

    msgs.push({ who: 'me', text: q });
    busy = true;

    if (askish(q)) {
      /* 答疑：搭子一个字一个字地回 */
      var ti = msgs.push({ who: 'ai', kind: 'text', text: '', typing: true }) - 1;
      window.Router.refresh();
      window.AI.ask(q, {}, function (chunk) {
        msgs[ti].text += chunk;
        var el = document.querySelector('#m' + ti + ' .t');
        if (el) { el.textContent = msgs[ti].text; scrollDown(); }
      }).then(function () {
        msgs[ti].typing = false;
        busy = false;
      });
      return;
    }

    var di = msgs.push({ who: 'ai', kind: 'thinking' }) - 1;
    window.Router.refresh();

    window.AI.recommend(q).then(function (list) {
      var hits = refine(list, q);
      if (!hits.length) {
        /* 没匹配上，也不是提问 —— 就当「你帮我定」，随机抽一道 */
        return window.AI.drawToday(window.Store.get().prefs).then(function (r) {
          msgs[di] = { who: 'ai', kind: 'dishes', ids: [r.id], ptr: 0, say: leadFor(q, r) };
        });
      }
      var ids = hits.slice(0, 4).map(function (r) { return r.id; });
      msgs[di] = {
        who: 'ai', kind: 'dishes', ids: ids, ptr: 0,
        say: leadFor(q, hits[0])
      };
    })['catch'](function () {
      msgs[di] = { who: 'ai', kind: 'text', text: '这会儿脑子有点卡，再说一遍？' };
    }).then(function () {
      busy = false;
      window.Router.refresh();
    });
  }

  window.HomeView = HomeView;
})();
