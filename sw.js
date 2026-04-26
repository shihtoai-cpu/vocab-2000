const CACHE_NAME = 'xianni-v2';
const ASSETS = [
  'index.html',
  'manifest.json'
];

// 安裝時強制跳過等待
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// 激活
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// 攔截請求（確保離線可用，這是安裝提示的必要條件）
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
