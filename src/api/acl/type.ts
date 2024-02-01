import { MenuAllList } from './type'
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
  createTime?: string
  updateTime?: string
  username?: string
  password?: string
  name?: string
  phone?: null
  roleName?: string
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

//用户职位的ts类型
export interface RoleData {
  id: number
  createTime: string
  updateTime: string
  roleName: string
  remark: null
}

//用户全部职位的ts类型
export type RoleAll = RoleData[]

//全部接口返回用户职位的ts信息
export interface UserRoleData extends ResponseData {
  data: {
    assignRoles: RoleAll
    allRolesList: RoleAll
  }
}

//已有用户分配角色参数的ts类型
export interface SetRoleData {
  roleIdList: number[]
  userId: number | string
}

//职位数据类型
export interface RolesData {
  id?: number
  createTime?: string
  updateTime?: string
  roleName?: string
  remark?: null
}

//全部职位数据的ts类型
export type ReCords = RolesData[]

//全部职位数据的ts类型
export interface RolesResponseData extends ResponseData {
  data: {
    records: ReCords
    total: number
    size: number
    current: number
    pages: number
  }
}

//菜单与按钮数据的ts类型
export interface MunuData {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: string
  toCode: string
  type: number
  status: null
  level: number
  children?: MenuList
  select: boolean
}

export type MenuList = MunuData[]

//菜单权限与按钮权限数据的ts类型
export interface MenuResponseData extends ResponseData {
  data: MenuList
}

//菜单数据与按钮数据的ts类型
export interface MenuALL {
  id?: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: string
  toCode: null
  type: number
  status: null
  level: number
  children?: MenuAllList
  select: false
}

export type MenuAllList = MenuALL[]

//菜单接口返回的数据类型
export interface MenuAllResponseData extends ResponseData {
  data: MenuAllList
}

//添加与修改携带的参数ts类型
export interface MenuDataList {
  id?: number
  code: string
  level: number
  name: string
  pid: number
}
