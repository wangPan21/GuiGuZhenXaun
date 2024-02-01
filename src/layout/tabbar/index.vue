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
      <!-- 刷新按钮 -->
      <el-button :icon="Refresh" circle @click="refresh" />
      <!-- 全屏按钮 -->
      <el-button :icon="FullScreen" circle @click="fullScreen" />
      <!-- 切换主题颜色 -->
      <el-popover placement="bottom" title="切换主题颜色" :width="200" trigger="hover" :hide-after="2000">
        <el-form>
          <el-form-item label="主题颜色">
            <el-color-picker v-model="color" show-alpha :predefine="predefineColors" @change="setColor" />
          </el-form-item>
          <el-form-item label="暗黑模式">
            <el-switch v-model="dark" :active-action-icon="Moon" :inactive-action-icon="Sunny" @change="Toggle" />
          </el-form-item>
        </el-form>
        <template #reference>
          <el-button :icon="Setting" circle />
        </template>
      </el-popover>

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
import { ref } from "vue";
import {
  ArrowRight,
  Expand,
  Refresh,
  FullScreen,
  Setting,
  Fold,
  Sunny,
  Moon
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

let dark = ref<boolean>(false)

const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

//退出登录的回调
const delToken = async () => {
  try {
    await userStore.delLogin()
  } catch { }
}

//去登录按钮回调
const login = () => {
  //返回登录页面
  $router.push({ path: '/login' })
}

//点击图标 压缩 菜单的回调
const changeIcon = () => {
  // 控制图标进行切换
  uselayoutStore.fold = !uselayoutStore.fold
}

//点击刷新页面的回调
const refresh = () => {
  uselayoutStore.refash = !uselayoutStore.refash
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

//switch开关切换主题颜色的回调
const Toggle = () => {
  //切换主题
  //获取HTML根节点
  let html = document.documentElement;
  //判断HTML标签是否有类名dark
  dark.value ? html.className = 'dark' : html.className = '';
}

//更改主题颜色的回调
const setColor = () => {
  const el = document.documentElement
  el.style.setProperty('--el-color-primary', color.value)
  el.style.setProperty('--el-color-success', color.value)
  el.style.setProperty('--el-color-info', color.value)
  el.style.setProperty('--el-color-warning', color.value)
  el.style.setProperty('--el-color-danger', color.value)
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
