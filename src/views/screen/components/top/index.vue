<template>
    <div class="top">
        <div class="left">
            <span class="home" @click="goHome">首页</span>
        </div>
        <div class="center">
            <div class="title">智慧旅游可视化大数据展示平台</div>
        </div>
        <div class="right">
            <span class="Report">统计报告</span>
            <span class="time">当前时间:{{ time }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted,onBeforeUnmount } from "vue";
import moment from 'moment'
import { useRouter } from "vue-router";

let router = useRouter()

//存储当前时间
let time = ref(moment().format('YYYY年MM月DD日 hh:mm:ss'))
let timer = ref(0)

//组件挂载完毕
onMounted(() => {
    timer.value = setInterval(() => {
        time.value = moment().format('YYYY年MM月DD日 hh:mm:ss')
    }, 1000)
})

//组件销毁时
onBeforeUnmount(()=>{
    clearInterval(timer.value)
})

const goHome = () => {
    router.push('/home')
}
</script>

<style lang="scss" scoped>
.top {
    display: flex;
    width: 100%;
    height: 40px;

    .left {
        flex: 1.5;
        background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
        background-size: cover;

        .home {
            width: 150px;
            height: 40px;
            float: right;
            line-height: 40px;
            color: #27bde6;
            font-size: 20px;
            text-align: center;
            background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
            background-size: 100% 100%;
        }
    }

    .center {
        flex: 2;

        .title {
            width: 100%;
            height: 74px;
            font-size: 30px;
            text-align: center;
            line-height: 74px;
            color: #27bde6;
            background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
            background-size: 100% 100%;
        }
    }

    .right {
        flex: 1.5;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: url(../../images/dataScreen-header-right-bg.png) no-repeat;
        background-size: cover;

        .Report {
            width: 150px;
            height: 40px;
            float: left;
            line-height: 40px;
            color: #27bde6;
            font-size: 20px;
            text-align: center;
            background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
            background-size: 100% 100%;
        }

        .time {
            color: #27bde6;
            margin-right: 10px;
            font-size: 20px;
        }
    }
}
</style>