/* 扩展馆藏 第四批：No.71 – No.100
   与 recipes.js 同结构，在 recipes.js 之前加载（须排在 ext/ext2/ext3 之后）。
   art 复用现有铜版线稿（按食材形态就近匹配），不新增插画。 */
(function () {
  var B = window.__EXTRA_RECIPES || [];

  B = B.concat([
    {
      id: 'curry-chicken',
      name: '咖喱鸡',
      tagline: '咖喱块最后放，化了就关火',
      art: 'pot',
      prep: 15, cook: 30, difficulty: 1, servings: 3,
      flavors: ['下饭', '家常', '新手友好', '浓香'],
      ingredients: [
        { name: '鸡腿肉', amount: '400g', cat: '肉蛋', note: '去骨切块' },
        { name: '土豆', amount: '2 个', cat: '蔬菜' },
        { name: '胡萝卜', amount: '1 根', cat: '蔬菜' },
        { name: '洋葱', amount: '1 个', cat: '蔬菜' },
        { name: '咖喱块', amount: '3 小块', cat: '其他', note: '超市日式咖喱块，分辣度' }
      ],
      seasonings: [
        { name: '食用油', amount: '2 汤匙', role: '炒蔬菜用' },
        { name: '盐', amount: '适量', role: '咖喱块本身有咸味，最后尝过再加' },
        { name: '牛奶', amount: '2 汤匙', role: '可选，加了更柔和' }
      ],
      steps: [
        { text: '鸡肉切块，土豆胡萝卜切滚刀块，洋葱切丝。' },
        { text: '锅里油炒洋葱丝到透明出甜味。', tip: '洋葱炒透是咖喱味厚的基础，别省时间。', timer: { label: '炒洋葱', seconds: 300 } },
        { text: '鸡肉下锅炒到表面变白，下土豆胡萝卜翻炒。', timer: { label: '炒鸡肉', seconds: 180 } },
        { text: '加没过食材的水，煮开转中火炖到土豆变软。', timer: { label: '炖煮', seconds: 900 } },
        { text: '关火或转最小火，咖喱块掰碎放进去化开。', tip: '咖喱块一定要关火后化，大火容易糊底发苦。', timer: { label: '化咖喱', seconds: 180 } },
        { text: '小火再煮几分钟到浓稠，加牛奶和盐调味，浇在米饭上。' }
      ],
      variations: [
        { title: '咖喱牛肉版', diff: '鸡肉换牛腩，炖的时间延长到一个半小时。' },
        { title: '椰香版', diff: '水换成一半椰浆，风味更温润。' },
        { title: '蔬菜版', diff: '不放肉，用土豆、胡萝卜、西兰花做纯素咖喱。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/咖喱鸡做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=咖喱鸡' }
    },

    {
      id: 'beer-duck',
      name: '啤酒鸭',
      tagline: '啤酒代替水去腥增香，收完汁一点酒味都没有',
      art: 'pot',
      prep: 15, cook: 40, difficulty: 2, servings: 3,
      flavors: ['硬菜', '下饭', '家常', '浓香'],
      ingredients: [
        { name: '鸭腿', amount: '3 只', cat: '肉蛋', note: '让摊主剁块，鸭皮脂肪多要煸出来' },
        { name: '啤酒', amount: '1 罐（330ml）', cat: '其他' },
        { name: '土豆', amount: '1 个', cat: '蔬菜' },
        { name: '姜', amount: '5 片', cat: '蔬菜' },
        { name: '蒜', amount: '4 瓣', cat: '蔬菜' },
        { name: '干辣椒', amount: '4 个', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '生抽', amount: '3 汤匙', role: '咸鲜主味' },
        { name: '老抽', amount: '半汤匙', role: '上色' },
        { name: '料酒', amount: '1 汤匙', role: '焯水去腥' },
        { name: '冰糖', amount: '1 小勺', role: '提亮回甜' },
        { name: '八角', amount: '1 颗', role: '炖肉香气' }
      ],
      steps: [
        { text: '鸭块冷水下锅加姜片料酒焯水，捞出冲净沥干。', timer: { label: '焯水', seconds: 420 } },
        { text: '锅里不放油，鸭皮朝下小火煸出鸭油。', tip: '鸭油一定要煸出来，这是香的来源，也是去腥味的关键。', timer: { label: '煸鸭油', seconds: 420 } },
        { text: '倒掉多余的油，下姜蒜、干辣椒、八角炒香。', timer: { label: '爆香', seconds: 90 } },
        { text: '加生抽、老抽、冰糖炒匀，倒入啤酒和少许水。', timer: { label: '加啤酒', seconds: 60 } },
        { text: '煮开转小火焖，中途下土豆块。', timer: { label: '焖煮', seconds: 1500 } },
        { text: '开盖大火收汁到浓稠挂在鸭肉上。', timer: { label: '收汁', seconds: 300 } }
      ],
      variations: [
        { title: '魔芋版', diff: '加魔芋结一起烧，吸汁又低卡。' },
        { title: '不辣版', diff: '去掉干辣椒，突出啤酒和酱香。' },
        { title: '加腐竹版', diff: '泡软的腐竹一起烧，口感很搭。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/啤酒鸭做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=啤酒鸭' }
    },

    {
      id: 'salt-baked-chicken',
      name: '盐焗鸡',
      tagline: '盐焗粉抹匀腌透，蒸出来皮滑肉嫩',
      art: 'pot',
      prep: 20, cook: 30, difficulty: 2, servings: 3,
      flavors: ['硬菜', '宴客', '粤式', '清淡'],
      ingredients: [
        { name: '三黄鸡', amount: '半只（约 700g）', cat: '肉蛋', note: '或一整只，别太大，蒸不透' },
        { name: '盐焗粉', amount: '1 包（约 30g）', cat: '其他', note: '超市有售，咸香带药材味' },
        { name: '姜', amount: '5 片', cat: '蔬菜' },
        { name: '小葱', amount: '3 根', cat: '蔬菜' },
        { name: '香菜', amount: '2 棵', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '料酒', amount: '2 汤匙', role: '去腥' },
        { name: '食用油', amount: '2 汤匙', role: '抹在鸡皮上，锁住水分' },
        { name: '盐', amount: '适量', role: '盐焗粉有咸味，一般不用再加' }
      ],
      steps: [
        { text: '鸡洗净沥干，用厨房纸把里外都擦干。', tip: '表面越干，腌料越挂得住，皮也越爽。' },
        { text: '盐焗粉加料酒和一勺油调成糊，里外抹匀，腹腔塞姜葱。', timer: { label: '腌制', seconds: 2400 } },
        { text: '水开后上锅大火蒸。', timer: { label: '蒸鸡', seconds: 1500 } },
        { text: '关火焖五分钟再开盖，斩块装盘。', tip: '焖一下肉汁会回进去，立刻开盖肉会柴。', timer: { label: '焖', seconds: 300 } },
        { text: '蒸出来的汁浇在鸡上，撒香菜。' }
      ],
      variations: [
        { title: '电饭煲版', diff: '不用蒸，直接放电饭煲按煮饭键，底部垫葱姜。' },
        { title: '手撕版', diff: '放凉后撕成条，加香菜和原汁拌，做凉菜。' },
        { title: '沙姜版', diff: '盐焗粉换沙姜粉，风味更冲。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/盐焗鸡做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=盐焗鸡' }
    },

    {
      id: 'white-cut-chicken',
      name: '白切鸡',
      tagline: '浸而不煮，冰火交替做出爽脆鸡皮',
      art: 'pot',
      prep: 15, cook: 30, difficulty: 3, servings: 3,
      flavors: ['粤式', '宴客', '清淡', '硬菜'],
      ingredients: [
        { name: '三黄鸡', amount: '1 只（约 1kg）', cat: '肉蛋', note: '走地鸡更好，皮爽肉紧' },
        { name: '姜', amount: '1 块', cat: '蔬菜', note: '一部分煮鸡，一部分做蘸料' },
        { name: '小葱', amount: '4 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '盐', amount: '适量', role: '蘸料调味' },
        { name: '食用油', amount: '3 汤匙', role: '蘸料用，烧热浇姜葱' },
        { name: '料酒', amount: '2 汤匙', role: '浸鸡去腥' }
      ],
      steps: [
        { text: '一大锅水加姜葱料酒烧开，提着鸡颈三提三放。', tip: '三提三放让鸡腔内外温度一致，皮才不会破。' },
        { text: '整鸡下锅，水保持似开非开（约 90℃），浸着。', tip: '绝对不能大火滚，一滚皮就破肉就老。', timer: { label: '浸鸡', seconds: 1200 } },
        { text: '捞出立刻放进冰水浸到完全凉透。', tip: '冰火交替让鸡皮爽脆、皮下形成啫喱冻，这是白切鸡的精髓。', timer: { label: '冰镇', seconds: 900 } },
        { text: '姜末葱花加盐，浇一勺滚油做成姜葱蘸料。' },
        { text: '鸡斩块装盘，配蘸料上桌。' }
      ],
      variations: [
        { title: '葱油版', diff: '蘸料只用葱油和盐，更纯粹。' },
        { title: '沙姜版', diff: '蘸料加沙姜末，两广经典做法。' },
        { title: '酱油版', diff: '蘸生抽加姜蓉，简单也好吃。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/白切鸡做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=白切鸡' }
    },

    {
      id: 'chicken-mushroom-stew',
      name: '小鸡炖蘑菇',
      tagline: '干粉条吸饱汤汁，比肉还抢手',
      art: 'pot',
      prep: 15, cook: 45, difficulty: 2, servings: 3,
      flavors: ['硬菜', '家常', '下饭', '浓香'],
      ingredients: [
        { name: '鸡', amount: '半只（约 600g）', cat: '肉蛋', note: '土鸡更好，剁块' },
        { name: '干榛蘑', amount: '1 把（约 50g）', cat: '蔬菜', note: '东北榛蘑最对味，泡发洗净' },
        { name: '干粉条', amount: '1 把', cat: '其他', note: '红薯宽粉，泡软' },
        { name: '姜', amount: '4 片', cat: '蔬菜' },
        { name: '大葱', amount: '半根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '生抽', amount: '3 汤匙', role: '咸鲜主味' },
        { name: '老抽', amount: '半汤匙', role: '上色' },
        { name: '料酒', amount: '2 汤匙', role: '去腥' },
        { name: '冰糖', amount: '1 小勺', role: '提亮' },
        { name: '八角', amount: '1 颗', role: '炖肉香气' }
      ],
      steps: [
        { text: '鸡块冷水下锅焯去血沫，捞出冲净。', timer: { label: '焯水', seconds: 360 } },
        { text: '锅里油下冰糖炒到微黄，鸡块下锅炒上色。', timer: { label: '炒糖色', seconds: 180 } },
        { text: '加姜片、葱段、八角、料酒炒香，加生抽老抽。', timer: { label: '爆香', seconds: 90 } },
        { text: '加没过食材的开水，下榛蘑，煮开转小火炖。', timer: { label: '炖煮', seconds: 1800 } },
        { text: '下泡软的粉条，炖到粉条透明吸饱汤。', tip: '粉条别太早放，会炖烂。', timer: { label: '炖粉条', seconds: 600 } },
        { text: '尝咸淡，大火略收汁出锅。' }
      ],
      variations: [
        { title: '加土豆版', diff: '粉条前十五分钟下土豆块。' },
        { title: '鲜香菇版', diff: '没有榛蘑用鲜香菇，风味不同但也好吃。' },
        { title: '辣味版', diff: '加干辣椒和豆瓣酱，做成辣子鸡炖蘑菇。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/小鸡炖蘑菇做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=小鸡炖蘑菇' }
    },

    {
      id: 'sizzling-tofu',
      name: '铁板豆腐',
      tagline: '先煎定型再烧，翻动越少越好',
      art: 'veg',
      prep: 10, cook: 12, difficulty: 1, servings: 2,
      flavors: ['家常', '下饭', '素菜', '浓香'],
      ingredients: [
        { name: '北豆腐', amount: '1 块（约 400g）', cat: '其他' },
        { name: '洋葱', amount: '半个', cat: '蔬菜', note: '铺底用，出甜味' },
        { name: '青椒', amount: '1 个', cat: '蔬菜' },
        { name: '蒜', amount: '4 瓣', cat: '蔬菜' },
        { name: '小米辣', amount: '2 个', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '生抽', amount: '2 汤匙', role: '咸鲜主味' },
        { name: '蚝油', amount: '1 汤匙', role: '提鲜增稠' },
        { name: '白糖', amount: '半小勺', role: '提鲜' },
        { name: '辣椒面', amount: '1 小勺', role: '补辣度' },
        { name: '淀粉', amount: '半小勺', role: '最后勾薄芡' }
      ],
      steps: [
        { text: '豆腐切厚片，用厨房纸吸干，两面撒一点点盐。' },
        { text: '平底锅热油，豆腐片煎到两面金黄结壳。', tip: '煎好一面再翻，翻早了会粘掉皮。', timer: { label: '煎豆腐', seconds: 360 } },
        { text: '另起锅爆香蒜末和小米辣，下洋葱丝炒软。', timer: { label: '炒洋葱', seconds: 150 } },
        { text: '豆腐回锅，加生抽、蚝油、糖、辣椒面和半碗水。', timer: { label: '烧制', seconds: 300 } },
        { text: '下青椒块，水淀粉勾薄芡，收汁出锅。', timer: { label: '收汁', seconds: 90 } }
      ],
      variations: [
        { title: '肉末版', diff: '先炒香肉末再烧，素菜变硬菜。' },
        { title: '麻辣版', diff: '加豆瓣酱和花椒粉，重口味。' },
        { title: '铁板版', diff: '真用铁板的话，底下铺洋葱丝烧热再倒上去，会滋滋响。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/铁板豆腐做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=铁板豆腐' }
    },

    {
      id: 'di-san-xian',
      name: '地三鲜',
      tagline: '三样都过油才正宗，省油版用煎',
      art: 'veg',
      prep: 12, cook: 15, difficulty: 2, servings: 2,
      flavors: ['素菜', '下饭', '家常', '浓香'],
      ingredients: [
        { name: '长茄子', amount: '2 根', cat: '蔬菜' },
        { name: '土豆', amount: '2 个', cat: '蔬菜' },
        { name: '青椒', amount: '2 个', cat: '蔬菜' },
        { name: '蒜', amount: '4 瓣', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '生抽', amount: '2 汤匙', role: '咸鲜主味' },
        { name: '蚝油', amount: '1 汤匙', role: '提鲜' },
        { name: '白糖', amount: '半小勺', role: '提鲜' },
        { name: '淀粉', amount: '1 小勺', role: '勾薄芡' },
        { name: '盐', amount: '适量', role: '腌茄子出水用' }
      ],
      steps: [
        { text: '茄子切滚刀块撒盐腌十分钟挤干；土豆切滚刀块。', tip: '腌过的茄子不吃油，这是省油的关键。', timer: { label: '腌茄子', seconds: 600 } },
        { text: '平底锅多放点油，土豆块煎到表面金黄、筷子能穿透。', timer: { label: '煎土豆', seconds: 420 } },
        { text: '茄子下锅煎到软塌上色。', timer: { label: '煎茄子', seconds: 300 } },
        { text: '青椒块下锅快速过油到起虎皮，捞出。', timer: { label: '过青椒', seconds: 60 } },
        { text: '锅里留底油爆香蒜末，三样回锅，加生抽、蚝油、糖和少许水。', timer: { label: '合烧', seconds: 180 } },
        { text: '水淀粉勾薄芡，收汁出锅。', timer: { label: '收汁', seconds: 90 } }
      ],
      variations: [
        { title: '空气炸锅版', diff: '三样拌油 200 度烤十五分钟，油量砍掉七成。' },
        { title: '少油煎版', diff: '全程用不粘锅少油煎，卖相差一点但健康很多。' },
        { title: '加肉末版', diff: '蒜末后加肉末炒香，更丰盛。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/地三鲜做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=地三鲜' }
    },

    {
      id: 'potato-beef-stew',
      name: '土豆炖牛肉',
      tagline: '炖到土豆化在汤里，汤汁自然变稠',
      art: 'braised-pork',
      prep: 15, cook: 75, difficulty: 2, servings: 3,
      flavors: ['硬菜', '家常', '下饭', '浓香'],
      ingredients: [
        { name: '牛腩', amount: '500g', cat: '肉蛋', note: '带筋的炖完最香' },
        { name: '土豆', amount: '2 个', cat: '蔬菜' },
        { name: '胡萝卜', amount: '1 根', cat: '蔬菜' },
        { name: '洋葱', amount: '半个', cat: '蔬菜' },
        { name: '姜', amount: '4 片', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '生抽', amount: '3 汤匙', role: '咸鲜主味' },
        { name: '老抽', amount: '半汤匙', role: '上色' },
        { name: '料酒', amount: '2 汤匙', role: '焯水去腥' },
        { name: '八角', amount: '1 颗', role: '炖肉香气' },
        { name: '冰糖', amount: '1 小勺', role: '提亮回甜' },
        { name: '盐', amount: '适量', role: '最后尝过再加' }
      ],
      steps: [
        { text: '牛腩切块冷水下锅，加姜片料酒焯水，撇净浮沫温水冲净。', timer: { label: '焯水', seconds: 420 } },
        { text: '锅里油炒洋葱丝出甜味，牛腩回锅翻炒。', timer: { label: '炒洋葱', seconds: 180 } },
        { text: '加生抽、老抽、冰糖、八角炒匀，加没过肉的开水。', timer: { label: '加水', seconds: 60 } },
        { text: '煮开转小火炖到牛肉能用筷子插透。', tip: '中途别加冷水，一加肉就紧。', timer: { label: '炖牛肉', seconds: 3000 } },
        { text: '下土豆块和胡萝卜块继续炖到软烂。', timer: { label: '炖土豆', seconds: 1200 } },
        { text: '尝咸淡加盐，大火收汁到浓稠。', timer: { label: '收汁', seconds: 300 } }
      ],
      variations: [
        { title: '番茄版', diff: '加两个番茄一起炖，酸甜口更开胃。' },
        { title: '咖喱版', diff: '最后加咖喱块化开，变成咖喱牛肉。' },
        { title: '高压锅版', diff: '上汽后压 25 分钟，总时长砍一半。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/土豆炖牛肉做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=土豆炖牛肉' }
    },

    {
      id: 'cabbage-vermicelli',
      name: '白菜炖粉条',
      tagline: '东北家常，粉条吸饱汤才是重点',
      art: 'pot',
      prep: 10, cook: 20, difficulty: 1, servings: 3,
      flavors: ['家常', '下饭', '素菜', '养胃'],
      ingredients: [
        { name: '白菜', amount: '半棵', cat: '蔬菜', note: '帮叶分开' },
        { name: '红薯粉条', amount: '1 把（约 80g）', cat: '其他', note: '提前泡软' },
        { name: '五花肉', amount: '100g', cat: '肉蛋', note: '切片，素菜变香靠它' },
        { name: '蒜', amount: '3 瓣', cat: '蔬菜' },
        { name: '干辣椒', amount: '2 个', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '生抽', amount: '2 汤匙', role: '咸鲜主味' },
        { name: '老抽', amount: '半汤匙', role: '上色' },
        { name: '盐', amount: '适量', role: '出锅前尝过再加' },
        { name: '八角', amount: '1 颗', role: '炖菜香气' }
      ],
      steps: [
        { text: '五花肉片下锅小火煸出油。', timer: { label: '煸肉', seconds: 180 } },
        { text: '下蒜片和干辣椒爆香，加八角。', timer: { label: '爆香', seconds: 60 } },
        { text: '白菜帮下锅炒到变软出水，加生抽老抽。', timer: { label: '炒白菜帮', seconds: 240 } },
        { text: '加一碗水煮开，下泡软的粉条。', timer: { label: '炖粉条', seconds: 480 } },
        { text: '下白菜叶，炖到粉条透明、汤汁收浓。', timer: { label: '炖白菜叶', seconds: 240 } },
        { text: '尝咸淡加盐出锅。' }
      ],
      variations: [
        { title: '加豆腐版', diff: '加煎过的豆腐块，更扛饿。' },
        { title: '素版', diff: '不放五花肉，用油爆蒜，一样香。' },
        { title: '加丸子版', diff: '加几个肉丸一起炖，东北乱炖风格。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/白菜炖粉条做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=白菜炖粉条' }
    },

    {
      id: 'pickled-pork-belly',
      name: '酸菜白肉',
      tagline: '酸菜越炖越香，白肉片要薄',
      art: 'pot',
      prep: 15, cook: 50, difficulty: 2, servings: 3,
      flavors: ['家常', '硬菜', '酸', '养胃'],
      ingredients: [
        { name: '五花肉', amount: '500g', cat: '肉蛋', note: '整块煮，煮熟再切片' },
        { name: '酸菜', amount: '1 包（约 400g）', cat: '蔬菜', note: '东北酸菜，冲洗挤干' },
        { name: '粉条', amount: '1 小把', cat: '其他' },
        { name: '姜', amount: '4 片', cat: '蔬菜' },
        { name: '大葱', amount: '半根', cat: '蔬菜' },
        { name: '八角', amount: '1 颗', cat: '调料' }
      ],
      seasonings: [
        { name: '料酒', amount: '2 汤匙', role: '煮肉去腥' },
        { name: '盐', amount: '适量', role: '酸菜有咸味，最后尝过再加' },
        { name: '白胡椒粉', amount: '少许', role: '提香暖胃' }
      ],
      steps: [
        { text: '整块五花肉冷水下锅，加姜葱八角料酒煮到筷子能插透。', tip: '整块煮再切片，肉片才整齐不散。', timer: { label: '煮肉', seconds: 1800 } },
        { text: '酸菜冲洗挤干切丝，锅里煸干水汽。', tip: '煸干是酸菜香的关键。', timer: { label: '煸酸菜', seconds: 300 } },
        { text: '加煮肉的汤煮开，下酸菜丝炖。', timer: { label: '炖酸菜', seconds: 1200 } },
        { text: '煮好的五花肉切薄片，下锅和酸菜一起炖。', timer: { label: '炖白肉', seconds: 600 } },
        { text: '下泡软的粉条煮到透明，加盐和白胡椒调味。', timer: { label: '煮粉条', seconds: 480 } }
      ],
      variations: [
        { title: '血肠版', diff: '加血肠段一起煮，正宗东北杀猪菜。' },
        { title: '加冻豆腐版', diff: '冻豆腐吸汁，比肉还香。' },
        { title: '火锅版', diff: '做成火锅底，边煮边涮肉。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/酸菜白肉做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=酸菜白肉' }
    },

    {
      id: 'salted-egg-pumpkin',
      name: '咸蛋黄焗南瓜',
      tagline: '咸蛋黄要炒到起沙冒泡，才能裹住南瓜',
      art: 'veg',
      prep: 12, cook: 12, difficulty: 2, servings: 2,
      flavors: ['家常', '宴客', '素菜', '浓香'],
      ingredients: [
        { name: '南瓜', amount: '400g', cat: '蔬菜', note: '贝贝南瓜更粉糯' },
        { name: '咸蛋黄', amount: '4 个', cat: '肉蛋', note: '熟咸鸭蛋黄，压碎' },
        { name: '淀粉', amount: '2 汤匙', cat: '其他', note: '裹南瓜条用' }
      ],
      seasonings: [
        { name: '盐', amount: '1 小撮', role: '咸蛋黄够咸，一般不用加' },
        { name: '白糖', amount: '半小勺', role: '提鲜，压住蛋黄的腥' },
        { name: '食用油', amount: '适量', role: '炸或煎南瓜条' }
      ],
      steps: [
        { text: '南瓜去皮切条，裹一层薄淀粉。', tip: '裹粉能让蛋黄沙挂得住。' },
        { text: '油烧到六成热，南瓜条炸到表面微硬捞出。', tip: '不用炸透，表面定型就行，后面还要炒。', timer: { label: '炸南瓜', seconds: 180 } },
        { text: '锅里留一点油，咸蛋黄碎小火慢炒到起沙、冒细密小泡。', tip: '这一步是成败关键，火大了蛋黄会焦苦。', timer: { label: '炒蛋黄', seconds: 150 } },
        { text: '南瓜条下锅快速翻匀，让蛋黄沙均匀裹上，加糖，出锅。', timer: { label: '裹沙', seconds: 60 } }
      ],
      variations: [
        { title: '少油版', diff: '南瓜条用平底锅煎代替炸。' },
        { title: '焗虾版', diff: '南瓜换大虾，做法一样，宴客更体面。' },
        { title: '加豆角版', diff: '配焯熟的豆角段，颜色好看。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/咸蛋黄焗南瓜做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=咸蛋黄焗南瓜' }
    },

    {
      id: 'pine-nut-corn',
      name: '松仁玉米',
      tagline: '甜口的快手菜，玉米要焯水才甜脆',
      art: 'veg',
      prep: 8, cook: 8, difficulty: 1, servings: 2,
      flavors: ['快手', '素菜', '甜', '新手友好'],
      ingredients: [
        { name: '甜玉米粒', amount: '2 根的量', cat: '蔬菜', note: '现剥的甜玉米最好，罐头也行' },
        { name: '松仁', amount: '1 小把', cat: '其他', note: '生的要先用小火焙香' },
        { name: '青豆', amount: '1 把', cat: '蔬菜' },
        { name: '胡萝卜', amount: '半根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '白糖', amount: '1 汤匙', role: '甜口主味' },
        { name: '盐', amount: '1 小撮', role: '一点点咸能托出甜' },
        { name: '淀粉', amount: '半小勺', role: '勾薄芡' }
      ],
      steps: [
        { text: '玉米粒、青豆、胡萝卜丁下开水焯一分钟捞出沥干。', timer: { label: '焯水', seconds: 60 } },
        { text: '小火干锅焙松仁到微黄出香，盛出。', tip: '松仁容易糊，全程小火，闻到香味立刻倒出来。', timer: { label: '焙松仁', seconds: 120 } },
        { text: '锅里一点油，焯好的粒下锅翻炒。', timer: { label: '翻炒', seconds: 120 } },
        { text: '加糖和盐，水淀粉勾薄芡，撒松仁翻匀出锅。', tip: '松仁最后放，早放会回软不脆。' }
      ],
      variations: [
        { title: '咸口版', diff: '不放糖，加盐和葱花，清爽。' },
        { title: '加火腿版', diff: '加火腿丁，孩子更喜欢。' },
        { title: '腰果版', diff: '松仁换腰果碎，成本低不少。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/松仁玉米做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=松仁玉米' }
    },

    {
      id: 'stirfry-greens',
      name: '清炒时蔬',
      tagline: '什么菜都能炒，记住大火和盐最后放',
      art: 'veg',
      prep: 5, cook: 5, difficulty: 1, servings: 2,
      flavors: ['快手', '清淡', '素菜', '新手友好'],
      ingredients: [
        { name: '时令绿叶菜', amount: '400g', cat: '蔬菜', note: '菠菜、油麦菜、生菜、空心菜都行' },
        { name: '蒜', amount: '3 瓣', cat: '蔬菜' },
        { name: '干辣椒', amount: '1 个', cat: '蔬菜', note: '可选' }
      ],
      seasonings: [
        { name: '盐', amount: '适量', role: '出锅前放，早放会出水' },
        { name: '食用油', amount: '2 汤匙', role: '大火炒要油稍多一点' },
        { name: '蚝油', amount: '半汤匙', role: '可选，提鲜' }
      ],
      steps: [
        { text: '菜洗净沥干，蒜切片。', tip: '洗完一定要沥干，带水下锅会溅油还会变成煮。' },
        { text: '锅烧到冒烟倒油，下蒜片和干辣椒爆香。', timer: { label: '爆香', seconds: 30 } },
        { text: '菜下锅大火快炒到变软塌。', tip: '全程大火，锅不够热就出水。', timer: { label: '炒青菜', seconds: 90 } },
        { text: '加盐翻匀立刻出锅。', tip: '盐一定最后放，早放菜会出水变黄。' }
      ],
      variations: [
        { title: '蒜蓉版', diff: '蒜末加到一整头，蒜香浓郁。' },
        { title: '腐乳版', diff: '加半块腐乳压碎，风味很特别。' },
        { title: '上汤版', diff: '加一勺高汤略煮，更滋润。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/清炒时蔬做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=清炒时蔬' }
    },

    {
      id: 'supreme-soup-cabbage',
      name: '上汤娃娃菜',
      tagline: '高汤是灵魂，没有就用皮蛋和虾皮凑',
      art: 'veg',
      prep: 10, cook: 12, difficulty: 1, servings: 2,
      flavors: ['清淡', '粤式', '鲜', '家常'],
      ingredients: [
        { name: '娃娃菜', amount: '2 棵', cat: '蔬菜' },
        { name: '皮蛋', amount: '1 个', cat: '肉蛋', note: '切块，让汤变浓' },
        { name: '咸鸭蛋', amount: '1 个', cat: '肉蛋', note: '切块，提鲜' },
        { name: '虾皮', amount: '1 小把', cat: '水产', note: '没有高汤时靠它提鲜' },
        { name: '蒜', amount: '3 瓣', cat: '蔬菜' },
        { name: '枸杞', amount: '1 小撮', cat: '其他' }
      ],
      seasonings: [
        { name: '盐', amount: '适量', role: '皮蛋咸蛋都有咸味，最后尝过再加' },
        { name: '白胡椒粉', amount: '少许', role: '提香' },
        { name: '香油', amount: '几滴', role: '出锅点香' }
      ],
      steps: [
        { text: '娃娃菜竖切成四条，皮蛋和咸蛋切块。' },
        { text: '锅里油下蒜片爆香，下虾皮炒出香味。', timer: { label: '爆香', seconds: 60 } },
        { text: '下皮蛋咸蛋块略炒，加两碗开水或高汤煮开。', tip: '用高汤最好，没有的话虾皮和咸蛋能撑起鲜味。', timer: { label: '煮汤', seconds: 180 } },
        { text: '娃娃菜下锅煮到软透。', timer: { label: '煮娃娃菜', seconds: 300 } },
        { text: '撒枸杞，加盐和白胡椒，淋香油出锅。' }
      ],
      variations: [
        { title: '加粉丝版', diff: '加泡软的粉丝一起煮，一锅顶一餐。' },
        { title: '加肉末版', diff: '先炒香肉末，汤更厚实。' },
        { title: '纯素版', diff: '去掉皮蛋咸蛋，用香菇和枸杞提鲜。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/上汤娃娃菜做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=上汤娃娃菜' }
    },

    {
      id: 'garlic-scallop',
      name: '蒜蓉粉丝扇贝',
      tagline: '粉丝垫底接汁，蒸的时间宁短勿长',
      art: 'seabass',
      prep: 15, cook: 10, difficulty: 2, servings: 2,
      flavors: ['海鲜', '宴客', '硬菜', '鲜'],
      ingredients: [
        { name: '扇贝', amount: '6 只', cat: '水产', note: '让摊主剖开清理，回家刷净壳' },
        { name: '龙口粉丝', amount: '1 小把', cat: '其他', note: '泡软剪短' },
        { name: '蒜', amount: '1 整头', cat: '蔬菜' },
        { name: '小米辣', amount: '1 个', cat: '蔬菜' },
        { name: '小葱', amount: '1 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '蒸鱼豉油', amount: '3 汤匙', role: '鲜味来源' },
        { name: '食用油', amount: '3 汤匙', role: '淋热油激蒜香' },
        { name: '白糖', amount: '半小勺', role: '提鲜' }
      ],
      steps: [
        { text: '扇贝肉刷洗干净，壳也刷净；粉丝泡软。', timer: { label: '泡粉丝', seconds: 600 } },
        { text: '蒜切末，一半用油小火炒到微黄，和生蒜末混合。', tip: '半生半熟蒜香最有层次。', timer: { label: '炒蒜', seconds: 120 } },
        { text: '粉丝绕成小团放在壳里，摆上扇贝肉，铺蒜蓉。' },
        { text: '水开后上锅大火蒸。', tip: '扇贝蒸过头会缩水变硬，时间宁短。', timer: { label: '蒸扇贝', seconds: 480 } },
        { text: '出锅淋蒸鱼豉油，撒葱花小米辣，浇一勺热油。' }
      ],
      variations: [
        { title: '加粉丝版加强', diff: '粉丝多放一点，吸满汁很香。' },
        { title: '豆豉版', diff: '蒜蓉里加一点豆豉碎，风味更浓。' },
        { title: '芝士版', diff: '撒一层马苏里拉，烤箱烤到融化。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/蒜蓉粉丝扇贝做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=蒜蓉粉丝扇贝' }
    },

    {
      id: 'garlic-oyster',
      name: '蒜蓉烤生蚝',
      tagline: '烤箱 200 度十分钟，比碳烤省事',
      art: 'seabass',
      prep: 12, cook: 12, difficulty: 1, servings: 2,
      flavors: ['海鲜', '宴客', '快手', '鲜'],
      ingredients: [
        { name: '生蚝', amount: '6 只', cat: '水产', note: '让摊主撬开一半，回家冲洗' },
        { name: '蒜', amount: '1 整头', cat: '蔬菜' },
        { name: '小米辣', amount: '2 个', cat: '蔬菜' },
        { name: '小葱', amount: '1 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '生抽', amount: '2 汤匙', role: '咸鲜' },
        { name: '蚝油', amount: '1 汤匙', role: '提鲜' },
        { name: '白糖', amount: '半小勺', role: '提鲜' },
        { name: '食用油', amount: '3 汤匙', role: '炒蒜蓉用' }
      ],
      steps: [
        { text: '生蚝用刷子刷净外壳，撬开后冲掉碎壳。', tip: '蚝肉里有碎壳，一定要冲洗。' },
        { text: '蒜切末，用油小火炒到微黄，加生抽、蚝油、糖拌成蒜蓉酱。', tip: '蒜蓉炒过再烤才不冲，也会更香。', timer: { label: '炒蒜蓉', seconds: 180 } },
        { text: '蒜蓉酱铺在蚝肉上，烤箱 200 度预热后放入。', timer: { label: '烤生蚝', seconds: 600 } },
        { text: '出炉撒葱花和小米辣。', tip: '没有烤箱就用平底锅加盖焖，或者上锅蒸八分钟。' }
      ],
      variations: [
        { title: '原味版', diff: '只放一点点柠檬汁，吃蚝本身的鲜。' },
        { title: '芝士版', diff: '蒜蓉上再撒芝士，烤到融化拉丝。' },
        { title: '豆豉版', diff: '蒜蓉里加豆豉碎，粤式风味。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/蒜蓉烤生蚝做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=烤生蚝' }
    },

    {
      id: 'spicy-clams',
      name: '辣炒蛤蜊',
      tagline: '开口就熟，多炒一分钟肉就缩',
      art: 'seabass',
      prep: 15, cook: 8, difficulty: 1, servings: 2,
      flavors: ['海鲜', '快手', '下饭', '辣'],
      ingredients: [
        { name: '蛤蜊', amount: '600g', cat: '水产', note: '买回来先吐沙' },
        { name: '蒜', amount: '4 瓣', cat: '蔬菜' },
        { name: '姜', amount: '3 片', cat: '蔬菜' },
        { name: '干辣椒', amount: '5 个', cat: '蔬菜' },
        { name: '小葱', amount: '2 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '生抽', amount: '1 汤匙', role: '咸鲜' },
        { name: '料酒', amount: '2 汤匙', role: '去腥' },
        { name: '豆瓣酱', amount: '1 汤匙', role: '红油和咸香' },
        { name: '白糖', amount: '半小勺', role: '提鲜' }
      ],
      steps: [
        { text: '蛤蜊放盐水里滴几滴香油，静置吐沙。', tip: '水温别太高，滴香油能让蛤蜊更快吐干净。至少一小时。', timer: { label: '吐沙', seconds: 3600 } },
        { text: '蛤蜊反复搓洗到水清。' },
        { text: '锅里油下姜蒜、干辣椒、豆瓣酱炒出红油。', timer: { label: '炒料', seconds: 120 } },
        { text: '蛤蜊下锅大火翻炒，淋料酒。', timer: { label: '翻炒', seconds: 120 } },
        { text: '看到大部分开口就加生抽和糖，翻匀立刻出锅。', tip: '开口就熟，再炒肉就老了。没开口的是坏的，挑掉。', timer: { label: '收汁', seconds: 60 } },
        { text: '撒葱段出锅。' }
      ],
      variations: [
        { title: '蒜香不辣版', diff: '去掉豆瓣酱和干辣椒，蒜末加倍。' },
        { title: '九层塔版', diff: '出锅前加九层塔，台式风味。' },
        { title: '加粉丝版', diff: '底下垫泡软的粉丝吸汁。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/辣炒蛤蜊做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=辣炒蛤蜊' }
    },

    {
      id: 'spicy-crab',
      name: '香辣蟹',
      tagline: '切口裹淀粉封住肉汁，不然炒完只剩壳',
      art: 'seabass',
      prep: 20, cook: 15, difficulty: 3, servings: 3,
      flavors: ['海鲜', '硬菜', '宴客', '辣'],
      ingredients: [
        { name: '肉蟹', amount: '2 只', cat: '水产', note: '让摊主杀好切块，蟹钳拍裂' },
        { name: '蒜', amount: '5 瓣', cat: '蔬菜' },
        { name: '姜', amount: '4 片', cat: '蔬菜' },
        { name: '干辣椒', amount: '8 个', cat: '蔬菜' },
        { name: '淀粉', amount: '3 汤匙', cat: '其他', note: '封蟹肉用' },
        { name: '洋葱', amount: '半个', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '豆瓣酱', amount: '2 汤匙', role: '红油底味' },
        { name: '生抽', amount: '1 汤匙', role: '咸鲜' },
        { name: '料酒', amount: '2 汤匙', role: '去腥' },
        { name: '白糖', amount: '1 小勺', role: '提鲜' },
        { name: '花椒', amount: '1 小撮', role: '麻香' }
      ],
      steps: [
        { text: '蟹块洗净沥干，切口处蘸上干淀粉。', tip: '蘸粉是为了封住肉汁，不然一炒肉就全流出来。' },
        { text: '锅里多油，蟹块切口朝下煎到定型变红捞出。', timer: { label: '煎蟹', seconds: 240 } },
        { text: '锅留底油下姜蒜、干辣椒、花椒、豆瓣酱炒出红油。', timer: { label: '炒料', seconds: 180 } },
        { text: '蟹块回锅翻炒，淋料酒，加生抽、糖和少许水。', timer: { label: '烧蟹', seconds: 300 } },
        { text: '下洋葱块炒到断生，收汁出锅。', timer: { label: '收汁', seconds: 120 } }
      ],
      variations: [
        { title: '避风塘版', diff: '加大量炸蒜蓉和面包糠，不辣但极香。' },
        { title: '咖喱版', diff: '红油换咖喱，做成咖喱蟹。' },
        { title: '年糕版', diff: '加年糕条一起炒，吸汁又管饱。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/香辣蟹做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=香辣蟹' }
    },

    {
      id: 'boiled-fish',
      name: '水煮鱼',
      tagline: '鱼片薄、火候短，泼油那一下才完整',
      art: 'seabass',
      prep: 25, cook: 15, difficulty: 3, servings: 3,
      flavors: ['川菜', '硬菜', '宴客', '辣'],
      ingredients: [
        { name: '草鱼', amount: '1 条（约 1.2kg）', cat: '水产', note: '让摊主片成鱼片' },
        { name: '豆芽', amount: '300g', cat: '蔬菜' },
        { name: '蒜', amount: '5 瓣', cat: '蔬菜' },
        { name: '干辣椒', amount: '10 个', cat: '蔬菜' },
        { name: '淀粉', amount: '2 汤匙', cat: '其他', note: '鱼片上浆' }
      ],
      seasonings: [
        { name: '豆瓣酱', amount: '2 汤匙', role: '红油底味，炒透才香' },
        { name: '料酒', amount: '2 汤匙', role: '腌鱼去腥' },
        { name: '蛋清', amount: '1 个', role: '上浆锁水' },
        { name: '花椒粉', amount: '1 小勺', role: '麻味来源，最后放' },
        { name: '辣椒面', amount: '1 小勺', role: '补辣度' },
        { name: '食用油', amount: '5 汤匙', role: '最后泼热油' },
        { name: '盐', amount: '适量', role: '腌鱼和调味' }
      ],
      steps: [
        { text: '鱼片加盐轻抓出胶，冲洗沥干，加料酒、蛋清、淀粉抓匀上浆。', tip: '抓到鱼片发亮，静置十五分钟。', timer: { label: '上浆', seconds: 900 } },
        { text: '豆芽焯熟铺在大碗底。', timer: { label: '焯豆芽', seconds: 180 } },
        { text: '锅里油炒豆瓣酱出红油，加蒜末和一半干辣椒炒香。', timer: { label: '炒底料', seconds: 180 } },
        { text: '加水煮开调味，鱼片一片片下锅，变色即关火。', tip: '鱼片薄，变色再多十秒就够，久就散了。', timer: { label: '汆鱼片', seconds: 90 } },
        { text: '连汤倒进碗里，撒干辣椒段、花椒粉、辣椒面、蒜末。' },
        { text: '烧一勺热油到冒烟泼上去。', tip: '泼油那声「刺啦」是这道菜的灵魂。' }
      ],
      variations: [
        { title: '酸菜鱼版', diff: '红油换酸菜，酸辣开胃。' },
        { title: '番茄版', diff: '番茄汤底，酸香柔和，孩子能吃。' },
        { title: '微辣版', diff: '干辣椒减到三个，豆瓣酱减半。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/水煮鱼做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=水煮鱼' }
    },

    {
      id: 'tomato-fish',
      name: '番茄鱼片',
      tagline: '不辣但很下饭，鱼片用龙利鱼最省事',
      art: 'seabass',
      prep: 15, cook: 15, difficulty: 2, servings: 2,
      flavors: ['清淡', '酸甜', '家常', '新手友好'],
      ingredients: [
        { name: '龙利鱼柳', amount: '400g', cat: '水产', note: '没刺，新手友好；用草鱼片也行' },
        { name: '番茄', amount: '3 个', cat: '蔬菜', note: '熟透的软番茄' },
        { name: '金针菇', amount: '1 把', cat: '蔬菜' },
        { name: '蒜', amount: '3 瓣', cat: '蔬菜' },
        { name: '小葱', amount: '1 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '淀粉', amount: '1 汤匙', role: '鱼片上浆' },
        { name: '料酒', amount: '1 汤匙', role: '腌鱼去腥' },
        { name: '盐', amount: '适量', role: '调味' },
        { name: '白糖', amount: '1 小勺', role: '压番茄的酸' },
        { name: '番茄酱', amount: '1 汤匙', role: '补酸和颜色' },
        { name: '白胡椒粉', amount: '少许', role: '去腥提香' }
      ],
      steps: [
        { text: '鱼柳斜刀片成薄片，加料酒、白胡椒、淀粉抓匀上浆。', tip: '龙利鱼很嫩，别抓太久会碎。', timer: { label: '上浆', seconds: 600 } },
        { text: '番茄划十字烫一下去皮切块，金针菇去根洗净。', timer: { label: '处理番茄', seconds: 120 } },
        { text: '锅里油炒番茄块到软烂出沙。', tip: '炒出沙汤才浓，别直接加水煮。', timer: { label: '炒番茄', seconds: 300 } },
        { text: '加番茄酱、糖和两碗水煮开，下金针菇。', timer: { label: '煮汤', seconds: 300 } },
        { text: '鱼片一片片下锅，变色即关火。', tip: '鱼片下锅后别搅，轻轻推一下就行。', timer: { label: '汆鱼片', seconds: 90 } },
        { text: '加盐调味，撒葱花出锅。' }
      ],
      variations: [
        { title: '加豆腐版', diff: '加嫩豆腐块，汤更厚实。' },
        { title: '酸辣版', diff: '加白胡椒和醋，暖身开胃。' },
        { title: '浓汤版', diff: '番茄加倍，煮到汤浓稠，泡饭一绝。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/番茄鱼片做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=番茄鱼' }
    },

    {
      id: 'braised-lamb',
      name: '红焖羊肉',
      tagline: '羊肉焯水后要煸，膻味去大半',
      art: 'braised-pork',
      prep: 20, cook: 80, difficulty: 3, servings: 3,
      flavors: ['硬菜', '宴客', '下饭', '浓香'],
      ingredients: [
        { name: '羊腿肉', amount: '700g', cat: '肉蛋', note: '带点筋的更适合炖' },
        { name: '胡萝卜', amount: '2 根', cat: '蔬菜' },
        { name: '洋葱', amount: '1 个', cat: '蔬菜' },
        { name: '姜', amount: '5 片', cat: '蔬菜' },
        { name: '蒜', amount: '5 瓣', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '生抽', amount: '3 汤匙', role: '咸鲜主味' },
        { name: '老抽', amount: '半汤匙', role: '上色' },
        { name: '料酒', amount: '3 汤匙', role: '去膻，羊肉要多放' },
        { name: '冰糖', amount: '1 小勺', role: '提亮回甜' },
        { name: '八角', amount: '2 颗', role: '炖肉香气' },
        { name: '桂皮', amount: '1 小段', role: '去膻增香' }
      ],
      steps: [
        { text: '羊肉切块冷水下锅，加姜片料酒焯水，撇净浮沫捞出。', tip: '羊肉浮沫特别多，要撇干净。', timer: { label: '焯水', seconds: 480 } },
        { text: '锅里不放油，羊肉块下锅煸到表面微焦出油。', tip: '煸这一步能去大半膻味，别省。', timer: { label: '煸羊肉', seconds: 360 } },
        { text: '下姜蒜、八角、桂皮炒香，加料酒炝锅。', timer: { label: '爆香', seconds: 90 } },
        { text: '加生抽、老抽、冰糖炒匀，加没过肉的开水。', timer: { label: '加水', seconds: 60 } },
        { text: '煮开转小火炖到羊肉软烂。', timer: { label: '炖羊肉', seconds: 3000 } },
        { text: '下胡萝卜块和洋葱块炖软，大火收汁。', timer: { label: '炖配菜', seconds: 900 } }
      ],
      variations: [
        { title: '白萝卜版', diff: '胡萝卜换白萝卜，清甜解腻。' },
        { title: '加腐竹版', diff: '起锅前二十分钟加泡软的腐竹。' },
        { title: '高压锅版', diff: '上汽后压 20 分钟，总时长砍一半。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/红焖羊肉做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=红焖羊肉' }
    },

    {
      id: 'radish-beef-stew',
      name: '萝卜炖牛腩',
      tagline: '萝卜后放，早放就化在汤里了',
      art: 'braised-pork',
      prep: 15, cook: 85, difficulty: 2, servings: 3,
      flavors: ['硬菜', '家常', '下饭', '浓香'],
      ingredients: [
        { name: '牛腩', amount: '600g', cat: '肉蛋' },
        { name: '白萝卜', amount: '1 个', cat: '蔬菜', note: '秋冬的萝卜最甜' },
        { name: '姜', amount: '4 片', cat: '蔬菜' },
        { name: '蒜', amount: '4 瓣', cat: '蔬菜' },
        { name: '小葱', amount: '2 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '生抽', amount: '3 汤匙', role: '咸鲜主味' },
        { name: '料酒', amount: '2 汤匙', role: '焯水去腥' },
        { name: '八角', amount: '1 颗', role: '炖肉香气' },
        { name: '桂皮', amount: '1 小段', role: '增香' },
        { name: '冰糖', amount: '1 小勺', role: '提鲜回甜' },
        { name: '盐', amount: '适量', role: '最后尝过再加' }
      ],
      steps: [
        { text: '牛腩切块冷水焯水，撇净浮沫温水冲净。', timer: { label: '焯水', seconds: 420 } },
        { text: '锅里油下姜蒜、八角、桂皮炒香，牛腩回锅翻炒。', timer: { label: '爆香', seconds: 120 } },
        { text: '加生抽、冰糖炒匀，加没过肉的开水。', timer: { label: '加水', seconds: 60 } },
        { text: '煮开转小火炖到牛肉基本软了。', timer: { label: '炖牛肉', seconds: 3000 } },
        { text: '萝卜切滚刀块下锅，炖到透明软糯。', tip: '萝卜后放才不会炖化，也能吸到肉味。', timer: { label: '炖萝卜', seconds: 1200 } },
        { text: '尝咸淡加盐，撒葱花出锅。' }
      ],
      variations: [
        { title: '清汤版', diff: '不加生抽和冰糖，只炖出清汤，配蘸料吃。' },
        { title: '加土豆版', diff: '萝卜换土豆，口感更面。' },
        { title: '番茄版', diff: '加番茄一起炖，酸甜更开胃。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/萝卜炖牛腩做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=萝卜炖牛腩' }
    },

    {
      id: 'braised-beef-shank',
      name: '卤牛肉',
      tagline: '卤完必须泡够时间，急着切会散',
      art: 'braised-pork',
      prep: 20, cook: 80, difficulty: 2, servings: 4,
      flavors: ['硬菜', '凉菜', '宴客', '浓香'],
      ingredients: [
        { name: '牛腱子', amount: '800g', cat: '肉蛋', note: '牛腱有筋，卤完切片好看' },
        { name: '姜', amount: '5 片', cat: '蔬菜' },
        { name: '大葱', amount: '1 根', cat: '蔬菜' },
        { name: '八角', amount: '2 颗', cat: '调料' },
        { name: '桂皮', amount: '1 小段', cat: '调料' },
        { name: '香叶', amount: '3 片', cat: '调料' },
        { name: '干辣椒', amount: '3 个', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '生抽', amount: '半碗（约 120ml）', role: '咸鲜主味' },
        { name: '老抽', amount: '2 汤匙', role: '上色' },
        { name: '料酒', amount: '3 汤匙', role: '去腥' },
        { name: '冰糖', amount: '20g', role: '提亮回甜' },
        { name: '盐', amount: '适量', role: '卤汤要偏咸一点才入味' }
      ],
      steps: [
        { text: '牛腱整块冷水下锅焯水，撇净浮沫捞出冲洗。', timer: { label: '焯水', seconds: 480 } },
        { text: '锅里加水、所有香料、生抽、老抽、料酒、冰糖煮开成卤汤。', timer: { label: '调卤汤', seconds: 300 } },
        { text: '牛腱下锅，煮开转小火保持微沸慢卤。', tip: '火不能大，一滚肉就散。', timer: { label: '卤制', seconds: 3600 } },
        { text: '关火后让牛肉泡在卤汤里自然冷却。', tip: '泡这一步比煮更重要 —— 急着捞出来切会散，也进不去味。至少两小时，隔夜最好。', timer: { label: '浸泡', seconds: 7200 } },
        { text: '取出逆纹切薄片，浇一点卤汁。' }
      ],
      variations: [
        { title: '辣卤版', diff: '干辣椒加倍，加豆瓣酱。' },
        { title: '卤牛腱配面', diff: '卤汤煮面，加牛肉片就是牛肉面。' },
        { title: '卤蛋版', diff: '顺便丢几个煮好的鸡蛋进去一起卤。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/卤牛肉做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=卤牛肉' }
    },

    {
      id: 'mushroom-tofu-mince',
      name: '香菇肉末豆腐',
      tagline: '豆腐先煎，肉末炒散，一荤一素很家常',
      art: 'veg',
      prep: 10, cook: 12, difficulty: 1, servings: 2,
      flavors: ['家常', '下饭', '快手', '新手友好'],
      ingredients: [
        { name: '嫩豆腐', amount: '1 盒', cat: '其他', note: '嫩豆腐更滑，老豆腐更耐炒' },
        { name: '猪肉末', amount: '150g', cat: '肉蛋' },
        { name: '香菇', amount: '5 朵', cat: '蔬菜', note: '切丁，干香菇更香' },
        { name: '蒜', amount: '3 瓣', cat: '蔬菜' },
        { name: '小葱', amount: '2 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '生抽', amount: '2 汤匙', role: '咸鲜主味' },
        { name: '蚝油', amount: '1 汤匙', role: '提鲜' },
        { name: '料酒', amount: '1 汤匙', role: '炒肉末去腥' },
        { name: '淀粉', amount: '1 小勺', role: '勾薄芡' },
        { name: '白糖', amount: '半小勺', role: '提鲜' }
      ],
      steps: [
        { text: '豆腐切方块，香菇切丁，蒜切末。' },
        { text: '平底锅热油，豆腐块煎到两面微黄，盛出。', tip: '嫩豆腐容易碎，煎的时候别频繁翻。', timer: { label: '煎豆腐', seconds: 300 } },
        { text: '锅里油炒肉末到变色散开，加料酒。', timer: { label: '炒肉末', seconds: 150 } },
        { text: '下蒜末和香菇丁炒香。', timer: { label: '炒香菇', seconds: 120 } },
        { text: '豆腐回锅，加生抽、蚝油、糖和半碗水，轻推几下焖一会儿。', tip: '用推不要用翻，豆腐才不碎。', timer: { label: '焖煮', seconds: 240 } },
        { text: '水淀粉勾薄芡，撒葱花出锅。', timer: { label: '收汁', seconds: 90 } }
      ],
      variations: [
        { title: '麻辣版', diff: '加豆瓣酱和花椒粉，往麻婆豆腐靠。' },
        { title: '素版', diff: '肉末换杏鲍菇碎，一样鲜。' },
        { title: '加木耳版', diff: '加泡发的木耳丁，口感更丰富。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/香菇肉末豆腐做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=肉末豆腐' }
    },

    {
      id: 'clam-steamed-egg',
      name: '蛤蜊蒸蛋',
      tagline: '蛤蜊开口就捞出，蒸久了肉会老',
      art: 'tomato-egg',
      prep: 15, cook: 12, difficulty: 2, servings: 2,
      flavors: ['清淡', '新手友好', '鲜', '养胃'],
      ingredients: [
        { name: '蛤蜊', amount: '300g', cat: '水产', note: '提前吐沙' },
        { name: '鸡蛋', amount: '3 个', cat: '肉蛋' },
        { name: '温水', amount: '约 250ml', cat: '其他', note: '蛋液的 1.5 倍，微温不烫' },
        { name: '姜', amount: '2 片', cat: '蔬菜' },
        { name: '小葱', amount: '1 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '盐', amount: '1 小撮', role: '帮助蛋液凝固更均匀' },
        { name: '蒸鱼豉油', amount: '1 汤匙', role: '出锅后淋，提鲜' },
        { name: '香油', amount: '几滴', role: '增香' },
        { name: '料酒', amount: '1 汤匙', role: '焯蛤蜊去腥' }
      ],
      steps: [
        { text: '蛤蜊吐沙洗净，水开加姜片料酒下锅焯到刚开口就捞出。', tip: '一开口就捞，肉才嫩。焯的水别倒，沉淀后取上层做汤底。', timer: { label: '焯蛤蜊', seconds: 120 } },
        { text: '鸡蛋打散，加盐和 1.5 倍的温水（或用蛤蜊汤）搅匀，过筛。', tip: '过筛滤掉泡沫，蒸出来才平滑。' },
        { text: '蛤蜊摆进深盘，倒入蛋液，盖上保鲜膜或盘子。', timer: { label: '准备', seconds: 120 } },
        { text: '水开后中小火蒸。', tip: '中小火，火大了会起蜂窝。', timer: { label: '蒸蛋', seconds: 600 } },
        { text: '出锅淋蒸鱼豉油和香油，撒葱花。' }
      ],
      variations: [
        { title: '虾仁版', diff: '蛤蜊换虾仁，鲜味更清。' },
        { title: '纯水蒸蛋版', diff: '不放蛤蜊，就是水蒸蛋。' },
        { title: '加豆腐版', diff: '碗底铺内酯豆腐，一半豆腐一半蛋。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/蛤蜊蒸蛋做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=蛤蜊蒸蛋' }
    },

    {
      id: 'plain-noodle-soup',
      name: '阳春面',
      tagline: '汤清面爽，一碗见功力',
      art: 'pot',
      prep: 5, cook: 8, difficulty: 1, servings: 1,
      flavors: ['快手', '清淡', '主食', '养胃'],
      ingredients: [
        { name: '细面条', amount: '150g', cat: '其他', note: '细圆面最对味' },
        { name: '小葱', amount: '2 根', cat: '蔬菜', note: '葱是这道菜唯一的配料' },
        { name: '猪油', amount: '1 小勺', cat: '其他', note: '灵魂，素油替代就少了那个香' }
      ],
      seasonings: [
        { name: '生抽', amount: '2 汤匙', role: '咸鲜主味' },
        { name: '盐', amount: '适量', role: '调味' },
        { name: '白胡椒粉', amount: '少许', role: '提香' }
      ],
      steps: [
        { text: '碗里放猪油、生抽、盐、白胡椒，葱花。', tip: '料直接放碗里，靠热汤冲开，这是阳春面的做法。' },
        { text: '锅里水烧开，舀一勺冲进碗里把料化开。' },
        { text: '面条下锅煮到断生。', tip: '别煮太烂，断生带一点硬芯正好。', timer: { label: '煮面', seconds: 180 } },
        { text: '面条捞进碗里，舀面汤冲满，撒葱花。' }
      ],
      variations: [
        { title: '加蛋版', diff: '卧一个荷包蛋，就是最常见的早饭。' },
        { title: '酱油汤版', diff: '没有猪油就用香油，清爽版。' },
        { title: '加青菜版', diff: '烫几棵小青菜一起放。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/阳春面做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=阳春面' }
    },

    {
      id: 'dandan-noodle',
      name: '担担面',
      tagline: '麻酱和红油在碗底，拌开才香',
      art: 'pot',
      prep: 12, cook: 12, difficulty: 2, servings: 2,
      flavors: ['川菜', '主食', '辣', '下饭'],
      ingredients: [
        { name: '细面条', amount: '250g', cat: '其他' },
        { name: '猪肉末', amount: '150g', cat: '肉蛋' },
        { name: '芽菜', amount: '2 汤匙', cat: '蔬菜', note: '宜宾芽菜，没有用榨菜碎代替' },
        { name: '蒜', amount: '3 瓣', cat: '蔬菜' },
        { name: '小葱', amount: '2 根', cat: '蔬菜' },
        { name: '花生米', amount: '1 把', cat: '其他' }
      ],
      seasonings: [
        { name: '芝麻酱', amount: '2 汤匙', role: '麻香主味，要澥开' },
        { name: '辣椒油', amount: '2 汤匙', role: '红油，辣度自己调' },
        { name: '生抽', amount: '2 汤匙', role: '咸鲜' },
        { name: '香醋', amount: '1 汤匙', role: '提酸解腻' },
        { name: '花椒粉', amount: '1 小勺', role: '麻味来源' },
        { name: '白糖', amount: '半小勺', role: '提鲜' }
      ],
      steps: [
        { text: '芝麻酱加温水一点点澥开成能流动的糊。', tip: '澥酱要一点点加水，一次加太多会结块。' },
        { text: '锅里油炒肉末到变色出油，下芽菜碎炒香。', tip: '肉末要炒到干香，这才叫「臊子」。', timer: { label: '炒臊子', seconds: 300 } },
        { text: '碗里放澥好的芝麻酱、生抽、醋、糖、辣椒油、花椒粉、蒜末。' },
        { text: '面条煮熟捞出放进碗里。', timer: { label: '煮面', seconds: 240 } },
        { text: '浇上肉末臊子，撒花生碎和葱花，从底部拌开。', tip: '一定要从碗底往上拌，料都沉在下面。' }
      ],
      variations: [
        { title: '干拌版', diff: '不加面汤，纯干拌，味更浓。' },
        { title: '汤面版', diff: '加一勺面汤或高汤，成都家常吃法。' },
        { title: '素版', diff: '肉末换香菇碎，一样有嚼头。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/担担面做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=担担面' }
    },

    {
      id: 'fried-noodles',
      name: '家常炒面',
      tagline: '面要先煮到八分熟，炒的时候才不坨',
      art: 'pot',
      prep: 12, cook: 12, difficulty: 1, servings: 2,
      flavors: ['主食', '快手', '家常', '新手友好'],
      ingredients: [
        { name: '面条', amount: '300g', cat: '其他', note: '粗一点的鲜面更好炒' },
        { name: '猪肉', amount: '150g', cat: '肉蛋', note: '切丝' },
        { name: '包菜', amount: '1/4 棵', cat: '蔬菜' },
        { name: '胡萝卜', amount: '半根', cat: '蔬菜' },
        { name: '洋葱', amount: '半个', cat: '蔬菜' },
        { name: '蒜', amount: '3 瓣', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '生抽', amount: '3 汤匙', role: '咸鲜主味，也是上色' },
        { name: '老抽', amount: '半汤匙', role: '上色' },
        { name: '蚝油', amount: '1 汤匙', role: '提鲜' },
        { name: '料酒', amount: '1 汤匙', role: '腌肉去腥' },
        { name: '淀粉', amount: '半小勺', role: '腌肉' }
      ],
      steps: [
        { text: '面条煮到八分熟捞出，过冷水拌一点油防粘。', tip: '煮到还有硬芯就捞，后面还要炒。过冷水能洗掉表面淀粉。', timer: { label: '煮面', seconds: 180 } },
        { text: '肉丝加料酒、淀粉抓匀，配菜切丝。' },
        { text: '锅热油炒肉丝到变色盛出。', timer: { label: '炒肉丝', seconds: 120 } },
        { text: '下蒜片、洋葱、胡萝卜、包菜丝大火炒到断生。', timer: { label: '炒配菜', seconds: 180 } },
        { text: '面条下锅，加生抽、老抽、蚝油，用筷子挑散翻炒。', tip: '用筷子炒比铲子好，能把面抖散不结团。', timer: { label: '炒面', seconds: 240 } },
        { text: '肉丝回锅翻匀出锅。' }
      ],
      variations: [
        { title: '鸡蛋版', diff: '加两个炒散的鸡蛋，最家常。' },
        { title: '辣炒版', diff: '加干辣椒和豆瓣酱，口味更重。' },
        { title: '海鲜版', diff: '肉丝换虾仁和鱿鱼，鲜味更足。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/家常炒面做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=炒面' }
    },

    {
      id: 'pumpkin-millet-congee',
      name: '南瓜小米粥',
      tagline: '小米开水下锅才不糊底，南瓜后放',
      art: 'pot',
      prep: 8, cook: 30, difficulty: 1, servings: 2,
      flavors: ['清淡', '养胃', '新手友好', '甜'],
      ingredients: [
        { name: '小米', amount: '半杯（约 80g）', cat: '其他', note: '新小米颜色金黄，更香' },
        { name: '南瓜', amount: '200g', cat: '蔬菜', note: '贝贝南瓜更粉更甜' },
        { name: '枸杞', amount: '1 小撮', cat: '其他' }
      ],
      seasonings: [
        { name: '冰糖', amount: '1 小勺', role: '南瓜本身就甜，可省' }
      ],
      steps: [
        { text: '小米轻轻淘洗一遍，别搓，营养都在表层。', tip: '小米不用泡，也不用用力搓洗。' },
        { text: '水烧开后下小米，煮开转小火。', tip: '开水下锅是小米不糊底的关键。', timer: { label: '熬粥', seconds: 1200 } },
        { text: '南瓜去皮切块下锅一起煮。', timer: { label: '煮南瓜', seconds: 900 } },
        { text: '煮到南瓜软烂、粥变稠，用勺子把南瓜压碎搅匀。' },
        { text: '撒枸杞，焖两分钟出锅。', timer: { label: '焖', seconds: 120 } }
      ],
      variations: [
        { title: '加山药版', diff: '加山药块，更养胃也更稠。' },
        { title: '咸口版', diff: '不放糖，加一点点盐，配小菜吃。' },
        { title: '加红枣版', diff: '加几颗红枣，甜味更自然。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/南瓜小米粥做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=南瓜小米粥' }
    },

    {
      id: 'scallion-pancake',
      name: '葱花饼',
      tagline: '油酥是分层的秘密，没有就只是死面饼',
      art: 'pot',
      prep: 25, cook: 15, difficulty: 2, servings: 3,
      flavors: ['主食', '家常', '小吃', '新手友好'],
      ingredients: [
        { name: '中筋面粉', amount: '300g', cat: '其他' },
        { name: '温水', amount: '约 180ml', cat: '其他', note: '60℃ 左右，烫面更软' },
        { name: '小葱', amount: '5 根', cat: '蔬菜', note: '只要葱绿，切细花' }
      ],
      seasonings: [
        { name: '食用油', amount: '3 汤匙', role: '一部分做油酥，一部分煎饼' },
        { name: '面粉', amount: '2 汤匙', role: '和油调成油酥' },
        { name: '盐', amount: '适量', role: '面里和油酥里都放一点' }
      ],
      steps: [
        { text: '面粉加温水和盐揉成软面团，盖湿布醒面。', tip: '面团要软，硬了饼就硬。醒够时间才擀得开。', timer: { label: '醒面', seconds: 1800 } },
        { text: '两勺面粉加热油调成稀糊状油酥，加一点盐。' },
        { text: '面团擀成大薄片，抹上油酥，撒满葱花。' },
        { text: '从一边卷成长条，再盘成螺旋状，压扁擀成饼。', tip: '卷和盘这两步制造了层次，是分层的原理。' },
        { text: '平底锅中小火少油，两面煎到金黄。', tip: '火不能大，外面焦了里面还没熟。', timer: { label: '煎饼', seconds: 360 } }
      ],
      variations: [
        { title: '千层版', diff: '油酥抹厚一点，卷的圈数多一些，层数更多。' },
        { title: '发面版', diff: '加酵母发到两倍大再烙，口感更松软。' },
        { title: '加油渣版', diff: '葱花里加一点猪油渣，香很多。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/葱花饼做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=葱花饼' }
    }
  ]);

  window.__EXTRA_RECIPES = B;

  /* 著录信息：与前面几批合并，不覆盖 */
  var XM = window.__EXTRA_META || {};
  var M = {
    'curry-chicken': { no: 'No.71', latin: 'Pullus cum curcuma', family: '禽肉科', season: '四季', origin: '日式 · 家常',
      flavor: { '咸': 3, '甜': 1, '酸': 0, '鲜': 3, '辣': 1, '油': 3 }, annot: [{ x: 34, y: 48, tx: 44, ty: 62, t: '鸡块' }, { x: 68, y: 44, tx: 56, ty: 58, t: '土豆' }] },
    'beer-duck': { no: 'No.72', latin: 'Anas cum cervisia', family: '禽肉科', season: '四季', origin: '家常',
      flavor: { '咸': 3, '甜': 1, '酸': 0, '鲜': 4, '辣': 2, '油': 4 }, annot: [{ x: 34, y: 48, tx: 44, ty: 62, t: '鸭块' }, { x: 68, y: 40, tx: 56, ty: 54, t: '啤酒' }] },
    'salt-baked-chicken': { no: 'No.73', latin: 'Pullus sale conditus', family: '禽肉科', season: '四季', origin: '客家',
      flavor: { '咸': 3, '甜': 0, '酸': 0, '鲜': 4, '辣': 0, '油': 2 }, annot: [{ x: 36, y: 48, tx: 46, ty: 62, t: '鸡' }, { x: 68, y: 42, tx: 56, ty: 56, t: '盐焗粉' }] },
    'white-cut-chicken': { no: 'No.74', latin: 'Pullus simpliciter coctus', family: '禽肉科', season: '四季', origin: '粤式',
      flavor: { '咸': 2, '甜': 0, '酸': 0, '鲜': 4, '辣': 0, '油': 2 }, annot: [{ x: 36, y: 48, tx: 46, ty: 62, t: '鸡' }, { x: 68, y: 42, tx: 56, ty: 56, t: '姜葱' }] },
    'chicken-mushroom-stew': { no: 'No.75', latin: 'Pullus cum boletis', family: '禽肉科', season: '秋冬', origin: '东北',
      flavor: { '咸': 3, '甜': 1, '酸': 0, '鲜': 4, '辣': 0, '油': 3 }, annot: [{ x: 32, y: 46, tx: 42, ty: 62, t: '鸡块' }, { x: 68, y: 56, tx: 56, ty: 64, t: '榛蘑' }] },
    'sizzling-tofu': { no: 'No.76', latin: 'Caseus soiae in patina', family: '豆科', season: '四季', origin: '家常',
      flavor: { '咸': 3, '甜': 0, '酸': 0, '鲜': 3, '辣': 2, '油': 3 }, annot: [{ x: 36, y: 50, tx: 46, ty: 64, t: '豆腐' }, { x: 68, y: 58, tx: 56, ty: 66, t: '洋葱' }] },
    'di-san-xian': { no: 'No.77', latin: 'Tres terrae deliciae', family: '杂烩科', season: '夏秋', origin: '东北',
      flavor: { '咸': 3, '甜': 0, '酸': 0, '鲜': 3, '辣': 0, '油': 4 }, annot: [{ x: 30, y: 48, tx: 42, ty: 62, t: '茄子' }, { x: 70, y: 52, tx: 58, ty: 62, t: '土豆' }] },
    'potato-beef-stew': { no: 'No.78', latin: 'Bubula cum solano', family: '畜肉科', season: '四季', origin: '家常',
      flavor: { '咸': 3, '甜': 1, '酸': 0, '鲜': 4, '辣': 0, '油': 3 }, annot: [{ x: 32, y: 48, tx: 42, ty: 62, t: '牛腩' }, { x: 68, y: 44, tx: 56, ty: 58, t: '土豆' }] },
    'cabbage-vermicelli': { no: 'No.79', latin: 'Brassica cum vermicellis', family: '叶菜科', season: '秋冬', origin: '东北',
      flavor: { '咸': 3, '甜': 0, '酸': 0, '鲜': 3, '辣': 1, '油': 2 }, annot: [{ x: 34, y: 46, tx: 44, ty: 62, t: '白菜' }, { x: 68, y: 58, tx: 56, ty: 66, t: '粉条' }] },
    'pickled-pork-belly': { no: 'No.80', latin: 'Porcellus cum brassica acida', family: '畜肉科', season: '秋冬', origin: '东北',
      flavor: { '咸': 3, '甜': 0, '酸': 4, '鲜': 3, '辣': 0, '油': 3 }, annot: [{ x: 34, y: 46, tx: 44, ty: 62, t: '白肉' }, { x: 68, y: 56, tx: 56, ty: 64, t: '酸菜' }] },
    'salted-egg-pumpkin': { no: 'No.81', latin: 'Cucurbita cum vitello salso', family: '葫芦科', season: '秋冬', origin: '粤式',
      flavor: { '咸': 3, '甜': 1, '酸': 0, '鲜': 4, '辣': 0, '油': 3 }, annot: [{ x: 36, y: 48, tx: 46, ty: 62, t: '南瓜' }, { x: 68, y: 58, tx: 56, ty: 66, t: '蛋黄沙' }] },
    'pine-nut-corn': { no: 'No.82', latin: 'Maizium cum nucibus pini', family: '禾本科', season: '四季', origin: '家常',
      flavor: { '咸': 1, '甜': 3, '酸': 0, '鲜': 2, '辣': 0, '油': 2 }, annot: [{ x: 36, y: 48, tx: 46, ty: 62, t: '玉米' }, { x: 68, y: 58, tx: 56, ty: 66, t: '松仁' }] },
    'stirfry-greens': { no: 'No.83', latin: 'Holera fricta', family: '叶菜科', season: '四季', origin: '家常',
      flavor: { '咸': 2, '甜': 0, '酸': 0, '鲜': 2, '辣': 0, '油': 2 }, annot: [{ x: 40, y: 48, tx: 48, ty: 62, t: '青菜' }, { x: 66, y: 58, tx: 54, ty: 66, t: '蒜片' }] },
    'supreme-soup-cabbage': { no: 'No.84', latin: 'Brassica in iure supremo', family: '叶菜科', season: '四季', origin: '粤式',
      flavor: { '咸': 2, '甜': 0, '酸': 0, '鲜': 4, '辣': 0, '油': 1 }, annot: [{ x: 34, y: 46, tx: 44, ty: 62, t: '娃娃菜' }, { x: 68, y: 56, tx: 56, ty: 64, t: '皮蛋' }] },
    'garlic-scallop': { no: 'No.85', latin: 'Pectines cum allio', family: '水产科', season: '四季', origin: '粤式',
      flavor: { '咸': 2, '甜': 0, '酸': 0, '鲜': 4, '辣': 1, '油': 2 }, annot: [{ x: 36, y: 48, tx: 46, ty: 62, t: '扇贝' }, { x: 68, y: 58, tx: 56, ty: 66, t: '粉丝' }] },
    'garlic-oyster': { no: 'No.86', latin: 'Ostreae cum allio', family: '水产科', season: '四季', origin: '粤式',
      flavor: { '咸': 3, '甜': 0, '酸': 0, '鲜': 4, '辣': 1, '油': 2 }, annot: [{ x: 36, y: 50, tx: 46, ty: 64, t: '生蚝' }, { x: 68, y: 40, tx: 56, ty: 54, t: '蒜蓉' }] },
    'spicy-clams': { no: 'No.87', latin: 'Veneridae piperatae', family: '水产科', season: '夏秋', origin: '家常',
      flavor: { '咸': 3, '甜': 0, '酸': 0, '鲜': 4, '辣': 3, '油': 2 }, annot: [{ x: 36, y: 48, tx: 46, ty: 62, t: '蛤蜊' }, { x: 68, y: 40, tx: 56, ty: 54, t: '干辣椒' }] },
    'spicy-crab': { no: 'No.88', latin: 'Cancer piperatus', family: '水产科', season: '秋冬', origin: '川湘',
      flavor: { '咸': 3, '甜': 0, '酸': 0, '鲜': 4, '辣': 4, '油': 4 }, annot: [{ x: 32, y: 48, tx: 42, ty: 62, t: '蟹块' }, { x: 70, y: 40, tx: 58, ty: 54, t: '红油' }] },
    'boiled-fish': { no: 'No.89', latin: 'Piscis in iure ferventi', family: '水产科', season: '四季', origin: '川菜',
      flavor: { '咸': 4, '甜': 0, '酸': 0, '鲜': 3, '辣': 4, '油': 4 }, annot: [{ x: 34, y: 46, tx: 44, ty: 62, t: '鱼片' }, { x: 68, y: 40, tx: 56, ty: 54, t: '红油' }] },
    'tomato-fish': { no: 'No.90', latin: 'Piscis cum lycopersicis', family: '水产科', season: '四季', origin: '家常',
      flavor: { '咸': 2, '甜': 1, '酸': 3, '鲜': 4, '辣': 0, '油': 1 }, annot: [{ x: 34, y: 48, tx: 44, ty: 62, t: '鱼片' }, { x: 68, y: 44, tx: 56, ty: 58, t: '番茄' }] },
    'braised-lamb': { no: 'No.91', latin: 'Agnus iure rubro', family: '畜肉科', season: '秋冬', origin: '家常',
      flavor: { '咸': 3, '甜': 1, '酸': 0, '鲜': 4, '辣': 0, '油': 4 }, annot: [{ x: 34, y: 48, tx: 44, ty: 62, t: '羊肉' }, { x: 68, y: 44, tx: 56, ty: 58, t: '胡萝卜' }] },
    'radish-beef-stew': { no: 'No.92', latin: 'Bubula cum raphano', family: '畜肉科', season: '秋冬', origin: '家常',
      flavor: { '咸': 3, '甜': 1, '酸': 0, '鲜': 4, '辣': 0, '油': 3 }, annot: [{ x: 32, y: 48, tx: 42, ty: 62, t: '牛腩' }, { x: 68, y: 44, tx: 56, ty: 58, t: '萝卜' }] },
    'braised-beef-shank': { no: 'No.93', latin: 'Bubula iure aromatum', family: '畜肉科', season: '四季', origin: '家常',
      flavor: { '咸': 4, '甜': 1, '酸': 0, '鲜': 4, '辣': 1, '油': 2 }, annot: [{ x: 36, y: 48, tx: 46, ty: 62, t: '牛腱' }, { x: 68, y: 40, tx: 56, ty: 54, t: '卤料' }] },
    'mushroom-tofu-mince': { no: 'No.94', latin: 'Caseus soiae cum carne', family: '豆科', season: '四季', origin: '家常',
      flavor: { '咸': 3, '甜': 0, '酸': 0, '鲜': 4, '辣': 0, '油': 2 }, annot: [{ x: 34, y: 50, tx: 44, ty: 64, t: '豆腐' }, { x: 68, y: 44, tx: 56, ty: 58, t: '香菇' }] },
    'clam-steamed-egg': { no: 'No.95', latin: 'Ova cum veneridis', family: '蛋类科', season: '四季', origin: '家常',
      flavor: { '咸': 2, '甜': 0, '酸': 0, '鲜': 4, '辣': 0, '油': 1 }, annot: [{ x: 34, y: 50, tx: 44, ty: 64, t: '蛋液' }, { x: 68, y: 44, tx: 56, ty: 58, t: '蛤蜊' }] },
    'plain-noodle-soup': { no: 'No.96', latin: 'Noodles simplices', family: '主食科', season: '四季', origin: '苏式',
      flavor: { '咸': 2, '甜': 0, '酸': 0, '鲜': 3, '辣': 0, '油': 2 }, annot: [{ x: 34, y: 46, tx: 44, ty: 62, t: '细面' }, { x: 68, y: 58, tx: 56, ty: 66, t: '葱花' }] },
    'dandan-noodle': { no: 'No.97', latin: 'Noodles sesame piperatae', family: '主食科', season: '四季', origin: '川菜',
      flavor: { '咸': 3, '甜': 1, '酸': 1, '鲜': 3, '辣': 3, '油': 3 }, annot: [{ x: 34, y: 46, tx: 44, ty: 62, t: '面条' }, { x: 68, y: 40, tx: 56, ty: 54, t: '红油' }] },
    'fried-noodles': { no: 'No.98', latin: 'Noodles frictae', family: '主食科', season: '四季', origin: '家常',
      flavor: { '咸': 3, '甜': 0, '酸': 0, '鲜': 3, '辣': 0, '油': 3 }, annot: [{ x: 34, y: 48, tx: 44, ty: 62, t: '面条' }, { x: 68, y: 44, tx: 56, ty: 58, t: '包菜' }] },
    'pumpkin-millet-congee': { no: 'No.99', latin: 'Congee milii cum cucurbita', family: '汤羹科', season: '秋冬', origin: '家常',
      flavor: { '咸': 0, '甜': 3, '酸': 0, '鲜': 1, '辣': 0, '油': 0 }, annot: [{ x: 34, y: 50, tx: 44, ty: 64, t: '小米' }, { x: 68, y: 44, tx: 56, ty: 58, t: '南瓜' }] },
    'scallion-pancake': { no: 'No.100', latin: 'Placenta cepae', family: '主食科', season: '四季', origin: '家常',
      flavor: { '咸': 2, '甜': 0, '酸': 0, '鲜': 2, '辣': 0, '油': 3 }, annot: [{ x: 36, y: 50, tx: 46, ty: 64, t: '饼' }, { x: 68, y: 42, tx: 56, ty: 56, t: '葱花' }] }
  };
  Object.keys(M).forEach(function (k) { XM[k] = M[k]; });
  window.__EXTRA_META = XM;
})();
