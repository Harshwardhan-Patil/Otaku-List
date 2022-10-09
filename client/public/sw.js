const staticCacheName = "app-static-v2";
const StaticDataUrl = ["/offline.html"];

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(StaticDataUrl);
    })
  );
});

this.addEventListener("activate", (evt) => {
  // console.log("Service worker is activated");
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

this.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      // Try to get the response from a cache.
      const cachedResponse = await caches.match(event.request);
      // Return it if we found one.
      if (cachedResponse) return cachedResponse;
      // If we didn't find a match in the cache, use the network.
      return fetch(event.request).catch(() => {
        caches.match("/offline.html");
      });
    })()
  );
});
