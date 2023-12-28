<template>
  <div class="spu-container">
    <!-- 三级分类 -->
    <el-card class="box-cards">
      <el-form :inline="true">
        <!-- 一级分类 -->
        <el-form-item label="一级分类">
          <el-select placeholder="请选择" clearable v-model="category1Id" @change="reqCategoryone" :disabled="showbox == 2">
            <el-option v-for="c1 in c1Spu" :key="c1.id" :label="c1.name" :value="c1.id" />
          </el-select>
        </el-form-item>

        <!-- 二级分类 -->

        <el-form-item label="二级分类">
          <el-select placeholder="请选择" clearable v-model="category2Id" @change="reqCategorytwo"
            :disabled="select1 || showbox == 2">
            <el-option v-for="c2 in c2Spu" :key="c2.id" :label="c2.name" :value="c2.id" />
          </el-select>
        </el-form-item>

        <!-- 三级分类 -->

        <el-form-item label="三级分类">
          <el-select placeholder="请选择" clearable v-model="category3Id" @change="reqCategorythree"
            :disabled="select2 || showbox == 2">
            <el-option v-for="c3 in c3Spu" :key="c3.id" :label="c3.name" :value="c3.id" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 数据展示 -->
    <el-card class="box-card" v-show="showbox == 1">
      <template #header>
        <div class="card-header">
          <el-button type="primary" :icon="Plus" @click="pushSpu" :disabled="trims">添加SPU</el-button>
        </div>
      </template>
      <!-- 表单主体 -->
      <div class="tables">
        <el-table style="width: 100%" border stripe :data="spuList">
          <el-table-column label="序号" width="80" type="index" align="center"></el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="180" align="center"></el-table-column>
          <el-table-column prop="description" label="SPU描述" align="center"></el-table-column>
          <el-table-column label="操作" width="220" align="center">
            <template #="{ row, $index }">
              <!-- 添加按钮 -->
              <el-button type="primary" :icon="Plus" size="small" @click="addSpu(row)"> </el-button>

              <!-- 修改按钮 -->
              <el-button type="warning" :icon="Edit" size="small" @click="editSpu(row)"> </el-button>

              <!-- 详情按钮 -->
              <el-button type="info" :icon="Warning" size="small" @click="infoSpu(row)"> </el-button>

              <!-- 删除按钮 -->
              <el-popconfirm :title="`删除属性${row.attrName}吗？`" @confirm="deletes(row)">
                <template #reference>
                  <el-button type="danger" :icon="Delete" size="small"> </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页器 -->
      <template #footer>

        <!-- 分页器   -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[9, 10, 15, 20]"
          :background="true" layout=" prev, pager, next,jumper,->,sizes,total" :total="total"
          @current-change="handleCurrentChange" @size-change="handleSizeChange" />
      </template>
    </el-card>

    <!-- spu数据修改与新增 -->
    <spuFrom v-show="showbox == 2" @change="change" ref="spu"></spuFrom>

    <!-- sku数据修改与新增 -->
    <skuFrom v-show="showbox == 3"></skuFrom>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { reqGetCategoryone, reqGetCategorytwo, reqGetCategorythree, reqSpuList } from "@/api/product/index";
import type { CategoryAll, HasSpuResponseData, SPUData} from "@/api/product/type";
import { Plus, Edit, Warning, Delete } from "@element-plus/icons-vue";
import spuFrom from "@/views/product/spu/spuFrom/index.vue";
import skuFrom from "@/views/product/spu/skuFrom/index.vue";
// import { ElMessage } from "element-plus";

let category1Id = ref<number>()
let category2Id = ref<number>()
let category3Id = ref<number>()

let copyData = ref<number>()

//控制下拉框2、3级是否禁用
let select1 = ref<boolean>(true)
let select2 = ref<boolean>(true)

//控制主体盒子切换
let showbox = ref<number>(1)

