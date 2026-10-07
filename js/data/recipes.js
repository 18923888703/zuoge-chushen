(function () {
  var R = [
    {
      id: 'tomato-egg',
      name: '番茄炒蛋',
      tagline: '厨房第一课，十分钟就能端上桌的家味道',
      art: 'tomato-egg',
      prep: 8, cook: 7, difficulty: 1, servings: 2,
      flavors: ['家常', '下饭', '快手', '新手友好'],
      ingredients: [
        { name: '番茄', amount: '2 个（约 300g）', cat: '蔬菜', note: '挑软一点的，更容易出汁' },
        { name: '鸡蛋', amount: '3 个', cat: '肉蛋' },
        { name: '小葱', amount: '1 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '白糖', amount: '1 小勺', role: '提鲜，压住番茄的酸' },
        { name: '盐', amount: '适量', role: '调味，也帮助鸡蛋更嫩' },
        { name: '食用油', amount: '2 汤匙', role: '炒蛋要油稍多一点' }
      ],
      steps: [
        { text: '番茄顶部划十字，浇开水烫 30 秒后剥皮，切成滚刀块。', tip: '烫过更好去皮，也更容易炒出汁。', timer: { label: '烫番茄', seconds: 30 } },
        { text: '鸡蛋加一小撮盐打散。热锅凉油倒入蛋液，炒到半凝固就盛出来。', tip: '别炒到全熟，余温会继续加热，老了就柴。' },
        { text: '锅里留底油下番茄，中火翻炒到出红油，加糖和盐。', timer: { label: '炒出汁', seconds: 120 } },
        { text: '倒回鸡蛋翻炒均匀，撒葱花，出锅。' }
      ],
      variations: [
        { title: '川味版', diff: '起锅前加半勺豆瓣酱，撒一点花椒粉。' },
        { title: '少油健康版', diff: '蛋液加温水蒸成蛋羹，再拌进炒好的番茄里。' },
        { title: '番茄浓汤版', diff: '炒出汁后加一碗水煮开，配面条或泡饭。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/番茄炒蛋做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=番茄炒蛋' }
    },

    {
      id: 'braised-pork',
      name: '红烧肉',
      tagline: '炖到筷子一夹就断，肥肉化在嘴里的那口满足',
      art: 'braised-pork',
      prep: 15, cook: 55, difficulty: 3, servings: 3,
      flavors: ['硬菜', '下饭', '宴客', '有成就感'],
      ingredients: [
        { name: '五花肉', amount: '600g', cat: '肉蛋', note: '三层五花最好，肥瘦分明' },
        { name: '姜', amount: '4 片', cat: '蔬菜' },
        { name: '小葱', amount: '2 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '冰糖', amount: '30g', role: '炒糖色，负责红亮和回甜' },
        { name: '生抽', amount: '2 汤匙', role: '主咸味来源' },
        { name: '老抽', amount: '1 汤匙', role: '上色，让肉变成琥珀色' },
        { name: '料酒', amount: '2 汤匙', role: '去腥增香' },
        { name: '八角', amount: '2 颗', role: '炖肉的香气骨架' }
      ],
      steps: [
        { text: '五花肉切 3cm 见方的块，冷水下锅，加姜片和料酒焯水 3 分钟，捞出用温水冲洗干净。', tip: '一定要冷水下锅，血水才出得来。', timer: { label: '焯水', seconds: 180 } },
        { text: '锅里放一点点油下冰糖，小火炒到枣红色、冒细密小泡。', tip: '全程小火，糖一发苦就没救了，宁可浅一点。' },
        { text: '下肉块翻炒到每块都裹上糖色，加生抽、老抽、料酒和姜葱八角。' },
        { text: '加开水没过肉面，大火烧开后转小火，盖盖焖 40 分钟。', timer: { label: '小火焖', seconds: 2400 } },
        { text: '开盖转大火收汁 8 分钟，不停翻动，让汤汁浓稠地裹住每一块肉。', timer: { label: '大火收汁', seconds: 480 } },
        { text: '拣出八角葱姜，装盘，把锅里的汁淋上去。' }
      ],
      variations: [
        { title: '本帮浓油赤酱', diff: '冰糖加到 50g，收汁更狠，最后不放水淀粉。' },
        { title: '川味版', diff: '加一勺豆瓣酱和几个干辣椒一起炖。' },
        { title: '少糖版', diff: '冰糖减到 10g，丢半个苹果进去一起炖，甜味更自然。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/红烧肉做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=红烧肉' }
    },

    {
      id: 'cola-wings',
      name: '可乐鸡翅',
      tagline: '零失败入门菜，甜咸发亮，小朋友最爱',
      art: 'cola-wings',
      prep: 15, cook: 25, difficulty: 1, servings: 2,
      flavors: ['快手', '小朋友爱', '零失败', '甜咸'],
      ingredients: [
        { name: '鸡中翅', amount: '10 个', cat: '肉蛋', note: '两面划刀更好入味' },
        { name: '姜', amount: '3 片', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '可乐', amount: '1 罐（330ml）', role: '糖分负责焦糖色和甜味' },
        { name: '生抽', amount: '2 汤匙', role: '咸味和鲜味' },
        { name: '老抽', amount: '半汤匙', role: '加深颜色' },
        { name: '料酒', amount: '1 汤匙', role: '腌肉去腥' }
      ],
      steps: [
        { text: '鸡翅两面各划两刀，加料酒和姜片腌 10 分钟。', timer: { label: '腌制', seconds: 600 } },
        { text: '平底锅少油，鸡翅摊开中小火煎到两面金黄，大约 4 分钟。', tip: '别急着翻面，等一面定型再翻，皮才不会破。', timer: { label: '煎制', seconds: 240 } },
        { text: '倒入可乐没过鸡翅，加生抽和老抽，大火烧开后转中小火焖 15 分钟。', timer: { label: '焖煮', seconds: 900 } },
        { text: '开盖大火收汁 5 分钟，翻动让每块都裹上亮亮的酱汁。', timer: { label: '收汁', seconds: 300 } }
      ],
      variations: [
        { title: '蒜香版', diff: '丢 6 瓣整蒜进去一起焖，蒜会变得软糯香甜。' },
        { title: '辣味版', diff: '加干辣椒和十几粒花椒，甜辣更有层次。' },
        { title: '减糖版', diff: '用无糖可乐，甜度靠最后半勺蜂蜜补。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/可乐鸡翅做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=可乐鸡翅' }
    },

    {
      id: 'spicy-potato',
      name: '酸辣土豆丝',
      tagline: '考验刀工的第一道菜，脆得能听见声音',
      art: 'spicy-potato',
      prep: 12, cook: 6, difficulty: 2, servings: 2,
      flavors: ['下饭', '酸辣', '素菜', '快手'],
      ingredients: [
        { name: '土豆', amount: '2 个（约 400g）', cat: '蔬菜', note: '选黄心土豆，更脆不易断' },
        { name: '青椒', amount: '半个', cat: '蔬菜' },
        { name: '蒜', amount: '3 瓣', cat: '蔬菜' },
        { name: '干辣椒', amount: '4 个', cat: '调料' }
      ],
      seasonings: [
        { name: '白醋', amount: '2 汤匙', role: '脆感和酸味的关键，最后沿锅边淋' },
        { name: '盐', amount: '适量', role: '调味' },
        { name: '花椒', amount: '十几粒', role: '麻香，爆香后捞出' }
      ],
      steps: [
        { text: '土豆切成细丝，放进清水里泡 5 分钟，洗掉表面淀粉。', tip: '丝要尽量粗细一致，不然生熟不同步。', timer: { label: '泡水', seconds: 300 } },
        { text: '水烧开下土豆丝焯 30 秒，立刻捞出过凉水。', tip: '焯过再炒才脆，超过 40 秒就软了。', timer: { label: '焯水', seconds: 30 } },
        { text: '热油下花椒和干辣椒，小火爆出香味后把花椒捞出来。' },
        { text: '大火下土豆丝快炒 1 分钟，加青椒丝和蒜末。', timer: { label: '快炒', seconds: 60 } },
        { text: '沿锅边淋白醋，加盐炒匀，立刻出锅。' }
      ],
      variations: [
        { title: '醋溜版', diff: '白醋换成香醋，再加一勺糖，酸甜更柔和。' },
        { title: '川味版', diff: '加泡椒和泡椒水，酸得更立体。' },
        { title: '清爽版', diff: '不爆辣椒，出锅前淋一点花椒油。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/酸辣土豆丝做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=酸辣土豆丝' }
    },

    {
      id: 'garlic-broccoli',
      name: '蒜蓉西兰花',
      tagline: '五分钟一个菜，绿得发亮还不寡淡',
      art: 'garlic-broccoli',
      prep: 8, cook: 5, difficulty: 1, servings: 2,
      flavors: ['素菜', '快手', '健康', '清淡'],
      ingredients: [
        { name: '西兰花', amount: '1 颗（约 350g）', cat: '蔬菜', note: '颜色深绿、花球紧实的更新鲜' },
        { name: '蒜', amount: '5 瓣', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '蚝油', amount: '1 汤匙', role: '鲜味来源，素菜靠它提味' },
        { name: '盐', amount: '适量', role: '调味' },
        { name: '食用油', amount: '1 汤匙', role: '焯水时加几滴能保持翠绿' }
      ],
      steps: [
        { text: '西兰花掰成小朵，用淡盐水泡 5 分钟后冲洗干净。', timer: { label: '浸泡', seconds: 300 } },
        { text: '水里加几滴油和盐烧开，下西兰花焯 1 分钟，捞出沥干。', tip: '加油和盐是保持翠绿的小窍门。', timer: { label: '焯水', seconds: 60 } },
        { text: '热锅少油下蒜末，小火炒香 30 秒。', tip: '蒜末别炒焦，发苦整锅就毁了。', timer: { label: '爆香', seconds: 30 } },
        { text: '转大火下西兰花翻炒 1 分钟，加蚝油和盐炒匀出锅。', timer: { label: '翻炒', seconds: 60 } }
      ],
      variations: [
        { title: '蒜香浓郁版', diff: '蒜末分两次放，一半爆香一半出锅前拌。' },
        { title: '白灼版', diff: '焯水后只淋蒸鱼豉油和热油，最清爽。' },
        { title: '芝士版', diff: '出锅前撒一把芝士碎，盖盖焖 1 分钟化开。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/蒜蓉西兰花做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=蒜蓉西兰花' }
    },

    {
      id: 'rib-soup',
      name: '冬瓜排骨汤',
      tagline: '炖一锅，汤清味浓，夏天喝最舒服',
      art: 'rib-soup',
      prep: 10, cook: 60, difficulty: 2, servings: 3,
      flavors: ['汤羹', '清爽', '家常', '滋补'],
      ingredients: [
        { name: '排骨', amount: '500g', cat: '肉蛋', note: '肋排最好，肉嫩汤清' },
        { name: '冬瓜', amount: '400g', cat: '蔬菜' },
        { name: '姜', amount: '4 片', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '料酒', amount: '1 汤匙', role: '焯水去腥' },
        { name: '盐', amount: '适量', role: '出锅前再放，肉才不柴' },
        { name: '白胡椒粉', amount: '少许', role: '提香去腥，汤更暖' }
      ],
      steps: [
        { text: '排骨冷水下锅，加姜片和料酒，水开后撇净浮沫再煮 3 分钟，捞出冲洗。', timer: { label: '焯水', seconds: 180 } },
        { text: '砂锅加足量开水，放排骨和姜片，大火烧开转小火炖 40 分钟。', tip: '中途别再加水，一加汤就泄了。', timer: { label: '小火炖', seconds: 2400 } },
        { text: '冬瓜去皮切厚片下锅，继续煮 15 分钟到冬瓜变透明。', timer: { label: '煮冬瓜', seconds: 900 } },
        { text: '加盐和白胡椒粉调味，撒葱花，出锅。' }
      ],
      variations: [
        { title: '玉米胡萝卜版', diff: '加甜玉米段和胡萝卜块，汤会更甜。' },
        { title: '薏米版', diff: '加一把提前泡过的薏米，祛湿。' },
        { title: '海带版', diff: '冬瓜换成海带结，鲜味更足。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/冬瓜排骨汤做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=冬瓜排骨汤' }
    },

    {
      id: 'seabass',
      name: '清蒸鲈鱼',
      tagline: '看起来最唬人，其实只要敢开火就能成',
      art: 'seabass',
      prep: 15, cook: 12, difficulty: 2, servings: 3,
      flavors: ['宴客', '清淡', '高蛋白', '有面子'],
      ingredients: [
        { name: '鲈鱼', amount: '1 条（约 600g）', cat: '水产', note: '让摊主杀好去鳞去腮，回家冲净血水' },
        { name: '姜', amount: '6 片', cat: '蔬菜' },
        { name: '小葱', amount: '3 根', cat: '蔬菜' },
        { name: '红椒', amount: '半根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '蒸鱼豉油', amount: '3 汤匙', role: '专用调味，比生抽更鲜不抢味' },
        { name: '料酒', amount: '1 汤匙', role: '腌制去腥' },
        { name: '食用油', amount: '2 汤匙', role: '最后淋热油，激出葱香' }
      ],
      steps: [
        { text: '鱼身两面各斜划三刀，抹上料酒和少许盐，腌 10 分钟。', timer: { label: '腌制', seconds: 600 } },
        { text: '盘底垫葱段姜片把鱼架起来，水完全烧开后上锅大火蒸 8 分钟。', tip: '一定要水开后再放鱼，冷水下锅鱼肉会散。', timer: { label: '大火蒸', seconds: 480 } },
        { text: '关火焖 2 分钟再开盖，把盘里的腥水倒掉。', tip: '这 2 分钟叫「虚蒸」，鱼肉中心刚好熟透。', timer: { label: '虚蒸', seconds: 120 } },
        { text: '铺上葱丝红椒丝，淋蒸鱼豉油，再浇一勺烧到冒烟的热油。', tip: '听到「刺啦」一声就成了。' }
      ],
      variations: [
        { title: '剁椒版', diff: '鱼身上铺一层剁椒一起蒸，重口味首选。' },
        { title: '柠檬版', diff: '鱼肚里塞柠檬片和香草，清爽不腥。' },
        { title: '蒸箱版', diff: '蒸箱 100 度 10 分钟，火候更好控制。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/清蒸鲈鱼做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=清蒸鲈鱼' }
    }
  ];

  /* —— 博物馆图鉴元数据：编号 / 学名 / 科属 / 时令 / 风味谱 / 图注 —— */
  var META = {
    'tomato-egg': {
      no: 'No.01', latin: 'Ova fricta cum lycopersicis', family: '蛋类科',
      season: '四季', origin: '全国 · 家常',
      flavor: { '咸': 3, '甜': 2, '酸': 2, '鲜': 4, '辣': 0, '油': 3 },
      annot: [
        { x: 22, y: 28, tx: 32, ty: 45, t: '番茄' },
        { x: 68, y: 24, tx: 52, ty: 42, t: '鸡蛋' },
        { x: 76, y: 46, tx: 60, ty: 47, t: '葱花' }
      ]
    },
    'braised-pork': {
      no: 'No.02', latin: 'Caro porcina liquamine rubra', family: '猪肉科',
      season: '秋冬', origin: '本帮 · 上海',
      flavor: { '咸': 3, '甜': 3, '酸': 0, '鲜': 4, '辣': 0, '油': 4 },
      annot: [
        { x: 22, y: 28, tx: 32, ty: 47, t: '五花肉' },
        { x: 70, y: 28, tx: 52, ty: 43, t: '糖色' },
        { x: 78, y: 54, tx: 67, ty: 52, t: '八角' }
      ]
    },
    'cola-wings': {
      no: 'No.03', latin: 'Alae galli in cola', family: '禽类科',
      season: '四季', origin: '全国 · 家常',
      flavor: { '咸': 2, '甜': 4, '酸': 0, '鲜': 3, '辣': 0, '油': 2 },
      annot: [
        { x: 22, y: 26, tx: 33, ty: 45, t: '鸡中翅' },
        { x: 72, y: 30, tx: 52, ty: 43, t: '可乐' }
      ]
    },
    'spicy-potato': {
      no: 'No.04', latin: 'Solani tubera acido-acria', family: '根茎科',
      season: '四季', origin: '川黔',
      flavor: { '咸': 3, '甜': 0, '酸': 4, '鲜': 1, '辣': 3, '油': 2 },
      annot: [
        { x: 24, y: 36, tx: 36, ty: 58, t: '土豆丝' },
        { x: 76, y: 32, tx: 66, ty: 45, t: '干辣椒' }
      ]
    },
    'garlic-broccoli': {
      no: 'No.05', latin: 'Brassica cum allio', family: '叶菜科',
      season: '秋冬', origin: '粤式',
      flavor: { '咸': 2, '甜': 0, '酸': 0, '鲜': 3, '辣': 0, '油': 1 },
      annot: [
        { x: 24, y: 34, tx: 34, ty: 48, t: '西兰花' },
        { x: 74, y: 52, tx: 46, ty: 58, t: '蒜末' }
      ]
    },
    'rib-soup': {
      no: 'No.06', latin: 'Ius costarum cum benincasa', family: '汤羹科',
      season: '夏', origin: '粤式',
      flavor: { '咸': 2, '甜': 1, '酸': 0, '鲜': 4, '辣': 0, '油': 1 },
      annot: [
        { x: 24, y: 32, tx: 40, ty: 46, t: '排骨' },
        { x: 70, y: 50, tx: 48, ty: 56, t: '冬瓜' }
      ]
    },
    'seabass': {
      no: 'No.07', latin: 'Perca vapore cocta', family: '水产科',
      season: '四季', origin: '粤式',
      flavor: { '咸': 2, '甜': 0, '酸': 0, '鲜': 4, '辣': 0, '油': 2 },
      annot: [
        { x: 20, y: 36, tx: 34, ty: 58, t: '鲈鱼' },
        { x: 74, y: 42, tx: 56, ty: 56, t: '葱姜丝' }
      ]
    }
  };

  /* 合并扩展馆藏：js/data/recipes-ext.js 在本文件之前加载 */
  var EXTRA = window.__EXTRA_RECIPES || [];
  if (EXTRA.length) R = EXTRA.concat(R);
  var XM = window.__EXTRA_META || {};
  Object.keys(XM).forEach(function (k) { META[k] = XM[k]; });

  R.forEach(function (r) {
    var m = META[r.id];
    if (m) { Object.keys(m).forEach(function (k) { r[k] = m[k]; }); }
  });

  var MAP = {};
  R.forEach(function (r) { MAP[r.id] = r; });

  window.RECIPES = R;
  window.RECIPE_MAP = MAP;
  window.findRecipe = function (id) { return MAP[id] || null; };
})();
