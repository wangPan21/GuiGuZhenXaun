<template>
    <div class="box">
        <div class="top">
            <p class="title">男女比例</p>
            <p class="imgs"></p>
        </div>
        <div class="bottom">
            <div class="man">
                <p style="margin-bottom: 25%;">男人</p>
                <img src="../../images/man.png" alt="">
            </div>
            <div class="woman">
                <p style="margin-bottom: 25%;">女人</p>
                <img src="../../images/woman.png" alt="">
            </div>
        </div>
        <div class="Progress">
            <p>男士 58%</p>
            <p>女士 42%</p>
            <div class="charts" ref="charts"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import * as echarts from 'echarts';

let charts = ref();

onMounted(() => {
    let mycharts = echarts.init(charts.value);
    mycharts.setOption({
        title: {
            text: '男女比例',
            textStyle: {
                color: '#fff'
            },
            left: '40%',
        },
        xAxis: {
            show: false,
            min: 0,
            max: 100
        },
        yAxis: {
            show: false,
            type: 'category'
        },
        series: [
            {
                type: 'bar',
                data: [60],
                barWidth: '20',
                z:100,
                itemStyle:{
                    borderRadius:50
                }
            },
            {
                type: 'bar',
                data: [100],
                barWidth: '20',
                barGap:'-100%',
                itemStyle:{
                    color:'pink',
                    borderRadius:20
                }


            }
        ],
        grid: {
            left: 50,
            right: 50,
            top: 20,
            bottom: 0
        }
    })
})

</script>

<style lang="scss" scoped>
.box {
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
    margin: 20px 0;

    .top {
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

    .bottom {
        width: 100%;
        height: 50%;
        margin-top: 20px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        .man {
            width: 111px;
            height: 115px;
            display: flex;
            color: #fff;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: url(../../images/man-bg.png) no-repeat;
            background-size: 100% 100%;
        }

        .woman {
            width: 111px;
            height: 115px;
            display: flex;
            color: #fff;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: url(../../images/woman-bg.png) no-repeat;
            background-size: 100% 100%;
        }
    }

    .Progress {
        width: 100%;
        height: 25%;
        display: flex;
        padding-top: 10px;
        color: #fff;
        flex-wrap: wrap;
        justify-content: space-evenly;

        .charts {
            width: 100%;
            height: 80%;
            margin-top: 20px;
            // background-color: #fff;
        }
    }

}</style>