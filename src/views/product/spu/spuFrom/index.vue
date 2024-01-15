<template>
  <div>
    <el-card class="box-card">
      <div class="tables">
        <el-form label-width="100px">
          <el-form-item label="spu名称">
            <el-input placeholder="请输入spu名称" v-model="SpuParams.spuName" />
          </el-form-item>
          <el-form-item label="spu品牌">
            <el-select placeholder="请选择spu品牌" v-model="SpuParams.tmId">
              <el-option
                v-for="(item, index) in spuAttr"
                :key="item.id"
                :label="item.tmName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="spu描述">
            <el-input
              type="textarea"
              placeholder="请输入spu描述"
              v-model="SpuParams.description"
            />
          </el-form-item>
          <el-form-item label="spu照片">
            <el-upload
              v-model:file-list="spuImage"
              action="/api/admin/product/fileUpload"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <el-icon>
                <Plus />
              </el-icon>
            </el-upload>

            <el-dialog v-model="dialogVisible">
              <img
                :src="dialogImageUrl"
                alt="Preview Image"
                style="width: 100%; height: 100%"
              />
            </el-dialog>
          </el-form-item>
          <el-form-item label="spu销售属性">
            <el-select
              :placeholder="`还有${unSelectSaleAttr.length}个未选中`"
              v-model="unspuSales"
            >
              <el-option
                v-for="(item, index) in unSelectSaleAttr"
                :key="item.id"
                :label="item.name"
                :value="`${item.id}|${item.name}`"
              />
            </el-select>
            <el-button
              type="primary"
              :icon="Plus"
              style="margin-left: 10px"
              :disabled="
                unSelectSaleAttr.length == 0 || unspuSales == undefined
              "
              @click="addSpuSales"
            >
              添加属性
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-table border :data="spuSales">
              <el-table-column
                type="index"
                label="序号"
                width="80"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="saleAttrName"
                label="属性名"
                width="120"
                align="center"
              ></el-table-column>
              <el-table-column label="属性值" align="center">
                <template #="{ row, $index }">
                  <el-tag
                    type="success"
                    @close="row.spuSaleAttrValueList.splice($index, 1)"
                    v-for="item in row.spuSaleAttrValueList"
                    :key="item.id"
                    closable
                    style="margin-right: 5px"
                  >
                    {{ item.saleAttrValueName }}
                  </el-tag>
                  <el-input
                    @blur="toLook(row)"
                    v-model="row.saleAttrValue"
                    v-if="row.flag == true"
                    placeholder="请你输入属性值"
                    size="small"
                    style="width: 20%"
                  ></el-input>
                  <el-button
                    v-else
                    type="success"
                    size="small"
                    :icon="Plus"
                    @click="addTag(row, $index)"
                  ></el-button>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120" align="center">
                <template #="{ row, $index }">
                  <el-button
                    type="danger"
                    size="small"
                    :icon="Delete"
                    @click="spuSales.splice($index, 1)"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
              :disabled="spuSales.length > 0 ? false : true"
            >
              保存
            </el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import {
  reqSpuListAll,
  reqSpuImage,
  reqSpuSale,
  reqSpuLists,
  reqAddOrEditList,
} from '@/api/product/index'
import type {
  SPUData,
  ALLTradeMarkSPU,
  ALLSpuImage,
  ALLSpuSaLes,
  ALLSpuSaLess,
  TradeMarkSPU,
  SpuImg,
  SpuSaLes,
  SpuSaLess,
  SpuSaLe,
} from '@/api/product/type'
import { Plus, Delete } from '@element-plus/icons-vue'
import { ElMessage, type UploadProps } from 'element-plus'

let $emit = defineEmits(['change'])

//spu品牌数据存储
let spuAttr = ref<TradeMarkSPU[]>([])

//spu图片数据存储
let spuImage = ref<SpuImg[]>([])

//spu全部销售属性数据存储
let spuSaless = ref<SpuSaLess[]>([])

//spu已有销售属性数据存储
let spuSales = ref<SpuSaLes[]>([])

//存储未选中的销售属性
let unspuSales = ref<string>()

//存储已有的spu对象
let SpuParams = ref<SPUData>({
  category3Id: '', //三级分类的id
  spuName: '', //spu的名字
  tmId: 0, //品牌的id
  description: '', //spu的描述
  spuImageList: [], //照片墙
  spuSaleAttrList: [], //销售属性
})

//拷贝数据
let copyData = ref<SPUData>({
  category3Id: '', //三级分类的id
  spuName: '', //spu的名字
  tmId: 0, //品牌的id
  description: '', //spu的描述
  spuImageList: [], //照片墙
  spuSaleAttrList: [], //销售属性
})

