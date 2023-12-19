//登录接口 携带 参数ts类型
export interface loginForm{
    username:string,
    password:string
}

//登录接口 返回 数据ts类型
interface dataType{
    token?:string,
    message?:string
}
export interface loginResponseData{
    code:number,
    data:dataType
}

//获取用户信息 返回 数据ts类型
interface userInfo {
    userId: number,
    avatar:string,
    username:string,
    password:string,
    desc:string,
    roles:string[],
    buttons:string[],
    routes:string[],
    token:string
}

interface user{
    checkUser:userInfo
}
export interface userInfoResponseData{
    code:number,
    data:user,
}