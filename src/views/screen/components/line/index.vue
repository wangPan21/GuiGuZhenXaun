<template>
    <div class="box">
        <div class="top">
            <p class="title">未来30天游客趋势图</p>
            <p class="imgs"></p>
        </div>
        <div class="charts" ref="line"></div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import * as echarts from 'echarts'

let line = ref()

onMounted(() => {
    let mycharts = echarts.init(line.value);
    mycharts.setOption({
        title: {
            text: '访问量(w)',
            left:'40',
            textStyle: {
                color: '#fff',
                fontSize:'14'
            }
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
            data: ['1/01', '1/02', '1/03', '1/04', '1/05', '1/06', '1/07', '1/08', '1/09', '1/10', '1/11', '1/12', '1/13', '1/14', '1/15', '1/16']
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
            }
        },
        grid: {
            top: 0,
            right: 10,
            bottom: 20,
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
                type: 'line',
                data: [20, 70, 39, 70, 62, 98, 96, 79, 53, 45, 76, 93, 97, 23, 98, 53],
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
                            offset: 0, color: 'rgba(255,0,0,0)' // 0% 处的颜色
                        },

                        {
                            offset: 1, color: 'rgba(1,118,255,1)' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                },
                legendHoverLink: true,
                showSymbol: true,
            }
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
    background: url(../../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;

    .top {
        width: 100%;
        flex: 1;

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
        flex: 3.5;
        // background-color: #fff;
    }
}
</style>