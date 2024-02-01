<template>
  <div>
    <!-- 头部 -->
    <el-card style="margin: 0 0 10px 0">
      <div style="width: 100%; display: flex; justify-content: space-between">
        <div>
          <span style="margin-right: 20px">用户名</span>
          <el-input placeholder="请输入用户名" style="width: 200px" v-model="keyword" />
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
          <el-button type="primary" :icon="Plus" @click="addUser">
            添加
          </el-button>
          <el-button type="danger" :icon="Delete" @click="delAllUser" :disabled="selectIdArr.length ? false : true">
            批量删除
          </el-button>
        </div>
      </template>

      <!-- 数据展示-->
      <el-table style="width: 100%" border :data="userArr" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="#" width="80" align="center" type="index" />
        <el-table-column label="Id" width="80" prop="id" align="center" />
        <el-table-column label="用户姓名" width="100" prop="username" align="center" show-overflow-tooltip />
        <el-table-column label="用户名称" width="100" prop="name" align="center" show-overflow-tooltip />
        <el-table-column label="用户角色" width="100" prop="roleName" align="center" show-overflow-tooltip />
        <el-table-column label="创建时间" width="100" prop="createTime" align="center" show-overflow-tooltip />
        <el-table-column label="更新时间" width="100" prop="updateTime" align="center" show-overflow-tooltip />
        <el-table-column label="操作" width="280" align="center" fixed="right">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" :icon="User" @click="distUser(row)">
              分配角色
            </el-button>
            <el-button type="warning" size="small" :icon="Edit" @click="editUser(row)">
              编辑
            </el-button>
            <el-popconfirm :title="`确定要删除用户${row.username}?`" @confirm="delUser(row)">
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

    <!-- 抽屉-->
    <el-drawer :title="userParams.id ? '修改用户' : '添加用户'" v-model="drawer">
      <template #default>
        <!-- 身体部分 -->
        <el-form :model="userParams" :rules="rules" ref="form">
          <el-form-item label="用户姓名" prop="username">
            <el-input placeholder="请填写用户名字" v-model="userParams.username"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="name">
            <el-input placeholder="请填写用户昵称" v-model="userParams.name"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password" v-show="userParams.id ? false : true">
            <el-input placeholder="请填写用户密码" v-model="userParams.password"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button @click="clear">取消</el-button>
      </template>
    </el-drawer>
    <!-- 抽屉：分配角色 -->
    <el-drawer title="分配用户角色" v-model="drawers" size="50%">
      <template #default>
        <!-- 身体部分 -->
        <el-form :model="userParams">
          <el-form-item label="用户姓名">
            <el-input v-model="userParams.username" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="角色列表">
            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
              @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox-group @change="handleCheckedCitiesChange" v-model="assignRoleList">
              <el-checkbox v-for="(city, index) in allRoleList" :key="index" :label="city">{{ city.roleName
              }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
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
import { reqUserInfo, reqAddAndEditUser, reqUserRule, reqDoUserRole, deleleUser, delelesUser } from '@/api/acl/index'
import  useLayOutStore  from "@/store/modules/seting";
import type { USerResponseData, Records, USer, RoleAll, UserRoleData, SetRoleData } from '@/api/acl/type'
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
let userArr = ref<Records>([])

//控制抽屉的开关
let drawer = ref<boolean>(false)
let drawers = ref<boolean>(false)

//收集用户信息
let userParams = reactive<USer>({
  username: '',
  password: '',
  name: '',
})

//拷贝数据
let copydata = reactive({ ...userParams })

//获取form组件实例
let form = ref<any>()

// 是否全选
let checkAll = ref<boolean>(false)

//复选框全选不确定状态
let isIndeterminate = ref<boolean>(true)

//存储全部的用户角色
let allRoleList = ref<RoleAll>([])

//存储已拥有的用户角色
let assignRoleList = ref<RoleAll>([])

//存储表格选中的数据
let selectIdArr = ref<USer[]>([])

//收集搜索的数据
let keyword = ref<string>('')

//获取模版setting仓库
let settingStore = useLayOutStore()

//组件挂载完毕
onMounted(() => {
  //获取数据
  getData()
})

//搜索按钮的回调
const search =()=>{
  //获取新的数据
  getData()
  //清空搜索栏
  keyword.value = ''
}

//重置按钮的回调
const resData = ()=>{
  //更改仓库refash的值
  settingStore.refash= !settingStore.refash
}

//获取数据
const getData = async () => {
  let result: USerResponseData = await reqUserInfo(pageNo.value, pageSize.value, keyword.value)
  if (result.code == 200) {
    //存储总页数
    total.value = result.data.total
    //存储用户数据
    userArr.value = result.data.records
  }
}

//添加按钮的回调
const addUser = () => {
  //清空数据
  reset()
  //打开抽屉
  drawer.value = true
  nextTick(() => {
    //清理表单校验的样式
    form.value.clearValidate('username')
    form.value.clearValidate('name')
    form.value.clearValidate('password')
  })
}

//批量删除按钮的回调
const delAllUser = async () => {
  let idsList: any = selectIdArr.value.map(item => {
    return item.id;
  });
  let result: any = await delelesUser(idsList)
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

//分配按钮的回调
const distUser = async (row: USer) => {
  Object.assign(userParams, row)
  //发送请求
  let result: UserRoleData = await reqUserRule(row.id as number)
  if (result.code == 200) {
    //存储全部的用户角色
    allRoleList.value = result.data.allRolesList
    //存储已拥有的用户角色
    assignRoleList.value = result.data.assignRoles
    //打开抽屉
    drawers.value = true
  }
}

//修改按钮的回调
const editUser = (row: USer) => {
  // 已有的数据赋值给输入框
  Object.assign(userParams, row)
  //打开抽屉
  drawer.value = true
}

//删除按钮的回调
const delUser = async (row: USer) => {
  let result: any = await deleleUser(row.id as number)
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
  let result: any = await reqAddAndEditUser(userParams)
  if (result.code == 200) {
    //关闭抽屉
    drawer.value = false
    ElMessage({
      type: 'success',
      message: userParams.id ? '修改成功' : '添加成功',
    })
    //获取用户数据
    getData()
    //浏览器自动刷新一次
    window.location.reload()
  } else {
    //关闭抽屉
    drawer.value = false
    ElMessage({
      type: 'error',
      message: userParams.id ? '修改失败' : '添加失败',
    })
  }
}

//确定(分配)按钮的回调
const save = async () => {
  //整理参数
  let datas: SetRoleData = {
    userId: userParams.id as string,
    roleIdList: assignRoleList.value.map(item => item.id)
  }
  let result: any = await reqDoUserRole(datas)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '角色分配成功'
    })
    //关闭抽屉
    drawers.value = false
    //刷新页面
    getData()
  } else {
    ElMessage({
      type: 'error',
      message: '角色分配失败'
    })
  }
}

