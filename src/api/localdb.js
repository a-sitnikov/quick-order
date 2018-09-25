class LocalDB {

  constructor() {
    this.initialize();
  }

  initialize = async () => {
    let request = indexedDB.open('local', 2, this.handleUpgrade);
    request.onupgradeneeded = this.handleUpgrade;
    request.onsuccess = event => {
      this.db = request.result;
    }
  }

  handleUpgrade = (event) => {

    let upgradeDb = event.target.result;

    if (!upgradeDb.objectStoreNames.contains('items')) {
      upgradeDb.createObjectStore('items', { keyPath: 'guid' });
    }
    if (!upgradeDb.objectStoreNames.contains('groups')) {
      upgradeDb.createObjectStore('groups', { keyPath: 'guid' });
    }
    if (!upgradeDb.objectStoreNames.contains('cart')) {
      upgradeDb.createObjectStore('cart', { keyPath: 'guid' });
    }
  }

  saveTable = async (name, array) => {

    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(name, 'readwrite');
      const table = tx.objectStore(name);
      const request = table.clear();
      request.onsuccess = () => {
        array.forEach(val => table.add(val));
        resolve();
      }
    });
  }

  getTable = async (name) => {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(name, 'readonly');
      const table = tx.objectStore(name);
      const request = table.getAll();
      request.onsuccess = (event) => {
        resolve(event.target.result);
      }
      request.onerror = error => {
        reject(error);
      }
    })
  }

  saveCatalog = async (items, groups) => {
    await this.saveTable('items', items);
    await this.saveTable('groups', groups);
  }

  getCatalog = async () => {

    const [items, groups] = await Promise.all([
      this.getTable('items'),
      this.getTable('groups'),
    ]);

    return {
      items,
      groups
    }

  }

  getCart = async () => {
    return this.getTable('cart');
  }

  addToCart = async (cartItem) => {
    
    return new Promise((resolve, reject) => {

      const tx = this.db.transaction('cart', 'readwrite');
      const table = tx.objectStore('cart');
      const request = table.put(cartItem);
      request.onsuccess = (event) => {
        resolve();
      }
      request.onerror = error => {
        reject(error);
      }
    });  
  }

}

export default LocalDB;