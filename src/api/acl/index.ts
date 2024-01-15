import request from '@/utils/request'
import type { USerResponseData } from "./type";
enum API {
  USERALL_URL = '/admin/acl/user/',
}

//获取管理用户分页列表 /admin/acl/user/{page}/{limit}
export const reqUserInfo = (page:number,limit:number)=>request.get<any,USerResponseData>(API.USERALL_URL+`${page}/${limit}`)