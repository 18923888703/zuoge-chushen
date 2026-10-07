/* 扩展馆藏：No.08 – No.20
   与 recipes.js 同结构，加载顺序在 recipes.js 之前，由 recipes.js 合并进 RECIPES。
   art 复用现有铜版线稿（按食材形态就近匹配），不新增插画。 */
(function () {
  window.__EXTRA_RECIPES = [
    {
      id: 'steamed-egg',
      name: '水蒸蛋',
      tagline: '最不容易失败的一道，嫩得像布丁',
      art: 'tomato-egg',
      prep: 5, cook: 12, difficulty: 1, servings: 2,
      flavors: ['新手友好', '清淡', '快手', '下饭'],
      ingredients: [
        { name: '鸡蛋', amount: '3 个', cat: '肉蛋' },
        { name: '温水', amount: '约 250ml（40℃ 左右）', cat: '其他', note: '蛋液的 1.5 倍，手感微温不烫' },
        { name: '小葱', amount: '1 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '盐', amount: '1 小撮', role: '帮助蛋白质凝固得更均匀，蛋更嫩' },
        { name: '生抽', amount: '1 汤匙', role: '出锅后淋，提鲜调味' },
        { name: '香油', amount: '几滴', role: '增香，量多了会盖住蛋味' }
      ],
      steps: [
        { text: '鸡蛋打散，加一小撮盐，倒入 1.5 倍的温水搅匀，过一遍筛滤掉泡沫。', tip: '水温是关键：冷水蒸出来有蜂窝，开水会把蛋冲成蛋花。手感微温就对了。' },
        { text: '碗上盖一个盘子或耐高温保鲜膜，水开后转中小火蒸。', tip: '盖住是为了防止水蒸气滴下来砸出坑。', timer: { label: '蒸蛋', seconds: 720 } },
        { text: '出锅淋生抽和香油，撒葱花。筷子划开是平滑的，就是成功了。' }
      ],
      variations: [
        { title: '虾仁版', diff: '蛋液半凝时摆上虾仁，一起蒸到熟。' },
        { title: '肉末版', diff: '先炒香肉末铺在蛋液上再蒸，更像家常味。' },
        { title: '内酯豆腐版', diff: '碗底铺一层内酯豆腐，蒸出来一半豆腐一半蛋。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/水蒸蛋做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=水蒸蛋' }
    },

    {
      id: 'cucumber-salad',
      name: '拍黄瓜',
      tagline: '不用开火的第一道菜，五分钟上桌',
      art: 'veg',
      prep: 8, cook: 0, difficulty: 1, servings: 2,
      flavors: ['新手友好', '快手', '清淡', '解腻'],
      ingredients: [
        { name: '黄瓜', amount: '2 根', cat: '蔬菜', note: '选带刺、捏着硬的，更脆' },
        { name: '蒜', amount: '3 瓣', cat: '蔬菜' },
        { name: '香菜', amount: '1 棵', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '生抽', amount: '2 汤匙', role: '主味，咸鲜都靠它' },
        { name: '香醋', amount: '1 汤匙', role: '提酸开胃，最后放更香' },
        { name: '白糖', amount: '半小勺', role: '压住醋的尖锐，让味道圆一些' },
        { name: '香油', amount: '1 小勺', role: '增香' },
        { name: '盐', amount: '1 小撮', role: '腌黄瓜出水，口感更脆' }
      ],
      steps: [
        { text: '黄瓜用刀面拍裂，切成小段，撒一小撮盐拌匀放着。', tip: '拍比切好：断面毛糙，更挂得住汁。', timer: { label: '腌出水', seconds: 300 } },
        { text: '蒜捣成末，和生抽、醋、糖、香油调成一碗汁。' },
        { text: '倒掉黄瓜腌出来的水，浇上调好的汁拌匀。' },
        { text: '盖上保鲜膜放进冰箱冰一会儿，脆度会再上一个台阶。', timer: { label: '冰镇', seconds: 600 } }
      ],
      variations: [
        { title: '麻辣版', diff: '汁里加一勺辣椒油和一小撮花椒粉。' },
        { title: '蒜香重口版', diff: '蒜加到 6 瓣，再淋一点蒜蓉辣酱。' },
        { title: '酸甜版', diff: '糖加到 1 汤匙、醋加到 2 汤匙，偏糖醋口。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/拍黄瓜做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=拍黄瓜' }
    },

    {
      id: 'fried-rice',
      name: '蛋炒饭',
      tagline: '剩饭的最高归宿，粒粒分明才算合格',
      art: 'pot',
      prep: 6, cook: 8, difficulty: 1, servings: 2,
      flavors: ['新手友好', '快手', '家常', '下饭'],
      ingredients: [
        { name: '米饭', amount: '2 碗', cat: '其他', note: '隔夜冷饭最好，水分少才炒得散' },
        { name: '鸡蛋', amount: '2 个', cat: '肉蛋' },
        { name: '胡萝卜', amount: '半根', cat: '蔬菜' },
        { name: '豌豆', amount: '1 把', cat: '蔬菜' },
        { name: '小葱', amount: '2 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '食用油', amount: '2 汤匙', role: '让饭粒裹上油才不会粘成一团' },
        { name: '盐', amount: '适量', role: '调味，最后放' },
        { name: '生抽', amount: '1 汤匙', role: '沿锅边淋，会有焦香' }
      ],
      steps: [
        { text: '鸡蛋打散，热锅凉油倒进去，炒到半凝固就盛出来。', tip: '别炒老了，后面还要回锅。' },
        { text: '锅里补一点油，下胡萝卜丁和豌豆炒到断生。', timer: { label: '炒配菜', seconds: 90 } },
        { text: '下米饭，用铲子压散，中火不停翻炒到粒粒分明。', tip: '新手最容易翻不动 —— 先把饭用手抓散再下锅会轻松很多。', timer: { label: '炒饭', seconds: 180 } },
        { text: '倒回鸡蛋，加盐，沿锅边淋生抽，撒葱花翻匀出锅。' }
      ],
      variations: [
        { title: '扬州版', diff: '加虾仁、火腿丁和玉米粒，配料先炒再下饭。' },
        { title: '酱油版', diff: '生抽加到 2 汤匙，不放配菜，吃的是焦香。' },
        { title: '辣白菜版', diff: '下辣白菜和韩式辣酱，最后撒海苔碎。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/蛋炒饭做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=蛋炒饭' }
    },

    {
      id: 'scallion-noodle',
      name: '葱油拌面',
      tagline: '一碗面只要三样东西，香得不像话',
      art: 'pot',
      prep: 5, cook: 12, difficulty: 1, servings: 2,
      flavors: ['新手友好', '快手', '家常', '香'],
      ingredients: [
        { name: '面条', amount: '200g', cat: '其他', note: '细面挂汁，宽面更有嚼头，都行' },
        { name: '小葱', amount: '5 根', cat: '蔬菜', note: '葱白葱绿分开用，别一起下' },
        { name: '开洋（虾米）', amount: '1 小把', cat: '水产' }
      ],
      seasonings: [
        { name: '食用油', amount: '5 汤匙', role: '炸葱油要舍得放油，油少葱会焦不会香' },
        { name: '生抽', amount: '3 汤匙', role: '咸鲜主味' },
        { name: '老抽', amount: '半汤匙', role: '只为上色，多了会发苦' },
        { name: '白糖', amount: '1 小勺', role: '和酱油一起煮，出粘稠的酱香' }
      ],
      steps: [
        { text: '葱白切段、葱绿切末分开。冷油下葱白，全程小火慢慢炸。', tip: '冷油下锅是关键，热油下去外面焦了里面还没出味。', timer: { label: '炸葱油', seconds: 600 } },
        { text: '葱白炸到金黄捞出，下开洋炸香，加生抽、老抽、白糖煮开就关火。', timer: { label: '煮酱汁', seconds: 90 } },
        { text: '另起一锅水煮面，煮到比包装时间少半分钟。', timer: { label: '煮面', seconds: 240 } },
        { text: '面捞进碗里，浇两大勺葱油酱汁拌匀，撒葱绿。' }
      ],
      variations: [
        { title: '辣油版', diff: '酱汁里加一勺辣椒面，一起炸香。' },
        { title: '麻酱版', diff: '拌面时加一勺芝麻酱，味道更厚。' },
        { title: '素版', diff: '去掉开洋，多放半把葱，一样香。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/葱油拌面做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=葱油拌面' }
    },

    {
      id: 'stirfry-cabbage',
      name: '手撕包菜',
      tagline: '大火快炒的代表作，锅气都在那六十秒里',
      art: 'garlic-broccoli',
      prep: 6, cook: 6, difficulty: 1, servings: 2,
      flavors: ['快手', '下饭', '家常', '微辣'],
      ingredients: [
        { name: '包菜', amount: '半棵', cat: '蔬菜', note: '手撕比刀切好，断面挂汁' },
        { name: '干辣椒', amount: '3 个', cat: '蔬菜' },
        { name: '蒜', amount: '3 瓣', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '食用油', amount: '2 汤匙', role: '大火炒要油稍多一点' },
        { name: '生抽', amount: '1 汤匙', role: '咸鲜' },
        { name: '香醋', amount: '半汤匙', role: '最后沿锅边淋，酸香会挥发一半，留的是香' },
        { name: '盐', amount: '适量', role: '包菜出水后会淡，最后尝一下再补' }
      ],
      steps: [
        { text: '包菜撕成块洗净，一定要沥干水。', tip: '带水进锅会变成煮菜，锅气就没了。' },
        { text: '热锅下油，蒜片和干辣椒爆香。', timer: { label: '爆香', seconds: 30 } },
        { text: '下包菜，全程大火翻炒到边缘微微透明。', tip: '别急着翻，每十秒翻一次让它接触到热锅。', timer: { label: '大火快炒', seconds: 180 } },
        { text: '加生抽和盐，出锅前沿锅边淋醋，翻两下立刻装盘。' }
      ],
      variations: [
        { title: '五花肉版', diff: '先煸出五花肉的油，用猪油炒包菜。' },
        { title: '番茄版', diff: '加半个番茄一起炒，出汁后微酸开胃。' },
        { title: '酸辣版', diff: '干辣椒加到 6 个，醋加到 1 汤匙。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/手撕包菜做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=手撕包菜' }
    },

    {
      id: 'braised-eggplant',
      name: '红烧茄子',
      tagline: '茄子是油做的，但可以不那么油',
      art: 'veg',
      prep: 10, cook: 12, difficulty: 2, servings: 2,
      flavors: ['下饭', '家常', '进阶', '宴客'],
      ingredients: [
        { name: '茄子', amount: '2 根', cat: '蔬菜', note: '捏着有弹性、表皮发亮的嫩' },
        { name: '青椒', amount: '1 个', cat: '蔬菜' },
        { name: '蒜', amount: '4 瓣', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '食用油', amount: '3 汤匙', role: '茄子吸油，先腌过再煎能省一半' },
        { name: '生抽', amount: '2 汤匙', role: '咸鲜主味' },
        { name: '老抽', amount: '半汤匙', role: '上色，让茄子看着就有食欲' },
        { name: '白糖', amount: '1 小勺', role: '提鲜，红烧口的灵魂' },
        { name: '淀粉', amount: '1 小勺', role: '最后勾芡，让汁挂在茄子上' },
        { name: '盐', amount: '适量', role: '腌茄子出水用' }
      ],
      steps: [
        { text: '茄子切滚刀块，撒盐拌匀放着，之后把水挤干。', tip: '这一步能把茄子里的水逼出来，后面就少吸一半油。', timer: { label: '腌茄子', seconds: 600 } },
        { text: '热锅下油，茄子摊开中火煎到两面微焦。', tip: '别急着翻动，煎出焦边才有香味。', timer: { label: '煎茄子', seconds: 240 } },
        { text: '下蒜末和青椒块，加生抽、老抽、糖，倒小半碗水，盖盖焖。', timer: { label: '焖入味', seconds: 180 } },
        { text: '开盖转大火，淋水淀粉勾芡，收到汁裹住茄子就出锅。' }
      ],
      variations: [
        { title: '鱼香版', diff: '加泡椒和姜末，糖醋比例拉到 1:1，做成鱼香口。' },
        { title: '少油蒸版', diff: '茄子上锅蒸 8 分钟再浇汁，油量减到 1 汤匙。' },
        { title: '蒜蓉烤版', diff: '茄子剖开刷油，铺蒜蓉进烤箱 200 度 15 分钟。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/红烧茄子做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=红烧茄子' }
    },

    {
      id: 'mapo-tofu',
      name: '麻婆豆腐',
      tagline: '麻、辣、烫、酥、嫩、鲜，六样都齐了才算对',
      art: 'pot',
      prep: 10, cook: 12, difficulty: 2, servings: 3,
      flavors: ['下饭', '硬菜', '川味', '辣'],
      ingredients: [
        { name: '嫩豆腐', amount: '1 盒（约 400g）', cat: '其他', note: '嫩豆腐才对，老豆腐口感不对' },
        { name: '牛肉末', amount: '100g', cat: '肉蛋' },
        { name: '蒜苗', amount: '2 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '豆瓣酱', amount: '1.5 汤匙', role: '川菜的底味，一定要炒出红油' },
        { name: '辣椒面', amount: '1 小勺', role: '补辣度和颜色' },
        { name: '花椒粉', amount: '1 小勺', role: '麻味来源，必须最后放，久煮会发苦' },
        { name: '生抽', amount: '1 汤匙', role: '补咸鲜' },
        { name: '淀粉', amount: '1 小勺', role: '勾芡，要分两次淋才裹得住' }
      ],
      steps: [
        { text: '豆腐切两厘米见方的块，放进淡盐水里焯一下。', tip: '盐水能让豆腐更紧实，后面翻动不容易碎。', timer: { label: '焯豆腐', seconds: 60 } },
        { text: '锅里下油炒牛肉末，炒到变色出香。', timer: { label: '炒肉末', seconds: 120 } },
        { text: '下豆瓣酱和辣椒面，小火炒到油变红。', tip: '这一步不能急，炒不出红油这道菜就塌了。', timer: { label: '炒红油', seconds: 90 } },
        { text: '加一碗水烧开，轻轻推入豆腐，中火烧。', tip: '用铲子背面推，别搅。', timer: { label: '烧豆腐', seconds: 180 } },
        { text: '分两次淋水淀粉收汁，起锅撒花椒粉和蒜苗。' }
      ],
      variations: [
        { title: '素版', diff: '牛肉末换成香菇末，同样先炒香。' },
        { title: '重麻版', diff: '花椒粉加到 2 小勺，再淋一勺花椒油。' },
        { title: '少油版', diff: '豆瓣酱减半，红油炒好后倒掉多余油再加水。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/麻婆豆腐做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=麻婆豆腐' }
    },

    {
      id: 'kungpao-chicken',
      name: '宫保鸡丁',
      tagline: '碗汁先调好，下锅就是三十秒的事',
      art: 'cola-wings',
      prep: 15, cook: 10, difficulty: 2, servings: 2,
      flavors: ['下饭', '宴客', '川味', '进阶'],
      ingredients: [
        { name: '鸡腿肉', amount: '300g', cat: '肉蛋', note: '鸡腿比鸡胸嫩，久炒也不柴' },
        { name: '花生米', amount: '1 把', cat: '其他' },
        { name: '干辣椒', amount: '6 个', cat: '蔬菜' },
        { name: '小葱', amount: '2 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '料酒', amount: '1 汤匙', role: '腌肉去腥' },
        { name: '生抽', amount: '1.5 汤匙', role: '咸鲜' },
        { name: '香醋', amount: '1 汤匙', role: '和糖配成荔枝口，是宫保的关键' },
        { name: '白糖', amount: '1 汤匙', role: '酸甜平衡，别怕多' },
        { name: '淀粉', amount: '1 小勺', role: '腌肉锁水 + 碗汁勾芡，两处都要' },
        { name: '花椒', amount: '1 小撮', role: '麻香，和干辣椒一起爆' }
      ],
      steps: [
        { text: '鸡腿肉切丁，加料酒、半勺生抽、淀粉抓匀，最后封一点油。', tip: '封油能让肉丁下锅不粘连。', timer: { label: '腌鸡丁', seconds: 900 } },
        { text: '生抽、醋、糖、淀粉加两汤匙水，调成一碗汁放旁边。', tip: '这道菜全程大火，没有时间现找调料。' },
        { text: '热锅滑炒鸡丁到变色就盛出来。', timer: { label: '滑鸡丁', seconds: 120 } },
        { text: '锅留底油，小火爆香花椒和干辣椒。', tip: '干辣椒别炸黑了，深红就要下一样。', timer: { label: '爆香', seconds: 30 } },
        { text: '倒回鸡丁，淋碗汁大火收稠，撒花生米和葱段翻两下出锅。', tip: '花生米最后放，早了就不脆了。' }
      ],
      variations: [
        { title: '不辣版', diff: '干辣椒减到 1 个，加黄瓜丁和胡萝卜丁。' },
        { title: '酸甜重口版', diff: '糖醋各加到 1.5 汤匙，更接近糖醋味。' },
        { title: '腰果版', diff: '花生米换成腰果，先炸香再最后放。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/宫保鸡丁做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=宫保鸡丁' }
    },

    {
      id: 'sweet-sour-ribs',
      name: '糖醋排骨',
      tagline: '焖够时间，收汁那两分钟才值钱',
      art: 'braised-pork',
      prep: 15, cook: 40, difficulty: 3, servings: 3,
      flavors: ['硬菜', '宴客', '下饭', '有成就感'],
      ingredients: [
        { name: '肋排', amount: '500g', cat: '肉蛋', note: '让摊主剁成 4 厘米段，家里刀不好处理' },
        { name: '姜', amount: '3 片', cat: '蔬菜' },
        { name: '小葱', amount: '2 段', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '料酒', amount: '1 汤匙', role: '焯水去腥' },
        { name: '生抽', amount: '2 汤匙', role: '咸鲜底味' },
        { name: '香醋', amount: '3 汤匙', role: '分两次放：焖的时候一半，收汁时一半' },
        { name: '白糖', amount: '2 汤匙', role: '糖醋口的骨架，也可以用冰糖更亮' },
        { name: '盐', amount: '1 小勺', role: '少量，糖醋口也需要一点咸打底' }
      ],
      steps: [
        { text: '排骨冷水下锅，加姜片和料酒，煮开后撇净浮沫捞出冲净。', timer: { label: '焯水', seconds: 180 } },
        { text: '锅里少油，排骨煎到四面微黄。', tip: '煎过的排骨焖出来更香，也更容易挂汁。', timer: { label: '煎排骨', seconds: 240 } },
        { text: '加料酒、生抽、糖、一半的醋和没过排骨的热水，小火盖盖焖。', tip: '中途别老开盖，看一次就行。', timer: { label: '小火焖', seconds: 1500 } },
        { text: '开盖转大火收汁，汤汁变稠时淋剩下的醋，翻匀让每块都裹上。', tip: '最后那勺醋是灵魂，早放了酸味会跑光。', timer: { label: '收汁', seconds: 300 } }
      ],
      variations: [
        { title: '茄汁版', diff: '加 2 汤匙番茄酱，酸味更柔和，孩子更爱吃。' },
        { title: '少糖版', diff: '糖减到 1 汤匙，醋保持，偏酸口不腻。' },
        { title: '湘式酸辣版', diff: '收汁时加剁椒和蒜末，变成酸辣口。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/糖醋排骨做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=糖醋排骨' }
    },

    {
      id: 'mushroom-chicken',
      name: '香菇滑鸡',
      tagline: '腌够时间的鸡肉，怎么做都嫩',
      art: 'cola-wings',
      prep: 12, cook: 20, difficulty: 2, servings: 3,
      flavors: ['家常', '下饭', '鲜', '进阶'],
      ingredients: [
        { name: '鸡腿', amount: '2 只', cat: '肉蛋', note: '让摊主剁块，或者自己顺着关节拆' },
        { name: '干香菇', amount: '8 朵', cat: '蔬菜', note: '干香菇比鲜的香，泡菇水别倒' },
        { name: '姜', amount: '3 片', cat: '蔬菜' },
        { name: '小葱', amount: '2 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '生抽', amount: '2 汤匙', role: '咸鲜主味' },
        { name: '蚝油', amount: '1 汤匙', role: '提鲜增稠，让汁挂在鸡肉上' },
        { name: '料酒', amount: '1 汤匙', role: '去腥' },
        { name: '淀粉', amount: '1 小勺', role: '腌肉锁住水分，是「滑」的关键' },
        { name: '白糖', amount: '半小勺', role: '提鲜，吃不出甜味' }
      ],
      steps: [
        { text: '干香菇用温水泡开，泡菇水留着别倒。', tip: '泡菇水是这道菜的鲜味来源，沉淀一下再用。', timer: { label: '泡香菇', seconds: 1200 } },
        { text: '鸡块加生抽、蚝油、料酒、淀粉抓匀，腌着。', tip: '至少腌 20 分钟，隔夜更好。', timer: { label: '腌鸡块', seconds: 1200 } },
        { text: '砂锅或炒锅下油，姜片葱段爆香。', timer: { label: '爆香', seconds: 30 } },
        { text: '下鸡块摊开煎到表面变色，再翻动。', tip: '先别急着翻，煎出焦边再炒更香。', timer: { label: '炒鸡块', seconds: 180 } },
        { text: '加香菇和泡菇水（没过一半就行），盖盖中小火焖。', timer: { label: '焖煮', seconds: 900 } },
        { text: '开盖大火收汁到浓稠，撒葱花出锅。' }
      ],
      variations: [
        { title: '砂锅版', diff: '最后连汤倒进砂锅，小火咕嘟 5 分钟再上桌。' },
        { title: '粉丝版', diff: '锅底铺泡软的粉丝，吸饱汤汁是精华。' },
        { title: '辣版', diff: '爆香时加两个小米辣，鲜里带点辣。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/香菇滑鸡做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=香菇滑鸡' }
    },

    {
      id: 'garlic-shrimp',
      name: '蒜蓉蒸虾',
      tagline: '开背、铺蒜、上锅，剩下交给计时器',
      art: 'seabass',
      prep: 10, cook: 8, difficulty: 2, servings: 2,
      flavors: ['鲜', '宴客', '进阶', '快手'],
      ingredients: [
        { name: '大虾', amount: '12 只', cat: '水产', note: '个头均匀一点，蒸的时间才好控制' },
        { name: '蒜', amount: '1 整头', cat: '蔬菜' },
        { name: '粉丝', amount: '1 小把', cat: '其他' },
        { name: '小米辣', amount: '1 个', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '蒸鱼豉油', amount: '2 汤匙', role: '蒸海鲜专用的鲜味，普通生抽略逊' },
        { name: '料酒', amount: '1 汤匙', role: '腌虾去腥' },
        { name: '食用油', amount: '3 汤匙', role: '最后浇热油，把蒜香激出来' },
        { name: '白糖', amount: '半小勺', role: '提鲜' }
      ],
      steps: [
        { text: '虾剪开背部去掉虾线，用料酒腌着。', tip: '开背除了去线，也让蒜香进得去。', timer: { label: '腌虾', seconds: 600 } },
        { text: '蒜切末，一半用温油炸到金黄，捞出和生蒜末混在一起。', tip: '一半熟一半生，香气最立体。', timer: { label: '炸蒜', seconds: 120 } },
        { text: '粉丝温水泡软铺在盘底，虾摆上去，铺满蒜蓉。' },
        { text: '水开后上锅大火蒸。', tip: '虾变红卷曲就熟了，蒸过头肉会柴。', timer: { label: '蒸虾', seconds: 480 } },
        { text: '出锅淋蒸鱼豉油，撒小米辣，浇一勺滚油激香。' }
      ],
      variations: [
        { title: '黄油版', diff: '蒜蓉里拌一小块黄油，蒸出来有奶香。' },
        { title: '烤箱版', diff: '200 度烤 8 分钟，蒜蓉会更焦香。' },
        { title: '去粉丝版', diff: '直接铺在盘子里蒸，汤汁更清。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/蒜蓉蒸虾做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=蒜蓉蒸虾' }
    },

    {
      id: 'seaweed-soup',
      name: '紫菜蛋花汤',
      tagline: '三分钟，给一顿饭收个尾巴',
      art: 'pot',
      prep: 3, cook: 6, difficulty: 1, servings: 2,
      flavors: ['新手友好', '快手', '清淡', '鲜'],
      ingredients: [
        { name: '紫菜', amount: '1 小片', cat: '蔬菜' },
        { name: '鸡蛋', amount: '1 个', cat: '肉蛋' },
        { name: '虾皮', amount: '1 小把', cat: '水产' },
        { name: '小葱', amount: '1 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '盐', amount: '适量', role: '调味，虾皮有咸度，先尝再加' },
        { name: '生抽', amount: '半汤匙', role: '补一点鲜' },
        { name: '香油', amount: '几滴', role: '出锅点香' }
      ],
      steps: [
        { text: '紫菜撕小块，和虾皮一起放进汤碗底。' },
        { text: '锅里烧水，同时把鸡蛋打散。', timer: { label: '烧水', seconds: 300 } },
        { text: '水开后关小火，蛋液绕着圈缓缓淋进去，静置几秒再用勺子推开。', tip: '一倒进去就搅，蛋花会碎成渣。', timer: { label: '淋蛋液', seconds: 30 } },
        { text: '冲进碗里，加盐、生抽、香油，撒葱花。' }
      ],
      variations: [
        { title: '番茄版', diff: '先下番茄丁炒出汁再加水，酸甜口。' },
        { title: '豆腐版', diff: '加半盒嫩豆腐丝一起煮，更顶饱。' },
        { title: '酸辣版', diff: '加一勺醋和白胡椒粉，暖身。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/紫菜蛋花汤做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=紫菜蛋花汤' }
    },

    {
      id: 'beef-broccoli',
      name: '芥兰牛柳',
      tagline: '牛肉要逆纹切，火要够大，手要快',
      art: 'braised-pork',
      prep: 15, cook: 8, difficulty: 2, servings: 2,
      flavors: ['下饭', '宴客', '进阶', '鲜'],
      ingredients: [
        { name: '牛里脊', amount: '250g', cat: '肉蛋', note: '逆着纹理切片，切断纤维才嫩' },
        { name: '芥兰', amount: '300g', cat: '蔬菜', note: '粗茎的部分可以削掉一点皮' },
        { name: '姜', amount: '3 片', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '蚝油', amount: '1 汤匙', role: '这道菜的主味，鲜和稠都靠它' },
        { name: '生抽', amount: '1 汤匙', role: '补咸鲜' },
        { name: '料酒', amount: '1 汤匙', role: '腌牛肉去腥' },
        { name: '淀粉', amount: '1 小勺', role: '腌肉锁水，牛肉才嫩' },
        { name: '白糖', amount: '半小勺', role: '提鲜，蚝油需要一点糖才亮' }
      ],
      steps: [
        { text: '牛肉逆纹切片，加料酒、生抽、淀粉抓匀，最后封一勺油。', tip: '抓到肉把水都「吃」回去为止，然后腌够时间。', timer: { label: '腌牛肉', seconds: 900 } },
        { text: '芥兰焯水，水里加一点盐和油，捞出过凉。', tip: '过凉能保住脆感和翠绿。', timer: { label: '焯芥兰', seconds: 60 } },
        { text: '大火热锅，下牛肉摊开，变色就盛出来。', tip: '牛肉最怕久炒，宁可生一点后面还要回锅。', timer: { label: '炒牛柳', seconds: 90 } },
        { text: '锅里补油下姜片和芥兰翻炒。', timer: { label: '炒芥兰', seconds: 90 } },
        { text: '倒回牛肉，加蚝油和糖，快速翻匀立刻出锅。' }
      ],
      variations: [
        { title: '黑椒版', diff: '腌肉时加半小勺黑胡椒碎，最后再撒一次。' },
        { title: '蒜香版', diff: '爆香 4 瓣蒜片，比姜更冲更香。' },
        { title: '少油版', diff: '牛肉改成水滑：开水下锅烫 20 秒捞出再炒。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/芥兰牛柳做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=芥兰牛柳' }
    }
  ];

  window.__EXTRA_META = {
    'steamed-egg': {
      no: 'No.08', latin: 'Ova vapore coagulata', family: '蛋类科',
      season: '四季', origin: '家常',
      flavor: { '咸': 1, '甜': 0, '酸': 0, '鲜': 3, '辣': 0, '油': 1 },
      annot: [
        { x: 30, y: 50, tx: 42, ty: 62, t: '蛋液' },
        { x: 70, y: 44, tx: 58, ty: 56, t: '葱花' }
      ]
    },
    'cucumber-salad': {
      no: 'No.09', latin: 'Cucumis contusus', family: '凉菜科',
      season: '夏', origin: '北方',
      flavor: { '咸': 2, '甜': 1, '酸': 2, '鲜': 1, '辣': 1, '油': 1 },
      annot: [
        { x: 30, y: 45, tx: 42, ty: 58, t: '黄瓜段' },
        { x: 68, y: 52, tx: 56, ty: 62, t: '蒜末' }
      ]
    },
    'fried-rice': {
      no: 'No.10', latin: 'Oryza fricta cum ovis', family: '米面科',
      season: '四季', origin: '家常',
      flavor: { '咸': 2, '甜': 0, '酸': 0, '鲜': 2, '辣': 0, '油': 3 },
      annot: [
        { x: 34, y: 50, tx: 44, ty: 62, t: '饭粒' },
        { x: 66, y: 44, tx: 56, ty: 58, t: '蛋花' }
      ]
    },
    'scallion-noodle': {
      no: 'No.11', latin: 'Noodles cum oleo cepae', family: '米面科',
      season: '四季', origin: '沪式',
      flavor: { '咸': 2, '甜': 1, '酸': 0, '鲜': 3, '辣': 0, '油': 3 },
      annot: [
        { x: 32, y: 48, tx: 42, ty: 62, t: '面条' },
        { x: 68, y: 42, tx: 56, ty: 56, t: '葱油' }
      ]
    },
    'stirfry-cabbage': {
      no: 'No.12', latin: 'Brassica manu lacera', family: '叶菜科',
      season: '秋冬', origin: '湘式',
      flavor: { '咸': 2, '甜': 0, '酸': 1, '鲜': 2, '辣': 2, '油': 2 },
      annot: [
        { x: 28, y: 38, tx: 40, ty: 54, t: '包菜' },
        { x: 72, y: 50, tx: 58, ty: 62, t: '干辣椒' }
      ]
    },
    'braised-eggplant': {
      no: 'No.13', latin: 'Solanum melongena rubro-coctum', family: '茄果科',
      season: '夏秋', origin: '家常',
      flavor: { '咸': 2, '甜': 1, '酸': 0, '鲜': 3, '辣': 0, '油': 3 },
      annot: [
        { x: 30, y: 46, tx: 42, ty: 60, t: '茄块' },
        { x: 68, y: 52, tx: 56, ty: 62, t: '青椒' }
      ]
    },
    'mapo-tofu': {
      no: 'No.14', latin: 'Tofu cum pipere Sichuanensi', family: '豆制品科',
      season: '四季', origin: '川式',
      flavor: { '咸': 3, '甜': 0, '酸': 0, '鲜': 3, '辣': 4, '油': 3 },
      annot: [
        { x: 32, y: 50, tx: 42, ty: 62, t: '豆腐' },
        { x: 68, y: 44, tx: 56, ty: 58, t: '肉末' }
      ]
    },
    'kungpao-chicken': {
      no: 'No.15', latin: 'Pullus cum arachidibus', family: '禽肉科',
      season: '四季', origin: '川式',
      flavor: { '咸': 2, '甜': 2, '酸': 2, '鲜': 3, '辣': 2, '油': 2 },
      annot: [
        { x: 30, y: 46, tx: 42, ty: 60, t: '鸡丁' },
        { x: 70, y: 50, tx: 58, ty: 62, t: '花生' }
      ]
    },
    'sweet-sour-ribs': {
      no: 'No.16', latin: 'Costae dulces et acidae', family: '畜肉科',
      season: '四季', origin: '沪式',
      flavor: { '咸': 1, '甜': 4, '酸': 3, '鲜': 3, '辣': 0, '油': 3 },
      annot: [
        { x: 30, y: 48, tx: 42, ty: 62, t: '肋排' },
        { x: 70, y: 42, tx: 58, ty: 56, t: '糖醋汁' }
      ]
    },
    'mushroom-chicken': {
      no: 'No.17', latin: 'Pullus cum boletis', family: '禽肉科',
      season: '秋冬', origin: '粤式',
      flavor: { '咸': 2, '甜': 1, '酸': 0, '鲜': 4, '辣': 0, '油': 2 },
      annot: [
        { x: 32, y: 46, tx: 42, ty: 60, t: '鸡块' },
        { x: 68, y: 52, tx: 56, ty: 62, t: '香菇' }
      ]
    },
    'garlic-shrimp': {
      no: 'No.18', latin: 'Caridei cum allio', family: '水产科',
      season: '四季', origin: '粤式',
      flavor: { '咸': 2, '甜': 0, '酸': 0, '鲜': 4, '辣': 1, '油': 2 },
      annot: [
        { x: 28, y: 40, tx: 40, ty: 56, t: '大虾' },
        { x: 72, y: 46, tx: 58, ty: 60, t: '蒜蓉' }
      ]
    },
    'seaweed-soup': {
      no: 'No.19', latin: 'Ius porphyrae cum ovis', family: '汤羹科',
      season: '四季', origin: '家常',
      flavor: { '咸': 2, '甜': 0, '酸': 0, '鲜': 4, '辣': 0, '油': 0 },
      annot: [
        { x: 34, y: 50, tx: 44, ty: 62, t: '紫菜' },
        { x: 66, y: 44, tx: 56, ty: 58, t: '蛋花' }
      ]
    },
    'beef-broccoli': {
      no: 'No.20', latin: 'Bubula cum brassica alba', family: '畜肉科',
      season: '秋冬', origin: '粤式',
      flavor: { '咸': 2, '甜': 0, '酸': 0, '鲜': 4, '辣': 0, '油': 2 },
      annot: [
        { x: 30, y: 48, tx: 42, ty: 62, t: '牛柳' },
        { x: 70, y: 42, tx: 58, ty: 58, t: '芥兰' }
      ]
    }
  };
})();
