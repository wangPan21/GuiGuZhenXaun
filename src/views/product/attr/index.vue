<template>
  <div class="stats-container">
    <!-- 头部 -->
    <el-card class="box-cards">
      <el-form :inline="true" style="display: flex;">
        <!-- 一级分类 -->
        <el-form-item label="一级分类">
          <el-select
            placeholder="请选择"
            clearable
            v-model="category1Id"
            @change="reqCategoryone"
            :disabled="showbox == 3"
          >
            <el-option
              v-for="c1 in c1Arr"
              :key="c1.id"
              :label="c1.name"
              :value="c1.id"
            />
          </el-select>
        </el-form-item>

        <!-- 二级分类 -->

        <el-form-item label="二级分类">
          <el-select
            placeholder="请选择"
            clearable
            v-model="category2Id"
            @change="reqCategorytwo"
            :disabled="select1 || showbox == 3"
          >
            <el-option
              v-for="c2 in c2Arr"
              :key="c2.id"
              :label="c2.name"
              :value="c2.id"
            />
          </el-select>
        </el-form-item>

        <!-- 三级分类 -->

        <el-form-item label="三级分类">
          <el-select
            placeholder="请选择"
            clearable
            v-model="category3Id"
            @change="reqCategorythree"
            :disabled="select2 || showbox == 3"
          >
            <el-option
              v-for="c3 in c3Arr"
              :key="c3.id"
              :label="c3.name"
              :value="c3.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 身体 -->

    <!-- 未选中数据展示页面 -->
    <div
      v-show="showbox == 1"
      style="display: flex; justify-content: center; align-items: center"
    >
      <svgIcon name="body" width="500px" height="500px"></svgIcon>
    </div>

    <!-- 选中数据展示页面 -->
    <div v-show="showbox == 2">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <el-button type="primary" :icon="Plus" @click="addAttr">
              添加属性
            </el-button>
          </div>
        </template>
        <div class="tables">
          <!-- 表单主体 -->
          <el-table style="width: 100%" border stripe :data="arrList">
            <el-table-column
              label="序号"
              width="100"
              type="index"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="attrName"
              label="属性名称"
              width="200"
              align="center"
            ></el-table-column>
            <el-table-column label="属性值名称" align="center">
              <template #="{ row, $index }">
                <el-tag
                  type="success"
                  style="margin-left: 5px"
                  v-for="item in row.attrValueList"
                >
                  {{ item.valueName }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="140" align="center">
              <template #="{ row, $index }">
                <!-- 修改按钮的回调 -->
                <el-button
                  type="warning"
                  :icon="Edit"
                  size="small"
                  @click="editt(row)"
                ></el-button>

                <!-- 删除按钮的回调 -->
                <el-popconfirm
                  :title="`删除属性${row.attrName}吗？`"
                  @confirm="deletes(row)"
                >
                  <template #reference>
                    <el-button
                      type="danger"
                      :icon="Delete"
                      size="small"
                    ></el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>

    <!-- 修改和新增展示页面 -->
    <div v-show="showbox == 3" style="margin: 20px 0 0 0">
      <el-card class="box-card">
        <template #header style="display: flex">
          <div style="display: flex; padding-top: 10px">
            <el-form :inline="true" :model="attrParams">
              <el-form-item label="属性名称">
                <el-input
                  placeholder="请输入属性名称"
                  v-model="attrParams.attrName"
                  @blur="toTrim"
                />
              </el-form-item>
            </el-form>
            <el-button
              type="primary"
              :icon="Plus"
              @click="addAttrs"
              :disabled="trims"
            >
              添加属性值
            </el-button>
          </div>
        </template>
        <div class="tables">
          <!-- 表单主体 -->
          <el-table
            style="width: 100%"
            border
            stripe
            :data="attrParams.attrValueList"
          >
            <el-table-column
              label="序号"
              width="100"
              type="index"
              align="center"
            ></el-table-column>
            <el-table-column label="属性值名称" align="center">
              <template #="{ row, $index }">
                <el-input
                  placeholder="请输入属性值名称"
                  v-model="row.valueName"
                  v-if="row.flag"
                  @blur="edits(row, $index)"
                  :ref="(vc: any) => (inputArr[$index] = vc)"
                />
                <div
                  style="margin-left: 10px; text-align-last: left"
                  v-else
                  @click="edits(row, $index)"
                >
                  {{ row.valueName }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="140" align="center">
              <template #="{ row, $index }">
                <el-button
                  type="danger"
                  :icon="Delete"
                  size="small"
                  @click="attrParams.attrValueList.splice($index, 1)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <template #footer>
          <el-button type="primary" @click="submit" :disabled="trims">
            保存
          </el-button>
          <el-button @click="cancel">取消</el-button>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick, reactive } from 'vue'
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import {
  reqGetCategoryone,
  reqGetCategorytwo,
  reqGetCategorythree,
  reqAttrInfoList,
  reqAddOrEditAttr,
  reqDeleteAttr,
} from '@/api/product/index'
import type { CategoryAll, AttrResponseData, Attr } from '@/api/product/type'
import { ElMessage } from 'element-plus'

let category1Id = ref<number>()
let category2Id = ref<number>()
let category3Id = ref<number>()

let copyData = ref<number>()

//控制下拉框2、3级是否禁用
let select1 = ref<boolean>(true)
let select2 = ref<boolean>(true)

//判断属性名称是否为空
let trims = ref<boolean>(true)

//控制主体盒子切换
let showbox = ref<number>(1)

//存储一级分类的数据
let c1Arr = ref<any>([])

//存储二级分类的数据
let c2Arr = ref<any>([])

//存储三级分类的数据
let c3Arr = ref<any>([])

//存储属性分类的数据
let arrList = ref()

//存储对应组件实例el-input
let inputArr = ref<any>([])

//收集新增属性的数据
let attrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3,
})

