// IndexedDB utilities for offline storage

const DB_NAME = 'DisasterReliefDB';
const DB_VERSION = 1;

export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Store for pending registrations
      if (!db.objectStoreNames.contains('pending-registrations')) {
        const regStore = db.createObjectStore('pending-registrations', { keyPath: 'id', autoIncrement: true });
        regStore.createIndex('timestamp', 'timestamp', { unique: false });
      }

      // Store for pending reports (missing/found)
      if (!db.objectStoreNames.contains('pending-reports')) {
        const reportStore = db.createObjectStore('pending-reports', { keyPath: 'id', autoIncrement: true });
        reportStore.createIndex('timestamp', 'timestamp', { unique: false });
      }

      // Store for cached missing persons
      if (!db.objectStoreNames.contains('missing-persons')) {
        const missingStore = db.createObjectStore('missing-persons', { keyPath: '_id' });
        missingStore.createIndex('timestamp', 'timestamp', { unique: false });
      }

      // Store for cached found reports
      if (!db.objectStoreNames.contains('found-reports')) {
        const foundStore = db.createObjectStore('found-reports', { keyPath: '_id' });
        foundStore.createIndex('timestamp', 'timestamp', { unique: false });
      }

      // Store for cached donations
      if (!db.objectStoreNames.contains('donations')) {
        const donationStore = db.createObjectStore('donations', { keyPath: '_id' });
        donationStore.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };
  });
};

// Add pending registration
export const addPendingRegistration = async (data) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('pending-registrations', 'readwrite');
    const store = tx.objectStore('pending-registrations');
    const request = store.add({
      data,
      timestamp: Date.now()
    });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Add pending report
export const addPendingReport = async (reportData) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('pending-reports', 'readwrite');
    const store = tx.objectStore('pending-reports');
    const request = store.add({
      ...reportData,
      timestamp: Date.now()
    });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Get all pending items
export const getPendingItems = async (storeName) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Delete pending item
export const deletePendingItem = async (storeName, id) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

// Cache data
export const cacheData = async (storeName, data) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    
    // Clear existing data first
    store.clear();
    
    // Add new data
    if (Array.isArray(data)) {
      data.forEach(item => {
        store.put({ ...item, timestamp: Date.now() });
      });
    } else {
      store.put({ ...data, timestamp: Date.now() });
    }
    
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
};

// Get cached data
export const getCachedData = async (storeName) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Check if online
export const isOnline = () => {
  return navigator.onLine;
};

// Register sync (if supported)
export const registerSync = async (tag) => {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.sync.register(tag);
      console.log(`Background sync registered: ${tag}`);
    } catch (err) {
      console.log('Background sync registration failed:', err);
    }
  }
};
