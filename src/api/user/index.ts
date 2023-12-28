//用户接口管理
import request from '@/utils/request'
import type { loginFormData,loginResponseData,userResponseData } from './type'
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL='/admin/acl/index/logout'
}

//登录接口
export const reqLogin = (data: loginFormData) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)

//获取用户信息接口
export const reqUserInfo = () => request.get<any, userResponseData>(API.USERINFO_URL)

//退出登录的接口
export const reqLogOut = () =>request.post<any,any>(API.LOGOUT_URL);