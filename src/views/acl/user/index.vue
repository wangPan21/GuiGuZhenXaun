<template>
  <div>
    <!-- 头部 -->
    <el-card style="margin: 0 0 10px 0;">
      <div style="width: 100%; display: flex; justify-content:space-between">
        <div>
          <span style="margin-right: 20px;">用户名</span>
          <el-input placeholder="请输入用户名" style="width: 200px;" />
        </div>
        <div>
          <el-button type="primary" :icon="Search">搜索</el-button>
          <el-button :icon="Refresh">重置</el-button>
        </div>
      </div>

    </el-card>

    <!-- 身体 -->
    <el-card>
      <template #header>
        <div class="card-header">
          <el-button type="primary" :icon="Plus" @click="addUser">添加</el-button>
          <el-button type="danger" :icon="Delete" @click="delAllUser">批量删除</el-button>
        </div>
      </template>

      <!-- 数据展示-->
      <el-table style="width: 100%" border :data="userArr">
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
            <el-button type="primary" size="small" :icon="User" @click="distUser(row)">分配角色</el-button>
            <el-button type="warning" size="small" :icon="Edit" @click="editUser(row)">编辑</el-button>
            <el-button type="danger" size="small" :icon="Delete" @click="delUser(row)">删除</el-button>
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

    <!-- 抽屉  v-model="drawer"-->
    <el-drawer title="新增用户" v-model="drawer">
      <template #default>
        <el-row style="width: 100%; display: flex; align-items: center; margin-bottom: 20px;">
          <el-col :span="6" style="font-size: 14px;">用户姓名</el-col>
          <el-col :span="18">
            <el-input placeholder="请填写用户名字"></el-input>
          </el-col>
        </el-row>
        <el-row style="width: 100%; display: flex; align-items: center; margin-bottom: 20px;">
          <el-col :span="6" style="font-size: 14px;">用户昵称</el-col>
          <el-col :span="18">
            <el-input placeholder="请填写用户名字"></el-input>
          </el-col>
        </el-row>
        <el-row style="width: 100%; display: flex; align-items: center; margin-bottom: 20px;">
          <el-col :span="6" style="font-size: 14px;">用户密码</el-col>
          <el-col :span="18">
            <el-input placeholder="请填写用户名字"></el-input>
          </el-col>
        </el-row>
      </template>
      <template #footer>
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button @click="clear">取消</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { reqUserInfo, } from "@/api/acl/index";
import type { USerResponseData, Records, } from "@/api/acl/type";
import { User, Edit, Delete, Plus, Refresh, Search } from '@element-plus/icons-vue'
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

//组件挂载完毕
onMounted(() => {
  //获取数据
  getData()
})

//获取数据
const getData = async () => {
  let result: USerResponseData = await reqUserInfo(pageNo.value, pageSize.value)
  if (result.code == 200) {
    //存储总页数
    total.value = result.data.total
    //存储用户数据
    userArr.value = result.data.records
  }
}

//添加按钮的回调
const addUser = () => {
  //打开抽屉
  drawer.value = true

}

//批量删除按钮的回调
const delAllUser = ()=>{

}

//分配按钮的回调
const distUser = (row: any) => {
  // //打开抽屉
  // drawer.value = true
  console.log(row);
  
}

//修改按钮的回调
const editUser = (row: any) => {
  //打开抽屉
  drawer.value = true
  console.log(row);
  

}

//删除按钮的回调
const delUser = (row: any) => {
  // //打开抽屉
  // drawer.value = true
  console.log(row);
  

}

//确定按钮的回调
const submit = (row: any) => {
  //关闭抽屉
  drawer.value = false
  console.log(row);
}

//取消按钮的回调
const clear = (row: any) => {
  //关闭抽屉
  drawer.value = false
  console.log(row);

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
</script>
<script lang="ts">
export default {
  name: 'user',
}
</script>
<style lang="scss" scoped></style>
