//创建用户小仓库
import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogOut } from '@/api/user/index'
import type {
  loginResponseData,
  loginFormData,
  userResponseData,
} from '@/api/user/type'
import type { UserState } from './dataType/type'
import { SET_TOKEN, GET_TOKEN, DEL_TOKEN } from '@/utils/token'
//创建用户小仓库
let useuserStore = defineStore('User', {
  //小仓库存储数据的地方
  state: (): UserState => {
    return {
      username: '',
      avatar: '',
      token: GET_TOKEN(), //用户唯一标识
    }
  },
  //处理异步逻辑的地方
  actions: {
    // 用户登录请求
    async userLogin(data: loginFormData) {
      //发送登录请求
      let result: loginResponseData = await reqLogin(data)
      if (result.code == 200) {
        //存储token到仓库
        this.token = result.data as string
        //本地持久化存储token
        SET_TOKEN(result.data as string)
        return 'ok'
      } else {
        return Promise.reject(result.data)
      }
    },

    //获取用户信息的方法
    async userInfo() {
      //发送请求
      let result: userResponseData = await reqUserInfo()
      if ((result.code = 200)) {
        //存储用户的头像、姓名
        this.username = result.data.name
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },

    //退出登录
    async delLogin() {
      let result: any = await reqLogOut()
      if (result.code == 200) {
        //清除头像，与名字\token
        this.username = ''
        this.avatar = ''
        this.token = ''
        // 清除token
        DEL_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  //简化仓库数据
  getters: {},
})

//对外暴漏小仓库
export default useuserStore
