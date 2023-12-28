//@ts-ignore
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from './router'

//创建路由实例,配置路由
let router = createRouter({
  //路由模式hash
  history: createWebHashHistory(),
  //路由对象
  routes: constantRoute,
  //滚动行为
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
    }
  },
})

//对外暴漏路由
export default router
