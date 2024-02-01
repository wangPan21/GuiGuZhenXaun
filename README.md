p 139

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

//计算当前spu还未选中的销售属性
let unSelectSaleAttr: any = computed(() => {
//过滤出未选中的销售属性，遍历全部的销售属性
let unSelect = spuSaless.value.filter(item => {
//测试对比属性名，返回值为true是值
return spuSales.value.every(item1 => {
//条件不等于则为true返回值为true的值（未选中的销售属性）
return item.name != item1.saleAttrName;
});
})
return unSelect;
})

    //整理销售参数
    SkuParams.skuSaleAttrValueList  = spuSale.value.reduce((prev: any, next: any) => {
    if (next.SaleIdAndValueId) {
      let [attrId, valueId] = next.SaleIdAndValueId.split(':')
      prev.push({
        attrId, valueId
      })
    }
    return prev

}, [])

//浏览器自动刷新一次
window.location.reload()

//合并数组
let permissionId = arr.concat(arr1)

//过滤menuArr的数据
const filtersSelectArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    //遍历数据，判断select是否为真，且level是4级
    if (item.select && item.level == 4) {
      //真，存储id
      initArr.push(item.id)
    }
    //判断是否存在children且children数组的长度必须大于0
    if (item.children && item.children.length > 0) {
      //真，递归调用filtersSelectArr方法遍历筛选数据
      filtersSelectArr(item.children, initArr)
    }
  });
  return initArr;
}