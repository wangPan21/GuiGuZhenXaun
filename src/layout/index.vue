<template>
    <div class="container">
        <el-row>
            <!-- 左侧菜单 -->
            <el-col :span="uselayoutStore.fold ? 2 : 5" class="transition">
                <Manu></Manu>
            </el-col>

            <!-- 右侧展示内容 -->
            <el-col :span="uselayoutStore.fold ? 22 : 19" class="transition">
                <div class="right">
                    <!-- 导航栏 -->
                    <div class="top">
                        <Tabbar></Tabbar>
                    </div>
                    <!-- 内容展示区 -->
                    <div class="bottom">
                        <router-view v-slot="{ Component }">
                            <transition name="fade">
                                <component :is="Component" v-if="destroy" />
                            </transition>
                        </router-view>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { watch, nextTick, ref } from 'vue';
import Tabbar from "./tabbar/index.vue";
import Manu from "./memu/index.vue";
import useLayOutStore from "@/store/modules/seting";

//初始化仓库实例
let uselayoutStore = useLayOutStore();

//控制是否销毁路由与创建
let destroy = ref<boolean>(true);

//监听tabbar组件是否点击刷新按钮
watch(() => uselayoutStore.refash, () => {
    //点击刷新按钮，销毁组件
    destroy.value = false;
    // dom更新完毕，渲染组件
    nextTick(() => {
        destroy.value = true;
    })
})

</script>
<script lang="ts">
export default {
    name: 'layout',
}
</script>
<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100vh;
    overflow: hidden;

    .right {
        width: 100%;
        height: 100vh;
        background-color: #ffffff;

        .top {
            width: 100%;
            height: 9vh;
            display: flex;
            align-items: center;
            padding: 0 0 0 10px;
            border-bottom: 1px solid #eee;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        }

        .bottom {
            width: 100%;
            height: 90vh;
            padding: 20px 20px 0 20px;
            // background-color: #ee1515;
        }
    }

    .transition {
        transition: all .7s ease-in-out, opacity 1.2s cubic-bezier(0.25, 0.1, 0.5, 1);
    }
}

//页面过渡动画
.fade-enter-from {
    opacity: 0;
    transform: translateX(20%);
}

.fade-enter-active {
    transition: opacity 1.2s cubic-bezier(0.25, 0.1, 0.5, 1), transform .6s cubic-bezier(0.25, 0.1, 0.5, 1);
}

.fade-enter-to {
    opacity: 1;
    transform: translateX(0);
}
</style>
