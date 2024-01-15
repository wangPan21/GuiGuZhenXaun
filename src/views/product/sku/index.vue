<template>
  <el-card>
    <el-table border style="width: 100%" :data="skuArr">
      <el-table-column label="序号" type="index" align="center" width="60" />
      <el-table-column label="名称" align="center" show-overflow-tooltip prop="skuName" width="200" />
      <el-table-column label="描述" align="center" show-overflow-tooltip width="200" prop="skuDesc" />
      <el-table-column label="默认图片" align="center" width="200">
        <template #="{ row, $index }">
          <img :src="row.skuDefaultImg" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="重量(g)" align="center" width="100" prop="weight" />
      <el-table-column label="价格(元)" align="center" width="100" prop="price" />
      <el-table-column label="操作" align="center" width="210" fixed="right">
        <template #="{ row, $index }">
          <el-button size="small" :type="row.isSale == 1 ? 'success' : 'info'" :icon="row.isSale == 1 ? Bottom : Top"
            @click="AscDes(row)" />
          <el-button size="small" type="primary" :icon="Edit" @click="edit" />
          <el-button size="small" type="info" :icon="InfoFilled" @click="Info(row)" />
          <el-popconfirm :title="`要删除商品 ${row.skuName}？`" @confirm="Del(row)">
            <template #reference>
              <el-button size="small" type="danger" :icon="Delete"/>
            </template>
          </el-popconfirm>

        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <!-- 分页器    -->
      <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 50]" small
        background layout="prev, pager, next, jumper, ->, sizes,total" :total="total"
        @current-change="handleCurrentChange" @size-change="handleSizeChange" />
    </template>

    <!-- 抽屉组件 -->
    <el-drawer v-model="drawer" size="40%">
      <template #header>
        <h4>查看商品的详情</h4>
      </template>
      <template #default>
        <el-row>
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ SkuInfo.skuName }}</el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ SkuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ SkuInfo.price }}</el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag v-for="item in SkuInfo.skuAttrValueList" :key="item" style="margin: 0 0 5px 5px;" type="success">{{
              item.valueName }}</el-tag>

          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag v-for="item in SkuInfo.skuSaleAttrValueList" :key="item" style="margin: 0 0 5px 5px;" type="danger">{{
              item.saleAttrName }}</el-tag>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="150px" indicator-position="none">
              <el-carousel-item v-for="item in SkuInfo.skuImageList" :key="item">
                <img :src="item.imgUrl" alt="" style="width: 100%;height: 100%;">
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { reqSku, reqSaleSku, reqSkuInfo,deleteSku} from '@/api/product/index'
import type { SkuResponseData, SkuDatas, SkuInifData } from '@/api/product/type'
import { InfoFilled, Delete, Top, Bottom, Edit } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
//分页器当前页
let pageNo = ref<number>(1)

//分页器每页展示多少条数据
let pageSize = ref<number>(5)

//分页器总条数
let total = ref<number>(100)

//存储sku数据
let skuArr = ref<SkuDatas[]>([])

//控制抽屉的显示与隐藏
let drawer = ref<boolean>(false)

//存储Sku详情数据
let SkuInfo = ref<SkuDatas>({})

//拷贝数据
let copyData = ref<SkuDatas>({})


//组件挂载完毕
onMounted(() => {
  //获取数据
  getData()
})

//获取数据
const getData = async () => {
  let result: SkuResponseData = await reqSku(pageNo.value, pageSize.value)
  if (result.code == 200) {
    //存储sku数据
    skuArr.value = result.data.records
    //存储总页数
    total.value = result.data.total
  }
}

//上架下架按钮的回调
const AscDes = async (row: SkuDatas) => {
  await reqSaleSku(row)
  ElMessage({
    type: 'success',
    message: row.isSale == 1 ? '下架成功' : '上架成功',
  })
  getData()
}

//修改按钮的回调
const edit = () => {
  ElMessage({
    type: 'info',
    message: '开发中～敬请期待',
  })
}

//详情按钮的回调
const Info = async (row: SkuDatas) => {
  //清空数据
  reset()
  //发送请求
  let result: SkuInifData = await reqSkuInfo(row.id as number)
  if (result.code == 200) {
    //打开抽屉
    drawer.value = true
    //存储数据
    SkuInfo.value = result.data
  }
}

//删除按钮的回调
const Del = async (row: SkuDatas) => {
  let result:any = await deleteSku(row.id as number)  
  if (result.code == 200) {
    ElMessage({
      type:'success',
      message:'删除成功'
    })
    //刷新页面
    getData()
  } else {
    ElMessage({
      type:'error',
      message:result.data
    })
  }
}

//商品详情重置回调
const reset =()=>{
  Object.assign(SkuInfo.value,copyData.value)
}

//点击切换页面的回调
const handleCurrentChange = (page: number) => {
  pageNo.value = page
  //发送请求
  getData()
}

//点击切换页面总数
const handleSizeChange = (size: number) => {
  pageSize.value = size
  //发送请求
  getData()
}
</script>
<script lang="ts">
export default {
  name: 'sku',
}
</script>
<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
