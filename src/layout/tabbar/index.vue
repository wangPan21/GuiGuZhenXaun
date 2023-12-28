<template>
  <div class="containers">
    <div class="left">
      <el-icon size="20px" style="margin: 0 15px 0 5px" @click="changeIcon">
        <component :is="uselayoutStore.fold ? Fold : Expand"></component>
      </el-icon>
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" :to="item.path" v-show="item.meta.title">
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <el-button :icon="Refresh" circle @click="refresh" />
      <el-button :icon="FullScreen" circle @click="fullScreen" />
      <el-button :icon="Setting" circle />
      <span class="yuan">
        <img :src="userStore.avatar" v-if="userStore.avatar != ''" />
        <SvgIcon name="avatar" width="40" height="40"></SvgIcon>
      </span>
      <el-dropdown v-if="userStore.avatar != ''">
        <span>
          {{ userStore.username }}
          <el-icon>
            <ArrowRight />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="delToken">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button circle text v-else @click="login">登录</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ArrowRight,
  Expand,
  Refresh,
  FullScreen,
  Setting,
  Fold,
} from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import useLayOutStore from '@/store/modules/seting'
import useuserStore from '@/store/modules/user'

//初始化用户仓库实例
let userStore = useuserStore()

//初始化仓库实例
let uselayoutStore = useLayOutStore()

//初始化路由参数
let $route = useRoute()

//创建路由
let $router = useRouter()

//点击图标 压缩 菜单的回调
const changeIcon = () => {
  // 控制图标进行切换
  uselayoutStore.fold = !uselayoutStore.fold
}

//点击刷新页面的回调
const refresh = () => {
  uselayoutStore.refash = !uselayoutStore.refash
}

//退出登录的回调
const delToken = async () => {
  try {
    await userStore.delLogin()
  } catch {

  }
}

//去登录按钮回调
const login = () => {
  //返回登录页面
  $router.push({ path: '/login' })
}

//点击全屏图标的回调
const fullScreen = () => {
  //DOM对象的一个属性，判断当前窗口是否为全屏，是为true，反之
  let full = document.fullscreenElement
  //切换为全屏
  if (!full) {
    //文档根节点方法 requestFullscreen ，实现全屏模式
    document.documentElement.requestFullscreen()
  } else {
    // 当前窗口为全屏，则退出全屏模式
    document.exitFullscreen()
  }
}
</script>
<script lang="ts">
export default {
  name: 'tabbar',
}
</script>
<style lang="scss" scoped>
.containers {
  width: 100%;
  display: flex;
  justify-content: space-between;

  .left {
    display: flex;
    align-items: center;
  }

  .right {
    display: flex;
    align-items: center;
    margin-right: 20px;

    .yuan {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin: 0 10px 0 15px;
      overflow: hidden;
      background-color: #eee;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
