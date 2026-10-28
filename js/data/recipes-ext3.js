/* 扩展馆藏 第三批：No.41 – No.70
   与 recipes.js 同结构，在 recipes.js 之前加载（须排在 ext/ext2 之后）。
   art 复用现有铜版线稿（按食材形态就近匹配），不新增插画。 */
(function () {
  var B = window.__EXTRA_RECIPES || [];

  B = B.concat([
    {
      id: 'pickled-fish',
      name: '酸菜鱼',
      tagline: '鱼片滑嫩靠上浆，酸味全在酸菜里',
      art: 'seabass',
      prep: 25, cook: 20, difficulty: 3, servings: 3,
      flavors: ['硬菜', '宴客', '下饭', '酸辣'],
      ingredients: [
        { name: '草鱼', amount: '1 条（约 1.2kg）', cat: '水产', note: '让摊主杀好片成鱼片，自己片比较难' },
        { name: '酸菜', amount: '1 包（约 300g）', cat: '蔬菜', note: '老坛酸菜，冲洗一下别泡太久' },
        { name: '泡椒', amount: '5 个', cat: '蔬菜' },
        { name: '姜', amount: '4 片', cat: '蔬菜' },
        { name: '蒜', amount: '4 瓣', cat: '蔬菜' },
        { name: '干辣椒', amount: '6 个', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '淀粉', amount: '2 汤匙', role: '鱼片上浆，滑嫩的关键' },
        { name: '蛋清', amount: '1 个', role: '和淀粉一起上浆，锁住水分' },
        { name: '料酒', amount: '2 汤匙', role: '腌鱼去腥' },
        { name: '白胡椒粉', amount: '1 小勺', role: '去腥提香，鱼菜必备' },
        { name: '盐', amount: '适量', role: '酸菜有咸味，最后尝过再加' },
        { name: '食用油', amount: '3 汤匙', role: '最后泼热油' }
      ],
      steps: [
        { text: '鱼片加盐轻抓出胶质，冲洗后沥干，加料酒、白胡椒、蛋清、淀粉抓匀上浆。', tip: '抓到鱼片发亮、浆挂得住。静置十五分钟。', timer: { label: '上浆', seconds: 900 } },
        { text: '酸菜切段挤干，锅里不放油先煸干水汽。', tip: '酸菜一定要煸干，不然汤会发水。', timer: { label: '煸酸菜', seconds: 240 } },
        { text: '下油爆香姜蒜、泡椒、干辣椒，倒入酸菜炒香。', timer: { label: '炒料', seconds: 180 } },
        { text: '鱼骨鱼头下锅煎一下，加开水煮出白汤。', timer: { label: '煮鱼汤', seconds: 600 } },
        { text: '捞出料渣，汤煮开后鱼片一片片下锅，变色即可关火。', tip: '鱼片下锅后别搅动，变色再多十秒就够，久就散。', timer: { label: '汆鱼片', seconds: 120 } },
        { text: '盛出后撒干辣椒段和蒜末，泼一勺热油激香。' }
      ],
      variations: [
        { title: '番茄版', diff: '酸菜换番茄，酸味更柔和，孩子能吃。' },
        { title: '金汤版', diff: '加南瓜泥调汤，颜色金黄味道更厚。' },
        { title: '少辣版', diff: '泡椒和干辣椒减半，突出酸香。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/酸菜鱼做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=酸菜鱼' }
    },

    {
      id: 'scallion-lamb',
      name: '葱爆羊肉',
      tagline: '全程大火，锅够热才不膻不出水',
      art: 'pot',
      prep: 10, cook: 8, difficulty: 2, servings: 2,
      flavors: ['下饭', '快手', '硬菜', '浓香'],
      ingredients: [
        { name: '羊肉片', amount: '300g', cat: '肉蛋', note: '涮火锅那种冻羊肉片最方便' },
        { name: '大葱', amount: '2 根', cat: '蔬菜', note: '葱白斜切段，这道菜葱是配角也是主角' },
        { name: '蒜', amount: '3 瓣', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '生抽', amount: '2 汤匙', role: '咸鲜主味' },
        { name: '料酒', amount: '1 汤匙', role: '去膻' },
        { name: '孜然粒', amount: '1 小勺', role: '羊肉绝配，去膻增香' },
        { name: '淀粉', amount: '半小勺', role: '腌肉锁水' },
        { name: '香油', amount: '几滴', role: '出锅点香' }
      ],
      steps: [
        { text: '羊肉片解冻后用厨房纸吸干血水，加料酒、淀粉抓匀。', tip: '水分吸干是「爆」而不是「煮」的前提。' },
        { text: '锅烧到冒烟，倒油，羊肉下锅大火快速翻炒到变色立刻盛出。', tip: '一次别下太多，锅温掉下来就出水了。', timer: { label: '爆羊肉', seconds: 90 } },
        { text: '锅留底油，下葱白段和蒜片大火爆到葱边微焦。', timer: { label: '爆葱', seconds: 60 } },
        { text: '羊肉回锅，加生抽、孜然粒大火翻匀，淋香油出锅。', timer: { label: '合炒', seconds: 45 } }
      ],
      variations: [
        { title: '孜然羊肉版', diff: '孜然加倍，加辣椒面，做成烧烤味。' },
        { title: '洋葱版', diff: '大葱换洋葱，甜一点，膻味更弱。' },
        { title: '香菜版', diff: '出锅前撒大把香菜，清香解腻。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/葱爆羊肉做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=葱爆羊肉' }
    },

    {
      id: 'ants-climbing-tree',
      name: '蚂蚁上树',
      tagline: '粉丝吸饱肉汁，肉末粘在上面像蚂蚁',
      art: 'veg',
      prep: 10, cook: 12, difficulty: 1, servings: 2,
      flavors: ['下饭', '家常', '快手', '微辣'],
      ingredients: [
        { name: '红薯粉丝', amount: '1 把（约 80g）', cat: '其他', note: '红薯粉才够筋道，龙口粉丝容易断' },
        { name: '猪肉末', amount: '150g', cat: '肉蛋' },
        { name: '蒜', amount: '3 瓣', cat: '蔬菜' },
        { name: '小葱', amount: '2 根', cat: '蔬菜' },
        { name: '小米辣', amount: '2 个', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '豆瓣酱', amount: '1.5 汤匙', role: '红油和咸香，要炒出红油' },
        { name: '生抽', amount: '2 汤匙', role: '咸鲜主味' },
        { name: '料酒', amount: '1 汤匙', role: '炒肉末去腥' },
        { name: '白糖', amount: '半小勺', role: '提鲜' }
      ],
      steps: [
        { text: '粉丝温水泡软，剪成两段，别泡太烂。', tip: '泡到能弯折但还有硬芯，后面还要煮。', timer: { label: '泡粉丝', seconds: 900 } },
        { text: '锅里油炒肉末到变色出油，加料酒炒香。', timer: { label: '炒肉末', seconds: 180 } },
        { text: '下豆瓣酱小火炒出红油，加蒜末小米辣炒香。', timer: { label: '炒酱', seconds: 120 } },
        { text: '加一碗水煮开，下粉丝，中火让它把汤吸进去。', tip: '别急着翻，等粉丝软了再轻轻推，一搅就断。', timer: { label: '焖粉丝', seconds: 300 } },
        { text: '汤收得差不多时加生抽和糖调味，撒葱花出锅。' }
      ],
      variations: [
        { title: '素版', diff: '肉末换成香菇碎，一样下饭。' },
        { title: '不辣版', diff: '豆瓣酱换生抽和蚝油，颜色浅但味足。' },
        { title: '酸辣版', diff: '出锅前加一勺醋和花椒油。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/蚂蚁上树做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=蚂蚁上树' }
    },

    {
      id: 'garlic-sprout-pork',
      name: '蒜苔炒肉',
      tagline: '蒜苔要断生但别炒老，脆中带甜才对',
      art: 'pot',
      prep: 8, cook: 8, difficulty: 1, servings: 2,
      flavors: ['家常', '下饭', '快手', '新手友好'],
      ingredients: [
        { name: '蒜苔', amount: '300g', cat: '蔬菜', note: '掐一下根部能断的就是嫩的' },
        { name: '猪肉', amount: '200g', cat: '肉蛋', note: '前腿肉带点肥更香' },
        { name: '干辣椒', amount: '2 个', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '生抽', amount: '2 汤匙', role: '咸鲜主味' },
        { name: '料酒', amount: '1 汤匙', role: '腌肉去腥' },
        { name: '淀粉', amount: '半小勺', role: '腌肉锁水' },
        { name: '盐', amount: '适量', role: '最后尝过再加' }
      ],
      steps: [
        { text: '蒜苔掐掉老根，切段；猪肉切片加料酒、淀粉抓匀。' },
        { text: '锅热油，肉片下锅炒到变色出油，拨到一边。', timer: { label: '炒肉片', seconds: 120 } },
        { text: '下干辣椒和蒜苔，大火翻炒到蒜苔颜色变深、表皮微皱。', tip: '蒜苔炒到断生就行，久炒会发黄发韧。', timer: { label: '炒蒜苔', seconds: 180 } },
        { text: '加生抽翻匀，尝咸淡加盐，出锅。' }
      ],
      variations: [
        { title: '腊肉版', diff: '鲜肉换腊肉片，咸香更浓，盐要少放。' },
        { title: '鸡蛋版', diff: '加两个炒散的鸡蛋，更家常。' },
        { title: '木耳版', diff: '加泡发的木耳一起炒，口感更丰富。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/蒜苔炒肉做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=蒜苔炒肉' }
    },

    {
      id: 'blanched-choy-sum',
      name: '白灼菜心',
      tagline: '粤菜里最见功夫的青菜，火候差十秒就老',
      art: 'veg',
      prep: 5, cook: 5, difficulty: 1, servings: 2,
      flavors: ['清淡', '快手', '素菜', '解腻'],
      ingredients: [
        { name: '菜心', amount: '400g', cat: '蔬菜', note: '茎部掐得动、叶子深绿的才嫩' },
        { name: '蒜', amount: '3 瓣', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '蒸鱼豉油', amount: '3 汤匙', role: '鲜味来源，比生抽清' },
        { name: '食用油', amount: '2 汤匙', role: '最后淋热油' },
        { name: '盐', amount: '1 小勺', role: '焯水时加，让菜保持翠绿' }
      ],
      steps: [
        { text: '水里加盐和几滴油烧开，菜心下锅烫。', tip: '先下茎部，十秒后再把叶子按进去。总时长控制在四十秒内。', timer: { label: '焯菜心', seconds: 45 } },
        { text: '捞出沥干摆盘，淋蒸鱼豉油。' },
        { text: '蒜切末铺上，烧一勺热油浇下去。', tip: '油要烧到冒烟才泼，才能激出蒜香。' }
      ],
      variations: [
        { title: '蚝油版', diff: '豉油换蚝油汁，更浓更甜。' },
        { title: '姜汁版', diff: '用姜末代替蒜，风味更清。' },
        { title: '上汤版', diff: '浇一勺高汤再淋油，更滋润。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/白灼菜心做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=白灼菜心' }
    },

    {
      id: 'mushroom-bokchoy',
      name: '香菇青菜',
      tagline: '香菇划十字更好看也更入味',
      art: 'veg',
      prep: 8, cook: 8, difficulty: 1, servings: 2,
      flavors: ['清淡', '快手', '素菜', '新手友好'],
      ingredients: [
        { name: '上海青', amount: '4 棵', cat: '蔬菜', note: '小颗的更嫩，对半切开' },
        { name: '鲜香菇', amount: '8 朵', cat: '蔬菜', note: '菌盖厚实的，划十字刀' },
        { name: '蒜', amount: '2 瓣', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '蚝油', amount: '1 汤匙', role: '素菜靠它提味' },
        { name: '生抽', amount: '1 汤匙', role: '咸鲜' },
        { name: '白糖', amount: '半小勺', role: '提鲜' },
        { name: '淀粉', amount: '半小勺', role: '勾薄芡' },
        { name: '盐', amount: '适量', role: '焯青菜时加一点' }
      ],
      steps: [
        { text: '香菇去蒂，菌盖划十字；青菜对半切开洗净。' },
        { text: '水开加盐和几滴油，青菜焯水三十秒捞出摆盘。', tip: '焯过再摆，颜色翠绿还不出水。', timer: { label: '焯青菜', seconds: 30 } },
        { text: '锅里油下蒜片和香菇，中火煎到香菇变软出香。', timer: { label: '煎香菇', seconds: 180 } },
        { text: '加蚝油、生抽、糖和半碗水煮开，水淀粉勾薄芡。', timer: { label: '调汁', seconds: 120 } },
        { text: '香菇连汁浇在摆好的青菜上。' }
      ],
      variations: [
        { title: '肉末版', diff: '加炒香的肉末进汁里，更下饭。' },
        { title: '豆腐版', diff: '加煎过的豆腐块一起烧。' },
        { title: '素高汤版', diff: '用泡香菇的水代替清水，鲜味更足。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/香菇青菜做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=香菇青菜' }
    },

    {
      id: 'vinegar-cabbage',
      name: '醋溜白菜',
      tagline: '醋分两次放，一次入味一次提香',
      art: 'veg',
      prep: 8, cook: 8, difficulty: 1, servings: 2,
      flavors: ['家常', '快手', '素菜', '酸甜'],
      ingredients: [
        { name: '白菜', amount: '半棵（约 500g）', cat: '蔬菜', note: '白菜帮和叶分开处理' },
        { name: '干辣椒', amount: '3 个', cat: '蔬菜' },
        { name: '蒜', amount: '3 瓣', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '香醋', amount: '2 汤匙', role: '分两次放，酸香有层次' },
        { name: '生抽', amount: '1 汤匙', role: '咸鲜' },
        { name: '白糖', amount: '1 小勺', role: '和醋配成糖醋口' },
        { name: '盐', amount: '适量', role: '最后尝过再加' },
        { name: '淀粉', amount: '半小勺', role: '勾薄芡' }
      ],
      steps: [
        { text: '白菜帮斜刀片成薄片，叶子撕大块，分开放。', tip: '帮和叶熟的时间差一倍，一起下锅叶就烂了。' },
        { text: '锅热油下干辣椒和蒜片爆香。', timer: { label: '爆香', seconds: 45 } },
        { text: '先下白菜帮大火炒到边缘变透明。', timer: { label: '炒白菜帮', seconds: 150 } },
        { text: '加一半醋、生抽、糖翻炒，再下白菜叶。', timer: { label: '炒白菜叶', seconds: 90 } },
        { text: '水淀粉勾薄芡，关火前淋剩下的醋，翻匀出锅。', tip: '第二次醋一定关火前放，高温会把酸香挥发掉。' }
      ],
      variations: [
        { title: '木耳版', diff: '加泡发木耳，口感更丰富。' },
        { title: '肉片版', diff: '先炒肉片再炒白菜，更实在。' },
        { title: '纯酸版', diff: '不放糖，只取醋的清爽。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/醋溜白菜做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=醋溜白菜' }
    },

    {
      id: 'salt-pepper-shrimp',
      name: '椒盐虾',
      tagline: '炸到壳酥能连壳吃，椒盐要最后撒',
      art: 'seabass',
      prep: 12, cook: 10, difficulty: 2, servings: 2,
      flavors: ['海鲜', '硬菜', '下饭', '宴客'],
      ingredients: [
        { name: '大虾', amount: '400g', cat: '水产', note: '中等个头，太大不易炸透' },
        { name: '蒜', amount: '4 瓣', cat: '蔬菜' },
        { name: '小米辣', amount: '2 个', cat: '蔬菜' },
        { name: '小葱', amount: '1 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '椒盐', amount: '1 小勺', role: '出锅前撒，早放会返潮' },
        { name: '料酒', amount: '1 汤匙', role: '腌虾去腥' },
        { name: '淀粉', amount: '2 汤匙', role: '薄薄裹一层，炸出酥壳' },
        { name: '食用油', amount: '适量', role: '炸虾用' }
      ],
      steps: [
        { text: '虾剪须开背去线，加料酒和少许盐腌十分钟，沥干后薄薄裹一层淀粉。', tip: '裹粉前要把水分吸干，粉才能贴住。', timer: { label: '腌虾', seconds: 600 } },
        { text: '油烧到七成热，虾下锅炸到壳酥变色捞出。', timer: { label: '炸虾', seconds: 180 } },
        { text: '油温升高复炸一次，壳更脆。', tip: '复炸二十秒就够，能连壳一起嚼。', timer: { label: '复炸', seconds: 30 } },
        { text: '锅里留一点油爆香蒜末和小米辣，虾回锅，撒椒盐和葱花翻匀出锅。', timer: { label: '翻炒', seconds: 45 } }
      ],
      variations: [
        { title: '避风塘版', diff: '加炸蒜蓉和面包糠一起炒，蒜香冲。' },
        { title: '椒盐鱿鱼版', diff: '虾换成鱿鱼圈，做法一样。' },
        { title: '少油版', diff: '用平底锅半煎半炸，油量减一半。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/椒盐虾做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=椒盐虾' }
    },

    {
      id: 'pan-fried-hairtail',
      name: '香煎带鱼',
      tagline: '表面擦干拍粉，煎出来才完整不碎',
      art: 'seabass',
      prep: 12, cook: 12, difficulty: 2, servings: 2,
      flavors: ['海鲜', '家常', '下饭', '硬菜'],
      ingredients: [
        { name: '带鱼', amount: '2 条（约 500g）', cat: '水产', note: '让摊主收拾干净切段，银鳞别刮掉' },
        { name: '姜', amount: '4 片', cat: '蔬菜' },
        { name: '蒜', amount: '3 瓣', cat: '蔬菜' },
        { name: '小葱', amount: '2 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '料酒', amount: '2 汤匙', role: '腌鱼去腥' },
        { name: '生抽', amount: '2 汤匙', role: '咸鲜主味' },
        { name: '盐', amount: '适量', role: '腌鱼用' },
        { name: '淀粉', amount: '2 汤匙', role: '拍在鱼段表面，防粘防碎' },
        { name: '花椒', amount: '十几粒', role: '腌鱼增香' }
      ],
      steps: [
        { text: '带鱼段洗净，用厨房纸彻底吸干，加姜片、料酒、盐、花椒腌着。', tip: '带鱼腥味重，腌制不能省。表面一定要干。', timer: { label: '腌鱼', seconds: 1200 } },
        { text: '腌好的鱼段薄薄拍一层干淀粉，抖掉多余的粉。' },
        { text: '锅烧热倒油，鱼段下锅中火煎，别翻动。', tip: '下锅后等两分钟，底面定型了再翻，一翻就碎说明还没到时候。', timer: { label: '煎一面', seconds: 150 } },
        { text: '翻面煎另一面到两面金黄。', timer: { label: '煎另一面', seconds: 120 } },
        { text: '淋一点料酒和生抽，撒葱段，盖盖焖十秒收汁出锅。', timer: { label: '收汁', seconds: 30 } }
      ],
      variations: [
        { title: '红烧版', diff: '煎好后加水、生抽、糖焖十分钟，做成红烧带鱼。' },
        { title: '干煎版', diff: '什么都不加，只煎到焦香，蘸椒盐吃。' },
        { title: '糖醋版', diff: '糖醋汁烧一下，酸甜开胃。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/香煎带鱼做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=香煎带鱼' }
    },

    {
      id: 'mouthwatering-chicken',
      name: '口水鸡',
      tagline: '煮完要冰镇，皮脆肉嫩全在这一步',
      art: 'pot',
      prep: 15, cook: 25, difficulty: 2, servings: 3,
      flavors: ['凉菜', '硬菜', '宴客', '辣'],
      ingredients: [
        { name: '鸡腿', amount: '3 只', cat: '肉蛋', note: '去骨鸡腿肉，或者用半只三黄鸡' },
        { name: '黄瓜', amount: '1 根', cat: '蔬菜', note: '切丝垫底，解辣' },
        { name: '蒜', amount: '4 瓣', cat: '蔬菜' },
        { name: '小葱', amount: '2 根', cat: '蔬菜' },
        { name: '花生米', amount: '1 把', cat: '其他' }
      ],
      seasonings: [
        { name: '生抽', amount: '3 汤匙', role: '咸鲜主味' },
        { name: '香醋', amount: '2 汤匙', role: '酸爽' },
        { name: '辣椒油', amount: '3 汤匙', role: '这道菜的灵魂，红油要足' },
        { name: '花椒粉', amount: '1 小勺', role: '麻味来源' },
        { name: '白糖', amount: '1 小勺', role: '提鲜回甜' },
        { name: '料酒', amount: '2 汤匙', role: '煮鸡去腥' },
        { name: '芝麻', amount: '1 小撮', role: '增香' }
      ],
      steps: [
        { text: '锅里加水、姜片、料酒煮开，鸡腿下锅煮。', tip: '水开后转小火保持似开非开，大火煮肉会柴。', timer: { label: '煮鸡', seconds: 900 } },
        { text: '关火后盖盖焖十分钟，捞出立刻放进冰水。', tip: '冰镇让鸡皮收紧发脆，这一步别省。', timer: { label: '焖 + 冰镇', seconds: 900 } },
        { text: '蒜末、生抽、醋、糖、花椒粉、辣椒油调成一碗汁。', tip: '红油要最后淋在表面，拌进去颜色会浑。' },
        { text: '鸡肉切块铺在黄瓜丝上，浇汁，撒花生碎和芝麻葱花。' }
      ],
      variations: [
        { title: '藤椒版', diff: '花椒粉换藤椒油，麻得更清亮。' },
        { title: '不辣版', diff: '去掉红油，用葱油汁拌，清爽很多。' },
        { title: '钵钵鸡版', diff: '切小块串签泡在红油汤里，更适合聚会。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/口水鸡做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=口水鸡' }
    },

    {
      id: 'yellow-braised-chicken',
      name: '黄焖鸡',
      tagline: '一锅出的懒人硬菜，汤汁拌饭是重点',
      art: 'pot',
      prep: 12, cook: 30, difficulty: 2, servings: 3,
      flavors: ['硬菜', '下饭', '家常', '浓香'],
      ingredients: [
        { name: '鸡腿肉', amount: '500g', cat: '肉蛋', note: '带骨剁块更香' },
        { name: '干香菇', amount: '8 朵', cat: '蔬菜', note: '提前泡发，泡菇水留着' },
        { name: '青椒', amount: '2 个', cat: '蔬菜' },
        { name: '土豆', amount: '1 个', cat: '蔬菜' },
        { name: '姜', amount: '4 片', cat: '蔬菜' },
        { name: '干辣椒', amount: '3 个', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '生抽', amount: '3 汤匙', role: '咸鲜主味' },
        { name: '蚝油', amount: '1 汤匙', role: '提鲜增稠' },
        { name: '料酒', amount: '2 汤匙', role: '去腥' },
        { name: '冰糖', amount: '1 小勺', role: '提亮回甜' },
        { name: '八角', amount: '1 颗', role: '炖肉香气' },
        { name: '黄酱', amount: '1 汤匙', role: '黄焖的灵魂，酱香来源' }
      ],
      steps: [
        { text: '鸡块冷水下锅焯去血沫，捞出冲净。', timer: { label: '焯水', seconds: 300 } },
        { text: '锅里油下冰糖小火炒到微黄，鸡块下锅翻炒上色。', timer: { label: '炒糖色', seconds: 180 } },
        { text: '加姜片、八角、干辣椒、黄酱炒香，淋料酒。', timer: { label: '爆香', seconds: 90 } },
        { text: '加生抽、蚝油和泡菇水（没过食材），下香菇和土豆块，煮开转小火焖。', timer: { label: '焖煮', seconds: 1200 } },
        { text: '土豆软了之后下青椒块，大火收汁到浓稠。', tip: '别收太干，这菜的汁是要拌饭的。', timer: { label: '收汁', seconds: 300 } }
      ],
      variations: [
        { title: '加宽粉版', diff: '起锅前五分钟下泡软的宽粉，吸汁特别香。' },
        { title: '微辣版', diff: '去掉干辣椒，突出酱香。' },
        { title: '黄焖排骨版', diff: '鸡肉换排骨，焖的时间延长到四十分钟。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/黄焖鸡做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=黄焖鸡米饭' }
    },

    {
      id: 'yuxiang-pork',
      name: '鱼香肉丝',
      tagline: '鱼香是调出来的，鱼香汁的比例决定成败',
      art: 'pot',
      prep: 15, cook: 10, difficulty: 2, servings: 2,
      flavors: ['下饭', '家常', '川菜', '酸甜'],
      ingredients: [
        { name: '猪里脊', amount: '250g', cat: '肉蛋' },
        { name: '木耳', amount: '1 小把', cat: '蔬菜', note: '泡发切丝' },
        { name: '胡萝卜', amount: '半根', cat: '蔬菜' },
        { name: '冬笋', amount: '1 小块', cat: '蔬菜', note: '没有就用茭白或省略' },
        { name: '蒜', amount: '4 瓣', cat: '蔬菜' },
        { name: '泡椒', amount: '4 个', cat: '蔬菜', note: '鱼香味的关键，不能用干辣椒替' }
      ],
      seasonings: [
        { name: '生抽', amount: '1 汤匙', role: '咸鲜' },
        { name: '香醋', amount: '1.5 汤匙', role: '鱼香口的酸，和糖一比一' },
        { name: '白糖', amount: '1.5 汤匙', role: '鱼香口的甜，别怕多' },
        { name: '淀粉', amount: '1 汤匙', role: '腌肉 + 勾芡' },
        { name: '料酒', amount: '1 汤匙', role: '腌肉去腥' }
      ],
      steps: [
        { text: '里脊切丝，加料酒、淀粉抓匀上浆。' },
        { text: '把生抽、醋、糖、淀粉和两勺水调成鱼香汁备用。', tip: '先调好碗汁是川菜炒法的关键 —— 下锅后没时间一样样加。糖醋比例约 1:1，这是鱼香的底。' },
        { text: '木耳、胡萝卜、冬笋切丝，蒜和泡椒切末。' },
        { text: '锅热油下肉丝滑散到变色盛出。', timer: { label: '滑肉丝', seconds: 60 } },
        { text: '底油下泡椒末和蒜末小火炒出红油。', tip: '泡椒要剁碎，小火炒才出红油。', timer: { label: '炒泡椒', seconds: 90 } },
        { text: '下配菜丝炒断生，肉丝回锅，倒入碗汁大火翻匀到收汁挂糊。', timer: { label: '合炒', seconds: 90 } }
      ],
      variations: [
        { title: '鱼香茄子版', diff: '肉丝换茄条，先煎软再鱼香汁烧。' },
        { title: '少甜版', diff: '糖减到一汤匙，酸甜平衡偏酸。' },
        { title: '素版', diff: '去掉肉丝，用杏鲍菇丝代替，口感很像。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/鱼香肉丝做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=鱼香肉丝' }
    },

    {
      id: 'twice-cooked-pork',
      name: '回锅肉',
      tagline: '肉要煮过再炒，煸到卷曲起灯盏窝才算对',
      art: 'braised-pork',
      prep: 15, cook: 15, difficulty: 2, servings: 2,
      flavors: ['川菜', '下饭', '硬菜', '浓香'],
      ingredients: [
        { name: '二刀肉', amount: '400g', cat: '肉蛋', note: '后腿靠近臀部的肉，肥瘦相连，实在没有用五花肉' },
        { name: '青蒜', amount: '4 根', cat: '蔬菜', note: '蒜苗是这道菜的正宗配菜' },
        { name: '姜', amount: '3 片', cat: '蔬菜' },
        { name: '蒜', amount: '3 瓣', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '豆瓣酱', amount: '1.5 汤匙', role: '红油和咸香，必须炒透' },
        { name: '甜面酱', amount: '1 小勺', role: '回甜，川味回锅肉的点睛' },
        { name: '料酒', amount: '1 汤匙', role: '煮肉去腥' },
        { name: '生抽', amount: '1 汤匙', role: '补咸鲜' },
        { name: '白糖', amount: '半小勺', role: '提鲜' }
      ],
      steps: [
        { text: '整块肉冷水下锅，加姜片料酒煮到筷子能插透但不烂。', tip: '煮到断生就行，还要切片回锅。', timer: { label: '煮肉', seconds: 1200 } },
        { text: '捞出放凉，切成铜钱厚的薄片。', tip: '凉一点再切更好切，热着切会碎。' },
        { text: '锅里少油，肉片下锅中火煸到卷曲、肥肉部分出油。', tip: '煸到肉片卷成灯盏窝就是到位了，这一步逼出的油是香的来源。', timer: { label: '煸肉片', seconds: 300 } },
        { text: '肉拨到一边，下豆瓣酱和甜面酱小火炒出红油。', timer: { label: '炒酱', seconds: 120 } },
        { text: '下蒜片炒香，倒入肉片翻匀，加生抽和糖。', timer: { label: '合炒', seconds: 90 } },
        { text: '下青蒜段大火翻炒到断生立刻出锅。', tip: '青蒜最后放，炒过头就软塌发黄。', timer: { label: '下青蒜', seconds: 45 } }
      ],
      variations: [
        { title: '青椒版', diff: '青蒜换青椒块，家常做法也很常见。' },
        { title: '莲白版', diff: '加圆白菜一起炒，吸油解腻。' },
        { title: '干煸版', diff: '肉片煸得更干更久，口感焦香。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/回锅肉做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=回锅肉' }
    },

    {
      id: 'meicai-pork',
      name: '梅菜扣肉',
      tagline: '蒸足一个半小时，肉才化而不柴',
      art: 'braised-pork',
      prep: 25, cook: 95, difficulty: 3, servings: 4,
      flavors: ['硬菜', '宴客', '下饭', '浓香'],
      ingredients: [
        { name: '五花肉', amount: '700g', cat: '肉蛋', note: '方方正正一块，肥瘦分层清晰' },
        { name: '梅干菜', amount: '100g', cat: '蔬菜', note: '反复冲洗去沙，泡软挤干' },
        { name: '姜', amount: '4 片', cat: '蔬菜' },
        { name: '小葱', amount: '2 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '生抽', amount: '3 汤匙', role: '咸鲜主味' },
        { name: '老抽', amount: '1 汤匙', role: '上色，让肉皮红亮' },
        { name: '料酒', amount: '2 汤匙', role: '去腥' },
        { name: '冰糖', amount: '1 小勺', role: '提鲜回甜' },
        { name: '八角', amount: '2 颗', role: '蒸肉香气' }
      ],
      steps: [
        { text: '五花肉冷水入锅，加姜葱料酒煮到筷子能插入，捞出。', timer: { label: '煮肉', seconds: 1500 } },
        { text: '肉皮上扎小孔，抹一层老抽和白醋，晾干。', tip: '扎孔和抹醋是为了肉皮起虎皮，炸的时候会鼓泡。' },
        { text: '锅里油烧热，肉皮朝下炸到起泡金黄，捞出泡冷水。', tip: '炸的时候一定盖锅盖，油会崩。', timer: { label: '炸肉皮', seconds: 180 } },
        { text: '肉切成厚片，皮朝下码进碗里。' },
        { text: '梅干菜切碎炒香，加生抽、老抽、糖、八角炒匀，铺在肉上。', timer: { label: '炒梅菜', seconds: 180 } },
        { text: '上锅大火蒸足时间。', tip: '蒸的时间不够肉会腻，够了两小时肉是化的。', timer: { label: '蒸制', seconds: 5400 } },
        { text: '倒扣在盘子上，把汤汁滗到锅里勾薄芡再淋回去。' }
      ],
      variations: [
        { title: '笋干版', diff: '梅菜换笋干，口感更脆。' },
        { title: '芋头版', diff: '底下垫芋头块，吸油又粉糯。' },
        { title: '减油版', diff: '省略炸肉皮，改成煎，卖相差一点但省很多油。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/梅菜扣肉做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=梅菜扣肉' }
    },

    {
      id: 'jingjiang-pork',
      name: '京酱肉丝',
      tagline: '酱要炒到能挂勺，配葱丝和豆腐皮卷着吃',
      art: 'pot',
      prep: 12, cook: 12, difficulty: 2, servings: 2,
      flavors: ['家常', '下饭', '京菜', '浓香'],
      ingredients: [
        { name: '猪里脊', amount: '300g', cat: '肉蛋' },
        { name: '大葱', amount: '2 根', cat: '蔬菜', note: '只要葱白，切细丝泡水去辛辣' },
        { name: '豆腐皮', amount: '2 张', cat: '其他', note: '切方块，卷着吃' },
        { name: '黄瓜', amount: '1 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '甜面酱', amount: '3 汤匙', role: '主味，咸甜都靠它' },
        { name: '生抽', amount: '1 汤匙', role: '补咸鲜' },
        { name: '料酒', amount: '1 汤匙', role: '腌肉去腥' },
        { name: '白糖', amount: '1 小勺', role: '提鲜，甜面酱需要一点糖才亮' },
        { name: '淀粉', amount: '1 小勺', role: '腌肉锁水' }
      ],
      steps: [
        { text: '里脊切丝，加料酒、淀粉抓匀上浆，静置十分钟。' },
        { text: '葱白切细丝泡冷水，黄瓜切丝，豆腐皮切方块摆盘。', tip: '葱丝泡水会卷曲，也不那么冲。' },
        { text: '锅热油下肉丝滑散到变色盛出。', timer: { label: '滑肉丝', seconds: 60 } },
        { text: '锅里留底油，甜面酱小火炒香，加生抽、糖和少许水。', tip: '甜面酱必须小火慢炒，大火会发苦。', timer: { label: '炒酱', seconds: 180 } },
        { text: '肉丝回锅翻匀，让酱均匀裹上，炒到酱汁挂勺出锅。', timer: { label: '裹酱', seconds: 90 } },
        { text: '肉丝铺在葱丝上，用豆腐皮卷着吃。' }
      ],
      variations: [
        { title: '鸡丝版', diff: '里脊换鸡胸肉丝，更清爽。' },
        { title: '少酱版', diff: '酱减到两勺，咸度降低。' },
        { title: '辣味版', diff: '炒酱时加一点豆瓣酱，带辣。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/京酱肉丝做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=京酱肉丝' }
    },

    {
      id: 'muxu-pork',
      name: '木须肉',
      tagline: '木耳黄花菜鸡蛋肉片，家常菜的丰盛版',
      art: 'tomato-egg',
      prep: 12, cook: 10, difficulty: 1, servings: 2,
      flavors: ['家常', '快手', '下饭', '新手友好'],
      ingredients: [
        { name: '猪里脊', amount: '150g', cat: '肉蛋' },
        { name: '鸡蛋', amount: '3 个', cat: '肉蛋' },
        { name: '木耳', amount: '1 小把', cat: '蔬菜', note: '泡发' },
        { name: '黄花菜', amount: '1 小把', cat: '蔬菜', note: '泡发，没有可省略' },
        { name: '黄瓜', amount: '半根', cat: '蔬菜' },
        { name: '蒜', amount: '2 瓣', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '生抽', amount: '2 汤匙', role: '咸鲜主味' },
        { name: '料酒', amount: '1 汤匙', role: '腌肉去腥' },
        { name: '淀粉', amount: '半小勺', role: '腌肉' },
        { name: '香油', amount: '几滴', role: '出锅点香' },
        { name: '盐', amount: '适量', role: '炒蛋时加一点' }
      ],
      steps: [
        { text: '肉切片加料酒、淀粉抓匀；木耳和黄花菜泡发洗净；鸡蛋打散加少许盐。' },
        { text: '锅热油，蛋液下锅炒成块盛出。', tip: '蛋别炒太老，刚凝固就盛出来。', timer: { label: '炒蛋', seconds: 60 } },
        { text: '底油下肉片炒到变色。', timer: { label: '炒肉片', seconds: 90 } },
        { text: '下蒜片、木耳、黄花菜翻炒。', tip: '木耳下锅会炸响，小心油溅。', timer: { label: '炒配菜', seconds: 120 } },
        { text: '鸡蛋和黄瓜片回锅，加生抽翻匀，淋香油出锅。', timer: { label: '合炒', seconds: 60 } }
      ],
      variations: [
        { title: '素版', diff: '去掉肉片，多加一个鸡蛋。' },
        { title: '加笋版', diff: '加冬笋片，口感更脆。' },
        { title: '酸辣版', diff: '出锅前加醋和胡椒粉。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/木须肉做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=木须肉' }
    },

    {
      id: 'chive-egg',
      name: '韭菜炒蛋',
      tagline: '韭菜下锅二十秒就够，久炒出水发黄',
      art: 'tomato-egg',
      prep: 5, cook: 5, difficulty: 1, servings: 2,
      flavors: ['快手', '家常', '新手友好', '下饭'],
      ingredients: [
        { name: '韭菜', amount: '1 把（约 250g）', cat: '蔬菜', note: '叶挺根部嫩的，掐得动' },
        { name: '鸡蛋', amount: '3 个', cat: '肉蛋' },
        { name: '蒜', amount: '2 瓣', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '盐', amount: '适量', role: '蛋液里加一点，炒的时候少放' },
        { name: '生抽', amount: '半汤匙', role: '提鲜，别多，会发黑' },
        { name: '食用油', amount: '2 汤匙', role: '炒蛋油要稍多' }
      ],
      steps: [
        { text: '韭菜洗净切段，根部和叶分开放；鸡蛋打散加少许盐。' },
        { text: '锅热油倒入蛋液，凝固后划散盛出。', timer: { label: '炒蛋', seconds: 60 } },
        { text: '底油下蒜片和韭菜根部炒十秒。', timer: { label: '炒韭菜根', seconds: 20 } },
        { text: '下韭菜叶和鸡蛋，快速翻匀，加盐和生抽立刻出锅。', tip: '全程不到半分钟。韭菜一软就出锅，出水就输了。', timer: { label: '合炒', seconds: 30 } }
      ],
      variations: [
        { title: '虾皮版', diff: '加一小把虾皮，鲜味立刻上去。' },
        { title: '粉丝版', diff: '加泡软的粉丝，做成韭菜炒粉丝。' },
        { title: '豆芽版', diff: '配绿豆芽，脆上加脆。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/韭菜炒蛋做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=韭菜炒蛋' }
    },

    {
      id: 'onion-egg',
      name: '洋葱炒蛋',
      tagline: '洋葱炒到透明带焦边，甜味才出来',
      art: 'tomato-egg',
      prep: 5, cook: 8, difficulty: 1, servings: 2,
      flavors: ['快手', '家常', '新手友好', '下饭'],
      ingredients: [
        { name: '洋葱', amount: '1 个', cat: '蔬菜', note: '黄洋葱更甜，紫洋葱更冲' },
        { name: '鸡蛋', amount: '3 个', cat: '肉蛋' },
        { name: '小葱', amount: '1 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '盐', amount: '适量', role: '调味' },
        { name: '生抽', amount: '1 汤匙', role: '咸鲜' },
        { name: '白糖', amount: '半小勺', role: '帮洋葱出甜味' }
      ],
      steps: [
        { text: '洋葱切丝，鸡蛋打散加少许盐。' },
        { text: '锅热油炒蛋，凝固后划散盛出。', timer: { label: '炒蛋', seconds: 60 } },
        { text: '底油下洋葱丝中火炒到变软透明、边缘微焦。', tip: '这一步要三四分钟，炒到甜才对。', timer: { label: '炒洋葱', seconds: 240 } },
        { text: '鸡蛋回锅，加生抽、糖、盐翻匀，撒葱花出锅。', timer: { label: '合炒', seconds: 45 } }
      ],
      variations: [
        { title: '青椒版', diff: '加半个青椒丝，颜色更好看。' },
        { title: '培根版', diff: '先煎香培根再炒洋葱，肉香足。' },
        { title: '咖喱版', diff: '加半勺咖喱粉，风味完全不同。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/洋葱炒蛋做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=洋葱炒蛋' }
    },

    {
      id: 'eggplant-beans',
      name: '茄子烧豆角',
      tagline: '两样都要先过油，省油就用煎',
      art: 'veg',
      prep: 10, cook: 15, difficulty: 2, servings: 2,
      flavors: ['家常', '下饭', '素菜', '浓香'],
      ingredients: [
        { name: '长茄子', amount: '2 根', cat: '蔬菜' },
        { name: '四季豆', amount: '250g', cat: '蔬菜', note: '掐头去尾撕筋' },
        { name: '蒜', amount: '4 瓣', cat: '蔬菜' },
        { name: '小米辣', amount: '2 个', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '生抽', amount: '2 汤匙', role: '咸鲜主味' },
        { name: '蚝油', amount: '1 汤匙', role: '提鲜增稠' },
        { name: '白糖', amount: '半小勺', role: '提鲜' },
        { name: '盐', amount: '适量', role: '腌茄子出水用' }
      ],
      steps: [
        { text: '茄子切条撒盐腌十分钟挤干水分；豆角掰段。', tip: '腌过再煎能省一半油，这是关键。', timer: { label: '腌茄子', seconds: 600 } },
        { text: '平底锅少油，茄子条煎到软塌上色盛出。', timer: { label: '煎茄子', seconds: 300 } },
        { text: '豆角下锅煸到表皮起皱，一定要熟透。', tip: '四季豆没熟有毒，煸到全皱发软才算熟。', timer: { label: '煸豆角', seconds: 360 } },
        { text: '下蒜末小米辣炒香，茄子和豆角一起翻炒。', timer: { label: '爆香', seconds: 60 } },
        { text: '加生抽、蚝油、糖和小半碗水焖两分钟收汁。', timer: { label: '焖煮', seconds: 180 } }
      ],
      variations: [
        { title: '加肉末版', diff: '先炒香肉末，素菜立刻变硬菜。' },
        { title: '麻辣版', diff: '加豆瓣酱和花椒粉。' },
        { title: '空气炸锅版', diff: '茄子和豆角拌油 200 度烤 12 分钟代替煎煸。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/茄子烧豆角做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=茄子烧豆角' }
    },

    {
      id: 'hot-sour-soup',
      name: '酸辣汤',
      tagline: '酸和辣要最后放，早放香味全跑了',
      art: 'pot',
      prep: 15, cook: 15, difficulty: 2, servings: 3,
      flavors: ['汤羹', '酸辣', '开胃', '家常'],
      ingredients: [
        { name: '嫩豆腐', amount: '半盒', cat: '其他' },
        { name: '木耳', amount: '1 小把', cat: '蔬菜', note: '泡发切丝' },
        { name: '胡萝卜', amount: '半根', cat: '蔬菜' },
        { name: '冬笋', amount: '1 小块', cat: '蔬菜', note: '没有可省' },
        { name: '鸡蛋', amount: '2 个', cat: '肉蛋' },
        { name: '小葱', amount: '2 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '香醋', amount: '3 汤匙', role: '酸味来源，关火前放' },
        { name: '白胡椒粉', amount: '1 小勺', role: '辣味来源，也是关火前放' },
        { name: '生抽', amount: '2 汤匙', role: '咸鲜' },
        { name: '淀粉', amount: '3 汤匙', role: '勾芡，酸辣汤要够稠' },
        { name: '香油', amount: '几滴', role: '出锅点香' }
      ],
      steps: [
        { text: '所有配料切成细丝，越小越好，口感才统一。' },
        { text: '锅里加高汤或水煮开，下木耳丝、胡萝卜丝、笋丝煮。', timer: { label: '煮配料', seconds: 300 } },
        { text: '下豆腐丝，加生抽调味。', timer: { label: '煮豆腐', seconds: 180 } },
        { text: '水淀粉分两次淋入，边淋边搅到汤变稠。', tip: '分两次勾芡更稳，一次倒进去容易结块。', timer: { label: '勾芡', seconds: 120 } },
        { text: '关小火淋蛋液，静置几秒再推开成蛋花。', timer: { label: '淋蛋液', seconds: 30 } },
        { text: '关火，加醋和白胡椒粉，撒葱花淋香油。', tip: '酸和辣一定要关火后放，高温会把香气挥发掉。' }
      ],
      variations: [
        { title: '加肉丝版', diff: '先炒香肉丝，汤更实在。' },
        { title: '番茄版', diff: '加番茄丁，酸味更自然柔和。' },
        { title: '海鲜版', diff: '加虾仁和鱿鱼丝，鲜味更足。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/酸辣汤做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=酸辣汤' }
    },

    {
      id: 'westlake-beef-soup',
      name: '西湖牛肉羹',
      tagline: '牛肉末要细，勾芡要够稠才托得住',
      art: 'rib-soup',
      prep: 12, cook: 12, difficulty: 2, servings: 3,
      flavors: ['汤羹', '清淡', '家常', '鲜'],
      ingredients: [
        { name: '牛肉末', amount: '150g', cat: '肉蛋', note: '剁得细一点，或者用现成的牛肉馅' },
        { name: '嫩豆腐', amount: '半盒', cat: '其他' },
        { name: '香菇', amount: '3 朵', cat: '蔬菜' },
        { name: '鸡蛋', amount: '2 个', cat: '肉蛋' },
        { name: '小葱', amount: '2 根', cat: '蔬菜' },
        { name: '香菜', amount: '2 棵', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '淀粉', amount: '3 汤匙', role: '勾芡，羹要够稠' },
        { name: '生抽', amount: '2 汤匙', role: '咸鲜' },
        { name: '料酒', amount: '1 汤匙', role: '炒肉末去腥' },
        { name: '白胡椒粉', amount: '半小勺', role: '提香' },
        { name: '香油', amount: '几滴', role: '出锅点香' }
      ],
      steps: [
        { text: '豆腐切小丁，香菇切末，牛肉末加料酒抓匀。' },
        { text: '锅里油炒牛肉末到变色散开。', timer: { label: '炒肉末', seconds: 120 } },
        { text: '加香菇末炒香，倒入三碗水煮开。', timer: { label: '煮汤', seconds: 300 } },
        { text: '下豆腐丁，加生抽和白胡椒调味。', timer: { label: '煮豆腐', seconds: 180 } },
        { text: '水淀粉分两次淋入搅到浓稠。', timer: { label: '勾芡', seconds: 120 } },
        { text: '关小火淋蛋液成蛋花，撒葱花香菜，淋香油。', timer: { label: '淋蛋液', seconds: 30 } }
      ],
      variations: [
        { title: '蟹肉版', diff: '加蟹腿肉，鲜味更高级。' },
        { title: '番茄版', diff: '加番茄丁，颜色好看，酸味开胃。' },
        { title: '素版', diff: '牛肉末换香菇碎，一样鲜美。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/西湖牛肉羹做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=西湖牛肉羹' }
    },

    {
      id: 'lotus-rib-soup',
      name: '莲藕排骨汤',
      tagline: '藕要选粉藕，炖出来才糯',
      art: 'rib-soup',
      prep: 10, cook: 70, difficulty: 1, servings: 3,
      flavors: ['汤羹', '清淡', '养胃', '家常'],
      ingredients: [
        { name: '排骨', amount: '500g', cat: '肉蛋' },
        { name: '莲藕', amount: '2 节', cat: '蔬菜', note: '选粗短发黄的是粉藕，细长白净的是脆藕' },
        { name: '花生', amount: '1 小把', cat: '其他', note: '加了更香更糯' },
        { name: '姜', amount: '3 片', cat: '蔬菜' },
        { name: '小葱', amount: '2 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '料酒', amount: '1 汤匙', role: '焯水去腥' },
        { name: '盐', amount: '适量', role: '出锅前十分钟再放' },
        { name: '白胡椒粉', amount: '少许', role: '提香暖胃' }
      ],
      steps: [
        { text: '排骨冷水下锅加姜片料酒煮开，撇净浮沫捞出温水冲净。', timer: { label: '焯水', seconds: 420 } },
        { text: '莲藕去皮切滚刀块，泡在水里防氧化发黑。' },
        { text: '排骨、花生、姜片入锅加足量冷水，大火煮开转小火。', timer: { label: '炖汤', seconds: 2400 } },
        { text: '下莲藕块继续炖到藕软糯。', timer: { label: '炖藕', seconds: 1800 } },
        { text: '出锅前十分钟加盐，撒葱花和白胡椒粉。' }
      ],
      variations: [
        { title: '加墨鱼干版', diff: '加一小片墨鱼干，汤的鲜味完全不同。' },
        { title: '脆藕版', diff: '用脆藕、缩短炖煮时间，口感清脆。' },
        { title: '加玉米版', diff: '配一段玉米，汤带甜味。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/莲藕排骨汤做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=莲藕排骨汤' }
    },

    {
      id: 'spinach-salad',
      name: '凉拌菠菜',
      tagline: '焯水后必须过冷水，不然会塌',
      art: 'veg',
      prep: 8, cook: 5, difficulty: 1, servings: 2,
      flavors: ['快手', '清淡', '素菜', '解腻'],
      ingredients: [
        { name: '菠菜', amount: '400g', cat: '蔬菜' },
        { name: '蒜', amount: '3 瓣', cat: '蔬菜' },
        { name: '花生米', amount: '1 把', cat: '其他' },
        { name: '粉丝', amount: '1 小把', cat: '其他', note: '可选，加了更有饱腹感' }
      ],
      seasonings: [
        { name: '生抽', amount: '2 汤匙', role: '咸鲜主味' },
        { name: '香醋', amount: '1 汤匙', role: '提酸开胃' },
        { name: '香油', amount: '1 小勺', role: '增香' },
        { name: '盐', amount: '适量', role: '最后尝过再加' },
        { name: '白糖', amount: '半小勺', role: '压涩' }
      ],
      steps: [
        { text: '菠菜洗净，水开加盐下锅焯到变软立刻捞出。', tip: '菠菜草酸多，必须焯水，别生拌。', timer: { label: '焯菠菜', seconds: 60 } },
        { text: '捞出立刻过冷水或冰水，挤干水分切段。', tip: '过冷水保住翠绿和脆感，挤干才不冲淡味道。' },
        { text: '粉丝泡软焯熟（可选），和菠菜一起放盆里。' },
        { text: '蒜末加所有调料调成汁，浇上去拌匀，撒花生米。' }
      ],
      variations: [
        { title: '芝麻酱版', diff: '用澥开的芝麻酱拌，北方口味。' },
        { title: '蒜蓉版', diff: '蒜末加倍，加热油泼一下再拌。' },
        { title: '蛋皮版', diff: '加摊好的蛋皮丝，颜色好看。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/凉拌菠菜做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=凉拌菠菜' }
    },

    {
      id: 'blanched-okra',
      name: '白灼秋葵',
      tagline: '整根焯别切开，黏液才不流失',
      art: 'veg',
      prep: 5, cook: 5, difficulty: 1, servings: 2,
      flavors: ['快手', '清淡', '素菜', '健康'],
      ingredients: [
        { name: '秋葵', amount: '300g', cat: '蔬菜', note: '捏着有弹性、绒毛清晰的新鲜' },
        { name: '蒜', amount: '3 瓣', cat: '蔬菜' },
        { name: '小米辣', amount: '1 个', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '蒸鱼豉油', amount: '3 汤匙', role: '鲜味主味' },
        { name: '食用油', amount: '2 汤匙', role: '最后淋热油' },
        { name: '盐', amount: '1 小勺', role: '焯水用' }
      ],
      steps: [
        { text: '秋葵整根洗净，撒点盐搓掉表面绒毛。', tip: '搓盐去绒毛，口感更顺滑。别切开口再焯。' },
        { text: '水开加盐，秋葵整根下锅焯。', tip: '整根焯是为了锁住里面的黏液，切开会全流掉。', timer: { label: '焯秋葵', seconds: 150 } },
        { text: '捞出过冷水，切去蒂头，对半切开摆盘。' },
        { text: '淋蒸鱼豉油，蒜末小米辣铺上，浇一勺热油。' }
      ],
      variations: [
        { title: '芥末版', diff: '豉油里挤一点芥末，冲鼻开胃。' },
        { title: '芝麻版', diff: '撒熟白芝麻，更香。' },
        { title: '肉末版', diff: '浇一层炒香的肉末，变硬菜。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/白灼秋葵做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=白灼秋葵' }
    },

    {
      id: 'egg-dumpling-soup',
      name: '蛋饺白菜汤',
      tagline: '蛋饺自己做不难，关键是锅要热油要少',
      art: 'rib-soup',
      prep: 20, cook: 15, difficulty: 2, servings: 3,
      flavors: ['汤羹', '家常', '鲜', '养胃'],
      ingredients: [
        { name: '鸡蛋', amount: '4 个', cat: '肉蛋', note: '摊蛋皮用' },
        { name: '猪肉末', amount: '200g', cat: '肉蛋' },
        { name: '白菜', amount: '300g', cat: '蔬菜' },
        { name: '姜', amount: '2 片', cat: '蔬菜' },
        { name: '小葱', amount: '2 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '盐', amount: '适量', role: '肉馅和汤都要' },
        { name: '生抽', amount: '1 汤匙', role: '调肉馅' },
        { name: '料酒', amount: '1 汤匙', role: '肉馅去腥' },
        { name: '白胡椒粉', amount: '少许', role: '汤提香' },
        { name: '香油', amount: '几滴', role: '出锅点香' }
      ],
      steps: [
        { text: '肉末加生抽、料酒、盐、葱姜末和一个蛋清，搅到上劲。', timer: { label: '调馅', seconds: 300 } },
        { text: '鸡蛋打散，用勺子在热锅里摊成小圆蛋皮。', tip: '锅里只抹薄薄一层油，勺子舀蛋液转一圈就成。', timer: { label: '摊蛋皮', seconds: 60 } },
        { text: '蛋皮半凝时放一小坨肉馅，对折成饺子形，边缘压紧。', tip: '一定要半凝时折，全熟了粘不住。' },
        { text: '锅里加水或高汤煮开，下蛋饺和白菜煮到白菜软。', timer: { label: '煮汤', seconds: 600 } },
        { text: '加盐和白胡椒调味，淋香油撒葱花。' }
      ],
      variations: [
        { title: '粉丝版', diff: '加粉丝一起煮，一锅顶一餐。' },
        { title: '加虾仁版', diff: '肉馅里加虾仁碎，鲜味更足。' },
        { title: '火锅版', diff: '蛋饺直接下火锅，很受欢迎。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/蛋饺做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=蛋饺' }
    },

    {
      id: 'bitter-melon-egg',
      name: '苦瓜炒蛋',
      tagline: '苦瓜用盐腌过再炒，苦味去大半',
      art: 'tomato-egg',
      prep: 8, cook: 8, difficulty: 1, servings: 2,
      flavors: ['家常', '快手', '素菜', '健康'],
      ingredients: [
        { name: '苦瓜', amount: '2 根', cat: '蔬菜', note: '疙瘩大、颜色浅的相对不苦' },
        { name: '鸡蛋', amount: '3 个', cat: '肉蛋' },
        { name: '蒜', amount: '2 瓣', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '盐', amount: '1 小勺', role: '腌苦瓜去苦' },
        { name: '生抽', amount: '1 汤匙', role: '咸鲜' },
        { name: '白糖', amount: '半小勺', role: '压苦味' }
      ],
      steps: [
        { text: '苦瓜对半切开，用勺子刮净里面白色瓤膜，切薄片。', tip: '白瓤是最苦的部分，刮得越干净越不苦。' },
        { text: '苦瓜片撒盐抓匀腌十分钟，冲洗挤干。', tip: '腌完要冲洗掉多余盐分，不然会咸。', timer: { label: '腌苦瓜', seconds: 600 } },
        { text: '鸡蛋打散加少许盐，锅热油炒成块盛出。', timer: { label: '炒蛋', seconds: 60 } },
        { text: '底油下蒜片和苦瓜大火炒到断生。', timer: { label: '炒苦瓜', seconds: 120 } },
        { text: '鸡蛋回锅，加生抽和糖翻匀出锅。', timer: { label: '合炒', seconds: 45 } }
      ],
      variations: [
        { title: '焯水版', diff: '用开水焯代替盐腌，苦味去得更彻底。' },
        { title: '肉末版', diff: '加肉末一起炒，苦味被肉香中和。' },
        { title: '豆豉版', diff: '加一勺豆豉，咸香下饭。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/苦瓜炒蛋做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=苦瓜炒蛋' }
    },

    {
      id: 'dry-pot-cauliflower',
      name: '干锅花菜',
      tagline: '花菜要先煸干水汽，才不会炒出一锅汤',
      art: 'veg',
      prep: 10, cook: 12, difficulty: 1, servings: 2,
      flavors: ['家常', '下饭', '素菜', '微辣'],
      ingredients: [
        { name: '花菜', amount: '1 棵（约 500g）', cat: '蔬菜', note: '掰小朵，梗削皮也能吃' },
        { name: '五花肉', amount: '100g', cat: '肉蛋', note: '切片煸油，素菜变香全靠它' },
        { name: '蒜', amount: '4 瓣', cat: '蔬菜' },
        { name: '干辣椒', amount: '4 个', cat: '蔬菜' },
        { name: '蒜苗', amount: '1 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '生抽', amount: '2 汤匙', role: '咸鲜主味' },
        { name: '蚝油', amount: '1 汤匙', role: '提鲜' },
        { name: '白糖', amount: '半小勺', role: '提鲜' },
        { name: '盐', amount: '适量', role: '最后尝过再加' }
      ],
      steps: [
        { text: '花菜掰小朵洗净，彻底沥干。', tip: '带水下锅会出水变煮，一定要晾干。' },
        { text: '锅里不放油，花菜下锅干煸到边缘微焦，盛出。', tip: '干煸去水汽，这步决定最后是一盘菜还是一锅汤。', timer: { label: '干煸花菜', seconds: 300 } },
        { text: '下五花肉片小火煸出油。', timer: { label: '煸五花肉', seconds: 180 } },
        { text: '加蒜片、干辣椒炒香，花菜回锅大火翻炒。', timer: { label: '爆香', seconds: 60 } },
        { text: '加生抽、蚝油、糖翻炒入味，撒蒜苗段出锅。', timer: { label: '调味', seconds: 90 } }
      ],
      variations: [
        { title: '素版', diff: '不放五花肉，用多一点的油爆蒜。' },
        { title: '加腊肉版', diff: '五花肉换腊肉，咸香更浓。' },
        { title: '麻辣版', diff: '加豆瓣酱和花椒，口味更重。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/干锅花菜做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=干锅花菜' }
    },

    {
      id: 'cumin-lamb',
      name: '孜然羊肉',
      tagline: '孜然最后放，早了会苦',
      art: 'pot',
      prep: 15, cook: 10, difficulty: 2, servings: 2,
      flavors: ['硬菜', '下饭', '重口', '浓香'],
      ingredients: [
        { name: '羊腿肉', amount: '350g', cat: '肉蛋', note: '羊腿肉嫩，逆纹切片' },
        { name: '洋葱', amount: '半个', cat: '蔬菜' },
        { name: '蒜', amount: '3 瓣', cat: '蔬菜' },
        { name: '香菜', amount: '2 棵', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '孜然粒', amount: '2 小勺', role: '主味，最后放才香' },
        { name: '辣椒面', amount: '1 小勺', role: '辣度和颜色' },
        { name: '生抽', amount: '1 汤匙', role: '咸鲜' },
        { name: '料酒', amount: '1 汤匙', role: '腌肉去膻' },
        { name: '淀粉', amount: '半小勺', role: '腌肉锁水' },
        { name: '盐', amount: '适量', role: '腌肉用' }
      ],
      steps: [
        { text: '羊肉逆纹切薄片，加料酒、盐、淀粉抓匀腌十五分钟。', timer: { label: '腌肉', seconds: 900 } },
        { text: '锅烧到很热倒油，羊肉下锅大火快速爆炒到变色。', tip: '锅一定要够热，羊肉一出水就膻。', timer: { label: '爆羊肉', seconds: 120 } },
        { text: '下洋葱丝和蒜片炒香。', timer: { label: '炒洋葱', seconds: 90 } },
        { text: '加生抽，撒孜然粒和辣椒面，翻几下立刻关火。', tip: '孜然下锅十几秒就出香，超过半分钟会发苦。', timer: { label: '撒孜然', seconds: 30 } },
        { text: '撒香菜段出锅。' }
      ],
      variations: [
        { title: '孜然牛肉版', diff: '羊肉换牛肉，腌的时候加一点小苏打更嫩。' },
        { title: '加芝麻版', diff: '撒熟白芝麻，香气更足。' },
        { title: '烧烤版', diff: '孜然和辣椒面加倍，完全就是烧烤味。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/孜然羊肉做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=孜然羊肉' }
    },

    {
      id: 'sweet-sour-lotus',
      name: '糖醋藕片',
      tagline: '藕片要焯水后过凉，脆感才锁得住',
      art: 'veg',
      prep: 10, cook: 8, difficulty: 1, servings: 2,
      flavors: ['快手', '素菜', '酸甜', '解腻'],
      ingredients: [
        { name: '莲藕', amount: '2 节', cat: '蔬菜', note: '选脆藕，细长洁白的那种' },
        { name: '干辣椒', amount: '2 个', cat: '蔬菜' },
        { name: '蒜', amount: '2 瓣', cat: '蔬菜' },
        { name: '小葱', amount: '1 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '白糖', amount: '2 汤匙', role: '糖醋口的骨架' },
        { name: '白醋', amount: '2 汤匙', role: '脆感和酸味，最后沿锅边淋' },
        { name: '生抽', amount: '1 汤匙', role: '补咸鲜' },
        { name: '淀粉', amount: '半小勺', role: '勾薄芡' },
        { name: '盐', amount: '1 小撮', role: '少量，糖醋口也要一点咸打底' }
      ],
      steps: [
        { text: '莲藕去皮切薄片，泡在加了白醋的水里防氧化。', tip: '切完立刻泡水，不然五分钟就发黑。' },
        { text: '水开下藕片焯一分钟，捞出过冷水沥干。', tip: '焯完过凉是脆感的关键。', timer: { label: '焯藕片', seconds: 60 } },
        { text: '锅热油下干辣椒和蒜片爆香。', timer: { label: '爆香', seconds: 45 } },
        { text: '藕片下锅大火快炒，加糖、生抽、盐。', timer: { label: '翻炒', seconds: 90 } },
        { text: '水淀粉勾薄芡，关火前沿锅边淋白醋，撒葱花出锅。', tip: '醋最后放，酸香才留得住。' }
      ],
      variations: [
        { title: '辣炒版', diff: '干辣椒加倍，做成酸辣藕片。' },
        { title: '桂花版', diff: '加一勺糖桂花，做成桂花糖藕口味。' },
        { title: '加木耳版', diff: '配泡发的木耳，口感更丰富。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/糖醋藕片做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=糖醋藕片' }
    },

    {
      id: 'shredded-king-oyster',
      name: '手撕杏鲍菇',
      tagline: '撕成条比切更挂汁，口感像肉',
      art: 'veg',
      prep: 10, cook: 10, difficulty: 1, servings: 2,
      flavors: ['素菜', '下饭', '快手', '微辣'],
      ingredients: [
        { name: '杏鲍菇', amount: '3 朵', cat: '蔬菜', note: '粗壮的更好撕成条' },
        { name: '青椒', amount: '1 个', cat: '蔬菜' },
        { name: '蒜', amount: '3 瓣', cat: '蔬菜' },
        { name: '干辣椒', amount: '3 个', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '生抽', amount: '2 汤匙', role: '咸鲜主味' },
        { name: '蚝油', amount: '1 汤匙', role: '提鲜，素菜靠它' },
        { name: '白糖', amount: '半小勺', role: '提鲜' },
        { name: '淀粉', amount: '半小勺', role: '最后勾薄芡' }
      ],
      steps: [
        { text: '杏鲍菇用手顺着纹理撕成粗条，青椒切丝。', tip: '撕出来的断面毛糙，比刀切更能挂住汁。' },
        { text: '平底锅少油，杏鲍菇条下锅中火煎到出水又收干、边缘微焦。', tip: '先干煎出水分，菇味才浓，直接炒会出一锅汤。', timer: { label: '煎菇条', seconds: 300 } },
        { text: '下蒜片、干辣椒和青椒丝炒香。', timer: { label: '爆香', seconds: 90 } },
        { text: '加生抽、蚝油、糖翻炒入味，水淀粉勾薄芡出锅。', timer: { label: '调味', seconds: 90 } }
      ],
      variations: [
        { title: '孜然版', diff: '出锅前撒孜然粉，做成烧烤味。' },
        { title: '麻辣版', diff: '加豆瓣酱和花椒粉，口味更重。' },
        { title: '肉末版', diff: '先炒香肉末，杏鲍菇吸肉味很像肉。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/手撕杏鲍菇做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=手撕杏鲍菇' }
    }
  ]);

  window.__EXTRA_RECIPES = B;

  /* 著录信息：与前面几批合并，不覆盖 */
  var XM = window.__EXTRA_META || {};
  var M = {
    'pickled-fish': { no: 'No.41', latin: 'Piscis cum brassica acida', family: '水产科', season: '四季', origin: '川渝',
      flavor: { '咸': 3, '甜': 0, '酸': 4, '鲜': 4, '辣': 3, '油': 3 }, annot: [{ x: 32, y: 48, tx: 42, ty: 62, t: '鱼片' }, { x: 68, y: 44, tx: 56, ty: 58, t: '酸菜' }] },
    'scallion-lamb': { no: 'No.42', latin: 'Agnus cum cepa', family: '畜肉科', season: '秋冬', origin: '京式',
      flavor: { '咸': 3, '甜': 0, '酸': 0, '鲜': 3, '辣': 0, '油': 3 }, annot: [{ x: 34, y: 48, tx: 44, ty: 62, t: '羊肉' }, { x: 68, y: 40, tx: 56, ty: 54, t: '大葱' }] },
    'ants-climbing-tree': { no: 'No.43', latin: 'Vermicelli cum carne', family: '杂烩科', season: '四季', origin: '川菜',
      flavor: { '咸': 3, '甜': 0, '酸': 0, '鲜': 3, '辣': 2, '油': 2 }, annot: [{ x: 34, y: 46, tx: 44, ty: 62, t: '粉丝' }, { x: 68, y: 58, tx: 56, ty: 66, t: '肉末' }] },
    'garlic-sprout-pork': { no: 'No.44', latin: 'Porcellus cum allio viridi', family: '畜肉科', season: '春夏', origin: '家常',
      flavor: { '咸': 3, '甜': 0, '酸': 0, '鲜': 3, '辣': 1, '油': 2 }, annot: [{ x: 34, y: 48, tx: 44, ty: 62, t: '肉片' }, { x: 68, y: 44, tx: 56, ty: 58, t: '蒜苔' }] },
    'blanched-choy-sum': { no: 'No.45', latin: 'Brassica vapore levi', family: '叶菜科', season: '四季', origin: '粤式',
      flavor: { '咸': 2, '甜': 0, '酸': 0, '鲜': 3, '辣': 0, '油': 2 }, annot: [{ x: 40, y: 48, tx: 48, ty: 62, t: '菜心' }, { x: 66, y: 58, tx: 54, ty: 66, t: '蒜末' }] },
    'mushroom-bokchoy': { no: 'No.46', latin: 'Brassica cum boletis', family: '叶菜科', season: '四季', origin: '家常',
      flavor: { '咸': 2, '甜': 0, '酸': 0, '鲜': 4, '辣': 0, '油': 1 }, annot: [{ x: 34, y: 48, tx: 44, ty: 62, t: '青菜' }, { x: 68, y: 44, tx: 56, ty: 58, t: '香菇' }] },
    'vinegar-cabbage': { no: 'No.47', latin: 'Brassica acetaria', family: '叶菜科', season: '秋冬', origin: '家常',
      flavor: { '咸': 3, '甜': 1, '酸': 4, '鲜': 2, '辣': 1, '油': 2 }, annot: [{ x: 36, y: 48, tx: 46, ty: 62, t: '白菜' }, { x: 68, y: 40, tx: 56, ty: 54, t: '干辣椒' }] },
    'salt-pepper-shrimp': { no: 'No.48', latin: 'Squilla cum sale piperato', family: '水产科', season: '四季', origin: '粤式',
      flavor: { '咸': 3, '甜': 0, '酸': 0, '鲜': 4, '辣': 1, '油': 3 }, annot: [{ x: 36, y: 48, tx: 46, ty: 62, t: '虾' }, { x: 68, y: 58, tx: 56, ty: 66, t: '椒盐' }] },
    'pan-fried-hairtail': { no: 'No.49', latin: 'Trichiurus frictus', family: '水产科', season: '四季', origin: '家常',
      flavor: { '咸': 3, '甜': 0, '酸': 0, '鲜': 4, '辣': 0, '油': 3 }, annot: [{ x: 36, y: 50, tx: 46, ty: 64, t: '带鱼' }, { x: 68, y: 40, tx: 56, ty: 54, t: '葱姜' }] },
    'mouthwatering-chicken': { no: 'No.50', latin: 'Pullus frigidus piperatus', family: '禽肉科', season: '四季', origin: '川菜',
      flavor: { '咸': 3, '甜': 1, '酸': 2, '鲜': 3, '辣': 4, '油': 3 }, annot: [{ x: 34, y: 48, tx: 44, ty: 62, t: '鸡块' }, { x: 68, y: 40, tx: 56, ty: 54, t: '红油' }] },
    'yellow-braised-chicken': { no: 'No.51', latin: 'Pullus iure flavo', family: '禽肉科', season: '四季', origin: '鲁菜',
      flavor: { '咸': 3, '甜': 1, '酸': 0, '鲜': 4, '辣': 1, '油': 3 }, annot: [{ x: 34, y: 46, tx: 44, ty: 62, t: '鸡块' }, { x: 68, y: 56, tx: 56, ty: 64, t: '香菇' }] },
    'yuxiang-pork': { no: 'No.52', latin: 'Porcellus iure piscis', family: '畜肉科', season: '四季', origin: '川菜',
      flavor: { '咸': 3, '甜': 3, '酸': 3, '鲜': 3, '辣': 2, '油': 2 }, annot: [{ x: 34, y: 48, tx: 44, ty: 62, t: '肉丝' }, { x: 68, y: 40, tx: 56, ty: 54, t: '泡椒' }] },
    'twice-cooked-pork': { no: 'No.53', latin: 'Porcellus bis coctus', family: '畜肉科', season: '四季', origin: '川菜',
      flavor: { '咸': 4, '甜': 1, '酸': 0, '鲜': 3, '辣': 3, '油': 4 }, annot: [{ x: 34, y: 48, tx: 44, ty: 62, t: '肉片' }, { x: 68, y: 42, tx: 56, ty: 56, t: '青蒜' }] },
    'meicai-pork': { no: 'No.54', latin: 'Porcellus cum brassica sicca', family: '畜肉科', season: '四季', origin: '客家',
      flavor: { '咸': 4, '甜': 1, '酸': 0, '鲜': 4, '辣': 0, '油': 4 }, annot: [{ x: 34, y: 46, tx: 44, ty: 62, t: '五花肉' }, { x: 68, y: 56, tx: 56, ty: 64, t: '梅干菜' }] },
    'jingjiang-pork': { no: 'No.55', latin: 'Porcellus cum iure fabae dulcis', family: '畜肉科', season: '四季', origin: '京菜',
      flavor: { '咸': 4, '甜': 2, '酸': 0, '鲜': 3, '辣': 0, '油': 2 }, annot: [{ x: 34, y: 48, tx: 44, ty: 62, t: '肉丝' }, { x: 68, y: 42, tx: 56, ty: 56, t: '葱丝' }] },
    'muxu-pork': { no: 'No.56', latin: 'Porcellus cum ovis et auricularia', family: '畜肉科', season: '四季', origin: '鲁菜',
      flavor: { '咸': 3, '甜': 0, '酸': 0, '鲜': 3, '辣': 0, '油': 2 }, annot: [{ x: 34, y: 46, tx: 44, ty: 62, t: '肉片' }, { x: 68, y: 50, tx: 56, ty: 62, t: '木耳' }] },
    'chive-egg': { no: 'No.57', latin: 'Ova cum allio tuberoso', family: '蛋类科', season: '春秋', origin: '家常',
      flavor: { '咸': 2, '甜': 0, '酸': 0, '鲜': 3, '辣': 0, '油': 2 }, annot: [{ x: 34, y: 48, tx: 44, ty: 62, t: '鸡蛋' }, { x: 68, y: 44, tx: 56, ty: 58, t: '韭菜' }] },
    'onion-egg': { no: 'No.58', latin: 'Ova cum cepa', family: '蛋类科', season: '四季', origin: '家常',
      flavor: { '咸': 2, '甜': 1, '酸': 0, '鲜': 3, '辣': 0, '油': 2 }, annot: [{ x: 34, y: 50, tx: 44, ty: 64, t: '鸡蛋' }, { x: 68, y: 44, tx: 56, ty: 58, t: '洋葱' }] },
    'eggplant-beans': { no: 'No.59', latin: 'Solanum cum phaseolis', family: '茄科', season: '夏秋', origin: '家常',
      flavor: { '咸': 3, '甜': 0, '酸': 0, '鲜': 3, '辣': 1, '油': 3 }, annot: [{ x: 34, y: 48, tx: 44, ty: 62, t: '茄子' }, { x: 68, y: 44, tx: 56, ty: 58, t: '豆角' }] },
    'hot-sour-soup': { no: 'No.60', latin: 'Ius acidum piperatum', family: '汤羹科', season: '四季', origin: '川菜',
      flavor: { '咸': 3, '甜': 0, '酸': 4, '鲜': 3, '辣': 3, '油': 1 }, annot: [{ x: 34, y: 48, tx: 44, ty: 62, t: '豆腐丝' }, { x: 68, y: 44, tx: 56, ty: 58, t: '木耳丝' }] },
    'westlake-beef-soup': { no: 'No.61', latin: 'Ius bubulae Xi Hu', family: '汤羹科', season: '四季', origin: '浙菜',
      flavor: { '咸': 2, '甜': 0, '酸': 0, '鲜': 4, '辣': 1, '油': 1 }, annot: [{ x: 34, y: 48, tx: 44, ty: 62, t: '牛肉末' }, { x: 68, y: 42, tx: 56, ty: 56, t: '蛋花' }] },
    'lotus-rib-soup': { no: 'No.62', latin: 'Ius costarum cum loto', family: '汤羹科', season: '秋冬', origin: '鄂菜',
      flavor: { '咸': 2, '甜': 1, '酸': 0, '鲜': 4, '辣': 0, '油': 1 }, annot: [{ x: 32, y: 48, tx: 42, ty: 62, t: '排骨' }, { x: 68, y: 44, tx: 56, ty: 58, t: '莲藕' }] },
    'spinach-salad': { no: 'No.63', latin: 'Spinacia acetaria', family: '叶菜科', season: '春秋', origin: '家常',
      flavor: { '咸': 3, '甜': 0, '酸': 2, '鲜': 2, '辣': 0, '油': 1 }, annot: [{ x: 36, y: 48, tx: 46, ty: 62, t: '菠菜' }, { x: 68, y: 58, tx: 56, ty: 66, t: '花生米' }] },
    'blanched-okra': { no: 'No.64', latin: 'Abelmoschus vapore levi', family: '锦葵科', season: '夏秋', origin: '粤式',
      flavor: { '咸': 2, '甜': 0, '酸': 0, '鲜': 3, '辣': 1, '油': 1 }, annot: [{ x: 36, y: 48, tx: 46, ty: 62, t: '秋葵' }, { x: 68, y: 58, tx: 56, ty: 66, t: '蒜末' }] },
    'egg-dumpling-soup': { no: 'No.65', latin: 'Ius cum ovis farctis', family: '汤羹科', season: '秋冬', origin: '江南',
      flavor: { '咸': 2, '甜': 0, '酸': 0, '鲜': 4, '辣': 0, '油': 1 }, annot: [{ x: 34, y: 46, tx: 44, ty: 62, t: '蛋饺' }, { x: 68, y: 56, tx: 56, ty: 64, t: '白菜' }] },
    'bitter-melon-egg': { no: 'No.66', latin: 'Ova cum momordica', family: '葫芦科', season: '夏秋', origin: '家常',
      flavor: { '咸': 2, '甜': 0, '酸': 0, '鲜': 2, '辣': 0, '油': 2 }, annot: [{ x: 34, y: 50, tx: 44, ty: 64, t: '鸡蛋' }, { x: 68, y: 44, tx: 56, ty: 58, t: '苦瓜' }] },
    'dry-pot-cauliflower': { no: 'No.67', latin: 'Brassica botrytis in olla sicca', family: '十字花科', season: '秋冬', origin: '湘菜',
      flavor: { '咸': 3, '甜': 0, '酸': 0, '鲜': 3, '辣': 2, '油': 3 }, annot: [{ x: 36, y: 46, tx: 46, ty: 62, t: '花菜' }, { x: 68, y: 58, tx: 56, ty: 66, t: '五花肉' }] },
    'cumin-lamb': { no: 'No.68', latin: 'Agnus cum cumino', family: '畜肉科', season: '秋冬', origin: '西北',
      flavor: { '咸': 3, '甜': 0, '酸': 0, '鲜': 3, '辣': 2, '油': 3 }, annot: [{ x: 36, y: 48, tx: 46, ty: 62, t: '羊肉' }, { x: 68, y: 40, tx: 56, ty: 54, t: '孜然' }] },
    'sweet-sour-lotus': { no: 'No.69', latin: 'Lotus dulcacidus', family: '根茎科', season: '秋冬', origin: '家常',
      flavor: { '咸': 2, '甜': 3, '酸': 4, '鲜': 1, '辣': 1, '油': 2 }, annot: [{ x: 36, y: 48, tx: 46, ty: 62, t: '藕片' }, { x: 68, y: 40, tx: 56, ty: 54, t: '干辣椒' }] },
    'shredded-king-oyster': { no: 'No.70', latin: 'Pleurotus laceratus', family: '菌类科', season: '四季', origin: '家常',
      flavor: { '咸': 3, '甜': 0, '酸': 0, '鲜': 4, '辣': 1, '油': 2 }, annot: [{ x: 36, y: 48, tx: 46, ty: 62, t: '杏鲍菇' }, { x: 68, y: 40, tx: 56, ty: 54, t: '青椒' }] }
  };
  Object.keys(M).forEach(function (k) { XM[k] = M[k]; });
  window.__EXTRA_META = XM;
})();
