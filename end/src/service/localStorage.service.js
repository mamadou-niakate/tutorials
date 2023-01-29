class LocalStorageService {
  constructor() {
    this.storage = window.localStorage;
  }

  set(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  get(key) {
    return JSON.parse(this.storage.getItem(key));
  }

  remove(key) {
    this.storage.removeItem(key);
  }

  clearAll() {
    this.storage.clear();
  }
}

const localStorageService = new LocalStorageService();
export default localStorageService;
