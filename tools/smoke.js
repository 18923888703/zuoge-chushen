/* jsdom 冒烟：从 index.html 读取脚本顺序，跑完整主链路 */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const ROOT = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1]);

let pass = 0, fail = 0;
const errors = [];
function ok(name, cond, extra) {
  if (cond) { pass++; console.log('PASS  ' + name + (extra ? ' :: ' + extra : '')); }
  else { fail++; console.log('FAIL  ' + name + (extra ? ' :: ' + extra : '')); }
}
const wait = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const dom = await JSDOM.fromFile(path.join(ROOT, 'index.html'), {
    runScripts: 'outside-only', pretendToBeVisual: true, url: 'http://localhost/'
  });
  const w = dom.window;
  w.addEventListener('error', e => errors.push(String(e.error || e.message)));
  w.console.error = (...a) => errors.push(a.join(' '));

  for (const s of scripts) {
    const code = fs.readFileSync(path.join(ROOT, s), 'utf8');
    try { w.eval(code); } catch (e) { errors.push(s + ': ' + e.message); }
  }

  w.navigator.wakeLock = undefined;
  /* app.js 已自行 Router.start()，这里不再重复调用 */
  await wait(300);

  ok('globals loaded', !!(w.Router && w.Store && w.Timers && w.AI && w.App && w.Assistant));
  ok('recipe library size', (w.RECIPES || []).length >= 40, (w.RECIPES || []).length + ' recipes');
  ok('every recipe has kitchen meta', (w.RECIPES || []).every(r => r.no && r.kind),
    (w.RECIPES || []).filter(r => !r.no).map(r => r.id).join(',') || 'all ok');

  ok('view rendered', w.document.querySelector('#view').innerHTML.length > 100);
  ok('tabbar rendered', !!w.document.querySelector('#tabbar'));

  // 首页 = 对话：开场气泡 + 底部提问框 + 快捷问法
  w.Router.go('#/home'); await wait(150);
  ok('home is a chat', !!w.document.querySelector('.hchat .hstream .bubble.ai .lead'));
  ok('ask dock present', !!w.document.querySelector('.hdock #home-ask'));
  ok('brand logo present', w.document.querySelector('.home-hero .brand .brand-txt b').textContent === '我是厨神');
  ok('hero photo slim', !!w.document.querySelector('.home-hero.compact img.hero-img'));

  const qChips = w.document.querySelectorAll('.hquick [data-act="ask"]');
  ok('quick prompts offered', qChips.length >= 4, qChips.length + ' chips');
  if (qChips[1]) qChips[1].click();
  await wait(2000);
  const reply = w.document.querySelector('.bubble.ai .dcard');
  ok('chat answers a dish', !!reply && !!reply.querySelector('.dc-name'),
    reply ? reply.querySelector('.dc-name').textContent : 'none');
  ok('reply has photo', !!w.document.querySelector('.bubble.ai .dc-cover .dc-img'));
  ok('dish card is tappable', !!w.document.querySelector('.bubble.ai .dcard[data-act="detail"]'));
  ok('reroll offered', !!w.document.querySelector('[data-act="reroll"]'));

  // 自己打一句也能问
  const askInput = w.document.querySelector('#home-ask');
  askInput.value = '30 分钟以内';
  askInput.dispatchEvent(new w.Event('input', { bubbles: true }));
  w.document.querySelector('.hsend').click();
  await wait(2000);
  ok('typed question sent', w.document.querySelectorAll('.bubble.me').length >= 2,
    w.document.querySelectorAll('.bubble.me').length + ' sent');
  const m2 = (w.document.querySelectorAll('.bubble.ai .lead') || [])[2];
  ok('time-bounded answer', !!m2 && /分钟/.test(m2.textContent), m2 ? m2.textContent.slice(0, 24) : 'none');

  // 答疑类：不推菜，直接回答
  const askInput2 = w.document.querySelector('#home-ask');
  askInput2.value = '料酒是干嘛的？';
  askInput2.dispatchEvent(new w.Event('input', { bubbles: true }));
  w.document.querySelector('.hsend').click();
  await wait(3000);
  const last = w.document.querySelectorAll('.bubble.ai');
  const lastTxt = last[last.length - 1] ? last[last.length - 1].textContent : '';
  ok('knowledge question answered', lastTxt.indexOf('去腥') >= 0, lastTxt.slice(0, 30));

  // 点对话里的菜卡 -> 直接进做法详情页（含步骤）
  const cardEl = w.document.querySelector('.bubble.ai .dcard[data-act="detail"]');
  ok('dish card opens steps', !!cardEl);
  if (cardEl) cardEl.click();
  await wait(220);
  ok('card opens tutorial page',
    w.Router.name === 'recipe' && w.document.querySelector('#view').innerHTML.indexOf('怎么一步步做') > 0,
    w.Router.name + ' / ' + (w.Router.params[0] || 'no id'));
  w.Router.go('#/home'); await wait(150);

  // 视频分享 -> 拆成配料和步骤
  ok('plain chat is not treated as share', w.ShareParse.plan('帮我随便定一道') === null);

  const shareText = '【家常菜】这样做的红烧肉软糯入味，入口即化 #美食教程 #红烧肉 - 抖音 ' +
    'https://v.douyin.com/iAbCdEfG/ 复制此链接，打开Dou音搜索，直接观看视频！';
  const plan = w.ShareParse.plan(shareText);
  ok('douyin share detected', !!plan && plan.platform === 'douyin', plan ? plan.platform : 'none');
  ok('share title cleaned', !!plan && plan.title.indexOf('复制此链接') < 0 && plan.title.indexOf('#') < 0,
    plan ? plan.title : 'none');
  ok('dish recognized from share', !!plan && !!plan.dish && plan.dish.id === 'braised-pork',
    plan && plan.dish ? plan.dish.id + ' / ' + plan.dish.confidence : 'none');

  w.Router.go('#/home'); await wait(150);
  const shopBefore = w.Store.get().shopping.length;
  const inp3 = w.document.querySelector('#home-ask');
  inp3.value = shareText;
  inp3.dispatchEvent(new w.Event('input', { bubbles: true }));
  w.document.querySelector('.hsend').click();
  await wait(1400);
  const vcard = w.document.querySelector('.bubble.ai .vcard');
  ok('share answered with breakdown', !!vcard);
  ok('breakdown names the dish', !!vcard && vcard.textContent.indexOf('红烧肉') >= 0);
  ok('breakdown lists ingredients', !!vcard && vcard.querySelectorAll('.vings .chip').length >= 5,
    vcard ? vcard.querySelectorAll('.vings .chip').length + ' items' : 'none');
  ok('breakdown previews 3 steps', !!vcard && vcard.querySelectorAll('.vstep').length === 3,
    vcard ? vcard.querySelectorAll('.vstep').length + ' steps' : 'none');
  ok('breakdown declares its source', !!vcard &&
    (vcard.querySelector('.vnote') || {}).textContent.indexOf('不是从视频画面里逐帧') >= 0,
    vcard ? vcard.querySelector('.vnote').textContent.slice(0, 26) : 'none');

  const moreBtn = w.document.querySelector('[data-act="toggleShare"]');
  ok('expandable steps', !!moreBtn);
  if (moreBtn) moreBtn.click();
  await wait(150);
  ok('all steps expand', w.document.querySelectorAll('.vstep').length > 3,
    w.document.querySelectorAll('.vstep').length + ' steps');

  const vAdd = w.document.querySelector('.vcard [data-act="addList"]');
  if (vAdd) vAdd.click();
  await wait(150);
  ok('breakdown goes to shopping', w.Store.get().shopping.length > shopBefore,
    shopBefore + ' -> ' + w.Store.get().shopping.length);

  // 认不出来的视频：诚实说没有，不给编配料
  const missPlan = w.ShareParse.plan('佛跳墙的极简做法 https://v.douyin.com/XyZ12345/ 复制此链接，打开Dou音搜索，直接观看视频！');
  ok('unknown share yields no dish', !!missPlan && missPlan.dish === null,
    missPlan ? String(missPlan.title) : 'null');
  const inp4 = w.document.querySelector('#home-ask');
  inp4.value = '佛跳墙的极简做法 https://v.douyin.com/XyZ12345/ 复制此链接，打开Dou音搜索，直接观看视频！';
  inp4.dispatchEvent(new w.Event('input', { bubbles: true }));
  w.document.querySelector('.hsend').click();
  await wait(1400);
  const missCards = w.document.querySelectorAll('.bubble.ai .vcard');
  const missCard = missCards[missCards.length - 1];
  ok('unknown share says so', !!missCard && /没写明是哪道菜|没有同名这道菜/.test(missCard.textContent),
    missCard ? missCard.querySelector('.vmiss').textContent.slice(0, 30) : 'none');
  ok('unknown share gives no fake ingredients',
    !!missCard && missCard.querySelectorAll('.vings .chip.plain').length === 0);

  // 加清单
  w.Router.go('#/home'); await wait(120);
  const addBtn = w.document.querySelector('[data-act="addList"]');
  if (addBtn) addBtn.click();
  await wait(150);
  ok('add to shopping', w.Store.get().shopping.length > 0, w.Store.get().shopping.length + ' items');

  // 菜谱详情
  w.Router.go('#/recipe/braised-pork'); await wait(150);
  ok('recipe page', w.document.querySelector('#view').innerHTML.indexOf('怎么一步步做') > 0);
  ok('recipe ingredients', w.document.querySelectorAll('.ing-row, .ing-card').length >= 3);

  const varBtns = w.document.querySelectorAll('[data-act="variation"]');
  if (varBtns.length > 1) varBtns[1].click();
  await wait(120);
  ok('variation switch', !!w.document.querySelector('.var-card.on'));

  // 清单
  w.Router.go('#/shopping'); await wait(150);
  ok('shopping page', w.document.querySelector('#view').innerHTML.indexOf('买菜清单') > 0);
  const cb = w.document.querySelector('[data-act="toggle"]');
  if (cb) cb.click();
  await wait(100);
  ok('toggle item', w.Store.get().shopping.some(s => s.done));

  // 制作 + 计时器
  w.Router.go('#/cook/braised-pork'); await wait(150);
  ok('cook page mounted', !!w.document.querySelector('#cook-layer .cook'));
  ok('tabbar hidden on cook', w.document.querySelector('#tabbar').hidden === true);

  w.document.querySelector('[data-act="next"]').click(); await wait(80);
  w.document.querySelector('[data-act="next"]').click(); await wait(80);
  w.document.querySelector('[data-act="next"]').click(); await wait(80);
  const startBtn = w.document.querySelector('[data-act="startTimer"]');
  ok('cook step4 timer present', !!startBtn);
  if (startBtn) startBtn.click();
  await wait(150);
  const tl = w.Timers.list();
  ok('timer started', tl.length === 1 && !tl[0].done, tl.length ? tl[0].label + ' ' + tl[0].seconds : 'none');

  w.Router.go('#/home'); await wait(120);
  ok('mini timer visible', w.document.querySelector('#mini-timer').hidden === false,
    (w.document.querySelector('#mini-timer').textContent || '').trim());

  // 带计时回来 -> 接上进度
  w.Router.go('#/cook/braised-pork'); await wait(180);
  const cookEl = w.document.querySelector('.cook');
  ok('cook resumes at running step', !!cookEl && !!cookEl.querySelector('.cook-resume'),
    cookEl ? (cookEl.querySelector('.cook-resume') || {}).textContent : 'no banner');
  w.Timers.list().forEach(t => w.Timers.stop(t.id));

  // 没计时 -> 从头
  w.Router.go('#/home'); await wait(100);
  w.Router.go('#/cook/tomato-egg'); await wait(150);
  const c2 = w.document.querySelector('.cook');
  ok('fresh cook starts at step 1',
    !!c2 && c2.innerHTML.indexOf('第 1 步 /') >= 0 && !c2.querySelector('.cook-resume'),
    c2 ? (c2.innerHTML.match(/第 \d+ 步 \/ 共 \d+ 步/) || ['none'])[0] : '');

  // 做完这道菜 -> 名下的计时必须一并清掉（不能继续在底部倒数）
  const t0 = w.document.querySelector('[data-act="startTimer"]');
  ok('step1 timer startable', !!t0);
  if (t0) t0.click();
  await wait(150);
  ok('timer running before finish', w.Timers.list().filter(t => !t.done).length >= 1,
    w.Timers.list().length + ' timers');
  for (let i = 0; i < 20; i++) {
    const nb = w.document.querySelector('[data-act="next"]');
    if (!nb) break;
    if (nb.textContent.trim() === '做完了') { nb.click(); break; }
    nb.click(); await wait(60);
  }
  await wait(200);
  ok('finish clears dish timers', w.Timers.list().length === 0,
    JSON.stringify(w.Timers.list().map(t => t.label)));
  ok('mini timer gone after finish', w.document.querySelector('#mini-timer').hidden === true);
  ok('finish lands on profile', w.Router.name === 'me', w.Router.name);
  w.Router.go('#/home'); await wait(120);

  // 馆长答疑
  w.Assistant.open('料酒是干嘛的？');
  await wait(1400);
  const chat = w.document.querySelector('#chat');
  ok('assistant bubbles', chat && chat.querySelectorAll('.bubble').length >= 3,
    chat ? chat.querySelectorAll('.bubble').length + ' bubbles' : '');
  ok('assistant answered', chat && chat.textContent.indexOf('去腥') >= 0);

  // 搜索页已下线：tab 只剩三个，旧路由回落到首页（改在底部对话框里说）
  const tabs = w.document.querySelectorAll('#tabbar .tab');
  ok('three tabs only', tabs.length === 3, tabs.length + ' tabs');
  ok('search tab gone', !w.document.querySelector('#tabbar [data-tab="discover"]'));
  w.Router.go('#/discover'); await wait(150);
  ok('discover route falls back to home', w.Router.name === 'home', w.Router.name);
  w.Router.go('#/home'); await wait(120);

  // 档案：冰箱 + 偏好
  w.Router.go('#/me'); await wait(150);
  ok('me page prefs', w.document.querySelector('#view').innerHTML.indexOf('口味') >= 0);
  w.Store.setPref('spicy', 3); await wait(80);
  ok('pref updated', w.Store.get().prefs.spicy === 3);

  const rb = w.findRecipe('braised-pork');
  const total = rb.ingredients.length + rb.seasonings.length;
  w.Store.toggleFridge('五花肉');
  ok('fridge toggled', w.Store.inFridge('五花肉'));
  ok('fridge deduction', w.Store.missingFor(rb).length === total - 1,
    total + ' -> ' + w.Store.missingFor(rb).length);

  w.Store.setPref('people', 4);
  ok('amount scaled', w.D.scaleAmount('600g', 2) === '1200g', w.D.scaleAmount('600g', 2));
  w.Store.setPref('people', 2);

  console.log('\n--- runtime errors ---');
  console.log(errors.length ? errors.join('\n') : '(none)');
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail || errors.length ? 1 : 0);
})();
