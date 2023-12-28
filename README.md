p 82  5:10

//点击全屏图标的方法
const fullScreen = () => {
//DOM对象的一个属性，判断当前窗口是否为全屏，是为true，反之
let full = document.fullscreenElement;
//切换为全屏
if (!full) {
//文档根节点方法 requestFullscreen ，实现全屏模式
document.documentElement.requestFullscreen();
} else {
// 当前窗口为全屏，则退出全屏模式
document.exitFullscreen();
}
}


//清空数据
const clear = () => {
  trademarkInfo.id = 0;
  //清除表单验证信息,?有就调用，没有就不调用
  refFrom.value?.clearValidate();
  Object.assign(trademarkInfo, copyData)
}


//切换input输入框
const edits = (row: any, $index: number) => {
  //非法情况判断
  if (row.valueName.trim() == '') {
    //剔除空白的值
    attrParams.attrValueList.splice($index, 1);
    ElMessage({
      type: 'error',
      message: '属性值名称不能为空'
    })
  } else {
    let repeat = attrParams.attrValueList.find((item: any) => {
      if (item != row) {
        return item.valueName === row.valueName;
      }
    })
    if (repeat) {
      //剔除重复的值
      attrParams.attrValueList.splice($index, 1);
      ElMessage({
        type: 'error',
        message: '属性值名称不能重复'
      })
    }
    row.flag = !row.flag
    nextTick(() => {
      //自动聚焦
      inputArr.value[$index].focus();
    })
  }
}

  //赋值,(深拷贝)
  Object.assign(attrParams,JSON.parse(JSON.stringify(row)));