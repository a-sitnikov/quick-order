class LocalDB {

  constructor() {
    this.initialize();
  }

  initialize = async () => {
    let request = indexedDB.open('local', 1, this.handleUpgrade); 
    request.onupgradeneeded = this.handleUpgrade;
    request.onsuccess = event => {
      this.db = request.result;
    }
  }

  handleUpgrade = (event) => {

    let upgradeDb = event.target.result;

    if (!upgradeDb.objectStoreNames.contains('items')) {
      upgradeDb.createObjectStore('items', {keyPath: 'guid'});
    }   
    if (!upgradeDb.objectStoreNames.contains('groups')) {
      upgradeDb.createObjectStore('groups', {keyPath: 'guid'});
    }   
  }

  getCatalog = async () => {

  }

  saveTable = (name, array) => {
    let tx = this.db.transaction(name, 'readwrite');
    let table = tx.objectStore(name);
    table.clear();
    table.onsuccess = () => {
      array.forEach(val => table.add(val));
    }  
  }

  saveCatalog = async (items, groups) => {
    this.saveTable('items', items);
    this.saveTable('groups', groups);
  }  
}

export default LocalDB;