//封装 判断时间函数
export const getTime = () => {
  let hours = new Date().getHours()
  let message = ''
  if (hours <= 9) {
    message = '早上好'
  } else if (hours <= 12) {
    message = '中午好'
  } else if (hours <= 18) {
    message = '下午好'
  } else {
    message = '晚上好'
  }
  return message
}
