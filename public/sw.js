const CACHE_NAME = 'disaster-relief-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/main.jsx',
  '/src/App.jsx',
  '/src/index.css'
];

// Install event - cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .catch((err) => console.log('Service Worker: Cache failed', err))
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request)
          .then((response) => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Return offline page if available
            return caches.match('/index.html');
          });
      })
  );
});

// Background sync for offline requests
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-registrations') {
    event.waitUntil(syncRegistrations());
  }
  if (event.tag === 'sync-reports') {
    event.waitUntil(syncReports());
  }
});

async function syncRegistrations() {
  try {
    const db = await openDB();
    const tx = db.transaction('pending-registrations', 'readonly');
    const store = tx.objectStore('pending-registrations');
    const registrations = await store.getAll();

    for (const registration of registrations) {
      try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(registration.data)
        });

        if (response.ok) {
          // Remove from pending
          const deleteTx = db.transaction('pending-registrations', 'readwrite');
          const deleteStore = deleteTx.objectStore('pending-registrations');
          await deleteStore.delete(registration.id);
        }
      } catch (err) {
        console.log('Sync failed for registration:', err);
      }
    }
  } catch (err) {
    console.log('Background sync failed:', err);
  }
}

async function syncReports() {
  try {
    const db = await openDB();
    const tx = db.transaction('pending-reports', 'readonly');
    const store = tx.objectStore('pending-reports');
    const reports = await store.getAll();

    if (!reports || !Array.isArray(reports)) {
      console.log('No pending reports to sync');
      return;
    }

    for (const report of reports) {
      try {
        const response = await fetch(report.url, {
          method: 'POST',
          headers: report.headers,
          body: report.body
        });

        if (response.ok) {
          // Remove from pending
          const deleteTx = db.transaction('pending-reports', 'readwrite');
          const deleteStore = deleteTx.objectStore('pending-reports');
          await deleteStore.delete(report.id);
        }
      } catch (err) {
        console.log('Sync failed for report:', err);
      }
    }
  } catch (err) {
    console.log('Background sync failed:', err);
  }
}

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('DisasterReliefDB', 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}
