import request from '@/utils/request'
import type {
  USerResponseData,
  USer,
  UserRoleData,
  SetRoleData,
  RolesResponseData,
  RolesData,
  MenuResponseData,
  MenuAllResponseData,
  MenuDataList,
} from './type'
enum API {
  USERALL_URL = '/admin/acl/user/',
  USEERADD_URL = '/admin/acl/user/save',
  USEEREDIT_URL = '/admin/acl/user/update',
  USERRULE_URL = '/admin/acl/user/toAssign/',
  USERROLE_URL = '/admin/acl/user/doAssignRole',
  DELETEUSER_URL = '/admin/acl/user/remove/',
  DELETESUSER_URL = '/admin/acl/user/batchRemove',
  ROLEALL_URL = '/admin/acl/role/',
  ROLEADD_URL = '/admin/acl/role/save',
  ROLEEDIT_URL = '/admin/acl/role/update',
  DELETEROLE_URL = '/admin/acl/role/remove/',
  ALLROLEMENU_URL = '/admin/acl/permission/toAssign/',
  SELECTROLEMENU_URL = '/admin/acl/permission/doAssign/?',
  ALLMENULIST_URL = '/admin/acl/permission',
  ADDMENU_URL = '/admin/acl/permission/save',
  EDITMENU_URL = '/admin/acl/permission/update',
  DELETEMENU_URL = '/admin/acl/permission/remove/',
}

//获取管理用户分页列表 /admin/acl/user/{page}/{limit}
export const reqUserInfo = (page: number, limit: number, username: string) =>
  request.get<any, USerResponseData>(
    API.USERALL_URL + `${page}/${limit}/?username=${username}`,
  )

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

//获取角色数据 /admin/acl/user/toAssign/{adminId}
export const reqUserRule = (adminId: number) =>
  request.get<any, UserRoleData>(API.USERRULE_URL + `${adminId}`)

//已有用户分配角色  /admin/acl/user/doAssignRole
export const reqDoUserRole = (data: SetRoleData) =>
  request.post<any, any>(API.USERROLE_URL, data)

//删除用户 /admin/acl/user/remove/{id}
export const deleleUser = (id: number) =>
  request.delete<any, any>(API.DELETEUSER_URL + `${id}`)

//批量删除用户 /admin/acl/user/batchRemove
export const delelesUser = (idlist: number[]) =>
  request.delete<any, any>(API.DELETESUSER_URL, { data: idlist })

//获取角色数据 /admin/acl/role/{page}/{limit}
export const reqRoleInfo = (page: number, limit: number, roleName: string) =>
  request.get<any, RolesResponseData>(
    API.ROLEALL_URL + `${page}/${limit}/?roleName=${roleName}`,
  )

//新增｜添加 角色 /admin/acl/role/save /admin/acl/role/update
export const reqAddAndEditRole = (data: RolesData) => {
  //修改角色
  if (data.id) {
    return request.put<any, any>(API.ROLEEDIT_URL, data)
  } else {
    //添加角色
    return request.post<any, any>(API.ROLEADD_URL, data)
  }
}

//删除角色 /admin/acl/role/remove/{id}
export const deleleRole = (id: number) =>
  request.delete<any, any>(API.DELETEROLE_URL + `${id}`)

//获取全部菜单 /admin/acl/permission/toAssign/{roleId}
export const reqRoleMenu = (roleId: number) =>
  request.get<any, MenuResponseData>(API.ALLROLEMENU_URL + roleId)

//职位分配权限 /admin/acl/permission/doAssign
export const reqRoleSelete = (roleId: number, permissionId: number[]) =>
  request.post<any, any>(
    API.SELECTROLEMENU_URL + `roleId=${roleId}&permissionId=${permissionId}`,
  )

//获取菜单 /admin/acl/permission
export const reqMenuList = () =>
  request.get<any, MenuAllResponseData>(API.ALLMENULIST_URL)

//新增 ｜修改 菜单 /admin/acl/permission/save  /admin/acl/permission/update
export const reqAddAndEditMenu = (data: MenuDataList) => {
  if (data.id) {
    return request.put<any, any>(API.EDITMENU_URL, data)
  } else {
    return request.post<any, any>(API.ADDMENU_URL, data)
  }
}

//删除菜单 /admin/acl/permission/remove/{id}
export const deltMenuList = (id:number) => request.delete<any, any>(API.DELETEMENU_URL+`${id}`)
