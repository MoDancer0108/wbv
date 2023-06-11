import { defineStore } from 'pinia'

export const useStore = defineStore('data', {// 第一个参数是应用程序中 Store 的唯一id
  state: () => {
    return {
      // 所有这些属性都将自动推断其数据类型
      data: {},
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
  }
})