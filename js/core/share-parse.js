(function () {
  /* 视频分享导入：别人发来的抖音/小红书/B站文案，拆成能照着做的配料和步骤。

     诚实边界很重要 —— 这是纯前端原型，拿不到视频画面、也抓不了网页（跨域），
     能用上的只有「分享文案」本身：标题 + 话题标签。所以匹配到的是菜谱库里
     同名的标准做法，卡片上必须写清楚依据，绝不假装是从视频里逐帧提取的。 */

  var SOURCES = [
    { key: 'douyin', name: '抖音', re: /(?:v\.douyin\.com|douyin\.com\/video|douyin\.com\/short|iesdouyin\.com)/i },
    { key: 'xiaohongshu', name: '小红书', re: /(?:xhslink\.com|xiaohongshu\.com)/i },
    { key: 'bilibili', name: 'B站', re: /(?:b23\.tv|bilibili\.com\/video)/i },
    { key: 'kuaishou', name: '快手', re: /(?:kuaishou\.com|chenzhongtech\.com)/i },
    { key: 'youtube', name: 'YouTube', re: /(?:youtu\.be|youtube\.com\/watch)/i },
    { key: 'xiachufang', name: '下厨房', re: /(?:xiachufang\.com)/i }
  ];

  /* 文案开头的口令/日期： "7.43 "、"3- "、"09/21 "、"【视频】" */
  var PREFIX = [
    /^\s*\d{1,2}[.\-:：]\d{1,2}(?!\d)\s*/,
    /^\s*\d{1,2}\s*[-—–]\s*/,
    /^\s*\d{2}\/\d{2}\s+/,
    /^\s*\d{1,2}月\d{1,2}日\s*/,
    /^\s*【视频】|^\s*\[视频\]/
  ];

  /* 分享文案里那堆平台自带的口水话（长句先剥，短词后剥） */
  var NOISE = [
    /复制打开抖音[，,。!！]?/g,
    /复制打开dou音[，,。!！]?/gi,
    /打开抖音搜索[^，。!！\s，]*/g,
    /打开dou音搜索[^，。!！\s，]*/gi,
    /打开抖音[，,。!！]?/g,
    /复制此?条?链接[^，。!！\s，]*/g,
    /复制此?条?信息[^，。!！\s，]*/g,
    /长按复制此?条?消息[，,。!！]?/g,
    /长按复制[^，。!！\s，]*/g,
    /查看ta的更多作品[。.!！]?/gi,
    /点击链接[^，。!！\s，]*/g,
    /打开小红书[^，。!！\s，]*/g,
    /打开百度网盘[^，。!！\s，]*/g,
    /直接观看视频[!！]?/g,
    /一起看视频[!！]?/g,
    /发送到我的微信[!！]?/g,
    /下载app查看更多信息/gi,
    /—{1,2}来自\d+位视频作者的battle/g,
    /\bCLS\b|\bILS\b|\bMF[A-Z0-9]+\b/g,
    /^\s*看看/,
    /^\s*这是一条[^，。!！\s]*视频[，,]?/
  ];

  /* 同义词：「西红柿炒鸡蛋」得能对上库里的「番茄炒蛋」 */
  var ALIAS = [
    [/西红柿/g, '番茄'],
    [/马铃薯|洋芋/g, '土豆'],
    [/卷心菜|圆白菜|包心菜/g, '包菜'],
    [/鸡中翅|鸡全翅/g, '鸡翅'],
    [/鸡蛋/g, '蛋'],
    [/蕃茄/g, '番茄']
  ];

  function sourceOf(probe) {
    var hit = null;
    SOURCES.forEach(function (s) { if (!hit && s.re.test(probe)) hit = s; });
    return hit;
  }

  function videoIdOf(url, key) {
    if (!url) return '';
    if (key === 'bilibili') {
      var bv = url.match(/BV[0-9A-Za-z]{6,}/);
      return bv ? bv[0] : '';
    }
    /* 短链：取最后一段路径；长链：取最后一段数字 ID */
    var seg = url.replace(/\?.*$/, '').split('/').filter(Boolean).pop() || '';
    seg = seg.replace(/[^\w-]/g, '');
    return seg.length >= 4 ? seg : '';
  }

  /* 话题标签单独抽出来 —— 抖音的菜名八成都在标签里（#红烧肉 #下饭菜） */
  function tagsOf(text) {
    var out = [], re = /#\s*([^\s#，,、]+)/g, m;
    var s = String(text || '');
    while ((m = re.exec(s))) {
      var t = m[1].replace(/[。.!！,，、]+$/, '');
      if (t) out.push(t);
    }
    return out;
  }

  function dedupe(s) {
    /* 分享文案常把标题说两遍：「红烧肉的做法 https://... 红烧肉的做法」，
       URL 被剥掉后就成了重复串 */
    for (var i = 2; i <= Math.floor(s.length / 2); i++) {
      if (s.slice(0, i) === s.slice(i, i * 2)) {
        var tail = s.slice(i * 2).replace(/[\s，,。.!！·、]+/g, '');
        if (!tail || tail.length <= 1) return s.slice(0, i);
      }
    }
    return s;
  }

  function cleanTitle(text) {
    var t = String(text || '').replace(/https?:\/\/\S+/gi, ' ');

    /* 【作者的作品】整段丢掉；【菜名】这种方括号保留内容 */
    t = t.replace(/【[^】]{0,30}的(?:图文)?作品】/g, ' ');
    t = t.replace(/【([^】]{1,30})】/g, '$1');

    PREFIX.forEach(function (re) { t = t.replace(re, ' '); });
    NOISE.forEach(function (re) { t = t.replace(re, ' '); });

    t = t.replace(/@[^\s，,、#]{1,24}/g, ' ');          /* @作者 */
    t = t.replace(/#\s*[^\s#，,、]+/g, ' ');             /* #话题（已单独抽走） */
    t = t.replace(/[-—–]\s*(?:抖音|douyin|小红书|REDnote|bilibili|哔哩哔哩|快手|B站)\s*$/i, ' ');
    t = t.replace(/[｜|]/g, '，');                        /* 竖线当分隔 */
    t = t.replace(/\s+/g, ' ');
    t = t.replace(/^[\s，,。.!！、·]+|[\s，,。.!！、·]+$/g, '');
    t = t.replace(/[，,]{2,}/g, '，');
    t = t.replace(/^[^\u4e00-\u9fa5A-Za-z0-9]+/, '');
    return dedupe(t).trim();
  }

  /* 最长公共子串：用来做「标题到底指哪道菜」的模糊判断 */
  function lcs(a, b) {
    var best = '', prev = new Array(b.length + 1);
    for (var i = 0; i <= b.length; i++) prev[i] = 0;
    for (var m = 0; m < a.length; m++) {
      var cur = [0];
      for (var n = 0; n < b.length; n++) {
        if (a[m] === b[n]) {
          cur[n + 1] = prev[n] + 1;
          if (cur[n + 1] > best.length) best = a.slice(m - cur[n + 1] + 1, m + 1);
        } else {
          cur[n + 1] = 0;
        }
      }
      prev = cur;
    }
    return best;
  }

  function norm(s) {
    var t = String(s || '');
    ALIAS.forEach(function (p) { t = t.replace(p[0], p[1]); });
    return t.replace(/[\s，,。.!！、·｜|「」【】()（）]+/g, '');
  }

  /* 标题/标签 → 菜。整名字面命中算准，几乎整名字对上算猜，其余一律不硬凑 */
  function extractDish(title, tags) {
    var list = window.RECIPES || [];
    var T = norm(title), G = norm((tags || []).join(' '));
    if (!T && !G) return null;

    var best = null;
    function exact(pool, where) {
      if (!pool) return;
      list.forEach(function (r) {
        var n = norm(r.name);
        if (!n || n.length < 2) return;
        if (pool.indexOf(n) >= 0) {
          /* 整名命中：名字越长越具体；标题里命中优先于标签 */
          var sc = 1000 + n.length * 10 + (where === 'title' ? 5 : 0);
          if (!best || sc > best.score) {
            best = { recipe: r, score: sc, keyword: r.name, confidence: 'exact', where: where };
          }
        }
      });
    }
    exact(T, 'title');
    if (!best) exact(G, 'tag');
    if (best) return best;

    /* 近似：至少三个字重合，且几乎等同于整道菜的名字（防「排骨」乱配） */
    var pairs = [[T, 'title'], [G, 'tag']];
    pairs.forEach(function (p) {
      var pool = p[0];
      if (!pool) return;
      list.forEach(function (r) {
        var n = norm(r.name);
        if (!n || n.length < 2) return;
        var c = lcs(pool, n);
        if (c.length >= 3 && c.length >= n.length - 1) {
          var sc2 = 100 + c.length * 3 + (p[1] === 'title' ? 1 : 0);
          if (!best || sc2 > best.score) {
            best = { recipe: r, score: sc2, keyword: c, confidence: 'fuzzy', where: p[1] };
          }
        }
      });
    });
    return best;
  }

  function detect(text) {
    var raw = String(text || '').trim();
    if (!raw) return { isShare: false, platform: null };
    var url = (raw.match(/https?:\/\/[^\s，,、]+/i) || [''])[0];
    var probe = url || raw;
    var src = sourceOf(probe);
    var looksShared = /(复制此?链接|复制这条信息|复制本条信息|打开Dou音|打开抖音搜索|复制草稿|长按复制|复制打开抖音)/i.test(raw);

    var isShare = !!src || (!!url && looksShared);
    return {
      isShare: isShare,
      raw: raw,
      url: url,
      platform: src ? src.key : (isShare ? 'link' : null),
      platformName: src ? src.name : (isShare ? '链接' : ''),
      videoId: videoIdOf(url, src ? src.key : null),
      tags: tagsOf(raw),
      title: cleanTitle(raw)
    };
  }

  function plan(text) {
    var d = detect(text);
    if (!d.isShare) return null;

    var title = d.title;
    var tags = d.tags || [];
    var hit = extractDish(title, tags);
    var near = [];

    /* 只把一个和标题/标签沾边的名字放到「换一道」里，别塞无关的 */
    var pool = norm(title + ' ' + tags.join(' '));
    var cand = (window.RECIPES || []).filter(function (r) {
      if (hit && r.id === hit.recipe.id) return false;
      return lcs(pool, norm(r.name)).length >= 2;
    }).sort(function (a, b) {
      return lcs(pool, norm(b.name)).length - lcs(pool, norm(a.name)).length;
    }).slice(0, 3);
    near = cand;

    var note;
    if (hit && hit.confidence === 'exact' && hit.where === 'title') {
      note = '标题里写明了「' + hit.keyword + '」，下面是菜谱库里这道菜的标准做法 —— ' +
        '视频作者自己的用量、火候和顺序我看不到，可能和视频有出入。';
    } else if (hit && hit.confidence === 'exact') {
      note = '标题没直接写菜名，「' + hit.keyword + '」是从话题标签里认出来的。' +
        '下面是菜谱库的标准做法，视频里的用量可能不一样。';
    } else if (hit) {
      note = '标题里没写全菜名，我按「' + hit.keyword + '」猜成了「' + hit.recipe.name + '」。' +
        '要是视频讲的不是这道，点下面的菜名换过来。';
    } else {
      note = '我拿不到视频画面，只有这条分享的文字（标题是《' + (title || '空的') + '》），' +
        '里面没写着是哪道菜，所以不给你编配料。告诉我菜名，我立刻配一份。';
    }

    var r = hit ? hit.recipe : null;
    return {
      platform: d.platform,
      platformName: d.platformName,
      url: d.url,
      videoId: d.videoId,
      title: title,
      tags: tags,
      dish: r ? {
        id: r.id, name: r.name, tagline: r.tagline,
        confidence: hit.confidence, keyword: hit.keyword, where: hit.where
      } : null,
      near: near.map(function (x) { return { id: x.id, name: x.name }; }),
      note: note
    };
  }

  window.ShareParse = {
    SOURCES: SOURCES,
    detect: detect,
    cleanTitle: cleanTitle,
    tagsOf: tagsOf,
    extractDish: extractDish,
    plan: plan
  };
})();
