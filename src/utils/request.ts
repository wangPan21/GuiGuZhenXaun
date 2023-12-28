//axios二次封装
import axios from 'axios'
import { ElMessage } from 'element-plus'
//@ts-ignore
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import useuserStore from '@/store/modules/user'
NProgress.configure({ showSpinner: false })

//利用create方法，创建axios实例,配置基础路径与响应时间
let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, //设置基础路径携带/api
  timeout: 5000, //设置超时的时间
})

//请求拦截器
request.interceptors.request.use((config) => {
  //进度条开始
  NProgress.start()

  //登陆成功后，将token携带给服务器
  let userState = useuserStore()
  if (userState.token) {
    config.headers.token = userState.token
  }
  //返回配置对象
  return config
})

//响应拦截器
request.interceptors.response.use(
  (res) => {
    //成功的回调，关闭进度条，过滤返回的数据
    NProgress.done()
    return res.data
  },
  (error) => {
    let message = ''
    let status = error.response.status
    switch (status) {
      case 400:
        message = '请求错误'
        break
      case 401:
        message = '请求未经授权'
        break
      case 403:
        message = '服务器拒绝提供服务，你无权访问'
        break
      case 404:
        message = '请求路径错误'
        break
      case 500:
        message = '服务器发生错误'
        break
      case 503:
        message = '服务器当前不能处理客户端的请求，一段时间后可能恢复正常'
        break
    }
    //弹出的错误信息
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)

//对外暴漏request
export default request
