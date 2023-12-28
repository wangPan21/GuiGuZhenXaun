import { path } from 'path'
//@ts-ignore 路由鉴权配置文件
import router from '@/router'
//@ts-ignore
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })
import useuserStore from '@/store/modules/user'
import pinia from './store'
import setting from './setting'
// 全局守卫：项目当中任意路由切换都会触发的钩子

//初始化仓库实例
let userStore = useuserStore(pinia)

//全局 前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  NProgress.start()
  let token = userStore.token
  let username = userStore.username
  document.title = `${setting.title}-${to.meta.title}`
  //已登录
  if (token) {
    if (to.path == '/login') {
      next('/')
    } else {
      //判断有没有用户名，有放行
      if (username) {
        next()
      }
      //没有，仓库发送请求，获取用户名
      else {
        try {
          // 成功，放行
          await userStore.userInfo()
          next()
        } catch (error) {
          //token过期、用户修改本地存储
          await userStore.delLogin()
          //登录后，跳转到原先页面
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  }
  //未登录
  else {
    //访问登录组件，允许
    if (to.path == '/login') {
      next()
    } else {
      //访问其他组件，不允许，先登录
      next('/login')
    }
  }
})

//全局 后置守卫
router.afterEach((to: any, from: any, next: any) => {
  NProgress.done()
})
