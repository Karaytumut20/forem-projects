// app/utils/localStorageUtils.js

export const setLocalStorageItem = (key, value) => {
    localStorage.setItem(key, value);
  };
  
  export const getLocalStorageItem = (key, defaultValue = '0') => {
    return localStorage.getItem(key) || defaultValue;
  };
  
  export const removeLocalStorageItem = (key) => {
    localStorage.removeItem(key);
  };
  