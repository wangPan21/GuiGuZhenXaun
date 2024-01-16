import request from '@/utils/request'
import type { USerResponseData, USer } from './type'
enum API {
  USERALL_URL = '/admin/acl/user/',
  USEERADD_URL = '/admin/acl/user/save',
  USEEREDIT_URL = '/admin/acl/user/update',
}

//获取管理用户分页列表 /admin/acl/user/{page}/{limit}
export const reqUserInfo = (page: number, limit: number) =>
  request.get<any, USerResponseData>(API.USERALL_URL + `${page}/${limit}`)

//新增｜添加 用户 /admin/acl/user/save  /admin/acl/user/update
export const reqAddAndEditUser = (data: USer) => {
  //修改用户
  if (data.id) {
    return request.put<any, any>(API.USEEREDIT_URL, data)
  } else {
    //添加用户
    return request.post<any, any>(API.USEERADD_URL, data)
  }
}
