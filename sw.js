const staticCacheName = 'site-static-v2';
const assets = [
  '/',
  '/index.html',
  '/src/script/app.js',
  '/src/script/ui.js',
  '/src/script/materialize.min.js',
  '/src/css/materialize.min.css',
  '/src/css/styles.css',
  '/src/assets/images/dish.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v50/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
  '/src/app/pages/about.html',
  '/src/app/pages/contact.html'
];

// install service worker
self.addEventListener('install', event => {
  // console.log('service worker has been installed');

  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', event => {
  // console.log('service worker has been activated');

  /** Cache versioning - delete old caches */
  event.waitUntil(
    caches.keys().then(keys => {
      // console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      )
    })
  );
});

// fetch event
self.addEventListener('fetch', event => {
  // console.log('fetch event', event);
  event.respondWith(
    caches.match(event.request).then(cacheRes => {
      return cacheRes || fetch(event.request);
    })
  )
})