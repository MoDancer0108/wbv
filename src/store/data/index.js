import { defineStore } from 'pinia'
import localData from './defaultLocalData.js';

const LOCAL_KEY = 'PERSIST_INDEX';
let LOCAL_DATA;

(() => {
  const localStorageData = JSON.parse(window.localStorage.getItem(LOCAL_KEY));
  // init初始值
  const result = {};
  const initValue = {
    Number: 0,
    String: '',
    Array: [],
    Object: {},
    Boolean: false,
  };
  Object.keys(localData).forEach(key => {
    const type = localData[key];
    if (Object.keys(initValue).indexOf(type) > -1) {
      result[key] = initValue[type];
    }
  });
  if (!localStorageData || JSON.stringify(localStorageData) === '{}') {
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(result));
  }
  // 已有的本地存储覆盖初始值
  LOCAL_DATA = {
    ...result,
    ...(localStorageData || {}),
  };
  
  console.log(`${LOCAL_KEY} %cinitDone`, 'color: #43bb88;');
})();

export const useStore = defineStore('data', {
  state: () => {
    return {
      data: {},
      // 将本地存储存到store中 就能是响应式的
      localData: LOCAL_DATA,
    }
  },
  getters: {
    // double: (state) => state.num * 2,
  },
  actions: {
    sendEvent(event, payload) {
      // console.log(payload, '我是actions中的代码')
    },
    onEvent(_event, callback) {
      this.$onAction(({
          name,
          args: [event, payload],
        }) => {
          if (name == 'sendEvent' && event == _event) {
            callback(payload);
          }
        }
      );
    },

    getData(key) {
      return this.data[key];
    },
    setData(key, value) {
      this.data[key] = value;
    },

    getLocalData(key) {
      return this.localData[key];
    },
    setLocalData(key, value) {
      const localStorageData = JSON.parse(window.localStorage.getItem(LOCAL_KEY));
      localStorageData[key] = value;
      window.localStorage.setItem(LOCAL_KEY, JSON.stringify(localStorageData));
      this.localData[key] = value;
    },
  },
});