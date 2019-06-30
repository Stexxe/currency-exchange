const CACHE_URLS = [
  '/',
  '/index.html',
  '/dist/',
  '/dist/bundle.js',
  '/node_modules/bootstrap/dist/css/bootstrap.min.css',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('v1')
        .then(cache => cache.addAll(CACHE_URLS))
        .then(self.skipWaiting())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => {
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request);
    }
  }));
});