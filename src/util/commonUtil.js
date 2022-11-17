export const StorageUtil = {
  getItem: function (keyName) {
    return window.sessionStorage.getItem(keyName);
  },
  setItem: function (key, value) {
    window.sessionStorage.setItem(key, value);
  },
  remove: function (key) {
    window.sessionStorage.removeItem(key);
  }
};
