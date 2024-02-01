<template>
  <!--表格展示 -->
  <el-card>
    <el-table :data="menuArr" style="width: 100%; margin-bottom: 20px" row-key="id" border>
      <el-table-column prop="name" label="名称" sortable align="center" />
      <el-table-column prop="code" label="权限值" sortable align="center" />
      <el-table-column prop="updateTime" label="修改时间" sortable align="center" show-overflow-tooltip />
      <el-table-column label="操作" sortable align="center" width="240">
        <template #="{ row, $index }">
          <el-button type="primary" size="small" @click="addMenu(row)" :disabled="row.level == 4">添加菜单</el-button>
          <el-button type="warning" size="small" @click="editMenu(row)" :disabled="row.level == 1">编辑</el-button>
          <el-popconfirm :title="`你确定要删除 ${row.name}?`" @confirm="delMenu(row)">
            <template #reference>
              <el-button type="danger" size="small" :disabled="row.level == 1">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 对话框-->
    <el-dialog v-model="dialogVisible" :title="menuParams.id ? '修改菜单' : '添加菜单'" width="50%">
      <el-form :model="menuParams" label-width="120px">
        <el-form-item label="名称">
          <el-input placeholder="请填写名称" v-model="menuParams.name" />
        </el-form-item>
        <el-form-item label="权限值">
          <el-input placeholder="请填写权限值" v-model="menuParams.code" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="submit">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from "vue";
import { reqMenuList, reqAddAndEditMenu,deltMenuList } from "@/api/acl/index";
import type { MenuAllResponseData, MenuAllList, MenuALL, MenuDataList } from "@/api/acl/type";
import { ElMessage } from "element-plus";

//存储菜单数据
let menuArr = ref<MenuAllList>([])

//带给服务器的数据
let menuParams = reactive<MenuDataList>({
  code: '',
  level: 0,
  name: '',
  pid: 0
})

//拷贝数据
let copyData = reactive<MenuDataList>({ ...menuParams })

//控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false)

//组件挂载
onMounted(() => {
  getData()
})

// 获取数据
const getData = async () => {
  let result: MenuAllResponseData = await reqMenuList()
  if (result.code == 200) {
    menuArr.value = result.data
  }
}

//添加菜单的回调
const addMenu = (row: MenuALL) => {
  //清除数据
  reset()
  //打开对话框
  dialogVisible.value = true
  //收集数据
  menuParams.level = row.level + 1
  menuParams.pid = row.id as number
}

//修改菜单的回调
const editMenu = (row: MenuALL) => {
  //清除数据
  reset()
  //打开对话框
  dialogVisible.value = true
  //赋值
  Object.assign(menuParams, row)
}

//删除菜单的回调
const delMenu =async (row: MenuALL) => {
  let result:any = await deltMenuList(row.id as number)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message:'删除成功'
    })
    //刷新列表
    getData()
  }
}

//保存按钮的回调
const submit = async () => {
  //关闭对话框
  dialogVisible.value = false
  let result: any = await reqAddAndEditMenu(menuParams)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: menuParams.id ? '修改成功' : '添加成功'
    })
    // 刷新页面
    getData()
  } else {
    ElMessage({
      type: 'error',
      message: menuParams.id ? '修改失败' : '添加失败'
    })
  }
}

//取消按钮的回调
const cancel = () => {
  //关闭对话框
  dialogVisible.value = false
}

//重置按钮的回调
const reset = () => {
  Object.assign(menuParams, copyData)
  menuParams.id = 0
}

</script>
<script lang="ts">
export default {
  name: 'permission',
}
</script>
<style lang="scss" scoped></style>
