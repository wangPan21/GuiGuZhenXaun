<template>
  <div>
    <!-- 头部 -->
    <el-card style="margin: 0 0 10px 0">
      <div style="width: 100%; display: flex; justify-content: space-between">
        <div>
          <span style="margin-right: 20px">职位搜索</span>
          <el-input placeholder="请输入职位关键字" style="width: 200px" v-model="keyword" />
        </div>
        <div>
          <el-button type="primary" :icon="Search" :disabled="!keyword.length" @click="search">搜索</el-button>
          <el-button :icon="Refresh" @click="resData">重置</el-button>
        </div>
      </div>
    </el-card>

    <!-- 身体 -->
    <el-card>
      <template #header>
        <div class="card-header">
          <el-button type="primary" :icon="Plus" @click="addRole">
            添加职位
          </el-button>
        </div>
      </template>

      <!-- 数据展示-->
      <el-table style="width: 100%" border :data="roleArr">
        <el-table-column label="#" width="80" align="center" type="index" />
        <el-table-column label="ID" width="80" prop="id" align="center" />
        <el-table-column label="职位名称" width="100" prop="roleName" align="center" show-overflow-tooltip />
        <el-table-column label="创建时间" width="100" prop="createTime" align="center" show-overflow-tooltip />
        <el-table-column label="更新时间" width="100" prop="updateTime" align="center" show-overflow-tooltip />
        <el-table-column label="操作" width="280" align="center" fixed="right">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" :icon="User" @click="distRole(row)">
              分配权限
            </el-button>
            <el-button type="warning" size="small" :icon="Edit" @click="editRole(row)">
              编辑
            </el-button>
            <el-popconfirm :title="`确定要删除角色${row.roleName}?`" @confirm="delRole(row)">
              <template #reference>
                <el-button type="danger" size="small" :icon="Delete">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <!-- 分页器-->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]" small
          background layout="prev, pager, next, jumper,->,total, sizes" :total="total" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </template>
    </el-card>

    <!-- 对话框-->
    <el-dialog v-model="dialogVisible" :title="roleParams.id ? '修改职位' : '添加职位'" width="50%">
      <el-form :model="roleParams" :rules="rules" ref="form">
        <el-form-item label="职位名称" prop="roleName">
          <el-input placeholder="请输入职位名称" v-model="roleParams.roleName"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="clear">取消</el-button>
          <el-button type="primary" @click="submit">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 抽屉：分配权限 -->
    <el-drawer title="分配角色权限" v-model="drawer" size="50%">
      <template #default>
        <!-- 树形控件-->
        <el-tree ref="tree" :data="menuArr" show-checkbox node-key="id" default-expand-all
          :default-checked-keys="selectArr" :props="defaultProps" />
      </template>
      <template #footer>
        <el-button type="primary" @click="save">确定</el-button>
        <el-button @click="clear">取消</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, nextTick } from 'vue'
