/* 品牌 LOGO：渐变徽标 + 中英文字标
   用法：window.Brand.logo('light')  // light=压在深色照片上用白字；default=页面底色用墨字
   修改 App 名字只改这里 */
(function () {
  /* 徽标内的线稿：厨师帽 + 锅 */
  var MARK = '<path d="M6.5 12.5c-1.6-1.4-1.4-4 .3-5.3C7 6 7.2 4.5 7.2 4.5s1.6.6 2 2.2c1-.6 2.3-.8 3.3-.4 1.9.7 2.7 2.9 2 4.8"/>' +
    '<path d="M6.2 12.6h11.6v3.2H6.2z"/>' +
    '<path d="M7 19.5c0-2.4 2.2-3.7 5-3.7s5 1.3 5 3.7"/>';

  var NAME_CN = '我是厨神';
  var NAME_EN = 'I AM THE CHEF';

  window.Brand = {
    name: NAME_CN,

    /* 只返回徽标（方形图标场景） */
    mark: function (size) {
      var s = size || 34;
      return '<span class="brand-mark" style="width:' + s + 'px;height:' + s + 'px">' +
        '<svg viewBox="0 0 24 24" width="' + Math.round(s * 0.62) + '" height="' + Math.round(s * 0.62) +
        '" fill="none" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
        MARK + '</svg></span>';
    },

    /* 徽标 + 字标 */
    logo: function (variant, opts) {
      opts = opts || {};
      var size = opts.size || 34;
      var cls = 'brand' + (variant === 'light' ? ' light' : '');
      return '<span class="' + cls + '">' + window.Brand.mark(size) +
        '<span class="brand-txt">' +
          '<b>' + NAME_CN + '</b>' +
          (opts.hideEn ? '' : '<i>' + NAME_EN + '</i>') +
        '</span></span>';
    }
  };
})();
