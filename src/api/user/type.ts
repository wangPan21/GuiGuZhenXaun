//定义用户相关数据的ts类型
// 用户接口携带参数的ts类型
export interface loginFormData {
  username: string
  password: string
}

//定义全部接口返回的参数的ts类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//定义登录接口返回数据的ts类型
export interface loginResponseData extends ResponseData {
  data: string
}

//定义获取用户信息接口返回数据的ts类型
export interface userResponseData extends ResponseData {
  data: {
    avatar: string
    buttons: string[]
    name: string
    roles: string[]
    routes: string[]
  }
}