import { reqRoleInfo, reqAddAndEditRole, reqRoleMenu, deleleRole, reqRoleSelete } from '@/api/acl/index'
import type { RolesData, RolesResponseData, ReCords, MenuResponseData, MenuList } from '@/api/acl/type'
import useLayOutStore from "@/store/modules/seting";
import {
  User,
  Edit,
  Delete,
  Plus,
  Refresh,
  Search,
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
//分页器当前页数
let pageNo = ref<number>(1)

//分页器一页几条
let pageSize = ref<number>(5)

//分页器总条数
let total = ref<number>(100)

//存储所有用户数据
let roleArr = ref<ReCords>([])

//控制抽屉的开关
let dialogVisible = ref<boolean>(false)
let drawer = ref<boolean>(false)

//收集用户信息
let roleParams = reactive<RolesData>({
  roleName: ''
})

//拷贝数据
let copydata = reactive({ ...roleParams })

//存储用户权限数据
let menuArr = ref<MenuList>([])

//存储勾选的用户权限数据
let selectArr = ref<number[]>([])

//收集搜索的数据
let keyword = ref<string>('')

//获取模版setting仓库
let settingStore = useLayOutStore()

//获取form组件实例
let form = ref<any>()
//获取tree组件实例
let tree = ref<any>()

//组件挂载完毕
onMounted(() => {
  //获取数据
  getData()
})

//获取数据
const getData = async () => {
  let result: RolesResponseData = await reqRoleInfo(pageNo.value, pageSize.value, keyword.value)
  if (result.code == 200) {
    //存储总页数
    total.value = result.data.total
    //存储用户数据
    roleArr.value = result.data.records
  }
}

//搜索按钮的回调
const search = () => {
  //获取新的数据
  getData()
  //清空搜索栏
  keyword.value = ''
}

//重置按钮的回调
const resData = () => {
  //更改仓库refash的值
  settingStore.refash = !settingStore.refash
}

//添加按钮的回调
const addRole = () => {
  //清空数据
  reset()
  //打开对话框
  dialogVisible.value = true
  nextTick(() => {
    //清理表单校验的样式
    form.value.clearValidate('roleName')
  })
}

//分配按钮的回调
const distRole = async (row: RolesData) => {
  Object.assign(roleParams, row)
  //打开抽屉
  drawer.value = true
  //发送请求
  let result: MenuResponseData = await reqRoleMenu((roleParams.id as number))
  if (result.code == 200) {
    //存储用户权限数据
    menuArr.value = result.data
    //过滤menuArr的数据
    selectArr.value = filtersSelectArr(menuArr.value, [])
  }
}

//修改按钮的回调
const editRole = (row: RolesData) => {
  // 已有的数据赋值给输入框
  Object.assign(roleParams, row)
  //打开对话框
  dialogVisible.value = true
}

//删除按钮的回调
const delRole = async (row: RolesData) => {
  let result: any = await deleleRole(row.id as number)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    //刷新页面
    getData()
  } else {
    ElMessage({
      type: 'error',
      message: result.data
    })
  }
}

//确定按钮的回调
const submit = async () => {
  //表单校验通过后
  await form.value.validate()
  //发送请求
  let result: any = await reqAddAndEditRole(roleParams)
  if (result.code == 200) {
    //关闭对话框
    dialogVisible.value = false
    ElMessage({
      type: 'success',
      message: roleParams.id ? '修改成功' : '添加成功',
    })
    //获取用户数据
    getData()
    //浏览器自动刷新一次
    window.location.reload()
  } else {
    //关闭对话框
    dialogVisible.value = false
    ElMessage({
      type: 'error',
      message: roleParams.id ? '修改失败' : '添加失败',
    })
  }

}

//确定(分配)按钮的回调
const save = async () => {
  const roleId = roleParams.id;
  //选中节点的ID
  let arr = tree.value.getCheckedKeys();
  //半选的ID
  let arr1 = tree.value.getHalfCheckedKeys();
  let permissionId = arr.concat(arr1)
  let result: any = await reqRoleSelete(roleId as number, permissionId)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '权限分配成功'
    })
    //关闭抽屉
    drawer.value = false
    //刷新
    resData()
  }
}

//取消按钮的回调
const clear = () => {
  //关闭对话框
  dialogVisible.value = false
  //关闭抽屉
  drawer.value = false
}

//重置方法的回调
const reset = () => {
  Object.assign(roleParams, copydata)
  roleParams.id = 0
}

//分页器切换页面展的回调
const handleCurrentChange = (page: number) => {
  pageNo.value = page
  //发送请求
  getData()
}

//分页器切换页面展示数据总数的回调
const handleSizeChange = (size: number) => {
  pageSize.value = size
  //发送请求
  getData()
}

//树形图数据展示
const defaultProps = {
  children: 'children',
  label: 'name',
}

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

//用户昵称的校验规则
const validateName = (rule: any, value: any, callback: any) => {
  //用户姓名至少5位
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('用户的昵称至少为2位'))
  }
}

//表单校验的规则对象
const rules = {
  //职位昵称
  roleName: [
    { required: true, validator: validateName, trigger: 'blur' }
  ]
}
</script>
<script lang="ts">
export default {
  name: 'role',
}
</script>
<style lang="scss" scoped></style>