//控制spu是否禁用
let trims = ref<boolean>(true)

//当前展示第几页数据
let pageNo = ref<number>(1)
//1页展示多少条数据
let limit = ref<number>(5)
//一共有多少条数据
let total = ref<number>(100)

//初始化组件实例spu
let spu = ref<any>();

//存储spu分类的数据
let spuList = ref()

//存储一级分类的数据
let c1Spu = ref<any>([])

//存储二级分类的数据
let c2Spu = ref<any>([])

//存储三级分类的数据
let c3Spu = ref<any>([])

//组件挂载完毕
onMounted(() => {
  // 获取一级分类的数据
  reqCategory();
})

// 获取一级分类的数据
const reqCategory = async () => {
  let result1: CategoryAll = await reqGetCategoryone();
  if (result1.code == 200) {
    c1Spu.value = result1.data;
  }
}

//获取二级分类
const reqCategoryone = async () => {
  //当下拉框发生变化时，清空分类列表的数据
  spuList.value = []
  showbox.value = 1
  pageNo.value = 1
  trims.value = true
  //将二三级分类数据清空
  category2Id.value = copyData.value,
    category3Id.value = copyData.value,
    //一级分类选中后解锁二级分类
    select1.value = false;
  let result2: CategoryAll = await reqGetCategorytwo(category1Id.value as number)
  if (result2.code == 200) {
    c2Spu.value = result2.data;
  }
}

//获取三级分类
const reqCategorytwo = async () => {
  //当下拉框发生变化时，清空分类列表的数据
  spuList.value = []
  showbox.value = 1
  pageNo.value = 1
  trims.value = true
  //将二三级分类数据清空
  category3Id.value = copyData.value,
    //二级分类选中后解锁三级分类
    select2.value = false;
  let result3: CategoryAll = await reqGetCategorythree(category2Id.value as number)
  if (result3.code == 200) {
    c3Spu.value = result3.data;
  }
}

//三级分类发生变化的回调
const reqCategorythree = () => {
  trims.value = false;
  // 当下拉框发生变化时，清空分类列表的数据
  spuList.value = []
  showbox.value = 1
  pageNo.value = 1
  //请求数据
  reqData();
}

//获取分类列表详情
const reqData = async () => {
  //@ts-ignore
  let result4: HasSpuResponseData = await reqSpuList(pageNo.value, limit.value, category3Id.value,);
  if (result4.code == 200) {
    spuList.value = result4.data.records;
    total.value = result4.data.total;
  }
}

//新增按钮的回调
const pushSpu = async () => {
    // // 清空数据
    // reset()
    //切换场景
    showbox.value = 2
    // //@ts-ignore
    // attrParams.categoryId = category3Id.value

}

//添加按钮的回调
const addSpu = (row: any) => {
    console.log(row);
    // 切换场景
    showbox.value = 2;
}

//修改按钮的回调
const editSpu = (row: SPUData) => {
  // 切换场景
  showbox.value = 2;
  //调用组件实例方法，获取完整的spu数据
  spu.value.getData(row);
}

//详情按钮的回调
const infoSpu = (row: any) => {
    console.log(row);
}

//删除按钮的回调
const deletes = (row: any) => {
    console.log(row);
}

//分页器当前页发生变化触发的回调
const handleCurrentChange = (page: number) => {
    //修改当前页
    pageNo.value = page;
    // 再次发送请求
    reqData();
}

//分页器每页展示几条数据触发的回调
const handleSizeChange = (limit: number) => {
    pageNo.value = 1;
    //修改每页展示多少条数据
    limit = limit;
    // 再次发送请求
    reqData();
}

//自组件spuFrom绑定的自定义事件
const change =(num:number)=>{
  showbox.value = num;
}

</script>
<script lang="ts">
export default {
  name: 'spu',
}
</script>
<style lang="scss" scoped>
.spu-container {
  .box-card {
    margin-top: 20px;
  }
}
</style>
