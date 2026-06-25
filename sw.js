const CACHE_NAME = 'gmx-core-v1';

// The essential files required to boot the OS
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  // If you move your CSS/JS to separate files later, add them here:
  // '/style.css',
  // '/engine.js'
];

// 1. Install Event: Cache the core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[GMX SW] Caching core assets');
      return cache.addAll(CORE_ASSETS);
    })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// 2. Activate Event: Clean up old caches if we update the version number
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[GMX SW] Purging old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. Fetch Event: Serve from cache first, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // If we have it in the offline cache, return it immediately
      if (cachedResponse) {
        return cachedResponse;
      }
      // Otherwise, try to fetch it from the network
      return fetch(event.request);
    })
  );
});
