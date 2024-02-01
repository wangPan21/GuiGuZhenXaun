import { createApp } from 'vue'
import App from '@/App.vue'
//引入element-plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//SVG插件需要的配置代码
import 'virtual:svg-icons-register'
//注册全局组件
import totalModule from '@/components'
//引入scss样式
import '@/style/index.scss'
//引入路由
import router from './router'
//引入仓库
import pinia from './store'
//引入路由鉴权配置文件
import './permisstion'
//暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
//获取应用实例对象
const app = createApp(App)

//安装element-plus插件
app.use(ElementPlus, {
  locale: zhCn,
})

//使用全局组件
app.use(totalModule)

//注册模版路由
app.use(router)

//注册仓库
app.use(pinia)

//将应用挂载到挂载点上
app.mount('#app')
