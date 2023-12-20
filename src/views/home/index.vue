<template>
  <div class="container-home">
    <div class="top">
      <el-card>
        <div class="tops">
          <img :src="userStore.avatar" alt="" class="box" v-if="userStore.avatar != ''">
          <SvgIcon name="avatar" width="100" height="100" v-else></SvgIcon>
          <div class="boxs" v-if="userStore.avatar != ''">
            <div>{{getTime() }}，{{userStore.username }}</div>
            <div style="color: #aaa; font-size: 18px;">硅谷甄选运营平台</div>
          </div>
          <div class="boxss" v-else @click="login">去登录</div>
        </div>
      </el-card>
    </div>
    <div class="bottom">
      <SvgIcon name="home" width="100%" height="65vh" v-if="userStore.avatar != ''"></SvgIcon>
      <SvgIcon name="blank" width="100%" height="65vh" v-else></SvgIcon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import useuserStore from "@/store/modules/user";
import { getTime } from '@/utils/time'
import {  useRouter } from 'vue-router';

//初始化仓库实例
let userStore = useuserStore();

//创建路由
let $router = useRouter();

//首页组件挂载完毕
onMounted(() => {
  userStore.userInfo()
})

//去登录按钮回调
const login = () => {
    //返回登录页面
    $router.push({ path: '/login' })
}

</script>
<script lang="ts">
export default {
  name: 'Home',
}
</script>
<style lang="scss" scoped>
.container-home{
  .top{
    .tops{
      display: flex;
      align-items: center;
      .box{
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      .boxs{
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items:flex-start;
        margin-left: 20px;
        font-size: 22px;
        font-weight: bolder;
      }
      .boxss{
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items:flex-start;
        margin-left: 10px;
        font-size: 22px;
        font-weight: bolder;
        cursor:pointer;
      }
      .boxss:hover{
        color: skyblue;
      }
    }
  }
  .bottom{
    width: 100%;
    height: 100vh;
    margin-top: 4%;
    // background-color: #d82e2e;
  }
}
</style>