//拷贝收集的数据
let copyData2 = reactive<Attr>({ ...attrParams })

//组件挂载完毕
onMounted(() => {
  // 获取一级分类的数据
  reqCategory()
})

// 获取一级分类的数据
const reqCategory = async () => {
  let result1: CategoryAll = await reqGetCategoryone()
  if (result1.code == 200) {
    c1Arr.value = result1.data
  }
}

//获取二级分类
const reqCategoryone = async () => {
  //当下拉框发生变化时，清空分类列表的数据
  arrList.value = []
  showbox.value = 1
  //将二三级分类数据清空
  ;(category2Id.value = copyData.value),
    (category3Id.value = copyData.value),
    //一级分类选中后解锁二级分类
    (select1.value = false)
  let result2: CategoryAll = await reqGetCategorytwo(
    category1Id.value as number,
  )
  if (result2.code == 200) {
    c2Arr.value = result2.data
  }
}

//获取三级分类
const reqCategorytwo = async () => {
  //当下拉框发生变化时，清空分类列表的数据
  arrList.value = []
  showbox.value = 1
  //将二三级分类数据清空
  ;(category3Id.value = copyData.value),
    //二级分类选中后解锁三级分类
    (select2.value = false)
  let result3: CategoryAll = await reqGetCategorythree(
    category2Id.value as number,
  )
  if (result3.code == 200) {
    c3Arr.value = result3.data
  }
}

//获取分类列表详情
const reqCategorythree = async () => {
  //当下拉框发生变化时，清空分类列表的数据
  arrList.value = []
  showbox.value = 1
  //@ts-ignore
  let result4: AttrResponseData = await reqAttrInfoList(
    category1Id.value,
    category2Id.value,
    category3Id.value,
  )
  if (result4.code == 200) {
    arrList.value = result4.data
    nextTick(() => {
      showbox.value = 2
    })
  }
}

//新增按钮的回调
const addAttr = async () => {
  // 清空数据
  reset()
  //切换场景
  showbox.value = 3
  //@ts-ignore
  attrParams.categoryId = category3Id.value
}

//修改按钮的回调
const editt = (row: any) => {
  //赋值,(深拷贝)
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
  //切换场景
  showbox.value = 3
}

//删除按钮的回调
const deletes = async (row: any) => {
  let result6: any = await reqDeleteAttr(row.id)
  if (result6.code == 200) {
    //刷新页面
    reqCategorythree()
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
  }
}

//添加属性按钮的回调
const addAttrs = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true,
  })
  //获取最后一个el-input组件聚焦
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}

//保存按钮的回调
const submit = async () => {
  let result5: any = await reqAddOrEditAttr(attrParams)
  if (result5.code == 200) {
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '新增成功',
    })
    //切换为场景2
    showbox.value = 2
    //刷新页面
    reqCategorythree()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '新增失败',
    })
  }
}

//取消按钮的回调
const cancel = () => {
  // 切换为场景2
  showbox.value = 2
}

//重置方法
const reset = () => {
  Object.assign(attrParams, copyData2)
}

//切换input输入框
const edits = (row: any, $index: number) => {
  //非法情况判断
  if (row.valueName.trim() == '') {
    //剔除空白的值
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值名称不能为空',
    })
  } else {
    let repeat = attrParams.attrValueList.find((item: any) => {
      if (item != row) {
        return item.valueName === row.valueName
      }
    })
    if (repeat) {
      //剔除重复的值
      attrParams.attrValueList.splice($index, 1)
      ElMessage({
        type: 'error',
        message: '属性值名称不能重复',
      })
    }
    row.flag = !row.flag
    nextTick(() => {
      //自动聚焦
      inputArr.value[$index].focus()
    })
  }
}

//属性名称是否为空
const toTrim = () => {
  if (attrParams.attrName.trim() == '') {
  } else {
    trims.value = false
  }
}
</script>
<script lang="ts">
export default {
  name: 'attr',
}
</script>
<style lang="scss" scoped>
.stats-container {
  .box-card {
    margin-top: 20px;
  }
}
</style>
