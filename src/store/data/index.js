import { defineStore } from 'pinia'
import localData from './defaultLocalData.js';

const LOCAL_KEY = 'PERSIST_INDEX';
let LOCAL_DATA;

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
    // 事件中心
    sendEvent() {},
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
    // 数据中心
    getData(key) {
      return JSON.parse(JSON.stringify(this.data))[key];
    },
    setData(key, value) {
      this.data[key] = value;
    },
    // 本地存储数据
    getLocalData(key) {
      return JSON.parse(JSON.stringify(this.localData))[key];
    },
    setLocalData(key, value) {
      const localStorageData = JSON.parse(window.localStorage.getItem(LOCAL_KEY));
      localStorageData[key] = value;
      window.localStorage.setItem(LOCAL_KEY, JSON.stringify(localStorageData));
      this.localData[key] = value;
    },
    // 清空本地存储数据
    clearLocalData() {
      window.localStorage.setItem(LOCAL_KEY, JSON.stringify(result));
      this.localData = JSON.parse(JSON.stringify(result));
    },
  },
});