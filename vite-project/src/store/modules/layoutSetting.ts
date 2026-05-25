import { defineStore } from 'pinia'

//定义layout设置仓库
export default defineStore('LayoutSetting', {
  state: () => ({
    //是否折叠
    fold: false,
  }),
  actions: {
    //切换折叠状态
    toggleFold() {
      this.fold = !this.fold
    }
  }
})
