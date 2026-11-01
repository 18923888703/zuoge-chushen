(function () {
  /* 视频分享导入：别人发来的抖音/小红书/B站文案，拆成能照着做的配料和步骤。

     诚实边界很重要 —— 这是纯前端原型，拿不到视频画面、也抓不了网页（跨域），
     能用上的只有「分享文案里的标题」。所以匹配到的是菜谱库里同名的标准做法，
     卡片上必须写清楚依据，绝不假装是从视频里逐帧提取出来的。 */

  var SOURCES = [
    { key: 'douyin', name: '抖音', re: /(?:v\.douyin\.com|douyin\.com\/video|douyin\.com\/short|iesdouyin\.com)/i },
    { key: 'xiaohongshu', name: '小红书', re: /(?:xhslink\.com|xiaohongshu\.com)/i },
    { key: 'bilibili', name: 'B站', re: /(?:b23\.tv|bilibili\.com\/video)/i },
    { key: 'kuaishou', name: '快手', re: /(?:kuaishou\.com|chenzhongtech\.com)/i },
    { key: 'youtube', name: 'YouTube', re: /(?:youtu\.be|youtube\.com\/watch)/i },
    { key: 'xiachufang', name: '下厨房', re: /(?:xiachufang\.com)/i }
  ];

  /* 分享文案里那堆平台自带的口水话 */
  var NOISE = [
    /复制此?链接[^，。!！\s，]*/g,
    /复制这条信息[^，。!！\s，]*/g,
    /复制本条信息[^，。!！\s，]*/g,
    /打开Dou音搜索[^，。!！\s，]*/g,
    /打开抖音搜索[^，。!！\s，]*/g,
    /打开小红书[^，。!！\s，]*/g,
    /打开百度网盘[^，。!！\s，]*/g,
    /点击链接[^，。!！\s，]*/g,
    /长按复制[^，。!！\s，]*/g,
    /直接观看视频[!！]?/g,
    /一起看视频[!！]?/g,
    /发送到我的微信[!！]?/g,
    /—{1,2}来自\d+位视频作者的battle/g,
    /下载APP查看更多信息/g,
    /\bCLS\b|\bILS\b|\bMF[A-Z0-9]+\b/g,
    /^\s*\d{1,2}\.\d{1,2}\s*[a-zA-Z]{0,5}:\/{0,2}\s*/,   /* "4.58 vio:/ " 口令前缀 */
    /^\s*\d{2}\/\d{2}\s+/,                                /* "09/21 " 日期前缀 */
    /^\s*【视频】|^\s*\[视频\]/
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

  function cleanTitle(text, url) {
    var t = String(text || '').replace(/https?:\/\/\S+/gi, ' ');
    NOISE.forEach(function (re) { t = t.replace(re, ' '); });
    t = t.replace(/@[^\s，,、#]{1,24}/g, ' ');                 /* @作者 */
    t = t.replace(/#[^\s，,、#]+/g, ' ');                       /* #话题 */
    t = t.replace(/【([^】]{1,30})】/g, '$1');                   /* 【标题】保留内容 */
    t = t.replace(/[-—–]\s*(?:抖音|douyin|小红书|REDnote|bilibili|哔哩哔哩|快手|B站)\s*$/i, ' ');
    t = t.replace(/[\s,，、·]+/g, ' ').replace(/^[\s。.!！,，、]+|[\s。.!！,，、]+$/g, '');
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

  /* 标题 → 菜。命中「完整菜名」算准，只认出主料/近似词算模糊，都不行就返回 null */
  function extractDish(title) {
    var T = String(title || '');
    var list = window.RECIPES || [];
    if (!T || !list.length) return null;

    var best = null;
    list.forEach(function (r) {
      var n = r.name;
      if (!n || n.length < 2) return;
      if (T.indexOf(n) >= 0) {
        var sc = n.length * 10;
        if (!best || sc > best.score) best = { recipe: r, score: sc, keyword: n, confidence: 'exact' };
      }
    });
    if (best) return best;

    list.forEach(function (r) {
      var n = r.name;
      if (!n || n.length < 2) return;
      var c = lcs(T, n);
      /* 至少两个字的重合，且几乎等同于这道菜的名字才算数 */
      if (c.length >= 2 && (c.length >= n.length - 1 || c.length >= 3)) {
        var sc2 = c.length * 3 + (n.length > c.length ? 1 : 0);
        if (!best || sc2 > best.score) best = { recipe: r, score: sc2, keyword: c, confidence: 'fuzzy' };
      }
    });
    return best;
  }

  function detect(text) {
    var raw = String(text || '').trim();
    if (!raw) return { isShare: false, platform: null };
    var url = (raw.match(/https?:\/\/[^\s，,、]+/i) || [''])[0];
    var probe = url || raw;
    var src = sourceOf(probe);
    var looksShared = /(复制此?链接|复制这条信息|复制本条信息|打开Dou音|打开抖音搜索|复制草稿|长按复制)/.test(raw);

    var isShare = !!src || (!!url && looksShared);
    return {
      isShare: isShare,
      raw: raw,
      url: url,
      platform: src ? src.key : (isShare ? 'link' : null),
      platformName: src ? src.name : (isShare ? '链接' : ''),
      videoId: videoIdOf(url, src ? src.key : null),
      title: cleanTitle(raw, url)
    };
  }

  function plan(text) {
    var d = detect(text);
    if (!d.isShare) return null;

    var title = d.title;
    var hit = extractDish(title);
    var near = [];

    if (hit) {
      /* 命中了也把同类做法列出来，万一视频是别的版本 */
      near = (window.RECIPES || []).filter(function (r) {
        return r.id !== hit.recipe.id && lcs(title, r.name).length >= 2;
      }).slice(0, 2);
    } else {
      var scored = (window.RECIPES || []).map(function (r) {
        return { r: r, s: title ? lcs(title, r.name).length : 0 };
      }).filter(function (x) { return x.s >= 2; })
        .sort(function (a, b) { return b.s - a.s; })
        .slice(0, 3);
      near = scored.map(function (x) { return x.r; });
    }

    var note;
    if (hit && hit.confidence === 'exact') {
      note = '标题里写明了「' + hit.keyword + '」，所以配料和步骤是菜谱库里这道菜的标准版本 —— ' +
        '不是从视频画面里逐帧扒下来的，作者要是有什么独门手法，我看不到。';
    } else if (hit) {
      note = '标题里没写全菜名，我是照着「' + hit.keyword + '」猜的这道菜。' +
        '要是视频讲的不是它，告诉我主料我再换。';
    } else {
      note = '我看不到视频画面，只拿到了标题《' + (title || '（没标题）') + '》，' +
        '这道菜不在现在的菜谱库里，所以不给你编一串配料。';
    }

    var r = hit ? hit.recipe : null;
    return {
      platform: d.platform,
      platformName: d.platformName,
      url: d.url,
      videoId: d.videoId,
      title: title,
      dish: r ? { id: r.id, name: r.name, tagline: r.tagline, confidence: hit.confidence, keyword: hit.keyword } : null,
      near: near.map(function (x) { return { id: x.id, name: x.name }; }),
      note: note
    };
  }

  window.ShareParse = {
    SOURCES: SOURCES,
    detect: detect,
    cleanTitle: cleanTitle,
    extractDish: extractDish,
    plan: plan
  };
})();
