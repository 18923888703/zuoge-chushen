/* 品牌 LOGO：渐变徽标 + 中英文字标
   用法：window.Brand.logo('light')  // light=压在深色照片上用白字；default=页面底色用墨字
   修改 App 名字只改这里 */
(function () {
  /* 徽标图形：一个完整独立的厨师帽剪影（不外溢、不被裁切） */
  var MARK = '<g fill="#FFFFFF" stroke="none">' +
      '<circle cx="8.6" cy="10.6" r="3.5"/>' +
      '<circle cx="12" cy="8.9" r="3.9"/>' +
      '<circle cx="15.4" cy="10.6" r="3.5"/>' +
      '<rect x="6.6" y="10.8" width="10.8" height="7" rx="1.6"/>' +
    '</g>';

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
