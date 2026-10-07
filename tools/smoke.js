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
  ok('every recipe has meta', (w.RECIPES || []).every(r => r.no && r.latin && r.family),
    (w.RECIPES || []).filter(r => !r.no).map(r => r.id).join(',') || 'all ok');

  ok('view rendered', w.document.querySelector('#view').innerHTML.length > 100);
  ok('tabbar rendered', !!w.document.querySelector('#tabbar'));

  // 抽签
  w.Router.go('#/home'); await wait(120);
  const drawBtn = w.document.querySelector('[data-act="draw"]') ||
    w.document.querySelector('.cabinet [data-act]');
  if (drawBtn) drawBtn.click();
  await wait(1800);
  const card = w.document.querySelector('.specimen-card');
  ok('draw -> specimen card', !!card, card ? card.querySelector('.nm').textContent : 'none');

  // 加清单
  const addBtn = w.document.querySelector('[data-act="addList"]');
  if (addBtn) addBtn.click();
  await wait(150);
  ok('add to shopping', w.Store.get().shopping.length > 0, w.Store.get().shopping.length + ' items');

  // 展签
  w.Router.go('#/recipe/braised-pork'); await wait(150);
  ok('recipe page', w.document.querySelector('#view').innerHTML.indexOf('制作工序') > 0);
  ok('recipe ingredients', w.document.querySelectorAll('.ing-row, .ing-card').length >= 3);

  const varBtns = w.document.querySelectorAll('[data-act="variation"]');
  if (varBtns.length > 1) varBtns[1].click();
  await wait(120);
  ok('variation switch', !!w.document.querySelector('.var-card.on'));

  // 清单
  w.Router.go('#/shopping'); await wait(150);
  ok('shopping page', w.document.querySelector('#view').innerHTML.indexOf('采集清单') > 0);
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

  // 馆长答疑
  w.Assistant.open('料酒是干嘛的？');
  await wait(1400);
  const chat = w.document.querySelector('#chat');
  ok('assistant bubbles', chat && chat.querySelectorAll('.bubble').length >= 3,
    chat ? chat.querySelectorAll('.bubble').length + ' bubbles' : '');
  ok('assistant answered', chat && chat.textContent.indexOf('去腥') >= 0);

  // 文献检索 + 诚实拆解
  w.Router.go('#/discover'); await wait(150);
  const inp = w.document.querySelector('#q');
  if (inp) inp.value = '红烧肉';
  w.DiscoverView.actions.search();
  await wait(2600);
  const arch = w.document.querySelectorAll('.arch');
  ok('discover archive cards', arch.length >= 6, arch.length + ' cards');

  const parseBtn = w.document.querySelector('[data-act="parse"]');
  if (parseBtn) parseBtn.click();
  await wait(1800);
  const parsed = w.document.querySelector('.parsed');
  ok('video parsed honestly', !!parsed && parsed.innerHTML.indexOf('参考配料') >= 0,
    parsed ? parsed.textContent.slice(0, 40) : 'none');
  ok('parsed declares source', !!parsed && parsed.innerHTML.indexOf('不是从视频里提取') >= 0);

  // 没命中馆藏 -> 诚实说做不到，不编造配料
  const inp2 = w.document.querySelector('#q');
  if (inp2) inp2.value = '佛跳墙';
  w.DiscoverView.actions.search();
  await wait(2600);
  const miss = w.document.querySelector('[data-act="parse"]');
  if (miss) miss.click();
  await wait(1800);
  const missed = w.document.querySelector('.parsed');
  ok('unmatched says so', !!missed && missed.innerHTML.indexOf('不在本馆馆藏里') >= 0,
    missed ? missed.textContent.slice(0, 30) : 'none');
  ok('unmatched gives no fake ingredients', !!missed && missed.querySelectorAll('.ing-row').length === 0);

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
