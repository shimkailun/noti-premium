// Offline support. The app page is fetched fresh whenever online (so updates show at once)
// and falls back to the saved copy offline; icons and the Excel reader are served from the cache.
const CACHE = 'noti-premium-v3';
const XLSX_URL = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'icon.svg', 'icon-180.png', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', XLSX_URL];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request, url = req.url;
  if (req.method !== 'GET' || (new URL(url).origin !== location.origin && url !== XLSX_URL)) return;
  const isPage = req.mode === 'navigate' || /\/(index\.html)?$/.test(new URL(url).pathname) || url.endsWith('.webmanifest');
  e.respondWith(caches.open(CACHE).then(async c => {
    if (isPage) {
      try {
        const r = await fetch(req, { cache: 'no-cache' });
        if (r.ok) c.put(req, r.clone());
        return r;
      } catch (err) {
        return (await c.match(req, { ignoreSearch: true })) || c.match('./');
      }
    }
    const cached = await c.match(req, { ignoreSearch: true });
    return cached || fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; });
  }));
});
