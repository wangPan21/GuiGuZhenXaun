<template>
  <div>
    <div class="container">
      <div class="login">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span style="font-size: 25px">登录</span>
            </div>
          </template>
          <div>
            <el-form :model="userInfo" ref="from" :rules="rules">
              <el-form-item label="账号" prop="username">
                <el-input v-model="userInfo.username" :prefix-icon="User" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  show-password
                  :prefix-icon="Lock"
                  v-model="userInfo.password"
                />
              </el-form-item>
            </el-form>
            <div
              style="display: flex; justify-content: center; margin-top: 40px"
            >
              <el-button type="primary" @click="submit" :loading="loading">
                登录
              </el-button>
              <el-button @click="reset">重置</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage, ElNotification } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import useuserStore from '@/store/modules/user'
import { getTime } from '@/utils/time'

//初始化路由
let $router = useRouter()

//创建路由对象
let $route = useRoute()

//初始化仓库
let userStore = useuserStore()

//存储用户账号密码
let userInfo = reactive({
  username: 'admin',
  password: '111111',
})

//拷贝数据
let copyData = { ...userInfo }

//获取from组件实例
let from = ref()

//初始化登录按钮加载状态
let loading = ref<boolean>(false)

//登录按钮回调
const submit = async () => {
  //表单校验
  await from.value.validate()
  //开启按钮加载
  loading.value = true
  //通知仓库发登录请求
  try {
    //登陆成功
    await userStore.userLogin(userInfo)
    let redirect: any = $route.query.redirect
    //路由跳转
    $router.push({ path: redirect || '/' })
    ElMessage({
      type: 'success',
      message: '登陆成功！',
    })
    //关闭按钮加载
    loading.value = false
    setTimeout(() => {
      ElNotification.success({
        title: `Hi,${getTime()}!`,
        message: `欢迎回来！${userStore.username}`,
        // 设置 offset 字段，可以使弹出的消息距屏幕边缘偏移一段距离
        offset: 100,
      })
    }, 5000)
  } catch (error) {
    //登陆失败
    //关闭按钮加载
    loading.value = false
    ElMessage({
      type: 'error',
      message: `${error}`,
    })
  }
}

//重置按钮回调
const reset = () => {
  Object.assign(userInfo, copyData)
}

//自定义用户名校验规则
const validatename = (rule: any, value: any, callback: any) => {
  const regular = /^[a-zA-Z0-9]+$/
  if (regular.test(value)) {
    //符合规则
    callback()
  } else {
    //不符合规则
    callback(new Error('请输入合法的账号'))
  }
}

//自定义密码校验规则
const validatepass = (rule: any, value: any, callback: any) => {
  const regular = /^[a-zA-Z0-9]{6}$/
  if (regular.test(value)) {
    //符合规则
    callback()
  } else {
    //不符合规则
    callback(new Error('请输入6位数的密码'))
  }
}

//表单校验
const rules = {
  // 账号校验规则
  username: [{ required: true, validator: validatename, trigger: 'change' }],

  // 账号校验规则
  password: [{ required: true, validator: validatepass, trigger: 'change' }],
}
</script>
<script lang="ts">
export default {
  name: 'Login',
}
</script>
<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('@/assets/images/古风女.png') no-repeat;
  background-size: cover;

  .login {
    width: 400px;
    height: 200px;
    margin: 0 40% 10% 0;
    border-radius: 5px;
  }
}
</style>
