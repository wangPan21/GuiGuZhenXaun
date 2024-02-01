<template>
    <div class="box">
        <div class="top">
            <p class="title">年龄比例</p>
            <p class="imgs"></p>
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import * as echarts from 'echarts';

let charts = ref();

onMounted(() => {
    let mycharts = echarts.init(charts.value)

    mycharts.setOption({
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '40',
            right:'20',
            orient :'vertical',
            textStyle:{
                color:'#fff',
                fontSize:16
            }
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['60%', '100%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: 'none',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    position: 'inside'
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: '军事' },
                    { value: 735, name: '直播' },
                    { value: 580, name: '娱乐' },
                    { value: 484, name: '休闲' },
                    { value: 300, name: '体育' }
                ]
            }
        ],
        grid:{
            left:0,
            right:0,
            top:0,
            bottpm:0
        }
    })
})
</script>

<style lang="scss" scoped>
.box {
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;

    .top {
        width: 100%;
        height: 20%;

        .title {
            color: #fff;
            font-size: 20px;
        }

        .imgs {
            width: 68px;
            height: 7px;
            margin-top: 10px;
            background: url(../../images/dataScreen-title.png) no-repeat;
            background-size: 100% 100%;

        }
    }

    .charts {
        width: 100%;
        height: 80%;
    }
}
</style>