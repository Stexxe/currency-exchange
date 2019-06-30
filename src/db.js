const DB_NAME = 'database';
const STORE = 'currencies';

const getStore = () => {
  return new Promise((resolve, reject) => {
    const openRequest = window.indexedDB.open(DB_NAME, 1);

    openRequest.onsuccess = e => {
      const db = e.target.result;
      const store = db.transaction(STORE, 'readwrite').objectStore(STORE);
      resolve(store);

      store.transaction.onerror = reject;
    };

    openRequest.onerror = reject;
  });
};

export const fetchCurrencies = () => {
  return getStore().then(store => {
    return new Promise((resolve, reject) => {
      const request = store.index('name').openCursor(null, 'next');
      let result = [];

      request.onsuccess = e => {
        const cursor = e.target.result;

        if (cursor && cursor.value) {
          result.push(cursor.value);
          cursor.continue();
        } else {
          resolve(result);
        }
      };

      request.onerror = reject;
    });
  });
};

const saveCurrencies = (currencies, store) => {
  store.clear();
  currencies.forEach(currency => store.add(currency));
  return currencies;
};

export const updateCurrencies = currencies => {
  return new Promise((resolve, reject) => {
    const openRequest = window.indexedDB.open(DB_NAME, 1);

    openRequest.onupgradeneeded = e => {
      const db = e.target.result;
      const store = db.createObjectStore(STORE, {keyPath: 'code'});
      store.createIndex('name', 'name', {unique: false});

      store.transaction.onerror = reject;

      store.transaction.oncomplete = () => {
        const currenciesStore = db.transaction(STORE, 'readwrite').objectStore(STORE);
        resolve(saveCurrencies(currencies, currenciesStore));
      };
    };

    openRequest.onsuccess = e => {
      const db = e.target.result;
      const store = db.transaction(STORE, 'readwrite').objectStore(STORE);
      store.transaction.onerror = reject;

      resolve(saveCurrencies(currencies, store));
    };

    openRequest.onerror = reject;
  });
};