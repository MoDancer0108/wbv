import { defineStore } from 'pinia'

export const useStore = defineStore('a', {// 第一个参数是应用程序中 Store 的唯一id
  state: () => {
    return {
      // 所有这些属性都将自动推断其数据类型
      items: [],
      counter: 1,
      name: 'Eduardo',
      isAdmin: true,
    }
  },
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment(num,test1,test2) {
      console.log(num,test1,test2, '我是actions中的代码')
      this.counter++
    },
  }
})