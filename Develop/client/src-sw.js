const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
registerRoute(
  // Check if the request destination is "style", "script", or "worker"
  ({ request }) => ["style", "script", "worker"].includes(request.destination),

  // Use the StaleWhileRevalidate strategy for caching assets
  new StaleWhileRevalidate({
    // Specify the cache name for assets
    cacheName: "asset-cache",

    // Add plugins to customize caching behavior
    plugins: [
      // Specify the statuses that should be considered cacheable (0 and 200)
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);


registerRoute();
