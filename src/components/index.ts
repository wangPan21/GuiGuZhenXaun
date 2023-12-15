//引入项目中全部的全局组件
import SvgIcon from './SvgIcon/index.vue'

//全局对象
const allmoduls = { SvgIcon };

//对外暴漏插件对象
export default {
    //@ts-ignore
  install(app) {
    //注册项目全部的全局组件
    Object.keys(allmoduls).forEach((key) => {
      //@ts-ignore 注册为全局组件
      app.component(key, allmoduls[key]);
    })
  },
}
