<template>
    <div class="box">
        <div class="top">
            <p class="title">年度游客量对比</p>
            <p class="imgs"></p>
        </div>
        <div class="echarts" ref="year"></div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import * as echarts from 'echarts'

let year = ref()

onMounted(() => {
    let mycharts = echarts.init(year.value);
    mycharts.setOption({
        title: {
            text: '(人数)',
            // left:'40',
            textStyle: {
                color: '#fff',
                fontSize: '14'
            }
        },
        //图例
        legend: {
            right: '70',
            textStyle: {
                color: '#fff'
            },
            icon:'rect',

        },
        xAxis: {
            type: 'category',
            //两侧是否留白
            boundaryGap: false,
            //分割线
            splitLine: {
                show: false
            },
            //轴线设置
            axisLine: {
                show: true
            },
            //刻度
            axisTick: {
                show: true
            },
            axisLabel: {
                color: '#fff',
                fontSize: 14,
            },
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        },
        yAxis: {
            //分割线
            splitLine: {
                show: false
            },
            //轴线设置
            axisLine: {
                show: true
            },
            //刻度
            axisTick: {
                show: true
            },
            axisLabel: {
                color: '#fff',
                fontSize: 14,
            },
        },
        grid: {
            top: 40,
            right: 10,
            bottom: 30,
            left: 40
        },
        tooltip: {
            trigger: 'axis'
        },
        toolbox: {
            show: true,
            feature: {
                magicType: { show: true, type: ['stack', 'tiled'] },
                saveAsImage: { show: true }
            }
        },
        series: [
            {
                name: '2021',
                type: 'line',
                data: [490, 120, 10, 210, 370, 90, 210, 239, 187, 60, 0, 0],
                // 折线是否平滑
                smooth: true,

                //区域填充颜色
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'rgba(200,37,43,0.4)' // 0% 处的颜色
                        },

                        {
                            offset: 1, color: 'rgba(200,37,43,0.5)' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                },
                legendHoverLink: false,
                showSymbol: false,
            },
            {
                name: '2022',
                type: 'line',
                data: [0, 120, 450, 300, 200, 120, 204, 389, 268, 348, 297, 479],
                // 折线是否平滑
                smooth: true,

                //区域填充颜色
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'rgba(1,118,255,0.4)' // 0% 处的颜色
                        },

                        {
                            offset: 1, color: 'rgba(1,118,255,0.5)' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                },
                legendHoverLink: false,
                showSymbol: false,
            },
            {
                name: '2023',
                type: 'line',
                data: [290, 100, 250, 140, 170, 40, 194, 239, 117, 148, 67, 0],
                // 折线是否平滑
                smooth: true,

                //区域填充颜色
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'rgba(214,0,253,0.4)' // 0% 处的颜色
                        },

                        {
                            offset: 1, color: 'rgba(214,0,253,0.5)' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                },
                legendHoverLink: false,
                showSymbol: false,
            },

        ],
    })
})
</script>

<style lang="scss" scoped>
.box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    background: url(../../images/dataScreen-main-rc.png) no-repeat;
    background-size: 100% 100%;

    .top {
        width: 100%;
        margin-bottom: 23px;

        .title {
            font-size: 20px;
            margin-top: 10px;
            color: #fff;
        }

        .imgs {
            width: 68px;
            height: 7px;
            margin-top: 10px;
            background: url(../../images/dataScreen-title.png) no-repeat;
            background-size: 100% 100%;

        }
    }

    .echarts {
        width: 100%;
        height: 100%;
        // background-color: #fff;
    }
}
</style>