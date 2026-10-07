(function () {
  var CATS = [
    { k: '蔬菜', c: '#5C7364' },
    { k: '肉蛋', c: '#A5733F' },
    { k: '水产', c: '#4E5F6B' },
    { k: '调料', c: '#8A3A2C' },
    { k: '其他', c: '#95763A' }
  ];

  function color(k) {
    var hit = CATS.filter(function (c) { return c.k === k; })[0];
    return hit ? hit.c : '#95763A';
  }

  function row(s) {
    var have = window.Store.inFridge(s.name);
    return '<div class="sh-row">' +
      '<button class="cb" data-act="toggle" data-id="' + s.id + '" aria-label="标记已采">' +
        window.D.icon('check') + '</button>' +
      '<span class="grow"><span class="nm">' + window.D.esc(s.name) + '</span>' +
      (have ? '<span class="sh-have">家里有</span>' : '') +
      (s.from ? '<span class="from">取自 ' + window.D.esc(s.from) + '</span>' : '') + '</span>' +
      '<span class="am">' + window.D.esc(s.amount) + '</span>' +
    '</div>';
  }

  var ShoppingView = {
    render: function () {
      var list = window.Store.get().shopping;

      if (!list.length) {
        return '<div class="page-head"><div class="t">采集清单</div>' +
          '<div class="s">Collecting List · 先把标本攒齐，再去一趟菜场</div></div>' +
          '<div class="empty">' + window.ART.get('empty') +
          '<p>清单还是空的。<br>去挑一件展品，一键把配料都录进来。</p></div>' +
          '<div style="padding:0 18px"><button class="btn btn-primary btn-block" data-act="goHome">去挑一件展品</button></div>';
      }

      var pending = list.filter(function (s) { return !s.done; });
      /* 减法：冰箱里登记的，不算「还差」 */
      var need = pending.filter(function (s) { return !window.Store.inFridge(s.name); });
      var have = pending.filter(function (s) { return window.Store.inFridge(s.name); });
      var done = list.filter(function (s) { return s.done; });

      var groups = CATS.map(function (c) {
        var items = need.filter(function (s) { return s.cat === c.k; });
        if (!items.length) return '';
        return '<div class="sh-group">' +
          '<div class="gh"><span class="dot" style="background:' + c.c + '"></span>' +
          '<span class="t">' + c.k + '</span><span class="c">' + items.length + ' Items</span></div>' +
          items.map(row).join('') +
        '</div>';
      }).join('');

      var haveBox = have.length ? '<div class="sh-group">' +
        '<div class="gh"><span class="dot" style="background:#5C7364"></span>' +
        '<span class="t">家里已有 · 不用买</span><span class="c">' + have.length + ' Items</span></div>' +
        have.map(row).join('') +
        '</div>' : '';

      var doneBox = done.length ? '<div class="sh-group">' +
        '<div class="gh"><span class="dot" style="background:#B3AA98"></span>' +
        '<span class="t">已采集</span><span class="c">' + done.length + ' Items</span></div>' +
        done.map(function (s) {
          return '<div class="sh-row">' +
            '<button class="cb on" data-act="toggle" data-id="' + s.id + '">' + window.D.icon('check') + '</button>' +
            '<span class="grow"><span class="nm line-through">' + window.D.esc(s.name) + '</span></span>' +
            '<span class="am line-through">' + window.D.esc(s.amount) + '</span>' +
          '</div>';
        }).join('') +
        '<div style="padding:10px 0 4px"><button class="btn btn-sm" data-act="clear">清掉已采集的</button></div>' +
        '</div>' : '';

      return '<div class="page-head">' +
        '<div class="t">采集清单</div>' +
        '<div class="s">Collecting List · 还差 <b style="color:var(--seal)">' + need.length + '</b> 样要买' +
          (have.length ? '，家里已有 ' + have.length + ' 样已替你划出去' : '') + '</div>' +
        '<div style="padding:12px 18px 0">' +
          '<button class="chip plain" data-act="addCustom">' + window.D.icon('plus', 'ic-sm') + '补录一样</button>' +
        '</div>' +
        '</div>' +

        '<div style="padding:14px 18px 0">' +
          '<div class="reason" style="margin:0">' + window.D.icon('note', 'ic-sm') +
            '<span>建议先采肉蛋水产，再采蔬菜，最后顺手拿调料。</span></div>' +
        '</div>' +

        '<div style="height:16px"></div>' + groups + haveBox + doneBox +

        (need.length === 0 && pending.length ? '<div style="padding:6px 18px 0">' +
          '<div class="reason" style="margin:0">' + window.D.icon('sparkle', 'ic-sm') +
          '<span>要买的都齐了，剩下的家里都有 —— 可以开做了。</span></div></div>' : '') +

        '<div style="padding:6px 18px 24px">' +
          '<button class="btn btn-block btn-lg" data-act="goHome">再挑一件展品</button>' +
        '</div>';
    },

    actions: {
      toggle: function (d) { window.Store.toggleShopping(d.id); window.Router.refresh(); },
      clear: function () { window.Store.clearShopping(); window.D.toast('已清掉采好的'); window.Router.refresh(); },
      goHome: function () { window.Router.go('#/home'); },

      addCustom: function () {
        window.App.sheet({
          title: '补录一样',
          body: '<div class="field"><input id="cust-name" placeholder="比如：香菜" data-enter="saveCustom"></div>' +
            '<div class="field" style="margin-top:10px"><input id="cust-amt" placeholder="用量，比如：1 把"></div>' +
            '<button class="btn btn-primary btn-block" style="margin-top:14px" data-sheet-act="saveCustom">录进清单</button>',
          onMount: function (body, ov) {
            var btn = ov.querySelector('[data-sheet-act="saveCustom"]');
            function save() {
              var n = body.querySelector('#cust-name').value.trim();
              var a = body.querySelector('#cust-amt').value.trim();
              if (!n) { window.D.toast('先写个名字'); return; }
              window.Store.addToShopping([{ name: n, amount: a || '适量', cat: '其他' }], '手动补录');
              window.App.closeSheet();
              window.Router.refresh();
              window.D.toast('录好了');
            }
            btn.onclick = save;
            body.querySelector('#cust-name').onkeydown = function (e) { if (e.key === 'Enter') save(); };
            body.querySelector('#cust-amt').onkeydown = function (e) { if (e.key === 'Enter') save(); };
          }
        });
      }
    }
  };

  window.ShoppingView = ShoppingView;
})();
