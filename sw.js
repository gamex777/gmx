const CACHE_NAME = 'gmx-core-cache-v2';

// 1. The Ultimate App Shell Pre-Cache List
// This forces the browser to download absolutely EVERY dependency immediately while online.
const PRE_CACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  
  // Core IodineGBA Engine Scripts
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/includes/TypedArrayShim.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/Cartridge.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/DMA.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/Emulator.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/Graphics.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/RunLoop.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/Memory.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/IRQ.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/JoyPad.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/Serial.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/Sound.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/Timer.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/Wait.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/CPU.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/Saves.js',
  
  // Sound Channels
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/sound/FIFO.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/sound/Channel1.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/sound/Channel2.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/sound/Channel3.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/sound/Channel4.js',
  
  // CPU Architectures
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/CPU/ARM.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/CPU/THUMB.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/CPU/CPSR.js',
  
  // Graphics Processing Core
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/graphics/Renderer.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/graphics/RendererShim.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/graphics/RendererProxy.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/graphics/BGTEXT.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/graphics/BG2FrameBuffer.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/graphics/BGMatrix.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/graphics/AffineBG.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/graphics/ColorEffects.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/graphics/Mosaic.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/graphics/OBJ.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/graphics/OBJWindow.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/graphics/Window.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/graphics/Compositor.js',
  
  // DMA Memory Layout
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/memory/DMA0.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/memory/DMA1.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/memory/DMA2.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/memory/DMA3.js',
  
  // Cartridges & Saves
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/cartridge/SaveDeterminer.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/cartridge/SRAM.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/cartridge/FLASH.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/cartridge/EEPROM.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/IodineGBA/core/cartridge/GPIO.js',
  
  // Auxiliary Core Scripting
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/user_scripts/base64.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/user_scripts/CoreGlueCode.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/user_scripts/GfxGlueCode.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/user_scripts/GUIGlueCode.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/user_scripts/JoyPadGlueCode.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/user_scripts/ROMLoadGlueCode.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/user_scripts/SavesGlueCode.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/user_scripts/WorkerGfxGlueCode.js',
  'https://cdn.jsdelivr.net/gh/taisel/IodineGBA@master/user_scripts/WorkerGlueCode.js',
  
  // Web Fonts
  'https://fonts.googleapis.com/css?family=Play&display=swap'
];

// 2. Install Event - Force structural caching sequence
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[GMX SW] Initiating full pre-cache structural dump...');
      return cache.addAll(PRE_CACHE_ASSETS);
    })
  );
});

// 3. Activate Event - Flush out residual engine structures
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[GMX SW] Flushing outdated cache registry:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// 4. Fetch Event - Fallback matching for Legacy WebKit Engines
self.addEventListener('fetch', (event) => {
  // Pass non-GET requests immediately
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      // iOS Safari Fix: If requesting domain directory path fallback directly to index file asset
      const url = new URL(event.request.url);
      if (url.origin === self.location.origin && (url.pathname === '/' || url.pathname === '/gmx/')) {
        return caches.match('./index.html');
      }

      // If not explicitly pre-cached, fetch from network and dynamically store 
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch((err) => {
        console.warn('[GMX SW] Resource routing offline failure notice:', err);
      });
    })
  );
});
