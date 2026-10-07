/* 做个厨神 · Service Worker
   策略：网络优先 + 缓存兜底（保证更新能拿到，断网也能开）
   发新版本时把 CACHE 里的版本号 +1 即可强制刷新缓存。 */
var CACHE = 'chushen-v1';

var ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './css/01-tokens.css',
  './css/02-paper.css',
  './css/03-components.css',
  './css/04-pages.css',
  './css/05-app.css',
  './js/ui/dom.js',
  './js/ui/illustrations.js',
  './js/data/recipes-ext.js',
  './js/data/recipes-ext2.js',
  './js/data/recipes-ext3.js',
  './js/data/recipes-ext4.js',
  './js/data/recipes.js',
  './js/data/pantry.js',
  './js/data/videos.js',
  './js/core/store.js',
  './js/core/timer.js',
  './js/core/ai-mock.js',
  './js/core/router.js',
  './js/views/home.js',
  './js/views/recipe.js',
  './js/views/shopping.js',
  './js/views/cook.js',
  './js/views/discover.js',
  './js/views/me.js',
  './js/views/assistant.js',
  './js/app.js'
];

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return Promise.all(ASSETS.map(function (u) {
        return c.add(new Request(u, { cache: 'reload' })).catch(function () {});
      }));
    })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; })
        .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== location.origin) return;

  e.respondWith(
    fetch(req).then(function (res) {
      if (res && res.ok) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
      }
      return res;
    }).catch(function () {
      return caches.match(req).then(function (m) {
        if (m) return m;
        if (req.mode === 'navigate') return caches.match('./index.html');
      });
    })
  );
});
