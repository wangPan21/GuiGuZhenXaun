<template>
    <div class="container">
        <el-row>
            <!-- 左侧菜单 -->
            <el-col :span="5">
                <div class="left">
                    <!-- 头部 -->
                    <h5 style="display: flex; align-items: center; justify-content: center; ">
                        <SvgIcon name="icon" width="100" height="100"></SvgIcon>
                        <span style="font-size: 22px; font-weight:bolder;">硅谷甄选运营平台</span>
                    </h5>
                    <el-menu active-text-color="#ffd04b" background-color="#01152a" :default-active="$route.path" text-color="#fff" :router="true">
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
                        <el-sub-menu index="/acl/user" >
                            <template #title>
                                <el-icon>
                                    <Lock />
                                </el-icon>
                                <span>权限管理</span>
                            </template>
                            <el-menu-item index="/acl/user" @click="goRoute('/acl/user')">
                                <el-icon><User /></el-icon>
                                <span>用户管理</span>
                            </el-menu-item>
                            <el-menu-item index="/acl/role" @click="goRoute('/acl/role')">
                                <el-icon><UserFilled /></el-icon>
                                <span>角色管理</span>
                            </el-menu-item>
                            <el-menu-item index="/acl/permission" @click="goRoute('/acl/permission')">
                                <el-icon><Menu /></el-icon>
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
                            <el-menu-item index="/product/trademark" @click="goRoute('/product/trademark')">
                                <el-icon><ShoppingCart /></el-icon>
                                <span>品牌管理</span>
                            </el-menu-item>
                            <el-menu-item index="/product/attr" @click="goRoute('/product/attr')">
                                <el-icon><Operation /></el-icon>
                                <span>属性管理</span>
                            </el-menu-item>
                            <el-menu-item index="/product/spu" @click="goRoute('/product/spu')">
                                <el-icon><CollectionTag /></el-icon>
                                <span>SPU管理</span>
                            </el-menu-item>
                            <el-menu-item index="/product/sku" @click="goRoute('/product/sku')">
                                <el-icon><PriceTag /></el-icon>
                                <span>SKU管理</span>
                            </el-menu-item>
                        </el-sub-menu>
                    </el-menu>
                </div>
            </el-col>

            <!-- 右侧展示内容 -->
            <el-col :span="19">
                <div class="right">

                    <!-- 导航栏 -->
                    <div class="top">1223</div>

                    <!-- 内容展示区 -->
                    <div class="bottom">
                        <router-view></router-view>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { Lock, User,HomeFilled,Menu,UserFilled, Monitor, Handbag,ShoppingCart, Operation,CollectionTag,PriceTag} from '@element-plus/icons-vue'
import { useRouter,useRoute } from "vue-router";

//创建路由器
let $router =useRouter();

//获取当前路由信息
let $route =useRoute();

//点击菜单的回调
const goRoute =(path:string)=>{
    $router.push({path})    
}
</script>
<script lang="ts">
export default {
    name: 'first'
} 
</script>
<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100vh;

    .left {
        width: 100%;
        height: 100vh;
        color: white;
        background-color: #01152a;

        .el-menu-item  {
            margin-left: 10px;
        }
        .el-sub-menu{
            margin-left: 10px;
            .el-sub-menu__title{
                display: flex;
                
            }
        }
    }

    .right {
        width: 100%;
        height: 100vh;
        background-color: #ffffff;

        .top {
            width: 100%;
            height: 10vh;
        }

        .bottom {
            width: 100%;
            height: 90vh;
        }
    }
}</style>