//控制预览照片显示与隐藏
let dialogVisible = ref<boolean>(false)

//存储预览图片的路径
let dialogImageUrl = ref('')

// 获取数据
const getData = async (data: SPUData) => {
  SpuParams.value = data
  //获取全部品牌的数据
  let result: ALLTradeMarkSPU = await reqSpuListAll()
  // 获取spu照片
  let result1: ALLSpuImage = await reqSpuImage(data.id as number)
  //获取销售属性下拉框数据
  let result2: ALLSpuSaLess = await reqSpuLists()
  //获取销售属性
  let result3: ALLSpuSaLes = await reqSpuSale(data.id as number)
  //存储全部品牌的数据
  spuAttr.value = result.data
  //@ts-ignore存储全部品牌图片的数据
  spuImage.value = result1.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
  //存储全部销售属性的数据
  spuSaless.value = result2.data
  //存储销售属性的数据
  spuSales.value = result3.data
}

//保存按钮的回调
const onSubmit = async () => {
  //整理带给服务器的参数
  //照片墙的数据
  SpuParams.value.spuImageList = spuImage.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url,
    }
  })
  //整理销售属性数据
  SpuParams.value.spuSaleAttrList = spuSales.value
  //发送请求：添加|更新spu
  let result4 = await reqAddOrEditList(SpuParams.value)
  if (result4.code == 200) {
    ElMessage({
      type: 'success',
      message: SpuParams.value.id ? '修改成功' : '添加成功',
    })
    //通知父组件返回场景1
    $emit('change', 1)
  } else {
    ElMessage({
      type: 'error',
      message: SpuParams.value.id ? '修改失败' : '添加失败',
    })
    //通知父组件返回场景1
    $emit('change', 1)
  }
}

//取消按钮的回调
const cancel = () => {
  $emit('change', 1)
}

//照片预览的回调
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

//删除照片的回调
const handleRemove: UploadProps['onRemove'] = () => {
  ElMessage({
    type: 'success',
    message: '图片删除成功',
  })
}

//计算当前spu还未选中的销售属性
let unSelectSaleAttr: any = computed(() => {
  //过滤出未选中的销售属性，遍历全部的销售属性
  let unSelect = spuSaless.value.filter((item) => {
    //测试对比属性名，返回值为true是值
    return spuSales.value.every((item1) => {
      //条件不等于则为true返回值为true的值（未选中的销售属性）
      return item.name != item1.saleAttrName
    })
  })
  return unSelect
})

//添加属性按钮的回调
const addSpuSales = () => {
  //@ts-ignore
  const [baseSaleAttrId, saleAttrName] = unspuSales.value.split('|')
  //添加销售属性
  let newSpuSales: SpuSaLes = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  //追加一个销售属性
  spuSales.value.push(newSpuSales)
  //清空未选择的销售属性
  unspuSales.value = ''
}

//属性值按钮的回调
const addTag = (row: SpuSaLes) => {
  row.flag = true
  row.saleAttrValue = ''
}

//表单失去焦点的回调
const toLook = (row: SpuSaLes) => {
  row.flag = false
  // 整理收集的属性的ID与属性值的名字
  const { baseSaleAttrId, saleAttrValue } = row
  //整理服务器需要的属性值形式
  let newSaleAttrValue: SpuSaLe = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  }
  //判断saleAttrValue是否为空
  if (saleAttrValue?.trim() == '') {
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    return
  }

  //判断saleAttrValue是否重复
  let repeat = row.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName == saleAttrValue
  })
  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    return
  }
  //添加新的属性值
  row.spuSaleAttrValueList.push(newSaleAttrValue)
}

//添加一个新的spu方法
const addSpu = async (id: number | string) => {
  //清空数据
  restt()
  //存储三级分类的ID
  SpuParams.value.category3Id = id
  //获取全部品牌的数据
  let result: ALLTradeMarkSPU = await reqSpuListAll()
  //获取销售属性下拉框数据
  let result2: ALLSpuSaLess = await reqSpuLists()
  //存储全部品牌的数据
  spuAttr.value = result.data
  //存储全部销售属性的数据
  spuSaless.value = result2.data
}

//重置数据方法的回调
const restt = () => {
  Object.assign(SpuParams.value, copyData.value)
  spuImage.value = []
  spuSales.value = []
}

//对外暴漏
defineExpose({ getData, addSpu })
</script>
<script lang="ts">
export default {
  name: 'spuFrom',
}
</script>
<style lang="scss" scoped>
.box-card {
  margin-top: 20px;
}
</style>
