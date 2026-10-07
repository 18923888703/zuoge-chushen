(function () {
  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function score(recipe, prefs) {
    var st = window.Store.get();
    var s = 0;
    var tags = recipe.flavors.join(' ');
    if (prefs.spicy >= 2 && /辣/.test(tags)) s += 3;
    if (prefs.spicy === 0 && /辣/.test(tags)) s -= 3;
    if (prefs.oil === 'light' && /健康|清淡|素菜/.test(tags)) s += 3;
    if (prefs.oil === 'rich' && /硬菜|宴客/.test(tags)) s += 3;
    s += (3 - recipe.difficulty);

    /* 记录反哺：做过的降权，做得越多降越多；最近 3 次做过的再降一档 */
    s -= Math.min(st.cooked[recipe.id] || 0, 4) * 1.5;
    if (st.history.slice(0, 3).some(function (h) { return h.id === recipe.id; })) s -= 2.5;

    /* 冰箱加权：能立刻动手的优先 —— 从「想吃什么」转向「我能做什么」 */
    var total = recipe.ingredients.length + recipe.seasonings.length;
    var miss = window.Store.missingFor(recipe).length;
    s += (1 - miss / Math.max(total, 1)) * 3.2;

    return s;
  }

  function weightedPick(list, prefs) {
    var scored = list.map(function (r) {
      var s = score(r, prefs);
      return { r: r, w: Math.pow(1.7, s) };
    });
    var total = scored.reduce(function (a, b) { return a + b.w; }, 0);
    var x = Math.random() * total;
    for (var i = 0; i < scored.length; i++) {
      x -= scored[i].w;
      if (x <= 0) return scored[i].r;
    }
    return scored[scored.length - 1].r;
  }

  function compare(a, b) {
    return [a.key + '：' + a.role,
      '',
      b.key + '：' + b.role,
      '',
      '简单记：' + a.key + '管' + (a.key === '老抽' ? '颜色' : '味道') +
      '，' + b.key + '管' + (b.key === '老抽' ? '颜色' : '味道') + '。'].join('\n');
  }

  function buildAnswer(q, ctx) {
    q = String(q || '');
    var ctxName = ctx && ctx.recipe ? ctx.recipe.name : '';

    var keys = Object.keys(window.PANTRY_MAP);
    var found = [];
    keys.forEach(function (k) { if (q.indexOf(k) >= 0 && found.indexOf(k) < 0) found.push(k); });
    var uniq = [];
    found.forEach(function (k) {
      var p = window.PANTRY_MAP[k];
      if (!uniq.filter(function (u) { return u.key === p.key; }).length) uniq.push(p);
    });

    if (uniq.length >= 2) return compare(uniq[0], uniq[1]);

    var p = uniq[0] || window.lookupPantry(q);

    if (/没有|替代|代替|怎么办|不放行不行/.test(q) && p) {
      return '没有「' + p.key + '」也能做：\n' + p.sub +
        (ctxName ? '\n\n用在' + ctxName + '里，味道差别不大，放心试。' : '');
    }

    if (p) {
      var lines = [];
      lines.push(p.role);
      lines.push('');
      lines.push('· 什么时候放：' + p.when);
      lines.push('· 用多少：' + p.amount);
      lines.push('· 没有怎么办：' + p.sub);
      if (ctxName) lines.push('');
      if (ctxName) lines.push('（你现在做的这道：' + ctxName + '）');
      return lines.join('\n');
    }

    if (/多久|几分|时间|熟了吗|熟没熟/.test(q)) {
      return '看菜谱里的计时器就行 —— 带计时的步骤点一下就开始倒数，到点会响。\n\n' +
        '如果菜谱没写时间，通用判断法：肉看中心有没有血水，鱼看眼睛是否突出、肉能不能轻松拨开，' +
        '蔬菜看颜色是否变深、能不能用筷子扎透。';
    }

    if (/盐|咸|淡/.test(q)) {
      return '盐的原则是「少量多次，边尝边加」。\n\n' +
        '· 炒菜：中途加，让味道进去\n· 炖汤：出锅前加，早放肉会变柴\n' +
        '· 觉得太咸：加土豆块吸盐，或者加糖和醋平衡\n· 觉得太淡：先补一点生抽，比直接加盐更鲜';
    }

    return window.FALLBACK_ANSWERS[Math.floor(Math.random() * window.FALLBACK_ANSWERS.length)];
  }

  var AI = {
    drawToday: function (prefs) {
      return sleep(420).then(function () {
        var list = window.RECIPES.filter(function (r) {
          return !(prefs.avoid || []).some(function (a) {
            return r.ingredients.concat(r.seasonings).some(function (x) { return x.name.indexOf(a) >= 0; });
          });
        });
        if (!list.length) list = window.RECIPES.slice();
        return weightedPick(list, prefs);
      });
    },

    recommend: function (name) {
      return sleep(500).then(function () {
        var q = String(name || '').replace(/\s/g, '');
        var prefs = window.Store.get().prefs;
        var hits = window.RECIPES.filter(function (r) {
          return r.name.indexOf(q) >= 0 || q.indexOf(r.name) >= 0 ||
            r.flavors.some(function (f) { return q.indexOf(f) >= 0; }) ||
            r.ingredients.some(function (i) { return q.indexOf(i.name) >= 0; });
        });
        if (!hits.length) hits = window.RECIPES.slice();
        hits.sort(function (a, b) { return score(b, prefs) - score(a, prefs); });
        return hits.slice(0, 4);
      });
    },

    findVideos: function (query, platforms, onBatch) {
      return sleep(680).then(function () {
        var dy = window.buildVideoResults(query, ['douyin']);
        if (onBatch) onBatch(dy, false);
        return sleep(820).then(function () {
          var xhs = window.buildVideoResults(query, ['xhs']);
          if (onBatch) onBatch(xhs, true);
          return dy.concat(xhs);
        });
      });
    },

    /* 诚实版：不假装从视频里提取内容。
       命中馆藏 → 给的是这道菜的著录数据，并标明来源；
       没命中 → 直接说做不到，引导去平台看，不再编一套通用模板。
       将来真接了视频理解，只改这里，视图层不动。 */
    parseVideo: function (video) {
      return sleep(1250).then(function () {
        var r = video.recipeId ? window.findRecipe(video.recipeId) : null;
        if (!r) {
          return {
            matched: false,
            name: (video.title || '').slice(0, 16),
            platform: video.platform,
            author: video.author,
            title: video.title,
            ingredients: [],
            steps: []
          };
        }
        return {
          matched: true,
          name: r.name,
          recipeId: r.id,
          platform: video.platform,
          author: video.author,
          title: video.title,
          ingredients: r.ingredients.map(function (i) {
            return { name: i.name, amount: i.amount, cat: i.cat };
          }).concat(r.seasonings.map(function (s) {
            return { name: s.name, amount: s.amount, cat: '调料' };
          })),
          steps: r.steps.map(function (s) {
            return { text: s.text, timer: s.timer || null };
          })
        };
      });
    },

    ask: function (question, ctx, onChunk) {
      var text = buildAnswer(question, ctx);
      return sleep(320).then(function () {
        var i = 0;
        return new Promise(function (resolve) {
          (function step() {
            if (i >= text.length) { resolve(text); return; }
            var n = 2 + Math.floor(Math.random() * 3);
            var chunk = text.slice(i, i + n);
            i += n;
            if (onChunk) onChunk(chunk);
            setTimeout(step, 16);
          })();
        });
      });
    }
  };

  window.AI = AI;
})();
