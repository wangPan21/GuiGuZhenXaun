import { defineStore } from 'pinia'

let useLayOutStore = defineStore('layout', {
  state: () => {
    return {
      fold: false, //控制菜单是否折叠
      refash: false, //控制按钮刷新
    }
  },
  actions: {},
  getters: {},
})

export default useLayOutStore
