const CACHE_NAME = 'gmx-local-cache-v1';
const CDN_CACHE_NAME = 'gmx-cdn-cache-v1';

// 1. The Local App Shell
// These are the files hosted directly on your server/folder that need to be cached immediately.
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png' // Make sure you have this icon in your folder!
];

// 2. Install Event: Cache the App Shell
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Forces the waiting service worker to become the active service worker
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[GMX SW] Caching local app shell');
      return cache.addAll(APP_SHELL);
    })
  );
});

// 3. Activate Event: Clean up old caches if you ever update the version numbers above
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== CDN_CACHE_NAME) {
            console.log('[GMX SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // Take control of all pages immediately
});

// 4. Fetch Event: Intercept network requests and apply our caching strategies
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // STRATEGY A: For CDN links (jsDelivr, Google Fonts)
  // Action: "Cache First, Fallback to Network"
  // Why? These external scripts rarely change. We want to grab them from the cache instantly if we have them, guaranteeing offline access.
  if (requestUrl.hostname === 'cdn.jsdelivr.net' || requestUrl.hostname.includes('fonts.')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse; // We have it! Serve it offline.
        }

        // We don't have it yet. Fetch it, cache it for next time, and serve it.
        return fetch(event.request).then((networkResponse) => {
          // Only cache valid, successful responses
          if (!networkResponse || networkResponse.status !== 200 || (networkResponse.type !== 'basic' && networkResponse.type !== 'cors')) {
            return networkResponse;
          }

          // Clone the response because a request stream can only be consumed once
          const responseToCache = networkResponse.clone();
          caches.open(CDN_CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        }).catch((err) => {
          console.error('[GMX SW] CDN Fetch failed and not in cache:', err);
        });
      })
    );
  } 
  
  // STRATEGY B: For Local Files (index.html, images, etc.)
  // Action: "Stale-While-Revalidate" or "Network First"
  // Why? This fetches from the cache for speed, but grabs the network version silently to keep your local UI up to date for the *next* visit.
  else {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        }).catch(() => {
          // Network failed (offline). We will rely entirely on the cachedResponse we return below.
        });

        // Return the cached response immediately if we have it, otherwise wait for the network
        return cachedResponse || fetchPromise;
      })
    );
  }
});  self.clients.claim();
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
