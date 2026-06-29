const CACHE_NAME = 'gmx-core-v3'; // Bumped to v3 to force iPhone to clear the old setup

// Static assets we need right away to open the shell app shell
const CORE_ASSETS = [
  '/gmx/',
  '/gmx/index.html',
  '/gmx/manifest.json',
  '/gmx/icon-192.png',
  '/gmx/icon-512.png'
];

// 1. Install Event: Cache the initial UI assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[GMX SW] Caching core static assets');
      return cache.addAll(CORE_ASSETS);
    })
  );
  self.skipWaiting();
});

// 2. Activate Event: Clean up older cache folders
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

// 3. Fetch Event: Cache-first, then Network with Dynamic Caching
self.addEventListener('fetch', (event) => {
  // Only intercept standard GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // If the file (local asset OR external CDN script) is already cached, use it instantly!
      if (cachedResponse) {
        return cachedResponse;
      }

      // If it isn't cached, go pull it from the web
      return fetch(event.request).then((networkResponse) => {
        // If we get a valid file back (or an opaque cross-origin script with status 0), save it!
        if (networkResponse && (networkResponse.status === 200 || networkResponse.status === 0)) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch((err) => {
        console.error('[GMX SW] Network fetch failed resource unavailable offline:', err);
      });
    })
  );
});    })
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
