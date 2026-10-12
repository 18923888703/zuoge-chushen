/* 菜品照片映射：按主食材/做法分组，100 道菜共用 16 张实拍图
   （原型用；接真实菜谱库时把 photo 换成每道菜自己的图即可） */
(function () {
  var MAP = {
    /* 蛋 */
    'steamed-egg': 'egg', 'chive-egg': 'egg', 'onion-egg': 'egg',
    'bitter-melon-egg': 'egg', 'clam-steamed-egg': 'egg',
    /* 番茄 */
    'tomato-egg': 'tomato', 'tomato-egg-soup': 'tomato',
    /* 猪肉 */
    'braised-pork': 'pork', 'sweet-sour-ribs': 'pork', 'pepper-pork': 'pork',
    'sweet-sour-tenderloin': 'pork', 'steamed-ribs-rice': 'pork', 'twice-cooked-pork': 'pork',
    'meicai-pork': 'pork', 'jingjiang-pork': 'pork', 'muxu-pork': 'pork',
    'garlic-sprout-pork': 'pork', 'yuxiang-pork': 'pork', 'pickled-pork-belly': 'pork',
    'ants-climbing-tree': 'pork',
    /* 牛肉 */
    'beef-broccoli': 'beef', 'boiled-beef': 'beef', 'tomato-beef-brisket': 'beef',
    'potato-beef-stew': 'beef', 'radish-beef-stew': 'beef', 'braised-beef-shank': 'beef',
    'westlake-beef-soup': 'beef',
    /* 羊肉 */
    'scallion-lamb': 'lamb', 'cumin-lamb': 'lamb', 'braised-lamb': 'lamb',
    /* 鸡鸭 */
    'kungpao-chicken': 'chicken', 'mushroom-chicken': 'chicken', 'three-cup-chicken': 'chicken',
    'curry-chicken': 'chicken', 'beer-duck': 'chicken', 'salt-baked-chicken': 'chicken',
    'white-cut-chicken': 'chicken', 'chicken-mushroom-stew': 'chicken',
    'mouthwatering-chicken': 'chicken', 'yellow-braised-chicken': 'chicken', 'cola-wings': 'chicken',
    /* 鱼 */
    'braised-crucian': 'fish', 'pickled-fish': 'fish', 'boiled-fish': 'fish',
    'tomato-fish': 'fish', 'pan-fried-hairtail': 'fish', 'seabass': 'fish',
    /* 虾蟹贝 */
    'garlic-shrimp': 'seafood', 'braised-prawn': 'seafood', 'salt-pepper-shrimp': 'seafood',
    'garlic-scallop': 'seafood', 'garlic-oyster': 'seafood', 'spicy-clams': 'seafood',
    'spicy-crab': 'seafood',
    /* 豆腐 */
    'mapo-tofu': 'tofu', 'home-tofu': 'tofu', 'sizzling-tofu': 'tofu', 'mushroom-tofu-mince': 'tofu',
    /* 青菜 */
    'stirfry-cabbage': 'greens', 'garlic-broccoli': 'greens', 'oyster-lettuce': 'greens',
    'blanched-choy-sum': 'greens', 'mushroom-bokchoy': 'greens', 'vinegar-cabbage': 'greens',
    'stirfry-greens': 'greens', 'supreme-soup-cabbage': 'greens', 'garlic-vermicelli-cabbage': 'greens',
    'blanched-okra': 'greens', 'dry-pot-cauliflower': 'greens', 'cabbage-vermicelli': 'greens',
    'pine-nut-corn': 'greens',
    /* 根茎茄果 */
    'spicy-potato': 'potato', 'candied-sweet-potato': 'potato', 'sweet-sour-lotus': 'potato',
    'salted-egg-pumpkin': 'potato', 'di-san-xian': 'potato',
    'braised-eggplant': 'eggplant', 'eggplant-beans': 'eggplant',
    'dry-fried-beans': 'potato',
    /* 菌菇 */
    'shredded-king-oyster': 'mushroom', 'mala-xiangguo': 'mushroom',
    /* 汤羹粥 */
    'seaweed-soup': 'soup', 'corn-rib-soup': 'soup', 'rib-soup': 'soup', 'hot-sour-soup': 'soup',
    'lotus-rib-soup': 'soup', 'egg-dumpling-soup': 'soup', 'pumpkin-millet-congee': 'soup',
    /* 面饼 */
    'scallion-noodle': 'noodle', 'zhajiang-noodle': 'noodle', 'dandan-noodle': 'noodle',
    'plain-noodle-soup': 'noodle', 'fried-noodles': 'noodle', 'scallion-pancake': 'noodle',
    /* 米饭 */
    'fried-rice': 'rice', 'claypot-sausage-rice': 'rice', 'congee-pork': 'rice',
    /* 凉拌小菜 */
    'cucumber-salad': 'cold', 'wood-ear-salad': 'cold', 'spinach-salad': 'cold'
  };

  var BASE = 'assets/dishes/';

  window.DishPhoto = {
    /* 取图片地址；没有映射时按口味兜底 */
    src: function (r) {
      var key = (r && (r.photo || MAP[r.id])) || 'greens';
      return BASE + key + '.jpg';
    },
    /* 图片标签：厨房质感——实拍 + 底部压暗衬托文字 */
    html: function (r, cls) {
      return '<img class="dish-photo ' + (cls || '') + '" src="' + this.src(r) +
        '" alt="' + window.D.esc(r.name) + '" loading="lazy">';
    },
    /* 编号说法：No.01 → 第 01 道 */
    no: function (r) {
      var n = String((r && r.no) || '').replace(/^No\.?/, '').trim();
      return n ? ('第 ' + n + ' 道') : '';
    }
  };
})();
