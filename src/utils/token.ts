//封装本地存储数据与读取数据的方法

//存储数据
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}

//读取数据
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}

//删除数据
export const DEL_TOKEN = () => {
  return localStorage.removeItem('TOKEN')
}
