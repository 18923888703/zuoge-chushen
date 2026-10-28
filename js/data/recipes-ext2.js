/* 扩展馆藏 第二批：No.21 – No.40
   与 recipes.js 同结构，加载顺序在 recipes.js 之前，由 recipes.js 合并进 RECIPES。
   art 复用现有铜版线稿（按食材形态就近匹配），不新增插画。 */
(function () {
  var B = window.__EXTRA_RECIPES || [];

  B = B.concat([
    {
      id: 'pepper-pork',
      name: '青椒肉丝',
      tagline: '最家常的一道下饭菜，肉丝滑不柴全在腌上',
      art: 'pot',
      prep: 10, cook: 8, difficulty: 1, servings: 2,
      flavors: ['下饭', '快手', '家常', '新手友好'],
      ingredients: [
        { name: '猪里脊', amount: '250g', cat: '肉蛋', note: '顺着纹理切丝，猪肉顺切才不散' },
        { name: '青椒', amount: '3 个', cat: '蔬菜', note: '薄皮椒更香，螺丝椒更辣' },
        { name: '蒜', amount: '2 瓣', cat: '蔬菜' },
        { name: '姜', amount: '2 片', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '生抽', amount: '2 汤匙', role: '咸鲜主味' },
        { name: '料酒', amount: '1 汤匙', role: '腌肉去腥' },
        { name: '淀粉', amount: '1 小勺', role: '腌肉锁水，这是「滑」的关键' },
        { name: '盐', amount: '适量', role: '出锅前再放，肉才不柴' }
      ],
      steps: [
        { text: '里脊切丝，加料酒、生抽、淀粉抓匀，最后封一勺油拌开。', tip: '抓到肉丝发黏、把水都吃进去，静置十分钟。封油是为了下锅不粘成团。' },
        { text: '青椒去籽切丝，蒜切片。', tip: '青椒里的白筋要撕掉，不然发苦。' },
        { text: '锅烧到冒烟再倒油，下肉丝快速划散，变色就盛出来。', tip: '别等肉丝熟透，七分就出锅，后面还要回锅。', timer: { label: '滑肉丝', seconds: 60 } },
        { text: '锅里底油下蒜姜爆香，青椒丝大火炒到表皮起虎皮。', timer: { label: '炒青椒', seconds: 90 } },
        { text: '肉丝回锅，淋生抽翻匀，尝过咸淡再决定加不加盐，出锅。' }
      ],
      variations: [
        { title: '尖椒版', diff: '换成螺丝椒，辣度上去，更适合重口。' },
        { title: '京酱版', diff: '加一勺甜面酱，肉丝裹酱，配豆腐皮卷着吃。' },
        { title: '胡萝卜版', diff: '加半根胡萝卜丝，颜色更好看，也多一丝甜。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/青椒肉丝做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=青椒肉丝' }
    },

    {
      id: 'garlic-vermicelli-cabbage',
      name: '蒜蓉粉丝蒸娃娃菜',
      tagline: '蒸锅一放就完事，蒜香全被粉丝吸走',
      art: 'veg',
      prep: 12, cook: 12, difficulty: 1, servings: 2,
      flavors: ['清淡', '新手友好', '快手', '素菜'],
      ingredients: [
        { name: '娃娃菜', amount: '2 棵', cat: '蔬菜', note: '个头小、抱得紧的更嫩' },
        { name: '龙口粉丝', amount: '1 小把（约 50g）', cat: '其他', note: '温水泡软再用，别泡过头' },
        { name: '蒜', amount: '1 整头', cat: '蔬菜', note: '这道菜蒜是主角，别省' }
      ],
      seasonings: [
        { name: '蒸鱼豉油', amount: '3 汤匙', role: '鲜味来源，蒸菜专用比生抽好' },
        { name: '食用油', amount: '3 汤匙', role: '最后浇热油，把蒜香激出来' },
        { name: '小米辣', amount: '1 个', cat: '蔬菜', role: '一点点辣提味，不吃辣可省' }
      ],
      steps: [
        { text: '粉丝温水泡软剪短，铺在盘底。', tip: '粉丝垫底是为了接住上面的汁，别铺太厚。', timer: { label: '泡粉丝', seconds: 600 } },
        { text: '娃娃菜竖着切成四条，摆在粉丝上。' },
        { text: '蒜切末，一半用一点油小火炒到微黄，和生蒜末混在一起。', tip: '一半熟一半生，蒜香才有层次 —— 全生太冲，全熟没劲儿。' },
        { text: '蒜蓉铺在菜上，水开后上锅大火蒸。', timer: { label: '蒸制', seconds: 600 } },
        { text: '出锅淋蒸鱼豉油，烧一勺热油浇在蒜上，滋一声就成了。' }
      ],
      variations: [
        { title: '开胃版', diff: '加一勺剁椒一起蒸，酸辣开胃。' },
        { title: '虾仁版', diff: '娃娃菜上摆几只虾仁，鲜味翻倍。' },
        { title: '少油版', diff: '省略最后淋热油，蒜香淡一些但清爽。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/蒜蓉粉丝蒸娃娃菜', xhs: 'https://www.xiaohongshu.com/search_result?keyword=蒜蓉粉丝蒸娃娃菜' }
    },

    {
      id: 'tomato-egg-soup',
      name: '西红柿鸡蛋汤',
      tagline: '三分钟上桌的汤，番茄要炒出沙才够味',
      art: 'tomato-egg',
      prep: 5, cook: 8, difficulty: 1, servings: 2,
      flavors: ['快手', '清淡', '新手友好', '家常'],
      ingredients: [
        { name: '番茄', amount: '2 个', cat: '蔬菜', note: '熟透的软番茄，容易出沙' },
        { name: '鸡蛋', amount: '2 个', cat: '肉蛋' },
        { name: '小葱', amount: '1 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '盐', amount: '适量', role: '最后放，放早了番茄出水慢' },
        { name: '白糖', amount: '半小勺', role: '压住番茄的酸尖' },
        { name: '香油', amount: '几滴', role: '出锅点香' },
        { name: '淀粉', amount: '1 小勺', role: '勾薄芡，汤才挂得住蛋花' }
      ],
      steps: [
        { text: '番茄顶部划十字，开水烫一下去皮，切小块。', tip: '去皮口感更顺滑，赶时间可以不去。', timer: { label: '烫番茄', seconds: 60 } },
        { text: '锅里一点油，番茄块中火炒到软烂出汁。', tip: '这一步是汤好不好喝的分水岭，别直接加水煮。', timer: { label: '炒番茄', seconds: 180 } },
        { text: '加两碗开水煮开，加糖调味。', timer: { label: '煮汤', seconds: 180 } },
        { text: '淀粉加少许水调开，边搅边淋进锅里。' },
        { text: '关小火，蛋液细细绕圈淋入，静置几秒再轻轻推开。', tip: '先静置再推，蛋花才是一朵朵的，不是碎渣。', timer: { label: '淋蛋液', seconds: 30 } },
        { text: '加盐，淋香油，撒葱花出锅。' }
      ],
      variations: [
        { title: '豆腐版', diff: '加半盒嫩豆腐，汤更厚实。' },
        { title: '紫菜版', diff: '出锅前撒一小把紫菜，鲜味更足。' },
        { title: '酸辣版', diff: '加白胡椒粉和醋，暖身开胃。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/西红柿鸡蛋汤做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=西红柿鸡蛋汤' }
    },

    {
      id: 'sweet-sour-tenderloin',
      name: '糖醋里脊',
      tagline: '外脆里嫩的考验，脆不脆看复炸',
      art: 'braised-pork',
      prep: 15, cook: 15, difficulty: 3, servings: 2,
      flavors: ['宴客', '下饭', '硬菜', '酸甜'],
      ingredients: [
        { name: '猪里脊', amount: '350g', cat: '肉蛋', note: '切条别太细，炸完会缩' },
        { name: '鸡蛋', amount: '1 个', cat: '肉蛋' },
        { name: '淀粉', amount: '约 80g', cat: '其他', note: '挂糊用，土豆淀粉最脆' }
      ],
      seasonings: [
        { name: '白糖', amount: '2 汤匙', role: '糖醋口的骨架' },
        { name: '香醋', amount: '2 汤匙', role: '最后沿锅边淋，留香不留酸' },
        { name: '生抽', amount: '1 汤匙', role: '补咸鲜，纯糖醋会腻' },
        { name: '番茄酱', amount: '2 汤匙', role: '颜色和果酸，比纯糖醋更亮' },
        { name: '料酒', amount: '1 汤匙', role: '腌肉去腥' },
        { name: '盐', amount: '1 小撮', role: '少量，糖醋口也需要一点咸打底' }
      ],
      steps: [
        { text: '里脊切条，加料酒、盐、蛋液抓匀，再裹上干淀粉，抓到每条都挂糊。', tip: '糊要干一点，能看出纹路。太稀炸出来是面疙瘩。' },
        { text: '油烧到六成热（筷子下去冒密集小泡），逐条下锅炸定型后捞出。', timer: { label: '第一遍炸', seconds: 120 } },
        { text: '油温升高到八成热，倒回去复炸到金黄酥脆。', tip: '复炸是脆的关键，第一遍是熟，第二遍才是脆。', timer: { label: '复炸', seconds: 60 } },
        { text: '锅里留一点油，番茄酱、糖、生抽、少许水炒到冒大泡。' },
        { text: '倒入里脊快速翻匀，沿锅边淋醋，翻两下立刻出锅。', tip: '汁裹上就走，多炒十秒脆壳就软了。', timer: { label: '裹汁', seconds: 30 } }
      ],
      variations: [
        { title: '少糖版', diff: '糖减半、醋略增，偏酸口不腻。' },
        { title: '茄汁版', diff: '全用番茄酱不用糖醋，颜色更红，孩子更喜欢。' },
        { title: '菠萝版', diff: '加菠萝块一起裹汁，果香解腻。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/糖醋里脊做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=糖醋里脊' }
    },

    {
      id: 'three-cup-chicken',
      name: '三杯鸡',
      tagline: '一杯米酒一杯酱油一杯麻油，香气猛但不复杂',
      art: 'pot',
      prep: 10, cook: 20, difficulty: 2, servings: 2,
      flavors: ['下饭', '硬菜', '家常', '浓香'],
      ingredients: [
        { name: '鸡腿', amount: '2 只', cat: '肉蛋', note: '带骨鸡腿剁块，炖出来更香' },
        { name: '姜', amount: '6 片', cat: '蔬菜', note: '姜要厚，煸到边缘焦才对' },
        { name: '蒜', amount: '1 整头', cat: '蔬菜' },
        { name: '干辣椒', amount: '3 个', cat: '蔬菜' },
        { name: '九层塔', amount: '1 小把', cat: '蔬菜', note: '没有就用香菜代替，风味不同但能吃' }
      ],
      seasonings: [
        { name: '米酒', amount: '半碗（约 80ml）', role: '去腥增香，台湾米酒最好' },
        { name: '黑麻油', amount: '2 汤匙', role: '三杯之一，香气骨架，别用普通香油替代' },
        { name: '生抽', amount: '3 汤匙', role: '咸鲜主味' },
        { name: '冰糖', amount: '1 小勺', role: '提亮回甜，平衡酱油的咸' }
      ],
      steps: [
        { text: '鸡块冷水下锅焯去血沫，捞出冲净沥干。', tip: '焯水后用厨房纸吸干，不然下锅会炸油。', timer: { label: '焯水', seconds: 180 } },
        { text: '麻油小火下姜片，慢慢煸到姜片卷边发干。', tip: '麻油不能大火，会发苦。这一步急不得。', timer: { label: '煸姜', seconds: 180 } },
        { text: '下蒜瓣和干辣椒炒香，倒入鸡块煎到表面微焦。', timer: { label: '煎鸡块', seconds: 240 } },
        { text: '加米酒、生抽、冰糖，煮开后转小火加盖焖。', timer: { label: '焖煮', seconds: 900 } },
        { text: '开盖转大火收汁到浓稠挂勺，关火拌入九层塔，用余温烫软即可。', tip: '九层塔一定关火后放，一煮就黑就苦。', timer: { label: '收汁', seconds: 240 } }
      ],
      variations: [
        { title: '杏鲍菇版', diff: '加杏鲍菇块一起焖，吸饱汤汁比肉还抢手。' },
        { title: '减麻油版', diff: '麻油减到一汤匙，改用普通油补量，清爽些。' },
        { title: '辣味版', diff: '干辣椒加到六个，配小米辣更冲。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/三杯鸡做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=三杯鸡' }
    },

    {
      id: 'steamed-ribs-rice',
      name: '粉蒸排骨',
      tagline: '拌好上锅就不用管，肉脱骨不柴',
      art: 'rib-soup',
      prep: 15, cook: 50, difficulty: 2, servings: 2,
      flavors: ['硬菜', '家常', '下饭', '宴客'],
      ingredients: [
        { name: '肋排', amount: '500g', cat: '肉蛋', note: '剁成 4 厘米段，太小容易蒸老' },
        { name: '蒸肉米粉', amount: '1 袋（约 100g）', cat: '其他', note: '超市有售，麻辣和五香两种口味' },
        { name: '红薯', amount: '1 个', cat: '蔬菜', note: '垫底吸汁，也可以换成土豆或南瓜' },
        { name: '姜', amount: '3 片', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '生抽', amount: '2 汤匙', role: '咸鲜底味' },
        { name: '料酒', amount: '1 汤匙', role: '去腥' },
        { name: '豆瓣酱', amount: '1 汤匙', role: '提香增色，不吃辣可省' },
        { name: '白糖', amount: '半小勺', role: '提鲜' }
      ],
      steps: [
        { text: '排骨泡冷水半小时去血水，中途换一次水，沥干。', tip: '这步跳过会有腥味，别偷懒。', timer: { label: '泡血水', seconds: 1800 } },
        { text: '排骨加姜片、生抽、料酒、豆瓣酱、糖抓匀，静置入味。', timer: { label: '腌制', seconds: 1200 } },
        { text: '红薯去皮切块铺在碗底，排骨裹上蒸肉米粉后码在上面。', tip: '米粉要分两次撒，每次加一点水让粉湿润，太干蒸出来会粉。' },
        { text: '水开后上锅，大火蒸。', timer: { label: '蒸制', seconds: 3000 } },
        { text: '出锅撒葱花。筷子能轻松插进肉里就是到位了。' }
      ],
      variations: [
        { title: '南瓜版', diff: '底下垫南瓜，蒸出来甜糯，孩子爱吃。' },
        { title: '五香版', diff: '用五香米粉不加豆瓣酱，味道更温和不辣。' },
        { title: '粉蒸肉版', diff: '排骨换成五花肉片，更油润。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/粉蒸排骨做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=粉蒸排骨' }
    },

    {
      id: 'braised-crucian',
      name: '红烧鲫鱼',
      tagline: '煎鱼不破皮，关键在锅热鱼干',
      art: 'seabass',
      prep: 10, cook: 20, difficulty: 3, servings: 2,
      flavors: ['硬菜', '下饭', '家常', '宴客'],
      ingredients: [
        { name: '鲫鱼', amount: '1 条（约 400g）', cat: '水产', note: '让摊主杀好，回家把腹腔黑膜刮干净' },
        { name: '姜', amount: '4 片', cat: '蔬菜' },
        { name: '蒜', amount: '3 瓣', cat: '蔬菜' },
        { name: '小葱', amount: '2 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '生抽', amount: '2 汤匙', role: '咸鲜主味' },
        { name: '料酒', amount: '2 汤匙', role: '去腥，鱼菜不能省' },
        { name: '白糖', amount: '1 小勺', role: '提鲜，红烧口的灵魂' },
        { name: '香醋', amount: '半汤匙', role: '最后沿锅边淋，去腥提香' },
        { name: '盐', amount: '适量', role: '最后尝过再加' }
      ],
      steps: [
        { text: '鱼处理干净后两面划几刀，用厨房纸把表面水分彻底擦干。', tip: '鱼皮上有水是粘锅破皮的头号原因，一定要擦到发涩。' },
        { text: '锅烧到冒烟，倒油滑锅，下鱼中火煎，别动。', tip: '下锅后别急着翻，等边缘金黄能晃动了再翻面。', timer: { label: '煎一面', seconds: 240 } },
        { text: '翻面煎另一面，同样煎到金黄后盛出。', timer: { label: '煎另一面', seconds: 180 } },
        { text: '锅里底油下姜蒜爆香，鱼回锅，加料酒、生抽、糖和没过鱼身一半的热水。', timer: { label: '焖煮', seconds: 720 } },
        { text: '大火收汁，汁变稠时沿锅边淋醋，撒葱花出锅。', timer: { label: '收汁', seconds: 300 } }
      ],
      variations: [
        { title: '豆腐版', diff: '加一块煎过的豆腐一起烧，吸汁更下饭。' },
        { title: '酱烧版', diff: '加一勺黄豆酱，酱香更浓。' },
        { title: '糖醋版', diff: '糖醋比例调高，做成糖醋鱼。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/红烧鲫鱼做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=红烧鲫鱼' }
    },

    {
      id: 'mala-xiangguo',
      name: '麻辣香锅',
      tagline: '冰箱剩菜清道夫，什么都能往里放',
      art: 'pot',
      prep: 15, cook: 15, difficulty: 2, servings: 3,
      flavors: ['重口', '下饭', '硬菜', '辣'],
      ingredients: [
        { name: '虾', amount: '10 只', cat: '水产' },
        { name: '午餐肉', amount: '半盒', cat: '肉蛋' },
        { name: '藕', amount: '1 节', cat: '蔬菜' },
        { name: '土豆', amount: '1 个', cat: '蔬菜' },
        { name: '金针菇', amount: '1 把', cat: '蔬菜' },
        { name: '宽粉', amount: '1 小把', cat: '其他' },
        { name: '蒜', amount: '5 瓣', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '麻辣香锅底料', amount: '1 袋（约 100g）', role: '主味来源，超市有售，省去配十几种香料' },
        { name: '干辣椒', amount: '6 个', cat: '蔬菜', role: '补辣度' },
        { name: '花椒', amount: '1 小撮', role: '麻香，和干辣椒一起爆' },
        { name: '生抽', amount: '1 汤匙', role: '补咸鲜' },
        { name: '白糖', amount: '半小勺', role: '提鲜，压住底料的燥' }
      ],
      steps: [
        { text: '所有食材处理成大小相近的块，分别焯水或过油到断生。', tip: '耐煮的（藕、土豆）先下，易熟的（虾、金针菇）后放。', timer: { label: '预处理', seconds: 480 } },
        { text: '锅里多放油，下蒜、干辣椒、花椒小火炒香。', tip: '小火，香料一糊整锅就苦。' },
        { text: '倒入底料炒出红油。', timer: { label: '炒底料', seconds: 120 } },
        { text: '按耐煮程度先后下食材，翻炒到都裹上料。', timer: { label: '翻炒', seconds: 300 } },
        { text: '加生抽、糖调味，尝一下咸淡，撒芝麻香菜出锅。' }
      ],
      variations: [
        { title: '微辣版', diff: '底料减半，用豆瓣酱补齐，辣度温和很多。' },
        { title: '素锅版', diff: '只放蔬菜和豆制品，清爽不油腻。' },
        { title: '酱香版', diff: '不用麻辣底料，改用蚝油 + 蒜蓉炒，适合不吃辣的人。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/麻辣香锅做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=麻辣香锅' }
    },

    {
      id: 'dry-fried-beans',
      name: '干煸豆角',
      tagline: '煸到起皱才有那个干香，急不得',
      art: 'garlic-broccoli',
      prep: 10, cook: 15, difficulty: 2, servings: 2,
      flavors: ['下饭', '家常', '素菜', '微辣'],
      ingredients: [
        { name: '四季豆', amount: '400g', cat: '蔬菜', note: '掐两头撕筋，一定要选嫩的' },
        { name: '猪肉末', amount: '80g', cat: '肉蛋', note: '有点肉渣才香，素的也行' },
        { name: '蒜', amount: '4 瓣', cat: '蔬菜' },
        { name: '干辣椒', amount: '4 个', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '生抽', amount: '2 汤匙', role: '咸鲜主味' },
        { name: '盐', amount: '适量', role: '豆角难入味，早一点放' },
        { name: '白糖', amount: '半小勺', role: '提鲜' }
      ],
      steps: [
        { text: '四季豆掐头去尾撕掉筋，掰成段，洗净后彻底沥干。', tip: '带水下锅会炸油，一定要晾干或用厨房纸擦干。' },
        { text: '锅里放稍多的油，中火把豆角煸到表皮起皱发白。', tip: '这一步要五六分钟，豆角必须彻底熟透 —— 没熟的四季豆有毒，宁可过火。', timer: { label: '煸豆角', seconds: 420 } },
        { text: '豆角拨到一边，下肉末炒散炒香，再和豆角一起炒。', timer: { label: '炒肉末', seconds: 180 } },
        { text: '下蒜末和干辣椒段炒香。', timer: { label: '爆香', seconds: 60 } },
        { text: '加生抽、糖、盐翻匀出锅。' }
      ],
      variations: [
        { title: '素版', diff: '不放肉末，多放蒜，纯素也很香。' },
        { title: '榄菜版', diff: '加一勺橄榄菜，咸香更足，超下饭。' },
        { title: '空气炸锅版', diff: '豆角拌油 200 度烤 12 分钟代替煸，省油很多。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/干煸豆角做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=干煸豆角' }
    },

    {
      id: 'congee-pork',
      name: '皮蛋瘦肉粥',
      tagline: '米粒开花、粥底绵密，靠的是提前腌米',
      art: 'pot',
      prep: 10, cook: 40, difficulty: 1, servings: 2,
      flavors: ['清淡', '新手友好', '家常', '养胃'],
      ingredients: [
        { name: '大米', amount: '1 杯（约 150g）', cat: '其他' },
        { name: '皮蛋', amount: '2 个', cat: '肉蛋', note: '溏心皮蛋更好，切块别太碎' },
        { name: '猪瘦肉', amount: '150g', cat: '肉蛋', note: '里脊或后腿肉都行' },
        { name: '姜', amount: '2 片', cat: '蔬菜' },
        { name: '小葱', amount: '2 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '盐', amount: '适量', role: '最后放，放早了米不易开花' },
        { name: '白胡椒粉', amount: '少许', role: '提香去腥，粥更暖' },
        { name: '香油', amount: '几滴', role: '出锅点香' },
        { name: '料酒', amount: '1 汤匙', role: '腌肉去腥' },
        { name: '淀粉', amount: '半小勺', role: '腌肉让肉片滑嫩' }
      ],
      steps: [
        { text: '大米洗净，加一勺油和少许盐拌匀，冷冻或静置半小时。', tip: '油盐破坏米粒结构，煮的时候特别容易开花。冷冻一小时效果最好。', timer: { label: '腌米', seconds: 1800 } },
        { text: '瘦肉切薄片，加料酒、淀粉、少许盐抓匀腌着。' },
        { text: '水烧开后下米，大火煮开转小火，锅盖留缝防止扑锅。', timer: { label: '熬粥', seconds: 1800 } },
        { text: '粥变稠后下姜丝和一半皮蛋块，继续煮。', tip: '一半皮蛋早放煮进粥里提味，一半出锅前放保留口感。', timer: { label: '煮皮蛋', seconds: 600 } },
        { text: '下肉片划散，变色后加剩下的皮蛋、盐、白胡椒。', timer: { label: '煮肉片', seconds: 120 } },
        { text: '关火淋香油撒葱花。' }
      ],
      variations: [
        { title: '海鲜版', diff: '肉片换成虾仁和干贝，鲜味更清爽。' },
        { title: '瘦肉丝版', diff: '肉切丝先焯水再下粥，口感更扎实。' },
        { title: '山药版', diff: '加山药块一起煮，更养胃也更稠。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/皮蛋瘦肉粥做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=皮蛋瘦肉粥' }
    },

    {
      id: 'zhajiang-noodle',
      name: '炸酱面',
      tagline: '酱要小火慢炸，炸到油酱分离才香',
      art: 'pot',
      prep: 15, cook: 25, difficulty: 2, servings: 2,
      flavors: ['家常', '下饭', '主食', '浓香'],
      ingredients: [
        { name: '面条', amount: '300g', cat: '其他', note: '手擀面最好，挂酱' },
        { name: '五花肉丁', amount: '200g', cat: '肉蛋', note: '肥瘦分开切，先煸肥的' },
        { name: '黄瓜', amount: '1 根', cat: '蔬菜' },
        { name: '豆芽', amount: '1 把', cat: '蔬菜' },
        { name: '大葱', amount: '半根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '干黄酱', amount: '3 汤匙', role: '主味，咸香醇厚' },
        { name: '甜面酱', amount: '2 汤匙', role: '回甜，中和黄酱的咸' },
        { name: '料酒', amount: '1 汤匙', role: '去腥' },
        { name: '白糖', amount: '1 小勺', role: '提鲜，炸酱需要一点甜' },
        { name: '八角', amount: '1 颗', role: '炸酱的香气底子' }
      ],
      steps: [
        { text: '干黄酱和甜面酱加温水调开成稀糊，避免下锅结块。', tip: '澥酱这一步别省，直接下干酱会炒不开。' },
        { text: '锅里不放油，先下肥肉丁小火煸出油，再下瘦肉丁炒变色。', timer: { label: '煸肉丁', seconds: 300 } },
        { text: '下葱花和八角炒香，倒入调好的酱。' },
        { text: '转小火慢炸，不停搅动防止糊底。', tip: '炸到酱色变深、油浮上来、能挂在铲子上就好了。全程小火，糊了就发苦。', timer: { label: '炸酱', seconds: 900 } },
        { text: '面条煮熟过凉水，豆芽焯水。' },
        { text: '面上浇酱，摆菜码，拌开吃。' }
      ],
      variations: [
        { title: '鸡蛋炸酱版', diff: '肉丁换成炒碎的鸡蛋，更家常。' },
        { title: '茄子炸酱版', diff: '加茄子丁一起炸，素香浓。' },
        { title: '少油版', diff: '用鸡胸肉丁少油炒，热量低不少。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/炸酱面做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=炸酱面' }
    },

    {
      id: 'claypot-sausage-rice',
      name: '腊肠煲仔饭',
      tagline: '锅巴是灵魂，听到滋滋声就该关火了',
      art: 'pot',
      prep: 10, cook: 30, difficulty: 2, servings: 2,
      flavors: ['主食', '硬菜', '家常', '浓香'],
      ingredients: [
        { name: '大米', amount: '1.5 杯', cat: '其他', note: '丝苗米或泰国香米，粒粒分明' },
        { name: '腊肠', amount: '2 根', cat: '肉蛋', note: '斜切片，薄一点才出油' },
        { name: '青菜', amount: '2 棵', cat: '蔬菜' },
        { name: '鸡蛋', amount: '2 个', cat: '肉蛋' },
        { name: '姜', amount: '2 片', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '生抽', amount: '2 汤匙', role: '浇汁主味' },
        { name: '蚝油', amount: '1 汤匙', role: '增鲜' },
        { name: '白糖', amount: '半小勺', role: '提鲜' },
        { name: '香油', amount: '几滴', role: '增香' },
        { name: '食用油', amount: '1 汤匙', role: '沿锅边淋，锅巴靠它' }
      ],
      steps: [
        { text: '米洗净加水（比平时煮饭少一点），泡半小时后大火煮开转小火。', timer: { label: '泡米', seconds: 1800 } },
        { text: '水基本收干时铺上腊肠片和姜丝，沿锅边淋一圈油。', tip: '沿锅边淋油是锅巴金黄酥脆的关键。', timer: { label: '煮饭', seconds: 900 } },
        { text: '听到锅里滋滋响、闻到微焦香时打个蛋进去，关火加盖焖。', tip: '滋滋声就是锅巴在形成。闻到糊味就晚了，宁可早一点。', timer: { label: '焖锅巴', seconds: 300 } },
        { text: '青菜焯水摆在饭上，生抽、蚝油、糖、香油调成汁浇上去。' },
        { text: '拌开吃，底部的锅巴用勺子撬起来。' }
      ],
      variations: [
        { title: '腊味双拼版', diff: '腊肠配腊肉或腊鸭，风味更复合。' },
        { title: '香菇滑鸡版', diff: '腊肠换成腌好的鸡腿块，更清爽。' },
        { title: '素版', diff: '用香菇、豆干、青菜做素煲仔饭。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/腊肠煲仔饭做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=煲仔饭' }
    },

    {
      id: 'tomato-beef-brisket',
      name: '番茄牛腩',
      tagline: '炖到筷子一夹就散，汤汁拌饭能吃三碗',
      art: 'braised-pork',
      prep: 15, cook: 90, difficulty: 3, servings: 3,
      flavors: ['硬菜', '宴客', '下饭', '酸甜'],
      ingredients: [
        { name: '牛腩', amount: '600g', cat: '肉蛋', note: '带点筋的牛腩炖完最好吃' },
        { name: '番茄', amount: '4 个', cat: '蔬菜', note: '熟透的，两个切丁煮化，两个切块后放' },
        { name: '洋葱', amount: '半个', cat: '蔬菜' },
        { name: '姜', amount: '4 片', cat: '蔬菜' },
        { name: '胡萝卜', amount: '1 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '生抽', amount: '3 汤匙', role: '咸鲜主味' },
        { name: '料酒', amount: '2 汤匙', role: '焯水去腥' },
        { name: '番茄酱', amount: '2 汤匙', role: '补酸和颜色，番茄不够酸时加它' },
        { name: '冰糖', amount: '1 小勺', role: '提鲜回甜' },
        { name: '八角', amount: '1 颗', role: '炖肉香气' },
        { name: '盐', amount: '适量', role: '最后尝过再加' }
      ],
      steps: [
        { text: '牛腩切块冷水下锅，加姜片和料酒煮开，撇净浮沫捞出温水冲洗。', tip: '一定要冷水下锅，血水才出得来；捞出来用温水冲，冷水会让肉紧缩。', timer: { label: '焯水', seconds: 420 } },
        { text: '锅里下油炒洋葱丁，再下两个番茄丁炒成糊状。', timer: { label: '炒番茄', seconds: 300 } },
        { text: '牛腩回锅翻炒，加生抽、番茄酱、冰糖、八角炒匀。' },
        { text: '加没过牛肉的开水，煮开转小火加盖炖。', tip: '中途别加冷水，一加肉就紧。', timer: { label: '炖牛腩', seconds: 3600 } },
        { text: '牛肉能用筷子插透时，加剩下的番茄块和胡萝卜块。', timer: { label: '炖配菜', seconds: 1200 } },
        { text: '尝咸淡加盐，大火略收汁，撒香菜出锅。', timer: { label: '收汁', seconds: 300 } }
      ],
      variations: [
        { title: '番茄牛腩面', diff: '多留些汤，煮面浇上去，一菜两吃。' },
        { title: '土豆版', diff: '胡萝卜换土豆，炖到化在汤里更浓。' },
        { title: '高压锅版', diff: '上汽后压 25 分钟，总时长砍掉一半。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/番茄牛腩做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=番茄牛腩' }
    },

    {
      id: 'braised-prawn',
      name: '油焖大虾',
      tagline: '虾头里的红油是这道菜的灵魂',
      art: 'seabass',
      prep: 10, cook: 12, difficulty: 2, servings: 2,
      flavors: ['海鲜', '下饭', '硬菜', '宴客'],
      ingredients: [
        { name: '大虾', amount: '500g', cat: '水产', note: '个头大一点的基围虾或明虾' },
        { name: '姜', amount: '3 片', cat: '蔬菜' },
        { name: '蒜', amount: '3 瓣', cat: '蔬菜' },
        { name: '小葱', amount: '2 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '生抽', amount: '2 汤匙', role: '咸鲜主味' },
        { name: '料酒', amount: '2 汤匙', role: '去腥' },
        { name: '白糖', amount: '1 汤匙', role: '提鲜，油焖口要一点甜' },
        { name: '香醋', amount: '半汤匙', role: '沿锅边淋，解腻提香' },
        { name: '番茄酱', amount: '1 汤匙', role: '让红油更亮' }
      ],
      steps: [
        { text: '虾剪去须脚，开背去虾线，沥干。', tip: '开背不只是去线，更重要的是让虾入味。' },
        { text: '锅里油稍多，下虾中火煎到两面通红，用锅铲压一压虾头逼出红油。', tip: '压虾头这步是颜色鲜亮的秘诀。', timer: { label: '煎虾', seconds: 240 } },
        { text: '下姜蒜片炒香，淋料酒炝锅。', timer: { label: '爆香', seconds: 45 } },
        { text: '加生抽、糖、番茄酱和少许水，加盖焖。', timer: { label: '焖虾', seconds: 300 } },
        { text: '开盖大火收汁到浓稠挂在虾上，沿锅边淋醋，撒葱段出锅。', timer: { label: '收汁', seconds: 120 } }
      ],
      variations: [
        { title: '蒜蓉版', diff: '蒜末加倍，出锅前再撒生蒜末，蒜香冲。' },
        { title: '麻辣版', diff: '加干辣椒和花椒一起爆，做成麻辣虾。' },
        { title: '少糖版', diff: '糖减到半勺，咸鲜为主。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/油焖大虾做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=油焖大虾' }
    },

    {
      id: 'home-tofu',
      name: '家常豆腐',
      tagline: '先煎后烧，外皮起泡才吸得住汁',
      art: 'veg',
      prep: 10, cook: 15, difficulty: 1, servings: 2,
      flavors: ['家常', '下饭', '素菜', '新手友好'],
      ingredients: [
        { name: '北豆腐', amount: '1 块（约 400g）', cat: '其他', note: '老豆腐才煎得住，嫩豆腐会碎' },
        { name: '青椒', amount: '1 个', cat: '蔬菜' },
        { name: '胡萝卜', amount: '半根', cat: '蔬菜' },
        { name: '蒜', amount: '3 瓣', cat: '蔬菜' },
        { name: '木耳', amount: '1 小把', cat: '蔬菜', note: '提前泡发' }
      ],
      seasonings: [
        { name: '生抽', amount: '2 汤匙', role: '咸鲜主味' },
        { name: '蚝油', amount: '1 汤匙', role: '提鲜增稠' },
        { name: '白糖', amount: '半小勺', role: '提鲜' },
        { name: '淀粉', amount: '1 小勺', role: '最后勾芡，让汁挂住' },
        { name: '盐', amount: '适量', role: '最后尝过再加' }
      ],
      steps: [
        { text: '豆腐切三角厚片，用厨房纸吸干表面水分。', tip: '湿豆腐下锅会粘会碎，吸干是第一步。' },
        { text: '平底锅热油，豆腐片煎到两面金黄起泡。', tip: '别急着翻，等一面定型再翻。', timer: { label: '煎豆腐', seconds: 360 } },
        { text: '下蒜片、青椒块、胡萝卜片、木耳炒香。', timer: { label: '炒配菜', seconds: 120 } },
        { text: '加生抽、蚝油、糖和小半碗水，豆腐回锅焖一会儿。', timer: { label: '焖煮', seconds: 300 } },
        { text: '水淀粉勾薄芡，收汁到挂在豆腐上出锅。', timer: { label: '收汁', seconds: 90 } }
      ],
      variations: [
        { title: '麻婆风', diff: '加豆瓣酱和花椒粉，往麻婆豆腐靠。' },
        { title: '肉末版', diff: '先炒香肉末再下豆腐，更实在。' },
        { title: '红烧版', diff: '加老抽上色，颜色更深更浓。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/家常豆腐做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=家常豆腐' }
    },

    {
      id: 'boiled-beef',
      name: '水煮牛肉',
      tagline: '牛肉滑嫩靠上浆，最后泼油那一下才叫水煮',
      art: 'braised-pork',
      prep: 20, cook: 15, difficulty: 3, servings: 3,
      flavors: ['重口', '硬菜', '宴客', '辣'],
      ingredients: [
        { name: '牛里脊', amount: '400g', cat: '肉蛋', note: '逆着纹理切片，切断纤维才嫩' },
        { name: '豆芽', amount: '200g', cat: '蔬菜' },
        { name: '青菜', amount: '200g', cat: '蔬菜' },
        { name: '蒜', amount: '5 瓣', cat: '蔬菜' },
        { name: '干辣椒', amount: '8 个', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '豆瓣酱', amount: '2 汤匙', role: '红油和底味，一定要炒透' },
        { name: '淀粉', amount: '1.5 汤匙', role: '上浆，牛肉嫩滑的关键' },
        { name: '料酒', amount: '1 汤匙', role: '腌牛肉去腥' },
        { name: '生抽', amount: '2 汤匙', role: '咸鲜' },
        { name: '花椒粉', amount: '1 小勺', role: '麻味来源，最后放，久煮会苦' },
        { name: '辣椒面', amount: '1 小勺', role: '补辣度和颜色' },
        { name: '食用油', amount: '4 汤匙', role: '最后泼热油，激出香料的香气' }
      ],
      steps: [
        { text: '牛肉逆纹切薄片，加料酒、生抽、淀粉和一点水抓匀上浆，最后封一层油。', tip: '水要分两三次加，每次都抓到吸收。抓好的肉片看着是亮的。', timer: { label: '上浆', seconds: 900 } },
        { text: '豆芽和青菜焯熟，铺在大碗底部。', timer: { label: '焯菜', seconds: 180 } },
        { text: '锅里油炒豆瓣酱到出红油，加蒜末和一半干辣椒炒香。', timer: { label: '炒底料', seconds: 180 } },
        { text: '加一碗水煮开调味，牛肉片一片片下锅，变色即关火。', tip: '牛肉别煮久，变色再多十秒就够了，久就柴。', timer: { label: '汆牛肉', seconds: 120 } },
        { text: '连汤倒进铺菜的碗里，上面撒干辣椒段、花椒粉、辣椒面、蒜末。' },
        { text: '烧一勺热油到冒烟，泼在上面。', tip: '听到「刺啦」一声、香料瞬间炸开，这道菜就成了。' }
      ],
      variations: [
        { title: '水煮鱼版', diff: '牛肉换成鱼片，汆的时间更短。' },
        { title: '微辣版', diff: '豆瓣酱减半、干辣椒减到三个，孩子也能吃。' },
        { title: '番茄版', diff: '红油换成番茄汤底，酸辣开胃。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/水煮牛肉做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=水煮牛肉' }
    },

    {
      id: 'corn-rib-soup',
      name: '玉米排骨汤',
      tagline: '清甜不油，焯水那步决定汤清不清',
      art: 'rib-soup',
      prep: 10, cook: 60, difficulty: 1, servings: 3,
      flavors: ['清淡', '新手友好', '家常', '养胃'],
      ingredients: [
        { name: '排骨', amount: '500g', cat: '肉蛋', note: '肋排或汤骨都行' },
        { name: '甜玉米', amount: '2 根', cat: '蔬菜', note: '水果玉米更甜' },
        { name: '胡萝卜', amount: '1 根', cat: '蔬菜' },
        { name: '姜', amount: '3 片', cat: '蔬菜' },
        { name: '小葱', amount: '2 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '料酒', amount: '1 汤匙', role: '焯水去腥' },
        { name: '盐', amount: '适量', role: '出锅前十分钟再放，放早了肉发紧' },
        { name: '白胡椒粉', amount: '少许', role: '提香暖胃' }
      ],
      steps: [
        { text: '排骨冷水下锅，加姜片料酒煮开，撇净浮沫后捞出温水冲净。', tip: '浮沫撇干净汤才清。这步是清汤和浑汤的分界。', timer: { label: '焯水', seconds: 420 } },
        { text: '玉米切段，胡萝卜切滚刀块。' },
        { text: '排骨和姜片入锅，加足量冷水，大火煮开转小火。', timer: { label: '炖汤', seconds: 2400 } },
        { text: '下玉米和胡萝卜继续炖。', timer: { label: '炖配菜', seconds: 1200 } },
        { text: '出锅前十分钟加盐，关火撒葱花和白胡椒粉。' }
      ],
      variations: [
        { title: '山药版', diff: '加一段山药，汤更稠更养胃。' },
        { title: '冬瓜版', diff: '玉米换冬瓜，清爽解腻，夏天合适。' },
        { title: '莲藕版', diff: '加莲藕块，汤带一点回甜。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/玉米排骨汤做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=玉米排骨汤' }
    },

    {
      id: 'wood-ear-salad',
      name: '凉拌木耳',
      tagline: '脆不脆看焯水时间，超过一分钟就软了',
      art: 'veg',
      prep: 10, cook: 5, difficulty: 1, servings: 2,
      flavors: ['快手', '清淡', '素菜', '解腻'],
      ingredients: [
        { name: '干木耳', amount: '1 小把（约 20g）', cat: '蔬菜', note: '冷水泡发两小时，别用热水' },
        { name: '小米辣', amount: '2 个', cat: '蔬菜' },
        { name: '蒜', amount: '3 瓣', cat: '蔬菜' },
        { name: '香菜', amount: '2 棵', cat: '蔬菜' },
        { name: '小葱', amount: '1 根', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '生抽', amount: '2 汤匙', role: '咸鲜主味' },
        { name: '香醋', amount: '1.5 汤匙', role: '酸爽开胃' },
        { name: '白糖', amount: '半小勺', role: '压醋的尖锐' },
        { name: '香油', amount: '1 小勺', role: '增香' },
        { name: '花椒油', amount: '几滴', role: '麻香，点睛之笔' }
      ],
      steps: [
        { text: '干木耳冷水泡发，摘掉根部硬蒂，撕成小朵。', tip: '泡发时间别超四小时，泡太久容易变质。', timer: { label: '泡发', seconds: 3600 } },
        { text: '水开下木耳焯水，捞出立刻过冰水。', tip: '焯水别超过一分钟，过冰水能锁住脆感。', timer: { label: '焯水', seconds: 60 } },
        { text: '蒜切末、小米辣切圈，和所有调料调成一碗汁。' },
        { text: '木耳沥干，浇上汁拌匀，撒香菜葱花。', tip: '木耳一定要沥干，带水会冲淡味道。' }
      ],
      variations: [
        { title: '洋葱版', diff: '加半个洋葱丝，脆上加脆，也很解腻。' },
        { title: '麻辣版', diff: '花椒油加倍，多放小米辣。' },
        { title: '酸甜版', diff: '多加糖和醋，做成开胃酸甜口。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/凉拌木耳做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=凉拌木耳' }
    },

    {
      id: 'oyster-lettuce',
      name: '蚝油生菜',
      tagline: '两分钟出锅，焯水时间决定脆不脆',
      art: 'veg',
      prep: 3, cook: 5, difficulty: 1, servings: 2,
      flavors: ['快手', '清淡', '新手友好', '素菜'],
      ingredients: [
        { name: '生菜', amount: '2 棵', cat: '蔬菜', note: '球生菜更脆，叶生菜更嫩' },
        { name: '蒜', amount: '3 瓣', cat: '蔬菜' }
      ],
      seasonings: [
        { name: '蚝油', amount: '1.5 汤匙', role: '这道菜的主味，鲜和稠都靠它' },
        { name: '生抽', amount: '半汤匙', role: '补一点鲜' },
        { name: '白糖', amount: '半小勺', role: '提鲜，蚝油需要一点糖才亮' },
        { name: '淀粉', amount: '半小勺', role: '勾薄芡让汁挂住' },
        { name: '食用油', amount: '1 汤匙', role: '焯水时加几滴能保持翠绿' }
      ],
      steps: [
        { text: '水里加几滴油和少许盐烧开，生菜下锅烫软立刻捞出。', tip: '二十到三十秒就够，久一点就发黄发软。', timer: { label: '焯生菜', seconds: 30 } },
        { text: '生菜沥水摆盘。' },
        { text: '小锅下油爆香蒜末，加蚝油、生抽、糖和两勺水煮开。', timer: { label: '调汁', seconds: 90 } },
        { text: '水淀粉勾薄芡，浇在生菜上。', tip: '汁要趁热浇，凉了会凝。' }
      ],
      variations: [
        { title: '蒜蓉版', diff: '蒜末加到一整头，蒜香压过蚝油。' },
        { title: '白灼版', diff: '只淋蒸鱼豉油加热油，更清爽。' },
        { title: '腐乳版', diff: '加半块腐乳压碎进汁里，风味更特别。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/蚝油生菜做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=蚝油生菜' }
    },

    {
      id: 'candied-sweet-potato',
      name: '拔丝地瓜',
      tagline: '糖色炒到琥珀色就离火，早一秒不拉丝晚一秒发苦',
      art: 'pot',
      prep: 10, cook: 15, difficulty: 3, servings: 3,
      flavors: ['甜品', '宴客', '硬菜', '小吃'],
      ingredients: [
        { name: '地瓜', amount: '2 个（约 500g）', cat: '蔬菜', note: '黄心地瓜更甜更面' },
        { name: '白糖', amount: '100g', cat: '其他', note: '拔丝必须用白糖，冰糖不好操作' }
      ],
      seasonings: [
        { name: '食用油', amount: '适量', role: '炸地瓜用' },
        { name: '白芝麻', amount: '1 小撮', role: '增香点缀' }
      ],
      steps: [
        { text: '地瓜去皮切滚刀块，沥干表面淀粉。', tip: '切完用水冲一下表面淀粉再擦干，炸的时候不容易粘。' },
        { text: '油烧到六成热，地瓜下锅炸到表面金黄、筷子能穿透。', timer: { label: '炸地瓜', seconds: 300 } },
        { text: '升高油温复炸一次，外壳更硬。', tip: '复炸能撑住糖浆不回软。', timer: { label: '复炸', seconds: 60 } },
        { text: '另起锅小火化糖，糖化成琥珀色立刻关火。', tip: '全程小火不停搅。颜色到浅琥珀就离火，深了会苦。', timer: { label: '炒糖', seconds: 240 } },
        { text: '倒入地瓜快速翻匀，让每块都裹上糖，撒芝麻立刻上桌。', tip: '盘底抹一层油防粘。趁热吃才拉得出丝。', timer: { label: '裹糖', seconds: 30 } }
      ],
      variations: [
        { title: '拔丝苹果版', diff: '地瓜换苹果块，裹一层薄淀粉再炸。' },
        { title: '拔丝香蕉版', diff: '香蕉切段裹淀粉炸，更软糯。' },
        { title: '少糖版', diff: '糖减到 60g，丝少一些但没那么甜。' }
      ],
      links: { douyin: 'https://www.douyin.com/search/拔丝地瓜做法', xhs: 'https://www.xiaohongshu.com/search_result?keyword=拔丝地瓜' }
    }
  ]);

  window.__EXTRA_RECIPES = B;

  /* 著录信息：与 recipes-ext.js 合并，不覆盖 */
  var XM = window.__EXTRA_META || {};
  var M = {
    'pepper-pork': {
      no: 'No.21', latin: 'Porcellus cum capsico', family: '畜肉科',
      season: '四季', origin: '家常',
      flavor: { '咸': 3, '甜': 0, '酸': 0, '鲜': 3, '辣': 1, '油': 2 },
      annot: [
        { x: 32, y: 48, tx: 44, ty: 62, t: '肉丝' },
        { x: 68, y: 44, tx: 56, ty: 58, t: '青椒' }
      ]
    },
    'garlic-vermicelli-cabbage': {
      no: 'No.22', latin: 'Brassica cum allio et vermicellis', family: '十字花科',
      season: '秋冬', origin: '粤式',
      flavor: { '咸': 2, '甜': 0, '酸': 0, '鲜': 4, '辣': 1, '油': 2 },
      annot: [
        { x: 36, y: 46, tx: 46, ty: 62, t: '娃娃菜' },
        { x: 66, y: 58, tx: 54, ty: 66, t: '粉丝' }
      ]
    },
    'tomato-egg-soup': {
      no: 'No.23', latin: 'Ius lycopersici cum ovis', family: '汤羹科',
      season: '四季', origin: '家常',
      flavor: { '咸': 2, '甜': 1, '酸': 2, '鲜': 4, '辣': 0, '油': 1 },
      annot: [
        { x: 34, y: 44, tx: 44, ty: 60, t: '番茄' },
        { x: 68, y: 52, tx: 56, ty: 62, t: '蛋花' }
      ]
    },
    'sweet-sour-tenderloin': {
      no: 'No.24', latin: 'Lumbus frictus dulcacidus', family: '畜肉科',
      season: '四季', origin: '鲁菜',
      flavor: { '咸': 2, '甜': 4, '酸': 4, '鲜': 2, '辣': 0, '油': 3 },
      annot: [
        { x: 36, y: 50, tx: 46, ty: 64, t: '肉条' },
        { x: 68, y: 42, tx: 56, ty: 56, t: '脆壳' }
      ]
    },
    'three-cup-chicken': {
      no: 'No.25', latin: 'Pullus trium poculorum', family: '禽肉科',
      season: '四季', origin: '赣菜 · 台式',
      flavor: { '咸': 3, '甜': 1, '酸': 0, '鲜': 4, '辣': 1, '油': 3 },
      annot: [
        { x: 34, y: 48, tx: 44, ty: 62, t: '鸡块' },
        { x: 68, y: 40, tx: 56, ty: 54, t: '九层塔' }
      ]
    },
    'steamed-ribs-rice': {
      no: 'No.26', latin: 'Costae cum oryza vapore', family: '畜肉科',
      season: '秋冬', origin: '川湘',
      flavor: { '咸': 3, '甜': 1, '酸': 0, '鲜': 3, '辣': 1, '油': 3 },
      annot: [
        { x: 34, y: 44, tx: 44, ty: 60, t: '排骨' },
        { x: 68, y: 58, tx: 56, ty: 66, t: '红薯' }
      ]
    },
    'braised-crucian': {
      no: 'No.27', latin: 'Cyprinus iure rubro', family: '水产科',
      season: '四季', origin: '家常',
      flavor: { '咸': 3, '甜': 1, '酸': 0, '鲜': 4, '辣': 0, '油': 3 },
      annot: [
        { x: 30, y: 50, tx: 42, ty: 64, t: '鲫鱼' },
        { x: 70, y: 40, tx: 58, ty: 54, t: '葱姜' }
      ]
    },
    'mala-xiangguo': {
      no: 'No.28', latin: 'Olla mixta piperata', family: '杂烩科',
      season: '四季', origin: '川渝',
      flavor: { '咸': 4, '甜': 0, '酸': 0, '鲜': 3, '辣': 4, '油': 4 },
      annot: [
        { x: 34, y: 46, tx: 44, ty: 62, t: '虾' },
        { x: 68, y: 50, tx: 56, ty: 62, t: '藕片' }
      ]
    },
    'dry-fried-beans': {
      no: 'No.29', latin: 'Phaseoli sicci fricti', family: '豆科',
      season: '夏秋', origin: '川菜',
      flavor: { '咸': 3, '甜': 0, '酸': 0, '鲜': 3, '辣': 2, '油': 3 },
      annot: [
        { x: 36, y: 48, tx: 46, ty: 62, t: '四季豆' },
        { x: 68, y: 58, tx: 56, ty: 66, t: '肉末' }
      ]
    },
    'congee-pork': {
      no: 'No.30', latin: 'Congee cum ovo centenario', family: '汤羹科',
      season: '四季', origin: '粤式',
      flavor: { '咸': 2, '甜': 0, '酸': 0, '鲜': 4, '辣': 0, '油': 1 },
      annot: [
        { x: 34, y: 50, tx: 44, ty: 64, t: '米粒' },
        { x: 68, y: 44, tx: 56, ty: 58, t: '皮蛋' }
      ]
    },
    'zhajiang-noodle': {
      no: 'No.31', latin: 'Noodles cum iure fabae', family: '主食科',
      season: '四季', origin: '京式',
      flavor: { '咸': 4, '甜': 1, '酸': 0, '鲜': 3, '辣': 0, '油': 3 },
      annot: [
        { x: 34, y: 44, tx: 44, ty: 60, t: '面条' },
        { x: 68, y: 54, tx: 56, ty: 64, t: '炸酱' }
      ]
    },
    'claypot-sausage-rice': {
      no: 'No.32', latin: 'Oryza cum farcimine in olla', family: '主食科',
      season: '秋冬', origin: '粤式',
      flavor: { '咸': 3, '甜': 1, '酸': 0, '鲜': 4, '辣': 0, '油': 3 },
      annot: [
        { x: 34, y: 46, tx: 44, ty: 62, t: '腊肠' },
        { x: 68, y: 58, tx: 56, ty: 66, t: '锅巴' }
      ]
    },
    'tomato-beef-brisket': {
      no: 'No.33', latin: 'Bubula cum lycopersicis', family: '畜肉科',
      season: '四季', origin: '家常',
      flavor: { '咸': 3, '甜': 1, '酸': 3, '鲜': 4, '辣': 0, '油': 3 },
      annot: [
        { x: 32, y: 48, tx: 42, ty: 62, t: '牛腩' },
        { x: 68, y: 44, tx: 56, ty: 58, t: '番茄' }
      ]
    },
    'braised-prawn': {
      no: 'No.34', latin: 'Squilla iure oleoso', family: '水产科',
      season: '四季', origin: '鲁菜',
      flavor: { '咸': 3, '甜': 2, '酸': 1, '鲜': 4, '辣': 0, '油': 3 },
      annot: [
        { x: 34, y: 48, tx: 44, ty: 62, t: '大虾' },
        { x: 68, y: 40, tx: 56, ty: 54, t: '红油' }
      ]
    },
    'home-tofu': {
      no: 'No.35', latin: 'Caseus soiae domesticus', family: '豆科',
      season: '四季', origin: '家常',
      flavor: { '咸': 3, '甜': 0, '酸': 0, '鲜': 3, '辣': 0, '油': 2 },
      annot: [
        { x: 34, y: 50, tx: 44, ty: 64, t: '豆腐' },
        { x: 68, y: 44, tx: 56, ty: 58, t: '木耳' }
      ]
    },
    'boiled-beef': {
      no: 'No.36', latin: 'Bubula in iure ferventi', family: '畜肉科',
      season: '四季', origin: '川菜',
      flavor: { '咸': 4, '甜': 0, '酸': 0, '鲜': 3, '辣': 4, '油': 4 },
      annot: [
        { x: 34, y: 46, tx: 44, ty: 62, t: '牛肉片' },
        { x: 68, y: 40, tx: 56, ty: 54, t: '红油' }
      ]
    },
    'corn-rib-soup': {
      no: 'No.37', latin: 'Ius costarum cum maizio', family: '汤羹科',
      season: '夏秋', origin: '家常',
      flavor: { '咸': 2, '甜': 2, '酸': 0, '鲜': 4, '辣': 0, '油': 1 },
      annot: [
        { x: 32, y: 48, tx: 42, ty: 62, t: '排骨' },
        { x: 68, y: 44, tx: 56, ty: 58, t: '玉米' }
      ]
    },
    'wood-ear-salad': {
      no: 'No.38', latin: 'Auricularia acetaria', family: '菌类科',
      season: '四季', origin: '家常',
      flavor: { '咸': 3, '甜': 1, '酸': 3, '鲜': 2, '辣': 2, '油': 1 },
      annot: [
        { x: 36, y: 48, tx: 46, ty: 62, t: '木耳' },
        { x: 68, y: 40, tx: 56, ty: 54, t: '小米辣' }
      ]
    },
    'oyster-lettuce': {
      no: 'No.39', latin: 'Lactuca cum iure ostrearum', family: '叶菜科',
      season: '四季', origin: '粤式',
      flavor: { '咸': 3, '甜': 1, '酸': 0, '鲜': 4, '辣': 0, '油': 1 },
      annot: [
        { x: 36, y: 48, tx: 46, ty: 62, t: '生菜' },
        { x: 68, y: 56, tx: 56, ty: 64, t: '蒜末' }
      ]
    },
    'candied-sweet-potato': {
      no: 'No.40', latin: 'Ipomoea saccharo filata', family: '根茎科',
      season: '秋冬', origin: '鲁菜',
      flavor: { '咸': 0, '甜': 4, '酸': 0, '鲜': 0, '辣': 0, '油': 3 },
      annot: [
        { x: 36, y: 50, tx: 46, ty: 64, t: '地瓜' },
        { x: 68, y: 42, tx: 56, ty: 56, t: '糖丝' }
      ]
    }
  };
  Object.keys(M).forEach(function (k) { XM[k] = M[k]; });
  window.__EXTRA_META = XM;
})();