//取消按钮的回调
const clear = () => {
  //关闭抽屉
  drawer.value = false
  drawers.value = false
}

//重置方法的回调
const reset = () => {
  Object.assign(userParams, copydata)
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

//顶部复选框change事件
const handleCheckAllChange = (val: boolean) => {
  assignRoleList.value = val ? allRoleList.value : []
  isIndeterminate.value = false
}

//底部复选框change事件
const handleCheckedCitiesChange = (value: string[]) => {
  let checkedCount = value.length
  checkAll.value = checkedCount === allRoleList.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < allRoleList.value.length
}

//表单勾选使触发的回调
const handleSelectionChange = (val: any[]) => {
  selectIdArr.value = val
}

//用户姓名的校验规则
const validateuserName = (rule: any, value: any, callback: any) => {
  //用户姓名至少5位
  if (value.trim().length < 5) {
    callback(new Error('用户的姓名至少为5位'))
  } else {
    callback()
  }
}

//用户昵称的校验规则
const validatename = (rule: any, value: any, callback: any) => {
  //用户姓名至少5位
  if (value.trim().length < 5) {
    callback(new Error('用户的昵称至少为5位'))
  } else {
    callback()
  }
}

//用户密码的校验规则
const validatepassword = (rule: any, value: any, callback: any) => {
  //用户密码至少6位
  if (value.trim().length < 6) {
    callback(new Error('用户密码至少6位'))
  } else {
    callback()
  }
}

//表单校验的规则对象
const rules = {
  //用户名字
  username: [{ required: true, validator: validateuserName, trigger: 'blur' }],
  //用户昵称
  name: [{ required: true, validator: validatename, trigger: 'blur' }],
  //用户密码
  password: [{ required: true, validator: validatepassword, trigger: 'blur' }],
}
</script>
<script lang="ts">
export default {
  name: 'user',
}
</script>
<style lang="scss" scoped></style>
