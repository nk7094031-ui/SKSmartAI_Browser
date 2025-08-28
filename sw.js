const CACHE = 'sks-cache-v1';
const ASSETS = [
  './','./index.html','./assets/css/style.css',
  './assets/js/db.js','./assets/js/security.js','./assets/js/ai.js',
  './assets/js/app.js','./assets/js/admin.js','./assets/js/sw-register.js',
  './assets/pages/help.html','./assets/pages/privacy.html',
  './assets/pages/earning.html','./assets/pages/legal.html',
  './assets/games/tictactoe.html'
];
self.addEventListener('install', e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))); });
self.addEventListener('activate', e=>{ e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); });
self.addEventListener('fetch', e=>{
  const url = new URL(e.request.url);
  if (url.origin === location.origin) { e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request))); }
});