<template>
  <div class="content">
    <!-- 头部 -->
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
      "
    >
      <SvgIcon name="icon" width="100" height="100"></SvgIcon>
      <span
        style="
          height: 25px;
          padding-top: 3px;
          font-size: 22px;
          overflow: hidden;
          font-weight: bolder;
        "
        v-show="!uselayoutStore.fold"
      >
        硅谷甄选平台
      </span>
    </div>
    <el-scrollbar height="90vh">
      <!-- :collapse="uselayoutStore.fold" -->
      <el-menu
        active-text-color="#ffd04b"
        background-color="#01152a"
        :default-active="$route.path"
        text-color="#fff"
        :router="true"
        :collapse-transition="true"
        :collapse="uselayoutStore.fold"
      >
        <el-menu-item index="/home" @click="goRoute('/home')">
          <el-icon>
            <HomeFilled />
          </el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/screen" @click="goRoute('/screen')">
          <el-icon>
            <Monitor />
          </el-icon>
          <span>数据大屏</span>
        </el-menu-item>
        <el-sub-menu index="/acl/user">
          <template #title>
            <el-icon>
              <Lock />
            </el-icon>
            <span>权限管理</span>
          </template>
          <el-menu-item index="/acl/user" @click="goRoute('/acl/user')">
            <el-icon>
              <User />
            </el-icon>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="/acl/role" @click="goRoute('/acl/role')">
            <el-icon>
              <UserFilled />
            </el-icon>
            <span>角色管理</span>
          </el-menu-item>
          <el-menu-item
            index="/acl/permission"
            @click="goRoute('/acl/permission')"
          >
            <el-icon>
              <Menu />
            </el-icon>
            <span>菜单管理</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/product/trademark">
          <template #title>
            <el-icon>
              <Handbag />
            </el-icon>
            <span>商品管理</span>
          </template>
          <el-menu-item
            index="/product/trademark"
            @click="goRoute('/product/trademark')"
          >
            <el-icon>
              <ShoppingCart />
            </el-icon>
            <span>品牌管理</span>
          </el-menu-item>
          <el-menu-item index="/product/attr" @click="goRoute('/product/attr')">
            <el-icon>
              <Operation />
            </el-icon>
            <span>属性管理</span>
          </el-menu-item>
          <el-menu-item index="/product/spu" @click="goRoute('/product/spu')">
            <el-icon>
              <CollectionTag />
            </el-icon>
            <span>SPU管理</span>
          </el-menu-item>
          <el-menu-item index="/product/sku" @click="goRoute('/product/sku')">
            <el-icon>
              <PriceTag />
            </el-icon>
            <span>SKU管理</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import {
  Lock,
  User,
  HomeFilled,
  Menu,
  UserFilled,
  Monitor,
  Handbag,
  ShoppingCart,
  Operation,
  CollectionTag,
  PriceTag,
} from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import useLayOutStore from '@/store/modules/seting'
//初始化仓库实例
let uselayoutStore = useLayOutStore()

//创建路由器
let $router = useRouter()

//获取当前路由信息
let $route = useRoute()

//点击菜单的回调
const goRoute = (path: string) => {
  $router.push({ path })
}
</script>
<script lang="ts">
export default {
  name: 'memu',
}
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100vh;
  color: white;
  overflow: hidden;
  background-color: #01152a;
  transition: width 2s ease-in-out;

  .el-menu {
    width: 101%;
    border-color: #01152a;
  }

  .el-menu-item {
    margin-left: 15px;
  }

  .el-sub-menu {
    margin-left: 15px;

    .el-sub-menu__title {
      display: flex;
    }
  }
}
</style>
