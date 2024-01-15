<template>
  <div>
    <el-card class="box-card">
      <div class="tables">
        <el-form label-width="80px">
          <el-form-item label="sku名称">
            <el-input placeholder="请输入sku名称" v-model="SkuParams.skuName" />
          </el-form-item>
          <el-form-item label="价格(元)">
            <el-input placeholder="请输入sku价格" v-model="SkuParams.price" />
          </el-form-item>
          <el-form-item label="重量(g)">
            <el-input placeholder="请输入sku重量" v-model="SkuParams.weight" />
          </el-form-item>
          <el-form-item label="sku描述">
            <el-input
              type="textarea"
              placeholder="请输入sku描述"
              v-model="SkuParams.skuDesc"
            />
          </el-form-item>
          <el-form-item label="平台属性">
            <el-form :inline="true">
              <el-form-item
                v-for="item1 in attrInfoList"
                :key="item1.id"
                :label="item1.attrName"
                style="margin-bottom: 10px"
              >
                <el-select
                  placeholder="请选择"
                  v-model="item1.attrIdAndValueId"
                >
                  <el-option
                    v-for="items1 in item1.attrValueList"
                    :key="items1.id"
                    :label="items1.valueName"
                    :value="`${item1.id}:${items1.id}`"
                  />
                </el-select>
              </el-form-item>
            </el-form>
          </el-form-item>
          <el-form-item label="销售属性">
            <el-form>
              <el-form-item
                :label="item2.saleAttrName"
                v-for="item2 in spuSale"
                :key="item2.id"
              >
                <el-select
                  placeholder="请选择"
                  v-model="item2.SaleIdAndValueId"
                >
                  <el-option
                    v-for="items2 in item2.spuSaleAttrValueList"
                    :key="items2.id"
                    :label="items2.saleAttrValueName"
                    :value="`${item2.id}:${items2.id}`"
                  />
                </el-select>
              </el-form-item>
            </el-form>
          </el-form-item>
          <el-form-item label="图片名称">
            <el-table
              style="width: 100%"
              table-layout="auto"
              :data="spuImage"
              ref="table"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column label="图片" width="200">
                <template #="{ row, $index }">
                  <img
                    :src="row.imgUrl"
                    alt=""
                    style="width: 100px; height: 100px"
                  />
                </template>
              </el-table-column>
              <el-table-column
                property="name"
                label="名称"
                width="220"
                prop="imgName"
              />
              <el-table-column
                property="address"
                label="操作"
                show-overflow-tooltip
              >
                <template #="{ row, $index }">
                  <el-button
                    type="primary"
                    size="small"
                    v-if="show"
                    @click="defaultButton(row)"
                  >
                    设置默认
                  </el-button>
                  <el-button
                    type="success"
                    size="small"
                    v-else
                    @click="defaultButton(row)"
                  >
                    已默认
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button @click="clear">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import {
  reqAttrInfoList,
  reqSpuImage,
  reqSpuSale,
  reqAddSkuInfo,
} from '@/api/product/index'
import type { SkuData } from '@/api/product/type'
import { ElMessage } from 'element-plus'
//向父组件传值
let $emit = defineEmits(['change'])

//平台属性数据存储
let attrInfoList = ref<any>([])

//销售属性数据存储
let spuSale = ref<any>([])

//照片墙数据存储
let spuImage = ref<any>([])

//控制按钮的显示与隐藏
let show = ref<boolean>(true)

//照片墙组件实例初始化
let table = ref()

//收集Sku的参数
let SkuParams = reactive<SkuData>({
  //父组件传递的数据
  category3Id: '',
  spuId: '',
  tmId: '',
  //v-model收集的数据
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',
  skuAttrValueList: [{}],
  skuSaleAttrValueList: [{}],
  skuDefaultImg: '',
})

//保存按钮的回调
const onSubmit = async () => {
  //整理平台参数
  SkuParams.skuAttrValueList = attrInfoList.value.reduce(
    (prev: any, next: any) => {
      if (next.attrIdAndValueId) {
        let [attrId, valueId] = next.attrIdAndValueId.split(':')
        prev.push({
          attrId,
          valueId,
        })
      }
      return prev
    },
    [],
  )

  //整理销售参数
  SkuParams.skuSaleAttrValueList = spuSale.value.reduce(
    (prev: any, next: any) => {
      if (next.SaleIdAndValueId) {
        let [attrId, valueId] = next.SaleIdAndValueId.split(':')
        prev.push({
          attrId,
          valueId,
        })
      }
      return prev
    },
    [],
  )

  //发送请求
  let result = await reqAddSkuInfo(SkuParams)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: 'SKU添加成功',
    })
  } else {
    ElMessage({
      type: 'error',
      message: 'SKU添加失败',
    })
  }
  //通知父组件切换场景
  $emit('change', 1)
}

//取消按钮的回调
const clear = () => {
  //通知父组件切换场景
  $emit('change', 1)
}

//获取数据
const initSkuData = async (a: any, b: any, c: any) => {
  //收集数据
  SkuParams.category3Id = c.category3Id
  SkuParams.spuId = c.id
  SkuParams.tmId = c.tmId
  //获取平台属性
  let result: any = await reqAttrInfoList(a.value, b.value, c.category3Id)
  //获取销售属性
  let result1: any = await reqSpuSale(c.id)
  //获取照片墙的数据
  let result2: any = await reqSpuImage(c.id)
  //存储平台属性
  attrInfoList.value = result.data
  //存储销售属性
  spuSale.value = result1.data
  //存储照片墙数据
  spuImage.value = result2.data
}

//点击切换按钮的回调
const defaultButton = (row: any) => {
  //遍历所有的图片，使toggleRowSelection为false
  spuImage.value.forEach((item: any) => {
    table.value.toggleRowSelection(item, false)
  })
  //点击复选框选中
  table.value.toggleRowSelection(row, true)
  //收集图片地址
  SkuParams.skuDefaultImg = row.imgUrl
  show.value = !show.value
  console.log(table.value)
}

//暴漏自定义事件方法
defineExpose({ initSkuData })
</script>
<script lang="ts">
export default {
  name: 'skuform',
}
</script>

<style lang="scss" scoped>
.box-card {
  margin-top: 20px;
}
</style>
