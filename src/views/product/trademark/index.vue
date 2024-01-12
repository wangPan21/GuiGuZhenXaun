<template>
  <div class="trademark-box">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <!-- 点击添加按钮 -->
          <el-button type="primary" :icon="Plus" @click="addTradmark">
            添加品牌
          </el-button>
        </div>
      </template>

      <!-- 表单展示 -->
      <div>
        <el-table border style="width: 100%" :data="recList">
          <el-table-column
            type="index"
            label="序号"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="tmName"
            label="品牌名称"
            width="250"
            align="center"
          ></el-table-column>
          <el-table-column prop="prop" label="品牌LOGO" align="center">
            <template #="{ row, $index }">
              <img
                :src="row.logoUrl"
                alt="图片不存在"
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="prop"
            label="品牌操作"
            width="180"
            align="center"
          >
            <template #="{ row, $index }">
              <!-- 修改按钮 -->
              <el-button
                type="warning"
                :icon="Edit"
                size="small"
                @click="editTrademark(row)"
              ></el-button>

              <!-- 删除按钮 -->
              <el-popconfirm
                :title="`要删除品牌${row.tmName}吗？`"
                @confirm="removeTrademark(row.id)"
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

      <!-- 分页器  -->
      <template #footer>
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="limit"
          :page-sizes="[5, 9, 15, 20]"
          :background="true"
          layout=" prev, pager, next,jumper,->,sizes,total"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </template>
    </el-card>

    <!-- 对话框 -->
    <el-dialog
      v-model="showDialog"
      :title="trademarkInfo.id ? '修改品牌' : '添加品牌'"
      width="40%"
    >
      <!-- 主体 -->
      <el-form
        status-icon
        style="width: 80%"
        label-width="auto"
        :model="trademarkInfo"
        :rules="rules"
        ref="refFrom"
      >
        <!-- 品牌名称 -->
        <el-form-item label="品牌名称" prop="tmName">
          <el-input v-model="trademarkInfo.tmName" />
        </el-form-item>
        <!-- 品牌头像 -->
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
          >
            <img
              v-if="trademarkInfo.logoUrl"
              :src="trademarkInfo.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>

      <!-- 按钮 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submit">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import {
  reqTrademarkList,
  reqAddOrEditTrademark,
  reqRemoveTrademark,
} from '@/api/product/index'
import { ElMessage } from 'element-plus'
import type { TradeMarkResponseData, TradeMark } from '@/api/product/type'
import type { UploadProps } from 'element-plus'

//当前展示第几页数据
let pageNo = ref<number>(1)
//1页展示多少条数据
let limit = ref<number>(3)
//一共有多少条数据
let total = ref<number>(100)

//存储品牌信息列表的数据
let recList = ref<any>([])

//控制对话框的显示与隐藏
let showDialog = ref<boolean>(false)

//存储商品信息
let trademarkInfo = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})

//拷贝品牌信息数据
let copyData = reactive<TradeMark>({ ...trademarkInfo })

//获取表单组件实例
let refFrom = ref()

//组件挂载完毕
onMounted(() => {
  getTrademark()
})

//分页器当前页发生变化触发的回调
const handleCurrentChange = (page: number) => {
  //修改当前页
  pageNo.value = page
  // 再次发送请求
  getTrademark()
}

//分页器每页展示几条数据触发的回调
const handleSizeChange = (limit: number) => {
  pageNo.value = 1
  //修改每页展示多少条数据
  limit = limit
  // 再次发送请求
  getTrademark()
}

//获取品牌分类数据的回调
const getTrademark = async () => {
  let result: TradeMarkResponseData = await reqTrademarkList(
    pageNo.value,
    limit.value,
  )
  if (result.code == 200) {
    total.value = result.data.total
    recList.value = result.data.records
  } else {
  }
}

//添加品牌按钮的回调
const addTradmark = () => {
  //清空数据
  clear()
  showDialog.value = true
  pageNo.value = 1
}

//删除品牌按钮的回调
const removeTrademark = async (id: number) => {
  let result = await reqRemoveTrademark(id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    //重新获取请求
    getTrademark()
  } else {
    ElMessage({
      type: 'success',
      message: '删除失败',
    })
  }
}

//修改品牌的按钮
const editTrademark = (row: any) => {
  //清空数据
  clear()
  trademarkInfo.id = row.id
  trademarkInfo.tmName = row.tmName
  trademarkInfo.logoUrl = row.logoUrl
  //打开对话框
  showDialog.value = true
}

//保存按钮的回调
const submit = async () => {
  await refFrom.value.validate()
  //发送请求
  let result = await reqAddOrEditTrademark(trademarkInfo)
  //添加/修改 品牌成功
  if (result.code == 200) {
    //关闭对话框
    showDialog.value = false
    ElMessage({
      type: 'success',
      message: trademarkInfo.id ? '修改成功' : '添加成功',
    })
    //再次发送请求
    getTrademark()
  } else {
    //添加失败
    ElMessage({
      type: 'error',
      message: trademarkInfo.id ? '修改失败' : '添加失败',
    })
    return Promise.reject(new Error(result.message))
  }
}

//取消按钮的回调
const cancel = () => {
  //关闭对话框
  showDialog.value = false
}

//清空数据
const clear = () => {
  trademarkInfo.id = 0
  //清除表单验证信息,?有就调用，没有就不调用
  refFrom.value?.clearValidate()
  Object.assign(trademarkInfo, copyData)
}

//上传图片前触发的钩子
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  //约束上传文件的类型
  if (
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage.error('请上传大小小于等于 4M 的图片!')
      return false
    }
  } else {
    ElMessage.error('请上传格式为 JPG/png/gif 的图片!')
    return false
  }
}

//上传图片成功触发的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  //response即为本次请求返回的数据
  trademarkInfo.logoUrl = response.data
  //图片上传成功后，清除表单验证信息
  refFrom.value.clearValidate()
}

//品牌名称校验规则
const validateName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('请输入品牌名称'))
  }
}

//品牌名称校验规则
const validateUrl = (rule: any, value: any, callBack: any) => {
  if (value) {
    callBack()
  } else {
    callBack(new Error('请上传品牌Logo'))
  }
}

//自定义表单校验规则
const rules = {
  tmName: [{ required: true, validator: validateName, trigger: 'blur' }],
  logoUrl: [{ required: true, validator: validateUrl, trigger: 'blur' }],
}
</script>
<script lang="ts">
export default {
  name: 'trademark',
}
</script>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
