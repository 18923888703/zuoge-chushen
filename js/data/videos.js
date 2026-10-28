(function () {
  var T = {
    dy: {
      authors: ['@王大厨的日常', '@厨房小学徒', '@阿雅的饭', '@老饭骨', '@深夜食堂阿明'],
      titles: [
        '{q}，饭店大厨不外传的 3 个关键',
        '{q}这么做，全家都夸你会做饭',
        '30 秒学会 {q}，新手零失败',
        '{q}的家常做法，看一遍就会',
        '做了 100 次 {q}，我把诀窍都告诉你'
      ]
    },
    xhs: {
      authors: ['@一颗小饭团', '@厨房日记', '@会做饭的阿橘', '@减脂餐研究所', '@米饭杀手'],
      titles: [
        '{q}｜我愿称之为米饭杀手',
        '第一次做 {q} 就成功了！附详细步骤',
        '{q} 保姆级教程，避坑全记录',
        '宿舍党也能做的 {q}',
        '{q}｜厨房新手的第一道拿手菜'
      ]
    },
    durations: ['01:24', '02:14', '00:58', '03:06', '01:47', '04:12', '02:38'],
    plays: ['128.4w', '56.2w', '9.8w', '213.7w', '34.5w', '78.1w', '12.3w']
  };

  function pick(arr, i) { return arr[i % arr.length]; }

  function matchRecipe(query) {
    var q = String(query || '').replace(/\s/g, '');
    var hit = null;
    window.RECIPES.forEach(function (r) {
      if (q.indexOf(r.name) >= 0) hit = r;
      if (!hit) {
        for (var i = 0; i < r.flavors.length; i++) {
          if (q && q.indexOf(r.flavors[i]) >= 0) { hit = hit || r; }
        }
      }
    });
    return hit;
  }

  function buildVideoResults(query, platforms) {
    var q = String(query || '家常菜').trim() || '家常菜';
    var recipe = matchRecipe(q);
    platforms = (platforms && platforms.length) ? platforms : ['douyin', 'xhs'];
    var out = [];
    var n = 0;
    platforms.forEach(function (pf) {
      var tpl = pf === 'douyin' ? T.dy : T.xhs;
      for (var i = 0; i < 3; i++) {
        var title = pick(tpl.titles, n).replace('{q}', q);
        out.push({
          id: 'v-' + pf + '-' + n,
          platform: pf,
          title: title,
          author: pick(tpl.authors, n + i),
          dur: pick(T.durations, n * 2 + i),
          plays: pick(T.plays, n + i * 3),
          art: recipe ? recipe.art : (n % 2 ? 'veg' : 'pot'),
          recipeId: recipe ? recipe.id : null,
          url: pf === 'douyin'
            ? 'https://www.douyin.com/search/' + encodeURIComponent(q)
            : 'https://www.xiaohongshu.com/search_result?keyword=' + encodeURIComponent(q)
        });
        n++;
      }
    });
    return out;
  }

  window.VIDEO_TPL = T;
  window.buildVideoResults = buildVideoResults;
  window.matchRecipeByQuery = matchRecipe;
})();
