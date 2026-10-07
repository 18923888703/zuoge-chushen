(function () {
  var ctx = {};

  function bubble(who, html) {
    var d = document.createElement('div');
    d.className = 'bubble ' + who;
    d.innerHTML = html;
    return d;
  }

  function scrollDown(body) {
    body.scrollTop = body.scrollHeight;
  }

  var Assistant = {
    open: function (prefill, context) {
      ctx = context || {};
      var dish = ctx.recipe ? ctx.recipe.name : '';

      window.App.sheet({
        title: '馆长答疑',
        height: '74%',
        body: '<div class="chat" id="chat"></div>',
        footer:
          '<div class="quick" id="quick" style="padding:0 18px 8px">' +
            window.QUICK_QUESTIONS.map(function (q) {
              return '<button class="chip plain" data-q="' + window.D.esc(q) + '">' + window.D.esc(q) + '</button>';
            }).join('') +
          '</div>' +
          '<div class="chat-input">' +
            '<div class="field" style="flex:1"><input id="ask-input" placeholder="比如：料酒是干嘛的？"></div>' +
            '<button class="btn btn-primary" id="ask-send" style="width:42px;height:42px;padding:0;border-radius:50%">' +
              window.D.icon('send', 'ic-sm') + '</button>' +
          '</div>',

        onMount: function (body, ov) {
          var chat = body.querySelector('#chat');
          var input = ov.querySelector('#ask-input');
          var send = ov.querySelector('#ask-send');
          var quick = ov.querySelector('#quick');

          chat.appendChild(bubble('ai',
            '<div class="who">Curator</div>' +
            (dish ? '你在做「' + window.D.esc(dish) + '」。' : '') +
            '不懂的随时问 —— 某个调料干嘛用、没有怎么办、还要多久，都能答。'));

          function ask(text) {
            text = String(text || '').trim();
            if (!text) return;
            chat.appendChild(bubble('me', window.D.esc(text)));
            input.value = '';

            var b = bubble('ai', '<div class="who">Curator</div><span class="ans"></span><span class="caret"></span>');
            chat.appendChild(b);
            var ans = b.querySelector('.ans');
            ans.style.whiteSpace = 'pre-wrap';
            scrollDown(body);

            window.AI.ask(text, ctx, function (chunk) {
              ans.textContent += chunk;
              scrollDown(body);
            }).then(function () {
              var c = b.querySelector('.caret');
              if (c) c.remove();
            });
          }

          send.onclick = function () { ask(input.value); };
          input.onkeydown = function (e) { if (e.key === 'Enter') ask(input.value); };
          quick.addEventListener('click', function (e) {
            var t = e.target.closest('[data-q]');
            if (!t) return;
            ask(t.getAttribute('data-q'));
          });

          if (prefill) { input.value = prefill; ask(prefill); }
        }
      });
    }
  };

  window.Assistant = Assistant;
})();
