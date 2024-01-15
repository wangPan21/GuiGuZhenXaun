//定义权限管理参数的ts类型
//定义全部接口返回数据的ts类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//用户账号信息的ts类型
export interface USer {
  id?: number | string
  createTime: string
  updateTime: string
  username: string
  password: string
  name: string
  phone: null
  roleName: string
}

//数组包含全部的用户信息
export type Records = USer[]

//获取全部用户信息接口返回数据的ts类型
export interface USerResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    pages: number
  }
}
